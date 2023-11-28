import CONFIG from './config'
import CommonHead from '@/components/CommonHead'
import TopNav from './components/TopNav'
import { useGlobal } from '@/lib/global'
import Footer from './components/Footer'
import { useEffect } from 'react'
import RightFloatButtons from './components/RightFloatButtons'
import { useRouter } from 'next/router'
import SearchNave from './components/SearchNav'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import Hero from './components/Hero'
import Announcement from './components/Announcement'
import CatalogWrapper from './components/CatalogWrapper'
import TagItemMiddle from './components/TagItemMiddle'
import PostHeader from './components/PostHeader'
import Link from 'next/link'
import ArticleAdjacent from './components/ArticleAdjacent'
import ArticleCopyright from './components/ArticleCopyright'
import NotionPage from '@/components/NotionPage'
import { ArticleInfo } from './components/ArticleInfo'
import { ArticleLock } from './components/ArticleLock'
import BlogPostArchive from './components/BlogPostArchive'
import Card from './components/Card'
import JumpToCommentButton from './components/JumpToCommentButton'
import BlogListBar from './components/BlogListBar'
import { Transition } from '@headlessui/react'
import { Style } from './style'
import replaceSearchResult from '@/components/Mark'
import { siteConfig } from '@/lib/config'

/**
 * 基础布局
 * 采用左右两侧布局，移动端使用顶部导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, headerSlot, meta, siteInfo } = props
  const { onLoading } = useGlobal()

  return (
        <div id='theme-ourea' className="min-h-screen flex flex-col justify-between bg-white dark:bg-black w-full">
            {/* SEO相关 */}
            <CommonHead meta={meta} siteInfo={siteInfo} />
            <Style/>

            {/* 顶部导航栏 */}
            <TopNav {...props} />

            {/* 顶部嵌入 */}
            {headerSlot}

            <main id="wrapper" className={`${siteConfig('OUREA_HOME_BANNER_ENABLE', null, CONFIG) ? '' : 'pt-16'} flex-1 container m-auto w-full relative`}>
                <div id="container-inner" className="w-full min-h-fit mx-auto flex justify-center relative">
                    <Transition
                        show={!onLoading}
                        appear={true}
                        enter="transition ease-in-out duration-700 transform order-first"
                        enterFrom="opacity-0 translate-y-16"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-16"
                        unmount={false}
                    >
                        {children}
                    </Transition>

                </div>

            </main>

            {/* 左下角悬浮 */}
            {/* <div className="bottom-4 -left-14 fixed justify-end z-40"> */}
            {/*     <Live2D /> */}
            {/* </div> */}

            {/* 右下角悬浮 */}
            <RightFloatButtons {...props} />

            {/* 页脚 */}
            <Footer title={siteConfig('TITLE')} />
        </div>
  )
}

/**
 * 首页
 * 首页就是一个文章列表，但是嵌入了Hero大图和公告
 * @param {*} props
 * @returns
 */
