import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerWorkshopPage.css";

interface Workshop {
  id: string;
  image: string;
  name: string;
  type: "offline" | "online";
  location: string;
  date: string;
  time: string;
  registered: number;
  capacity: number;
  status: "open" | "upcoming" | "cancelled";
}

const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: "1",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/23ec5201db8a7044b6bcd0761eb82653ee0ee772?width=240",
    name: "Nến thơm từ vỏ dừa",
    type: "offline",
    location: "TP.HCM",
    date: "15 Th05, 2024",
    time: "09:00 - 11:30",
    registered: 18,
    capacity: 20,
    status: "open",
  },
  {
    id: "2",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/d22622969881db64954a3c5b01cdc4b65f2e1d27?width=240",
    name: "Túi tote từ vải tái chế",
    type: "online",
    location: "Zoom App",
    date: "22 Th05, 2024",
    time: "14:00 - 16:00",
    registered: 45,
    capacity: 50,
    status: "upcoming",
  },
  {
    id: "3",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/01c9730ced5964e9c8b18adc88856d056acbb071?width=240",
    name: "Đồng hồ nắp chai tái chế",
    type: "offline",
    location: "Đà Nẵng",
    date: "02 Th06, 2024",
    time: "08:30 - 11:30",
    registered: 12,
    capacity: 25,
    status: "open",
  },
  {
    id: "4",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/fd5d3b77241b34f24de26c076f7c3e0c0232bca3?width=240",
    name: "Kệ gỗ Pallet trang trí",
    type: "offline",
    location: "",
    date: "12 Th04, 2024",
    time: "",
    registered: 0,
    capacity: 15,
    status: "cancelled",
  },
];

const STATUS_CONFIG = {
  open: { label: "Đang mở đăng ký", bg: "#ECFDF5", color: "#10B981" },
  upcoming: { label: "Sắp diễn ra", bg: "#FFF7ED", color: "#F97316" },
  cancelled: { label: "Đã hủy", bg: "#F3F4F6", color: "#6B7280" },
};

