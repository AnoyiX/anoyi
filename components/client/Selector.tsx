import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

export type SelectorProps = {
    value: string
    options: string[]
    className?: string
    onChange: (value: string) => void

}

export default function Selector({ value, options, className, onChange }: SelectorProps) {
    return (
        <Listbox value={value} onChange={onChange}>
            <div className={`relative ${className}`}>
                <Listbox.Button className="relative w-full cursor-default  rounded-lg bg-white shadow py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{value}</span>
                    <i className="fa-solid fa-sort pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400"></i>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((mode) => (
                            <Listbox.Option
                                key={mode}
                                className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                                value={mode}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                                            {mode}
                                        </span>
                                        {
                                            selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <i className="fa-solid fa-check"></i>
                                                </span>
                                            )
                                        }
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}