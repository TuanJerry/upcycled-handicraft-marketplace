import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { WORKSHOPS } from '../data/workshops'
import './MyWorkshopPage.css'

type WorkshopTab = 'registered' | 'saved'
type StatusFilter = 'all' | 'completed' | 'ongoing' | 'upcoming'

const REGISTERED_WORKSHOPS = [
  {
    id: 'ws-5',
    status: 'completed' as const,
    statusLabel: 'Đã hoàn thành',
    date: '15/07/2024',
    venue: 'Online via Zoom',
    venueType: 'online' as const,
    instructor: 'Hoàng Long',
    instructorAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/adb9b1b1df6d60bd5294c9c2357354016040f538?width=40',
  },
  {
    id: 'ws-2',
    status: 'ongoing' as const,
    statusLabel: 'Đang diễn ra',
    date: 'Hôm nay, 14:00',
    venue: 'Phòng học trực tuyến',
    venueType: 'online' as const,
    instructor: 'Hương Thảo',
    instructorAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/ff28827bfecf0edd5aad5845f3161e2660ae9baa?width=40',
  },
  {
    id: 'ws-6',
    status: 'completed' as const,
    statusLabel: 'Đã hoàn thành',
    date: '01/07/2024',
    venue: 'Sân vườn Community',
    venueType: 'offline' as const,
    instructor: 'Nhóm Indigo',
    instructorAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4d6fa09124302292844f4b7641be9c55383313ca?width=40',
  },
]

const UPCOMING_SCHEDULE = [
  {
    id: 'ws-1',
    dateLabel: '24/08 • Thứ 7',
    title: 'Biến Chai Thủy Tinh thành Đèn Trang Trí',
    detail: '09:00 - 12:00 | Studio Xanh, Quận 1',
    status: 'next' as const,
  },
  {
    id: 'ws-2',
    dateLabel: '28/08 • Thứ 4',
    title: 'Nghệ thuật Macrame treo tường (Online)',
    detail: '19:30 - 21:00 | Zoom Meeting',
    status: 'upcoming' as const,
  },
  {
    id: 'ws-3',
    dateLabel: '01/09 • Chủ Nhật',
    title: 'Lớp Mộc Căn Bản: Chế tác khay gỗ',
    detail: '08:00 - 17:00 | Xưởng Mộc Craft',
    status: 'upcoming' as const,
  },
]

const NEXT_WORKSHOP = WORKSHOPS.find(w => w.id === 'ws-1')!
const COUNTDOWN = '02 ngày 14:05:22'

const STATUS_FILTER_OPTIONS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'Tất cả trạng thái' },
  { key: 'completed', label: 'Đã hoàn thành' },
  { key: 'ongoing', label: 'Đang diễn ra' },
  { key: 'upcoming', label: 'Sắp diễn ra' },
]