const LayoutIndex = (props) => {
  return <LayoutPostList {...props} containerSlot={<Announcement {...props} />} headerSlot={siteConfig('OUREA_HOME_BANNER_ENABLE', null, CONFIG) && <Hero {...props} />} />
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = (props) => {
  return (
        <LayoutBase {...props} containerSlot={<BlogListBar {...props} />}>
            {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}
        </LayoutBase>
  )
}

/**
 * 搜搜
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  })
  return (
        <LayoutBase {...props} currentSearch={currentSearch}>
            {!currentSearch
              ? <SearchNave {...props} />
              : <div id="posts-wrapper">
                    {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}
                </div>}
        </LayoutBase>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = (props) => {
  const { archivePosts } = props
  return <LayoutBase {...props} headerSlot={<PostHeader {...props} />} >
        <Card className='w-full -mt-32'>
            <div className="mb-10 pb-20 bg-white md:p-12 p-3 min-h-full dark:bg-hexo-black-gray">
                {Object.keys(archivePosts).map(archiveTitle => (
                    <BlogPostArchive
                        key={archiveTitle}
                        posts={archivePosts[archiveTitle]}
                        archiveTitle={archiveTitle}
                    />
                ))}
            </div>
        </Card>
    </LayoutBase>
}

/**
 * 文章详情页
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props

  return (<LayoutBase {...props} headerSlot={<PostHeader {...props} />} showCategory={false} showTag={false} floatRightBottom={<JumpToCommentButton />}>

        <div id='inner-wrapper' className={'w-full container px-24 m-auto'} >
            {/* 文章主体卡片 */}
            <div className="transition-all duration-300">

                {lock && <ArticleLock validPassword={validPassword} />}

                {!lock && <div id="article-wrapper" className="relative flex flex-col lg:flex-row space-x-20 mt-10">
                    {/* 文章目录 */}
                    <CatalogWrapper post={post} />
                    <div className='flex-1 overflow-x-hidden'>
                        {/* 文章信息 */}
                        {post?.type && post?.type === 'Post' && <>
                          <ArticleInfo post={post} />
                          <hr className='mt-3'/>
                        </>}
                        <div className='subpixel-antialiased'>
                          <article itemScope >
                            {/* Notion文章主体 */}
                            {post && <NotionPage post={post} />}
                          </article>
                        </div>
                    </div>
                </div>}
                {/* 版权说明 */}
                {post?.type === 'Post' && <ArticleCopyright {...props} />}
                {/* 底部文章推荐 */}
                {post?.type === 'Post' && <ArticleAdjacent {...props} />}
                {/* 底部公告 */}
                <Announcement {...props} />
            </div>
        </div>

    </LayoutBase>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      const article = typeof document !== 'undefined' && document.getElementById('notion-article')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
  })
  return (
        <LayoutBase {...props}>
            <div className="text-black w-full h-screen text-center justify-center content-center items-center flex flex-col">
                <div className="dark:text-gray-200">
                    <h2 className="inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top">
                        404
                    </h2>
                    <div className="inline-block text-left h-32 leading-10 items-center">
                        <h2 className="m-0 p-0">页面未找到</h2>
                    </div>
                </div>
            </div>
        </LayoutBase>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props

  return (
        <LayoutBase {...props} headerSlot={<PostHeader {...props} />} >

            <div id='inner-wrapper' className='w-full'>
                <div className="drop-shadow-xl -mt-32 rounded-md mx-3 px-5 lg:border lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray  dark:border-black dark:text-gray-300">
                    <div className='flex justify-center flex-wrap'>
                        {categoryOptions?.map(e => {
                          return (
                                <Link key={e.name} href={`/category/${e.name}`} passHref legacyBehavior>
                                    <div className='duration-300 text-md whitespace-nowrap dark:hover:text-white px-5 cursor-pointer py-2 hover:text-indigo-400' >
                                        <i className={'mr-4 fas fa-folder'} />  {e.name}({e.count})
                                    </div>
                                </Link>
                          )
                        })}
                    </div>
                </div>
            </div>
        </LayoutBase>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
        <LayoutBase {...props} headerSlot={<PostHeader {...props} />} >
            <div id='inner-wrapper' className='w-full drop-shadow-xl'>

                <div className="-mt-32 rounded-md mx-3 px-5 lg:border lg:rounded-xl lg:px-2 lg:py-4 bg-white dark:bg-hexo-black-gray  dark:border-black">

                    <div className="dark:text-gray-200 py-5 text-center  text-2xl">
                        <i className="fas fa-tags" />  {locale.COMMON.TAGS}
                    </div>

                    <div id="tags-list" className="duration-200 flex flex-wrap justify-center pb-12">
                        {tagOptions.map(tag => {
                          return (
                                <div key={tag.name} className="p-2">
                                    <TagItemMiddle key={tag.name} tag={tag} />
                                </div>
                          )
                        })}
                    </div>
                </div>
            </div>
        </LayoutBase>
  )
}

export {
  CONFIG as THEME_CONFIG,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutArchive,
  LayoutSlug,
  Layout404,
  LayoutCategoryIndex,
  LayoutTagIndex
}
