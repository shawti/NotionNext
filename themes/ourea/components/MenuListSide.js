import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import { MenuItemCollapse } from './MenuItemCollapse'

export const MenuListSide = (props) => {
  const { customNav, customMenu } = props
  const { locale } = useGlobal()

  let links = [
    { icon: 'fas fa-archive', name: locale.NAV.ARCHIVE, to: '/archive', show: siteConfig('OUREA_MENU_ARCHIVE', null, CONFIG) },
    { icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: siteConfig('OUREA_MENU_SEARCH', null, CONFIG) },
    { icon: 'fas fa-folder', name: locale.COMMON.CATEGORY, to: '/category', show: siteConfig('OUREA_MENU_CATEGORY', null, CONFIG) },
    { icon: 'fas fa-tag', name: locale.COMMON.TAGS, to: '/tag', show: siteConfig('OUREA_MENU_TAG', null, CONFIG) }
  ]

  if (customNav) {
    links = customNav.concat(links)
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
        <nav>
            {/* {links.map(link => <MenuItemNormal key={link?.id} link={link} />)} */}
            {links?.map(link => <MenuItemCollapse key={link?.id} link={link} />)}
        </nav>
  )
}
