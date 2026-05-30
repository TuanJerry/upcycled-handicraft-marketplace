import { Link } from 'react-router-dom'
import './StoreCard.css'

interface FeaturedProduct {
  image: string
  name: string
  price: string
}

interface StoreCardProps {
  slug: string
  bannerImage: string
  avatarImage: string
  name: string
  description: string
  productCount: number
  workshopCount: number
  featuredProducts: FeaturedProduct[]
}

export default function StoreCard({
  slug,
  bannerImage,
  avatarImage,
  name,
  description,
  productCount,
  workshopCount,
  featuredProducts,
}: StoreCardProps) {
  return (
    <div className="store-card">
      <div className="store-card-banner">
        <img src={bannerImage} alt={name} className="store-banner-img" />
        <img src={avatarImage} alt={`${name} avatar`} className="store-avatar" />
      </div>

      <div className="store-card-body">
        <div className="store-card-header">
          <div className="store-info">
            <h3 className="store-name">{name}</h3>
            <p className="store-description">{description}</p>
            <div className="store-stats">
              <span className="store-stat">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 2h12v10H2V2zm1 1v8h10V3H3zm2 2h6v1H5V5zm0 2h4v1H5V7z" fill="#343434" fillOpacity="0.6" />
                </svg>
                {productCount} Sản phẩm
              </span>
              <span className="store-stat">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8zm8-3.5a.5.5 0 01.5.5v3.793l2.146 2.147a.5.5 0 01-.708.707l-2.292-2.293A.5.5 0 017.5 9V5a.5.5 0 01.5-.5z" fill="#343434" fillOpacity="0.6" />
                </svg>
                {workshopCount} Workshop
              </span>
            </div>
          </div>
          <Link to={`/cua-hang/${slug}`} className="store-visit-btn">Xem cửa hàng</Link>
        </div>

        <div className="store-featured">
          <p className="store-featured-label">SẢN PHẨM NỔI BẬT</p>
          <div className="store-featured-grid">
            {featuredProducts.map((product) => (
              <a href="#" key={product.name} className="featured-product-item">
                <img src={product.image} alt={product.name} className="featured-product-img" />
                <div className="featured-product-info">
                  <span className="featured-product-name">{product.name}</span>
                  <span className="featured-product-price">{product.price}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
