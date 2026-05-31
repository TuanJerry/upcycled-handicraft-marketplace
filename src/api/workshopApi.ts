import axiosClient from './axiosClient';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface CreateWorkshopPayload {
  title: string;
  description: string;
  location: string;
  date: string;         // ISO date string, ví dụ: "2025-06-15T09:00:00Z"
  price: number;
  maxTickets: number;
}

export interface BookTicketPayload {
  workshopId: string;
  quantity: number;
}

// ─── API ──────────────────────────────────────────────────────────────────────

const workshopApi = {
  /**
   * Lấy danh sách tất cả workshop
   * GET /api/workshops
   * Public
   */
  getAll: () =>
    axiosClient.get('/workshops'),

  /**
   * Tạo workshop mới
   * POST /api/workshops
   * Yêu cầu: JWT + role SELLER
   */
  create: (data: CreateWorkshopPayload) =>
    axiosClient.post('/workshops', data),

  /**
   * Đặt vé tham gia workshop
   * POST /api/workshops/book
   * Yêu cầu: JWT + role BUYER
   */
  bookTicket: (data: BookTicketPayload) =>
    axiosClient.post('/workshops/book', data),
};

export default workshopApi;
