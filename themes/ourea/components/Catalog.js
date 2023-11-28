import { useCallback, useEffect, useRef, useState } from 'react'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import Progress from './Progress'
import { useGlobal } from '@/lib/global'

/**
 * 目录导航组件
 * @param toc
 * @returns {JSX.Element}
 * @constructor
 */
const Catalog = ({ toc }) => {
  // 监听滚动事件
  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [])

  // 目录自动滚动
  const tRef = useRef(null)
  const tocIds = []

  // 同步选中目录事件
  const [activeSection, setActiveSection] = useState(null)
  const throttleMs = 200
  const actionSectionScrollSpy = useCallback(throttle(() => {
    const sections = document.getElementsByClassName('notion-h')
    let prevBBox = null
    let currentSectionId = activeSection
    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i]
      if (!section || !(section instanceof Element)) continue
      if (!currentSectionId) {
        currentSectionId = section.getAttribute('data-id')
      }
      const bbox = section.getBoundingClientRect()
      const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
      const offset = Math.max(150, prevHeight / 4)
      // GetBoundingClientRect returns values relative to viewport
      if (bbox.top - offset < 0) {
        currentSectionId = section.getAttribute('data-id')
        prevBBox = bbox
        continue
      }
      // No need to continue loop, if last element has been detected
      break
    }
    setActiveSection(currentSectionId)
    const index = tocIds.indexOf(currentSectionId) || 0
    tRef?.current?.scrollTo({ top: 28 * index, behavior: 'smooth' })
  }, throttleMs))

  // 无目录就直接返回空
  if (!toc || toc.length < 1) {
    return <></>
  }

  return (
    <div className='relative overflow-y-auto overscroll-none scroll-hidden' ref={tRef}>
      <div className='absolute z-0 float-left px-2 py-3 h-full overflow-hidden'>
        <div className='w-0.5 h-full bg-gray-300'></div>
      </div>
      <div className='h-full text-black ml-5'>
        {toc.map((tocItem) => {
          const id = uuidToId(tocItem.id)
          tocIds.push(id)
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`hover:rounded notion-table-of-contents-item duration-300 transform font-light dark:text-gray-200
            notion-table-of-contents-item-indent-level-${tocItem.indentLevel} `}
            >
              <span className={`absolute z-20 -left-[17px] w-3 h-3 rounded-full bg-indigo-700 border-2 ${activeSection !== id && 'hidden'}`} />
              <span style={{ display: 'inline-block', marginLeft: tocItem.indentLevel * 16, fontSize: 18 - tocItem.indentLevel * 2 }}
                className={`px-2 ${activeSection === id && ' font-bold text-indigo-600 overflow-ellipsis truncate'}`}
              >
                {tocItem.text}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Catalog
