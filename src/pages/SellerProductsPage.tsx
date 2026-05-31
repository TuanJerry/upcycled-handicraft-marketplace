import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerProductsPage.css";

interface Product {
  id: string;
  image: string;
  name: string;
  code: string;
  price: string;
  category: string;
  ecoScore: number;
  status: "active" | "out-of-stock" | "pending" | "rejected";
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/08e88c35b5937c22eeb5e1d703a66d244dab9627?width=112",
    name: "Nến thơm vỏ dừa hương Sả Chanh",
    code: "#PR-00124",
    price: "225.000đ",
    category: "Trang trí nhà cửa",
    ecoScore: 95,
    status: "active",
  },
  {
    id: "2",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/488e0b7a1bd5dc53be29828d109000c2261867b8?width=112",
    name: "Túi Tote vải bạt tái chế – Ocean Blue",
    code: "#PR-00125",
    price: "180.000đ",
    category: "Phụ kiện thời trang",
    ecoScore: 88,
    status: "out-of-stock",
  },
  {
    id: "3",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/68993eb7a81c74b93e03641ae06dd05af2eba20c?width=112",
    name: "Đèn ngủ trang trí từ gỗ Pallet",
    code: "#PR-00126",
    price: "350.000đ",
    category: "Đồ gia dụng",
    ecoScore: 92,
    status: "pending",
  },
  {
    id: "4",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/f550390a216ac41c373f6c5602b725a8918742ba?width=112",
    name: "Sổ tay bìa Kraft giấy tái chế",
    code: "#PR-00127",
    price: "75.000đ",
    category: "Văn phòng phẩm",
    ecoScore: 98,
    status: "active",
  },
  {
    id: "5",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/edcf2ba76c64093c07d0c3239c4d34a57fe38e54?width=112",
    name: "Chậu cây mini từ bã cà phê",
    code: "#PR-00128",
    price: "45.000đ",
    category: "Sân vườn",
    ecoScore: 90,
    status: "active",
  },
  {
    id: "6",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/564a6f870e5ceaab7767a9471af77a742e93ee73?width=112",
    name: "Khuyên tai nghệ thuật Nhựa Biển",
    code: "#PR-00129",
    price: "120.000đ",
    category: "Trang sức",
    ecoScore: 85,
    status: "rejected",
  },
  {
    id: "7",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/195f71eb08d71e9a4d755d152c820e30874d895b?width=112",
    name: "Thảm dệt thủ công từ vải vụn",
    code: "#PR-00130",
    price: "280.000đ",
    category: "Trang trí nội thất",
    ecoScore: 96,
    status: "active",
  },
  {
    id: "8",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/2664654a7059af93d72b9a5e165059945e6b42a5?width=112",
    name: "Bình hoa thủy tinh tái chế thủ công",
    code: "#PR-00131",
    price: "195.000đ",
    category: "Trang trí nhà cửa",
    ecoScore: 94,
    status: "active",
  },
];

const STATUS_CONFIG = {
  active: { label: "Đang bán", bg: "#ECFDF5", color: "#10B981" },
  "out-of-stock": { label: "Hết hàng", bg: "#FECACA", color: "#FCA5A5" },
  pending: { label: "Chờ kiểm duyệt", bg: "#FFF9EB", color: "#D97706" },
  rejected: { label: "Bị từ chối", bg: "#FEF2F2", color: "#EF4444" },
};

