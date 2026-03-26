import { Suspense } from 'react'

import { Mail, MapPin, Phone } from '@/components/icons'
import { cn } from '@/lib'

import s from './TopHeader.module.scss'
import { UserBlock } from './UserBlock/UserBlock'

export type TopHeaderProps = React.ComponentProps<'div'>

export const TopHeader = ({ className, ...props }: TopHeaderProps) => {
  return (
    <div className={cn(s.container, className)} {...props}>
      <div className={s.content}>
        <address className={s.contacts}>
          <a href="tel:+021955184" className={s.linkWithIcon}>
            <Phone />
            +021-95-51-84
          </a>

          <a href="mailto:shop@abelohost.com" className={s.linkWithIcon}>
            <Mail />
            shop@abelohost.com
          </a>

          <span className={s.linkWithIcon}>
            <MapPin />
            1734 Stonecoal Road
          </span>

          {/* TODO тут ещё можно добавить SEO штуки для карточки бизнеса в поисковиках */}
        </address>

        <div className={s.userBlock}>
          <Suspense fallback={<div className={cn('spinner', s.loader)} />}>
            <UserBlock />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
