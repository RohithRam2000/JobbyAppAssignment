import {Link, withRouter} from 'react-router-dom'

import {HiHome} from 'react-icons/hi'
import {RiShoppingBagFill} from 'react-icons/ri'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <div className="nav-menu-mobile">
            <ul className="nav-menu-list-mobile">
              <li className="nav-menu-item-mobile">
                <Link to="/" className="nav-link">
                  <HiHome className="nav-bar-image" />
                </Link>
              </li>

              <li className="nav-menu-item-mobile">
                <Link to="/jobs" className="nav-link">
                  <RiShoppingBagFill className="nav-bar-image" />
                </Link>
              </li>
            </ul>
            <button type="button" className="nav-mobile-btn">
              <FiLogOut className="nav-bar-image" onClick={onClickLogout} />
            </button>
          </div>
        </div>

        <div className="nav-bar-large-container">
          <div>
            <Link to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
          </div>
          <div>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
