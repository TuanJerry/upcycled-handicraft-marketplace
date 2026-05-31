import axiosClient from './axiosClient';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface GetProductsParams {
  category?: string;
  materials?: string;   // comma-separated, ví dụ: "wood,metal"
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category: string;
  materials?: string[];
  story: string;
  images?: string[];
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

// ─── API ──────────────────────────────────────────────────────────────────────

const productApi = {
  /**
   * Lấy danh sách sản phẩm (có filter)
   * GET /api/products?category=&materials=&minPrice=&maxPrice=&search=
   * Public
   */
  getAll: (params?: GetProductsParams) =>
    axiosClient.get('/products', { params }),

  /**
   * Lấy chi tiết sản phẩm theo ID
   * GET /api/products/:id
   * Public
   */
  getById: (id: number | string) =>
    axiosClient.get(`/products/${id}`),

  /**
   * Lấy câu chuyện sản phẩm (dùng cho QR code)
   * GET /api/products/:id/story
   * Public
   */
  getStory: (id: number | string) =>
    axiosClient.get(`/products/${id}/story`),

  /**
   * Tạo sản phẩm mới
   * POST /api/products
   * Yêu cầu: JWT + role SELLER
   */
  create: (data: CreateProductPayload) =>
    axiosClient.post('/products', data),

  /**
   * Cập nhật sản phẩm
   * PUT /api/products/:id
   * Yêu cầu: JWT + role SELLER (phải là chủ sản phẩm)
   */
  update: (id: number | string, data: UpdateProductPayload) =>
    axiosClient.put(`/products/${id}`, data),

  /**
   * Xóa sản phẩm
   * DELETE /api/products/:id
   * Yêu cầu: JWT + role SELLER (phải là chủ sản phẩm)
   */
  delete: (id: number | string) =>
    axiosClient.delete(`/products/${id}`),
};

export default productApi;
