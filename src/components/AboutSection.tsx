import './AboutSection.css'

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <div className="about-text-block">
          <div className="about-heading-group">
            <h2 className="about-title">Lắng nghe rác nhựa</h2>
            <div className="about-divider" aria-hidden="true" />
          </div>
          <p className="about-description">
            "Lắng Nghe Rác Nhựa" là workshop sáng tạo dành cho những ai yêu thích sống xanh và nghệ thuật tái chế.
            Tại đây, các vật dụng nhựa đã qua sử dụng sẽ được "hồi sinh" thành những sản phẩm thủ công độc đáo,
            mang theo câu chuyện về sự bền vững, sáng tạo và trách nhiệm với môi trường.
          </p>
          <p className="about-schedule">
            <strong>Lịch workshop:</strong> Thứ bảy hằng ngày<br />
            <strong>Địa điểm:</strong> Số 21, Phố XXX, Phường Bình Dương, TP.HCM
          </p>
        </div>
        <button className="about-register-btn">Đăng ký ngay</button>
      </div>
      <div className="about-image-wrapper">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/126b8b342345bfd0064b22c7a85c76b19ef96918?width=1423"
          alt="Workshop Lắng nghe rác nhựa"
          className="about-img"
        />
      </div>
    </section>
  )
}
