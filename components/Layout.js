import Head from 'next/head'
import { CartProvider } from '@/context/Store'
import Footer from './Footer'
import Header from './Header'
import SEO from './SEO'

export default function Layout({ children }) {
  const sticky = children?.props?.stickyHeader ? children.props.stickyHeader : false

  return (
    <CartProvider>
    <div className="flex flex-col justify-between min-h-screen">
      <SEO 
        title={process.env.NEXT_PUBLIC_SITE_TITLE}
      />
      <Header sticky={sticky} />
      <main className={sticky ? '-mt-[4rem]' : ''}>
        {children}
      </main>
      <Footer />
    </div>
    </CartProvider>
  )
}
