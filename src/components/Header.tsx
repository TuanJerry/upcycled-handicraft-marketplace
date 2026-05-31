import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  activePage?: 'home' | 'products' | 'workshop' | 'about'
}

export default function Header({ activePage = 'home' }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="announcement-bar">
        <div className="announcement-inner">
          <span className="announcement-text">
            Chào mừng bạn đến với cộng đồng sống xanh!
          </span>
          <div className="header-actions">
            <Link to="/gio-hang" className="header-icon-link" aria-label="Giỏ hàng">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#cart-clip)">
                  <mask id="cart-mask" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                    <path d="M20 0H0V20H20V0Z" fill="white" />
                  </mask>
                  <g mask="url(#cart-mask)">
                    <path d="M12.9584 10.8333C13.5834 10.8333 14.1334 10.4917 14.4167 9.975L17.4 4.56667C17.7084 4.01667 17.3084 3.33333 16.675 3.33333H4.34171L3.55837 1.66667H0.833374V3.33333H2.50004L5.50004 9.65833L4.37504 11.6917C3.76671 12.8083 4.56671 14.1667 5.83337 14.1667H15.8334V12.5H5.83337L6.75004 10.8333H12.9584ZM5.13337 5H15.2584L12.9584 9.16667H7.10837L5.13337 5ZM5.83337 15C4.91671 15 4.17504 15.75 4.17504 16.6667C4.17504 17.5833 4.91671 18.3333 5.83337 18.3333C6.75004 18.3333 7.50004 17.5833 7.50004 16.6667C7.50004 15.75 6.75004 15 5.83337 15ZM14.1667 15C13.25 15 12.5084 15.75 12.5084 16.6667C12.5084 17.5833 13.25 18.3333 14.1667 18.3333C15.0834 18.3333 15.8334 17.5833 15.8334 16.6667C15.8334 15.75 15.0834 15 14.1667 15Z" fill="white" />
                  </g>
                </g>
                <defs>
                  <clipPath id="cart-clip">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <a href="#" className="header-icon-link" aria-label="Tài khoản">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#user-clip)">
                  <mask id="user-mask" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                    <path d="M20 0H0V20H20V0Z" fill="white" />
                  </mask>
                  <g mask="url(#user-mask)">
                    <path d="M9.99996 1.66667C5.39996 1.66667 1.66663 5.4 1.66663 10C1.66663 14.6 5.39996 18.3333 9.99996 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66667 9.99996 1.66667ZM5.89163 15.2333C6.24996 14.4833 8.43329 13.75 9.99996 13.75C11.5666 13.75 13.7583 14.4833 14.1083 15.2333C12.975 16.1333 11.55 16.6667 9.99996 16.6667C8.44996 16.6667 7.02496 16.1333 5.89163 15.2333ZM15.3 14.025C14.1083 12.575 11.2166 12.0833 9.99996 12.0833C8.78329 12.0833 5.89163 12.575 4.69996 14.025C3.84996 12.9083 3.33329 11.5167 3.33329 10C3.33329 6.325 6.32496 3.33333 9.99996 3.33333C13.675 3.33333 16.6666 6.325 16.6666 10C16.6666 11.5167 16.15 12.9083 15.3 14.025ZM9.99996 5C8.38329 5 7.08329 6.3 7.08329 7.91667C7.08329 9.53333 8.38329 10.8333 9.99996 10.8333C11.6166 10.8333 12.9166 9.53333 12.9166 7.91667C12.9166 6.3 11.6166 5 9.99996 5ZM9.99996 9.16667C9.30829 9.16667 8.74996 8.60833 8.74996 7.91667C8.74996 7.225 9.30829 6.66667 9.99996 6.66667C10.6916 6.66667 11.25 7.225 11.25 7.91667C11.25 8.60833 10.6916 9.16667 9.99996 9.16667Z" fill="white" />
                  </g>
                </g>
                <defs>
                  <clipPath id="user-clip">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo-link">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a30a10014afb77aa24e8b2f705174e5c2890c4f1?width=102"
              alt="Upcycled Marketplace Logo"
              className="nav-logo"
            />
          </Link>
          <ul className="nav-menu">
            <li><Link to="/" className={`nav-link${activePage === 'home' ? ' nav-link--active' : ''}`}>Trang chủ</Link></li>
            <li><Link to="/san-pham" className={`nav-link${activePage === 'products' ? ' nav-link--active' : ''}`}>Sản phẩm</Link></li>
            <li><a href="#workshop" className={`nav-link${activePage === 'workshop' ? ' nav-link--active' : ''}`}>Workshop</a></li>
            <li><a href="#about" className={`nav-link${activePage === 'about' ? ' nav-link--active' : ''}`}>Về chúng tôi</a></li>
          </ul>
          <div className="search-bar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <clipPath id="search-clip">
                <rect width="24" height="24" fill="white" />
              </clipPath>
              <g clipPath="url(#search-clip)">
                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14V14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#343434" fillOpacity="0.5" />
              </g>
            </svg>
            <span className="search-placeholder">Search</span>
          </div>
        </div>
      </nav>
    </header>
  )
}
