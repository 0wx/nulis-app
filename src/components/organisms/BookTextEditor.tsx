import { AddText } from 'components/atoms/AddText'
import { Download } from 'components/atoms/Download'

import { TextInput } from 'components/molecules/TextInput'
import { FC } from 'react'

export const BookTextEditor: FC = () => {
  return (
    <div className="md:p-6 md:min-w-[calc(50vw-48px)] flex gap-2 flex-col">
      <div className="flex gap-1 items-center flex-wrap">
        <Download />
        {/* <button onClick={toggle} className="btn btn-ghost gap-2">
          <Setting /> Setting
        </button> */}
      </div>
      {/* <div
        className={`overflow-hidden transition-all duration-300 ${
          showSetting ? 'h-auto' : 'h-0'
        }`}
      >
      </div> */}
      <div className="md:max-w-[320px]">
        <TextInput />
        <AddText />
      </div>
    </div>
  )
}
