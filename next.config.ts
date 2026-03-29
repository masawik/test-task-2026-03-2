import type { NextConfig } from 'next'
import '@/appEnv'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: {
    /**
     * at the moment, "infer" causes problems when used with zustand
     * @see https://github.com/facebook/react/issues/33302
     */
    compilationMode: 'annotation',
  },
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
