import Link from 'next/link'
import LazyImage from '@/components/LazyImage'

const Logo = props => {
  return (
    <Link href='https://ourea.art' passHref legacyBehavior>
      <div className='flex flex-col justify-center items-center cursor-pointer'>
        <div className=' text-lg hover:scale-110 transform duration-200'>
          <LazyImage src='/images/ourea/logo.svg' className='h-8'/>
        </div>
      </div>
    </Link>
  )
}
export default Logo