export default function MyWorkshopPage() {
  const [activeTab, setActiveTab] = useState<WorkshopTab>('registered')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filteredWorkshops = REGISTERED_WORKSHOPS.filter(
    w => statusFilter === 'all' || w.status === statusFilter
  )

  return (
    <div className="my-workshop-page">
      <Header activePage="workshop" />

      <main>
        {/* Hero */}
        <section className="my-workshop-hero">
          <img
            className="my-workshop-hero-bg"
            src="https://api.builder.io/api/v1/image/assets/TEMP/ab7dd040cc33ff72ecab56707f334ae85fc3d932?width=2880"
            alt=""
          />
          <div className="my-workshop-hero-overlay" />
          <div className="my-workshop-hero-content">
            <div className="my-workshop-hero-text">
              <h1 className="my-workshop-hero-title">Workshop của tôi</h1>
              <p className="my-workshop-hero-subtitle">Theo dõi hành trình sáng tạo và sống xanh của bạn</p>
            </div>
            <div className="my-workshop-hero-stats">
              <div className="my-workshop-stat-card">
                <span className="stat-number">12</span>
                <span className="stat-label">Đã đăng ký</span>
              </div>
              <div className="my-workshop-stat-card">
                <span className="stat-number">08</span>
                <span className="stat-label">Đã lưu</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab toggle */}
        <div className="my-workshop-tab-bar">
          <div className="my-workshop-tabs">
            <button
              className={`my-workshop-tab${activeTab === 'registered' ? ' my-workshop-tab--active' : ''}`}
              onClick={() => setActiveTab('registered')}
            >
              Workshop đã đăng ký
            </button>
            <button
              className={`my-workshop-tab${activeTab === 'saved' ? ' my-workshop-tab--active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              Workshop đã lưu
            </button>
          </div>
        </div>

        <div className="my-workshop-body">
          {activeTab === 'registered' ? (
            <>
              {/* Upcoming next workshop */}
              <section className="my-workshop-section">
                <div className="my-workshop-section-header">
                  <h2 className="my-workshop-section-title">Sắp diễn ra</h2>
                  <div className="countdown-badge">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14C5.14348 14 3.36301 13.2625 2.05025 11.9497C0.737498 10.637 0 8.85652 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14348 0 7 0ZM6.34375 3.28125V7C6.34375 7.21875 6.45312 7.42383 6.63633 7.54688L9.26133 9.29688C9.56211 9.49922 9.96953 9.41719 10.1719 9.11367C10.3742 8.81016 10.2922 8.40547 9.98867 8.20312L7.65625 6.65V3.28125C7.65625 2.91758 7.36367 2.625 7 2.625C6.63633 2.625 6.34375 2.91758 6.34375 3.28125Z" fill="#5D4037" />
                    </svg>
                    <span>Bắt đầu sau: {COUNTDOWN}</span>
                  </div>
                </div>

                <div className="upcoming-workshop-card">
                  <div className="upcoming-card-image-wrap">
                    <img
                      src={NEXT_WORKSHOP.image}
                      alt={NEXT_WORKSHOP.title}
                      className="upcoming-card-image"
                    />
                    <span className="workshop-mode-badge workshop-mode-badge--offline">
                      {NEXT_WORKSHOP.mode}
                    </span>
                  </div>

                  <div className="upcoming-card-details">
                    <div className="upcoming-card-top">
                      <div className="upcoming-card-heading-group">
                        <div className="upcoming-card-title-row">
                          <h3 className="upcoming-card-title">{NEXT_WORKSHOP.title}</h3>
                          <span className="upcoming-status-pill">Sắp diễn ra</span>
                        </div>
                        <div className="upcoming-card-meta-row">
                          <div className="instructor-info">
                            <img
                              src={NEXT_WORKSHOP.avatar}
                              alt={NEXT_WORKSHOP.instructor}
                              className="instructor-avatar"
                            />
                            <span className="instructor-name">
                              <span className="instructor-label">Seller: </span>
                              {NEXT_WORKSHOP.instructor}
                            </span>
                          </div>
                          <div className="eco-score-badge">
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.34038 1.36524C4.66566 1.36524 3.24876 2.46255 2.76722 3.97533C3.48313 3.61311 4.29066 3.41069 5.14719 3.41069H7.02219C7.20969 3.41069 7.3631 3.5641 7.3631 3.7516C7.3631 3.9391 7.20969 4.09251 7.02219 4.09251H6.68129H5.14719C4.7935 4.09251 4.45046 4.133 4.1202 4.20757C3.56836 4.33328 3.05487 4.557 2.5989 4.86169C1.36097 5.68626 0.544922 7.09465 0.544922 8.69478V9.03569C0.544922 9.31909 0.772905 9.54709 1.05629 9.54709C1.33967 9.54709 1.56765 9.31909 1.56765 9.03569V8.69478C1.56765 7.65715 2.0087 6.72391 2.71396 6.06978C3.13583 7.67845 4.59961 8.86524 6.34038 8.86524H6.36169C9.17631 8.85033 11.454 6.07618 11.454 2.65644C11.454 1.74876 11.2942 0.885837 11.0045 0.108138C10.949 -0.038879 10.7338 -0.0324869 10.6593 0.106007C10.2587 0.856007 9.46609 1.36524 8.55629 1.36524H6.34038Z" fill="#436E35" />
                            </svg>
                            <span>Eco Score: {NEXT_WORKSHOP.ecoScore}</span>
                          </div>
                        </div>
                      </div>

                      <div className="upcoming-card-info-grid">
                        <div className="info-row">
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 0C4.55313 0 5 0.446875 5 1V2H9V1C9 0.446875 9.44687 0 10 0C10.5531 0 11 0.446875 11 1V2H12.5C13.3281 2 14 2.67188 14 3.5V5H0V3.5C0 2.67188 0.671875 2 1.5 2H3V1C3 0.446875 3.44687 0 4 0ZM0 6H14V14.5C14 15.3281 13.3281 16 12.5 16H1.5C0.671875 16 0 15.3281 0 14.5V6ZM2 8.5V9.5C2 9.775 2.225 10 2.5 10H3.5C3.775 10 4 9.775 4 9.5V8.5C4 8.225 3.775 8 3.5 8H2.5C2.225 8 2 8.225 2 8.5ZM6 8.5V9.5C6 9.775 6.225 10 6.5 10H7.5C7.775 10 8 9.775 8 9.5V8.5C8 8.225 7.775 8 7.5 8H6.5C6.225 8 6 8.225 6 8.5ZM10.5 8C10.225 8 10 8.225 10 8.5V9.5C10 9.775 10.225 10 10.5 10H11.5C11.775 10 12 9.775 12 9.5V8.5C12 8.225 11.775 8 11.5 8H10.5ZM2 12.5V13.5C2 13.775 2.225 14 2.5 14H3.5C3.775 14 4 13.775 4 13.5V12.5C4 12.225 3.775 12 3.5 12H2.5C2.225 12 2 12.225 2 12.5ZM6.5 12C6.225 12 6 12.225 6 12.5V13.5C6 13.775 6.225 14 6.5 14H7.5C7.775 14 8 13.775 8 13.5V12.5C8 12.225 7.775 12 7.5 12H6.5ZM10 12.5V13.5C10 13.775 10.225 14 10.5 14H11.5C11.775 14 12 13.775 12 13.5V12.5C12 12.225 11.775 12 11.5 12H10.5C10.225 12 10 12.225 10 12.5Z" fill="#87A96B" />
                          </svg>
                          <span className="info-text">24/08/2024 (Thứ 7)</span>
                        </div>
                        <div className="info-row">
                          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.74062 15.6C8.34375 13.5938 12 8.73125 12 6C12 2.6875 9.3125 0 6 0C2.6875 0 0 2.6875 0 6C0 8.73125 3.65625 13.5938 5.25938 15.6C5.64375 16.0781 6.35625 16.0781 6.74062 15.6ZM6 4C6.53043 4 7.03914 4.21071 7.41421 4.58579C7.78929 4.96086 8 5.46957 8 6C8 6.53043 7.78929 7.03914 7.41421 7.41421C7.03914 7.78929 6.53043 8 6 8C5.46957 8 4.96086 7.78929 4.58579 7.41421C4.21071 7.03914 4 6.53043 4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4Z" fill="#87A96B" />
                          </svg>
                          <span className="info-text">Studio Xanh, Quận 1</span>
                        </div>
                        <div className="info-row">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0ZM7.25 3.75V8C7.25 8.25 7.375 8.48438 7.58437 8.625L10.5844 10.625C10.9281 10.8562 11.3938 10.7625 11.625 10.4156C11.8562 10.0687 11.7625 9.60625 11.4156 9.375L8.75 7.6V3.75C8.75 3.33437 8.41562 3 8 3C7.58437 3 7.25 3.33437 7.25 3.75Z" fill="#87A96B" />
                          </svg>
                          <span className="info-text">09:00 - 12:00</span>
                        </div>
                      </div>
                    </div>

                    <Link to={`/workshop/${NEXT_WORKSHOP.id}`} className="view-detail-btn">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </section>

              {/* Registered workshops list */}
              <section className="my-workshop-section">
                <div className="my-workshop-section-header my-workshop-section-header--with-filter">
                  <h2 className="my-workshop-section-title my-workshop-section-title--brown">
                    Danh sách đã đăng ký
                  </h2>
                  <div className="status-filter-wrap">
                    <select
                      className="status-filter-select"
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value as StatusFilter)}
                    >
                      {STATUS_FILTER_OPTIONS.map(opt => (
                        <option key={opt.key} value={opt.key}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {filteredWorkshops.length === 0 ? (
                  <p className="no-workshops-msg">Không có workshop nào phù hợp.</p>
                ) : (
                  <div className="registered-workshops-grid">
                    {filteredWorkshops.map(reg => {
                      const ws = WORKSHOPS.find(w => w.id === reg.id)
                      if (!ws) return null
                      return (
                        <div key={reg.id} className="registered-workshop-card">
                          <div className="registered-card-image-wrap">
                            <img
                              src={ws.image}
                              alt={ws.title}
                              className="registered-card-image"
                            />
                            <span
                              className={`registered-status-pill ${
                                reg.status === 'completed'
                                  ? 'registered-status-pill--completed'
                                  : reg.status === 'ongoing'
                                  ? 'registered-status-pill--ongoing'
                                  : 'registered-status-pill--upcoming'
                              }`}
                            >
                              {reg.statusLabel}
                            </span>
                          </div>
                          <div className="registered-card-body">
                            <h3 className="registered-card-title">{ws.title}</h3>
                            <div className="registered-card-instructor">
                              <img
                                src={reg.instructorAvatar}
                                alt={reg.instructor}
                                className="registered-instructor-avatar"
                              />
                              <span className="registered-instructor-name">{reg.instructor}</span>
                            </div>
                            <div className="registered-card-info">
                              {reg.venueType === 'online' ? (
                                <>
                                  <div className="info-row info-row--sm">
                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                                      <path d="M3.42857 0.142883C3.90268 0.142883 4.28571 0.525919 4.28571 1.00003V1.85717H7.71429V1.00003C7.71429 0.525919 8.09732 0.142883 8.57143 0.142883C9.04551 0.142883 9.42857 0.525919 9.42857 1.00003V1.85717H10.7143C11.4241 1.85717 12 2.43307 12 3.14288V4.4286H0V3.14288C0 2.43307 0.575893 1.85717 1.28571 1.85717H2.57143V1.00003C2.57143 0.525919 2.95446 0.142883 3.42857 0.142883ZM0 5.28574H12V12.5715C12 13.2813 11.4241 13.8572 10.7143 13.8572H1.28571C0.575893 13.8572 0 13.2813 0 12.5715V5.28574Z" fill="#9CA3AF" />
                                    </svg>
                                    <span className="info-text info-text--muted">{reg.date}</span>
                                  </div>
                                  <div className="info-row info-row--sm">
                                    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                                      <path d="M3 0.75C2.17266 0.75 1.5 1.42266 1.5 2.25V8.25H3V2.25H12V8.25H13.5V2.25C13.5 1.42266 12.8273 0.75 12 0.75H3ZM0.45 9C0.201563 9 0 9.20156 0 9.45C0 10.4438 0.80625 11.25 1.8 11.25H13.2C14.1938 11.25 15 10.4438 15 9.45C15 9.20156 14.7984 9 14.55 9H0.45Z" fill="#9CA3AF" />
                                    </svg>
                                    <span className="info-text info-text--muted">{reg.venue}</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="info-row info-row--sm">
                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                                      <path d="M3.42857 0.142883C3.90268 0.142883 4.28571 0.525919 4.28571 1.00003V1.85717H7.71429V1.00003C7.71429 0.525919 8.09732 0.142883 8.57143 0.142883C9.04551 0.142883 9.42857 0.525919 9.42857 1.00003V1.85717H10.7143C11.4241 1.85717 12 2.43307 12 3.14288V4.4286H0V3.14288C0 2.43307 0.575893 1.85717 1.28571 1.85717H2.57143V1.00003C2.57143 0.525919 2.95446 0.142883 3.42857 0.142883ZM0 5.28574H12V12.5715C12 13.2813 11.4241 13.8572 10.7143 13.8572H1.28571C0.575893 13.8572 0 13.2813 0 12.5715V5.28574Z" fill="#9CA3AF" />
                                    </svg>
                                    <span className="info-text info-text--muted">{reg.date}</span>
                                  </div>
                                  <div className="info-row info-row--sm">
                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                                      <path d="M6.64804 13.65C8.05078 11.8946 11.25 7.63984 11.25 5.25C11.25 2.35156 8.89844 0 6 0C3.10156 0 0.75 2.35156 0.75 5.25C0.75 7.63984 3.94922 11.8946 5.35196 13.65C5.68828 14.0683 6.31172 14.0683 6.64804 13.65ZM6 3.5C6.46413 3.5 6.90925 3.68437 7.23743 4.01257C7.56563 4.34075 7.75 4.78587 7.75 5.25C7.75 5.71413 7.56563 6.15925 7.23743 6.48743C6.90925 6.81563 6.46413 7 6 7C5.53587 7 5.09075 6.81563 4.76257 6.48743C4.43437 6.15925 4.25 5.71413 4.25 5.25C4.25 4.78587 4.43437 4.34075 4.76257 4.01257C5.09075 3.68437 5.53587 3.5 6 3.5Z" fill="#9CA3AF" />
                                    </svg>
                                    <span className="info-text info-text--muted">{reg.venue}</span>
                                  </div>
                                </>
                              )}
                            </div>
                            <Link to={`/workshop/${ws.id}`} className="view-detail-btn view-detail-btn--full">
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>

              {/* Upcoming schedule timeline */}
              <section className="my-workshop-section">
                <h2 className="my-workshop-section-title my-workshop-section-title--brown">
                  Lịch trình sắp tới
                </h2>
                <div className="schedule-card">
                  <div className="schedule-timeline">
                    {UPCOMING_SCHEDULE.map((item, i) => (
                      <div
                        key={item.id}
                        className={`schedule-item${item.status === 'upcoming' ? ' schedule-item--dim' : ''}`}
                      >
                        <div
                          className={`schedule-dot ${i === 0 ? 'schedule-dot--active' : 'schedule-dot--inactive'}`}
                        />
                        <div className="schedule-item-content">
                          <div className="schedule-item-info">
                            <span
                              className={`schedule-date-label ${item.status === 'upcoming' ? 'schedule-date-label--muted' : 'schedule-date-label--green'}`}
                            >
                              {item.dateLabel}
                            </span>
                            <h4 className="schedule-item-title">{item.title}</h4>
                            <p className="schedule-item-detail">{item.detail}</p>
                          </div>
                          {item.status === 'next' ? (
                            <Link to={`/workshop/${item.id}`} className="schedule-action-btn">
                              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 0.75C2.17266 0.75 1.5 1.42266 1.5 2.25V8.25H3V2.25H12V8.25H13.5V2.25C13.5 1.42266 12.8273 0.75 12 0.75H3ZM0.45 9C0.201563 9 0 9.20156 0 9.45C0 10.4438 0.80625 11.25 1.8 11.25H8.2C9.1938 11.25 10 10.4438 10 9.45C10 9.20156 9.7984 9 9.55 9H0.45Z" fill="white" />
                              </svg>
                              Xem chi tiết
                            </Link>
                          ) : (
                            <span className="schedule-upcoming-badge">Sắp tới</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <section className="my-workshop-section">
              <div className="saved-empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" stroke="#87A96B" strokeWidth="1.5" fill="none" />
                </svg>
                <h3 className="saved-empty-title">Chưa có workshop nào được lưu</h3>
                <p className="saved-empty-desc">Khám phá và lưu lại những workshop bạn yêu thích.</p>
                <Link to="/workshop" className="browse-workshops-btn">Khám phá Workshop</Link>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
