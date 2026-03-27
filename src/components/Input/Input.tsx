import {
  type ChangeEvent,
  type ComponentProps,
  type HTMLInputTypeAttribute,
} from 'react'

import { cn } from '@/lib'

import s from './Input.module.scss'

export type InputValueByType<T extends HTMLInputTypeAttribute | undefined> =
  T extends 'checkbox' | 'radio'
    ? boolean
    : T extends 'file'
      ? FileList | null
      : T extends 'number' | 'range'
        ? number
        : string

export type InputProps<
  T extends HTMLInputTypeAttribute | undefined = HTMLInputTypeAttribute,
> = Omit<ComponentProps<'input'>, 'type' | 'onValueChange'> & {
  type?: T,
  onValueChange?: (
    value: InputValueByType<T>,
    event: ChangeEvent<HTMLInputElement>,
  ) => void,
  className?: string,
  invalid?: boolean,
}

export type InputChangeValue = InputValueByType<HTMLInputTypeAttribute>

export function Input<
  T extends HTMLInputTypeAttribute | undefined = HTMLInputTypeAttribute,
>({
  onValueChange,
  onChange,
  type,
  className,
  invalid,
  ...props
}: InputProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)

    if (onValueChange) {
      const value = (() => {
        switch (type) {
          case 'number':
          case 'range':
            return e.target.valueAsNumber

          case 'checkbox':
          case 'radio':
            return e.target.checked

          case 'file':
            return e.target.files

          default:
            return e.target.value
        }
      })() as InputValueByType<T>

      onValueChange(value, e)
    }
  }

  return (
    <input
      {...props}
      type={type}
      onChange={handleChange}
      className={cn(s.Input, className)}
      aria-invalid={invalid}
    />
  )
}