export default function SellerWorkshopPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeNav] = useState<"workshop" | "orders" | "products">("workshop");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    navigate("/dang-nhap");
  }

  function handleNavClick(item: "workshop" | "orders" | "products") {
    if (item === "orders") navigate("/seller/don-hang");
    if (item === "products") navigate("/seller");
  }

  const filtered = MOCK_WORKSHOPS.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="seller-page">
      {/* Sidebar */}
      <aside className="seller-sidebar">
        <div className="seller-sidebar__top">
          <div className="seller-sidebar__brand">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/e70d49f5e08e80d839d7e2d6d0b9c2da2b0d3d2f?width=100"
              alt="RE-ART"
              className="seller-sidebar__logo"
            />
            <span className="seller-sidebar__brand-name">RE-ART</span>
          </div>

          <nav className="seller-sidebar__nav">
            <button
              className={`seller-nav-item${activeNav === "workshop" ? " seller-nav-item--active" : ""}`}
              onClick={() => handleNavClick("workshop")}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path
                  d="M5 0C5.69141 0 6.25 0.558594 6.25 1.25V2.5H11.25V1.25C11.25 0.558594 11.8086 0 12.5 0C13.1914 0 13.75 0.558594 13.75 1.25V2.5H15.625C16.6602 2.5 17.5 3.33984 17.5 4.375V6.25H0V4.375C0 3.33984 0.839844 2.5 1.875 2.5H3.75V1.25C3.75 0.558594 4.30859 0 5 0ZM0 7.5H17.5V18.125C17.5 19.1602 16.6602 20 15.625 20H1.875C0.839844 20 0 19.1602 0 18.125V7.5ZM12.8516 11.9141C13.2187 11.5469 13.2187 10.9531 12.8516 10.5898C12.4844 10.2266 11.8906 10.2227 11.5273 10.5898L7.81641 14.3008L5.98047 12.4648C5.61328 12.0977 5.01953 12.0977 4.65625 12.4648C4.29297 12.832 4.28906 13.4258 4.65625 13.7891L7.15625 16.2891C7.52344 16.6562 8.11719 16.6562 8.48047 16.2891L12.8516 11.9141Z"
                  fill="white"
                />
              </svg>
              <span>Workshop</span>
            </button>

            <button
              className={`seller-nav-item${activeNav === "orders" ? " seller-nav-item--active" : ""}`}
              onClick={() => handleNavClick("orders")}
            >
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path
                  d="M2.5 1.25C2.5 0.558594 1.94141 0 1.25 0C0.558594 0 0 0.558594 0 1.25V14.375C0 16.1016 1.39844 17.5 3.125 17.5H18.75C19.4414 17.5 20 16.9414 20 16.25C20 15.5586 19.4414 15 18.75 15H3.125C2.78125 15 2.5 14.7188 2.5 14.375V1.25ZM18.3828 4.63281C18.8711 4.14453 18.8711 3.35156 18.3828 2.86328C17.8945 2.375 17.1016 2.375 16.6133 2.86328L12.5 6.98047L10.2578 4.73828C9.76953 4.25 8.97656 4.25 8.48828 4.73828L4.11328 9.11328C3.625 9.60156 3.625 10.3945 4.11328 10.8828C4.60156 11.3711 5.39453 11.3711 5.88281 10.8828L9.375 7.39453L11.6172 9.63672C12.1055 10.125 12.8984 10.125 13.3867 9.63672L18.3867 4.63672L18.3828 4.63281Z"
                  fill="white"
                />
              </svg>
              <span>Đơn hàng</span>
            </button>

            <button
              className={`seller-nav-item${activeNav === "products" ? " seller-nav-item--active" : ""}`}
              onClick={() => handleNavClick("products")}
            >
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                <path
                  d="M1.75864 0.345315C1.87583 0.107033 2.13364 -0.0296853 2.39536 0.00547099L11.9579 1.20078L21.5204 0.00547099C21.7821 -0.025779 22.0399 0.11094 22.1571 0.345315L23.786 3.60313C24.1375 4.30235 23.7625 5.15 23.0125 5.36485L16.6297 7.18906C16.0868 7.34531 15.5047 7.11485 15.2157 6.63047L11.9579 1.20078L8.70005 6.63047C8.41098 7.11485 7.82895 7.34531 7.28598 7.18906L0.907076 5.36485C0.15317 5.15 -0.217924 4.30235 0.133639 3.60313L1.75864 0.345315ZM12.0008 3.70078L14.1454 7.2711C14.7274 8.23985 15.8875 8.70078 16.9774 8.38828L21.9579 6.96641V13.4898C21.9579 14.3492 21.3719 15.0992 20.536 15.3102L12.5633 17.3023C12.1649 17.4039 11.7469 17.4039 11.3524 17.3023L3.37973 15.3102C2.5438 15.0953 1.95786 14.3453 1.95786 13.4859V6.9625L6.94223 8.38828C8.02817 8.70078 9.19223 8.23985 9.77426 7.2711L11.9149 3.70078H12.0008Z"
                  fill="white"
                />
              </svg>
              <span>Sản phẩm</span>
            </button>
          </nav>
        </div>

        {/* Nút về Buyer UI */}
        <a href="/" className="seller-buyer-btn">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 1.667a8.333 8.333 0 100 16.666A8.333 8.333 0 0010 1.667zm4.167 9.166H10.833v1.667H9.167v-1.667H5.833V9.167h3.334V7.5h1.666v1.667h3.334v1.666z" fill="rgba(255,255,255,0.7)"/>
          </svg>
          <span>Về Buyer UI</span>
        </a>

        <button className="seller-logout-btn" onClick={handleLogout}>
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path
              d="M14.7617 2.88672L19.5586 7.68359C19.8398 7.96484 20 8.35156 20 8.75C20 9.14844 19.8398 9.53516 19.5586 9.81641L14.7617 14.6133C14.5117 14.8633 14.1758 15 13.8242 15C13.0937 15 12.5 14.4063 12.5 13.6758V11.25H7.5C6.80859 11.25 6.25 10.6914 6.25 10V7.5C6.25 6.80859 6.80859 6.25 7.5 6.25H12.5V3.82422C12.5 3.09375 13.0937 2.5 13.8242 2.5C14.1758 2.5 14.5117 2.64063 14.7617 2.88672ZM6.25 2.5H3.75C3.05859 2.5 2.5 3.05859 2.5 3.75V13.75C2.5 14.4414 3.05859 15 3.75 15H6.25C6.94141 15 7.5 15.5586 7.5 16.25C7.5 16.9414 6.94141 17.5 6.25 17.5H3.75C1.67969 17.5 0 15.8203 0 13.75V3.75C0 1.67969 1.67969 0 3.75 0H6.25C6.94141 0 7.5 0.558594 7.5 1.25C7.5 1.94141 6.94141 2.5 6.25 2.5Z"
              fill="#FCA5A5"
            />
          </svg>
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="seller-main">
        {/* Page header */}
        <div className="seller-page-header">
          <div className="seller-page-title-group">
            <h1 className="seller-page-title">Quản lý Workshop</h1>
            <p className="seller-page-subtitle">
              Tạo không gian sáng tạo và lan tỏa giá trị sống xanh
            </p>
          </div>

          <div className="seller-header-actions">
            <div className="seller-search-box">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                aria-hidden="true"
              >
                <mask
                  id="sm"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="1"
                  y="2"
                  width="15"
                  height="16"
                >
                  <path
                    d="M15.5747 2.75098H1.08008V17.2492H15.5747V2.75098Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#sm)">
                  <path
                    d="M10.4418 11.2084H9.96471L9.79561 11.0453C10.3875 10.3568 10.7439 9.46267 10.7439 8.49008C10.7439 6.32139 8.98624 4.56348 6.81798 4.56348C4.64967 4.56348 2.89209 6.32139 2.89209 8.49008C2.89209 10.6588 4.64967 12.4167 6.81798 12.4167C7.79039 12.4167 8.68426 12.0603 9.37282 11.4683L9.53596 11.6374V12.1146L12.5558 15.1291L13.4558 14.229L10.4418 11.2084ZM6.81798 11.2084C5.31406 11.2084 4.10005 9.99422 4.10005 8.49008C4.10005 6.9859 5.31406 5.77167 6.81798 5.77167C8.32187 5.77167 9.53596 6.9859 9.53596 8.49008C9.53596 9.99422 8.32187 11.2084 6.81798 11.2084Z"
                    fill="#343434"
                    fillOpacity="0.5"
                  />
                </g>
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm workshop..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="seller-search-input"
              />
            </div>

            <button className="seller-add-btn">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path
                  d="M8 2.5C8 1.94687 7.55313 1.5 7 1.5C6.44687 1.5 6 1.94687 6 2.5V7H1.5C0.946875 7 0.5 7.44687 0.5 8C0.5 8.55313 0.946875 9 1.5 9H6V13.5C6 14.0531 6.44687 14.5 7 14.5C7.55313 14.5 8 14.0531 8 13.5V9H12.5C13.0531 9 13.5 8.55313 13.5 8C13.5 7.44687 13.0531 7 12.5 7H8V2.5Z"
                  fill="white"
                />
              </svg>
              Tạo Workshop mới
            </button>

            <button className="seller-profile-btn" aria-label="Hồ sơ">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <g clipPath="url(#profile-clip)">
                  <path
                    d="M20.0002 3.3335C10.8002 3.3335 3.3335 10.8002 3.3335 20.0002C3.3335 29.2002 10.8002 36.6668 20.0002 36.6668C29.2002 36.6668 36.6668 29.2002 36.6668 20.0002C36.6668 10.8002 29.2002 3.3335 20.0002 3.3335ZM11.7835 30.4668C12.5002 28.9668 16.8668 27.5002 20.0002 27.5002C23.1334 27.5002 27.5168 28.9668 28.2168 30.4668C25.9502 32.2668 23.1002 33.3334 20.0002 33.3334C16.9002 33.3334 14.0502 32.2668 11.7835 30.4668ZM30.6002 28.0502C28.2168 25.1502 22.4334 24.1668 20.0002 24.1668C17.5668 24.1668 11.7835 25.1502 9.40016 28.0502C7.70016 25.8168 6.66682 23.0334 6.66682 20.0002C6.66682 12.6502 12.6502 6.66682 20.0002 6.66682C27.3502 6.66682 33.3334 12.6502 33.3334 20.0002C33.3334 23.0334 32.3002 25.8168 30.6002 28.0502ZM20.0002 10.0002C16.7668 10.0002 14.1668 12.6002 14.1668 15.8335C14.1668 19.0668 16.7668 21.6668 20.0002 21.6668C23.2334 21.6668 25.8334 19.0668 25.8334 15.8335C25.8334 12.6002 23.2334 10.0002 20.0002 10.0002ZM20.0002 18.3335C18.6168 18.3335 17.5002 17.2168 17.5002 15.8335C17.5002 14.4502 18.6168 13.3335 20.0002 13.3335C21.3834 13.3335 22.5002 14.4502 22.5002 15.8335C22.5002 17.2168 21.3834 18.3335 20.0002 18.3335Z"
                    fill="#2D3E2F"
                  />
                </g>
                <defs>
                  <clipPath id="profile-clip">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="workshop-stats-grid">
          <div className="workshop-stat-card">
            <div className="workshop-stat-card__icon-wrap workshop-stat-card__icon-wrap--green-light">
              <svg width="21" height="24" viewBox="0 0 21 24" fill="none">
                <path
                  d="M6 0C6.82969 0 7.5 0.670312 7.5 1.5V3H13.5V1.5C13.5 0.670312 14.1703 0 15 0C15.8297 0 16.5 0.670312 16.5 1.5V3H18.75C19.9922 3 21 4.00781 21 5.25V7.5H0V5.25C0 4.00781 1.00781 3 2.25 3H4.5V1.5C4.5 0.670312 5.17031 0 6 0ZM0 9H21V21.75C21 22.9922 19.9922 24 18.75 24H2.25C1.00781 24 0 22.9922 0 21.75V9ZM3 12.75V14.25C3 14.6625 3.3375 15 3.75 15H5.25C5.6625 15 6 14.6625 6 14.25V12.75C6 12.3375 5.6625 12 5.25 12H3.75C3.3375 12 3 12.3375 3 12.75ZM9 12.75V14.25C9 14.6625 9.3375 15 9.75 15H11.25C11.6625 15 12 14.6625 12 14.25V12.75C12 12.3375 11.6625 12 11.25 12H9.75C9.3375 12 9 12.3375 9 12.75ZM15.75 12C15.3375 12 15 12.3375 15 12.75V14.25C15 14.6625 15.3375 15 15.75 15H17.25C17.6625 15 18 14.6625 18 14.25V12.75C18 12.3375 17.6625 12 17.25 12H15.75ZM3 18.75V20.25C3 20.6625 3.3375 21 3.75 21H5.25C5.6625 21 6 20.6625 6 20.25V18.75C6 18.3375 5.6625 18 5.25 18H3.75C3.3375 18 3 18.3375 3 18.75ZM9.75 18C9.3375 18 9 18.3375 9 18.75V20.25C9 20.6625 9.3375 21 9.75 21H11.25C11.6625 21 12 20.6625 12 20.25V18.75C12 18.3375 11.6625 18 11.25 18H9.75ZM15 18.75V20.25C15 20.6625 15.3375 21 15.75 21H17.25C17.6625 21 18 20.6625 18 20.25V18.75C18 18.3375 17.6625 18 17.25 18H15.75C15.3375 18 15 18.3375 15 18.75Z"
                  fill="#3B823E"
                />
              </svg>
            </div>
            <div className="workshop-stat-card__content">
              <p className="workshop-stat-card__label">Tổng số workshop</p>
              <p className="workshop-stat-card__value">24</p>
            </div>
          </div>

          <div className="workshop-stat-card">
            <div className="workshop-stat-card__icon-wrap workshop-stat-card__icon-wrap--amber">
              <svg width="27" height="24" viewBox="0 0 27 24" fill="none">
                <path
                  d="M15 1.49979C15 1.03573 14.7891 0.599789 14.4234 0.318539C14.0578 0.0372894 13.5844 -0.0658357 13.1344 0.0466643L4.70156 2.15604C3.70313 2.40448 3 3.30448 3 4.33573V20.9998H1.5C0.670312 20.9998 0 21.6701 0 22.4998C0 23.3295 0.670312 23.9998 1.5 23.9998H4.5H13.5H15V22.4998V1.49979ZM12 11.9998C12 12.8295 11.4984 13.4998 10.875 13.4998C10.2516 13.4998 9.75 12.8295 9.75 11.9998C9.75 11.1701 10.2516 10.4998 10.875 10.4998C11.4984 10.4998 12 11.1701 12 11.9998ZM16.5 5.99979H21V22.4998C21 23.3295 21.6703 23.9998 22.5 23.9998H25.5C26.3297 23.9998 27 23.3295 27 22.4998C27 21.6701 26.3297 20.9998 25.5 20.9998H24V5.99979C24 4.3451 22.6547 2.99979 21 2.99979H16.5V5.99979Z"
                  fill="#D97706"
                />
              </svg>
            </div>
            <div className="workshop-stat-card__content">
              <p className="workshop-stat-card__label">Đang mở đăng ký</p>
              <p className="workshop-stat-card__value">08</p>
            </div>
          </div>

          <div className="workshop-stat-card">
            <div className="workshop-stat-card__icon-wrap workshop-stat-card__icon-wrap--indigo">
              <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
                <path
                  d="M4.5 6C4.5 4.4087 5.13214 2.88258 6.25736 1.75736C7.38258 0.632141 8.9087 0 10.5 0C12.0913 0 13.6174 0.632141 14.7426 1.75736C15.8679 2.88258 16.5 4.4087 16.5 6C16.5 7.5913 15.8679 9.11742 14.7426 10.2426C13.6174 11.3679 12.0913 12 10.5 12C8.9087 12 7.38258 11.3679 6.25736 10.2426C5.13214 9.11742 4.5 7.5913 4.5 6ZM0 22.6078C0 17.9906 3.74063 14.25 8.35781 14.25H12.6422C17.2594 14.25 21 17.9906 21 22.6078C21 23.3766 20.3766 24 19.6078 24H1.39219C0.623438 24 0 23.3766 0 22.6078ZM28.5609 24H22.0969C22.35 23.5594 22.5 23.0484 22.5 22.5V22.125C22.5 19.2797 21.2297 16.725 19.2281 15.0094C19.3406 15.0047 19.4484 15 19.5609 15H22.4391C26.6156 15 30 18.3844 30 22.5609C30 23.3578 29.3531 24 28.5609 24ZM20.25 12C18.7969 12 17.4844 11.4094 16.5328 10.4578C17.4563 9.21094 18 7.66875 18 6C18 4.74375 17.6906 3.55781 17.1422 2.51719C18.0141 1.87969 19.0875 1.5 20.25 1.5C23.1516 1.5 25.5 3.84844 25.5 6.75C25.5 9.65156 23.1516 12 20.25 12Z"
                  fill="#4F46E5"
                />
              </svg>
            </div>
            <div className="workshop-stat-card__content">
              <p className="workshop-stat-card__label">Tổng lượt tham gia</p>
              <p className="workshop-stat-card__value">1,240</p>
            </div>
          </div>

          <div className="workshop-stat-card workshop-stat-card--featured">
            <div className="workshop-stat-card__icon-wrap workshop-stat-card__icon-wrap--white-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.75 4.50011C9.06563 4.50011 5.94844 6.91417 4.88906 10.2423C6.46406 9.44542 8.24062 9.00011 10.125 9.00011H14.25C14.6625 9.00011 15 9.33761 15 9.75011C15 10.1626 14.6625 10.5001 14.25 10.5001H13.5H10.125C9.34687 10.5001 8.59219 10.5892 7.86563 10.7532C6.65156 11.0298 5.52188 11.522 4.51875 12.1923C1.79531 14.0064 0 17.1048 0 20.6251V21.3751C0 21.9985 0.501562 22.5001 1.125 22.5001C1.74844 22.5001 2.25 21.9985 2.25 21.3751V20.6251C2.25 18.3423 3.22031 16.2892 4.77188 14.8501C5.7 18.3892 8.92031 21.0001 12.75 21.0001H12.7969C18.9891 20.9673 24 14.8642 24 7.34074C24 5.34386 23.6484 3.44542 23.0109 1.73449C22.8891 1.41105 22.4156 1.42511 22.2516 1.7298C21.3703 3.3798 19.6266 4.50011 17.625 4.50011H12.75Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="workshop-stat-card__content">
              <p className="workshop-stat-card__label workshop-stat-card__label--light">
                Workshop nổi bật nhất
              </p>
              <p className="workshop-stat-card__value workshop-stat-card__value--featured">
                Nến thơm vỏ dừa
              </p>
            </div>
          </div>
        </div>

        {/* Workshop list */}
        <div className="workshop-list-card">
          <div className="workshop-list-header">
            <h2 className="workshop-list-title">Danh sách Workshop</h2>
            <div className="workshop-list-filters">
              <button className="workshop-status-filter">
                <span>Tất cả trạng thái</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M0.121712 1.71563C0.327962 1.27813 0.765462 1 1.24984 1H14.7498C15.2342 1 15.6717 1.27813 15.878 1.71563C16.0842 2.15313 16.0217 2.66875 15.7155 3.04375L9.99984 10.0281V14C9.99984 14.3781 9.78734 14.725 9.44671 14.8938C9.10609 15.0625 8.70296 15.0281 8.39984 14.8L6.39984 13.3C6.14671 13.1125 5.99984 12.8156 5.99984 12.5V10.0281L0.281087 3.04063C-0.0220383 2.66875 -0.0876633 2.15 0.121712 1.71563Z"
                    fill="#3B823E"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="workshop-rows">
            {filtered.map((workshop) => {
              const statusCfg = STATUS_CONFIG[workshop.status];
              const registrationPct =
                workshop.capacity > 0
                  ? Math.round((workshop.registered / workshop.capacity) * 100)
                  : 0;
              const isCancelled = workshop.status === "cancelled";

              return (
                <div
                  key={workshop.id}
                  className={`workshop-row${isCancelled ? " workshop-row--cancelled" : ""}`}
                >
                  <div
                    className={`workshop-row__thumb-wrap${isCancelled ? " workshop-row__thumb-wrap--faded" : ""}`}
                  >
                    <img
                      src={workshop.image}
                      alt={workshop.name}
                      className="workshop-row__thumb"
                    />
                  </div>

                  <div className="workshop-row__info">
                    <p
                      className={`workshop-row__name${isCancelled ? " workshop-row__name--muted" : ""}`}
                    >
                      {workshop.name}
                    </p>
                    <div className="workshop-row__meta">
                      <span
                        className={`workshop-type-badge workshop-type-badge--${workshop.type}`}
                      >
                        {workshop.type === "offline" ? "OFFLINE" : "ONLINE"}
                      </span>
                      {workshop.location && (
                        <span className="workshop-row__location">
                          {workshop.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="workshop-row__schedule">
                    <span
                      className={`workshop-row__date${isCancelled ? " workshop-row__date--muted" : ""}`}
                    >
                      {workshop.date}
                    </span>
                    {workshop.time && (
                      <span className="workshop-row__time">
                        {workshop.time}
                      </span>
                    )}
                  </div>

                  <div className="workshop-row__registration">
                    {isCancelled ? (
                      <span className="workshop-row__cancelled-count">
                        {workshop.registered}/{workshop.capacity}
                      </span>
                    ) : (
                      <>
                        <div className="registration-count-row">
                          <span className="registration-count">
                            {workshop.registered}/{workshop.capacity}
                          </span>
                          <span className="registration-label">Đã đăng ký</span>
                        </div>
                        <div className="registration-progress">
                          <div
                            className="registration-progress__bar"
                            style={{ width: `${registrationPct}%` }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="workshop-row__status-col">
                    <span
                      className="workshop-status-badge"
                      style={{
                        background: statusCfg.bg,
                        color: statusCfg.color,
                      }}
                    >
                      {statusCfg.label}
                    </span>
                  </div>

                  <div className="workshop-row__actions">
                    {isCancelled ? (
                      <>
                        <span className="workshop-impact-pill">0kg Impact</span>
                        <button
                          className="workshop-action-btn"
                          aria-label="Khôi phục"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M12.674 6.12507H12.9064C13.2701 6.12507 13.5627 5.8325 13.5627 5.46882V1.96882C13.5627 1.70359 13.4041 1.46296 13.158 1.36179C12.9119 1.26062 12.6303 1.31531 12.4416 1.50398L11.3041 2.64148C8.90879 0.276246 5.05059 0.284449 2.66895 2.66882C0.276367 5.0614 0.276367 8.93875 2.66895 11.3313C5.06152 13.7239 8.93887 13.7239 11.3314 11.3313C11.6732 10.9895 11.6732 10.4344 11.3314 10.0927C10.9896 9.75086 10.4346 9.75086 10.0928 10.0927C8.38379 11.8016 5.61387 11.8016 3.90488 10.0927C2.1959 8.38367 2.1959 5.61375 3.90488 3.90476C5.60566 2.20398 8.35371 2.19578 10.0654 3.87742L8.9416 5.00398C8.75293 5.19265 8.69824 5.47429 8.79941 5.72039C8.90059 5.96648 9.14121 6.12507 9.40645 6.12507H12.674Z"
                              fill="#9CA3AF"
                            />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="workshop-action-btn"
                          aria-label="Chỉnh sửa"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M9.91739 0.527832L8.59395 1.85127L12.1486 5.40596L13.4721 4.08252C14.1557 3.39893 14.1557 2.2915 13.4721 1.60791L12.3947 0.527832C11.7111 -0.155762 10.6037 -0.155762 9.92012 0.527832H9.91739ZM7.97598 2.46924L1.60215 8.8458C1.31778 9.13018 1.10997 9.48291 0.995123 9.86846L0.0271542 13.1579C-0.0412051 13.3903 0.0216855 13.6392 0.191217 13.8087C0.360748 13.9782 0.609576 14.0411 0.839264 13.9755L4.12872 13.0075C4.51426 12.8927 4.867 12.6849 5.15137 12.4005L11.5307 6.02393L7.97598 2.46924Z"
                              fill="#343434"
                              fillOpacity="0.5"
                            />
                          </svg>
                        </button>
                        <button
                          className="workshop-action-btn workshop-action-btn--circle"
                          aria-label="Xem"
                        >
                          <svg
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                          >
                            <path
                              d="M7.8748 0.875C5.66543 0.875 3.89629 1.88125 2.6084 3.07891C1.32871 4.26562 0.472852 5.6875 0.0681641 6.66367C-0.0220703 6.87969 -0.0220703 7.12031 0.0681641 7.33633C0.472852 8.3125 1.32871 9.73437 2.6084 10.9211C3.89629 12.1187 5.66543 13.125 7.8748 13.125C10.0842 13.125 11.8533 12.1187 13.1412 10.9211C14.4209 9.73164 15.2768 8.3125 15.6842 7.33633C15.7744 7.12031 15.7744 6.87969 15.6842 6.66367C15.2768 5.6875 14.4209 4.26562 13.1412 3.07891C11.8533 1.88125 10.0842 0.875 7.8748 0.875ZM3.9373 7C3.9373 5.95571 4.35215 4.95419 5.09057 4.21577C5.829 3.47734 6.83051 3.0625 7.8748 3.0625C8.91909 3.0625 9.92061 3.47734 10.659 4.21577C11.3975 4.95419 11.8123 5.95571 11.8123 7C11.8123 8.04429 11.3975 9.04581 10.659 9.78423C9.92061 10.5227 8.91909 10.9375 7.8748 10.9375C6.83051 10.9375 5.829 10.5227 5.09057 9.78423C4.35215 9.04581 3.9373 8.04429 3.9373 7ZM7.8748 5.25C7.8748 6.21523 7.09004 7 6.1248 7C5.93066 7 5.74473 6.96719 5.56973 6.90977C5.41934 6.86055 5.24434 6.95352 5.2498 7.11211C5.25801 7.30078 5.28535 7.48945 5.3373 7.67812C5.71191 9.07812 7.15293 9.90938 8.55293 9.53477C9.95293 9.16016 10.7842 7.71914 10.4096 6.31914C10.1061 5.18438 9.10254 4.42148 7.98691 4.375C7.82832 4.36953 7.73535 4.5418 7.78457 4.69492C7.84199 4.86992 7.8748 5.05586 7.8748 5.25Z"
                              fill="#343434"
                              fillOpacity="0.5"
                            />
                          </svg>
                        </button>
                        <button
                          className="workshop-action-btn workshop-action-btn--circle"
                          aria-label="Quản lý người tham gia"
                        >
                          <svg
                            width="18"
                            height="14"
                            viewBox="0 0 18 14"
                            fill="none"
                          >
                            <path
                              d="M3.9375 4.375C4.51766 4.375 5.07406 4.14453 5.4843 3.7343C5.89453 3.32406 6.125 2.76766 6.125 2.1875C6.125 1.60734 5.89453 1.05094 5.4843 0.640704C5.07406 0.230468 4.51766 0 3.9375 0C3.35734 0 2.80094 0.230468 2.3907 0.640704C1.98047 1.05094 1.75 1.60734 1.75 2.1875C1.75 2.76766 1.98047 3.32406 2.3907 3.7343C2.80094 4.14453 3.35734 4.375 3.9375 4.375ZM14 4.375C14.5802 4.375 15.1366 4.14453 15.5468 3.7343C15.957 3.32406 16.1875 2.76766 16.1875 2.1875C16.1875 1.60734 15.957 1.05094 15.5468 0.640704C15.1366 0.230468 14.5802 0 14 0C13.4198 0 12.8634 0.230468 12.4532 0.640704C12.043 1.05094 11.8125 1.60734 11.8125 2.1875C11.8125 2.76766 12.043 3.32406 12.4532 3.7343C12.8634 4.14453 13.4198 4.375 14 4.375ZM0 8.16758C0 8.4875 0.2625 8.75 0.582422 8.75H6.41758C6.42305 8.75 6.42852 8.75 6.43672 8.75C5.70937 8.10742 5.25273 7.16953 5.25273 6.125C5.25273 5.91719 5.27187 5.71484 5.30469 5.51523C4.93281 5.34297 4.51992 5.25 4.08516 5.25H2.91758C1.30703 5.25 0 6.55703 0 8.16758ZM8.75 8.75C9.40625 8.75 10.0051 8.50938 10.4645 8.11289C10.5328 8.01172 10.6066 7.91328 10.6832 7.82031C10.757 7.73008 10.8391 7.65352 10.9293 7.59336C11.2109 7.17227 11.375 6.66914 11.375 6.125C11.375 4.67578 10.1992 3.5 8.75 3.5C7.30078 3.5 6.125 4.67578 6.125 6.125C6.125 7.57422 7.30078 8.75 8.75 8.75ZM14.5824 5.25H13.4176C12.9828 5.25 12.5699 5.3457 12.198 5.51523C12.2336 5.71211 12.25 5.91719 12.25 6.125C12.25 6.60078 12.1543 7.05195 11.9848 7.46484C12.1187 7.51953 12.25 7.59609 12.25 7.59609C12.2855 7.57422 12.3211 7.55234 12.3594 7.5332V7.45117C12.3594 6.9207 12.723 6.38203 13.3383 6.28633C13.5543 6.25352 13.7758 6.23438 14 6.23438C14.2242 6.23438 14.4457 6.25078 14.6617 6.28633C15.277 6.38203 15.6406 6.9207 15.6406 7.45117V7.5332C15.6762 7.55234 15.7145 7.57422 15.75 7.59609L15.8211 7.55508C16.2805 7.28984 16.9285 7.33633 17.3168 7.82031C17.3797 7.89687 17.4398 7.97891 17.4973 8.0582C17.4398 6.49688 16.1574 5.25 14.5824 5.25Z"
                              fill="#343434"
                              fillOpacity="0.5"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="workshop-load-more">
            <button className="workshop-load-more-btn">
              <span>Xem thêm 12 Workshop khác</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M7.29365 12.7062C7.68428 13.0968 8.31865 13.0968 8.70928 12.7062L14.7093 6.70615C15.0999 6.31553 15.0999 5.68115 14.7093 5.29053C14.3187 4.8999 13.6843 4.8999 13.2937 5.29053L7.9999 10.5843L2.70615 5.29365C2.31553 4.90303 1.68115 4.90303 1.29053 5.29365C0.899902 5.68428 0.899902 6.31865 1.29053 6.70928L7.29053 12.7093L7.29365 12.7062Z"
                  fill="#436E35"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="seller-footer">
          <p className="seller-footer__copy">
            Trang quản trị nội bộ dành cho đối tác Seller – RE-ART Community
          </p>
          <div className="seller-footer__payments">
            <svg width="44" height="29" viewBox="0 0 44 29" fill="none">
              <g clipPath="url(#visa)">
                <path
                  d="M44 27.2904C44 28.2402 43.2727 29 42.3636 29H1.63636C0.727271 29 0 28.2402 0 27.2904V1.70961C0 0.759828 0.727271 0 1.63636 0H42.3636C43.2727 0 44 0.759828 44 1.70961V27.2904Z"
                  fill="white"
                />
                <path
                  d="M16.7273 8.4214L11.8182 20.6419H8.60608L6.18183 10.8908C6.06062 10.321 5.8788 10.0677 5.45456 9.81441C4.72729 9.4345 3.51517 8.99127 2.48486 8.80132L2.54547 8.4214H7.69698C8.36365 8.4214 8.96971 8.86464 9.09093 9.68778L10.3637 16.7795L13.5152 8.48472H16.7273V8.4214ZM29.2727 16.6528C29.2727 13.4236 25.0303 13.2336 25.0303 11.8406C25.0303 11.3974 25.4546 10.9542 26.303 10.8275C26.7273 10.7642 27.9394 10.7009 29.2727 11.3974L29.8182 8.80132C29.0909 8.54804 28.1818 8.23145 26.9697 8.23145C24 8.23145 21.8788 9.87773 21.8788 12.2838C21.8788 14.0568 23.394 15.0066 24.5455 15.5764C25.697 16.1463 26.1212 16.5262 26.1212 17.0961C26.1212 17.9192 25.2121 18.2991 24.303 18.2991C22.7879 18.2991 21.8788 17.8559 21.2121 17.5393L20.6667 20.1987C21.394 20.5153 22.6667 20.8319 24 20.8319C27.1515 20.8319 29.2121 19.1856 29.2727 16.6528ZM37.1515 20.6419H39.9394L37.5152 8.4214H34.9091C34.303 8.4214 33.8182 8.80132 33.6364 9.30787L29.0909 20.6419H32.2424L32.8485 18.8057H36.7273L37.1515 20.6419ZM33.7576 16.3363L35.3334 11.7773L36.2424 16.3363H33.7576ZM21.0303 8.4214L18.5455 20.6419H15.5152L18 8.4214H21.0303Z"
                  fill="#1A1F71"
                />
              </g>
              <defs>
                <clipPath id="visa">
                  <rect width="44" height="29" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <svg width="36" height="33" viewBox="0 0 36 33" fill="none">
              <g clipPath="url(#mc)">
                <path
                  d="M22.9017 7.85205H13.1924V25.1485H22.9017V7.85205Z"
                  fill="#FF5F00"
                />
                <path
                  d="M13.8087 16.4995C13.8071 14.8338 14.1879 13.1895 14.9222 11.6912C15.6564 10.1929 16.7249 8.87975 18.0468 7.85132C16.4099 6.57582 14.4439 5.7826 12.3738 5.56234C10.3036 5.34207 8.21262 5.70363 6.33992 6.60571C4.46722 7.50779 2.88831 8.91399 1.78368 10.6636C0.679048 12.4132 0.0932617 14.4355 0.0932617 16.4995C0.0932617 18.5635 0.679048 20.5859 1.78368 22.3355C2.88831 24.0851 4.46722 25.4913 6.33992 26.3933C8.21262 27.2954 10.3036 27.657 12.3738 27.4367C14.4439 27.2165 16.4099 26.4232 18.0468 25.1477C16.7249 24.1193 15.6564 22.8062 14.9222 21.3079C14.1879 19.8096 13.8071 18.1653 13.8087 16.4995Z"
                  fill="#EB001B"
                />
                <path
                  d="M35.9999 16.4995C36 18.5635 35.4143 20.5859 34.3097 22.3354C33.2051 24.085 31.6263 25.4912 29.7536 26.3933C27.8809 27.2954 25.79 27.657 23.7199 27.4367C21.6497 27.2164 19.6838 26.4232 18.0469 25.1477C19.3676 24.1183 20.4353 22.805 21.1694 21.3069C21.9036 19.8088 22.285 18.165 22.285 16.4995C22.285 14.834 21.9036 13.1903 21.1694 11.6922C20.4353 10.1941 19.3676 8.88079 18.0469 7.85132C19.6838 6.57581 21.6497 5.7826 23.7199 5.56233C25.79 5.34207 27.8809 5.70365 29.7536 6.60574C31.6263 7.50782 33.2051 8.91402 34.3097 10.6636C35.4143 12.4132 36 14.4356 35.9999 16.4995Z"
                  fill="#F79E1B"
                />
              </g>
              <defs>
                <clipPath id="mc">
                  <rect width="36" height="33" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="seller-footer__amex">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#amex)">
                  <path
                    d="M16.4151 4.90566L17.0755 3.16038H20V0H0V20H20V16.8396H17.217L16.1793 15.6132L15.1415 16.7924H7.31133V10.5188H4.71698L7.9717 3.20755H11.1321L11.8868 4.85849V3.20755H15.8019L16.4151 4.90566ZM14.2453 6.08491V5.37736L14.5283 6.08491L15.849 9.57546H17.0755L18.3962 6.08491L18.6321 5.37736V9.5283H20V4.19812H17.7358L16.6981 6.88679L16.4151 7.64152L16.1321 6.88679L15.0944 4.19812H12.8302V9.48115H14.2453V6.08491ZM11.3207 9.48115H12.8773L10.5188 4.15095H8.67927L6.32073 9.48115H7.87733L8.30188 8.44339H10.8962L11.3207 9.48115ZM9.33964 5.99056L9.62267 5.33019L9.90564 5.99056L10.4717 7.35849H8.82073L9.33964 5.99056ZM8.39624 10.5188V15.849H12.8302V14.6698H9.71697V13.7264H12.7358V12.5944H9.71697V11.651H12.8302V10.5188H8.39624ZM17.8302 15.7547H19.5755L17.0755 13.1132L19.5755 10.4717H17.8302L16.2264 12.217L14.6227 10.4717H12.8302L15.3302 13.1604L12.8302 15.8019H14.5283L16.1321 14.0566L17.8302 15.7547ZM18.4905 13.1604L20 14.717V11.651L18.4905 13.1604Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="amex">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="seller-footer__rupay">RuPay</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
