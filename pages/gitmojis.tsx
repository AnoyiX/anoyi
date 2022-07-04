import AppHeader from "../components/AppHeader"
import Head from 'next/head'
import FullContainer from "../components/Containers"
import { readFileSync } from 'fs'
import path from "path"

export interface Emoji {
  emoji: string
  entity: string
  code: string
  description: string
  name: string
  semver: string | null
  color: string
}

const Page = ({ data }) => {

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <Head>
        <title>An emoji guide for your commit messages</title>
      </Head>

      <AppHeader path={[{ name: 'Git Emojis' }]} />

      <FullContainer>

        <div className="text-center pt-16 pb-8 text-3xl font-mono font-semibold">
          🤓 An emoji guide for your commit messages
        </div>

        <div className="grid grid-cols-4 p-8 gap-10">
          {
            data.map((item: Emoji) => (
              <div key={item.name} className="shadow w-full rounded text-center hover:shadow-xl">
                <div
                  className="rounded-t w-full py-14 mb-6 cursor-pointer " style={{ backgroundColor: item.color }}
                  onClick={() => navigator.clipboard.writeText(item.emoji)}
                >
                  <div className="text-7xl">
                    {
                      item.emoji
                    }
                  </div>
                </div>
                <p
                  className="inline text-lg cursor-pointer font-mono font-semibold py-1 border-b-0 bg-no-repeat bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[length:100%_3px] bg-[length:0_3px] bg-left-bottom transition-[background-size] duration-500 ease-in-out"
                  onClick={() => navigator.clipboard.writeText(item.code)}
                >{item.code}</p>
                <p className="text-sm text-gray-500 mt-4 mb-6 px-4 font-sans">{item.description}</p>
              </div>
            ))
          }
        </div>

      </FullContainer>
    </div>
  )

}

export async function getStaticProps() {

  const content = readFileSync(path.join(process.cwd(), 'data', `gitmojis.json`), 'utf-8')

  return {
    props: {
      data: JSON.parse(content),
    },
  }

}

export default Page
