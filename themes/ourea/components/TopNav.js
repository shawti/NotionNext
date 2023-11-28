import { useGlobal } from '@/lib/global'
import { useCallback, useEffect } from 'react'
import Logo from './Logo'
// import SideBarDrawer from '@/components/SideBarDrawer'
// import SideBar from './SideBar'
import throttle from 'lodash.throttle'
import Link from 'next/link'

/**
 * 顶部导航
 * @returns
 * @param props
 */
const TopNav = props => {
  let windowTop
  const { isDarkMode } = useGlobal()
  const throttleMs = 200
  const scrollTrigger = useCallback(throttle(() => {
    requestAnimationFrame(() => {
      const scrollS = window.scrollY
      const nav = document.querySelector('#sticky-nav')
      const header = document.querySelector('#header')
      const showNav = scrollS <= windowTop || scrollS < 5 || (header && scrollS <= header.clientHeight * 2)// 非首页无大图时影藏顶部 滚动条置顶时隐藏// 非首页无大图时影藏顶部 滚动条置顶时隐藏
      if (!showNav) {
        nav && nav.classList.replace('top-0', '-top-20')
        windowTop = scrollS
      } else {
        nav && nav.classList.replace('-top-20', 'top-0')
        windowTop = scrollS
      }
      navDarkMode()
    })
  }, throttleMs))

  const navDarkMode = () => {
    const nav = document.getElementById('sticky-nav')
    const header = document.querySelector('#header')
    if (!isDarkMode && nav && header) {
      if (window.scrollY < header.clientHeight) {
        nav?.classList?.add('dark')
      } else {
        nav?.classList?.remove('dark')
      }
    }
  }

  // 监听滚动
  useEffect(() => {
    scrollTrigger()

    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  // const [isOpen, changeShow] = useState(false)

  // const toggleMenuOpen = () => {
  //   changeShow(!isOpen)
  // }
  //
  // const toggleMenuClose = () => {
  //   changeShow(false)
  // }

  return (
          <div id='sticky-nav' className={'flex justify-center top-0 sticky text-gray-200 w-full z-30 transform transition-all duration-200 bg-white'}>
              <div className='w-full flex justify-start items-center px-2 py-4'>
                  <div className='flex w-28'>
                      <Logo {...props} />
                  </div>

                  {/* 右侧功能 */}
                  <div className='grow flex justify-center items-center text-black space-x-12 font-michroma font-light'>
                    <span>Generate</span>
                    <Link href='https://ourea.art/videoTrans'>Tools</Link>
                    <Link href='/'>Case</Link>
                    <span>Company</span>
                  </div>
                  <div className='w-28 flex justify-end'>
                    {/* /!* 左侧功能 *!/ */}
                    {/* <div className='items-center block lg:hidden '> */}
                    {/*   <div onClick={toggleMenuOpen} className='w-8 justify-center items-center h-8 cursor-pointer flex lg:hidden'> */}
                    {/*     {isOpen ? <i className='fas fa-times' /> : <i className='fas fa-bars' />} */}
                    {/*   </div> */}
                    {/* </div> */}
                  </div>
              </div>
              {/* <SideBarDrawer isOpen={isOpen} onClose={toggleMenuClose}> */}
              {/*   <SideBar {...props} /> */}
              {/* </SideBarDrawer> */}
          </div>
  )
}

export default TopNav
