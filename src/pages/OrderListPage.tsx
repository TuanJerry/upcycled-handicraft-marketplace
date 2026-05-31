import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ORDERS } from '../data/orders'
import type { OrderStatus } from '../data/orders'
import './OrderListPage.css'

const PRODUCT_IMG_1 = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=400'
const PRODUCT_IMG_2 = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=400'

const RECOMMENDATION_PRODUCTS = [
  { category: 'Trang trí', name: 'Lọ hoa gốm sứ tái chế', price: '185.000 VND', image: PRODUCT_IMG_1 },
  { category: 'Văn phòng', name: 'Sổ tay bìa gỗ tái chế', price: '120.000 VND', image: PRODUCT_IMG_2 },
  { category: 'Đồ dùng', name: 'Bộ nồi thơm vỏ dừa', price: '210.000 VND', image: PRODUCT_IMG_1 },
  { category: 'Nghệ thuật', name: 'Tranh kim loại tái chế', price: '450.000 VND', image: PRODUCT_IMG_2 },
]

type FilterStatus = 'all' | OrderStatus

const STATUS_TABS: { key: FilterStatus; label: string }[] = [
  { key: 'all', label: 'Tất cả đơn' },
  { key: 'shipping', label: 'Đang giao (2)' },
  { key: 'completed', label: 'Hoàn thành' },
  { key: 'processing', label: 'Đang xử lý' },
  { key: 'cancelled', label: 'Đã hủy' },
]

export default function OrderListPage() {
  const [activeStatus, setActiveStatus] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())

  const filteredOrders = ORDERS.filter(order => {
    const matchesStatus = activeStatus === 'all' || order.status === activeStatus
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      order.code.toLowerCase().includes(q) ||
      order.product.name.toLowerCase().includes(q)
    return matchesStatus && matchesSearch
  })

  function toggleWishlist(index: number) {
    setWishlist(prev => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })
  }

  return (
    <div className="order-list-page">
      <Header activePage="home" />

      <main className="order-list-main">
        {/* Hero */}
        <section className="order-hero">
          <div className="order-hero-inner">
            <span className="order-hero-badge">MY PURCHASE HISTORY</span>
            <h1 className="order-hero-title">Đơn hàng của bạn</h1>
            <p className="order-hero-subtitle">
              Theo dõi hành trình của những sản phẩm tái chế đầy ý nghĩa mà bạn đã{' '}
              <span className="order-hero-subtitle-underline">chọn lựa cho ngôi nhà bền vững.</span>
            </p>
          </div>
        </section>

        {/* Filter & order list */}
        <section className="order-list-section">
          <div className="order-list-container">
            {/* Search & sort */}
            <div className="order-controls">
              <div className="order-search-wrap">
                <svg className="order-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#343434" fillOpacity="0.5" />
                </svg>
                <input
                  type="text"
                  className="order-search-input"
                  placeholder="Tìm theo mã đơn hoặc sản phẩm..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="order-sort-wrap">
                <span className="order-sort-label">Sắp xếp:</span>
                <select className="order-sort-select">
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                </select>
              </div>
            </div>

            {/* Status tabs */}
            <div className="order-tabs">
              {STATUS_TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`order-tab${activeStatus === tab.key ? ' order-tab--active' : ''}`}
                  onClick={() => setActiveStatus(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Orders */}
            <div className="order-cards">
              {filteredOrders.length === 0 ? (
                <div className="order-empty">
                  <p>Không tìm thấy đơn hàng phù hợp.</p>
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-card-header">
                      <div className="order-card-meta">
                        <div className="order-meta-group">
                          <span className="order-meta-label">MÃ ĐƠN HÀNG</span>
                          <span className="order-meta-value order-code">{order.code}</span>
                        </div>
                        <div className="order-meta-group">
                          <span className="order-meta-label">NGÀY ĐẶT</span>
                          <span className="order-meta-value">{order.date}</span>
                        </div>
                        <div className="order-meta-group">
                          <span className="order-meta-label">TRẠNG THÁI</span>
                          <span className={`order-status order-status--${order.status}`}>
                            <span className="order-status-dot" />
                            {order.statusLabel}
                          </span>
                        </div>
                      </div>
                      <div className="order-seller">
                        Người bán: <strong>{order.seller.name}</strong>
                      </div>
                    </div>

                    <div className="order-card-body">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="order-product-img"
                      />
                      <div className="order-product-info">
                        <p className="order-product-name">{order.product.name}</p>
                        <p className="order-product-meta">
                          Phân loại: {order.product.category} | SL: x{order.product.quantity}
                        </p>
                        <p className={`order-tracking-note order-tracking-note--${order.status}`}>
                          {order.trackingNote}
                        </p>
                      </div>
                      <div className="order-card-right">
                        <div className="order-total-block">
                          <span className="order-total-label">Tổng tiền</span>
                          <span className="order-total-value">{order.total}</span>
                        </div>
                        <Link to={`/don-hang/${order.id}`} className="order-detail-btn">
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="order-load-more-wrap">
              <button className="order-load-more-btn">
                Xem thêm đơn hàng cũ
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="order-recommendations">
          <div className="order-recommendations-inner">
            <div className="order-rec-header">
              <h2 className="order-rec-title"><em>Gợi ý cho lối sống xanh</em></h2>
              <Link to="/san-pham" className="order-rec-view-all">Xem tất cả →</Link>
            </div>
            <div className="order-rec-grid">
              {RECOMMENDATION_PRODUCTS.map((product, i) => (
                <div key={i} className="order-rec-card">
                  <div className="order-rec-img-wrap">
                    <img src={product.image} alt={product.name} className="order-rec-img" />
                    <button
                      className={`order-rec-wishlist-btn${wishlist.has(i) ? ' order-rec-wishlist-btn--active' : ''}`}
                      aria-label="Yêu thích"
                      onClick={() => toggleWishlist(i)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          stroke={wishlist.has(i) ? '#e53e3e' : '#343434'}
                          fill={wishlist.has(i) ? '#e53e3e' : 'none'}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="order-rec-body">
                    <p className="order-rec-category">{product.category}</p>
                    <p className="order-rec-name">{product.name}</p>
                    <p className="order-rec-price">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
