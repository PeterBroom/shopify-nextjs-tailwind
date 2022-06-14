function CheckOutButton({ webUrl }) {
  return (
    <a
      href={webUrl}
      aria-label="checkout-products"
      className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800"
    >
      Check Out
    </a>
  )
}

export default CheckOutButton
