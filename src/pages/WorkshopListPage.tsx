import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './WorkshopListPage.css'

const CATEGORIES = ['Tất cả', 'Tái chế nhựa/giấy', 'Handmade Decor', 'Nghệ thuật & Hội họa', 'Kỹ thuật mộc']

const FEATURED_WORKSHOP = {
  id: 'featured-1',
  image: 'https://api.builder.io/api/v1/image/assets/TEMP/bb5babe29e02645a7fa8d381db67450a44b69410?width=1438',
  rating: 5,
  reviewCount: 48,
  title: 'Chế tác bàn ghế gỗ từ pallet cũ - Creative Woodwork',
  organizer: 'Mộc Craft Studio',
  date: 'Thứ 7, ngày 24/08/2024',
  location: 'Tổ chức trực tiếp tại Quận 3, TP.HCM',
  spots: '03 / 10 chỗ',
  price: '450.000đ',
}

const WORKSHOPS = [
  {
    id: 'ws-1',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/7042a5ff74d21af8b611808ea62735ef41c7777a?width=757',
    mode: 'Offline',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/9b947f5d25ae523f5a7d94a2d9c89fac3eef6992?width=48',
    instructor: 'Lê Minh Tâm',
    title: 'Biến Chai Thủy Tinh thành Đèn Trang Trí',
    description: 'Học kỹ thuật cắt kính và trang trí đèn từ những chai rượu vang cũ đã qua sử dụng.',
    duration: '3 giờ',
    schedule: 'Chủ Nhật hàng tuần',
    price: '350.000đ',
    ecoScore: '9.8',
  },
  {
    id: 'ws-2',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/3801dbb1bac848e92223b6a83e7cd09ebdd796fa?width=757',
    mode: 'Online',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/d16e5c6a8e54594b687198756b78a606ddc53686?width=48',
    instructor: 'Hương Thảo',
    title: 'Nghệ thuật Macrame từ dây sợi tự nhiên',
    description: 'Sáng tạo các món đồ decor treo tường tinh tế chỉ bằng những nút thắt sợi cotton.',
    duration: '2 giờ',
    schedule: 'Thứ 7 linh hoạt',
    price: '250.000đ',
    ecoScore: null,
  },
  {
    id: 'ws-3',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/0eddb35438b9c34748f5bc0d05f2b08faca484bb?width=757',
    mode: 'Offline',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/9b947f5d25ae523f5a7d94a2d9c89fac3eef6992?width=48',
    instructor: 'Bùi Xuân',
    title: 'Sản xuất gốm thô từ đất sét tái chế',
    description: 'Trải nghiệm quy trình nhào nặn và nung gốm thủ công bằng phương pháp truyền thống.',
    duration: '4 giờ',
    schedule: 'Mỗi chiều Thứ 6',
    price: '520.000đ',
    ecoScore: null,
  },
  {
    id: 'ws-4',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8fc60acc965cb0edea18fa127860a99fb1f1d18f?width=757',
    mode: 'Offline',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/36c1443511dcf84b0012bed1633b029039cbf3de?width=48',
    instructor: 'Linh Lan',
    title: 'Chế tác trang sức từ vỏ sò & hạt nhựa',
    description: 'Tạo nên những bộ phụ kiện độc đáo từ những nguyên liệu biển cả tái sinh.',
    duration: '2.5 giờ',
    schedule: 'Theo yêu cầu',
    price: '290.000đ',
    ecoScore: null,
  },
  {
    id: 'ws-5',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/537bceca6ec7674b39b04f3bd69b7c65d3175a33?width=757',
    mode: 'Online',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/adb9b1b1df6d60bd5294c9c2357354016040f538?width=48',
    instructor: 'Hoàng Long',
    title: 'Tự làm giấy thủ công từ xơ thực vật',
    description: 'Tìm hiểu nghệ thuật làm giấy truyền thống từ vỏ chuối và bã mía.',
    duration: '3 giờ',
    schedule: 'Tối Thứ 4 linh hoạt',
    price: 'Miễn phí',
    ecoScore: null,
  },
  {
    id: 'ws-6',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/b3ec7661f30758cb65a1d6536a98b9581f3dbda6?width=757',
    mode: 'Offline',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/091d9eaf762bbcbbee3c9d5fb3a6218bb5ce0d53?width=48',
    instructor: 'Nhóm Indigo',
    title: 'Nhuộm chàm tự nhiên trên vải Linen',
    description: 'Học cách tạo màu từ cây chàm và thực hành kỹ thuật nhuộm Shibori Nhật Bản.',
    duration: '5 giờ',
    schedule: 'Cả ngày Thứ 7',
    price: '680.000đ',
    ecoScore: null,
  },
]

function StarIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
      <path d="M8.66522 0.492188C8.52029 0.191406 8.21404 0 7.87772 0C7.54139 0 7.23787 0.191406 7.09021 0.492188L5.33201 4.10977L1.40545 4.68945C1.07732 4.73867 0.803887 4.96836 0.702715 5.28281C0.601543 5.59727 0.683575 5.94453 0.918731 6.17695L3.76795 8.99609L3.09529 12.9801C3.04061 13.3082 3.17732 13.6418 3.44803 13.8359C3.71873 14.0301 4.07693 14.0547 4.37225 13.8988L7.88045 12.0258L11.3887 13.8988C11.684 14.0547 12.0422 14.0328 12.3129 13.8359C12.5836 13.6391 12.7203 13.3082 12.6656 12.9801L11.9902 8.99609L14.8394 6.17695C15.0746 5.94453 15.1594 5.59727 15.0554 5.28281C14.9515 4.96836 14.6808 4.73867 14.3527 4.68945L10.4234 4.10977L8.66522 0.492188Z" fill="#FFB800" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M11.7812 6.5C11.7812 7.90067 11.2248 9.24398 10.2344 10.2344C9.24398 11.2248 7.90067 11.7812 6.5 11.7812C5.09933 11.7812 3.75602 11.2248 2.76559 10.2344C1.77517 9.24398 1.21875 7.90067 1.21875 6.5C1.21875 5.09933 1.77517 3.75602 2.76559 2.76559C3.75602 1.77517 5.09933 1.21875 6.5 1.21875C7.90067 1.21875 9.24398 1.77517 10.2344 2.76559C11.2248 3.75602 11.7812 5.09933 11.7812 6.5ZM0 6.5C0 8.22391 0.68482 9.87721 1.90381 11.0962C3.12279 12.3152 4.77609 13 6.5 13C8.22391 13 9.87721 12.3152 11.0962 11.0962C12.3152 9.87721 13 8.22391 13 6.5C13 4.77609 12.3152 3.12279 11.0962 1.90381C9.87721 0.68482 8.22391 0 6.5 0C4.77609 0 3.12279 0.68482 1.90381 1.90381C0.68482 3.12279 0 4.77609 0 6.5ZM5.89062 3.04688V6.5C5.89062 6.70312 5.99219 6.89355 6.1623 7.00781L8.5998 8.63281C8.8791 8.8207 9.25742 8.74453 9.44531 8.4627C9.6332 8.18086 9.55703 7.80508 9.2752 7.61719L7.10938 6.175V3.04688C7.10938 2.70918 6.8377 2.4375 6.5 2.4375C6.1623 2.4375 5.89062 2.70918 5.89062 3.04688Z" fill="#9CA3AF" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
      <path d="M3.86107 0.609375C3.86107 0.27168 3.58927 0 3.25143 0C2.91358 0 2.64179 0.27168 2.64179 0.609375V1.625H1.62571C0.729031 1.625 0 2.35371 0 3.25V3.65625V4.875V11.375C0 12.2713 0.729031 13 1.62571 13H9.75429C10.651 13 11.38 12.2713 11.38 11.375V4.875V3.65625V3.25C11.38 2.35371 10.651 1.625 9.75429 1.625H8.73821V0.609375C8.73821 0.27168 8.46642 0 8.12857 0C7.79073 0 7.51893 0.27168 7.51893 0.609375V1.625H3.86107V0.609375ZM1.21929 4.875H10.1607V11.375C10.1607 11.5984 9.97782 11.7812 9.75429 11.7812H1.62571C1.40218 11.7812 1.21929 11.5984 1.21929 11.375V4.875Z" fill="#9CA3AF" />
    </svg>
  )
}

