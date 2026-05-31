export interface WorkshopScheduleItem {
  title: string
  time: string
  description: string
  icon: 'tea' | 'tool' | 'bulb'
  active: boolean
}

export interface WorkshopDetail {
  id: string
  image: string
  heroImage: string
  mode: string
  avatar: string
  instructor: string
  instructorTitle: string
  instructorBio: string
  title: string
  heroTitle: string
  heroSubtitle: string
  description: string
  duration: string
  schedule: string
  price: string
  ecoScore: string | null
  location: string
  locationDetail: string
  maxParticipants: number
  spotsLeft: number
  story: string
  storyDetail: string
  learnings: string[]
  scheduleItems: WorkshopScheduleItem[]
  ecoBottles: string
  ecoWaste: string
  galleryImages: string[]
}

export const WORKSHOPS: WorkshopDetail[] = [
  {
    id: 'ws-1',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/7042a5ff74d21af8b611808ea62735ef41c7777a?width=757',
    heroImage: 'https://api.builder.io/api/v1/image/assets/TEMP/cab48fac14ba8eb3017b261420f636d1d52ac1ed?width=2880',
    mode: 'Offline',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/9b947f5d25ae523f5a7d94a2d9c89fac3eef6992?width=48',
    instructor: 'Lê Minh Tâm',
    instructorTitle: 'Nghệ nhân Tái chế / Founder Studio Xanh',
    instructorBio: 'Với 10 năm kinh nghiệm trong lĩnh vực upcycling, Tâm tin rằng mọi đồ vật đều có vòng đời thứ hai nếu ta nhìn chúng qua lăng kính nghệ thuật.',
    title: 'Biến Chai Thủy Tinh thành Đèn Trang Trí',
    heroTitle: 'Nghệ thuật Tái chế: Biến Chai Thủy Tinh thành Đèn Trang Trí',
    heroSubtitle: 'Khám phá sự sáng tạo và góp phần bảo vệ môi trường qua từng sản phẩm thủ công.',
    description: 'Học kỹ thuật cắt kính và trang trí đèn từ những chai rượu vang cũ đã qua sử dụng.',
    duration: '3 giờ',
    schedule: 'Chủ Nhật hàng tuần',
    price: '350.000đ',
    ecoScore: '9.8',
    location: 'Studio Xanh',
    locationDetail: 'Quận 1, TP.HCM',
    maxParticipants: 15,
    spotsLeft: 5,
    story: 'Mỗi chai thủy tinh bị vứt đi mất hàng triệu năm để phân hủy. Tại workshop này, chúng ta không chỉ học một kỹ năng thủ công, mà còn đang viết tiếp câu chuyện cho những vật dụng tưởng chừng vô giá trị.',
    storyDetail: 'Trong suốt 3 giờ đồng hồ, bạn sẽ được hướng dẫn chi tiết cách hô biến những vỏ chai rượu, chai nước ngọt cũ thành những chiếc đèn trang trí mang đậm dấu ấn cá nhân. Không gian Studio Xanh ngập tràn ánh sáng tự nhiên và tiếng nhạc acoustic nhẹ nhàng sẽ là chất xúc tác tuyệt vời cho sự sáng tạo của bạn.',
    learnings: [
      'Kỹ thuật cắt kính an toàn và mài nhẵn góc cạnh.',
      'Kiến thức cơ bản về đấu nối mạch điện cho đèn LED an toàn.',
      'Nghệ thuật trang trí bề mặt kính bằng màu acrylic và dây thừng macrame.',
    ],
    scheduleItems: [
      {
        title: 'Giới thiệu & Trà chiều',
        time: '09:00',
        description: 'Làm quen với các thành viên và thưởng thức trà thảo mộc organic.',
        icon: 'tea',
        active: true,
      },
      {
        title: 'Hướng dẫn kỹ thuật',
        time: '09:30',
        description: 'Làm quen với dụng cụ cắt kính và các nguyên tắc an toàn cơ bản.',
        icon: 'tool',
        active: false,
      },
      {
        title: 'Thực hành sáng tạo',
        time: '10:00',
        description: 'Tự tay thực hiện các công đoạn cắt, mài và lắp ráp hệ thống đèn.',
        icon: 'bulb',
        active: false,
      },
    ],
    ecoBottles: '50+',
    ecoWaste: '2kg',
    galleryImages: [
      'https://api.builder.io/api/v1/image/assets/TEMP/e402c9e2937ef5c4b5960c246feef994421130fa?width=1324',
      'https://api.builder.io/api/v1/image/assets/TEMP/645357c09d4a1ec8d84f6c03643fa5a84f22c7b5?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/9f899ba81dd9c3a50e63035dd791bdd39b127b00?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/e2fe1d0d13c25b1f365437a26034ca9e46b6dabc?width=1324',
    ],
  },
  {
    id: 'ws-2',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/3801dbb1bac848e92223b6a83e7cd09ebdd796fa?width=757',
    heroImage: 'https://api.builder.io/api/v1/image/assets/TEMP/3801dbb1bac848e92223b6a83e7cd09ebdd796fa?width=2880',
    mode: 'Online',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/d16e5c6a8e54594b687198756b78a606ddc53686?width=48',
    instructor: 'Hương Thảo',
    instructorTitle: 'Nghệ nhân Macrame / Founder Craft Room',
    instructorBio: 'Với niềm đam mê với các sợi tự nhiên, Hương Thảo đã tạo ra hàng trăm tác phẩm macrame độc đáo và chia sẻ kỹ năng cho cộng đồng.',
    title: 'Nghệ thuật Macrame từ dây sợi tự nhiên',
    heroTitle: 'Nghệ thuật Macrame: Sáng tạo từ Dây Sợi Tự Nhiên',
    heroSubtitle: 'Khám phá vẻ đẹp thủ công và tạo nên những tác phẩm decor độc đáo từ sợi cotton.',
    description: 'Sáng tạo các món đồ decor treo tường tinh tế chỉ bằng những nút thắt sợi cotton.',
    duration: '2 giờ',
    schedule: 'Thứ 7 linh hoạt',
    price: '250.000đ',
    ecoScore: null,
    location: 'Online (Zoom)',
    locationDetail: 'Link gửi qua email',
    maxParticipants: 20,
    spotsLeft: 8,
    story: 'Macrame là nghệ thuật thắt nút sợi đã có từ hàng thế kỷ trước. Tại workshop này, bạn sẽ học cách tạo ra những tác phẩm decor treo tường đẹp mắt từ sợi cotton tự nhiên.',
    storyDetail: 'Trong 2 giờ, bạn sẽ được hướng dẫn từng bước kỹ thuật thắt nút cơ bản đến nâng cao. Buổi học online linh hoạt giúp bạn thoải mái sáng tạo tại nhà.',
    learnings: [
      'Các kỹ thuật thắt nút macrame cơ bản.',
      'Cách tạo pattern và thiết kế tác phẩm của riêng bạn.',
      'Hoàn thiện và trưng bày tác phẩm đúng cách.',
    ],
    scheduleItems: [
      {
        title: 'Giới thiệu & Chuẩn bị',
        time: '09:00',
        description: 'Làm quen và chuẩn bị nguyên liệu dây sợi.',
        icon: 'tea',
        active: true,
      },
      {
        title: 'Kỹ thuật nút thắt',
        time: '09:30',
        description: 'Học các kỹ thuật thắt nút cơ bản và nâng cao.',
        icon: 'tool',
        active: false,
      },
      {
        title: 'Thực hành tạo tác phẩm',
        time: '10:00',
        description: 'Tự tay tạo ra tác phẩm macrame của riêng mình.',
        icon: 'bulb',
        active: false,
      },
    ],
    ecoBottles: '20+',
    ecoWaste: '0.5kg',
    galleryImages: [
      'https://api.builder.io/api/v1/image/assets/TEMP/e402c9e2937ef5c4b5960c246feef994421130fa?width=1324',
      'https://api.builder.io/api/v1/image/assets/TEMP/645357c09d4a1ec8d84f6c03643fa5a84f22c7b5?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/9f899ba81dd9c3a50e63035dd791bdd39b127b00?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/e2fe1d0d13c25b1f365437a26034ca9e46b6dabc?width=1324',
    ],
  },
  {
    id: 'ws-3',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/0eddb35438b9c34748f5bc0d05f2b08faca484bb?width=757',
    heroImage: 'https://api.builder.io/api/v1/image/assets/TEMP/0eddb35438b9c34748f5bc0d05f2b08faca484bb?width=2880',
    mode: 'Offline',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/9b947f5d25ae523f5a7d94a2d9c89fac3eef6992?width=48',
    instructor: 'Bùi Xuân',
    instructorTitle: 'Nghệ nhân Gốm / Founder Đất Sét Studio',
    instructorBio: 'Bùi Xuân có hơn 15 năm kinh nghiệm trong nghề gốm truyền thống và hiện đại.',
    title: 'Sản xuất gốm thô từ đất sét tái chế',
    heroTitle: 'Gốm Thủ Công: Từ Đất Sét Tái Chế đến Tác Phẩm',
    heroSubtitle: 'Trải nghiệm quy trình nhào nặn và nung gốm thủ công theo phương pháp truyền thống.',
    description: 'Trải nghiệm quy trình nhào nặn và nung gốm thủ công bằng phương pháp truyền thống.',
    duration: '4 giờ',
    schedule: 'Mỗi chiều Thứ 6',
    price: '520.000đ',
    ecoScore: null,
    location: 'Đất Sét Studio',
    locationDetail: 'Quận 3, TP.HCM',
    maxParticipants: 10,
    spotsLeft: 3,
    story: 'Gốm là một trong những nghề thủ công lâu đời nhất của nhân loại. Workshop này giúp bạn kết nối với truyền thống và tạo ra tác phẩm từ đất sét tái chế.',
    storyDetail: 'Trong 4 giờ, bạn sẽ được trải nghiệm toàn bộ quy trình từ nhào đất, tạo hình trên bàn xoay đến hoàn thiện sản phẩm.',
    learnings: [
      'Kỹ thuật nhào đất và chuẩn bị nguyên liệu.',
      'Tạo hình trên bàn xoay gốm.',
      'Trang trí và hoàn thiện sản phẩm gốm.',
    ],
    scheduleItems: [
      {
        title: 'Giới thiệu & Chuẩn bị đất',
        time: '14:00',
        description: 'Giới thiệu về gốm và kỹ thuật chuẩn bị đất sét.',
        icon: 'tea',
        active: true,
      },
      {
        title: 'Thực hành tạo hình',
        time: '14:30',
        description: 'Tạo hình sản phẩm trên bàn xoay gốm.',
        icon: 'tool',
        active: false,
      },
      {
        title: 'Hoàn thiện & Trang trí',
        time: '16:00',
        description: 'Hoàn thiện và trang trí sản phẩm gốm của bạn.',
        icon: 'bulb',
        active: false,
      },
    ],
    ecoBottles: '30+',
    ecoWaste: '1.5kg',
    galleryImages: [
      'https://api.builder.io/api/v1/image/assets/TEMP/e402c9e2937ef5c4b5960c246feef994421130fa?width=1324',
      'https://api.builder.io/api/v1/image/assets/TEMP/645357c09d4a1ec8d84f6c03643fa5a84f22c7b5?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/9f899ba81dd9c3a50e63035dd791bdd39b127b00?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/e2fe1d0d13c25b1f365437a26034ca9e46b6dabc?width=1324',
    ],
  },
  {
    id: 'ws-4',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8fc60acc965cb0edea18fa127860a99fb1f1d18f?width=757',
    heroImage: 'https://api.builder.io/api/v1/image/assets/TEMP/8fc60acc965cb0edea18fa127860a99fb1f1d18f?width=2880',
    mode: 'Offline',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/36c1443511dcf84b0012bed1633b029039cbf3de?width=48',
    instructor: 'Linh Lan',
    instructorTitle: 'Nghệ nhân Trang sức / Designer',
    instructorBio: 'Linh Lan chuyên tạo ra những bộ trang sức độc đáo từ nguyên liệu tái chế và thiên nhiên.',
    title: 'Chế tác trang sức từ vỏ sò & hạt nhựa',
    heroTitle: 'Trang Sức Tái Chế: Vỏ Sò & Hạt Nhựa',
    heroSubtitle: 'Tạo nên những bộ phụ kiện độc đáo từ những nguyên liệu biển cả tái sinh.',
    description: 'Tạo nên những bộ phụ kiện độc đáo từ những nguyên liệu biển cả tái sinh.',
    duration: '2.5 giờ',
    schedule: 'Theo yêu cầu',
    price: '290.000đ',
    ecoScore: null,
    location: 'Craft Workshop',
    locationDetail: 'Quận 7, TP.HCM',
    maxParticipants: 12,
    spotsLeft: 7,
    story: 'Biển cả cung cấp vô số nguyên liệu tự nhiên đẹp mắt. Workshop này giúp bạn biến những vỏ sò và hạt nhựa thành những bộ trang sức độc đáo.',
    storyDetail: 'Trong 2.5 giờ, bạn sẽ học cách lựa chọn, chế tác và kết hợp các nguyên liệu tự nhiên để tạo ra những phụ kiện mang phong cách riêng.',
    learnings: [
      'Kỹ thuật chế tác và xử lý vỏ sò.',
      'Cách kết hợp màu sắc và vật liệu.',
      'Tạo ra bộ trang sức hoàn chỉnh.',
    ],
    scheduleItems: [
      {
        title: 'Giới thiệu nguyên liệu',
        time: '09:00',
        description: 'Tìm hiểu về các loại vỏ sò và hạt nhựa tái chế.',
        icon: 'tea',
        active: true,
      },
      {
        title: 'Kỹ thuật chế tác',
        time: '09:30',
        description: 'Học cách khoan, mài và kết nối các chi tiết.',
        icon: 'tool',
        active: false,
      },
      {
        title: 'Hoàn thiện trang sức',
        time: '10:30',
        description: 'Tạo ra bộ trang sức hoàn chỉnh của riêng bạn.',
        icon: 'bulb',
        active: false,
      },
    ],
    ecoBottles: '15+',
    ecoWaste: '0.3kg',
    galleryImages: [
      'https://api.builder.io/api/v1/image/assets/TEMP/e402c9e2937ef5c4b5960c246feef994421130fa?width=1324',
      'https://api.builder.io/api/v1/image/assets/TEMP/645357c09d4a1ec8d84f6c03643fa5a84f22c7b5?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/9f899ba81dd9c3a50e63035dd791bdd39b127b00?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/e2fe1d0d13c25b1f365437a26034ca9e46b6dabc?width=1324',
    ],
  },
  {
    id: 'ws-5',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/537bceca6ec7674b39b04f3bd69b7c65d3175a33?width=757',
    heroImage: 'https://api.builder.io/api/v1/image/assets/TEMP/537bceca6ec7674b39b04f3bd69b7c65d3175a33?width=2880',
    mode: 'Online',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/adb9b1b1df6d60bd5294c9c2357354016040f538?width=48',
    instructor: 'Hoàng Long',
    instructorTitle: 'Nghệ nhân Giấy thủ công / Educator',
    instructorBio: 'Hoàng Long nghiên cứu và thực hành nghề làm giấy truyền thống từ nhiều năm qua.',
    title: 'Tự làm giấy thủ công từ xơ thực vật',
    heroTitle: 'Giấy Thủ Công: Từ Xơ Thực Vật Tái Sinh',
    heroSubtitle: 'Tìm hiểu nghệ thuật làm giấy truyền thống từ vỏ chuối và bã mía.',
    description: 'Tìm hiểu nghệ thuật làm giấy truyền thống từ vỏ chuối và bã mía.',
    duration: '3 giờ',
    schedule: 'Tối Thứ 4 linh hoạt',
    price: 'Miễn phí',
    ecoScore: null,
    location: 'Online (Zoom)',
    locationDetail: 'Link gửi qua email',
    maxParticipants: 30,
    spotsLeft: 15,
    story: 'Giấy thủ công từ xơ thực vật là một nghề truyền thống có từ hàng trăm năm. Workshop này mở ra cho bạn cơ hội khám phá và thực hành nghề thủ công đặc biệt này.',
    storyDetail: 'Trong 3 giờ online, bạn sẽ học cách xử lý vỏ chuối và bã mía thành bột giấy, sau đó tạo ra những tờ giấy thủ công đẹp mắt và độc đáo.',
    learnings: [
      'Quy trình xử lý nguyên liệu thực vật thành bột giấy.',
      'Kỹ thuật đổ khuôn và tạo hình tờ giấy.',
      'Phơi và hoàn thiện giấy thủ công.',
    ],
    scheduleItems: [
      {
        title: 'Giới thiệu & Chuẩn bị',
        time: '19:00',
        description: 'Tìm hiểu về lịch sử và nguyên liệu làm giấy thủ công.',
        icon: 'tea',
        active: true,
      },
      {
        title: 'Xử lý nguyên liệu',
        time: '19:30',
        description: 'Học cách xử lý vỏ chuối và bã mía thành bột giấy.',
        icon: 'tool',
        active: false,
      },
      {
        title: 'Tạo tờ giấy',
        time: '20:30',
        description: 'Thực hành đổ khuôn và tạo ra tờ giấy thủ công.',
        icon: 'bulb',
        active: false,
      },
    ],
    ecoBottles: '10+',
    ecoWaste: '1kg',
    galleryImages: [
      'https://api.builder.io/api/v1/image/assets/TEMP/e402c9e2937ef5c4b5960c246feef994421130fa?width=1324',
      'https://api.builder.io/api/v1/image/assets/TEMP/645357c09d4a1ec8d84f6c03643fa5a84f22c7b5?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/9f899ba81dd9c3a50e63035dd791bdd39b127b00?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/e2fe1d0d13c25b1f365437a26034ca9e46b6dabc?width=1324',
    ],
  },
  {
    id: 'ws-6',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/b3ec7661f30758cb65a1d6536a98b9581f3dbda6?width=757',
    heroImage: 'https://api.builder.io/api/v1/image/assets/TEMP/b3ec7661f30758cb65a1d6536a98b9581f3dbda6?width=2880',
    mode: 'Offline',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/091d9eaf762bbcbbee3c9d5fb3a6218bb5ce0d53?width=48',
    instructor: 'Nhóm Indigo',
    instructorTitle: 'Nghệ nhân Nhuộm / Indigo Collective',
    instructorBio: 'Nhóm Indigo là tập thể nghệ nhân chuyên về kỹ thuật nhuộm tự nhiên và Shibori Nhật Bản.',
    title: 'Nhuộm chàm tự nhiên trên vải Linen',
    heroTitle: 'Nhuộm Chàm Tự Nhiên: Kỹ Thuật Shibori Nhật Bản',
    heroSubtitle: 'Học cách tạo màu từ cây chàm và thực hành kỹ thuật nhuộm Shibori truyền thống.',
    description: 'Học cách tạo màu từ cây chàm và thực hành kỹ thuật nhuộm Shibori Nhật Bản.',
    duration: '5 giờ',
    schedule: 'Cả ngày Thứ 7',
    price: '680.000đ',
    ecoScore: null,
    location: 'Indigo Studio',
    locationDetail: 'Quận Bình Thạnh, TP.HCM',
    maxParticipants: 8,
    spotsLeft: 2,
    story: 'Kỹ thuật nhuộm Shibori là nghệ thuật tạo hoa văn trên vải bằng cách gấp, buộc và nhuộm. Workshop này đưa bạn vào thế giới màu sắc tự nhiên từ cây chàm.',
    storyDetail: 'Trong cả ngày Thứ 7, bạn sẽ được học và thực hành đầy đủ quy trình nhuộm chàm tự nhiên từ khâu chuẩn bị vải, pha chế thuốc nhuộm đến kỹ thuật Shibori.',
    learnings: [
      'Quy trình chuẩn bị và xử lý vải Linen.',
      'Kỹ thuật pha chế thuốc nhuộm từ cây chàm tự nhiên.',
      'Các kiểu Shibori cơ bản: Itajime, Arashi, Kumo.',
    ],
    scheduleItems: [
      {
        title: 'Giới thiệu & Chuẩn bị',
        time: '09:00',
        description: 'Tìm hiểu về kỹ thuật Shibori và chuẩn bị nguyên liệu.',
        icon: 'tea',
        active: true,
      },
      {
        title: 'Kỹ thuật gấp & buộc',
        time: '10:00',
        description: 'Thực hành các kiểu gấp và buộc vải theo phong cách Shibori.',
        icon: 'tool',
        active: false,
      },
      {
        title: 'Nhuộm & Hoàn thiện',
        time: '12:00',
        description: 'Nhuộm vải và xử lý sau nhuộm để cố định màu.',
        icon: 'bulb',
        active: false,
      },
    ],
    ecoBottles: '40+',
    ecoWaste: '2.5kg',
    galleryImages: [
      'https://api.builder.io/api/v1/image/assets/TEMP/e402c9e2937ef5c4b5960c246feef994421130fa?width=1324',
      'https://api.builder.io/api/v1/image/assets/TEMP/645357c09d4a1ec8d84f6c03643fa5a84f22c7b5?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/9f899ba81dd9c3a50e63035dd791bdd39b127b00?width=646',
      'https://api.builder.io/api/v1/image/assets/TEMP/e2fe1d0d13c25b1f365437a26034ca9e46b6dabc?width=1324',
    ],
  },
]

export const FEATURED_WORKSHOP = {
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
