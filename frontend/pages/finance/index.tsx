import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import StockIndicesGroup from "../../components/finance/StockIndicesGroup"
import { Tab } from '@headlessui/react'
import StockLivesGroup from "../../components/finance/StockLivesGroup"

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

      <StockIndicesGroup />

      <div className="flex flex-row gap-4">
        <FullContainer>
          <StockLivesGroup />
        </FullContainer>
        <div className="w-64 bg-white flex flex-0 rounded-lg shadow p-4">
        </div>
      </div>
    </div>
  )
}

export default Finace