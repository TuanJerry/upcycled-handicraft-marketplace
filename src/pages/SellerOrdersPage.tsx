import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerProductsPage.css";
import "./SellerOrdersPage.css";

type PaymentStatus = "paid" | "cod";
type ShippingStatus = "delivering" | "delivered" | "pending_confirm";

interface OrderStep {
  label: string;
  time: string;
  state: "done" | "active" | "pending";
  icon: "check" | "pack" | "truck" | "home";
}

interface Order {
  id: string;
  date: string;
  buyer: { name: string; location: string; avatar: string };
  product: { name: string; qty: number; image: string };
  payment: PaymentStatus;
  shipping: ShippingStatus;
  total: string;
  steps?: OrderStep[];
}

const ORDER_STEPS_89420: OrderStep[] = [
  { label: "Đã xác nhận", time: "09:12 - 24/05", state: "done", icon: "check" },
  { label: "Đóng gói", time: "14:30 - 24/05", state: "done", icon: "pack" },
  {
    label: "Đang giao hàng",
    time: "Dự kiến: 26/05",
    state: "active",
    icon: "truck",
  },
  { label: "Thành công", time: "-- / --", state: "pending", icon: "home" },
];

const MOCK_ORDERS: Order[] = [
  {
    id: "CC-89420",
    date: "24 Th05, 2024",
    buyer: {
      name: "Minh Anh",
      location: "TP. Hồ Chí Minh",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/e70d49f5e08e80d839d7e2d6d0b9c2da2b0d3d2f?width=80",
    },
    product: {
      name: "Nến thơm vỏ dừa...",
      qty: 2,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/08e88c35b5937c22eeb5e1d703a66d244dab9627?width=112",
    },
    payment: "paid",
    shipping: "delivering",
    total: "450.000đ",
    steps: ORDER_STEPS_89420,
  },
  {
    id: "CC-89418",
    date: "22 Th05, 2024",
    buyer: {
      name: "Trần Hoàng",
      location: "Hà Nội",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/488e0b7a1bd5dc53be29828d109000c2261867b8?width=80",
    },
    product: {
      name: "Túi Tote vải bạt tái...",
      qty: 1,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/488e0b7a1bd5dc53be29828d109000c2261867b8?width=112",
    },
    payment: "paid",
    shipping: "delivered",
    total: "180.000đ",
  },
  {
    id: "CC-89425",
    date: "24 Th05, 2024",
    buyer: {
      name: "Lê Thảo",
      location: "Đà Nẵng",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/775c2163aecd6840bdeec2878819455f4fa8453d?width=80",
    },
    product: {
      name: "Đồng hồ nắp chai...",
      qty: 1,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/3355342033e6ec0cec3ddb161a802e0864c2e1f1?width=74",
    },
    payment: "cod",
    shipping: "pending_confirm",
    total: "720.000đ",
  },
];

const PAYMENT_CONFIG: Record<PaymentStatus, { label: string; color: string }> =
  {
    paid: { label: "ĐÃ TRẢ", color: "#3B823E" },
    cod: { label: "COD", color: "#D97706" },
  };

const SHIPPING_CONFIG: Record<
  ShippingStatus,
  { label: string; bg: string; color: string }
> = {
  delivering: { label: "Đang vận chuyển", bg: "#FFF7ED", color: "#F97316" },
  delivered: { label: "Đã giao hàng", bg: "#ECFDF5", color: "#10B981" },
  pending_confirm: { label: "Chờ xác nhận", bg: "#FFF9EB", color: "#D97706" },
};

