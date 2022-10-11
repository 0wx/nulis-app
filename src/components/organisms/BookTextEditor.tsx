import { AddText } from 'components/atoms/AddText'
import { Download } from 'components/atoms/Download'
import { Setting } from 'components/atoms/Icons'

import { TextInput } from 'components/molecules/TextInput'
import { TextSetting } from 'components/molecules/TextSetting'
import { FC, useState } from 'react'

export const BookTextEditor: FC = () => {
  const [showSetting, setShowSetting] = useState(false)

  const toggle = () => setShowSetting((value) => !value)

  return (
    <div className="md:p-6 md:min-w-[calc(50vw-48px)] flex gap-2 flex-col">
      <div className="flex gap-1 items-center flex-wrap">
        <Download />
        <button onClick={toggle} className="btn btn-ghost gap-2">
          <Setting /> Setting
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showSetting ? 'h-24' : 'h-0'
        }`}
      >
        <TextSetting />
      </div>
      <div>
        <TextInput />
        <AddText />
      </div>
    </div>
  )
}
