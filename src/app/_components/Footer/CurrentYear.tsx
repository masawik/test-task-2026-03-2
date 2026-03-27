'use client'

export type CurrentYearProps = React.ComponentProps<'span'>
export const CurrentYear = (props: CurrentYearProps) => {
  const currentYear = new Date().getFullYear()

  return <span {...props}>{currentYear}</span>
}
