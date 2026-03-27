import type { NextConfig } from 'next'
import '@/appEnv'

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  sassOptions: {
    silenceDeprecations: [ 'if-function' ],
    additionalData: `
      @use '@/app/styles/utils' as *;
    `,
  },
  images: {
    remotePatterns: [
      new URL('https://dummyjson.com/image/**'),
      new URL('https://cdn.dummyjson.com/**'),
    ],
  },
}

export default nextConfig