export default function SellerProductsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState<
    "workshop" | "orders" | "products"
  >("products");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    navigate("/dang-nhap");
  }

  function handleNavClick(item: "workshop" | "orders" | "products") {
    setActiveNav(item);
    if (item === "workshop") navigate("/seller/workshop");
    if (item === "orders") navigate("/seller/don-hang");
  }

  const filtered = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
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
                <g clipPath="url(#c1)">
                  <path
                    d="M5 0C5.69141 0 6.25 0.558594 6.25 1.25V2.5H11.25V1.25C11.25 0.558594 11.8086 0 12.5 0C13.1914 0 13.75 0.558594 13.75 1.25V2.5H15.625C16.6602 2.5 17.5 3.33984 17.5 4.375V6.25H0V4.375C0 3.33984 0.839844 2.5 1.875 2.5H3.75V1.25C3.75 0.558594 4.30859 0 5 0ZM0 7.5H17.5V18.125C17.5 19.1602 16.6602 20 15.625 20H1.875C0.839844 20 0 19.1602 0 18.125V7.5ZM12.8516 11.9141C13.2187 11.5469 13.2187 10.9531 12.8516 10.5898C12.4844 10.2266 11.8906 10.2227 11.5273 10.5898L7.81641 14.3008L5.98047 12.4648C5.61328 12.0977 5.01953 12.0977 4.65625 12.4648C4.29297 12.832 4.28906 13.4258 4.65625 13.7891L7.15625 16.2891C7.52344 16.6562 8.11719 16.6562 8.48047 16.2891L12.8516 11.9141Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="c1">
                    <rect width="18" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Workshop</span>
            </button>

            <button
              className={`seller-nav-item${activeNav === "orders" ? " seller-nav-item--active" : ""}`}
              onClick={() => handleNavClick("orders")}
            >
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                <g clipPath="url(#c2)">
                  <path
                    d="M2.5 1.25C2.5 0.558594 1.94141 0 1.25 0C0.558594 0 0 0.558594 0 1.25V14.375C0 16.1016 1.39844 17.5 3.125 17.5H18.75C19.4414 17.5 20 16.9414 20 16.25C20 15.5586 19.4414 15 18.75 15H3.125C2.78125 15 2.5 14.7188 2.5 14.375V1.25ZM18.3828 4.63281C18.8711 4.14453 18.8711 3.35156 18.3828 2.86328C17.8945 2.375 17.1016 2.375 16.6133 2.86328L12.5 6.98047L10.2578 4.73828C9.76953 4.25 8.97656 4.25 8.48828 4.73828L4.11328 9.11328C3.625 9.60156 3.625 10.3945 4.11328 10.8828C4.60156 11.3711 5.39453 11.3711 5.88281 10.8828L9.375 7.39453L11.6172 9.63672C12.1055 10.125 12.8984 10.125 13.3867 9.63672L18.3867 4.63672L18.3828 4.63281Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="c2">
                    <rect width="20" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Đơn hàng</span>
            </button>

            <button
              className={`seller-nav-item${activeNav === "products" ? " seller-nav-item--active" : ""}`}
              onClick={() => handleNavClick("products")}
            >
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                <g clipPath="url(#c3)">
                  <path
                    d="M1.75864 0.345315C1.87583 0.107033 2.13364 -0.0296853 2.39536 0.00547099L11.9579 1.20078L21.5204 0.00547099C21.7821 -0.025779 22.0399 0.11094 22.1571 0.345315L23.786 3.60313C24.1375 4.30235 23.7625 5.15 23.0125 5.36485L16.6297 7.18906C16.0868 7.34531 15.5047 7.11485 15.2157 6.63047L11.9579 1.20078L8.70005 6.63047C8.41098 7.11485 7.82895 7.34531 7.28598 7.18906L0.907076 5.36485C0.15317 5.15 -0.217924 4.30235 0.133639 3.60313L1.75864 0.345315ZM12.0008 3.70078L14.1454 7.2711C14.7274 8.23985 15.8875 8.70078 16.9774 8.38828L21.9579 6.96641V13.4898C21.9579 14.3492 21.3719 15.0992 20.536 15.3102L12.5633 17.3023C12.1649 17.4039 11.7469 17.4039 11.3524 17.3023L3.37973 15.3102C2.5438 15.0953 1.95786 14.3453 1.95786 13.4859V6.9625L6.94223 8.38828C8.02817 8.70078 9.19223 8.23985 9.77426 7.2711L11.9149 3.70078H12.0008Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="c3">
                    <rect width="24" height="18" fill="white" />
                  </clipPath>
                </defs>
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
            <g clipPath="url(#c4)">
              <path
                d="M14.7617 2.88672L19.5586 7.68359C19.8398 7.96484 20 8.35156 20 8.75C20 9.14844 19.8398 9.53516 19.5586 9.81641L14.7617 14.6133C14.5117 14.8633 14.1758 15 13.8242 15C13.0937 15 12.5 14.4063 12.5 13.6758V11.25H7.5C6.80859 11.25 6.25 10.6914 6.25 10V7.5C6.25 6.80859 6.80859 6.25 7.5 6.25H12.5V3.82422C12.5 3.09375 13.0937 2.5 13.8242 2.5C14.1758 2.5 14.5117 2.64063 14.7617 2.88672ZM6.25 2.5H3.75C3.05859 2.5 2.5 3.05859 2.5 3.75V13.75C2.5 14.4414 3.05859 15 3.75 15H6.25C6.94141 15 7.5 15.5586 7.5 16.25C7.5 16.9414 6.94141 17.5 6.25 17.5H3.75C1.67969 17.5 0 15.8203 0 13.75V3.75C0 1.67969 1.67969 0 3.75 0H6.25C6.94141 0 7.5 0.558594 7.5 1.25C7.5 1.94141 6.94141 2.5 6.25 2.5Z"
                fill="#FCA5A5"
              />
            </g>
            <defs>
              <clipPath id="c4">
                <rect width="20" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="seller-main">
        {/* Page header */}
        <div className="seller-page-header">
          <div className="seller-page-title-group">
            <h1 className="seller-page-title">Quản lý sản phẩm</h1>
            <p className="seller-page-subtitle">
              Quản lý và lan tỏa giá trị của những sản phẩm tái chế thủ công
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
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="seller-search-input"
              />
            </div>

            <button className="seller-add-btn">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6.56201 0.875C6.56201 0.391016 6.171 0 5.68701 0C5.20303 0 4.81201 0.391016 4.81201 0.875V4.8125H0.874512C0.390527 4.8125 -0.000488281 5.20352 -0.000488281 5.6875C-0.000488281 6.17148 0.390527 6.5625 0.874512 6.5625H4.81201V10.5C4.81201 10.984 5.20303 11.375 5.68701 11.375C6.171 11.375 6.56201 10.984 6.56201 10.5V6.5625H10.4995C10.9835 6.5625 11.3745 6.17148 11.3745 5.6875C11.3745 5.20352 10.9835 4.8125 10.4995 4.8125H6.56201V0.875Z"
                  fill="white"
                />
              </svg>
              Thêm sản phẩm mới
            </button>

            <button className="seller-profile-btn" aria-label="Hồ sơ">
              <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
                <mask
                  id="pm"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="8"
                  y="0"
                  width="20"
                  height="24"
                >
                  <path d="M27.77 0H8V24H27.77V0Z" fill="white" />
                </mask>
                <g mask="url(#pm)">
                  <path
                    d="M20.7091 6.11719C17.4612 6.11719 14.8252 8.75262 14.8252 11.9999C14.8252 15.2471 17.4612 17.8825 20.7091 17.8825C23.957 17.8825 26.593 15.2471 26.593 11.9999C26.593 8.75262 23.957 6.11719 20.7091 6.11719ZM17.8083 15.6941C18.0614 15.1647 19.6029 14.6471 20.7091 14.6471C21.8152 14.6471 23.3627 15.1647 23.6099 15.6941C22.8097 16.3295 21.8035 16.7059 20.7091 16.7059C19.6147 16.7059 18.6086 16.3295 17.8083 15.6941ZM24.4513 14.8412C23.6099 13.8176 21.5681 13.4705 20.7091 13.4705C19.85 13.4705 17.8083 13.8176 16.9669 14.8412C16.3668 14.0529 16.002 13.0705 16.002 11.9999C16.002 9.40559 18.1143 7.29371 20.7091 7.29371C23.3039 7.29371 25.4162 9.40559 25.4162 11.9999C25.4162 13.0705 25.0515 14.0529 24.4513 14.8412ZM20.7091 8.47025C19.5676 8.47025 18.6497 9.38794 18.6497 10.5292C18.6497 11.6704 19.5676 12.5881 20.7091 12.5881C21.8506 12.5881 22.7684 11.6704 22.7684 10.5292C22.7684 9.38794 21.8506 8.47025 20.7091 8.47025ZM20.7091 11.4116C20.2207 11.4116 19.8265 11.0175 19.8265 10.5292C19.8265 10.041 20.2207 9.64677 20.7091 9.64677C21.1974 9.64677 21.5917 10.041 21.5917 10.5292C21.5917 11.0175 21.1974 11.4116 20.7091 11.4116Z"
                    fill="#2D3E2F"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="seller-stats-grid">
          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--green-light">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6 0C6.69141 0 7.25 0.558593 7.25 1.25V2.5H12.25V1.25C12.25 0.558593 12.8086 0 13.5 0C14.1914 0 14.75 0.558593 14.75 1.25V2.5H16.625C17.6602 2.5 18.5 3.33984 18.5 4.375V6.25H1V4.375C1 3.33984 1.83984 2.5 2.875 2.5H4.75V1.25C4.75 0.558593 5.30859 0 6 0ZM1 7.5H18.5V18.125C18.5 19.1602 17.6602 20 16.625 20H2.875C1.83984 20 1 19.1602 1 18.125V7.5ZM3.5 10.625V11.875C3.5 12.2187 3.78125 12.5 4.125 12.5H5.375C5.71875 12.5 6 12.2187 6 11.875V10.625C6 10.2812 5.71875 10 5.375 10H4.125C3.78125 10 3.5 10.2812 3.5 10.625ZM8.5 10.625V11.875C8.5 12.2187 8.78125 12.5 9.125 12.5H10.375C10.7188 12.5 11 12.2187 11 11.875V10.625C11 10.2812 10.7188 10 10.375 10H9.125C8.78125 10 8.5 10.2812 8.5 10.625ZM14.125 10C13.7812 10 13.5 10.2812 13.5 10.625V11.875C13.5 12.2187 13.7812 12.5 14.125 12.5H15.375C15.7187 12.5 16 12.2187 16 11.875V10.625C16 10.2812 15.7187 10 15.375 10H14.125ZM3.5 15.625V16.875C3.5 17.2187 3.78125 17.5 4.125 17.5H5.375C5.71875 17.5 6 17.2187 6 16.875V15.625C6 15.2812 5.71875 15 5.375 15H4.125C3.78125 15 3.5 15.2812 3.5 15.625ZM9.125 15C8.78125 15 8.5 15.2812 8.5 15.625V16.875C8.5 17.2187 8.78125 17.5 9.125 17.5H10.375C10.7188 17.5 11 17.2187 11 16.875V15.625C11 15.2812 10.7188 15 10.375 15H9.125ZM13.5 15.625V16.875C13.5 17.2187 13.7812 17.5 14.125 17.5H15.375C15.7187 17.5 16 17.2187 16 16.875V15.625C16 15.2812 15.7187 15 15.375 15H14.125C13.7812 15 13.5 15.2812 13.5 15.625Z"
                  fill="#3B823E"
                />
              </svg>
            </div>
            <p className="stat-card__label">Tổng sản phẩm</p>
            <p className="stat-card__value">124</p>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--emerald">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#sc1)">
                  <path
                    d="M10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20ZM14.4141 8.16406L9.41406 13.1641C9.04688 13.5312 8.45313 13.5312 8.08984 13.1641L5.58984 10.6641C5.22266 10.2969 5.22266 9.70313 5.58984 9.33984C5.95703 8.97656 6.55078 8.97266 6.91406 9.33984L8.75 11.1758L13.0859 6.83594C13.4531 6.46875 14.0469 6.46875 14.4102 6.83594C14.7734 7.20312 14.7773 7.79687 14.4102 8.16016L14.4141 8.16406Z"
                    fill="#10B981"
                  />
                </g>
                <defs>
                  <clipPath id="sc1">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="stat-card__label">Đang bán</p>
            <p className="stat-card__value">86</p>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--amber">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#sc2)">
                  <path
                    d="M11.1111 2.10951C11.1111 1.76576 10.9549 1.44284 10.684 1.23451C10.4132 1.02617 10.0625 0.949786 9.72919 1.03312L3.48264 2.59562C2.74306 2.77964 2.22222 3.44631 2.22222 4.2102V16.5539H1.11111C0.496527 16.5539 0 17.0504 0 17.665C0 18.2796 0.496527 18.7761 1.11111 18.7761H3.33333H10H11.1111V17.665V2.10951ZM8.88889 9.88726C8.88889 10.5019 8.51733 10.9984 8.05556 10.9984C7.59378 10.9984 7.22222 10.5019 7.22222 9.88726C7.22222 9.27267 7.59378 8.77615 8.05556 8.77615C8.51733 8.77615 8.88889 9.27267 8.88889 9.88726ZM12.2222 5.44284H15.5556V17.665C15.5556 18.2796 16.0521 18.7761 16.6667 18.7761H18.8889C19.5035 18.7761 20 18.2796 20 17.665C20 17.0504 19.5035 16.5539 18.8889 16.5539H17.7778V5.44284C17.7778 4.21715 16.7813 3.22062 15.5556 3.22062H12.2222V5.44284Z"
                    fill="#D97706"
                  />
                </g>
                <defs>
                  <clipPath id="sc2">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="stat-card__label">Chờ kiểm duyệt</p>
            <p className="stat-card__value">12</p>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--blue">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#sc3)">
                  <path
                    d="M3.5 2C2.67187 2 2 2.67188 2 3.5V5H0.5C0.225 5 0 5.225 0 5.5C0 5.775 0.225 6 0.5 6H2H8.5C8.77504 6 9 6.225 9 6.5C9 6.775 8.77504 7 8.5 7H2H1.5C1.225 7 1 7.225 1 7.5C1 7.775 1.225 8 1.5 8H2H7.5C7.775 8 8 8.225 8 8.5C8 8.775 7.775 9 7.5 9H2H0.5C0.225 9 0 9.225 0 9.5C0 9.775 0.225 10 0.5 10H2H6.5C6.775 10 7 10.225 7 10.5C7 10.775 6.775 11 6.5 11H2V15C2 16.6562 3.34375 18 5 18C6.65625 18 8 16.6562 8 15H12C12 16.6562 13.3438 18 15 18C16.6562 18 18 16.6562 18 15H19C19.5531 15 20 14.5531 20 14C20 13.4469 19.5531 13 19 13V11V10V9.41562C19 8.88438 18.7906 8.375 18.4156 8L16 5.58438C15.625 5.20938 15.1156 5 14.5844 5H13V3.5C13 2.67188 12.3282 2 11.5 2H3.5ZM17 9.41562V10H13V7H14.5844L17 9.41562ZM5 13.5C5.39782 13.5 5.77935 13.658 6.06066 13.9394C6.34197 14.2206 6.5 14.6022 6.5 15C6.5 15.3978 6.34197 15.7794 6.06066 16.0606C5.77935 16.342 5.39782 16.5 5 16.5C4.60218 16.5 4.22065 16.342 3.93934 16.0606C3.65803 15.7794 3.5 15.3978 3.5 15C3.5 14.6022 3.65803 14.2206 3.93934 13.9394C4.22065 13.658 4.60218 13.5 5 13.5ZM13.5 15C13.5 14.6022 13.658 14.2206 13.9394 13.9394C14.2206 13.658 14.6022 13.5 15 13.5C15.3978 13.5 15.7794 13.658 16.0606 13.9394C16.342 14.2206 16.5 14.6022 16.5 15C16.5 15.3978 16.342 15.7794 16.0606 16.0606C15.7794 16.342 15.3978 16.5 15 16.5C14.6022 16.5 14.2206 16.342 13.9394 16.0606C13.658 15.7794 13.5 15.3978 13.5 15Z"
                    fill="#3B82F6"
                  />
                </g>
                <defs>
                  <clipPath id="sc3">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="stat-card__label">Sản phẩm nổi bật</p>
            <p className="stat-card__value">08</p>
          </div>

          <div className="stat-card stat-card--dark">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--white-overlay">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#sc4)">
                  <path
                    d="M20 3.125C20 3.82812 19.4414 4.47656 18.5 5C17.3633 5.62891 15.668 6.07422 13.7227 6.20703C13.5781 6.13672 13.4336 6.07031 13.2812 6.01172C11.7422 5.36719 9.69531 5 7.5 5C7.17578 5 6.85938 5.00781 6.54297 5.02344L6.5 5C5.55859 4.47656 5 3.82812 5 3.125C5 1.39844 8.35938 0 12.5 0C16.6406 0 20 1.39844 20 3.125ZM6.27734 6.29297C6.67578 6.26563 7.08594 6.25 7.5 6.25C9.92969 6.25 12.0859 6.73047 13.457 7.47656C14.4258 8.00391 15 8.66016 15 9.375C15 9.53125 14.9727 9.68359 14.918 9.83203C14.7383 10.3477 14.2539 10.8203 13.5508 11.2188C13.5469 11.2227 13.5391 11.2227 13.5352 11.2266C13.5234 11.2344 13.5117 11.2383 13.5 11.2461C12.1328 12.0039 9.95312 12.4961 7.5 12.4961C5.17188 12.4961 3.08984 12.0547 1.71094 11.3594C1.63672 11.3242 1.56641 11.2852 1.49609 11.2461C0.558594 10.7266 0 10.0781 0 9.375C0 8.01563 2.08594 6.85547 5 6.42969C5.41016 6.37109 5.83594 6.32422 6.27734 6.29297ZM16.25 9.375C16.25 8.51953 15.8359 7.81641 15.3086 7.28906C16.4141 7.11719 17.4258 6.84375 18.2852 6.48828C18.9219 6.22266 19.5156 5.89453 20 5.49219V6.875C20 7.62891 19.3555 8.32422 18.2891 8.86328C17.7188 9.15234 17.0234 9.39844 16.2422 9.58594C16.2461 9.51562 16.25 9.44922 16.25 9.37891V9.375ZM15 13.125C15 13.8281 14.4414 14.4766 13.5 15C13.4297 15.0391 13.3594 15.0742 13.2852 15.1133C11.9102 15.8086 9.82812 16.25 7.5 16.25C5.04688 16.25 2.86719 15.7578 1.5 15C0.558594 14.4766 0 13.8281 0 13.125V11.7422C0.488281 12.1445 1.07813 12.4727 1.71484 12.7383C3.25781 13.3828 5.30469 13.75 7.5 13.75C9.69531 13.75 11.7422 13.3828 13.2852 12.7383C13.5898 12.6133 13.8828 12.4688 14.1602 12.3125C14.3984 12.1797 14.6211 12.0312 14.832 11.875C14.8906 11.832 14.9453 11.7852 15 11.7422V11.875V12.0977V13.125ZM16.25 13.125V11.875V10.8633C16.9922 10.6992 17.6758 10.4922 18.2852 10.2383C18.9219 9.97266 19.5156 9.64453 20 9.24219V10.625C20 11.0352 19.8047 11.4453 19.418 11.832C18.7813 12.4687 17.6602 12.9922 16.2422 13.332C16.2461 13.2656 16.25 13.1953 16.25 13.125ZM7.5 17.5C9.69531 17.5 11.7422 17.1328 13.2852 16.4883C13.9219 16.2227 14.5156 15.8945 15 15.4922V16.875C15 18.6016 11.6406 20 7.5 20C3.35938 20 0 18.6016 0 16.875V15.4922C0.488281 15.8945 1.07813 16.2227 1.71484 16.4883C3.25781 17.1328 5.30469 17.5 7.5 17.5Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="sc4">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="stat-card__label stat-card__label--light">
              Tỷ lệ chuyển đổi
            </p>
            <p className="stat-card__value stat-card__value--light">4.8%</p>
          </div>
        </div>

        {/* Product list */}
        <div className="seller-product-list">
          <div className="product-list-header">
            <h2 className="product-list-title">Danh sách sản phẩm</h2>
            <div className="product-list-filters">
              <button className="category-filter-btn">
                <span>Danh mục: Tất cả</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <g clipPath="url(#fc1)">
                    <path
                      d="M5.15135 6.80704C5.47095 7.12663 5.98999 7.12663 6.30959 6.80704L11.2187 1.89795C11.5383 1.57834 11.5383 1.0593 11.2187 0.739702C10.8991 0.420099 10.38 0.420099 10.0604 0.739702L5.72919 5.07095L1.39795 0.742258C1.07834 0.422656 0.559304 0.422656 0.239702 0.742258C-0.0799007 1.06186 -0.0799007 1.58089 0.239702 1.9005L5.1488 6.80959L5.15135 6.80704Z"
                      fill="#436E35"
                    />
                  </g>
                  <defs>
                    <clipPath id="fc1">
                      <rect width="12" height="8" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button className="filter-icon-btn" aria-label="Bộ lọc">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M0.121712 1.71562C0.327962 1.27812 0.765462 1 1.24984 1H14.7498C15.2342 1 15.6717 1.27812 15.878 1.71562C16.0842 2.15313 16.0217 2.66875 15.7155 3.04375L9.99984 10.0281V14C9.99984 14.3781 9.78734 14.725 9.44671 14.8938C9.10609 15.0625 8.70296 15.0281 8.39984 14.8L6.39984 13.3C6.14671 13.1125 5.99984 12.8156 5.99984 12.5V10.0281L0.281087 3.04063C-0.0220384 2.66875 -0.0876634 2.15 0.121712 1.71562Z"
                    fill="#3B823E"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Table header */}
          <div className="product-table-head">
            <span className="product-col product-col--img">ẢNH</span>
            <span className="product-col product-col--name">TÊN SẢN PHẨM</span>
            <span className="product-col product-col--price">GIÁ</span>
            <span className="product-col product-col--category">DANH MỤC</span>
            <span className="product-col product-col--eco">ECO SCORE</span>
            <span className="product-col product-col--status">TRẠNG THÁI</span>
            <span className="product-col product-col--actions">HÀNH ĐỘNG</span>
          </div>

          {/* Product rows */}
          <div className="product-table-body">
            {filtered.map((product) => {
              const statusCfg = STATUS_CONFIG[product.status];
              return (
                <div key={product.id} className="product-row">
                  <div className="product-col product-col--img">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-thumb"
                    />
                  </div>
                  <div className="product-col product-col--name">
                    <span className="product-name">{product.name}</span>
                    <span className="product-code">Mã SP: {product.code}</span>
                  </div>
                  <div className="product-col product-col--price">
                    <span className="product-price">{product.price}</span>
                  </div>
                  <div className="product-col product-col--category">
                    <span className="product-category">{product.category}</span>
                  </div>
                  <div className="product-col product-col--eco">
                    <span className="eco-badge">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                      >
                        <path
                          d="M5.84375 1.87662C4.15508 1.87662 2.72637 2.98306 2.24082 4.50845C2.9627 4.14322 3.77695 3.93912 4.64062 3.93912H6.53125C6.72031 3.93912 6.875 4.0938 6.875 4.28287C6.875 4.47193 6.72031 4.62662 6.53125 4.62662H6.1875H4.64062C4.28398 4.62662 3.93809 4.66744 3.60508 4.74263C3.04863 4.86939 2.53086 5.09498 2.07109 5.4022C0.822852 6.23365 0 7.65377 0 9.26724V9.61099C0 9.89673 0.229883 10.1266 0.515625 10.1266C0.801367 10.1266 1.03125 9.89673 1.03125 9.61099V9.26724C1.03125 8.22095 1.47598 7.27994 2.18711 6.62037C2.6125 8.24244 4.08848 9.43912 5.84375 9.43912H5.86523C8.70332 9.42408 11 6.62681 11 3.17857C11 2.26334 10.8389 1.39322 10.5467 0.609039C10.4908 0.460797 10.2738 0.467242 10.1986 0.606891C9.79473 1.36314 8.99551 1.87662 8.07812 1.87662H5.84375Z"
                          fill="#10B981"
                        />
                      </svg>
                      {product.ecoScore}
                    </span>
                  </div>
                  <div className="product-col product-col--status">
                    <span
                      className="status-badge"
                      style={{
                        background: statusCfg.bg,
                        color: statusCfg.color,
                      }}
                    >
                      {statusCfg.label}
                    </span>
                  </div>
                  <div className="product-col product-col--actions">
                    <div className="product-actions">
                      <button className="action-btn" aria-label="Chỉnh sửa">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <g clipPath="url(#a1)">
                            <path
                              d="M12.7509 0.659179L11.0494 2.36074L15.6196 6.93105L17.3213 5.22949C18.2002 4.35059 18.2002 2.92676 17.3213 2.04785L15.936 0.659179C15.0571 -0.219726 13.6333 -0.219726 12.7544 0.659179H12.7509ZM10.2548 3.15527L2.05991 11.3537C1.69429 11.7193 1.4271 12.1728 1.27944 12.6686L0.0349125 16.8979C-0.052978 17.1967 0.0278814 17.5166 0.24585 17.7346C0.463819 17.9526 0.783741 18.0334 1.07905 17.9491L5.30835 16.7045C5.80405 16.5568 6.25757 16.2896 6.62319 15.9241L14.8252 7.72559L10.2548 3.15527Z"
                              fill="#9CA3AF"
                            />
                          </g>
                          <defs>
                            <clipPath id="a1">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <button className="action-btn" aria-label="Xem">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M8.85861 1.7998C6.37306 1.7998 4.38277 2.93183 2.9339 4.27921C1.49425 5.61426 0.531408 7.21386 0.0761353 8.31205C-0.0253784 8.55509 -0.0253784 8.82577 0.0761353 9.06881C0.531408 10.167 1.49425 11.7666 2.9339 13.1017C4.38277 14.449 6.37306 15.581 8.85861 15.581C11.3442 15.581 13.3344 14.449 14.7833 13.1017C16.223 11.7635 17.1858 10.167 17.6442 9.06881C17.7456 8.82577 17.7456 8.55509 17.6442 8.31205C17.1858 7.21386 16.223 5.61426 14.7833 4.27921C13.3344 2.93183 11.3442 1.7998 8.85861 1.7998ZM4.42892 8.69043C4.42892 7.51561 4.89562 6.3889 5.72634 5.55818C6.55707 4.72743 7.68378 4.26075 8.85861 4.26075C10.0334 4.26075 11.1601 4.72743 11.9908 5.55818C12.8216 6.3889 13.2883 7.51561 13.2883 8.69043C13.2883 9.86525 12.8216 10.992 11.9908 11.8227C11.1601 12.6534 10.0334 13.1201 8.85861 13.1201C7.68378 13.1201 6.55707 12.6534 5.72634 11.8227C4.89562 10.992 4.42892 9.86525 4.42892 8.69043ZM8.85861 6.72169C8.85861 7.80757 7.97574 8.69043 6.88986 8.69043C6.67145 8.69043 6.46227 8.65351 6.2654 8.58893C6.09621 8.53354 5.89933 8.63815 5.90549 8.81656C5.91471 9.0288 5.94547 9.24107 6.00392 9.45331C6.42536 11.0283 8.04649 11.9635 9.62145 11.542C11.1965 11.1207 12.1317 9.49947 11.7102 7.92447C11.3688 6.64785 10.2398 5.78959 8.98473 5.7373C8.80631 5.73116 8.70172 5.92495 8.75709 6.09721C8.82169 6.2941 8.85861 6.50328 8.85861 6.72169Z"
                            fill="#9CA3AF"
                          />
                        </svg>
                      </button>
                      <button
                        className="action-btn action-btn--delete"
                        aria-label="Xóa"
                      >
                        <svg
                          width="14"
                          height="18"
                          viewBox="0 0 14 18"
                          fill="none"
                        >
                          <path
                            d="M4.225 1.55313L4 2H1C0.446875 2 0 2.44687 0 3C0 3.55313 0.446875 4 1 4H13C13.5531 4 14 3.55313 14 3C14 2.44687 13.5531 2 13 2H10L9.775 1.55313C9.60625 1.2125 9.25938 1 8.88125 1H5.11875C4.74063 1 4.39375 1.2125 4.225 1.55313ZM13 5H1L1.6625 15.5938C1.7125 16.3844 2.36875 17 3.15937 17H10.8406C11.6312 17 12.2875 16.3844 12.3375 15.5938L13 5Z"
                            fill="#FECACA"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load more */}
          <div className="product-load-more">
            <button className="load-more-btn">
              <span>Xem thêm 116 sản phẩm khác</span>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <g clipPath="url(#lm)">
                  <path
                    d="M7.25642 7.04786C7.61358 7.405 8.19357 7.405 8.55071 7.04786L14.0364 1.56214C14.3935 1.205 14.3935 0.625 14.0364 0.267857C13.6793 -0.0892857 13.0993 -0.0892857 12.7422 0.267857L7.90214 5.10786L3.06214 0.270713C2.705 -0.0864289 2.125 -0.0864289 1.76786 0.270713C1.41071 0.627856 1.41071 1.20786 1.76786 1.565L7.25358 7.05071L7.25642 7.04786Z"
                    fill="#436E35"
                  />
                </g>
                <defs>
                  <clipPath id="lm">
                    <rect width="16" height="8" fill="white" />
                  </clipPath>
                </defs>
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
            {/* VISA */}
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
            {/* Mastercard */}
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
            {/* Express */}
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
            {/* RuPay placeholder */}
            <span className="seller-footer__rupay">RuPay</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