function StepIcon({
  icon,
  state,
}: {
  icon: OrderStep["icon"];
  state: OrderStep["state"];
}) {
  if (state === "done") {
    return (
      <div className="order-step__circle order-step__circle--done">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M11.9931 2.88184C12.3349 3.22363 12.3349 3.77871 11.9931 4.12051L4.99307 11.1205C4.65127 11.4623 4.09619 11.4623 3.75439 11.1205L0.254395 7.62051C-0.0874023 7.27871 -0.0874023 6.72363 0.254395 6.38184C0.596191 6.04004 1.15127 6.04004 1.49307 6.38184L4.3751 9.26113L10.7571 2.88184C11.0989 2.54004 11.654 2.54004 11.9958 2.88184H11.9931Z"
            fill="white"
          />
        </svg>
      </div>
    );
  }

  if (state === "active") {
    const iconEl =
      icon === "truck" ? (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path
            d="M1.3125 0C0.587891 0 0 0.587891 0 1.3125V10.0625C0 10.7871 0.587891 11.375 1.3125 11.375H1.75C1.75 12.8242 2.92578 14 4.375 14C5.82422 14 7 12.8242 7 11.375H10.5C10.5 12.8242 11.6758 14 13.125 14C14.5742 14 15.75 12.8242 15.75 11.375H16.625C17.109 11.375 17.5 10.984 17.5 10.5C17.5 10.016 17.109 9.625 16.625 9.625V7.875V7V6.48867C16.625 6.02383 16.4418 5.57812 16.1137 5.25L14 3.13633C13.6719 2.8082 13.2262 2.625 12.7613 2.625H11.375V1.3125C11.375 0.587891 10.7871 0 10.0625 0H1.3125ZM11.375 4.375H12.7613L14.875 6.48867V7H11.375V4.375ZM3.0625 11.375C3.0625 11.0269 3.20078 10.6931 3.44692 10.4469C3.69306 10.2008 4.0269 10.0625 4.375 10.0625C4.7231 10.0625 5.05694 10.2008 5.30308 10.4469C5.54922 10.6931 5.6875 11.0269 5.6875 11.375C5.6875 11.7231 5.54922 12.0569 5.30308 12.3031C5.05694 12.5492 4.7231 12.6875 4.375 12.6875C4.0269 12.6875 3.69306 12.5492 3.44692 12.3031C3.20078 12.0569 3.0625 11.7231 3.0625 11.375ZM13.125 10.0625C13.4731 10.0625 13.8069 10.2008 14.0531 10.4469C14.2992 10.6931 14.4375 11.0269 14.4375 11.375C14.4375 11.7231 14.2992 12.0569 14.0531 12.3031C13.8069 12.5492 13.4731 12.6875 13.125 12.6875C12.7769 12.6875 12.4431 12.5492 12.1969 12.3031C11.9508 12.0569 11.8125 11.7231 11.8125 11.375C11.8125 11.0269 11.9508 10.6931 12.1969 10.4469C12.4431 10.2008 12.7769 10.0625 13.125 10.0625Z"
            fill="#3B823E"
          />
        </svg>
      ) : null;
    return (
      <div className="order-step__circle order-step__circle--active">
        {iconEl}
      </div>
    );
  }

  // pending
  const iconEl =
    icon === "home" ? (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
        <path
          d="M8.76914 9.625C8.99063 7.17227 11.0523 5.25 13.5625 5.25C13.8059 5.25 14.0437 5.26914 14.2762 5.30195L8.46289 0.191406C8.29883 0.0546875 8.08008 0 7.88867 0C7.69727 0 7.47852 0.0273438 7.28711 0.21875L0.273438 6.33008C0.0820312 6.52148 0 6.74023 0 6.98633C0 7.47852 0.382812 7.86406 0.875 7.86406H1.75V9.76992C1.74727 9.79453 1.74727 9.81914 1.74727 9.84648V12.9062C1.74727 13.5105 2.23672 14 2.84102 14H3.27852C3.31133 14 3.34414 13.9973 3.37695 13.9945C3.41797 13.9973 3.45898 14 3.5 14H4.375H5.03125C5.63555 14 6.125 13.5105 6.125 12.9062V12.25V10.5C6.125 10.016 6.51602 9.625 7 9.625H8.75H8.76914ZM17.5 10.0625C17.5 9.01821 17.0852 8.01669 16.3467 7.27827C15.6083 6.53984 14.6068 6.125 13.5625 6.125C12.5182 6.125 11.5167 6.53984 10.7783 7.27827C10.0398 8.01669 9.625 9.01821 9.625 10.0625C9.625 11.1068 10.0398 12.1083 10.7783 12.8467C11.5167 13.5852 12.5182 14 13.5625 14C14.6068 14 15.6083 13.5852 16.3467 12.8467C17.0852 12.1083 17.5 11.1068 17.5 10.0625ZM15.4027 8.87852C15.5723 9.04805 15.5723 9.32695 15.4027 9.49648L13.434 11.4652C13.2645 11.6348 12.9855 11.6348 12.816 11.4652L11.7223 10.3715C11.5527 10.202 11.5527 9.92305 11.7223 9.75352C11.8918 9.58398 12.1707 9.58398 12.3402 9.75352L13.125 10.5383L14.7848 8.87852C14.9543 8.70898 15.2332 8.70898 15.4027 8.87852Z"
          fill="#9CA3AF"
        />
      </svg>
    ) : null;
  return (
    <div className="order-step__circle order-step__circle--pending">
      {iconEl}
    </div>
  );
}

function PackIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path
        d="M1.61044 1.15139C1.69247 0.984591 1.87294 0.888888 2.05614 0.913498L8.74989 1.75022L15.4436 0.913498C15.6268 0.891623 15.8073 0.987326 15.8893 1.15139L17.0296 3.43186C17.2757 3.92131 17.0132 4.51467 16.4882 4.66506L12.0202 5.94201C11.6401 6.05139 11.2327 5.89006 11.0304 5.551L8.74989 1.75022L6.46943 5.551C6.26708 5.89006 5.85966 6.05139 5.47958 5.94201L1.01435 4.66506C0.486614 4.51467 0.226848 3.92131 0.472942 3.43186L1.61044 1.15139ZM8.77997 3.50022L10.2811 5.99943C10.6886 6.67756 11.5007 7.00022 12.2636 6.78147L15.7499 5.78615V10.3526C15.7499 10.9541 15.3397 11.4791 14.7546 11.6268L9.17372 13.0213C8.89482 13.0924 8.60224 13.0924 8.32607 13.0213L2.74521 11.6268C2.16005 11.4764 1.74989 10.9514 1.74989 10.3498V5.78342L5.23896 6.78147C5.99911 7.00022 6.81396 6.67756 7.22138 5.99943L8.71982 3.50022H8.77997Z"
        fill="white"
      />
    </svg>
  );
}

