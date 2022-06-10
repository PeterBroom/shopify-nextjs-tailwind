
   
const navigation = [
    { name: 'About', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Terms and Conditions', href: '#' }
  ]
  
  export default function Footer() {
    return (
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          {/* <nav className="flex flex-wrap justify-center">
            {
              navigation.map((item, i) => (
                <div key={i} className="px-6 py-2">
                  <a href={item.href} className="text-gray-500 hover:text-gray-900">
                    {item.name}
                  </a>
                </div>
              ))
            }
          </nav> */}

          <div className='max-w-4xl mx-auto md:grid md:grid-cols-3 gap-8 py-4 px-10 border border-[10px] border-gray-50 rounded-sm'>
            <p className="col-span-2 text-md text-stone-600 pb-6 md:p-0">This is a simple demonstation of an online shop using the wonderful &quot;Shopify store front&quot; API consumed by NextJs and styled with TailwindCSS.</p>
            <div className="col-span-1 py-4">
              <a
                target='_blank' rel='noreferrer'
                href="https://github.com/PeterBroom/shopify-nextjs-tailwind"
                className="w-full flex items-center justify-center px-8 py-3 m-0 border border-transparent text-sm md:text-md font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-500"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-gray-500">&copy; 2022 All right reserved.</p>
        </div>
      </footer>
    )
  }