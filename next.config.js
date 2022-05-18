module.exports = {
  env: {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
  },
  images: {
    domains: ['cdn.shopify.com', 'tailwindui.com'],
  },
}
