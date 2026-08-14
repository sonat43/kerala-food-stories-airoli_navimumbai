import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function seoUrlPlugin(siteUrl) {
  if (!siteUrl) return { name: 'seo-url' }

  return {
    name: 'seo-url',
    transformIndexHtml(html) {
      const tags = [
        `<link rel="canonical" href="${siteUrl}/" />`,
        `<meta property="og:url" content="${siteUrl}/" />`,
        `<meta name="twitter:url" content="${siteUrl}/" />`,
      ].join('\n    ')
      return html.replace('</head>', `    ${tags}\n  </head>`)
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n  </url>\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const siteUrl = loadEnv(mode, '.', 'VITE_').VITE_SITE_URL?.replace(/\/+$/, '')

  return {
    plugins: [react(), seoUrlPlugin(siteUrl)],
  }
})
