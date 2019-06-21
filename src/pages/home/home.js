import '../../components/navbar/navbar.js'
import './home.scss'
if (process.env.NODE_ENV !== 'production') {
  require('./home.pug')
}

const p = document.createElement('p')
p.innerHTML = `I'm created by js.`
document.body.appendChild(p)
