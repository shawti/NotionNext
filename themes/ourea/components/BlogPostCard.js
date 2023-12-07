import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import LazyImage from '@/components/LazyImage'
// import Image from 'next/image'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  // ourea 主题默认强制显示图片
  if (post && !post.pageCoverThumbnail) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover = siteConfig('OUREA_POST_LIST_COVER', null, CONFIG) && post?.pageCoverThumbnail
  const delay = (index % 3) * 300
  return (
        <div
            data-aos="zoom-in"
            data-aos-duration="500"
            data-aos-delay={delay}
            data-aos-once="true"
            data-aos-anchor-placement="top-bottom"
            className="flex flex-col w-full h-full space-y-5 justify-between overflow-hidden">
            {/* 固定高度 ，空白用图片拉升填充 */}
          <div>
            <div className="flex-none flex w-full h-60">
              {/* 头部图片 填充卡片 */}
              {showPageCover && (
                // <Link href={`${siteConfig('SUB_PATH', '')}/${post.slug}`} passHref legacyBehavior>
                <div className="w-full duration-200 rounded-2xl transform overflow-hidden">
                  <LazyImage
                    src={post?.pageCoverThumbnail}
                    alt={post.title}
                    className="brightness-90 rounded-t-md transform object-cover duration-500"
                  />
                </div>
                // </Link>
              )}
            </div>
            <div>
              <Link
                key={post.category}
                href={`/category/${encodeURIComponent(post.category)}`}
                passHref
                className={'mt-5 mb-3 cursor-pointer mr-2 inline-block rounded-full duration-200 px-5 py-1 text-sm whitespace-nowrap text-[#5137d2] font-bold hover:text-[#7559ff] bg-[#ece8ff]'}>
                {post.category}
              </Link>
            </div>
            <div className="text-neutral-900 font-extrabold text-xl">
              {post.title}
            </div>
          </div>
            <div className="flex flex-row justify-between items-center">
              <Link href={`${siteConfig('SUB_PATH', '')}/${post.slug}`} passHref legacyBehavior>
                <a className='border border-neutral-900 py-2 px-5 rounded-full capitalize hover:bg-neutral-900 hover:text-white'>{'Learn More >'}</a>
              </Link>
              <span className='font-medium text-base text-[rgba(32,41,65,.5)]'>{post.lastEditedDay}</span>
            </div>
        </div>
  )
}

export default BlogPostCard
