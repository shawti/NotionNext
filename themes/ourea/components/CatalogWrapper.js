import Catalog from './Catalog'

/**
 * 目录
 * @param {*} param0
 * @returns
 */
export default function CatalogWrapper({ post }) {
  if (post?.toc?.length > 0) {
    return <div id='toc-wrapper' className='sticky h-full top-20 z-10 overflow-hidden' ><Catalog toc={post.toc} /></div>
  } else {
    return <></>
  }
}
