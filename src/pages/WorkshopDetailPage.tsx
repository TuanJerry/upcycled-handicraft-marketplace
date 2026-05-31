import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { WORKSHOPS } from '../data/workshops'
import './WorkshopDetailPage.css'

function CheckIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path d="M13.7066 3.2937C14.0973 3.68433 14.0973 4.3187 13.7066 4.70933L5.70664 12.7093C5.31602 13.1 4.68164 13.1 4.29102 12.7093L0.291016 8.70933C-0.0996094 8.3187 -0.0996094 7.68433 0.291016 7.2937C0.681641 6.90308 1.31602 6.90308 1.70664 7.2937L5.00039 10.5843L12.2941 3.2937C12.6848 2.90308 13.3191 2.90308 13.7098 3.2937H13.7066Z" fill="#87A96B" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path d="M13.7063 8.70615C14.0969 8.31553 14.0969 7.68115 13.7063 7.29053L8.70625 2.29053C8.31563 1.8999 7.68125 1.8999 7.29063 2.29053C6.9 2.68115 6.9 3.31553 7.29063 3.70615L10.5875 6.9999H1C0.446875 6.9999 0 7.44678 0 7.9999C0 8.55303 0.446875 8.9999 1 8.9999H10.5844L7.29375 12.2937C6.90312 12.6843 6.90312 13.3187 7.29375 13.7093C7.68437 14.0999 8.31875 14.0999 8.70938 13.7093L13.7094 8.70928L13.7063 8.70615Z" fill="#87A96B" />
    </svg>
  )
}

function TeaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.0625 0C1.75078 0 1.5 0.250781 1.5 0.5625C1.5 1.47422 2.04844 1.95469 2.41641 2.27578L2.44219 2.29922C2.82422 2.63203 3 2.81016 3 3.1875C3 3.49922 3.25078 3.75 3.5625 3.75C3.87422 3.75 4.125 3.49922 4.125 3.1875C4.125 2.27578 3.57656 1.79531 3.20859 1.47422L3.18281 1.45078C2.80078 1.11797 2.625 0.939844 2.625 0.5625C2.625 0.250781 2.37422 0 2.0625 0ZM0.75 4.5C0.335156 4.5 0 4.83516 0 5.25V9.75C0 10.9922 1.00781 12 2.25 12H6.75C7.99219 12 9 10.9922 9 9.75H9.375C10.8258 9.75 12 8.57578 12 7.125C12 5.67422 10.8258 4.5 9.375 4.5H8.25H0.75ZM9 6H9.375C9.99609 6 10.5 6.50391 10.5 7.125C10.5 7.74609 9.99609 8.25 9.375 8.25H9V6ZM5.25 0.5625C5.25 0.250781 4.99922 0 4.6875 0C4.37578 0 4.125 0.250781 4.125 0.5625C4.125 1.47422 4.67344 1.95469 5.04141 2.27578L5.06719 2.29922C5.44922 2.63203 5.625 2.81016 5.625 3.1875C5.625 3.49922 5.87578 3.75 6.1875 3.75C6.49922 3.75 6.75 3.49922 6.75 3.1875C6.75 2.27578 6.20156 1.79531 5.83359 1.47422L5.80781 1.45078C5.42578 1.11797 5.25 0.939844 5.25 0.5625Z" fill="white" />
    </svg>
  )
}

function ToolIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1.84188 0.117225C1.61922 -0.0562124 1.30281 -0.0351186 1.10125 0.1641L0.16375 1.1016C-0.0354686 1.30082 -0.0565624 1.61723 0.114531 1.84223L1.98953 4.27973C2.095 4.41801 2.26141 4.50004 2.43484 4.50004H3.70281L6.2575 7.05473C5.91297 7.73441 6.02313 8.58754 6.59266 9.15473L9.21766 11.7797C9.51062 12.0727 9.98641 12.0727 10.2794 11.7797L11.7794 10.2797C12.0723 9.98676 12.0723 9.51097 11.7794 9.21801L9.15438 6.59301C8.58719 6.02582 7.73406 5.91332 7.05438 6.25785L4.49969 3.70316V2.43754C4.49969 2.26176 4.41766 2.09769 4.27938 1.99223L1.84188 0.117225ZM0.466094 9.28363C0.168438 9.58129 -0.000312392 9.98676 -0.000312392 10.4086C-0.000312392 11.2875 0.712188 12 1.59109 12C2.01297 12 2.41844 11.8313 2.71609 11.5336L5.47703 8.77269C5.29422 8.28285 5.26609 7.75082 5.39266 7.24691L3.94656 5.80082L0.466094 9.28363ZM11.9997 3.37504C11.9997 3.12894 11.9739 2.88988 11.9247 2.66019C11.8684 2.39769 11.5473 2.32973 11.3575 2.51957L9.85984 4.01723C9.78953 4.08754 9.69344 4.12738 9.595 4.12738H8.24969C8.04344 4.12738 7.87469 3.95863 7.87469 3.75238V2.40473C7.87469 2.30629 7.91453 2.21019 7.98484 2.13988L9.4825 0.642225C9.67234 0.452381 9.60438 0.131288 9.34188 0.0750376C9.10984 0.0258189 8.87078 3.76048e-05 8.62469 3.76048e-05C6.76141 3.76048e-05 5.24969 1.51176 5.24969 3.37504V3.39379L7.24891 5.39301C8.09266 5.17973 9.02547 5.40473 9.68641 6.06566L10.0544 6.43363C11.2028 5.89457 11.9997 4.72738 11.9997 3.37504ZM1.31219 10.125C1.31219 9.97585 1.37145 9.83278 1.47694 9.72729C1.58243 9.6218 1.7255 9.56254 1.87469 9.56254C2.02387 9.56254 2.16695 9.6218 2.27244 9.72729C2.37792 9.83278 2.43719 9.97585 2.43719 10.125C2.43719 10.2742 2.37792 10.4173 2.27244 10.5228C2.16695 10.6283 2.02387 10.6875 1.87469 10.6875C1.7255 10.6875 1.58243 10.6283 1.47694 10.5228C1.37145 10.4173 1.31219 10.2742 1.31219 10.125Z" fill="#9CA3AF" />
    </svg>
  )
}

function BulbIcon() {
  return (
    <svg width="9" height="12" viewBox="0 0 9 12" fill="none">
      <path d="M6.375 9C6.6 8.25234 7.06641 7.61484 7.52813 6.97969C7.65 6.81328 7.77188 6.64687 7.88906 6.47812C8.35313 5.81016 8.625 5.00156 8.625 4.12734C8.625 1.84688 6.77812 0 4.5 0C2.22188 0 0.375 1.84688 0.375 4.125C0.375 4.99922 0.646875 5.81016 1.11094 6.47578C1.22813 6.64453 1.35 6.81094 1.47187 6.97734C1.93594 7.6125 2.40234 8.25234 2.625 8.99766H6.375V9ZM4.5 12C5.53594 12 6.375 11.1609 6.375 10.125V9.75H2.625V10.125C2.625 11.1609 3.46406 12 4.5 12ZM2.625 4.125C2.625 4.33125 2.45625 4.5 2.25 4.5C2.04375 4.5 1.875 4.33125 1.875 4.125C1.875 2.67422 3.04922 1.5 4.5 1.5C4.70625 1.5 4.875 1.66875 4.875 1.875C4.875 2.08125 4.70625 2.25 4.5 2.25C3.46406 2.25 2.625 3.08906 2.625 4.125Z" fill="#9CA3AF" />
    </svg>
  )
}

function EcoBottleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18.4402 0.440613C19.0262 -0.145325 19.9777 -0.145325 20.5637 0.440613L23.5637 3.44061C24.1496 4.02655 24.1496 4.97811 23.5637 5.56405C23.0105 6.11718 22.1246 6.14999 21.5387 5.65311L21.0934 6.09843L18.8059 8.38593C18.3746 8.81717 18.2668 9.45936 18.4027 10.0547C18.8434 11.9719 18.3137 14.0672 16.8184 15.5625L9.24805 23.1234C8.07617 24.2953 6.17773 24.2953 5.00586 23.1234L0.880859 18.9984C-0.291016 17.8265 -0.291016 15.9281 0.880859 14.7562L8.44648 7.18593C9.9418 5.69061 12.0371 5.16561 13.9543 5.60155C14.5449 5.73749 15.1918 5.62499 15.6184 5.19843L17.9059 2.91093L18.3512 2.46561C17.8543 1.87499 17.8824 0.993738 18.4402 0.440613ZM4.6543 16.2797L7.71992 19.3453C8.01055 19.6359 8.48867 19.6359 8.7793 19.3453L13.3449 14.7797C13.6355 14.489 13.6355 14.0109 13.3449 13.7203L10.2793 10.6547C9.98867 10.3641 9.51055 10.3641 9.21992 10.6547L4.6543 15.2203C4.36367 15.5109 4.36367 15.989 4.6543 16.2797Z" fill="#F5F5DC" />
    </svg>
  )
}

function EcoRecycleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8.18914 2.11406C9.00945 0.796875 10.4532 0 12.0001 0C13.5469 0 14.9907 0.796875 15.811 2.11406L17.6204 5.00625L18.886 4.275C19.2798 4.04531 19.7719 4.07812 20.1329 4.35469C20.4938 4.63125 20.6532 5.1 20.536 5.54062L19.4391 9.6375C19.2798 10.2375 18.661 10.5938 18.061 10.4344L13.9641 9.3375C13.5235 9.22031 13.2001 8.85 13.1391 8.4C13.0782 7.95 13.2985 7.50469 13.6923 7.27969L15.0235 6.51094L13.2657 3.70312C12.9938 3.26719 12.5157 3 12.0001 3C11.4844 3 11.0063 3.26719 10.7344 3.70312L9.91413 5.01562C9.48289 5.70937 8.57351 5.92969 7.87039 5.50781C7.1532 5.07656 6.92351 4.13906 7.36882 3.42656L8.18914 2.11406ZM20.1329 11.8078C20.836 11.3859 21.7454 11.6062 22.1766 12.3L23.3204 14.1328C23.761 14.8406 23.9954 15.6516 24.0048 16.4859C24.0188 18.975 22.0032 21.0047 19.5141 21.0047L15.0001 21V22.5C15.0001 22.9547 14.7282 23.3672 14.3063 23.5406C13.8844 23.7141 13.4016 23.6203 13.0782 23.2969L10.0782 20.2969C9.63757 19.8563 9.63757 19.1438 10.0782 18.7078L13.0782 15.7078C13.4016 15.3844 13.8844 15.2906 14.3063 15.4641C14.7282 15.6375 15.0001 16.05 15.0001 16.5047V18.0047H19.5094C20.3344 18.0047 21.0048 17.3297 21.0001 16.5047C21.0001 16.2281 20.9204 15.9562 20.7751 15.7219L19.6313 13.8891C19.186 13.1766 19.411 12.2391 20.1329 11.8078ZM3.04226 10.3547L1.68757 9.57187C1.29382 9.34219 1.07351 8.90156 1.13445 8.45156C1.19539 8.00156 1.51882 7.63125 1.95945 7.51406L6.05632 6.41719C6.65632 6.25781 7.27507 6.61406 7.43445 7.21406L8.53132 11.3062C8.64851 11.7469 8.48913 12.2109 8.1282 12.4922C7.76726 12.7734 7.27507 12.8016 6.88132 12.5719L5.63914 11.8547L3.22507 15.7172C3.07976 15.9516 3.00007 16.2234 3.00007 16.5C2.99539 17.325 3.6657 18 4.4907 18H6.00007C6.82976 18 7.50007 18.6703 7.50007 19.5C7.50007 20.3297 6.82976 21 6.00007 21H4.4907C2.00164 21 -0.0139894 18.975 7.31379e-05 16.4813C0.00476064 15.6469 0.239136 14.8359 0.684448 14.1281L3.04226 10.3547Z" fill="#F5F5DC" />
    </svg>
  )
}

