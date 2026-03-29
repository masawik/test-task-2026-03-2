import { Mail, MapPin, Phone } from '@/components/icons'
import { cn } from '@/lib/cn'

import s from './TopHeader.module.scss'
import { UserBlock } from './UserBlock/UserBlock'

export type TopHeaderProps = React.ComponentProps<'div'>

const ADDRESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AbeloHost',
  telephone: '+021955184',
  email: 'shop@abelohost.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1734 Stonecoal Road',
  },
}

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

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ADDRESS_SCHEMA) }}
          />
        </address>

        <div className={s.userBlock}>
          <UserBlock />
        </div>
      </div>
    </div>
  )
}
