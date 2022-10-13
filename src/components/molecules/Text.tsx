import axios from 'axios'
import { Buffer } from 'buffer'
import { useConfig } from 'hooks/useConfig'
import { FC, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import type { TextData } from 'typings/context'

export const Text: FC<{ data: TextData | null }> = ({ data }) => {
  const { config } = useConfig()
  const [base64Font, setBase64Font] = useState<string>()

  const dataFont = data?.font
  useEffect(() => {
    const font = dataFont || config.font
    axios
      .get(font, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        setBase64Font(Buffer.from(response.data, 'binary').toString('base64'))
      })
  }, [dataFont, config.font])

  if (!data || !base64Font) return null
  return (
    <Draggable
      axis={data.moveable ? 'both' : 'none'}
      position={data}
      grid={[1, 1]}
      scale={1}
    >
      <foreignObject style={{ overflow: 'visible' }}>
        <defs>
          <style>
            {`
            
            @font-face {
              font-family: 'handwriting';
              src: url('data:application/font-woff2;charset=utf-8;base64,${base64Font}') format('woff2');
            }
            
            `}
          </style>
        </defs>
        <div
          className={data.moveable ? 'cursor-move' : undefined}
          style={{
            fontFamily: 'handwriting',
            whiteSpace: 'pre-wrap',
            width: data.length || 1000,
            fontSize: data.fontSize || config.fontSize,
            lineHeight: data.lineHeight,
            filter: `blur(${data.blur || config.blur}px)`,
            color: data.color || config.color,
            border: '1px',
          }}
        >
          {data.text}
        </div>
      </foreignObject>
    </Draggable>
  )
}
