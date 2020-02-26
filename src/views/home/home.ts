import '@/components/nav/nav'
import '@/assets/fonts/iconfont/iconfont.css'
import '@/assets/styles/common.scss'
import './home.scss'

const sleep = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

const main = async () => {
  const jsEle = document.querySelector('#js')
  jsEle!.innerHTML = '我是 JS 填充的数据'

  console.log('--> before sleep')
  await sleep(2000)
  console.log('--> after sleep')

  jsEle!.innerHTML = '我是等待了 2 秒后 JS 改变的数据'
}

main()
