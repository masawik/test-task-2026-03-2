import {
  forwardRef,
  isValidElement,
  useId,
  type ReactElement,
  type SVGProps,
} from 'react'

export type CreatedIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'width' | 'height'
> & {
  /** Число — пиксели; строка — как в CSS (например `"1.25em"`). */
  size?: number | string,
  /** Видимое имя для скринридеров; ренерится как `<title>`. */
  title?: string,
}

export function createIcon(source: ReactElement<SVGProps<SVGSVGElement>>) {
  if (!isValidElement(source) || source.type !== 'svg') {
    throw new Error('createIcon: ожидается React-элемент <svg>')
  }

  const Icon = forwardRef<SVGSVGElement, CreatedIconProps>(function CreatedIcon(
    {
      size,
      className,
      title,
      'aria-hidden': ariaHiddenProp,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      focusable = 'false',
      role,
      children,
      ...rest
    },
    ref,
  ) {
    const titleId = useId()
    const base = source.props
    const {
      children: sourceChildren,
      className: baseClassName,
      width: _w,
      height: _h,
      ...svgRest
    } = base
    const hasName = Boolean(ariaLabel ?? title ?? ariaLabelledBy)
    const ariaHidden = ariaHiddenProp ?? (hasName ? undefined : true)

    const mergedClassName = [ baseClassName, className ]
      .filter(Boolean)
      .join(' ')

    return (
      <svg
        {...svgRest}
        {...rest}
        ref={ref}
        width={size}
        height={size}
        className={mergedClassName || undefined}
        focusable={focusable}
        role={role ?? (hasName ? 'img' : 'presentation')}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        aria-labelledby={title ? titleId : ariaLabelledBy}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        {children ?? sourceChildren}
      </svg>
    )
  })

  Icon.displayName = 'CreatedIcon'

  return Icon
}
