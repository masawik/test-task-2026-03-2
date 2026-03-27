'use client'

import {
  useActionState,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useTransition,
} from 'react'
import z from 'zod'

import { logIn } from '@/auth/actions'
import {
  LogInFormDataSchema,
  type LogInFormDataError,
  type LogInFormState,
} from '@/auth/schemas'
import { ApiErrorSchema } from '@/backend'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { cn, formDataToObject } from '@/lib'

import s from './page.module.scss'

const isLogInFormDataError = (
  state: LogInFormState,
): state is LogInFormDataError => {
  return Boolean(state && 'fieldErrors' in state)
}

export const LogIn = () => {
  const formRef = useRef<HTMLFormElement | null>(null)

  const [ isPending, startTransition ] = useTransition()
  const [ state, action ] = useActionState(logIn, undefined)

  const [ errors, setErrors ] = useState<null | LogInFormDataError>(null)

  useEffect(() => {
    if (isLogInFormDataError(state)) {
      // intentional second render is the lesser evil.
      // If we take the server state separately, there will be more branches
      // and potential bugs due to the juggling of two sources of truth.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(state)
    }
  }, [ state ])

  const revalidate = useEffectEvent(() => {
    if (!formRef.current) return

    const validatedFormData = LogInFormDataSchema.safeParse(
      formDataToObject(new FormData(formRef.current)),
    )

    if (validatedFormData.success) {
      setErrors(null)
    } else {
      setErrors(z.flattenError(validatedFormData.error))
    }
  })

  useEffect(() => {
    if (!errors) return
    if (!formRef.current) return

    formRef.current.addEventListener('input', revalidate, { once: true })
  }, [ errors ])

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    const validatedFormData = LogInFormDataSchema.safeParse(
      formDataToObject(new FormData(formRef.current)),
    )

    if (!validatedFormData.success) {
      setErrors(z.flattenError(validatedFormData.error))
      return
    }

    startTransition(() => {
      action(validatedFormData.data)
    })
  }

  const apiErrorMessage =
    state && ApiErrorSchema.safeParse(state).data?.message

  return (
    <main className={s.container}>
      <h1>Login</h1>

      <form className={s.form} onSubmit={handleSubmit} ref={formRef}>
        <TextField
          label="Username"
          name="username"
          type="text"
          errorMessage={errors?.fieldErrors.username?.[0]}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          errorMessage={errors?.fieldErrors.password?.[0]}
        />

        {apiErrorMessage && (
          <div className={s.formError}>Error: {apiErrorMessage}</div>
        )}

        <Button
          className={cn('button', s.submitBtn)}
          type="submit"
          disabled={!!errors}
          loading={isPending}
        >
          Login
        </Button>
      </form>
    </main>
  )
}

export default LogIn