export default function WorkshopDetailPage() {
  const { id } = useParams<{ id: string }>()
  const workshop = WORKSHOPS.find((w) => w.id === id)

  if (!workshop) {
    return (
      <div className="workshop-detail-page">
        <Header activePage="workshop" />
        <div className="workshop-detail-not-found">
          <h2>Workshop không tìm thấy</h2>
          <Link to="/workshop" className="workshop-detail-back-link">← Quay lại danh sách Workshop</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const spotsRemaining = workshop.maxParticipants - (workshop.maxParticipants - workshop.spotsLeft)

  return (
    <div className="workshop-detail-page">
      <Header activePage="workshop" />

      {/* Hero */}
      <section className="workshop-detail-hero">
        <div className="workshop-detail-hero-media">
          <img src={workshop.heroImage} alt={workshop.title} className="workshop-detail-hero-img" />
          <div className="workshop-detail-hero-overlay" />
        </div>
        <div className="workshop-detail-hero-body">
          <div className="workshop-detail-scroll-hint">
            <span className="workshop-detail-scroll-label">Scroll to explore</span>
            <div className="workshop-detail-scroll-line" />
          </div>
          <h1 className="workshop-detail-hero-title">{workshop.heroTitle}</h1>
          <p className="workshop-detail-hero-subtitle">{workshop.heroSubtitle}</p>
          <div className="workshop-detail-hero-actions">
            <button className="workshop-detail-btn-primary">
              Tham gia Workshop
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path d="M13.7063 8.70627C14.0969 8.31565 14.0969 7.68127 13.7063 7.29065L8.70625 2.29065C8.31563 1.90002 7.68125 1.90002 7.29063 2.29065C6.9 2.68127 6.9 3.31565 7.29063 3.70627L10.5875 7.00002H1C0.446875 7.00002 0 7.4469 0 8.00002C0 8.55315 0.446875 9.00002 1 9.00002H10.5844L7.29375 12.2938C6.90312 12.6844 6.90312 13.3188 7.29375 13.7094C7.68437 14.1 8.31875 14.1 8.70938 13.7094L13.7094 8.7094L13.7063 8.70627Z" fill="white" />
              </svg>
            </button>
            <button className="workshop-detail-btn-secondary">
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                <path d="M0 1.5C0 0.671875 0.671875 0 1.5 0V1.5V13.7937L5.56563 10.8906C5.825 10.7031 6.17812 10.7031 6.4375 10.8906L10.5 13.7937V1.5H1.5V0H10.5C11.3281 0 12 0.671875 12 1.5V15.25C12 15.5312 11.8438 15.7875 11.5938 15.9156C11.3438 16.0437 11.0437 16.0219 10.8156 15.8594L6 12.4219L1.18438 15.8594C0.95625 16.0219 0.65625 16.0437 0.40625 15.9156C0.15625 15.7875 0 15.5312 0 15.25V1.5Z" fill="white" />
              </svg>
              Lưu Workshop
            </button>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="workshop-detail-infobar">
        <div className="workshop-detail-infobar-inner">
          <div className="workshop-detail-info-item">
            <span className="workshop-detail-info-label">Thời gian</span>
            <span className="workshop-detail-info-value">09:00 - 12:00</span>
            <span className="workshop-detail-info-sub">{workshop.schedule}</span>
          </div>
          <div className="workshop-detail-info-divider" />
          <div className="workshop-detail-info-item">
            <span className="workshop-detail-info-label">Địa điểm</span>
            <span className="workshop-detail-info-value">{workshop.location}</span>
            <span className="workshop-detail-info-sub">{workshop.locationDetail}</span>
          </div>
          <div className="workshop-detail-info-divider" />
          <div className="workshop-detail-info-item">
            <span className="workshop-detail-info-label">Giới hạn</span>
            <span className="workshop-detail-info-value">{workshop.maxParticipants} người</span>
            <span className="workshop-detail-spots-badge">Còn {spotsRemaining} chỗ</span>
          </div>
          <div className="workshop-detail-info-divider" />
          <div className="workshop-detail-info-item">
            <span className="workshop-detail-info-label">Người hướng dẫn</span>
            <div className="workshop-detail-instructor-mini">
              <img src={workshop.avatar} alt={workshop.instructor} className="workshop-detail-instructor-avatar-mini" />
              <span className="workshop-detail-instructor-name-mini">{workshop.instructor}</span>
            </div>
          </div>
          <div className="workshop-detail-info-divider" />
          <div className="workshop-detail-info-item">
            <span className="workshop-detail-info-label">Chi phí</span>
            <span className="workshop-detail-info-price">{workshop.price}</span>
          </div>
          <button className="workshop-detail-register-btn">Đăng ký ngay</button>
        </div>
      </section>

      {/* Main Content */}
      <section className="workshop-detail-main">
        <div className="workshop-detail-main-inner">
          {/* Left column */}
          <div className="workshop-detail-content-col">
            {/* Story */}
            <div className="workshop-detail-story">
              <h2 className="workshop-detail-section-title">Câu chuyện tái sinh</h2>
              <p className="workshop-detail-story-lead">{workshop.story}</p>
              <p className="workshop-detail-story-body">{workshop.storyDetail}</p>
            </div>

            {/* What you'll learn */}
            <div className="workshop-detail-learnings">
              <h3 className="workshop-detail-learnings-title">Bạn sẽ học được gì?</h3>
              <ul className="workshop-detail-learnings-list">
                {workshop.learnings.map((item, i) => (
                  <li key={i} className="workshop-detail-learning-item">
                    <span className="workshop-detail-check-icon"><CheckIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div className="workshop-detail-timeline">
              <h2 className="workshop-detail-timeline-title">Hành trình trải nghiệm</h2>
              <div className="workshop-detail-timeline-items">
                <div className="workshop-detail-timeline-line" />
                {workshop.scheduleItems.map((item, i) => (
                  <div key={i} className="workshop-detail-timeline-item">
                    <div className={`workshop-detail-timeline-card${item.active ? ' workshop-detail-timeline-card--active' : ''}`}>
                      <div className="workshop-detail-timeline-card-header">
                        <h4 className="workshop-detail-timeline-item-title">{item.title}</h4>
                        <span className={`workshop-detail-timeline-time${item.active ? ' workshop-detail-timeline-time--active' : ''}`}>{item.time}</span>
                      </div>
                      <p className="workshop-detail-timeline-desc">{item.description}</p>
                    </div>
                    <div className={`workshop-detail-timeline-dot${item.active ? ' workshop-detail-timeline-dot--active' : ''}`}>
                      {item.icon === 'tea' && <TeaIcon />}
                      {item.icon === 'tool' && <ToolIcon />}
                      {item.icon === 'bulb' && <BulbIcon />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="workshop-detail-aside-col">
            {/* Eco impact card */}
            <div className="workshop-detail-eco-card">
              <div className="workshop-detail-eco-card-bg-icon" aria-hidden="true">
                <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                  <path d="M85 30C60.4375 30 39.6562 46.0938 32.5938 68.2813C43.0938 62.9688 54.9375 60 67.5 60H95C97.75 60 100 62.25 100 65C100 67.75 97.75 70 95 70H90H67.5C62.3125 70 57.2812 70.5938 52.4375 71.6875C44.3438 73.5313 36.8125 76.8125 30.125 81.2813C11.9688 93.375 0 114.031 0 137.5V142.5C0 146.656 3.34375 150 7.5 150C11.6562 150 15 146.656 15 142.5V137.5C15 122.281 21.4688 108.594 31.8125 99C38 122.594 59.4688 140 85 140H85.3125C126.594 139.781 160 99.0938 160 48.9375C160 35.625 157.656 22.9688 153.406 11.5625C152.594 9.40628 149.438 9.50003 148.344 11.5313C142.469 22.5313 130.844 30 117.5 30H85Z" fill="white" />
                </svg>
              </div>
              <div className="workshop-detail-eco-badge-pill">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1.35234 4.52344L1.57266 4.90781C1.76719 5.24766 2.08594 5.49844 2.46328 5.60625L3.82031 5.99297C4.22344 6.10781 4.5 6.47578 4.5 6.89531V7.83047C4.5 8.08828 4.64531 8.32266 4.875 8.4375C5.10469 8.55234 5.25 8.78672 5.25 9.04453V9.95859C5.25 10.3242 5.59922 10.5891 5.95078 10.4883C6.32812 10.3805 6.62109 10.0781 6.71719 9.69609L6.78281 9.43359C6.88125 9.0375 7.13906 8.69766 7.49297 8.49609L7.68281 8.38828C8.03437 8.18906 8.25 7.81406 8.25 7.41094V7.21641C8.25 6.91875 8.13047 6.63281 7.91953 6.42188L7.82812 6.33047C7.61719 6.11953 7.33125 6 7.03359 6H6.02344C5.76328 6 5.50547 5.93203 5.27812 5.80313L4.46953 5.34141C4.36875 5.28281 4.29141 5.18906 4.25391 5.07891C4.17891 4.85391 4.27969 4.61016 4.49297 4.50469L4.63125 4.43437C4.78594 4.35703 4.96641 4.34297 5.13047 4.39922L5.67422 4.57969C5.86641 4.64297 6.07734 4.57031 6.1875 4.40391C6.29766 4.23984 6.28594 4.02188 6.15937 3.86953L5.84062 3.4875C5.60625 3.20625 5.60859 2.79609 5.84766 2.51953L6.21563 2.09062C6.42188 1.84922 6.45469 1.50469 6.29766 1.23047L6.24141 1.13203C6.15937 1.12734 6.07969 1.125 5.99766 1.125C3.82266 1.125 1.97813 2.55234 1.35234 4.52344ZM10.875 6C10.875 5.1375 10.65 4.32656 10.2563 3.62109L9.65625 3.8625C9.28828 4.01016 9.09844 4.42031 9.22266 4.79531L9.61875 5.98359C9.70078 6.22734 9.9 6.4125 10.1484 6.47344L10.8305 6.64453C10.8586 6.43359 10.8727 6.21797 10.8727 6H10.875ZM0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6Z" fill="white" />
                </svg>
                <span>Tác động xanh</span>
              </div>
              <h3 className="workshop-detail-eco-heading">Mỗi buổi workshop đóng góp:</h3>
              <div className="workshop-detail-eco-stats">
                <div className="workshop-detail-eco-stat">
                  <div className="workshop-detail-eco-icon-wrap">
                    <EcoBottleIcon />
                  </div>
                  <div className="workshop-detail-eco-stat-text">
                    <span className="workshop-detail-eco-number">{workshop.ecoBottles}</span>
                    <span className="workshop-detail-eco-desc">chai thủy tinh được tái chế</span>
                  </div>
                </div>
                <div className="workshop-detail-eco-stat">
                  <div className="workshop-detail-eco-icon-wrap">
                    <EcoRecycleIcon />
                  </div>
                  <div className="workshop-detail-eco-stat-text">
                    <span className="workshop-detail-eco-number">{workshop.ecoWaste}</span>
                    <span className="workshop-detail-eco-desc">rác thải rắn được giảm thiểu</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor card */}
            <div className="workshop-detail-instructor-card">
              <span className="workshop-detail-instructor-label">Người hướng dẫn</span>
              <div className="workshop-detail-instructor-profile">
                <img
                  src={workshop.avatar}
                  alt={workshop.instructor}
                  className="workshop-detail-instructor-avatar"
                />
                <div className="workshop-detail-instructor-info">
                  <h4 className="workshop-detail-instructor-name">{workshop.instructor}</h4>
                  <p className="workshop-detail-instructor-title">{workshop.instructorTitle}</p>
                  <p className="workshop-detail-instructor-bio">{workshop.instructorBio}</p>
                  <div className="workshop-detail-instructor-socials">
                    <a href="#" className="workshop-detail-social-btn" aria-label="Instagram">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path d="M7.00352 4.40623C5.01602 4.40623 3.41289 6.00935 3.41289 7.99685C3.41289 9.98435 5.01602 11.5875 7.00352 11.5875C8.99102 11.5875 10.5941 9.98435 10.5941 7.99685C10.5941 6.00935 8.99102 4.40623 7.00352 4.40623ZM7.00352 10.3312C5.71914 10.3312 4.66914 9.28435 4.66914 7.99685C4.66914 6.70935 5.71602 5.66248 7.00352 5.66248C8.29102 5.66248 9.33789 6.70935 9.33789 7.99685C9.33789 9.28435 8.28789 10.3312 7.00352 10.3312ZM11.5785 4.25935C11.5785 4.72498 11.2035 5.09685 10.741 5.09685C10.2754 5.09685 9.90352 4.72185 9.90352 4.25935C9.90352 3.79685 10.2785 3.42185 10.741 3.42185C11.2035 3.42185 11.5785 3.79685 11.5785 4.25935ZM13.9566 5.10935C13.9035 3.98748 13.6473 2.99373 12.8254 2.17498C12.0066 1.35623 11.0129 1.09998 9.89102 1.04373C8.73477 0.978101 5.26914 0.978101 4.11289 1.04373C2.99414 1.09685 2.00039 1.3531 1.17852 2.17185C0.356641 2.9906 0.103516 3.98435 0.0472656 5.10623C-0.0183594 6.26248 -0.0183594 9.7281 0.0472656 10.8843C0.100391 12.0062 0.356641 13 1.17852 13.8187C2.00039 14.6375 2.99102 14.8937 4.11289 14.95C5.26914 15.0156 8.73477 15.0156 9.89102 14.95C11.0129 14.8968 12.0066 14.6406 12.8254 13.8187C13.6441 13 13.9004 12.0062 13.9566 10.8843C14.0223 9.7281 14.0223 6.2656 13.9566 5.10935ZM12.4629 12.125C12.2191 12.7375 11.7473 13.2094 11.1316 13.4562C10.2098 13.8219 8.02227 13.7375 7.00352 13.7375C5.98477 13.7375 3.79414 13.8187 2.87539 13.4562C2.26289 13.2125 1.79102 12.7406 1.54414 12.125C1.17852 11.2031 1.26289 9.0156 1.26289 7.99685C1.26289 6.9781 1.18164 4.78748 1.54414 3.86873C1.78789 3.25623 2.25977 2.78435 2.87539 2.53748C3.79727 2.17185 5.98477 2.25623 7.00352 2.25623C8.02227 2.25623 10.2129 2.17498 11.1316 2.53748C11.7441 2.78123 12.216 3.2531 12.4629 3.86873C12.8285 4.7906 12.7441 6.9781 12.7441 7.99685C12.7441 9.0156 12.8285 11.2062 12.4629 12.125Z" fill="#9CA3AF" />
                      </svg>
                    </a>
                    <a href="#" className="workshop-detail-social-btn" aria-label="Facebook">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M15.75 8C15.75 3.71875 12.2812 0.25 8 0.25C3.71875 0.25 0.25 3.71875 0.25 8C0.25 11.8681 3.08406 15.0744 6.78906 15.6562V10.2403H4.82031V8H6.78906V6.2925C6.78906 4.35031 7.94531 3.2775 9.71625 3.2775C10.5644 3.2775 11.4513 3.42875 11.4513 3.42875V5.335H10.4738C9.51125 5.335 9.21094 5.9325 9.21094 6.54531V8H11.3603L11.0166 10.2403H9.21094V15.6562C12.9159 15.0744 15.75 11.8681 15.75 8Z" fill="#9CA3AF" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="workshop-detail-gallery">
        <div className="workshop-detail-gallery-inner">
          <div className="workshop-detail-gallery-header">
            <div>
              <h2 className="workshop-detail-gallery-title">Khoảnh khắc Workshop</h2>
              <p className="workshop-detail-gallery-subtitle">Những tác phẩm độc bản từ các học viên trước.</p>
            </div>
            <a href="#" className="workshop-detail-gallery-view-all">
              Xem tất cả <ArrowIcon />
            </a>
          </div>
          <div className="workshop-detail-gallery-grid">
            <div className="workshop-detail-gallery-main">
              <img src={workshop.galleryImages[0]} alt="Workshop gallery" className="workshop-detail-gallery-img" />
            </div>
            <div className="workshop-detail-gallery-side">
              <img src={workshop.galleryImages[1]} alt="Workshop gallery" className="workshop-detail-gallery-img" />
              <img src={workshop.galleryImages[2]} alt="Workshop gallery" className="workshop-detail-gallery-img" />
            </div>
            <div className="workshop-detail-gallery-side">
              <img src={workshop.galleryImages[3]} alt="Workshop gallery" className="workshop-detail-gallery-img" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
