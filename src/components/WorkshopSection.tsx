import './WorkshopSection.css'

const workshops = [
  {
    title: 'Làm nến thơm từ vỏ dừa',
    backgroundImage: 'https://api.builder.io/api/v1/image/assets/TEMP/e2769a2c125edd11ddd0603a70e18294ad65ca2b?width=1423',
    overlay: true,
  },
  {
    title: 'Tái chế vải cũ thành túi',
    backgroundImage: 'https://api.builder.io/api/v1/image/assets/TEMP/29f4bfa88080a485cfa51613a8e6b25e7446f5c8?width=1423',
    overlay: false,
  },
]

export default function WorkshopSection() {
  return (
    <section className="workshop-section" id="workshop">
      <div className="workshop-header">
        <h2 className="workshop-title">Workshop Sáng Tạo</h2>
        <div className="workshop-divider" aria-hidden="true" />
      </div>
      <div className="workshop-cards">
        {workshops.map((ws) => (
          <div
            key={ws.title}
            className={`workshop-card${ws.overlay ? ' workshop-card--overlay' : ''}`}
            style={{ backgroundImage: `url('${ws.backgroundImage}')` }}
          >
            <h3 className="workshop-card-title">{ws.title}</h3>
            <button className="workshop-register-btn">Đăng ký ngay</button>
          </div>
        ))}
      </div>
    </section>
  )
}
