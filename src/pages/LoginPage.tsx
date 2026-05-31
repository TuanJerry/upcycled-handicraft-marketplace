import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginPage.css'

type Tab = 'login' | 'register'

export default function LoginPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    localStorage.setItem('isLoggedIn', 'true')
    navigate('/')
  }

  return (
    <div className="auth-page">
      {/* Left panel */}
      <div className="auth-left-panel">
        <div className="auth-bg-image">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/b2de889117a7c69acf577bccd899b4ca1eb9f64d?width=1440"
            alt=""
            className="auth-bg-img"
          />
        </div>
        <div className="auth-bg-gradient" />

        <div className="auth-left-content">
          <div className="auth-left-top">
            <Link to="/" className="auth-logo-link">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/660f6c18db6d7537cebb5ee59cfe3ceca36267d3?width=102"
                alt="CraftCycle logo"
                className="auth-logo-img"
              />
              <span className="auth-logo-name">CraftCycle</span>
            </Link>
          </div>

          <div className="auth-left-body">
            <div className="auth-community-badge">Cộng đồng bền vững</div>
            <h1 className="auth-hero-title">
              Mỗi sản phẩm là một<br />hành trình tái sinh.
            </h1>
            <p className="auth-hero-desc">
              Tham gia cùng 50,000+ nghệ nhân và những người yêu môi trường để kiến tạo tương lai xanh từ những giá trị cũ.
            </p>
            <div className="auth-testimonial-card">
              <p className="auth-testimonial-quote">
                "Tôi tìm thấy linh hồn trong từng món đồ thủ công tại đây. Không chỉ là mua sắm, đó là sự tôn trọng thiên nhiên."
              </p>
              <div className="auth-testimonial-author">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2fb9215368e8e0a48604a79fa3c8cd7444be608f?width=80"
                  alt="Minh Anh"
                  className="auth-testimonial-avatar"
                />
                <div>
                  <div className="auth-testimonial-name">Minh Anh</div>
                  <div className="auth-testimonial-role">Nghệ nhân Tái chế</div>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-left-footer">
            <span className="auth-copyright">© 2024 EcoArtisan Marketplace. Inspired by Nature.</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          {/* Tab switcher */}
          <div className="auth-tab-switcher">
            <button
              className={`auth-tab-btn${activeTab === 'login' ? ' auth-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Đăng nhập
            </button>
            <button
              className={`auth-tab-btn${activeTab === 'register' ? ' auth-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Tạo tài khoản
            </button>
          </div>

          {activeTab === 'login' ? (
            <div className="auth-form-section">
              <div className="auth-form-header">
                <h2 className="auth-form-title">Chào mừng bạn trở lại</h2>
                <p className="auth-form-subtitle">Tiếp tục hành trình mua sắm bền vững của bạn</p>
              </div>

              <form className="auth-form" onSubmit={handleLogin}>
                <div className="auth-field">
                  <label className="auth-field-label" htmlFor="login-email">Email</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                        <path d="M1.5 2C0.671875 2 0 2.67188 0 3.5C0 3.97187 0.221875 4.41562 0.6 4.7L7.4 9.8C7.75625 10.0656 8.24375 10.0656 8.6 9.8L15.4 4.7C15.7781 4.41562 16 3.97187 16 3.5C16 2.67188 15.3281 2 14.5 2H1.5ZM0 5.5V12C0 13.1031 0.896875 14 2 14H14C15.1031 14 16 13.1031 16 12V5.5L9.2 10.6C8.4875 11.1344 7.5125 11.1344 6.8 10.6L0 5.5Z" fill="#2D4B37" fillOpacity="0.3" />
                      </svg>
                    </span>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="email@example.com"
                      className="auth-input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <div className="auth-field-label-row">
                    <label className="auth-field-label" htmlFor="login-password">Mật khẩu</label>
                    <a href="#" className="auth-forgot-link">Quên mật khẩu?</a>
                  </div>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path d="M4.5 4.5V6H9.5V4.5C9.5 3.11875 8.38125 2 7 2C5.61875 2 4.5 3.11875 4.5 4.5ZM2.5 6V4.5C2.5 2.01562 4.51562 0 7 0C9.48438 0 11.5 2.01562 11.5 4.5V6H12C13.1031 6 14 6.89687 14 8V14C14 15.1031 13.1031 16 12 16H2C0.896875 16 0 15.1031 0 14V8C0 6.89687 0.896875 6 2 6H2.5Z" fill="#2D4B37" fillOpacity="0.3" />
                      </svg>
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="auth-input"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="auth-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPassword ? (
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                          <path d="M10 3C6.13 3 2.73 5.11 1.08 8.38C2.73 11.65 6.13 13.75 10 13.75C13.87 13.75 17.27 11.65 18.92 8.38C17.27 5.11 13.87 3 10 3ZM10 11.88C7.86 11.88 6.12 10.14 6.12 8C6.12 5.86 7.86 4.12 10 4.12C12.14 4.12 13.88 5.86 13.88 8C13.88 10.14 12.14 11.88 10 11.88ZM10 5.6C8.68 5.6 7.6 6.68 7.6 8C7.6 9.32 8.68 10.4 10 10.4C11.32 10.4 12.4 9.32 12.4 8C12.4 6.68 11.32 5.6 10 5.6Z" fill="#2D4B37" fillOpacity="0.3" />
                        </svg>
                      ) : (
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                          <path d="M1.21268 0.159368C0.887676 -0.0968824 0.415801 -0.0375074 0.159551 0.287493C-0.0966993 0.612493 -0.0373243 1.08437 0.287676 1.34062L18.7877 15.8406C19.1127 16.0969 19.5846 16.0375 19.8408 15.7125C20.0971 15.3875 20.0377 14.9156 19.7127 14.6594L16.4252 12.0844C17.6627 10.8156 18.5002 9.39374 18.9221 8.38437C19.0252 8.13749 19.0252 7.86249 18.9221 7.61562C18.4564 6.49999 17.4783 4.87499 16.0158 3.51874C14.5471 2.14999 12.5252 0.999993 10.0002 0.999993C7.86893 0.999993 6.09393 1.82187 4.70955 2.89999L1.21268 0.159368ZM6.97205 4.67187C7.76893 3.94374 8.83455 3.49999 10.0002 3.49999C12.4846 3.49999 14.5002 5.51562 14.5002 7.99999C14.5002 8.77812 14.3033 9.50937 13.9564 10.1469L12.7502 9.20312C13.0127 8.59999 13.0814 7.90937 12.9002 7.22499C12.5533 5.92812 11.4064 5.05624 10.1314 5.00312C9.95018 4.99687 9.84393 5.19374 9.90018 5.36874C9.9658 5.56874 10.0033 5.78124 10.0033 6.00312C10.0033 6.32187 9.9283 6.62187 9.79705 6.88749L6.97518 4.67499L6.97205 4.67187ZM11.6564 12.1844C11.1439 12.3875 10.5846 12.5 10.0002 12.5C7.5158 12.5 5.50018 10.4844 5.50018 7.99999C5.50018 7.78437 5.5158 7.57499 5.54393 7.36874L2.59705 5.04687C1.88455 5.97499 1.37518 6.89999 1.0783 7.61562C0.975176 7.86249 0.975176 8.13749 1.0783 8.38437C1.54393 9.49999 2.52205 11.125 3.98455 12.4812C5.4533 13.85 7.47518 15 10.0002 15C11.4939 15 12.8096 14.5969 13.9439 13.9844L11.6564 12.1844Z" fill="#2D4B37" fillOpacity="0.3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="auth-remember-row">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="auth-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="auth-remember-label">Duy trì đăng nhập cho lần tới</label>
                </div>

                <button type="submit" className="auth-submit-btn">
                  Đăng nhập ngay
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                    <path d="M11.993 7.61794C12.3348 7.27615 12.3348 6.72107 11.993 6.37927L7.61797 2.00427C7.27617 1.66248 6.72109 1.66248 6.3793 2.00427C6.0375 2.34607 6.0375 2.90115 6.3793 3.24294L9.26406 6.12498H0.875C0.391016 6.12498 0 6.51599 0 6.99998C0 7.48396 0.391016 7.87498 0.875 7.87498H9.26133L6.38203 10.757C6.04023 11.0988 6.04023 11.6539 6.38203 11.9957C6.72383 12.3375 7.27891 12.3375 7.6207 11.9957L11.9957 7.62068L11.993 7.61794Z" fill="white" />
                  </svg>
                </button>
              </form>

              <div className="auth-divider" />

              <p className="auth-terms">
                Bằng việc tham gia, bạn đồng ý với{' '}
                <a href="#" className="auth-terms-link">Điều khoản</a>{' '}
                và{' '}
                <a href="#" className="auth-terms-link">Chính sách bảo mật</a>{' '}
                của chúng tôi.
              </p>
            </div>
          ) : (
            <div className="auth-form-section">
              <div className="auth-form-header">
                <h2 className="auth-form-title">Tạo tài khoản mới</h2>
                <p className="auth-form-subtitle">Bắt đầu hành trình sống xanh của bạn ngay hôm nay</p>
              </div>

              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="auth-field">
                  <label className="auth-field-label" htmlFor="reg-name">Họ và tên</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M9.99996 1.66667C5.39996 1.66667 1.66663 5.4 1.66663 10C1.66663 14.6 5.39996 18.3333 9.99996 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66667 9.99996 1.66667ZM5.89163 15.2333C6.24996 14.4833 8.43329 13.75 9.99996 13.75C11.5666 13.75 13.7583 14.4833 14.1083 15.2333C12.975 16.1333 11.55 16.6667 9.99996 16.6667C8.44996 16.6667 7.02496 16.1333 5.89163 15.2333ZM15.3 14.025C14.1083 12.575 11.2166 12.0833 9.99996 12.0833C8.78329 12.0833 5.89163 12.575 4.69996 14.025C3.84996 12.9083 3.33329 11.5167 3.33329 10C3.33329 6.325 6.32496 3.33333 9.99996 3.33333C13.675 3.33333 16.6666 6.325 16.6666 10C16.6666 11.5167 16.15 12.9083 15.3 14.025ZM9.99996 5C8.38329 5 7.08329 6.3 7.08329 7.91667C7.08329 9.53333 8.38329 10.8333 9.99996 10.8333C11.6166 10.8333 12.9166 9.53333 12.9166 7.91667C12.9166 6.3 11.6166 5 9.99996 5ZM9.99996 9.16667C9.30829 9.16667 8.74996 8.60833 8.74996 7.91667C8.74996 7.225 9.30829 6.66667 9.99996 6.66667C10.6916 6.66667 11.25 7.225 11.25 7.91667C11.25 8.60833 10.6916 9.16667 9.99996 9.16667Z" fill="#2D4B37" fillOpacity="0.3" />
                      </svg>
                    </span>
                    <input
                      id="reg-name"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="auth-input"
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-field-label" htmlFor="reg-email">Email</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                        <path d="M1.5 2C0.671875 2 0 2.67188 0 3.5C0 3.97187 0.221875 4.41562 0.6 4.7L7.4 9.8C7.75625 10.0656 8.24375 10.0656 8.6 9.8L15.4 4.7C15.7781 4.41562 16 3.97187 16 3.5C16 2.67188 15.3281 2 14.5 2H1.5ZM0 5.5V12C0 13.1031 0.896875 14 2 14H14C15.1031 14 16 13.1031 16 12V5.5L9.2 10.6C8.4875 11.1344 7.5125 11.1344 6.8 10.6L0 5.5Z" fill="#2D4B37" fillOpacity="0.3" />
                      </svg>
                    </span>
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="email@example.com"
                      className="auth-input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-field-label" htmlFor="reg-password">Mật khẩu</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path d="M4.5 4.5V6H9.5V4.5C9.5 3.11875 8.38125 2 7 2C5.61875 2 4.5 3.11875 4.5 4.5ZM2.5 6V4.5C2.5 2.01562 4.51562 0 7 0C9.48438 0 11.5 2.01562 11.5 4.5V6H12C13.1031 6 14 6.89687 14 8V14C14 15.1031 13.1031 16 12 16H2C0.896875 16 0 15.1031 0 14V8C0 6.89687 0.896875 6 2 6H2.5Z" fill="#2D4B37" fillOpacity="0.3" />
                      </svg>
                    </span>
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="auth-input"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPassword ? (
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                          <path d="M10 3C6.13 3 2.73 5.11 1.08 8.38C2.73 11.65 6.13 13.75 10 13.75C13.87 13.75 17.27 11.65 18.92 8.38C17.27 5.11 13.87 3 10 3ZM10 11.88C7.86 11.88 6.12 10.14 6.12 8C6.12 5.86 7.86 4.12 10 4.12C12.14 4.12 13.88 5.86 13.88 8C13.88 10.14 12.14 11.88 10 11.88ZM10 5.6C8.68 5.6 7.6 6.68 7.6 8C7.6 9.32 8.68 10.4 10 10.4C11.32 10.4 12.4 9.32 12.4 8C12.4 6.68 11.32 5.6 10 5.6Z" fill="#2D4B37" fillOpacity="0.3" />
                        </svg>
                      ) : (
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                          <path d="M1.21268 0.159368C0.887676 -0.0968824 0.415801 -0.0375074 0.159551 0.287493C-0.0966993 0.612493 -0.0373243 1.08437 0.287676 1.34062L18.7877 15.8406C19.1127 16.0969 19.5846 16.0375 19.8408 15.7125C20.0971 15.3875 20.0377 14.9156 19.7127 14.6594L16.4252 12.0844C17.6627 10.8156 18.5002 9.39374 18.9221 8.38437C19.0252 8.13749 19.0252 7.86249 18.9221 7.61562C18.4564 6.49999 17.4783 4.87499 16.0158 3.51874C14.5471 2.14999 12.5252 0.999993 10.0002 0.999993C7.86893 0.999993 6.09393 1.82187 4.70955 2.89999L1.21268 0.159368ZM6.97205 4.67187C7.76893 3.94374 8.83455 3.49999 10.0002 3.49999C12.4846 3.49999 14.5002 5.51562 14.5002 7.99999C14.5002 8.77812 14.3033 9.50937 13.9564 10.1469L12.7502 9.20312C13.0127 8.59999 13.0814 7.90937 12.9002 7.22499C12.5533 5.92812 11.4064 5.05624 10.1314 5.00312C9.95018 4.99687 9.84393 5.19374 9.90018 5.36874C9.9658 5.56874 10.0033 5.78124 10.0033 6.00312C10.0033 6.32187 9.9283 6.62187 9.79705 6.88749L6.97518 4.67499L6.97205 4.67187ZM11.6564 12.1844C11.1439 12.3875 10.5846 12.5 10.0002 12.5C7.5158 12.5 5.50018 10.4844 5.50018 7.99999C5.50018 7.78437 5.5158 7.57499 5.54393 7.36874L2.59705 5.04687C1.88455 5.97499 1.37518 6.89999 1.0783 7.61562C0.975176 7.86249 0.975176 8.13749 1.0783 8.38437C1.54393 9.49999 2.52205 11.125 3.98455 12.4812C5.4533 13.85 7.47518 15 10.0002 15C11.4939 15 12.8096 14.5969 13.9439 13.9844L11.6564 12.1844Z" fill="#2D4B37" fillOpacity="0.3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-field-label" htmlFor="reg-confirm-password">Xác nhận mật khẩu</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path d="M4.5 4.5V6H9.5V4.5C9.5 3.11875 8.38125 2 7 2C5.61875 2 4.5 3.11875 4.5 4.5ZM2.5 6V4.5C2.5 2.01562 4.51562 0 7 0C9.48438 0 11.5 2.01562 11.5 4.5V6H12C13.1031 6 14 6.89687 14 8V14C14 15.1031 13.1031 16 12 16H2C0.896875 16 0 15.1031 0 14V8C0 6.89687 0.896875 6 2 6H2.5Z" fill="#2D4B37" fillOpacity="0.3" />
                      </svg>
                    </span>
                    <input
                      id="reg-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="auth-input"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showConfirmPassword ? (
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                          <path d="M10 3C6.13 3 2.73 5.11 1.08 8.38C2.73 11.65 6.13 13.75 10 13.75C13.87 13.75 17.27 11.65 18.92 8.38C17.27 5.11 13.87 3 10 3ZM10 11.88C7.86 11.88 6.12 10.14 6.12 8C6.12 5.86 7.86 4.12 10 4.12C12.14 4.12 13.88 5.86 13.88 8C13.88 10.14 12.14 11.88 10 11.88ZM10 5.6C8.68 5.6 7.6 6.68 7.6 8C7.6 9.32 8.68 10.4 10 10.4C11.32 10.4 12.4 9.32 12.4 8C12.4 6.68 11.32 5.6 10 5.6Z" fill="#2D4B37" fillOpacity="0.3" />
                        </svg>
                      ) : (
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                          <path d="M1.21268 0.159368C0.887676 -0.0968824 0.415801 -0.0375074 0.159551 0.287493C-0.0966993 0.612493 -0.0373243 1.08437 0.287676 1.34062L18.7877 15.8406C19.1127 16.0969 19.5846 16.0375 19.8408 15.7125C20.0971 15.3875 20.0377 14.9156 19.7127 14.6594L16.4252 12.0844C17.6627 10.8156 18.5002 9.39374 18.9221 8.38437C19.0252 8.13749 19.0252 7.86249 18.9221 7.61562C18.4564 6.49999 17.4783 4.87499 16.0158 3.51874C14.5471 2.14999 12.5252 0.999993 10.0002 0.999993C7.86893 0.999993 6.09393 1.82187 4.70955 2.89999L1.21268 0.159368ZM6.97205 4.67187C7.76893 3.94374 8.83455 3.49999 10.0002 3.49999C12.4846 3.49999 14.5002 5.51562 14.5002 7.99999C14.5002 8.77812 14.3033 9.50937 13.9564 10.1469L12.7502 9.20312C13.0127 8.59999 13.0814 7.90937 12.9002 7.22499C12.5533 5.92812 11.4064 5.05624 10.1314 5.00312C9.95018 4.99687 9.84393 5.19374 9.90018 5.36874C9.9658 5.56874 10.0033 5.78124 10.0033 6.00312C10.0033 6.32187 9.9283 6.62187 9.79705 6.88749L6.97518 4.67499L6.97205 4.67187ZM11.6564 12.1844C11.1439 12.3875 10.5846 12.5 10.0002 12.5C7.5158 12.5 5.50018 10.4844 5.50018 7.99999C5.50018 7.78437 5.5158 7.57499 5.54393 7.36874L2.59705 5.04687C1.88455 5.97499 1.37518 6.89999 1.0783 7.61562C0.975176 7.86249 0.975176 8.13749 1.0783 8.38437C1.54393 9.49999 2.52205 11.125 3.98455 12.4812C5.4533 13.85 7.47518 15 10.0002 15C11.4939 15 12.8096 14.5969 13.9439 13.9844L11.6564 12.1844Z" fill="#2D4B37" fillOpacity="0.3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className="auth-submit-btn">
                  Tạo tài khoản
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                    <path d="M11.993 7.61794C12.3348 7.27615 12.3348 6.72107 11.993 6.37927L7.61797 2.00427C7.27617 1.66248 6.72109 1.66248 6.3793 2.00427C6.0375 2.34607 6.0375 2.90115 6.3793 3.24294L9.26406 6.12498H0.875C0.391016 6.12498 0 6.51599 0 6.99998C0 7.48396 0.391016 7.87498 0.875 7.87498H9.26133L6.38203 10.757C6.04023 11.0988 6.04023 11.6539 6.38203 11.9957C6.72383 12.3375 7.27891 12.3375 7.6207 11.9957L11.9957 7.62068L11.993 7.61794Z" fill="white" />
                  </svg>
                </button>
              </form>

              <div className="auth-divider" />

              <p className="auth-terms">
                Bằng việc tham gia, bạn đồng ý với{' '}
                <a href="#" className="auth-terms-link">Điều khoản</a>{' '}
                và{' '}
                <a href="#" className="auth-terms-link">Chính sách bảo mật</a>{' '}
                của chúng tôi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
