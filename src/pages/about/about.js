import '../../components/navbar/navbar.js'
import './about.scss'
if (process.env.NODE_ENV !== 'production') {
  require('./about.pug')
}

const p = document.createElement('p')
p.innerHTML = `I'm created by js.`
document.body.appendChild(p)
