import Head from 'next/head'
import ProductPageContent from "@/components/ProductPageContent"
import { getProductSlugs, getProduct } from '@/lib/shopify'

function ProductPage({ productData }) {
  console.log('productData',productData.images.edges[0].node.originalSrc)
  const productURL = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${productData.handle}`
  return (
    <>
      <Head>
        <title>{productData.title} - {process.env.NEXT_PUBLIC_SITE_TITLE}</title>
        <meta name="description" content={productData.description} />

        {/* Open Graph */}
        <meta property="og:url" content={productURL} key="ogurl" />
        <meta property="og:image" content={productData.images.edges[0].node.originalSrc} key="ogimage" />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_URL} key="ogsitename" />
        <meta property="og:title" content={productData.title} key="ogtitle" />
        <meta property="og:description" content={productData.description} key="ogdesc" />
      </Head>
      <div className="min-h-screen py-12 sm:pt-20">
        <ProductPageContent productData={productData} />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const productSlugs = await getProductSlugs()

  const paths = productSlugs.map((slug) => {    
    const product = String(slug.node.handle)
    return {
      params: { product }
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const productData = await getProduct(params.product)  

  return {
    props: {
      productData,
    },
  }
}

export default ProductPage
