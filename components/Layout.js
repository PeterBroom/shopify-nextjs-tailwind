import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  const sticky = children?.props?.stickyHeader ? children.props.stickyHeader : false

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Head key='layout-head'>
        <meta name='theme-color' content='#0f172a' />
        <link rel="manifest" href="/favicons/manifest.json" />

      </Head>
      <Header sticky={sticky} />
      <main className={sticky ? '-mt-[5rem]' : ''}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
