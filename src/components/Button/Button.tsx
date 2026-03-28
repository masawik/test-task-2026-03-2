import { cn } from '@/lib/cn'

import s from './Button.module.scss'

export interface ButtonProps extends React.ComponentProps<'button'> {
  loading?: boolean,
}

export const Button = ({
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const computedDisabled = disabled || loading

  return (
    <button
      {...props}
      disabled={computedDisabled}
      className={cn('button', className)}
    >
      {loading ? (
        <div className={s.loaderContainer}>
          <div className={cn('spinner', s.loader)} />
        </div>
      ) : (
        children
      )}
    </button>
  )
}
