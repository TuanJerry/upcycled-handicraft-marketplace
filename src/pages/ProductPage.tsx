import { useState, useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { STORES } from '../data/stores'
import { productApi } from '../api'
import './ProductPage.css'

const QR_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/cec258ae061b5ddf61aad0c38263fac3ffcc464f?width=200'
const CRAFT_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=800'

// ── Kiểu từ API ───────────────────────────────────────────────────────────────
interface ApiProduct {
  id: number | string
  name: string
  description?: string
  price: number | string
  stock?: number
  category?: string
  materials?: string[] | { name: string; percentage: number }[]
  story?: string
  images?: string[]
  rating?: number
  ecoScore?: number
}

interface ApiStory {
  story?: string
  content?: string
  text?: string
}

// ── Helper: chuẩn hoá materials về dạng { name, percentage } ─────────────────
function normalizeMaterials(raw: ApiProduct['materials']): { name: string; percentage: number }[] {
  if (!raw || raw.length === 0) {
    return [
      { name: 'Vật liệu tái chế', percentage: 75 },
      { name: 'Vật liệu tự nhiên', percentage: 25 },
    ]
  }
  if (typeof raw[0] === 'string') {
    // backend trả về string[]
    const arr = raw as string[]
    const share = Math.floor(100 / arr.length)
    return arr.map((n, i) => ({ name: n, percentage: i === arr.length - 1 ? 100 - share * i : share }))
  }
  return raw as { name: string; percentage: number }[]
}

// ── Helper: format giá ────────────────────────────────────────────────────────
function formatPrice(p: number | string): string {
  if (typeof p === 'number') return `${p.toLocaleString('vi-VN')}đ`
  return String(p)
}

export default function ProductPage() {
  const { storeSlug, productId } = useParams<{ storeSlug: string; productId: string }>()
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState('')
  const [activeThumb, setActiveThumb] = useState(0)

  // ── State API ─────────────────────────────────────────────────────────────
  const [apiProduct, setApiProduct] = useState<ApiProduct | null>(null)
  const [story, setStory] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const store = STORES.find((s) => s.slug === storeSlug)
  const mockProduct = store?.products.find((p) => p.id === productId)

  // Gọi getById
  useEffect(() => {
    if (!productId) return
    setLoading(true)
    productApi
      .getById(productId)
      .then((res) => {
        const data: ApiProduct = res.data?.data ?? res.data
        if (data && data.id) {
          setApiProduct(data)
        } else {
          // Không tìm thấy ở API → dùng mock
          setApiProduct(null)
        }
      })
      .catch(() => {
        setApiProduct(null) // fallback mock
      })
      .finally(() => setLoading(false))
  }, [productId])

  // Gọi getStory (song song với getById, không block UI)
  useEffect(() => {
    if (!productId) return
    productApi
      .getStory(productId)
      .then((res) => {
        const data: ApiStory = res.data?.data ?? res.data
        const text = data?.story ?? data?.content ?? data?.text ?? ''
        if (text) setStory(text)
      })
      .catch(() => {
        // không có story từ API → fallback vào product.story hoặc ''
      })
  }, [productId])

  // ── Resolve dữ liệu hiển thị ─────────────────────────────────────────────
  const resolvedProduct = apiProduct
    ? {
        id: String(apiProduct.id),
        name: apiProduct.name,
        description: apiProduct.description ?? mockProduct?.description ?? '',
        price: formatPrice(apiProduct.price),
        category: apiProduct.category ?? mockProduct?.category ?? '',
        images: apiProduct.images?.length ? apiProduct.images : (mockProduct?.thumbnails ?? [mockProduct?.image ?? CRAFT_IMG]),
        rating: apiProduct.rating ?? mockProduct?.rating ?? '⭐ 4.8',
        ecoScore: apiProduct.ecoScore ?? mockProduct?.ecoScore ?? 90,
        materials: normalizeMaterials(apiProduct.materials),
        story: apiProduct.story ?? mockProduct?.description ?? '',
        details: mockProduct?.details ?? [
          'Kích thước: 28cm | Rộng nhất: 14cm | Nặng: 1.2kg',
          'Chống thấm nước 100%, phù hợp cho hoa tươi',
          'Men không chì, không độc hại từ thực vật',
        ],
        craftNote: mockProduct?.craftNote,
        stock: apiProduct.stock,
      }
    : mockProduct
    ? {
        id: mockProduct.id,
        name: mockProduct.name,
        description: mockProduct.description ?? '',
        price: mockProduct.price,
        category: mockProduct.category,
        images: mockProduct.thumbnails ?? [mockProduct.image],
        rating: mockProduct.rating,
        ecoScore: mockProduct.ecoScore ?? 90,
        materials: normalizeMaterials(undefined),
        story: '',
        details: mockProduct.details ?? [
          'Kích thước: 28cm | Rộng nhất: 14cm | Nặng: 1.2kg',
          'Chống thấm nước 100%, phù hợp cho hoa tươi',
          'Men không chì, không độc hại từ thực vật',
        ],
        craftNote: mockProduct.craftNote,
        stock: undefined as number | undefined,
      }
    : null

  // ── Xử lý trường hợp không tìm thấy store ────────────────────────────────
  if (!store) return <Navigate to="/san-pham" replace />

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="product-page">
        <Header activePage="products" />
        <main className="product-main">
          <div className="product-container product-loading-wrap">
            <div className="product-loading-spinner" />
            <p className="product-loading-text">Đang tải thông tin sản phẩm...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // ── Không tìm thấy cả API lẫn mock ────────────────────────────────────────
  if (!resolvedProduct && notFound) return <Navigate to={`/cua-hang/${storeSlug}`} replace />
  if (!resolvedProduct) return <Navigate to={`/cua-hang/${storeSlug}`} replace />

  const thumbnails = resolvedProduct.images
  const storyText = story || resolvedProduct.story || ''

  // Related products: dùng mock để không block
  const relatedProducts = (store.products || [])
    .filter((p) => p.id !== productId)
    .slice(0, 4)

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
                  alt={resolvedProduct.name}
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
                <h1 className="product-title">{resolvedProduct.name}</h1>
                <span className="product-eco-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C6 2 2 8 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.5 17.5 2 12 2z" fill="#3b823e" />
                    <path d="M8 12l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Eco Score: {resolvedProduct.ecoScore}/100
                </span>
              </div>

              <p className="product-price">{resolvedProduct.price}</p>

              {resolvedProduct.stock !== undefined && (
                <p className="product-stock">
                  {resolvedProduct.stock > 0 ? `Còn ${resolvedProduct.stock} sản phẩm` : 'Hết hàng'}
                </p>
              )}

              <div className="product-creator">
                <img src={store.avatarImage} alt={store.name} className="product-creator-avatar" />
                <div>
                  <Link to={`/cua-hang/${store.slug}`} className="product-creator-name">{store.name}</Link>
                  <p className="product-creator-meta">NGHỆ NHÂN BỀN VỮNG ĐƯỢC XÁC THỰC • {store.address.split(',').pop()?.trim()}</p>
                </div>
              </div>

              {resolvedProduct.description && (
                <p className="product-description">{resolvedProduct.description}</p>
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
              {/* Câu chuyện sản phẩm từ getStory */}
              {storyText && (
                <div className="product-story-block">
                  <h3 className="product-story-heading">Câu chuyện sản phẩm</h3>
                  <p className="product-story-text">{storyText}</p>
                </div>
              )}
              <a href="#" className="product-recycle-link">Hoặc xem hành trình trên tại đây</a>
            </div>

            <div className="product-detail-content">
              <div className="product-materials-section">
                <h2 className="product-detail-heading">Thành phần vật liệu</h2>
                <p className="product-materials-desc">
                  Sản phẩm được tạo tác từ sự pha trộn độc đáo giữa các vật liệu bền vững, thu gom từ các công trường và phú sa hữu cơ tự nhiên.
                </p>
                <div className="product-materials-grid">
                  {resolvedProduct.materials.map((mat, i) => (
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
                        <p className="product-material-pct">THÀNH PHẦN</p>
                        <p className="product-material-name">{mat.percentage}% {mat.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {resolvedProduct.craftNote && (
                <div className="product-craft-section">
                  <h2 className="product-detail-heading">Sự tinh xảo thủ công</h2>
                  <p className="product-craft-desc">{resolvedProduct.craftNote}</p>
                  <img src={CRAFT_IMG} alt="Thủ công mỹ nghệ" className="product-craft-img" />
                </div>
              )}

              <div className="product-specs-section">
                <h2 className="product-detail-heading">Kích thước &amp; Chi tiết</h2>
                <ul className="product-specs-list">
                  {resolvedProduct.details.map((d, i) => (
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

        {/* Related products (từ mock) */}
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
