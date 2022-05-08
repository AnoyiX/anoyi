import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import StockIndices from "../../components/finance/StockIndices"
import StockLives from "../../components/finance/StockLives"
import StockPlates from "../../components/finance/StockPlates"


const Finace = () => {

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>{InlineApps[3].name}</title>
      </Head>

      <AppHeader path={[InlineApps[3],]} />

      <StockIndices />

      <div className="flex flex-row gap-4">
        <FullContainer>
          <StockLives />
        </FullContainer>
        <div className="w-96 flex flex-0 flex-col gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="mb-2">板块涨幅榜</div>
            <StockPlates is_acs={true} limit={9} />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="mb-2">板块跌幅榜</div>
            <StockPlates is_acs={false} limit={9} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Finace