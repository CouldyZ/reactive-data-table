
import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import {
  Table,
  TableHeader,
  Column,
  Row,
  TableBody,
  Cell,
  Input
} from 'react-aria-components';

import useCustomColumns from '@/hooks/useCustomColumns'
import useRealTimeData from '@/hooks/useRealTimeData'

import Header from './Header'
import NewPopup from './NewPopup'

const Home = () => {
  const [editingCell, setEditingCell] = useState<{ id: number, field: string } | null>(null)
  const [editValue, setEditValue] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    data,
    updateEditRow,
    filterData,
    sortData,
    fetchPageData
  } = useRealTimeData()

  const {
    customColumns,
    deleteColumn,
    addColumn,
    updateColumn
  } = useCustomColumns()

  // Handle clicking outside to save
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) && editingCell ) {
        updateEditRow(editingCell, editValue)
        clearEdit()
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editingCell, editValue, updateEditRow])

  // Focus input when editing starts
  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editingCell])


  const handleStartEdit = (id: number, field: string, value: string) => {
    setEditingCell({ id: id, field })
    setEditValue(value)
  }

  const onEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingCell) {
      updateEditRow(editingCell, editValue)
      clearEdit()
    }
    if (e.key === 'Escape') {
      clearEdit()
    }
  }

  const clearEdit = () => {
    setEditingCell(null)
    setEditValue('')
  }

  const onShowPopup = useCallback(() => setShowPopup(true), [])
  const hidePopup = useCallback(() => setShowPopup(false), [])

  return (
    <div className="max-w-screen mx-auto flex max-h-full w-full flex-1 overflow-auto bg-white">
      <div className="flex flex-col space-y-0 mb-[500px]">
        <Header
          fetchPageData={fetchPageData}
          showPopup={onShowPopup}
          filter={filterData}
          sort={sortData}
        />

        <Table aria-label="Retailers data" className='border-t border-gray-200 rounded-lg shadow-sm mx-4 min-h-400'>
          <TableHeader>
            <Column isRowHeader className='group h-9 p-2 text-xs font-medium text-gray-50 border-b border-gray-200'>
              <div className='w-[14px] h-[14px] bg-gray-200 rounded' />
            </Column>
            <Column className='p-2 text-xs font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 text-left'>
              <span className='flex items-center'>
                <Image src="/number.svg" alt="number" className="mr-2" width={14} height={14} />
                id
              </span>
            </Column>
            <Column className='p-2 text-xs font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 text-left'>
              <span className='flex items-center'>
                <Image src="/date.svg" alt="date" className="mr-2" width={14} height={14} />
                Time
              </span>
            </Column>
            <Column className='p-2 text-xs font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 text-left'>
              <span className='flex items-center'>
                <Image src="/text.svg" alt="text" className="mr-2" width={14} height={14} />
                Type
              </span>
            </Column>
            <Column className='p-2 text-xs font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 text-left'>
              <span className='flex items-center'>
                <Image src="/link.svg" alt="link" className="mr-2" width={14} height={14} />
                URL
              </span>
            </Column>
            {
              customColumns?.map(column => (
                <Column className='p-2 text-xs font-medium w-[200px] text-gray-500 border border-gray-200 hover:bg-red-50 text-left' key={column.id}>
                  <span className='flex items-center' onClick={() => deleteColumn(column.id)}>
                    <Image src={`/${column.type}.svg`} alt="delete" className="mr-2" width={14} height={14} />
                    {column.name}
                    <Image src="/delete.svg" alt="delete" className="ml-3" width={14} height={14} />
                  </span>
                </Column>
              ))
            }
            <Column className='p-2 text-xs font-medium text-black border border-gray-200 hover:bg-gray-50 text-left'>
              <span className='flex items-center' onClick={onShowPopup}>
                <Image src="/add.svg" alt="link" className="mr-2" width={14} height={14} />
                New column
                <Image src="/expand.svg" alt="expand" className="ml-2" width={14} height={14} />
              </span>
            </Column>
          </TableHeader>

          <TableBody>
            {
              data?.map((item, index) => (
                <Row key={item.id} className='border-b border-gray-200'>
                  <Cell className='p-2 text-xs text-gray-500 w-[40px]'>
                    {index + 1}
                  </Cell>
                  <Cell className='p-2 text-xs text-gray-500 w-[100px] border border-gray-200'>
                    {item.id}
                  </Cell>
                  <Cell className='p-2 text-xs text-gray-700 h-[12px] border border-gray-200'>
                    <span className='block w-[110px] overflow-hidden whitespace-nowrap text-ellipsis text-gray-600'>
                      {dayjs(item.created_at).format(
                        'YYYY-MM-DD HH:mm',
                      )}
                    </span>
                  </Cell>

                  <Cell
                    className='p-2 text-xs text-gray-700 w-[200px] border border-gray-200'
                  >
                    {editingCell?.id === item.id && editingCell?.field === 'type' ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="outline-none border-none w-full text-xs"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onEditKeyDown(e)}
                      />
                    ) :
                      <div className="flex items-center group-hover/cell:opacity-0 w-full" onClick={() => handleStartEdit(item.id, 'type', item.type)} >
                        <span
                          className="block overflow-hidden whitespace-nowrap text-ellipsis text-[13px] text-gray-600 text-xs"
                          title={item.type}
                        >
                          {item.type}
                        </span>
                      </div>
                    }
                  </Cell>
                  <Cell className='p-2 text-xs text-gray-500 w-[200px] border border-gray-200'>
                    <a className='underline'>
                      {item.url}
                    </a>
                  </Cell>

                  {
                    customColumns?.map(customColumn => (
                      <Cell className='p-2 text-xs text-gray-700 border border-gray-200' key={item.id + customColumn.id}>
                        <Input
                          ref={inputRef}
                          defaultValue={item.other_columns ? item.other_columns[customColumn.name] : ''}
                          className="flex outline-none border-none text-sm"
                          onChange={(e) => updateColumn(item, customColumn.name, e.target.value)}
                        />
                      </Cell>
                    ))
                  }

                  {/* last empty column */}
                  <Cell className='p-2 text-xs text-gray-700 w-[150px] border border-gray-200' />
                </Row>
              ))
            }
          </TableBody>
        </Table>
      </div>
      {
        showPopup && <NewPopup onSave={addColumn} close={hidePopup} />
      }
    </div>
  )
}

export default Home