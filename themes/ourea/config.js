const CONFIG = {
  OUREA_HOME_BANNER_ENABLE: true,
  // 3.14.1以后的版本中，欢迎语在blog.config.js中配置，用英文逗号','隔开多个。
  OUREA_HOME_BANNER_GREETINGS: ['Hi，我是一个程序员', 'Hi，我是一个打工人', 'Hi，我是一个干饭人', '欢迎来到我的博客🎉'], // 首页大图标语文字

  OUREA_HOME_NAV_BUTTONS: true, // 首页是否显示分类大图标按钮
  OUREA_HOME_NAV_BACKGROUND_IMG_FIXED: false, // 首页背景图滚动时是否固定，true 则滚动时图片不懂； false则随鼠标滚动

  // 是否显示开始阅读按钮
  OUREA_SHOW_START_READING: true,

  // 菜单配置
  OUREA_MENU_CATEGORY: true, // 显示分类
  OUREA_MENU_TAG: true, // 显示标签
  OUREA_MENU_ARCHIVE: true, // 显示归档
  OUREA_MENU_SEARCH: true, // 显示搜索

  OUREA_POST_LIST_COVER: true, // 文章封面
  OUREA_POST_LIST_SUMMARY: true, // 文章摘要
  OUREA_POST_LIST_PREVIEW: true, // 读取文章预览

  OUREA_ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  OUREA_ARTICLE_COPYRIGHT: true, // 显示文章版权声明
  OUREA_ARTICLE_RECOMMEND: true, // 文章关联推荐

  OUREA_WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  OUREA_WIDGET_ANALYTICS: false, // 显示统计卡
  OUREA_WIDGET_TO_TOP: true,
  OUREA_WIDGET_TO_COMMENT: true, // 跳到评论区
  WIDGET_DARK_MODE: true, // 夜间模式
  OUREA_WIDGET_TOC: true // 移动端悬浮目录
}
export default CONFIG
