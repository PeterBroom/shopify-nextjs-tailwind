import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function ProductOptions({ name, values, selectedOptions, setOptions, productInventory, selectedVariant, available, quantity }) {
// console.log('selectedVariant', selectedVariant)
// console.log('productInventory', productInventory)
  
  return (
    <fieldset className="grid grid-cols-4 gap-2 mb-3">
      <div className='col-span-1 flex items-center z-1'>
        <legend className="text-l font-regular">{name}</legend>
      </div>
      <div className="flex items-center flex-wrap col-span-3">
        <Menu as="div" className="w-full relative text-left">
          <div className='max-w-[60%] z-0'>
            <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-500">
              {selectedOptions[name]}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
       
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                {values.map((value) => {
                  const id = `option-${name}-${value}`;
                  const checked = selectedOptions[name] === value;
                  return (
                    <Menu.Item key={id}>
                      {() => (
                         <label key={id} htmlFor={id}>
                          <input
                            className="sr-only"
                            type="radio"
                            id={id}
                            name={`option-${name}`}
                            value={value}
                            checked={checked}
                            onChange={() => {
                              setOptions(name, value);
                            }}
                          />
                          <div
                            className={`hover:bg-gray-100 ${
                              (checked
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm cursor-pointer")
                            }`}
                          >
                            <span className="px-2">{value}</span>
                          </div>
                        </label>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </fieldset>
  );
}