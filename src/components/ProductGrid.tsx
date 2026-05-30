import './ProductGrid.css'

const products = [
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/266958d5f681c5b21619db9e5ad75891643f0706?width=484',
    name: 'Túi canvas tái chế',
    price: '250.000đ',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/88e60a0c0eee42256af1b9dbaaca91b324d600b6?width=484',
    name: 'Đèn chai thủy tinh',
    price: '320.000đ',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/35e1433f84b6c40c5c6eafb2caab416a573298bf?width=360',
    name: 'Khay gỗ pallet',
    price: '150.000đ',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/31450a5c870430b0a8237dd7b91531c56e1d7414?width=360',
    name: 'Sổ tay giấy tái chế',
    price: '85.000đ',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/b2ed5a95e08d0916cd0a4271b6a5d107c6a8d8e4?width=360',
    name: 'Lọ hoa gốm cũ',
    price: '210.000đ',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/b5d47d01e16c553ba30af06e5d6aaf2e857dbc00?width=360',
    name: 'Vòng tay vỏ ốc',
    price: '120.000đ',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/0a2fb3f6d1b631384f0b50472bcb7941160f3f25?width=360',
    name: 'Thảm lục bình',
    price: '450.000đ',
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/64d3065b1f55dca63bee3db42822e2c8f3b883aa?width=360',
    name: 'Giỏ tre đan',
    price: '190.000đ',
  },
]

export default function ProductGrid() {
  return (
    <section className="product-grid-section">
      <div className="product-section-header">
        <h2 className="product-section-title">Các Loại Sản Phẩm</h2>
        <div className="section-divider" aria-hidden="true" />
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.name} className="product-card">
            <img src={product.image} alt={product.name} className="product-card-img" />
            <div className="product-card-info">
              <h3 className="product-card-name">{product.name}</h3>
              <span className="product-card-price">{product.price}</span>
            </div>
            <button className="add-to-cart-btn">Thêm vào giỏ</button>
          </div>
        ))}
      </div>
    </section>
  )
}
