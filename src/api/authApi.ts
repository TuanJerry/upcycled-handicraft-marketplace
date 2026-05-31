import axiosClient from './axiosClient';

// POST /api/auth/register
export interface RegisterPayload {
  username: string; // backend nhận 'username', không phải 'name'
  email: string;
  password: string;
}

// POST /api/auth/login
export interface LoginPayload {
  email: string;
  password: string;
}

const authApi = {
  /**
   * Đăng ký tài khoản mới
   * POST /api/auth/register
   */
  register: (data: RegisterPayload) =>
    axiosClient.post('/auth/register', data),

  /**
   * Đăng nhập — trả về JWT token
   * POST /api/auth/login
   */
  login: (data: LoginPayload) =>
    axiosClient.post('/auth/login', data),

  /**
   * Kích hoạt vai trò Seller cho tài khoản hiện tại
   * PUT /api/auth/seller-register  (yêu cầu JWT trong header)
   */
  registerSeller: () =>
    axiosClient.put('/auth/seller-register'),
};

export default authApi;
