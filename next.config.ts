import type { NextConfig } from 'next'
import '@/appEnv'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    additionalData: `
      @use '@/app/styles/utils' as *;
    `,
  },
  images: {
    remotePatterns: [ new URL('https://dummyjson.com/image/**') ],
  },
}

export default nextConfig
