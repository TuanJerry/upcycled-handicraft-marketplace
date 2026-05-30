import './BestSellers.css'

const bestSellers = [
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/10736e581aa5bd28e3a7ba20589074b03129dfca?width=613',
    name: 'Đèn bàn từ chai thủy tinh tái chế',
    price: '350.000 VNĐ',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/d843b9e982b2863d0035036da68cbeb46efdb821?width=564',
    name: 'Túi xách từ bao tải dứa',
    price: '220.000 VNĐ',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/80d392eeca9578fe6565fcec3d35395561e72b64?width=613',
    name: 'Đồng hồ treo tường từ nắp chai',
    price: '180.000 VNĐ',
  },
]

export default function BestSellers() {
  return (
    <section className="best-sellers" id="products">
      <h2 className="section-title">Sản Phẩm Bán Chạy</h2>
      <div className="best-sellers-grid">
        {bestSellers.map((product) => (
          <div key={product.name} className="best-seller-col">
            <div className="best-seller-card">
              <img src={product.image} alt={product.name} className="best-seller-img" />
            </div>
            <div className="best-seller-info">
              <h3 className="best-seller-name">{product.name}</h3>
              <span className="best-seller-price">{product.price}</span>
              <button className="buy-now-btn">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
