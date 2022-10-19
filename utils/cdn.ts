const DevIconsVersion = '1.0.0'

const CDN = {
  icon: (name: string) => {
    return `https://cdn.jsdelivr.net/gh/AnoyiX/dev-icons@${DevIconsVersion}/icons/${name}.svg`
  }
}

export default CDN