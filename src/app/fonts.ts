import { Montserrat, Open_Sans } from 'next/font/google'

export const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: [ 'latin' ],
})

export const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: [ 'latin' ],
})

export const appFontVariableClassNames = [ montserrat, openSans ]
  .map((font) => font.variable)
  .join(' ')
