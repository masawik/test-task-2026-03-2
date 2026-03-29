import Image from 'next/image'

import { AppLink } from '@/components/AppLink'

import s from './BannerHeader.module.scss'
export const BannerHeader = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <AppLink href="/" className={s.logo}>
          Abelohost Shop <span className={s.logo__dot}>.</span>
        </AppLink>

        <Image
          src="https://dummyjson.com/image/600x70"
          className={s.banner}
          alt="banner"
          loading="eager"
          width={600}
          height={70}
        />
      </div>
    </div>
  )
}
