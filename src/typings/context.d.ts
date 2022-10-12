export type Themes = 'dark' | 'garden'

export interface TextData {
  x: number
  y: number
  length: number
  text: string
  lineHeight: number
  moveable: boolean

  // optional individual text config
  font?: string
  fontSize?: number
  blur?: number
  color?: string
  label?: string
}

export interface Config {
  font: string
  fontSize: number
  blur: number
  color: string
}

export interface Book {
  bookUrl: string
  texts: Array<TextData | null>

  // optional, can be passed after rendered
  height?: number
  width?: number

  // after render only
  ref?: RefObject<SVGSVGElement>
}
