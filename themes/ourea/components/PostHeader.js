import LazyImage from '@/components/LazyImage'
import BLOG from '@/blog.config'
import Link from 'next/link'

/**
 * 文章背景图
 */
export default function PostHeader({ post, siteInfo }) {
  const headerImage = post?.pageCoverThumbnail ? post?.pageCoverThumbnail : siteInfo?.pageCover
  const title = post?.title
  const category = post?.category
  return (
        <div id='header' className="container m-auto mt-10 px-24 flex flex-col lg:flex-row space-x-10 h-96 justify-center items-center w-full relative">
            <div className="flex flex-col space-y-10 leading-snug md:leading-snug shadow-text-md w-full lg:w-7/12">
                <div className='w-full'>
                  {category
                    ? <Link
                    key={category}
                    href={`/category/${encodeURIComponent(category)}`}
                    passHref
                    className={'cursor-pointer inline-block rounded-full duration-200 px-5 py-2 text-md ' +
                      'whitespace-nowrap bg-[#ece8ff] text-[#5137d2] font-bold hover:text-[#7559ff]'}>
                        {category}
                  </Link>
                    : ''}
                </div>
                <span className='font-extrabold text-3xl md:text-4xl text-neutral-900'>{title}</span>
                <span className='font-medium text-base text-[rgba(32,41,65,.5)]'>{post?.summary}</span>
                <div className='space-x-2'>
                  <span>{BLOG.AUTHOR}</span>
                  <span className='font-bold text-indigo-700'>/</span>
                  <span className='font-medium text-base text-[rgba(32,41,65,.5)]'>{post?.lastEditedDay}</span>
                </div>
            </div>
            <LazyImage alt={title} src={headerImage} className='rounded-xl pointer-events-none select-none w-full h-full object-cover'
                placeholder='blur' blurDataURL='/bg_image.jpg' />
        </div>
  )
}
