import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="home-container">
      <div className="header">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
          />
        </Link>
        <button onClick={onClickLogout} type="button">
          Logout
        </button>
      </div>
      <div className="main-container">
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default Home
