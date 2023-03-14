import 'moment/locale/zh-cn'
import AppHeader from "../../../components/server/AppNav"
import FullContainer from "../../../components/server/Containers"
import Stock from "./Stock"

export const metadata = {
  title: '股市',
}

export default async function Page({ params }: { params: { code: string } }) {

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <AppHeader paths={[{ name: '股市', url: '/stock' }, { name: '实时数据' }]} />

      <FullContainer>
        <Stock code={params.code} />
      </FullContainer>

    </div>
  )
}