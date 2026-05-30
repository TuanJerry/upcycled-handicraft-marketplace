import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import StoreCard from '../components/StoreCard'
import { STORES } from '../data/stores'
import './ShopListPage.css'

const CATEGORIES = [
  {
    label: 'Đồ gia dụng',
    children: ['Đèn trang trí', 'Trang sức thủ công', 'Túi xách tái chế', 'Sản phẩm khác'],
  },
  { label: 'Phụ kiện & Trang sức', children: [] },
  { label: 'Trang trí nhà cửa', children: [] },
  { label: 'Tác phẩm nghệ thuật', children: [] },
  { label: 'Nội thất bền vững', children: [] },
  { label: 'Thời trang tái chế', children: [] },
]

export default function ShopListPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Đồ gia dụng')
  const [allExpanded, setAllExpanded] = useState(true)
  const [visibleCount, setVisibleCount] = useState(2)

  const toggleAllCategories = () => setAllExpanded((prev) => !prev)

  const toggleCategory = (label: string) => {
    setExpandedCategory((prev) => (prev === label ? null : label))
  }

  return (
    <div className="shop-list-page">
      <Header activePage="products" />

      <section className="shop-hero">
        <div className="shop-hero-overlay">
          <h1 className="shop-hero-title">DANH SÁCH CỬA HÀNG</h1>
          <p className="shop-hero-subtitle">Khám phá các nghệ nhân và thương hiệu sống xanh</p>
        </div>
      </section>

      <main className="shop-main">
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <div className="sidebar-section">
              <button className="sidebar-section-toggle" onClick={toggleAllCategories} aria-expanded={allExpanded}>
                <span className="sidebar-section-title">Tất cả danh mục</span>
                <svg
                  className={`toggle-icon${allExpanded ? ' toggle-icon--up' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" stroke="#343434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {allExpanded && (
                <ul className="category-list">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.label} className="category-item">
                      <button
                        className={`category-btn${expandedCategory === cat.label ? ' category-btn--active' : ''}`}
                        onClick={() => cat.children.length > 0 && toggleCategory(cat.label)}
                      >
                        {cat.children.length > 0 && (
                          <svg
                            className={`category-arrow${expandedCategory === cat.label ? ' category-arrow--open' : ''}`}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {cat.children.length === 0 && <span className="category-arrow-placeholder" />}
                        {cat.label}
                      </button>

                      {cat.children.length > 0 && expandedCategory === cat.label && (
                        <ul className="subcategory-list">
                          {cat.children.map((child) => (
                            <li key={child}>
                              <a href="#" className="subcategory-link">{child}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="sidebar-section sidebar-price-filter">
              <button className="sidebar-section-toggle">
                <span className="sidebar-section-title">Tầm giá cửa hàng</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="#343434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </aside>

          <div className="shop-store-list">
            {STORES.slice(0, visibleCount).map((store) => (
              <StoreCard key={store.name} {...store} />
            ))}

            {visibleCount < STORES.length && (
              <button className="load-more-btn" onClick={() => setVisibleCount((c) => c + 2)}>
                Xem thêm cửa hàng
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {visibleCount >= STORES.length && (
              <div className="load-more-wrapper">
                <span className="no-more-stores">Xem thêm cửa hàng</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="#343434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
