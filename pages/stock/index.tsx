import AppHeader from "../../components/AppHeader"
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import StockIndices from "../../components/stock/StockIndices"
import StockLives from "../../components/stock/StockLives"
import StockPlates from "../../components/stock/StockPlates"


const Page = () => {

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>股市</title>
      </Head>

      <AppHeader path={[{name: '股市'},]} />

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

export default Page