import Head from 'next/head'
import Hero from '@/components/Hero'
import ProductList from '@/components/ProductList'
import { getAllProductsInCollection } from '@/lib/shopify'

function IndexPage({ products }) {

  return (
    <div>
    <Hero/>
    <div className="container mx-auto">
      <Head>
        <title>Quill Stationary - Shopify NextJs Tailwind demo</title>
      </Head>

      <ProductList products={products} />
    </div>
    </div>
  )
}

export async function getStaticProps() {
  const products = await getAllProductsInCollection()
  const stickyHeader = true

  return {
    props: {products, stickyHeader}
  }
}

export default IndexPage
