const PRODUCT_IMG_1 = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=400'
const PRODUCT_IMG_2 = 'https://api.builder.io/api/v1/image/assets/TEMP/9e4201ddd87fd3215c7d5029b3859e671d65d22b?width=400'

export type OrderStatus = 'shipping' | 'completed' | 'processing' | 'cancelled'

export interface Order {
  id: string
  code: string
  date: string
  status: OrderStatus
  statusLabel: string
  seller: {
    name: string
    slug: string
    logo?: string
  }
  product: {
    image: string
    name: string
    category: string
    quantity: number
    price: string
    badges: string[]
    hashtags: string[]
  }
  trackingNote: string
  trackingTime: string
  total: string
  shipping: {
    recipientName: string
    address: string
    phone: string
    method: string
    estimatedDelivery: string
  }
  payment: {
    type: string
    last4: string
  }
  note: string
}

export const ORDERS: Order[] = [
  {
    id: '1',
    code: '#RECY-98231',
    date: '12/05/2024',
    status: 'shipping',
    statusLabel: 'Đang giao hàng',
    seller: {
      name: 'EcoArt Studio',
      slug: 'ecoart-studio',
    },
    product: {
      image: PRODUCT_IMG_1,
      name: 'Đèn bàn từ chai thủy tinh tái chế – Emerald Night',
      category: 'Gỗ sồi tự nhiên',
      quantity: 1,
      price: '350.000 VND',
      badges: ['HANDMADE', 'Eco Score: A+'],
      hashtags: ['#ZeroWaste', '#RecycledGlass'],
    },
    trackingNote: 'Gói hàng đã đến trạm trung chuyển TP.HCM',
    trackingTime: 'Lúc 10:20, 13 Tháng 5',
    total: '350.000 VND',
    shipping: {
      recipientName: 'Nguyễn Văn A',
      address: '123 Đường Bền Vững, Quận 1, TP. Hồ Chí Minh',
      phone: '090 123 4567',
      method: 'Giao hàng tiết kiệm (Eco-Ship)',
      estimatedDelivery: 'Thời gian giao: 2–3 ngày',
    },
    payment: {
      type: 'Visa Card',
      last4: '8823',
    },
    note: 'Vui lòng bọc kỹ bằng vật liệu thân thiện môi trường, không dùng màng bọc nilon.',
  },
  {
    id: '2',
    code: '#RECY-87112',
    date: '05/04/2024',
    status: 'completed',
    statusLabel: 'Đã hoàn thành',
    seller: {
      name: 'Green Weaver',
      slug: 'green-weaver',
    },
    product: {
      image: PRODUCT_IMG_2,
      name: 'Túi xách từ bao tải dứa – Earth Collection',
      category: 'Nâu Terra',
      quantity: 1,
      price: '220.000 VND',
      badges: ['HANDMADE', 'Eco Score: A'],
      hashtags: ['#EcoFashion', '#Upcycled'],
    },
    trackingNote: 'Cảm ơn bạn đã đồng hành cùng thời trang bền vững!',
    trackingTime: 'Lúc 14:00, 8 Tháng 4',
    total: '220.000 VND',
    shipping: {
      recipientName: 'Nguyễn Văn A',
      address: '123 Đường Bền Vững, Quận 1, TP. Hồ Chí Minh',
      phone: '090 123 4567',
      method: 'Giao hàng tiết kiệm (Eco-Ship)',
      estimatedDelivery: 'Thời gian giao: 2–3 ngày',
    },
    payment: {
      type: 'Visa Card',
      last4: '8823',
    },
    note: '',
  },
]
