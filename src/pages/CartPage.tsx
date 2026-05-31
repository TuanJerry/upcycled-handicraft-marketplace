import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './CartPage.css'

const PRODUCT_IMG_1 = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=400'
const PRODUCT_IMG_2 = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=400'

interface CartItem {
  id: string
  image: string
  name: string
  meta: string
  price: number
  priceLabel: string
  category: string
  quantity: number
}

interface CartStore {
  id: string
  name: string
  avatar: string
  ecoScore: number
  ecoLabel: string
  shippingCost: number
  shippingType: string
  items: CartItem[]
}

const RECOMMENDED = [
  { name: 'Nến Thơm Sáp Đậu Nành Tự Nhiên', category: 'Nến & Không gian', price: '290.000đ', image: PRODUCT_IMG_1 },
  { name: 'Bộ Dụng Cụ Bếp Gỗ Sồi', category: 'Dụng cụ nhà bếp', price: '320.000đ', image: PRODUCT_IMG_2 },
  { name: 'Lọ hoa gốm sứ tái chế tối giản', category: 'Trang trí nhà cửa', price: '185.000đ', image: PRODUCT_IMG_1 },
  { name: 'Tranh kim loại tái chế thủ công', category: 'Nghệ thuật tường', price: '450.000đ', image: PRODUCT_IMG_2 },
]

const INITIAL_STORES: CartStore[] = [
  {
    id: 'eco-art-studio',
    name: 'EcoArt Studio',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/a30a10014afb77aa24e8b2f705174e5c2890c4f1?width=200',
    ecoScore: 92,
    ecoLabel: 'Ưu tiên vật liệu tái chế 100%',
    shippingCost: 40000,
    shippingType: 'Fast',
    items: [
      {
        id: 'ecoart-1',
        image: PRODUCT_IMG_1,
        name: 'Đèn bàn từ chai thủy tinh tái chế – Emerald Night',
        meta: 'Màu: Gỗ sồi tự nhiên · Phân loại: Single',
        price: 350000,
        priceLabel: '350.000đ',
        category: 'Sản phẩm nghệ thuật',
        quantity: 1,
      },
    ],
  },
  {
    id: 'green-weaver',
    name: 'Green Weaver',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/a30a10014afb77aa24e8b2f705174e5c2890c4f1?width=200',
    ecoScore: 85,
    ecoLabel: 'Sử dụng nguyên liệu tự nhiên 80%',
    shippingCost: 30000,
    shippingType: 'Standard',
    items: [
      {
        id: 'gw-1',
        image: PRODUCT_IMG_2,
        name: 'Giỏ Mây Đan Sợi Tự Nhiên',
        meta: 'Chất liệu: Mây tre đan · Xuất xứ: Ninh Bình',
        price: 780000,
        priceLabel: '780.000đ',
        category: 'Sản phẩm thủ công',
        quantity: 2,
      },
      {
        id: 'gw-2',
        image: PRODUCT_IMG_1,
        name: 'Túi Vải Linen Tự Nhiên',
        meta: 'Chất liệu: Linen hữu cơ · Màu: Trắng kem',
        price: 150000,
        priceLabel: '150.000đ',
        category: 'Vật liệu bền vững',
        quantity: 1,
      },
    ],
  },
]

function formatPrice(n: number) {
  return n.toLocaleString('vi-VN') + 'đ'
}

