import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

function Shop({ Component, pageProps }) {
    const router = useRouter();
    return (
      <ShopProvider>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </ShopProvider>
    )
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}

export default Shop
