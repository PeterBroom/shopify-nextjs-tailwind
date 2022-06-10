import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  const sticky = children?.props?.stickyHeader ? children.props.stickyHeader : false

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header sticky={sticky} />
      <main className={sticky ? '-mt-[4rem]' : ''}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
