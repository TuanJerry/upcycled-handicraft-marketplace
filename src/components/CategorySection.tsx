import './CategorySection.css'

const categories = [
  {
    label: 'TRANG TRÍ NHÀ CỬA',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/b2ed5a95e08d0916cd0a4271b6a5d107c6a8d8e4?width=360',
    alt: 'Trang trí nhà cửa',
  },
  {
    label: 'THỜI TRANG TÁI CHẾ',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/0a2fb3f6d1b631384f0b50472bcb7941160f3f25?width=360',
    alt: 'Thời trang tái chế',
  },
  {
    label: 'NỘI THẤT BỀN VỮNG',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/35e1433f84b6c40c5c6eafb2caab416a573298bf?width=360',
    alt: 'Nội thất bền vững',
  },
  {
    label: 'ĐỒ GIA DỤNG',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/31450a5c870430b0a8237dd7b91531c56e1d7414?width=360',
    alt: 'Đồ gia dụng',
  },
  {
    label: 'PHỤ KIỆN & TRANG SỨC',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/b5d47d01e16c553ba30af06e5d6aaf2e857dbc00?width=360',
    alt: 'Phụ kiện và trang sức',
  },
  {
    label: 'TÁC PHẨM NGHỆ THUẬT',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/64d3065b1f55dca63bee3db42822e2c8f3b883aa?width=360',
    alt: 'Tác phẩm nghệ thuật',
  },
]

export default function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-see-all">
        <a href="#" className="see-all-link">Xem tất cả</a>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <g clipPath="url(#arrow-clip)">
            <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#3B823E" />
          </g>
          <defs>
            <clipPath id="arrow-clip"><rect width="24" height="24" fill="white" /></clipPath>
          </defs>
        </svg>
      </div>
      <div className="category-grid">
        {categories.map((cat) => (
          <a key={cat.label} href="#" className="category-item">
            <img src={cat.image} alt={cat.alt} className="category-img" />
            <span className="category-label">{cat.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
