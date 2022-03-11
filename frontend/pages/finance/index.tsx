import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import StockIndicesGroup from "../../components/finance/StockIndicesGroup"
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Finace = () => {

  const categories = [{
    name: '沪深指数',
    type: 'hszs',
  }, {
    name: '港股指数',
    type: 'ggzs',
  }, {
    name: '美股指数',
    type: 'mgzs',
  }]

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>{InlineApps[3].name}</title>
      </Head>

      <AppHeader path={[InlineApps[3],]} />

      <FullContainer>
        <div className="p-4 md:p-8">
          <Tab.Group>
            <div className="w-full flex justify-center">
              <Tab.List className="flex w-96 p-1 gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                {categories.map((category) => (
                  <Tab
                    key={category.type}
                    className={({ selected }) =>
                      classNames(
                        'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                        selected ? 'bg-white shadow' : 'text-blue-50 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {category.name}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels className="mt-4">
              {categories.map((category, idx) => (
                <Tab.Panel key={idx} className={'bg-white rounded-xl md:p-4'}>
                  <StockIndicesGroup category={category.type} />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>

      </FullContainer>
    </div>
  )
}

export default Finace