import Image from 'next/image'
import Link from 'next/link'

import s from './BannerHeader.module.scss'
export const BannerHeader = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <Link href="/" className={s.logo}>
          Abelohost Shop <span className={s.logo__dot}>.</span>
        </Link>

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