export default function CartPage() {
  const [stores, setStores] = useState<CartStore[]>(INITIAL_STORES)

  function updateQty(storeId: string, itemId: string, delta: number) {
    setStores(prev =>
      prev.map(store => {
        if (store.id !== storeId) return store
        return {
          ...store,
          items: store.items.map(item => {
            if (item.id !== itemId) return item
            const next = Math.max(1, item.quantity + delta)
            return { ...item, quantity: next }
          }),
        }
      })
    )
  }

  function removeItem(storeId: string, itemId: string) {
    setStores(prev =>
      prev
        .map(store => {
          if (store.id !== storeId) return store
          return { ...store, items: store.items.filter(i => i.id !== itemId) }
        })
        .filter(store => store.items.length > 0)
    )
  }

  const storeSubtotal = (store: CartStore) =>
    store.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const storeTotal = (store: CartStore) =>
    storeSubtotal(store) + store.shippingCost

  return (
    <div className="cart-page">
      <Header activePage="products" />

      <main className="cart-main">
        <div className="cart-container">
          <div className="cart-heading-block">
            <h1 className="cart-title">Giỏ hàng của bạn</h1>
            <p className="cart-subtitle">
              Các sản phẩm được nhóm theo từng cửa hàng để đảm bảo trải nghiệm vận chuyển tốt nhất.
            </p>
          </div>

          <div className="cart-notice">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="#3b823e" />
              <path d="M12 7v5M12 16v1" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="cart-notice-text">
              Lưu ý: Các sản phẩm từ cửa hàng khác nhau sẽ được xử lý thành các đơn hàng riêng biệt để tối ưu lộ trình xanh.
            </p>
          </div>

          {stores.length === 0 ? (
            <div className="cart-empty">
              <p>Giỏ hàng của bạn đang trống.</p>
              <Link to="/san-pham" className="cart-browse-link">Tiếp tục mua sắm →</Link>
            </div>
          ) : (
            <div className="cart-stores-list">
              {stores.map(store => (
                <div key={store.id} className="store-cart-card">
                  <div className="store-cart-header">
                    <div className="store-cart-identity">
                      <img src={store.avatar} alt={store.name} className="store-cart-avatar" />
                      <span className="store-cart-name">{store.name}</span>
                    </div>
                    <div className="store-eco-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M17 8C8 10 5.9 16.17 3.82 19.41L5.71 21C9 17.75 12.67 17 17 17V21l5-5-5-5v3z" fill="#3b823e" />
                      </svg>
                      <span className="eco-score-value">Tác động xanh: {store.ecoScore}/100</span>
                      <span className="eco-score-label">{store.ecoLabel}</span>
                    </div>
                  </div>

                  <div className="store-cart-items">
                    {store.items.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                        <div className="cart-item-info">
                          <p className="cart-item-name">{item.name}</p>
                          <p className="cart-item-meta">{item.meta}</p>
                          <div className="cart-item-controls">
                            <button
                              className="cart-qty-btn"
                              onClick={() => updateQty(store.id, item.id, -1)}
                              aria-label="Giảm số lượng"
                            >
                              −
                            </button>
                            <span className="cart-qty-value">{item.quantity}</span>
                            <button
                              className="cart-qty-btn"
                              onClick={() => updateQty(store.id, item.id, 1)}
                              aria-label="Tăng số lượng"
                            >
                              +
                            </button>
                            <button
                              className="cart-remove-btn"
                              onClick={() => removeItem(store.id, item.id)}
                            >
                              Loại bỏ
                            </button>
                          </div>
                        </div>
                        <div className="cart-item-price-col">
                          <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                          <span className="cart-item-category">{item.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="store-cart-footer">
                    <div className="store-shipping-info">
                      <span className="store-shipping-label">VẬN CHUYỂN</span>
                      <span className="store-shipping-value">
                        {formatPrice(store.shippingCost)} ({store.shippingType})
                      </span>
                    </div>
                    <div className="store-footer-right">
                      <div className="store-total-block">
                        <span className="store-total-label">Tổng cộng cửa hàng này</span>
                        <span className="store-total-value">{formatPrice(storeTotal(store))}</span>
                      </div>
                      <button className="store-checkout-btn">Tiến hành thanh toán</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <section className="cart-recommendations">
          <div className="cart-recommendations-inner">
            <div className="recommendations-header">
              <div>
                <h2 className="recommendations-title">Có thể bạn sẽ thích</h2>
                <p className="recommendations-subtitle">Dựa trên các sản phẩm bền vững bạn đã chọn.</p>
              </div>
              <Link to="/san-pham" className="recommendations-view-all">Xem tất cả →</Link>
            </div>
            <div className="recommendations-grid">
              {RECOMMENDED.map((product, i) => (
                <div key={i} className="recommendation-card">
                  <div className="recommendation-img-wrapper">
                    <img src={product.image} alt={product.name} className="recommendation-img" />
                    <button className="recommendation-wishlist-btn" aria-label="Yêu thích">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#343434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="recommendation-body">
                    <p className="recommendation-category">{product.category}</p>
                    <p className="recommendation-name">{product.name}</p>
                    <p className="recommendation-price">{product.price}</p>
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
