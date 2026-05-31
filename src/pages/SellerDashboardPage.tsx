import { Link } from 'react-router-dom'
import './SellerDashboardPage.css'

export default function SellerDashboardPage() {
  const username = localStorage.getItem('username') ?? 'Seller'

  return (
    <div className="seller-placeholder">
      <div className="seller-placeholder__card">
        {/* Badge */}
        <div className="seller-placeholder__badge">Seller UI</div>

        {/* Icon */}
        <div className="seller-placeholder__icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#D97706"/>
          </svg>
        </div>

        <h1 className="seller-placeholder__title">Xin chào, {username}! 👋</h1>
        <p className="seller-placeholder__desc">
          Seller Dashboard đang được xây dựng.<br />
          Bạn sẽ quản lý sản phẩm, đơn hàng và workshop tại đây.
        </p>

        {/* Coming soon features */}
        <ul className="seller-placeholder__features">
          <li>📦 Quản lý sản phẩm</li>
          <li>🛒 Xem đơn hàng từ khách</li>
          <li>🎨 Tạo & quản lý Workshop</li>
          <li>📊 Thống kê doanh thu</li>
        </ul>

        <Link to="/" className="seller-placeholder__back-btn">
          ← Quay về trang chủ
        </Link>
      </div>
    </div>
  )
}
