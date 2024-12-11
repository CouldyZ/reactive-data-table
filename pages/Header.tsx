
import { Fragment, useState, memo } from 'react'
import Image from 'next/image'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  Popover,
  PopoverButton,
  PopoverPanel
} from '@headlessui/react'
import { Input } from 'react-aria-components'

type HeaderProps = {
  fetchPageData: (start: number, end: number) => void;
  showPopup: () => void;
  filter: () => void;
  sort: (type: string) => void;
};

const Header: React.FC<HeaderProps> = ({ fetchPageData, showPopup, filter, sort }) => {
  const [start, setStart] = useState(1)
  const [limit, setLimit] = useState(10)
  const [order, setOrder] = useState('asc')

  const onSort = () => {
    sort(order)
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="flex flex-row items-center justify-between px-4 py-3">

      {/*  Default View */}
      <Menu as="div">
        <MenuButton className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
          Default View
          <Image src="/expand.svg" alt="expand" width={16} height={16} className="ml-4"/>
        </MenuButton>
        <MenuItems className="absolute mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none">
          <MenuItem>
            <div 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" 
              onClick={showPopup}
            >
              <Image src="/add.svg" alt="add" width={16} height={16} className="mr-2"/>
              Add Column
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>

      {/* Columns Menu */}
      <Menu as="div">
        <MenuButton className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
          <Image src="/columns.svg" alt="Columns" width={16} height={16} className="mr-2" />
          columns
        </MenuButton>
        <MenuItems className="absolute mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none">
          <MenuItem>
            <div 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" 
              onClick={showPopup}
            >
              <Image src="/add.svg" alt="add" width={16} height={16} className="mr-2" />
              Add Column
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>

      {/* Rows Menu */}
      <Popover as="div" className="relative inline-block text-left">
        {
          ({ close }) => (
            <>
              <PopoverButton className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <Image src="/rows.svg" alt="Columns" width={16} height={16} className="mr-2" />
                rows
              </PopoverButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute left-1/2 transform -translate-x-1/2 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 w-[300px]">
                  <div className="p-3 space-y-4">
                    <>
                      <label className="block text-xs font-medium text-gray-700 mt-1">
                        Starting row
                      </label>
                      <Input
                        type="number"
                        defaultValue={0}
                        onChange={(e) => setStart(Number(e.target.value))}
                        min={0}
                        className="px-2 py-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 text-sm font-medium border-gray-200 border"
                      />
                    </>

                    <>
                      <label className="block text-xs font-medium text-gray-700 mt-3">
                        Row limit
                      </label>
                      <Input
                        type="number"
                        defaultValue={10}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        min={1}
                        className="px-2 py-1 p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 text-sm font-medium border-gray-200 border"
                      />

                      <label className="block text-xs font-medium text-gray-500 mt-2">
                        Leave empty to remove limit
                      </label>
                    </>
                    <div className="flex justify-end">

                      <button
                        onClick={() => {
                          fetchPageData(start, limit == 0 ? 100 : start + limit - 1)
                          close()
                        }}
                        className="px-3 py-2 text-xs text-white bg-btn hover:bg-btn-hover rounded-md h-9"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )
        }
      </Popover>

      {/* filters Menu */}
      <Menu as="div">
        <MenuButton className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
          <Image src="/filter.svg" alt="filter" width={16} height={16} className="mr-2" />
          filters
        </MenuButton>
        <MenuItems className="absolute mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none">
          <MenuItem>
            <div 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 pointer" 
              onClick={filter}
            >
              type contains:  Store
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>

      {/* sort Menu */}
      <Menu as="div">
        <MenuButton className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
          <Image src="/sort.svg" alt="sort" width={16} height={16} className="mr-2" />
          sort
        </MenuButton>
        <MenuItems className="absolute mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none">
          <MenuItem>
            <div 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 pointer" 
              onClick={onSort}>
              {`Toggle to sort by time: ${order}`
            }
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>

      <div className='flex-1' />
    </div>
  );
}

export default memo(Header)