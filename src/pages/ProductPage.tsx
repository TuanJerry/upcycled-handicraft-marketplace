import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { STORES } from '../data/stores'
import './ProductPage.css'

const QR_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/cec258ae061b5ddf61aad0c38263fac3ffcc464f?width=200'
const CRAFT_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=800'

export default function ProductPage() {
  const { storeSlug, productId } = useParams<{ storeSlug: string; productId: string }>()
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState('')
  const [activeThumb, setActiveThumb] = useState(0)

  const store = STORES.find((s) => s.slug === storeSlug)
  if (!store) return <Navigate to="/san-pham" replace />

  const product = store.products.find((p) => p.id === productId)
  if (!product) return <Navigate to={`/cua-hang/${storeSlug}`} replace />

  const thumbnails = product.thumbnails ?? [product.image]
  const relatedProducts = store.products.filter((p) => p.id !== product.id).slice(0, 4)

  const materials = product.materials ?? [
    { name: 'Vật liệu tái chế', percentage: 75 },
    { name: 'Vật liệu tự nhiên', percentage: 25 },
  ]

  const details = product.details ?? [
    'Kích thước: 28cm | Rộng nhất: 14cm | Nặng: 1.2kg',
    'Chống thấm nước 100%, phù hợp cho hoa tươi',
    'Men không chì, không độc hại từ trực thực vật',
  ]

  const ecoScore = product.ecoScore ?? 90

  return (
    <div className="product-page">
      <Header activePage="products" />

      <main className="product-main">
        <div className="product-container">

          {/* Top section: gallery + info */}
          <div className="product-top-section">
            <div className="product-gallery">
              <div className="product-main-image-wrapper">
                <img
                  src={thumbnails[activeThumb]}
                  alt={product.name}
                  className="product-main-image"
                />
              </div>
              <div className="product-thumbnails">
                {thumbnails.map((src, i) => (
                  <button
                    key={i}
                    className={`product-thumb-btn${activeThumb === i ? ' product-thumb-btn--active' : ''}`}
                    onClick={() => setActiveThumb(i)}
                    aria-label={`Ảnh ${i + 1}`}
                  >
                    <img src={src} alt={`Thumbnail ${i + 1}`} className="product-thumb-img" />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-info">
              <div className="product-info-header">
                <h1 className="product-title">{product.name}</h1>
                <span className="product-eco-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C6 2 2 8 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.5 17.5 2 12 2z" fill="#3b823e" />
                    <path d="M8 12l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Eco Score: {ecoScore}/100
                </span>
              </div>

              <p className="product-price">{product.price}</p>

              <div className="product-creator">
                <img src={store.avatarImage} alt={store.name} className="product-creator-avatar" />
                <div>
                  <Link to={`/cua-hang/${store.slug}`} className="product-creator-name">{store.name}</Link>
                  <p className="product-creator-meta">NGHỆ NHÂN BỀN VỮNG ĐƯỢC XÁC THỰC • {store.address.split(',').pop()?.trim()}</p>
                </div>
              </div>

              {product.description && (
                <p className="product-description">{product.description}</p>
              )}

              <div className="product-purchase-row">
                <div className="product-quantity-group">
                  <label className="product-field-label">SỐ LƯỢNG</label>
                  <div className="product-quantity-control">
                    <button
                      className="product-qty-btn"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      aria-label="Giảm số lượng"
                    >
                      −
                    </button>
                    <span className="product-qty-value">{quantity}</span>
                    <button
                      className="product-qty-btn"
                      onClick={() => setQuantity(q => q + 1)}
                      aria-label="Tăng số lượng"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="product-note-group">
                  <label className="product-field-label" htmlFor="product-note">GHI CHÚ THÊM</label>
                  <input
                    id="product-note"
                    type="text"
                    className="product-note-input"
                    placeholder="Ghi chú của người mua..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              <button className="product-add-to-cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>

          {/* Detail section */}
          <div className="product-detail-section">
            <div className="product-recycle-card">
              <h2 className="product-recycle-title">Hành trình tái chế</h2>
              <div className="product-qr-wrapper">
                <img src={QR_IMG} alt="QR Code hành trình tái chế" className="product-qr-img" />
              </div>
              <p className="product-qr-label">Quét để xem thêm về hành trình tái chế</p>
              <a href="#" className="product-recycle-link">Hoặc xem hành trình trên tại đây</a>
            </div>

            <div className="product-detail-content">
              <div className="product-materials-section">
                <h2 className="product-detail-heading">Thành phần vật liệu</h2>
                <p className="product-materials-desc">
                  Sản phẩm được tạo tác từ sự pha trộn độc đáo giữa các vật liệu bền vững, thu gom từ các công trường và phú sa hữu cơ tự nhiên.
                </p>
                <div className="product-materials-grid">
                  {materials.map((mat, i) => (
                    <div key={i} className="product-material-item">
                      <span className="product-material-icon" aria-hidden="true">
                        {i === 0 ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18M3 12h18M3 18h18" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        )}
                      </span>
                      <div>
                        <p className="product-material-pct">NỀN TẢNG</p>
                        <p className="product-material-name">{mat.percentage}% {mat.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {product.craftNote && (
                <div className="product-craft-section">
                  <h2 className="product-detail-heading">Sự tinh xảo thủ công</h2>
                  <p className="product-craft-desc">{product.craftNote}</p>
                  <img src={CRAFT_IMG} alt="Thủ công mỹ nghệ" className="product-craft-img" />
                </div>
              )}

              <div className="product-specs-section">
                <h2 className="product-detail-heading">Kích thước &amp; Chi tiết</h2>
                <ul className="product-specs-list">
                  {details.map((d, i) => (
                    <li key={i} className="product-spec-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" stroke="#3b823e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="product-related-section">
            <div className="product-related-inner">
              <div className="product-related-header">
                <div>
                  <h2 className="product-related-title">Có thể bạn cũng yêu thích...</h2>
                  <p className="product-related-subtitle">Thêm nhiều tác phẩm độc bản từ {store.name} và bạn hữu.</p>
                </div>
                <Link to={`/cua-hang/${store.slug}`} className="product-related-view-all">
                  XEM TOÀN BỘ BỘ SƯU TẬP →
                </Link>
              </div>

              <div className="product-related-grid">
                {relatedProducts.map((p) => (
                  <div key={p.id} className="product-related-card">
                    <div className="product-related-img-wrapper">
                      <img src={p.image} alt={p.name} className="product-related-img" />
                    </div>
                    <div className="product-related-card-body">
                      <h3 className="product-related-name">{p.name}</h3>
                      <p className="product-related-category">{p.category}</p>
                      <div className="product-related-footer">
                        <span className="product-related-price">{p.price}</span>
                        <Link
                          to={`/cua-hang/${store.slug}/san-pham/${p.id}`}
                          className="product-related-add-btn"
                          aria-label="Xem sản phẩm"
                        >
                          +
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
