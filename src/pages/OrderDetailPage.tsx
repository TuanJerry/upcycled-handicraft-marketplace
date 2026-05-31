import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ORDERS } from '../data/orders'
import './OrderDetailPage.css'

const SELLER_LOGO = 'https://api.builder.io/api/v1/image/assets/TEMP/d8faf416aa5446b20f577be61820bb263e465afd?width=120'

const SHIPPING_STEPS = [
  { key: 'confirmed', label: 'Đã xác nhận' },
  { key: 'preparing', label: 'Đang chuẩn bị' },
  { key: 'shipping', label: 'Vận chuyển' },
  { key: 'delivered', label: 'Đã giao hàng' },
]

const STATUS_STEP_INDEX: Record<string, number> = {
  processing: 0,
  shipping: 2,
  completed: 3,
  cancelled: -1,
}

function CheckCircleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#3b823e" />
      <path d="M9 16.5L13.5 21L23 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ActiveStepIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke="#3b823e" strokeWidth="2" fill="white" />
      <circle cx="16" cy="16" r="6" fill="#3b823e" />
    </svg>
  )
}

function InactiveStepIcon({ isDelivered }: { isDelivered?: boolean }) {
  if (isDelivered) {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" stroke="#d1d5db" strokeWidth="2" fill="white" />
        <path d="M10 22c0-3.314 2.686-6 6-6s6 2.686 6 6M16 10v6M13 14l3-4 3 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke="#d1d5db" strokeWidth="2" fill="white" />
      <circle cx="16" cy="16" r="5" fill="#d1d5db" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#3b823e" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke="#3b823e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg width="32" height="22" viewBox="0 0 40 28" fill="none">
      <rect width="40" height="28" rx="4" fill="#016FD0" />
      <text x="5" y="20" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">AM</text>
      <text x="18" y="20" fill="#FFB600" fontSize="11" fontWeight="bold" fontFamily="sans-serif">EX</text>
    </svg>
  )
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const order = ORDERS.find(o => o.id === id)

  if (!order) {
    return (
      <div className="order-detail-page">
        <Header activePage="home" />
        <div className="order-detail-not-found">
          <h2>Không tìm thấy đơn hàng</h2>
          <Link to="/quan-ly-don-hang" className="order-detail-back-link">← Quay lại danh sách đơn hàng</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const currentStep = STATUS_STEP_INDEX[order.status] ?? 0

  return (
    <div className="order-detail-page">
      <Header activePage="home" />

      <main className="order-detail-main">
        {/* Hero */}
        <section className="order-detail-hero">
          <div className="order-detail-hero-inner">
            <span className="order-detail-hero-badge">ORDER DETAILS</span>
            <h1 className="order-detail-hero-title">Chi tiết đơn hàng</h1>
            <p className="order-detail-hero-subtitle">Theo dõi hành trình của những sản phẩm thủ công tái chế</p>
            <div className="order-detail-hero-meta">
              <span className="order-detail-hero-code">{order.code}</span>
              <span className={`order-detail-hero-status order-detail-status--${order.status}`}>
                <span className="order-detail-status-dot" />
                {order.statusLabel.toUpperCase()}
              </span>
              <span className="order-detail-hero-divider">|</span>
              <span className="order-detail-hero-date">Ngày đặt: {order.date}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="order-detail-content-section">
          <div className="order-detail-content-inner">
            {/* Left column */}
            <div className="order-detail-left-col">
              {/* Shipping status */}
              <div className="order-detail-card">
                <h2 className="order-detail-card-title">Trạng thái vận chuyển</h2>

                <div className="order-detail-stepper">
                  {SHIPPING_STEPS.map((step, i) => {
                    const isDone = i < currentStep
                    const isActive = i === currentStep
                    const isLast = i === SHIPPING_STEPS.length - 1

                    return (
                      <div key={step.key} className="order-detail-step-item">
                        <div className="order-detail-step-col">
                          <div className="order-detail-step-icon">
                            {isDone ? (
                              <CheckCircleIcon />
                            ) : isActive ? (
                              <ActiveStepIcon />
                            ) : (
                              <InactiveStepIcon isDelivered={isLast} />
                            )}
                          </div>
                          <span className={`order-detail-step-label${isActive ? ' order-detail-step-label--active' : ''}${isDone ? ' order-detail-step-label--done' : ''}`}>
                            {step.label}
                          </span>
                          {isActive && (
                            <span className="order-detail-step-eta">Dự kiến: 15/05</span>
                          )}
                        </div>
                        {i < SHIPPING_STEPS.length - 1 && (
                          <div className={`order-detail-step-line${isDone ? ' order-detail-step-line--done' : ''}`} />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="order-detail-tracking-note">
                  <RefreshIcon />
                  <div className="order-detail-tracking-text">
                    <span className="order-detail-tracking-message">{order.trackingNote}</span>
                    <span className="order-detail-tracking-time">{order.trackingTime}</span>
                  </div>
                </div>
              </div>

              {/* Product list */}
              <div className="order-detail-card">
                <div className="order-detail-products-header">
                  <h2 className="order-detail-card-title">Danh sách sản phẩm</h2>
                  <span className="order-detail-product-count">{order.product.quantity} SẢN PHẨM</span>
                </div>

                <div className="order-detail-product-row">
                  <img src={order.product.image} alt={order.product.name} className="order-detail-product-img" />
                  <div className="order-detail-product-info">
                    <div className="order-detail-product-badges">
                      {order.product.badges.map(badge => (
                        <span
                          key={badge}
                          className={`order-detail-badge${badge === 'HANDMADE' ? ' order-detail-badge--handmade' : ' order-detail-badge--eco'}`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    <p className="order-detail-product-name">{order.product.name}</p>
                    <p className="order-detail-product-meta">
                      Phân loại: {order.product.category} | Số lượng: x{order.product.quantity}
                    </p>
                    <div className="order-detail-product-hashtags">
                      {order.product.hashtags.map(tag => (
                        <span key={tag} className="order-detail-hashtag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="order-detail-product-price-col">
                    <span className="order-detail-product-price-label">Giá mỗi đơn vị</span>
                    <span className="order-detail-product-price">{order.product.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="order-detail-right-col">
              {/* Seller info */}
              <div className="order-detail-card">
                <span className="order-detail-sidebar-label">THÔNG TIN NGƯỜI BÁN</span>
                <div className="order-detail-seller-body">
                  <div className="order-detail-seller-logo-wrap">
                    <img src={SELLER_LOGO} alt={order.seller.name} className="order-detail-seller-logo" />
                  </div>
                  <div className="order-detail-seller-name">
                    {order.seller.name}
                    <span className="order-detail-seller-heart">♡</span>
                  </div>
                  <Link to={`/cua-hang/${order.seller.slug}`} className="order-detail-view-store-btn">
                    Xem cửa hàng
                  </Link>
                </div>
              </div>

              {/* Shipping info */}
              <div className="order-detail-card">
                <span className="order-detail-sidebar-label">THÔNG TIN GIAO HÀNG</span>

                <div className="order-detail-shipping-row">
                  <LocationIcon />
                  <div className="order-detail-shipping-text">
                    <span className="order-detail-shipping-recipient">{order.shipping.recipientName}</span>
                    <span className="order-detail-shipping-address">{order.shipping.address}</span>
                    <span className="order-detail-shipping-phone">{order.shipping.phone}</span>
                  </div>
                </div>

                <div className="order-detail-shipping-row">
                  <TruckIcon />
                  <div className="order-detail-shipping-text">
                    <span className="order-detail-shipping-method">{order.shipping.method}</span>
                    <span className="order-detail-shipping-eta">{order.shipping.estimatedDelivery}</span>
                  </div>
                </div>

                <div className="order-detail-sidebar-divider" />

                <span className="order-detail-sidebar-label">PHƯƠNG THỨC THANH TOÁN</span>
                <div className="order-detail-payment-row">
                  <CardIcon />
                  <div className="order-detail-shipping-text">
                    <span className="order-detail-shipping-method">{order.payment.type}</span>
                    <span className="order-detail-shipping-eta">**** **** **** {order.payment.last4}</span>
                  </div>
                </div>

                {order.note && (
                  <>
                    <div className="order-detail-sidebar-divider" />
                    <span className="order-detail-sidebar-label">GHI CHÚ ĐƠN HÀNG</span>
                    <p className="order-detail-note">"{order.note}"</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
