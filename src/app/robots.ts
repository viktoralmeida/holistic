import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://holisticpoint-headspa.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/Panel/',
          '/sign-in/',
          '/sign-up/',
          '/checkout/',
          '/receipt/',
          '/_next/',
          '/tmp/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/Panel/',
          '/sign-in/',
          '/sign-up/',
          '/checkout/',
          '/receipt/',
          '/_next/',
          '/tmp/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}



