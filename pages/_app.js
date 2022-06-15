import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'

function Shop({ Component, pageProps }) {
  return (
    <Layout stickyHeader={pageProps.stickyHeader}>
      <SEO 
        title={process.env.siteTitle}
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default Shop
