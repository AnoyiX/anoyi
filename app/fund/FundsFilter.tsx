'use client'

import { Popover } from '@headlessui/react'
import { ReactNode } from 'react'
import { FilterIcon } from '../../components/Icons'
import { RISKLEVEL, SH, TYPE } from './Funds'

type CheckBoxProps = {
    id: string,
    checked: boolean,
    onToggle: (id: string) => void,
    children?: ReactNode
}

function CheckBox(props: CheckBoxProps) {

    const { id, checked, onToggle } = props

    return (
        <div className={`px-2 py-1 text-xs rounded cursor-pointer ${checked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`} onClick={() => onToggle(id)}>
            {props.children}
        </div>
    )
}

export default function FundsFilter({ filters, onToggleFilterItem }: { filters: { [key: string]: boolean }, onToggleFilterItem: (id: string) => void }) {

    return (
        <Popover className="relative">
            <Popover.Button className="outline-0">
                <div className={`flex-row-center bg-white shadow cursor-pointer px-3 py-3 rounded-lg gap-1.5 ${Object.values(filters).filter(b => b).length ? 'text-blue-500' : ''}`}>
                    <FilterIcon className="w-4 h-4" />
                    <span>筛选</span>
                </div>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 w-96 -right-0">
                <div className="bg-white rounded-lg shadow-xl shadow-slate-300 mt-2 flex flex-col px-4 py-5 gap-4">
                    <div>
                        <p className='font-medium'>基金类型</p>
                        <div className='mt-3 flex-row-center gap-y-3 gap-x-2 flex-wrap'>
                            {
                                Object.keys(TYPE).map(key => <CheckBox key={key} id={key} checked={filters[key]} onToggle={onToggleFilterItem}>{TYPE[key as keyof typeof TYPE]}</CheckBox>)
                            }
                        </div>
                    </div>
                    <div>
                        <p className='font-medium'>风险等级</p>
                        <div className='mt-3 flex-row-center gap-y-3 gap-x-2 flex-wrap'>
                            {
                                Object.keys(RISKLEVEL).map(key => <CheckBox key={key} id={key} checked={filters[key]} onToggle={onToggleFilterItem}>{RISKLEVEL[key as keyof typeof RISKLEVEL]}</CheckBox>)
                            }
                        </div>
                    </div>
                    <div>
                        <p className='font-medium'>免赎回费</p>
                        <div className='mt-3 flex-row-center gap-y-3 gap-x-2 flex-wrap'>
                            {
                                Object.keys(SH).map(key => <CheckBox key={key} id={key} checked={filters[key]} onToggle={onToggleFilterItem}>{SH[key as keyof typeof SH]}</CheckBox>)
                            }
                        </div>
                    </div>
                </div>
            </Popover.Panel>
        </Popover>
    )
}