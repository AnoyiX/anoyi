import moment from "moment"
import 'moment/locale/zh-cn'
import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { useRouter } from 'next/router'
import useStockRealData from "../../hooks/useStockRealData"
import { useEffect } from "react"


const StockMetric = ({ name, value, valueStyle = '' }: { name: string, value: string, valueStyle?: string }) => {

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <span className="text-gray-600">{name}</span>
      <span className={`font-semibold ${valueStyle}`}>{value}</span>
    </div>
  )

}

const Page = () => {
  const router = useRouter()
  const { code } = router.query
  const fields = [
    "symbol",
    "prod_name",
    "last_px",
    "px_change",
    "px_change_rate",
    "high_px",
    "low_px",
    "open_px",
    "preclose_px",
    "market_value",
    "turnover_volume",
    "turnover_ratio",
    "turnover_value",
    "dyn_pb_rate",
    "amplitude",
    "dyn_pe",
    "trade_status",
    "circulation_value",
    "update_time",
    "price_precision",
    "week_52_high",
    "week_52_low",
    "static_pe",
    "source",
    "delisting_date"
  ]
  const { realData, fetchRealData } = useStockRealData([code as string], fields)

  useEffect(() => {
    router.isReady && fetchRealData()
  }, [router.isReady])

  const getTextColor = (num: number) => {
    if (num > 0) return 'text-red-600'
    if (num == 0) return 'text-gray-600'
    return 'text-green-600'
  }

  const formatUnit = (num: number) => {
    let i = 0
    let tmp = num
    while (tmp > 10000 && i < 2) {
      tmp = tmp / 10000;
      i++;
    }
    return `${tmp.toFixed(2)}${['', '万', '亿'][i]}`
  }

  const renderResult = () => {

    const stock = realData.snapshot[code as string]
    const stockObj = Object.fromEntries(realData.fields.map((_, i) => [realData.fields[i], stock[i]]))
    return (
      <div className="w-full flex flex-col gap-8 p-4">
        <div>
          <div className="flex flex-col gap-2">
            <span className="text-xl">{stockObj['prod_name']}（{stockObj['symbol']}）</span>
            <div className={`flex flex-row gap-2 items-end ${getTextColor(stockObj['px_change'] as number)}`}>
              <span className="text-5xl">{(stockObj['last_px'] as number).toFixed(2)}</span>
              <span>{(stockObj['px_change_rate'] as number) > 0 ? '+' : ''}{(stockObj['px_change_rate'] as number).toFixed(2)}%</span>
            </div>
            <div className="text-xs text-gray-500">
              {
                stockObj['trade_status'] === 'TRADE' && <span className="border rounded px-2 py-1 mr-2 border-blue-500 text-blue-500">交易中</span>
              }
              {
                stockObj['trade_status'] === 'BREAK' && <span className="border rounded px-2 py-1 mr-2 border-gray-500 text-gray-500">休市</span>
              }
              {
                stockObj['trade_status'] === 'HALT' && <span className="border rounded px-2 py-1 mr-2 border-red-500 text-red-500">停牌</span>
              }
              <span>{moment((stockObj['update_time'] as number) * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-8 w-full">
          <iframe
            src={`https://xuangubao.cn/tools/chart-widget/ashares/${code}`}
            className="w-[780px] h-[475px] rounded flex-none"
          />
          <div className="flex flex-col flex-1">
            <div className="font-semibold border-l-4 border-red-500 pl-2 mb-4 text-xl">主要指标</div>
            <div className="flex flex-col gap-2 px-4">
              <StockMetric name="昨收" value={(stockObj['preclose_px'] as number).toFixed(2)} />
              <StockMetric name="今开" value={(stockObj['open_px'] as number).toFixed(2)} valueStyle={getTextColor((stockObj['open_px'] as number) - (stockObj['preclose_px'] as number))} />
              <StockMetric name="最高" value={(stockObj['high_px'] as number).toFixed(2)} valueStyle={getTextColor((stockObj['high_px'] as number) - (stockObj['preclose_px'] as number))} />
              <StockMetric name="最低" value={(stockObj['low_px'] as number).toFixed(2)} valueStyle={getTextColor((stockObj['low_px'] as number) - (stockObj['preclose_px'] as number))} />
              <StockMetric name="振幅" value={`${(stockObj['amplitude'] as number).toFixed(2)}%`} />
              <StockMetric name="换手率" value={`${(stockObj['turnover_ratio'] as number).toFixed(2)}%`} />
              <StockMetric name="市盈率" value={(stockObj['dyn_pe'] as number).toFixed(2)} />
              <StockMetric name="市净率" value={(stockObj['dyn_pb_rate'] as number).toFixed(2)} />
              <StockMetric name="成交量" value={formatUnit((stockObj['turnover_volume'] as number))} />
              <StockMetric name="成交额" value={formatUnit((stockObj['turnover_value'] as number))} />
              <StockMetric name="总市值" value={formatUnit((stockObj['market_value'] as number))} />
              <StockMetric name="流通市值" value={formatUnit((stockObj['circulation_value'] as number))} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <Head>
        <title>{InlineApps[0].name}</title>
      </Head>

      <AppHeader path={[InlineApps[3], {name: '实时数据'}]} />

      <FullContainer>
        {
          router.isReady && realData.fields.length > 0 && renderResult()
        }
      </FullContainer>
    </div>
  )
}

export default Page