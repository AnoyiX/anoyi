import AppNav from '@/components/server/AppNav';
import FullContainer from '@/components/server/Containers';

export const metadata = {
  title: 'An emoji guide for your commit messages',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>
      <AppNav paths={[{ name: 'Git 表情' }]} />
      <FullContainer>
        {children}
      </FullContainer>
    </div>
  )
}
