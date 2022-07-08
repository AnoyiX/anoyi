import AppHeader from "../../components/AppHeader"
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { Fragment, useEffect, useState } from "react"
import http from "../../utils/http"
import moment from "moment"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint, faGear, faPlus, faMagnifyingGlass, faTrashCan, faXmark, faBoxOpen, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Dialog, Transition } from "@headlessui/react"
import { Loading } from "../../components/Icons"

const ACCOUNTS_ACCESS_TOKEN = "ACCOUNTS_ACCESS_TOKEN"

interface SettingModalProps {
  isOpen: boolean
  accessToken: string
  setAccessToken: (token: string) => void
  onClose: () => void
}

export function SettingModal({ isOpen, accessToken, setAccessToken, onClose }: SettingModalProps) {

  const [token, setToken] = useState("")

  useEffect(() => {
    isOpen && setToken(accessToken)
  }, [isOpen])

  function onChange({ target: { value } }) {
    setToken(value);
  }

  function onSave() {
    localStorage.setItem(ACCOUNTS_ACCESS_TOKEN, token)
    setAccessToken(token)
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10"
        onClose={onClose}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white w-[25rem] mx-auto rounded-lg shadow">
              <button onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-3 ml-auto inline-flex items-center">
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">设置</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Access Token</label>
                    <input value={token} onChange={onChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <button onClick={onSave} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">保存</button>
                  <div className="text-sm text-gray-400 text-center">
                    联系微信「AnoyiX」获取 Access Token
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}


const Account = () => {

  const [accounts, setAccounts] = useState([])
  const [total, setTotal] = useState(0)
  const [showSetting, setShowSetting] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLoadPlugin, setIsLoadPlugin] = useState(false)
  const [query, setQuery] = useState({
    skip: 0,
    limit: 10,
    keyword: ''
  })

  useEffect(() => {
    const token = localStorage.getItem(ACCOUNTS_ACCESS_TOKEN) || ''
    setAccessToken(token)
    document.dispatchEvent(new CustomEvent('saveToken', { detail: accessToken }))
  }, [])

  useEffect(() => {
    if (accessToken.length > 0 && query.skip >= 0) {
      setLoading(true)
      http.get(`/api/accounts?token=${accessToken}&skip=${query.skip}&limit=${query.limit}&keyword=${query.keyword}`).then(data => {
        setAccounts(data.data)
        setLoading(false)
        setTotal(data.total)
      })
    }
  }, [accessToken, query])

  const deleteAccount = (account_id: string) => {
    fetch(`/api/account?token=${accessToken}&account_id=${account_id}`, { method: 'DELETE' })
      .then(resp => resp.json())
      .then(data => {
        if (data.data) {
          setAccounts(accounts.filter(item => item._id != account_id))
          setTotal(pre => pre - 1)
        }
      })
  }

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <Head>
        <title>账号切换</title>
      </Head>

      <AppHeader path={[{ name: '账号切换' }]} />

      <FullContainer>
        <div className="h-full flex flex-col justify-between">
          <div className="max-w-full prose text-base p-4 md:p-8">
            <div className="flex items-center justify-between">
              <div className="">
                <label htmlFor="table-search" className="sr-only">搜索</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-1 text-gray-400" />
                  </div>
                  <input
                    value={keyword}
                    onChange={event => setKeyword(event.target.value)}
                    onKeyDown={event => event.key == 'Enter' && setQuery({keyword, skip: 0, limit: query.limit})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
                    placeholder="搜索账号" />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="hidden" onClick={() => setIsLoadPlugin(true)} id="ExtensionActions"></div>
                <button onClick={() => setShowSetting(true)} className="border border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:text-blue-600 hover:border-blue-500">
                  <FontAwesomeIcon icon={faGear} className="mr-1" />
                  设置
                </button>
                <button id="reset" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  添加账号
                </button>
              </div>
            </div>
            {
              loading ?
                <div className="my-32 w-full flex justify-center items-center">
                  <Loading className='h-20 w-20' />
                </div>
                : <>
                  {
                    accounts.length > 0 && <>
                      <div className="relative overflow-x-auto border rounded-lg mt-6 divide-y">
                        {
                          accounts.map(item =>
                            <div className="flex items-center justify-between p-6" key={item._id}>
                              <div className="flex flex-row items-center gap-2">
                                <img className="w-12 h-12 rounded-full my-0" src={item.avatar_url} alt="" />
                                <div className="space-y-1">
                                  <div className="font-medium text-lg">{item.nick_name}</div>
                                  <div className="text-xs text-gray-400 flex gap-4">
                                    <span>关注 {item.following_count}</span>
                                    <span>粉丝 {item.follower_count}</span>
                                    <span>获赞 {item.total_favorited}</span>
                                    <span className="border h-4"></span>
                                    <span>抖音号 {item.unique_id}</span>
                                    <span className="border h-4"></span>
                                    <span>更新时间 {moment(item.update_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="inline-flex gap-2" role="group">
                                <button onClick={() => document.dispatchEvent(new CustomEvent('loginAccount', { detail: item.cookie }))} className="py-2 px-4 text-sm text-blue-500 border-blue-300 rounded-md border hover:text-blue-600 hover:border-blue-500">
                                  <FontAwesomeIcon icon={faFingerprint} className="mr-1" />
                                  登录
                                </button>
                                <button onClick={() => deleteAccount(item._id)} className="py-2 px-4 text-sm text-red-500 border-red-300 rounded-md border hover:text-red-600 hover:border-red-500">
                                  <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
                                  删除
                                </button>
                              </div>
                            </div>
                          )
                        }
                      </div>
                      <div className="mt-6 w-full flex items-center justify-end gap-4">
                        <span className="text-sm text-gray-500">
                          第 {query.skip / query.limit + 1} / {Math.ceil(total / query.limit)} 页
                        </span>
                        <div className="inline-flex rounded-md" role="group">
                          <button
                            onClick={() => setQuery(pre => ({...pre, skip: pre.skip - query.limit}))}
                            disabled={query.skip < 1}
                            className="py-1 px-4 text-xl text-gray-900 bg-white rounded-l-lg border border-gray-200 cursor-pointer hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-default">
                            <FontAwesomeIcon icon={faCaretLeft} />
                          </button>
                          <button
                            onClick={() => setQuery(pre => ({...pre, skip: pre.skip + query.limit}))}
                            disabled={Math.ceil(total /query.limit) <= (query.skip / query.limit + 1)}
                            className="py-1 px-4 text-xl text-gray-900 bg-white rounded-r-md border border-gray-200 cursor-pointer hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-default">
                            <FontAwesomeIcon icon={faCaretRight} />
                          </button>
                        </div>
                      </div>
                    </>
                  }
                </>
            }
          </div>
          {
            !loading && accounts.length == 0 && <div className="my-32 w-full flex flex-col gap-8 justify-center items-center">
              <FontAwesomeIcon icon={faBoxOpen} className="text-7xl text-gray-400" />
              <span className="text-gray-500 text-sm">当前账号库为空，请先采集账号后，刷新本页面！</span>
            </div>
          }
          <div className="w-full p-6 text-center text-sm text-gray-500">
            <span className="text-gray-500">Account Manager</span>
            <span className="border-l border-gray-400 h-3 mx-4"></span>
            <span className="text-gray-500">Version 0.1.0</span>
            <span className="border-l border-gray-400 h-3 mx-4"></span>
            <span className={isLoadPlugin ? "text-green-600" : "text-red-600"}>{isLoadPlugin ? "Connected" : "Disconnected"}</span>
          </div>
        </div>

      </FullContainer>

      <SettingModal isOpen={showSetting} onClose={() => setShowSetting(false)} accessToken={accessToken} setAccessToken={setAccessToken} />
    </div>
  )
}

export default Account