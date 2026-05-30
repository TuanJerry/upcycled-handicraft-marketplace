const BANNER_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=1440'
const AVATAR_1 = 'https://api.builder.io/api/v1/image/assets/TEMP/a30a10014afb77aa24e8b2f705174e5c2890c4f1?width=200'
const PRODUCT_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=400'

export interface FeaturedProduct {
  image: string
  name: string
  price: string
}

export interface StoreProduct {
  id: string
  image: string
  name: string
  category: string
  price: string
  rating: number
}

export interface StoreWorkshop {
  image: string
  schedule: string
  title: string
  description: string
  duration: string
  maxParticipants: number
  price: string
}

export interface StoreData {
  slug: string
  bannerImage: string
  avatarImage: string
  name: string
  tagline: string
  description: string
  productCount: number
  workshopCount: number
  story: string
  address: string
  phone: string
  featuredProducts: FeaturedProduct[]
  products: StoreProduct[]
  workshops: StoreWorkshop[]
}

export const STORES: StoreData[] = [
  {
    slug: 'green-earth-artisan',
    bannerImage: BANNER_IMG,
    avatarImage: AVATAR_1,
    name: 'Green Earth Artisan',
    tagline: '"Mỗi sản phẩm là một lời hứa với hành tinh xanh."',
    description: 'Chuyên đồ gia dụng thủ công từ vật liệu tái chế 100%.',
    productCount: 48,
    workshopCount: 5,
    story:
      'Bắt đầu từ một xưởng gỗ nhỏ tại ngoại ô Đà Lạt, Green Earth Artisan không chỉ tạo ra đồ gia dụng mà còn mong muốn tái định nghĩa giá trị của phế phẩm. Chúng tôi sử dụng 100% gỗ tái chế từ các kiện hàng cũ và vải vụn organic để tạo nên những tác phẩm nghệ thuật có tính ứng dụng cao.',
    address: 'Làng Nghề nhân Xuân Tho, Đà Lạt, Lâm Đồng',
    phone: '0987 654 321',
    featuredProducts: [
      { image: PRODUCT_IMG, name: 'Chậu cây tái chế', price: '150.000đ' },
      { image: PRODUCT_IMG, name: 'Giỏ vải vụn', price: '280.000đ' },
      { image: PRODUCT_IMG, name: 'Kệ gỗ pallet', price: '550.000đ' },
    ],
    products: [
      { id: '1', image: PRODUCT_IMG, name: 'Đồng hồ gỗ Pallet', category: 'Nội thất tái chế', price: '450.000đ', rating: 9.5 },
      { id: '2', image: PRODUCT_IMG, name: 'Túi Canvas "Mâm Xanh"', category: 'Phụ kiện organic', price: '320.000đ', rating: 9.5 },
      { id: '3', image: PRODUCT_IMG, name: 'Bộ nến đậu nành Organic', category: 'Decor & Quà tặng', price: '195.000đ', rating: 9.2 },
      { id: '4', image: PRODUCT_IMG, name: 'Kệ bút "Đại Dương"', category: 'Văn phòng xanh', price: '180.000đ', rating: 9.0 },
      { id: '5', image: PRODUCT_IMG, name: 'Bộ dụng cụ Tre tự nhiên', category: 'Gia dụng bền vững', price: '125.000đ', rating: 10 },
      { id: '6', image: PRODUCT_IMG, name: 'Macrame "Sương Mai"', category: 'Trang trí nội thất', price: '680.000đ', rating: 9.4 },
    ],
    workshops: [
      {
        image: BANNER_IMG,
        schedule: 'MỖI THỨ 7 HÀNG TUẦN',
        title: 'Tái sinh gỗ Pallet: Làm đồ decor nhỏ',
        description: 'Học cách xử lý gỗ cũ và tự tay đóng những món quà xinh xắn cho người thân.',
        duration: '3 Giờ',
        maxParticipants: 10,
        price: '350.000đ',
      },
    ],
  },
  {
    slug: 'eco-thread-collective',
    bannerImage: BANNER_IMG,
    avatarImage: AVATAR_1,
    name: 'Eco Thread Collective',
    tagline: '"Tái sinh vải – tái sinh cuộc sống."',
    description: 'Tái sinh những thước vải thừa thành phụ kiện thời trang độc bản.',
    productCount: 32,
    workshopCount: 2,
    story:
      'Eco Thread Collective ra đời từ niềm đam mê với thời trang bền vững. Chúng tôi biến những thước vải thừa, vải lỗi thành những phụ kiện độc đáo, góp phần giảm thiểu lãng phí trong ngành may mặc.',
    address: 'Quận 3, TP. Hồ Chí Minh',
    phone: '0912 345 678',
    featuredProducts: [
      { image: PRODUCT_IMG, name: 'Túi bạt Canvas', price: '320.000đ' },
      { image: PRODUCT_IMG, name: 'Khuyên tai vải', price: '120.000đ' },
      { image: PRODUCT_IMG, name: 'Nến thơm hũ thủy tinh', price: '190.000đ' },
    ],
    products: [
      { id: '1', image: PRODUCT_IMG, name: 'Túi bạt Canvas', category: 'Phụ kiện thời trang', price: '320.000đ', rating: 9.3 },
      { id: '2', image: PRODUCT_IMG, name: 'Khuyên tai vải', category: 'Trang sức handmade', price: '120.000đ', rating: 8.8 },
      { id: '3', image: PRODUCT_IMG, name: 'Nến thơm hũ thủy tinh', category: 'Decor & Quà tặng', price: '190.000đ', rating: 9.1 },
      { id: '4', image: PRODUCT_IMG, name: 'Vòng tay vải tái chế', category: 'Trang sức handmade', price: '95.000đ', rating: 8.7 },
    ],
    workshops: [
      {
        image: BANNER_IMG,
        schedule: 'MỖI CHỦ NHẬT HÀNG TUẦN',
        title: 'Làm túi vải từ quần áo cũ',
        description: 'Học cách biến những bộ quần áo cũ thành chiếc túi vải xinh xắn và độc đáo.',
        duration: '2 Giờ',
        maxParticipants: 8,
        price: '250.000đ',
      },
    ],
  },
]
