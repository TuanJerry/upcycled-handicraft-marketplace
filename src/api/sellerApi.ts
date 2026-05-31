import axiosClient from './axiosClient';

// ─── API ──────────────────────────────────────────────────────────────────────

const sellerApi = {
  /**
   * Lấy dữ liệu analytics dashboard của Seller
   * GET /api/seller/analytics
   * Yêu cầu: JWT + role SELLER
   */
  getAnalytics: () =>
    axiosClient.get('/seller/analytics'),
};

export default sellerApi;
