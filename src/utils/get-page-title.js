import defaultSettings from '@/settings'

const title = defaultSettings.title || '生态环境部'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
