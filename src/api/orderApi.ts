import axiosClient from './axiosClient';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  address: string;
  paymentMethod?: string; // default: 'COD'
}

export interface UpdateOrderStatusPayload {
  status: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

const orderApi = {
  /**
   * Tạo đơn hàng (checkout)
   * POST /api/orders
   * Yêu cầu: JWT + role BUYER
   */
  create: (data: CreateOrderPayload) =>
    axiosClient.post('/orders', data),

  /**
   * Lấy danh sách đơn hàng của Buyer hiện tại
   * GET /api/orders/buyer
   * Yêu cầu: JWT + role BUYER
   */
  getBuyerOrders: () =>
    axiosClient.get('/orders/buyer'),

  /**
   * Lấy danh sách đơn hàng có sản phẩm của Seller hiện tại
   * GET /api/orders/seller
   * Yêu cầu: JWT + role SELLER
   */
  getSellerOrders: () =>
    axiosClient.get('/orders/seller'),

  /**
   * Cập nhật trạng thái đơn hàng
   * PUT /api/orders/:id/status
   * Yêu cầu: JWT
   */
  updateStatus: (id: number | string, status: string) =>
    axiosClient.put(`/orders/${id}/status`, { status }),
};

export default orderApi;