function OrderTimeline({ steps }: { steps: OrderStep[] }) {
  return (
    <div className="order-timeline">
      {steps.map((step, idx) => (
        <div key={idx} className="order-timeline__step">
          {idx > 0 && (
            <div
              className={`order-timeline__connector${steps[idx - 1].state === "done" ? " order-timeline__connector--done" : ""}`}
            />
          )}
          <div className="order-step">
            {step.state === "done" && step.icon === "pack" ? (
              <div className="order-step__circle order-step__circle--done">
                <PackIcon />
              </div>
            ) : (
              <StepIcon icon={step.icon} state={step.state} />
            )}
            <div className="order-step__labels">
              <span
                className={`order-step__label${step.state === "active" ? " order-step__label--active" : step.state === "pending" ? " order-step__label--pending" : ""}`}
              >
                {step.label}
              </span>
              <span className="order-step__time">{step.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SellerOrdersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string>("CC-89420");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    navigate("/dang-nhap");
  }

  function handleNavClick(item: "workshop" | "orders" | "products") {
    if (item === "workshop") navigate("/seller/workshop");
    if (item === "products") navigate("/seller");
  }

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? "" : id));
  }

  const filtered = MOCK_ORDERS.filter(
    (o) =>
      `#${o.id}`.toLowerCase().includes(search.toLowerCase()) ||
      o.buyer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.product.name.toLowerCase().includes(search.toLowerCase()),
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
              className="seller-nav-item"
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

            <button className="seller-nav-item seller-nav-item--active">
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
              className="seller-nav-item"
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

      {/* Main */}
      <main className="seller-main">
        {/* Header */}
        <div className="seller-page-header">
          <div className="seller-page-title-group">
            <h1 className="seller-page-title">Quản lý đơn hàng</h1>
            <p className="seller-page-subtitle">
              Theo dõi và xử lý hành trình của những sản phẩm thủ công tái chế
            </p>
          </div>

          <div className="seller-header-actions">
            <div className="seller-search-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 21 24"
                fill="none"
                aria-hidden="true"
              >
                <mask
                  id="sm"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="1"
                  width="21"
                  height="22"
                >
                  <path
                    d="M20.1314 1.93262H0V22.0676H20.1314V1.93262Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#sm)">
                  <path
                    d="M13.0017 13.6782H12.339L12.1041 13.4517C12.9262 12.4953 13.4211 11.2537 13.4211 9.90294C13.4211 6.89108 10.9801 4.44971 7.96885 4.44971C4.95753 4.44971 2.5166 6.89108 2.5166 9.90294C2.5166 12.9148 4.95753 15.3562 7.96885 15.3562C9.31932 15.3562 10.5607 14.8612 11.517 14.039L11.7435 14.2739V14.9367L15.9375 19.1231L17.1874 17.8731L13.0017 13.6782ZM7.96885 13.6782C5.88022 13.6782 4.19422 11.9919 4.19422 9.90294C4.19422 7.81394 5.88022 6.12763 7.96885 6.12763C10.0575 6.12763 11.7435 7.81394 11.7435 9.90294C11.7435 11.9919 10.0575 13.6782 7.96885 13.6782Z"
                    fill="#343434"
                    fillOpacity="0.5"
                  />
                </g>
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="seller-search-input"
              />
            </div>

            <button className="order-create-btn">
              <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                <path
                  d="M7 2.1875C7 1.70352 6.60898 1.3125 6.125 1.3125C5.64102 1.3125 5.25 1.70352 5.25 2.1875V6.125H1.3125C0.828516 6.125 0.4375 6.51602 0.4375 7C0.4375 7.48398 0.828516 7.875 1.3125 7.875H5.25V11.8125C5.25 12.2965 5.64102 12.6875 6.125 12.6875C6.60898 12.6875 7 12.2965 7 11.8125V7.875H10.9375C11.4215 7.875 11.8125 7.48398 11.8125 7C11.8125 6.51602 11.4215 6.125 10.9375 6.125H7V2.1875Z"
                  fill="white"
                />
              </svg>
              Tạo vận đơn
            </button>

            <button className="order-export-btn">
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                <path
                  d="M0 1.75C0 0.784766 0.784766 0 1.75 0H6.125V3.5C6.125 3.98398 6.51602 4.375 7 4.375H10.5V7.875H5.90625C5.54258 7.875 5.25 8.16758 5.25 8.53125C5.25 8.89492 5.54258 9.1875 5.90625 9.1875H10.5V12.25C10.5 13.2152 9.71523 14 8.75 14H1.75C0.784766 14 0 13.2152 0 12.25V1.75ZM10.5 9.1875V7.875H13.5105L12.4441 6.80859C12.1871 6.55156 12.1871 6.13594 12.4441 5.88164C12.7012 5.62734 13.1168 5.62461 13.3711 5.88164L15.5586 8.06914C15.8156 8.32617 15.8156 8.7418 15.5586 8.99609L13.3711 11.1836C13.1141 11.4406 12.6984 11.4406 12.4441 11.1836C12.1898 10.9266 12.1871 10.5109 12.4441 10.2566L13.5105 9.19023H10.5V9.1875ZM10.5 3.5H7V0L10.5 3.5Z"
                  fill="#3B823E"
                />
              </svg>
              Xuất báo cáo
            </button>

            <button className="seller-profile-btn" aria-label="Hồ sơ">
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <mask
                  id="pm"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="5"
                  y="4"
                  width="15"
                  height="16"
                >
                  <path
                    d="M19.7699 4.94092H5.64844V19.0592H19.7699V4.94092Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#pm)">
                  <path
                    d="M12.7091 6.11768C9.46121 6.11768 6.8252 8.7531 6.8252 12.0003C6.8252 15.2475 9.46121 17.8829 12.7091 17.8829C15.9571 17.8829 18.593 15.2475 18.593 12.0003C18.593 8.7531 15.9571 6.11768 12.7091 6.11768ZM9.80835 15.6946C10.0614 15.1651 11.6029 14.6475 12.7091 14.6475C13.8153 14.6475 15.3628 15.1651 15.6099 15.6946C14.8097 16.3299 13.8035 16.7064 12.7091 16.7064C11.6147 16.7064 10.6086 16.3299 9.80835 15.6946ZM16.4513 14.8416C15.6099 13.818 13.5681 13.4709 12.7091 13.4709C11.8501 13.4709 9.80835 13.818 8.96696 14.8416C8.3668 14.0533 8.00197 13.0709 8.00197 12.0003C8.00197 9.40607 10.1143 7.29419 12.7091 7.29419C15.3039 7.29419 17.4162 9.40607 17.4162 12.0003C17.4162 13.0709 17.0515 14.0533 16.4513 14.8416ZM12.7091 8.47074C11.5676 8.47074 10.6497 9.38842 10.6497 10.5296C10.6497 11.6709 11.5676 12.5885 12.7091 12.5885C13.8506 12.5885 14.7685 11.6709 14.7685 10.5296C14.7685 9.38842 13.8506 8.47074 12.7091 8.47074ZM12.7091 11.412C12.2207 11.412 11.8265 11.0179 11.8265 10.5296C11.8265 10.041 12.2207 9.64725 12.7091 9.64725C13.1975 9.64725 13.5917 10.041 13.5917 10.5296C13.5917 11.0179 13.1975 11.412 12.7091 11.412Z"
                    fill="#2D3E2F"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="seller-stats-grid">
          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--green-light">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6.25 0C6.94141 0 7.5 0.558593 7.5 1.25V2.5H12.5V1.25C12.5 0.558593 13.0586 0 13.75 0C14.4414 0 15 0.558593 15 1.25V2.5H16.875C17.9102 2.5 18.75 3.33984 18.75 4.375V6.25H1.25V4.375C1.25 3.33984 2.08984 2.5 3.125 2.5H5V1.25C5 0.558593 5.55859 0 6.25 0ZM1.25 7.5H18.75V18.125C18.75 19.1602 17.9102 20 16.875 20H3.125C2.08984 20 1.25 19.1602 1.25 18.125V7.5ZM3.75 10.625V11.875C3.75 12.2187 4.03125 12.5 4.375 12.5H5.625C5.96875 12.5 6.25 12.2187 6.25 11.875V10.625C6.25 10.2812 5.96875 10 5.625 10H4.375C4.03125 10 3.75 10.2812 3.75 10.625ZM8.75 10.625V11.875C8.75 12.2187 9.03125 12.5 9.375 12.5H10.625C10.9687 12.5 11.25 12.2187 11.25 11.875V10.625C11.25 10.2812 10.9687 10 10.625 10H9.375C9.03125 10 8.75 10.2812 8.75 10.625ZM14.375 10C14.0312 10 13.75 10.2812 13.75 10.625V11.875C13.75 12.2187 14.0312 12.5 14.375 12.5H15.625C15.9687 12.5 16.25 12.2187 16.25 11.875V10.625C16.25 10.2812 15.9687 10 15.625 10H14.375ZM3.75 15.625V16.875C3.75 17.2187 4.03125 17.5 4.375 17.5H5.625C5.96875 17.5 6.25 17.2187 6.25 16.875V15.625C6.25 15.2812 5.96875 15 5.625 15H4.375C4.03125 15 3.75 15.2812 3.75 15.625ZM9.375 15C9.03125 15 8.75 15.2812 8.75 15.625V16.875C8.75 17.2187 9.03125 17.5 9.375 17.5H10.625C10.9687 17.5 11.25 17.2187 11.25 16.875V15.625C11.25 15.2812 10.9687 15 10.625 15H9.375ZM13.75 15.625V16.875C13.75 17.2187 14.0312 17.5 14.375 17.5H15.625C15.9687 17.5 16.25 17.2187 16.25 16.875V15.625C16.25 15.2812 15.9687 15 15.625 15H14.375C14.0312 15 13.75 15.2812 13.75 15.625Z"
                  fill="#3B823E"
                />
              </svg>
            </div>
            <p className="stat-card__label">Tổng đơn hàng</p>
            <p className="stat-card__value">1,842</p>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--amber">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#so1)">
                  <path
                    d="M11.1111 2.22084C11.1111 1.87708 10.9549 1.55417 10.684 1.34584C10.4132 1.1375 10.0625 1.06111 9.72919 1.14445L3.48264 2.70695C2.74306 2.89097 2.22222 3.55764 2.22222 4.32153V16.6653H1.11111C0.496527 16.6653 0 17.1618 0 17.7764C0 18.391 0.496527 18.8875 1.11111 18.8875H3.33333H10H11.1111V17.7764V2.22084ZM8.88889 9.99859C8.88889 10.6132 8.51733 11.1097 8.05556 11.1097C7.59378 11.1097 7.22222 10.6132 7.22222 9.99859C7.22222 9.38399 7.59378 8.88748 8.05556 8.88748C8.51733 8.88748 8.88889 9.38399 8.88889 9.99859ZM12.2222 5.55417H15.5556V17.7764C15.5556 18.391 16.0521 18.8875 16.6667 18.8875H18.8889C19.5035 18.8875 20 18.391 20 17.7764C20 17.1618 19.5035 16.6653 18.8889 16.6653H17.7778V5.55417C17.7778 4.32848 16.7813 3.33195 15.5556 3.33195H12.2222V5.55417Z"
                    fill="#D97706"
                  />
                </g>
                <defs>
                  <clipPath id="so1">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="stat-card__label">Đơn hàng mới</p>
            <p className="stat-card__value">12</p>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--blue">
              <svg width="25" height="20" viewBox="0 0 25 20" fill="none">
                <path
                  d="M4.375 0C3.33984 0 2.5 0.839844 2.5 1.875V3.75H0.625C0.28125 3.75 0 4.03125 0 4.375C0 4.71875 0.28125 5 0.625 5H2.5H10.625C10.9688 5 11.25 5.28125 11.25 5.625C11.25 5.96875 10.9688 6.25 10.625 6.25H2.5H1.875C1.53125 6.25 1.25 6.53125 1.25 6.875C1.25 7.21875 1.53125 7.5 1.875 7.5H2.5H9.375C9.71875 7.5 10 7.78125 10 8.125C10 8.46875 9.71875 8.75 9.375 8.75H2.5H0.625C0.28125 8.75 0 9.03125 0 9.375C0 9.71875 0.28125 10 0.625 10H2.5H8.125C8.46875 10 8.75 10.2812 8.75 10.625C8.75 10.9688 8.46875 11.25 8.125 11.25H2.5V16.25C2.5 18.3203 4.17969 20 6.25 20C8.32031 20 10 18.3203 10 16.25H15C15 18.3203 16.6797 20 18.75 20C20.8203 20 22.5 18.3203 22.5 16.25H23.75C24.4414 16.25 25 15.6914 25 15C25 14.3086 24.4414 13.75 23.75 13.75V11.25V10V9.26953C23.75 8.60547 23.4883 7.96875 23.0195 7.5L20 4.48047C19.5312 4.01172 18.8945 3.75 18.2305 3.75H16.25V1.875C16.25 0.839844 15.4102 0 14.375 0H4.375ZM21.25 9.26953V10H16.25V6.25H18.2305L21.25 9.26953ZM6.25 14.375C6.74728 14.375 7.22419 14.5725 7.57583 14.9242C7.92746 15.2758 8.125 15.7527 8.125 16.25C8.125 16.7473 7.92746 17.2242 7.57583 17.5758C7.22419 17.9275 6.74728 18.125 6.25 18.125C5.75272 18.125 5.27581 17.9275 4.92417 17.5758C4.57254 17.2242 4.375 16.7473 4.375 16.25C4.375 15.7527 4.57254 15.2758 4.92417 14.9242C5.27581 14.5725 5.75272 14.375 6.25 14.375ZM16.875 16.25C16.875 15.7527 17.0725 15.2758 17.4242 14.9242C17.7758 14.5725 18.2527 14.375 18.75 14.375C19.2473 14.375 19.7242 14.5725 20.0758 14.9242C20.4275 15.2758 20.625 15.7527 20.625 16.25C20.625 16.7473 20.4275 17.2242 20.0758 17.5758C19.7242 17.9275 19.2473 18.125 18.75 18.125C18.2527 18.125 17.7758 17.9275 17.4242 17.5758C17.0725 17.2242 16.875 16.7473 16.875 16.25Z"
                  fill="#3B82F6"
                />
              </svg>
            </div>
            <p className="stat-card__label">Đang vận chuyển</p>
            <p className="stat-card__value">45</p>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--emerald">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20ZM14.4141 8.16406L9.41406 13.1641C9.04688 13.5312 8.45313 13.5312 8.08984 13.1641L5.58984 10.6641C5.22266 10.2969 5.22266 9.70313 5.58984 9.33984C5.95703 8.97656 6.55078 8.97266 6.91406 9.33984L8.75 11.1758L13.0859 6.83594C13.4531 6.46875 14.0469 6.46875 14.4102 6.83594C14.7734 7.20312 14.7773 7.79687 14.4102 8.16016L14.4141 8.16406Z"
                  fill="#10B981"
                />
              </svg>
            </div>
            <p className="stat-card__label">Đơn hoàn thành</p>
            <p className="stat-card__value">1,780</p>
          </div>

          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--indigo">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#so2)">
                  <path
                    d="M3 6C3 4.93913 3.42143 3.92172 4.17157 3.17157C4.92172 2.42143 5.93913 2 7 2C8.06087 2 9.07827 2.42143 9.8284 3.17157C10.5786 3.92172 11 4.93913 11 6C11 7.06087 10.5786 8.07828 9.8284 8.8284C9.07827 9.5786 8.06087 10 7 10C5.93913 10 4.92172 9.5786 4.17157 8.8284C3.42143 8.07828 3 7.06087 3 6ZM0 17.0719C0 13.9937 2.49375 11.5 5.57187 11.5H8.42813C11.5063 11.5 14 13.9937 14 17.0719C14 17.5844 13.5844 18 13.0719 18H0.928127C0.415625 18 0 17.5844 0 17.0719ZM19.0406 18H14.7313C14.9 17.7063 15 17.3656 15 17V16.75C15 14.8531 14.1531 13.15 12.8187 12.0063C12.8937 12.0031 12.9656 12 13.0406 12H14.9594C17.7437 12 20 14.2563 20 17.0406C20 17.5719 19.5687 18 19.0406 18ZM13.5 10C12.5313 10 11.6563 9.60627 11.0219 8.97187C11.6375 8.14063 12 7.1125 12 6C12 5.1625 11.7937 4.37187 11.4281 3.67813C12.0094 3.25313 12.725 3 13.5 3C15.4344 3 17 4.56563 17 6.5C17 8.43437 15.4344 10 13.5 10Z"
                    fill="#4F46E5"
                  />
                </g>
                <defs>
                  <clipPath id="so2">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="stat-card__label">Tỷ lệ hoàn thành</p>
            <p className="stat-card__value">98.2%</p>
          </div>

          <div className="stat-card stat-card--dark">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--white-overlay">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M20 3.125C20 3.82812 19.4414 4.47656 18.5 5C17.3633 5.62891 15.668 6.07422 13.7227 6.20703C13.5781 6.13672 13.4336 6.07031 13.2812 6.01172C11.7422 5.36719 9.69531 5 7.5 5C7.17578 5 6.85938 5.00781 6.54297 5.02344L6.5 5C5.55859 4.47656 5 3.82812 5 3.125C5 1.39844 8.35938 0 12.5 0C16.6406 0 20 1.39844 20 3.125ZM6.27734 6.29297C6.67578 6.26563 7.08594 6.25 7.5 6.25C9.92969 6.25 12.0859 6.73047 13.457 7.47656C14.4258 8.00391 15 8.66016 15 9.375C15 9.53125 14.9727 9.68359 14.918 9.83203C14.7383 10.3477 14.2539 10.8203 13.5508 11.2188C12.1328 12.0039 9.95312 12.4961 7.5 12.4961C5.17188 12.4961 3.08984 12.0547 1.71094 11.3594C0.558594 10.7266 0 10.0781 0 9.375C0 8.01563 2.08594 6.85547 5 6.42969C5.41016 6.37109 5.83594 6.32422 6.27734 6.29297ZM15 13.125C15 13.8281 14.4414 14.4766 13.5 15C11.9102 15.8086 9.82812 16.25 7.5 16.25C5.04688 16.25 2.86719 15.7578 1.5 15C0.558594 14.4766 0 13.8281 0 13.125V11.7422C0.488281 12.1445 1.07813 12.4727 1.71484 12.7383C3.25781 13.3828 5.30469 13.75 7.5 13.75C9.69531 13.75 11.7422 13.3828 13.2852 12.7383C13.9219 12.4727 14.5156 11.875 15 11.7422V13.125ZM7.5 17.5C9.69531 17.5 11.7422 17.1328 13.2852 16.4883C13.9219 16.2227 14.5156 15.8945 15 15.4922V16.875C15 18.6016 11.6406 20 7.5 20C3.35938 20 0 18.6016 0 16.875V15.4922C0.488281 15.8945 1.07813 16.2227 1.71484 16.4883C3.25781 17.1328 5.30469 17.5 7.5 17.5Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="stat-card__label stat-card__label--light">
              Tổng doanh thu
            </p>
            <p className="stat-card__value stat-card__value--light">245.8M</p>
          </div>
        </div>

        {/* Order list */}
        <div className="order-list-section">
          {/* Section header */}
          <div className="order-list-header">
            <h2 className="order-list-title">Danh sách đơn hàng</h2>
            <div className="order-list-filters">
              <button className="order-status-filter">
                <span>Trạng thái: Tất cả</span>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M5.47012 9.52949C5.76309 9.82246 6.23887 9.82246 6.53184 9.52949L11.0318 5.02949C11.3248 4.73652 11.3248 4.26074 11.0318 3.96777C10.7389 3.6748 10.2631 3.6748 9.97012 3.96777L5.9998 7.93809L2.02949 3.97012C1.73652 3.67715 1.26074 3.67715 0.967773 3.97012C0.674805 4.26309 0.674805 4.73887 0.967773 5.03184L5.46777 9.53184L5.47012 9.52949Z"
                    fill="#436E35"
                  />
                </svg>
              </button>
              <button className="order-filter-icon-btn" aria-label="Bộ lọc">
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
          <div className="order-table-head">
            <span className="order-col order-col--id">Mã đơn / Ngày</span>
            <span className="order-col order-col--buyer">Người mua</span>
            <span className="order-col order-col--product">Sản phẩm</span>
            <span className="order-col order-col--payment">Thanh toán</span>
            <span className="order-col order-col--shipping">Vận chuyển</span>
            <span className="order-col order-col--total">Tổng tiền</span>
          </div>

          {/* Order rows */}
          <div className="order-table-body">
            {filtered.map((order) => {
              const isExpanded = expandedId === order.id;
              const paymentCfg = PAYMENT_CONFIG[order.payment];
              const shippingCfg = SHIPPING_CONFIG[order.shipping];

              return (
                <div
                  key={order.id}
                  className={`order-row-wrap${isExpanded ? " order-row-wrap--expanded" : ""}`}
                >
                  <div
                    className="order-row"
                    onClick={() => order.steps && toggleExpand(order.id)}
                    style={{ cursor: order.steps ? "pointer" : "default" }}
                  >
                    {/* ID / Date */}
                    <div className="order-col order-col--id">
                      <div className="order-id-group">
                        <span className="order-id">#{order.id}</span>
                        <span className="order-date">{order.date}</span>
                      </div>
                    </div>

                    {/* Buyer */}
                    <div className="order-col order-col--buyer">
                      <div className="order-buyer">
                        <img
                          src={order.buyer.avatar}
                          alt={order.buyer.name}
                          className="order-buyer__avatar"
                        />
                        <div className="order-buyer__info">
                          <span className="order-buyer__name">
                            {order.buyer.name}
                          </span>
                          <span className="order-buyer__location">
                            {order.buyer.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product */}
                    <div className="order-col order-col--product">
                      <div className="order-product">
                        <div className="order-product__img-wrap">
                          <img
                            src={order.product.image}
                            alt={order.product.name}
                            className="order-product__img"
                          />
                        </div>
                        <div className="order-product__info">
                          <span className="order-product__name">
                            {order.product.name}
                          </span>
                          <span className="order-product__qty">
                            SL: x{order.product.qty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="order-col order-col--payment">
                      <span
                        className="order-payment-badge"
                        style={{ color: paymentCfg.color }}
                      >
                        {paymentCfg.label}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="order-col order-col--shipping">
                      <span
                        className="order-shipping-badge"
                        style={{
                          background: shippingCfg.bg,
                          color: shippingCfg.color,
                        }}
                      >
                        {shippingCfg.label}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="order-col order-col--total">
                      <div className="order-total-group">
                        <span className="order-total">{order.total}</span>
                        {order.shipping === "pending_confirm" && (
                          <button
                            className="order-confirm-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Xác nhận ngay
                          </button>
                        )}
                        {!order.steps &&
                          order.shipping !== "pending_confirm" && (
                            <div className="order-row-actions">
                              <button
                                className="action-btn"
                                aria-label="Chỉnh sửa"
                              >
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                >
                                  <g clipPath="url(#a1)">
                                    <path
                                      d="M12.7509 0.659179L11.0494 2.36074L15.6196 6.93105L17.3213 5.22949C18.2002 4.35059 18.2002 2.92676 17.3213 2.04785L15.936 0.659179C15.0571 -0.219726 13.6333 -0.219726 12.7544 0.659179H12.7509ZM10.2548 3.15527L2.05991 11.3537C1.69429 11.7193 1.4271 12.1728 1.27944 12.6686L0.0349125 16.8979C-0.052978 17.1967 0.0278814 17.5166 0.24585 17.7346C0.463819 17.9526 0.783741 18.0334 1.07905 17.9491L5.30835 16.7045C5.80405 16.5568 6.25757 16.2896 6.62319 15.9241L14.8252 7.72559L10.2548 3.15527Z"
                                      fill="#343434"
                                      fillOpacity="0.4"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="a1">
                                      <rect
                                        width="18"
                                        height="18"
                                        fill="white"
                                      />
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
                                    d="M8.85861 1.6875C6.37306 1.6875 4.38277 2.81953 2.9339 4.1669C1.49425 5.50195 0.531408 7.10156 0.0761353 8.19975C-0.0253784 8.44278 -0.0253784 8.71347 0.0761353 8.9565C0.531408 10.0547 1.49425 11.6543 2.9339 12.9894C4.38277 14.3367 6.37306 15.4688 8.85861 15.4688C11.3442 15.4688 13.3344 14.3367 14.7833 12.9894C16.223 11.6512 17.1858 10.0547 17.6442 8.9565C17.7456 8.71347 17.7456 8.44278 17.6442 8.19975C17.1858 7.10156 16.223 5.50195 14.7833 4.1669C13.3344 2.81953 11.3442 1.6875 8.85861 1.6875ZM4.42892 8.57812C4.42892 7.4033 4.89562 6.27659 5.72634 5.44587C6.55707 4.61513 7.68378 4.14844 8.85861 4.14844C10.0334 4.14844 11.1601 4.61513 11.9908 5.44587C12.8216 6.27659 13.2883 7.4033 13.2883 8.57812C13.2883 9.75295 12.8216 10.8797 11.9908 11.7104C11.1601 12.5411 10.0334 13.0078 8.85861 13.0078C7.68378 13.0078 6.55707 12.5411 5.72634 11.7104C4.89562 10.8797 4.42892 9.75295 4.42892 8.57812ZM8.85861 6.60938C8.85861 7.69526 7.97574 8.57812 6.88986 8.57812C6.67145 8.57812 6.46227 8.54121 6.2654 8.47662C6.09621 8.42124 5.89933 8.52584 5.90549 8.70425C5.91471 8.9165 5.94547 9.12876 6.00392 9.34101C6.42536 10.916 8.04649 11.8512 9.62149 11.4297C11.1965 11.0083 12.1317 9.38716 11.7102 7.81216C11.3688 6.53555 10.2398 5.67729 8.98473 5.625C8.80631 5.61885 8.70172 5.81265 8.75709 5.98491C8.82169 6.18179 8.85861 6.39097 8.85861 6.60938Z"
                                    fill="#343434"
                                    fillOpacity="0.4"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded timeline */}
                  {isExpanded && order.steps && (
                    <div className="order-expanded">
                      <OrderTimeline steps={order.steps} />
                      <div className="order-expanded__actions">
                        <button className="order-action-btn order-action-btn--secondary">
                          Cập nhật trạng thái
                        </button>
                        <button className="order-action-btn order-action-btn--outline">
                          In hóa đơn
                        </button>
                        <button className="order-action-btn order-action-btn--primary">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Load more */}
          <div className="product-load-more">
            <button className="load-more-btn">
              <span>Xem thêm 24 đơn hàng khác</span>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <g clipPath="url(#lm)">
                  <path
                    d="M7.19553 9.23853C7.64197 9.68496 8.36696 9.68496 8.81339 9.23853L15.6705 2.38139C16.1169 1.93496 16.1169 1.20996 15.6705 0.763533C15.2241 0.317104 14.4991 0.317104 14.0527 0.763533L8.00267 6.81353L1.95267 0.767103C1.50625 0.320675 0.78125 0.320675 0.334822 0.767103C-0.111607 1.21353 -0.111607 1.93853 0.334822 2.38496L7.19197 9.24211L7.19553 9.23853Z"
                    fill="#436E35"
                  />
                </g>
                <defs>
                  <clipPath id="lm">
                    <rect width="16" height="10" fill="white" />
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
