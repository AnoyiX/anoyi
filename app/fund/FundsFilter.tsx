'use client'

import { Popover } from '@headlessui/react'
import { ReactNode, useEffect, useState } from 'react'
import { FilterIcon } from '../../components/Icons'

type CheckBoxProps = {
    id: string,
    onClick: (id: string) => void,
    children?: ReactNode
}

function CheckBox(props: CheckBoxProps) {
    return (
        <div>
            <input type="checkbox" id={props.id} className="hidden peer" onChange={() => props.onClick(props.id)} />
            <label htmlFor={props.id} className="px-2 py-1 text-xs text-gray-600 bg-gray-200 rounded cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                {props.children}
            </label>
        </div>
    )
}

export default function FundsFilter({ onChange }: { onChange: (value: any) => void }) {

    const TYPE = {
        T0: '债券型',
        T1: '货币型',
        T2: '混合型',
        T3: '股票型',
        T4: '指数型',
        T5: 'FOF',
        T6: 'QDII',
    }
    const RISKLEVEL = {
        R1: '低风险',
        R2: '中低风险',
        R3: '中风险',
        R4: '中高风险',
        R5: '高风险',
    }
    const SH = {
        S0: '持有天数≥7天',
        S1: '持有天数≥30天',
    }
    const keys = [...Object.keys(TYPE), ...Object.keys(RISKLEVEL), ...Object.keys(SH)]
    const values = Array.from({ length: Object.keys(TYPE).length + Object.keys(RISKLEVEL).length + Object.keys(SH).length }, _ => false)
    const [checked, setChecked] = useState<{ [key: string]: boolean }>(Object.fromEntries(keys.map((key, index) => [key, values[index]])))

    const onClickCheckBox = (id: string) => {
        setChecked(pre => {
            let state = { ...pre }
            state[id] = !pre[id]
            return state
        })
    }

    useEffect(() => {
        let filter: any = {}
        const typeKeys = Object.keys(TYPE).filter(key => checked[key])
        if (typeKeys.length > 0) {
            filter.FTYPE = { '$regex': typeKeys.map(key => TYPE[key as keyof typeof TYPE]).join('|') }
        }
        const riskLevelKeys = Object.keys(RISKLEVEL).filter(key => checked[key])
        if (riskLevelKeys.length > 0) {
            filter.RISKLEVEL = { '$in': riskLevelKeys.map(key => key.replace('R', ''))}
        }
        const shKeys = Object.keys(SH).filter(key => checked[key])
        if (shKeys.length > 0) {
            filter.sh = {
                '$elemMatch': {
                    feeRate: '0.00%',
                    rateSection: {
                        $in: shKeys.map(key => SH[key as keyof typeof SH])
                    }
                }
            }
        }
        onChange(filter)
    }, [checked])

    return (
        <Popover className="relative">
            <Popover.Button className="">
                <div className="flex-row-center bg-white shadow cursor-pointer px-3 py-2.5 rounded-lg gap-1.5">
                    <FilterIcon className="w-5 h-5" />
                    <span>筛选</span>
                </div>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 w-96 -right-0">
                <div className="bg-white rounded-lg shadow-xl shadow-slate-300 mt-2 flex flex-col px-4 py-5 gap-4">
                    <div>
                        <p className='font-medium'>基金类型</p>
                        <div className='mt-3 flex-row-center gap-y-3 gap-x-2 flex-wrap'>
                            {
                                Object.keys(TYPE).map(key => <CheckBox key={key} id={key} onClick={onClickCheckBox}>{TYPE[key as keyof typeof TYPE]}</CheckBox>)
                            }
                        </div>
                    </div>
                    <div>
                        <p className='font-medium'>风险等级</p>
                        <div className='mt-3 flex-row-center gap-y-3 gap-x-2 flex-wrap'>
                            {
                                Object.keys(RISKLEVEL).map(key => <CheckBox key={key} id={key} onClick={onClickCheckBox}>{RISKLEVEL[key as keyof typeof RISKLEVEL]}</CheckBox>)
                            }
                        </div>
                    </div>
                    <div>
                        <p className='font-medium'>免赎回费</p>
                        <div className='mt-3 flex-row-center gap-y-3 gap-x-2 flex-wrap'>
                            {
                                Object.keys(SH).map(key => <CheckBox key={key} id={key} onClick={onClickCheckBox}>{SH[key as keyof typeof SH]}</CheckBox>)
                            }
                        </div>
                    </div>
                </div>
            </Popover.Panel>
        </Popover>
    )
}