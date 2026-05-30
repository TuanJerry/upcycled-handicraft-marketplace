import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { STORES } from '../data/stores'
import './ShopDetailPage.css'

export default function ShopDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [activeTab, setActiveTab] = useState<'newest' | 'popular'>('newest')

  const store = STORES.find((s) => s.slug === slug)
  if (!store) return <Navigate to="/san-pham" replace />

  return (
    <div className="shop-detail-page">
      <Header activePage="products" />

      <section
        className="store-hero"
        style={{ backgroundImage: `url(${store.bannerImage})` }}
      >
        <div className="store-hero-overlay" />
        <div className="store-hero-content">
          <div className="store-hero-profile">
            <div className="store-avatar-wrapper">
              <img src={store.avatarImage} alt={store.name} className="store-avatar-img" />
              <span className="store-verified-badge" aria-label="Đã xác minh">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#3b823e" />
                  <path d="M5.5 10.5l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="store-hero-info">
              <h1 className="store-hero-name">{store.name}</h1>
              <p className="store-hero-tagline">{store.tagline}</p>
              <div className="store-hero-stats">
                <div className="store-hero-stat">
                  <span className="store-stat-value">{store.workshopCount}</span>
                  <span className="store-stat-label">WORKSHOPS</span>
                </div>
                <div className="store-hero-stat">
                  <span className="store-stat-value">{store.productCount}</span>
                  <span className="store-stat-label">SẢN PHẨM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="store-detail-main">
        <div className="store-detail-container">
          <div className="store-detail-layout">

            <aside className="store-info-sidebar">
              <div className="story-card">
                <div className="story-card-heading">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 19.5V4.5A2.5 2.5 0 016.5 2H20v15" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h2 className="story-card-title">Câu chuyện của chúng tôi</h2>
                </div>
                <p className="story-card-text">{store.story}</p>
              </div>

              <div className="contact-card">
                <h2 className="contact-card-title">Thông tin liên hệ</h2>

                <div className="contact-row">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="#3b823e" />
                  </svg>
                  <div>
                    <p className="contact-field-label">Địa chỉ</p>
                    <p className="contact-field-value">{store.address}</p>
                  </div>
                </div>

                <div className="contact-row">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328z" fill="#3b823e" />
                  </svg>
                  <div>
                    <p className="contact-field-label">Số điện thoại</p>
                    <p className="contact-field-value">{store.phone}</p>
                  </div>
                </div>

                <div className="contact-row">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="#3b823e" strokeWidth="1.5" />
                    <path d="M8 1c-1.5 2-2.5 4-2.5 7s1 5 2.5 7M8 1c1.5 2 2.5 4 2.5 7S9.5 15 8 15M1 8h14" stroke="#3b823e" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div>
                    <p className="contact-field-label">Mạng xã hội</p>
                    <div className="contact-social-links">
                      <a href="#" className="contact-social-icon" aria-label="Facebook">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="#343434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                      <a href="#" className="contact-social-icon" aria-label="Twitter">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="#343434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                      <a href="#" className="contact-social-icon" aria-label="Instagram">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="2" width="20" height="20" rx="5" stroke="#343434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="#343434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M17.5 6.5h.01" stroke="#343434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="store-content-col">
              <section className="store-products-section">
                <div className="products-section-header">
                  <div>
                    <h2 className="products-section-title">Sản phẩm</h2>
                    <p className="products-section-subtitle">Được chế tác tỉ mỉ từ vật liệu bền vững</p>
                  </div>
                  <div className="products-tab-group">
                    <button
                      className={`products-tab${activeTab === 'newest' ? ' products-tab--active' : ''}`}
                      onClick={() => setActiveTab('newest')}
                    >
                      Mới nhất
                    </button>
                    <button
                      className={`products-tab${activeTab === 'popular' ? ' products-tab--active' : ''}`}
                      onClick={() => setActiveTab('popular')}
                    >
                      Phổ biến
                    </button>
                  </div>
                </div>

                <div className="products-grid">
                  {store.products.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-img-wrapper">
                        <img src={product.image} alt={product.name} className="product-card-img" />
                        <span className="product-rating-badge">{product.rating}</span>
                      </div>
                      <div className="product-card-body">
                        <h3 className="product-card-name">{product.name}</h3>
                        <p className="product-card-category">{product.category}</p>
                        <div className="product-card-footer">
                          <span className="product-card-price">{product.price}</span>
                          <Link
                            to={`/cua-hang/${slug}/san-pham/${product.id}`}
                            className="product-add-to-cart-btn"
                            aria-label="Thêm vào giỏ hàng"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="store-workshops-section">
                <h2 className="workshops-section-title">Workshop tại cửa hàng</h2>
                <div className="workshop-cards-list">
                  {store.workshops.map((workshop, i) => (
                    <div key={i} className="workshop-card">
                      <img src={workshop.image} alt={workshop.title} className="workshop-card-img" />
                      <div className="workshop-card-body">
                        <span className="workshop-schedule-badge">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#3b823e" strokeWidth="2" />
                            <line x1="16" y1="2" x2="16" y2="6" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" />
                            <line x1="8" y1="2" x2="8" y2="6" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" />
                            <line x1="3" y1="10" x2="21" y2="10" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          {workshop.schedule}
                        </span>
                        <h3 className="workshop-card-title">{workshop.title}</h3>
                        <p className="workshop-card-desc">{workshop.description}</p>
                        <div className="workshop-card-meta">
                          <span className="workshop-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <circle cx="12" cy="12" r="10" stroke="rgba(52,52,52,0.6)" strokeWidth="2" />
                              <path d="M12 6v6l4 2" stroke="rgba(52,52,52,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {workshop.duration}
                          </span>
                          <span className="workshop-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="rgba(52,52,52,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="9" cy="7" r="4" stroke="rgba(52,52,52,0.6)" strokeWidth="2" />
                              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="rgba(52,52,52,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Tối đa {workshop.maxParticipants} người
                          </span>
                        </div>
                      </div>
                      <div className="workshop-card-action">
                        <p className="workshop-card-price">{workshop.price}</p>
                        <button className="workshop-register-btn">Đăng ký ngay</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
