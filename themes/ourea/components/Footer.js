import Logo from './Logo'
import logoIn from '@/public/images/ourea/logo-in.png';
import logoM from '@/public/images/ourea/logo-m.png';
import logoX from '@/public/images/ourea/logo-x.png';
import LazyImage from '@/components/LazyImage'
const Footer = ({ title }) => {
  const data = [
    // {
    //   title: ''
    //   // children: [
    //   //   { title: 'Generator', url: '' },
    //   //   { title: 'Ourea Tools', url: '' },
    //   //   { title: 'Ourea Translator', url: '' },
    //   // ],
    // },
    // {
    //   title: ''
    //   // children: [
    //   //   { title: 'Research', url: '' },
    //   //   { title: 'Ex-Models', url: '' },
    //   //   { title: 'Co-Works', url: '' },
    //   // ],
    // },
    // {
    //   title: 'INFLUENCER',
    //   children: [
    //     'US Influencer',
    //     'SEA Influencer',
    //     'AUNZ Influencer',
    //     'JP Influencer',
    //     'KR Influencer',
    //     'EUI Influencer',
    //     'METAP Influencer',
    //     'LATAM Influencer',
    //     'Movie Stars',
    //   ],
    // },
    // {
    //   title: ''
    //   // children: [
    //   //   { title: 'footage', url: '' },
    //   //   { title: 'Short Video', url: '' },
    //   // ],
    // },
    {
      title: 'COMPANY',
      children: [
        {
          title: 'About',
          url: 'https://visonstormx.feishu.cn/wiki/BUn8wnS17iO8qUknpyScE1wlnFg',
        },
        {
          title: 'Contect us',
          url: 'https://visonstormx.feishu.cn/wiki/KEpHwOvHlipYSgk9FSfc2NnanUc',
        },
        {
          title: 'Policy',
          url: 'https://visonstormx.feishu.cn/wiki/TqtAwNezQivinBkmZzucilE1nwP',
        }
        // { title: 'Public', url: '' },
        // { title: 'Newsroom', url: '' },
      ]
    }
  ];
  return (
    <footer id='footer' className='py-20 flex items-center justify-center'>
      <div className='relative container flex flex-col lg:flex-row justify-between'>
          <div className='flex-1 flex flex-col justify-center lg:justify-start text-[#7f7f7f] font-light text-[15px]'>
            <div className='w-full flex justify-start'>
              <Logo />
            </div>
            <div className='mt-[30px]'>
              GEN-AI creates unlimited video possibilities.
              <br />
              Generate Difference.
            </div>
            <div className='mt-5 lg:mt-[100px]'>
              ©2023 LantuAI INC· ALL RIGHTS RESERVED
            </div>
            <div className='text-[#b2b2b2]'>
              Office：
              <br />
              Shijingshan Oversea Building, Beijing, China.
            </div>
          </div>
          <div className='flex-1 flex mt-10 lg:mt-0 justify-start lg:justify-end'>
            {data.map((item, index) => {
              return (
                <div className='min-w-[35px]' key={index}>
                  <div className='text-[#4c4c4c] '>{item.title}</div>
                  <div>
                    {item.children?.map((item, index) => {
                      return (
                        <div
                          className='text-[#b2b2b2] text-[13px] mt-[20px]'
                          key={index}
                        >
                          <a href={item.url} target='_blank' rel="noreferrer">
                            {item.title}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className='flex-1 w-80 mt-10 lg:mt-0 text-[13px] text-[#b2b2b2] flex flex-col justify-start'>
            <div className='w-full flex mb-[20px] justify-start lg:justify-end'>
              <div className='mr-[15px]'>
                Find us:
              </div>
              <div className='flex justify-between items-center'>
                <div className='relative w-[20px] h-[20px]'>
                  <a href='https://twitter.com/OureaAI'>
                    <LazyImage src={logoX.src} alt='img for Find us' />
                  </a>
                </div>
              </div>
            </div>

            <div className='w-full flex mb-[20px] justify-start lg:justify-end'>
              <div className='mr-[15px]'>
                Email us:
              </div>
              <div>
                <div className='relative w-[20px] h-[15px]'>
                  <a href='mailto:customers@ourea.art'>
                    <LazyImage src={logoM.src} alt='img for Email us' />
                  </a>
                </div>
              </div>
            </div>

            <div className='w-full flex mb-[20px] justify-start lg:justify-end'>
              <div className='mr-[15px]'>
                Chat with CEO:
              </div>
              <div>
                <div className='relative w-[20px] h-[20px]'>
                  <a
                    href='https://www.linkedin.com/in/lei-wu-12803b229/'
                    target='_blank' rel="noreferrer"
                  >
                    <LazyImage src={logoIn.src} alt='img for Chat with CEO' />
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer
