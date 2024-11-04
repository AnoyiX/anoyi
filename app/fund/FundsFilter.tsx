'use client'

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RiFilter2Fill } from "@remixicon/react";
import { ReactNode } from 'react';
import { RISKLEVEL, SH, TYPE } from './Funds';

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
        <Popover >
            <PopoverTrigger>
                <Button><RiFilter2Fill className="w-4 mr-2" />筛选</Button>
            </PopoverTrigger>
            <PopoverContent className='shadow-lg' align="end">
                <div className="flex flex-col py-4 gap-4">
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
            </PopoverContent>
        </Popover>
    )
}