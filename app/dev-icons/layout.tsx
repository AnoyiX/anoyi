import AppNav from '@/components/server/AppNav';
import FullContainer from '@/components/server/Containers';

export const metadata = {
  title: 'Dev Icons',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>
      <AppNav paths={[{ name: 'Dev Icons' }]} />
      <FullContainer>
        {children}
      </FullContainer>
    </div>
  )
}