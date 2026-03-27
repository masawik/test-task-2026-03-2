import { useId, type HTMLInputTypeAttribute } from 'react'

import { Input, type InputProps } from '../Input'
import s from './TextField.module.scss'

export interface TextFieldProps<
  T extends HTMLInputTypeAttribute | undefined = HTMLInputTypeAttribute,
> extends Omit<InputProps<T>, 'invalid'> {
  label?: string,
  errorMessage?: string,
}

export const TextField = <
  T extends HTMLInputTypeAttribute | undefined = HTMLInputTypeAttribute,
>({
  label,
  errorMessage,
  ...props
}: TextFieldProps<T>) => {
  const id = useId()

  return (
    <div className={s.TextField}>
      {!!label && (
        <label htmlFor={id} className={s.label}>
          {label}
        </label>
      )}

      <Input {...props} id={id} invalid={!!errorMessage} />

      {errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
    </div>
  )
}
