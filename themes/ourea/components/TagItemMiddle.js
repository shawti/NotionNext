import Link from 'next/link'

const TagItemMiddle = ({ tag, selected = false }) => {
  return (
      <Link
          key={tag}
          href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
          passHref
          className={`cursor-pointer mr-2 inline-block rounded-full duration-200 px-5 py-1 text-sm whitespace-nowrap text-[#5137d2] font-bold hover:text-[#7559ff] ${selected ? 'bg-black' : 'bg-[#ece8ff] '}`}>
          <div className='font-medium'>
              {selected && <i className='mr-1 fas fa-tag' />}
              {tag.name + (tag.count ? `(${tag.count})` : '')} </div>

      </Link>
  )
}

export default TagItemMiddle
