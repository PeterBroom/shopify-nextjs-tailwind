import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
// import NProgress from 'nprogress'


// useRouter.events.on('routeChangeStart', (url) => {
//   NProgress.configure({ showSpinner: false, parent: 'header' })
//   NProgress.start()
// })
// useRouter.events.on('routeChangeComplete', () => NProgress.done())
// useRouter.events.on('routeChangeError', () => NProgress.done())

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

export default Shop