function ArrowIcon({ color = '#87A96B' }: { color?: string }) {
  return (
    <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
      <path d="M10.2797 6.52974C10.5727 6.23677 10.5727 5.76099 10.2797 5.46802L6.52969 1.71802C6.23672 1.42505 5.76094 1.42505 5.46797 1.71802C5.175 2.01099 5.175 2.48677 5.46797 2.77974L7.94062 5.25005H0.75C0.335156 5.25005 0 5.58521 0 6.00005C0 6.41489 0.335156 6.75005 0.75 6.75005H7.93828L5.47031 9.22036C5.17734 9.51333 5.17734 9.98911 5.47031 10.2821C5.76328 10.575 6.23906 10.575 6.53203 10.2821L10.282 6.53208L10.2797 6.52974Z" fill={color} />
    </svg>
  )
}

export default function WorkshopListPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="workshop-page">
      <Header activePage="workshop" />

      {/* Hero */}
      <section className="workshop-hero">
        <div className="workshop-hero-bg">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/2b5a5cc80e2d5fd37904dd9eb9b080f809680117?width=2880"
            alt="Workshop background"
            className="workshop-hero-img"
          />
          <div className="workshop-hero-gradient" />
        </div>
        <div className="workshop-hero-content">
          <h1 className="workshop-hero-title">Khám phá các<br />Workshop sống xanh</h1>
          <p className="workshop-hero-subtitle">
            Tham gia cộng đồng sáng tạo và biến những vật cũ thành giá trị mới thông qua<br />bàn tay nghệ nhân.
          </p>
          <div className="workshop-hero-actions">
            <button className="workshop-hero-btn-primary">
              Khám phá Workshop
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path d="M13.7063 6.70859C14.0969 6.31797 14.0969 5.68359 13.7063 5.29297L8.70625 0.292969C8.31563-0.0976563 7.68125-0.0976563 7.29063 0.292969C6.9 0.683594 6.9 1.31797 7.29063 1.70859L10.5875 5.00234H1C0.446875 5.00234 0 5.44922 0 6.00234C0 6.55547 0.446875 7.00234 1 7.00234H10.5844L7.29375 10.2961C6.90312 10.6867 6.90312 11.3211 7.29375 11.7117C7.68437 12.1023 8.31875 12.1023 8.70938 11.7117L13.7094 6.71172L13.7063 6.70859Z" fill="white" />
              </svg>
            </button>
            <button className="workshop-hero-btn-secondary">Workshop nổi bật</button>
          </div>
        </div>
        <div className="workshop-hero-scroll-hint">
          <span className="workshop-scroll-label">Cuộn để khám phá</span>
          <div className="workshop-scroll-line" />
        </div>
      </section>

      {/* Filters */}
      <section className="workshop-filters-section">
        <div className="workshop-filters-inner">
          <div className="workshop-filter-top">
            <div className="workshop-category-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`workshop-category-btn${activeCategory === cat ? ' workshop-category-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="workshop-sort-row">
              <span className="workshop-sort-label">Sắp xếp:</span>
              <select className="workshop-sort-select">
                <option>Mới nhất</option>
                <option>Giá thấp nhất</option>
                <option>Giá cao nhất</option>
                <option>Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          <div className="workshop-search-bar">
            <div className="workshop-search-field">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13 6.5C13 7.93437 12.5344 9.25938 11.75 10.3344L15.7063 14.2937C16.0969 14.6844 16.0969 15.3188 15.7063 15.7094C15.3156 16.1 14.6812 16.1 14.2906 15.7094L10.3344 11.75C9.25938 12.5375 7.93437 13 6.5 13C2.90937 13 0 10.0906 0 6.5C0 2.90937 2.90937 0 6.5 0C10.0906 0 13 2.90937 13 6.5ZM6.5 11C9.53757 11 11 8.53757 11 6.5C11 4.46243 9.53757 2 6.5 2C4.46243 2 2 4.46243 2 6.5C2 8.53757 4.46243 11 6.5 11Z" fill="#9CA3AF" />
              </svg>
              <input
                type="text"
                placeholder="Tên workshop hoặc từ khóa..."
                className="workshop-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="workshop-search-divider">
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true">
                <path d="M6.74062 15.6C8.34375 13.5938 12 8.73125 12 6C12 2.6875 9.3125 0 6 0C2.6875 0 0 2.6875 0 6C0 8.73125 3.65625 13.5938 5.25938 15.6C5.64375 16.0781 6.35625 16.0781 6.74062 15.6ZM6 4C7.10457 4 8 4.89543 8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4Z" fill="#436E35" />
              </svg>
              <span className="workshop-filter-text">Hình thức</span>
            </div>
            <div className="workshop-search-divider">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
                <path d="M0 2.5V7.17187C0 7.70312 0.209375 8.2125 0.584375 8.5875L6.08437 14.0875C6.86562 14.8687 8.13125 14.8687 8.9125 14.0875L13.0844 9.91562C13.8656 9.13437 13.8656 7.86875 13.0844 7.0875L7.58437 1.5875C7.20937 1.2125 6.7 1.00312 6.16875 1.00312H1.5C0.671875 0.999999 0 1.67187 0 2.5ZM3.5 3.5C4.05228 3.5 4.5 3.94772 4.5 4.5C4.5 5.05228 4.05228 5.5 3.5 5.5C2.94772 5.5 2.5 5.05228 2.5 4.5C2.5 3.94772 2.94772 3.5 3.5 3.5Z" fill="#436E35" />
              </svg>
              <span className="workshop-filter-text">Giá vé</span>
            </div>
            <button className="workshop-search-btn">Tìm kiếm</button>
          </div>
        </div>
      </section>

      {/* Featured Workshop */}
      <section className="workshop-featured-section">
        <div className="workshop-featured-inner">
          <div className="workshop-featured-header">
            <div className="workshop-featured-heading">
              <span className="workshop-section-eyebrow">LỰA CHỌN TỐT NHẤT</span>
              <h2 className="workshop-featured-title">Workshop Nổi Bật</h2>
            </div>
            <div className="workshop-nav-arrows">
              <button className="workshop-arrow-btn" aria-label="Trước">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M0.293945 7.29377C-0.0966797 7.6844 -0.0966797 8.31877 0.293945 8.7094L6.29395 14.7094C6.68457 15.1 7.31895 15.1 7.70957 14.7094C8.10019 14.3188 8.10019 13.6844 7.70957 13.2938L2.41582 8.00002L7.70645 2.70627C8.09707 2.31565 8.09707 1.68127 7.70645 1.29065C7.31582 0.900024 6.68145 0.900024 6.29082 1.29065L0.29082 7.29065L0.293945 7.29377Z" fill="#343434" />
                </svg>
              </button>
              <button className="workshop-arrow-btn" aria-label="Sau">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M9.70664 7.29377C10.0973 7.6844 10.0973 8.31877 9.70664 8.7094L3.70664 14.7094C3.31602 15.1 2.68164 15.1 2.29102 14.7094C1.90039 14.3188 1.90039 13.6844 2.29102 13.2938L7.58477 8.00002L2.29414 2.70627C1.90352 2.31565 1.90352 1.68127 2.29414 1.29065C2.68477 0.900024 3.31914 0.900024 3.70977 1.29065L9.70977 7.29065L9.70664 7.29377Z" fill="#343434" />
                </svg>
              </button>
            </div>
          </div>

          <div className="workshop-featured-card">
            <div className="workshop-featured-img-wrap">
              <img src={FEATURED_WORKSHOP.image} alt={FEATURED_WORKSHOP.title} className="workshop-featured-img" />
            </div>
            <div className="workshop-featured-info">
              <div className="workshop-rating-row">
                <div className="workshop-stars">
                  {Array.from({ length: FEATURED_WORKSHOP.rating }).map((_, i) => <StarIcon key={i} />)}
                </div>
                <span className="workshop-review-count">({FEATURED_WORKSHOP.reviewCount} đánh giá)</span>
              </div>
              <h3 className="workshop-featured-name">{FEATURED_WORKSHOP.title}</h3>
              <div className="workshop-featured-meta">
                <div className="workshop-meta-row">
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
                    <path d="M7 8C5.93913 8 4.92172 7.57857 4.17157 6.82843C3.42143 6.07828 3 5.06087 3 4C3 2.93913 3.42143 1.92172 4.17157 1.17157C4.92172 0.421427 5.93913 0 7 0C8.06087 0 9.07828 0.421427 9.82843 1.17157C10.5786 1.92172 11 2.93913 11 4C11 5.06087 10.5786 6.07828 9.82843 6.82843C9.07828 7.57857 8.06087 8 7 8ZM6.53438 11.225L5.95312 10.2563C5.75313 9.92188 5.99375 9.5 6.38125 9.5H7H7.61562C8.00313 9.5 8.24375 9.925 8.04375 10.2563L7.4625 11.225L8.50625 15.0969L9.63125 10.5063C9.69375 10.2531 9.9375 10.0875 10.1906 10.1531C12.3813 10.7031 14 12.6844 14 15.0406C14 15.5719 13.5687 16 13.0406 16H8.92188C8.85625 16 8.79688 15.9875 8.74063 15.9656L8.75 16H5.25L5.25938 15.9656C5.20312 15.9875 5.14062 16 5.07812 16H0.959375C0.43125 16 0 15.5687 0 15.0406C0 12.6812 1.62188 10.7 3.80938 10.1531C4.0625 10.0906 4.30625 10.2563 4.36875 10.5063L5.49375 15.0969L6.5375 11.225H6.53438Z" fill="#87A96B" />
                  </svg>
                  <span>Người tổ chức: <strong>{FEATURED_WORKSHOP.organizer}</strong></span>
                </div>
                <div className="workshop-meta-row">
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
                    <path d="M4 0C4.55312 0 5 0.446875 5 1V2H9V1C9 0.446875 9.44687 0 10 0C10.5531 0 11 0.446875 11 1V2H12.5C13.3281 2 14 2.67188 14 3.5V5H0V3.5C0 2.67188 0.671875 2 1.5 2H3V1C3 0.446875 3.44688 0 4 0ZM0 6H14V14.5C14 15.3281 13.3281 16 12.5 16H1.5C0.671875 16 0 15.3281 0 14.5V6ZM2 8.5V9.5C2 9.775 2.225 10 2.5 10H3.5C3.775 10 4 9.775 4 9.5V8.5C4 8.225 3.775 8 3.5 8H2.5C2.225 8 2 8.225 2 8.5ZM6 8.5V9.5C6 9.775 6.225 10 6.5 10H7.5C7.775 10 8 9.775 8 9.5V8.5C8 8.225 7.775 8 7.5 8H6.5C6.225 8 6 8.225 6 8.5ZM10.5 8C10.225 8 10 8.225 10 8.5V9.5C10 9.775 10.225 10 10.5 10H11.5C11.775 10 12 9.775 12 9.5V8.5C12 8.225 11.775 8 11.5 8H10.5ZM2 12.5V13.5C2 13.775 2.225 14 2.5 14H3.5C3.775 14 4 13.775 4 13.5V12.5C4 12.225 3.775 12 3.5 12H2.5C2.225 12 2 12.225 2 12.5ZM6.5 12C6.225 12 6 12.225 6 12.5V13.5C6 13.775 6.225 14 6.5 14H7.5C7.775 14 8 13.775 8 13.5V12.5C8 12.225 7.775 12 7.5 12H6.5ZM10 12.5V13.5C10 13.775 10.225 14 10.5 14H11.5C11.775 14 12 13.775 12 13.5V12.5C12 12.225 11.775 12 11.5 12H10.5C10.225 12 10 12.225 10 12.5Z" fill="#87A96B" />
                  </svg>
                  <span>{FEATURED_WORKSHOP.date}</span>
                </div>
                <div className="workshop-meta-row">
                  <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true">
                    <path d="M6.74062 15.6C8.34375 13.5938 12 8.73125 12 6C12 2.6875 9.3125 0 6 0C2.6875 0 0 2.6875 0 6C0 8.73125 3.65625 13.5938 5.25938 15.6C5.64375 16.0781 6.35625 16.0781 6.74062 15.6ZM6 4C7.10457 4 8 4.89543 8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4Z" fill="#87A96B" />
                  </svg>
                  <span>{FEATURED_WORKSHOP.location}</span>
                </div>
                <div className="workshop-meta-row">
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
                    <path d="M4.5 0C5.16304 0 5.79893 0.263392 6.26777 0.732233C6.73661 1.20107 7 1.83696 7 2.5C7 3.16304 6.73661 3.79893 6.26777 4.26777C5.79893 4.73661 5.16304 5 4.5 5C3.83696 5 3.20107 4.73661 2.73223 4.26777C2.26339 3.79893 2 3.16304 2 2.5C2 1.83696 2.26339 1.20107 2.73223 0.732233C3.20107 0.263392 3.83696 0 4.5 0ZM16 0C16.663 0 17.2989 0.263392 17.7678 0.732233C18.2366 1.20107 18.5 1.83696 18.5 2.5C18.5 3.16304 18.2366 3.79893 17.7678 4.26777C17.2989 4.73661 16.663 5 16 5C15.337 5 14.7011 4.73661 14.2322 4.26777C13.7634 3.79893 13.5 3.16304 13.5 2.5C13.5 1.83696 13.7634 1.20107 14.2322 0.732233C14.7011 0.263392 15.337 0 16 0ZM0 9.33438C0 7.49375 1.49375 6 3.33437 6H4.66875C5.16562 6 5.6375 6.10938 6.0625 6.30312C6.02187 6.52812 6.00313 6.7625 6.00313 7C6.00313 8.19375 6.52812 9.26562 7.35625 10C7.35 10 7.34375 10 7.33437 10H0.665625C0.3 10 0 9.7 0 9.33438ZM12.6656 10C12.6594 10 12.6531 10 12.6438 10C13.475 9.26562 13.9969 8.19375 13.9969 7C13.9969 6.7625 13.975 6.53125 13.9375 6.30312C14.3625 6.10625 14.8344 6 15.3313 6H16.6656C18.5063 6 20 7.49375 20 9.33438C20 9.70312 19.7 10 19.3344 10H12.6656ZM7 7C7 6.20435 7.31607 5.44129 7.87868 4.87868C8.44129 4.31607 9.20435 4 10 4C10.7956 4 11.5587 4.31607 12.1213 4.87868C12.6839 5.44129 13 6.20435 13 7C13 7.79565 12.6839 8.55871 12.1213 9.12132C11.5587 9.68393 10.7956 10 10 10C9.20435 10 8.44129 9.68393 7.87868 9.12132C7.31607 8.55871 7 7.79565 7 7ZM4 15.1656C4 12.8656 5.86562 11 8.16562 11H11.8344C14.1344 11 16 12.8656 16 15.1656C16 15.625 15.6281 16 15.1656 16H4.83437C4.375 16 4 15.6281 4 15.1656Z" fill="#87A96B" />
                  </svg>
                  <span>Số lượng còn lại: <strong>{FEATURED_WORKSHOP.spots}</strong></span>
                </div>
              </div>
              <div className="workshop-featured-price">{FEATURED_WORKSHOP.price}</div>
              <button className="workshop-featured-cta">Xem chi tiết Workshop</button>
            </div>
          </div>
        </div>
      </section>

      {/* All Workshops */}
      <section className="workshop-all-section">
        <div className="workshop-all-inner">
          <div className="workshop-all-header">
            <h2 className="workshop-all-title">Tất cả Workshop</h2>
            <Link to="/workshop" className="workshop-view-all-link">
              Xem tất cả <ArrowIcon />
            </Link>
          </div>

          <div className="workshop-grid">
            {WORKSHOPS.map((ws) => (
              <div key={ws.id} className="workshop-card">
                <div className="workshop-card-img-wrap">
                  <img src={ws.image} alt={ws.title} className="workshop-card-img" />
                  {ws.ecoScore && (
                    <div className="workshop-eco-badge">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6.375 2.25006C4.53281 2.25006 2.97422 3.45709 2.44453 5.12115C3.23203 4.72271 4.12031 4.50006 5.0625 4.50006H7.125C7.33125 4.50006 7.5 4.66881 7.5 4.87506C7.5 5.08131 7.33125 5.25006 7.125 5.25006H6.75H5.0625C4.67344 5.25006 4.29609 5.29459 3.93281 5.37662C3.32578 5.5149 2.76094 5.76099 2.25938 6.09615C0.897656 7.00318 0 8.5524 0 10.3126V10.6876C0 10.9993 0.250781 11.2501 0.5625 11.2501C0.874219 11.2501 1.125 10.9993 1.125 10.6876V10.3126C1.125 9.17115 1.61016 8.14459 2.38594 7.42506C2.85 9.19459 4.46016 10.5001 6.375 10.5001H6.39844C9.49453 10.4836 12 7.43209 12 3.67037C12 2.67193 11.8242 1.72271 11.5055 0.867243C11.4445 0.705524 11.2078 0.712555 11.1258 0.864899C10.6852 1.6899 9.81328 2.25006 8.8125 2.25006H6.375Z" fill="#436E35" />
                      </svg>
                      <span>Eco Score: {ws.ecoScore}</span>
                    </div>
                  )}
                  <span className={`workshop-mode-badge workshop-mode-badge--${ws.mode.toLowerCase()}`}>{ws.mode}</span>
                </div>
                <div className="workshop-card-body">
                  <div className="workshop-card-instructor">
                    <img src={ws.avatar} alt={ws.instructor} className="workshop-card-avatar" />
                    <span className="workshop-card-instructor-name">{ws.instructor}</span>
                  </div>
                  <h4 className="workshop-card-title">{ws.title}</h4>
                  <p className="workshop-card-desc">{ws.description}</p>
                  <div className="workshop-card-meta">
                    <div className="workshop-card-meta-item">
                      <ClockIcon />
                      <span>{ws.duration}</span>
                    </div>
                    <div className="workshop-card-meta-item">
                      <CalendarIcon />
                      <span>{ws.schedule}</span>
                    </div>
                  </div>
                  <div className="workshop-card-footer">
                    <span className="workshop-card-price">{ws.price}</span>
                    <button className="workshop-card-detail-btn">
                      Xem chi tiết <ArrowIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="workshop-load-more-wrap">
            <button className="workshop-load-more-btn">Tải thêm workshop</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
