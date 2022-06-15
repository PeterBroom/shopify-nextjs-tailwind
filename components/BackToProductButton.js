// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

function BackToProductButton() {
  return (
    <Link href="/" passHref>
      <a
        aria-label="back-to-products"
        className="bg-black rounded-sm text-white px-2 py-3 mt-3 hover:bg-gray-800 text-center"
      >
        {/* <FontAwesomeIcon icon={faArrowLeft} className="w-4 mr-2 inline-flex" /> */}
        Back to products
      </a>
    </Link>
  )
}

export default BackToProductButton
