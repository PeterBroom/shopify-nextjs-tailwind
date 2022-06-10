import {useEffect, useState} from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  const [sticky, setSticky] = useState(false)
  
  useEffect(() => {
    if (children.key === '/') {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }, [children.key])

  return (
    <div className="flex flex-col justify-between min-h-screen">
        <Header sticky={sticky} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}