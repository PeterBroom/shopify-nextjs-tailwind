import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import ShopProvider from '@/context/shopContext'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'

function Shop({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout>
      <SEO 
        title={process.env.siteTitle}
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default Shop
