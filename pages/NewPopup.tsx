
import { useRef, useState } from 'react';
import Image from 'next/image';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Input
} from '@headlessui/react'

const types = [
    { id: 1, name: 'Text', img: 'text', type: 'string' },
    { id: 2, name: 'Number', img: 'number', type: 'number' },
    { id: 3, name: 'Date', img: 'date', type: 'date' },
    { id: 4, name: 'url', img: 'link', type: 'string' },
]

const DEFAULT_NEW_COLUMN_NAME = 'new'

type NewPopupProps = {
    onSave: (value: string, type: string) => void;
    close: () => void
};

const NewPopup: React.FC<NewPopupProps> = ({ onSave, close }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedType, setSelectedType] = useState(types[0])
    const [editValue, setEditValue] = useState(DEFAULT_NEW_COLUMN_NAME);
    const onSubmit = () => {
        onSave(editValue, selectedType.type)
        close()
    }

    return (
        <div
            className="w-120 absolute top-16 rounded-lg bg-white transition-property: height, right; duration-200 ease-out overflow-y-auto right-4 flex flex-col max-h-5/6 h-fit border border-gray-200 w-[400px] shadow-md"
        >
            <span className='flex items-center p-4 text-sm'>
                <Image src="/edit.svg" alt="edit" className="mr-2" width={14} height={14} />
                <Input
                    ref={inputRef}
                    defaultValue="new"
                    className="flex outline-none border-none text-sm"
                    onChange={(e) => setEditValue(e.target.value)}
                />
            </span>

            <button
                className='absolute top-4 right-4 w-[24px] h-[24px] flex items-center'
                onClick={close}
            >
                <Image src="/close.svg" alt="close" width={16} height={16} />
            </button>

            <div className='w-full h-[1px] bg-gray-100' />

            <div className='text-xs font-medium text-gray-600 pl-4 pt-3'>Data type</div>

            <div className='w-full h-[100px] p-3'>
                <Listbox value={selectedType} onChange={setSelectedType}>
                    <ListboxButton className='group relative block w-full rounded border border-gray-200 p-1 hover:bg-gray-50'>
                        <span className='flex items-center text-sm font-medium text-gray-500'>
                            <Image src={`./${selectedType.img}.svg`} alt="link" className="mr-2 ml-1" width={14} height={14} />
                            {selectedType.name}

                            <div className='absolute right-0'>
                                <Image src="./expand.svg" alt="link" className="mr-2" width={14} height={14} />
                            </div>
                        </span>

                    </ListboxButton>
                    <ListboxOptions anchor="bottom" className="w-[370px]  shadow-md">
                        {types.map((type) => (
                            <ListboxOption key={type.id} value={type} className="data-[focus]:bg-gray-100 p-2 bg-white">
                                <span className='flex items-center text-sm font-medium text-gray-500'>
                                    <Image src={`./${type.img}.svg`} alt="link" className="mr-2" width={14} height={14} />
                                    {type.name}
                                </span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
            </div>

            <div className='w-full h-[1px] bg-gray-100 mt-10' />

            <button
                onClick={onSubmit}
                className="px-3 py-2 text-xs text-white bg-btn hover:bg-btn-hover rounded-md mt-3 h-9 absolute right-3 bottom-3"
            >
                Save Settings
            </button>
        </div>
    )
}

export default NewPopup