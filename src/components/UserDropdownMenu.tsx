import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../api'
import './UserDropdownMenu.css'

interface UserDropdownMenuProps {
  onLogout?: () => void
}

export default function UserDropdownMenu({ onLogout }: UserDropdownMenuProps) {
  // Đọc roles từ localStorage để kiểm tra đã là Seller chưa
  const rolesRaw = localStorage.getItem('roles')
  const roles: string[] = rolesRaw ? JSON.parse(rolesRaw) : []
  const isSeller = roles.includes('SELLER')

  const [sellerLoading, setSellerLoading] = useState(false)
  const [sellerMsg, setSellerMsg] = useState('')

  async function handleRegisterSeller() {
    setSellerLoading(true)
    setSellerMsg('')
    try {
      const res = await authApi.registerSeller()
      // Cập nhật roles mới vào localStorage
      const updatedUser = res.data.data ?? res.data
      if (updatedUser?.roles) {
        localStorage.setItem('roles', JSON.stringify(updatedUser.roles))
      }
      setSellerMsg('✓ Đã kích hoạt vai trò Seller!')
      // Reload để Header cập nhật lại trạng thái
      setTimeout(() => window.location.reload(), 1000)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Kích hoạt thất bại, thử lại sau'
      setSellerMsg(msg)
    } finally {
      setSellerLoading(false)
    }
  }

  return (
    <div className="user-dropdown">
      <div className="user-dropdown__panel">
        <div className="user-dropdown__list">
          <Link to="/quan-ly-don-hang" className="user-dropdown__item">
            <div className="user-dropdown__icon-wrap user-dropdown__icon-wrap--green">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.60995 1.15114C1.69198 0.984347 1.87245 0.888644 2.05566 0.913254L8.74941 1.74997L15.4432 0.913254C15.6264 0.891379 15.8068 0.987082 15.8889 1.15114L17.0291 3.43161C17.2752 3.92107 17.0127 4.51443 16.4877 4.66482L12.0197 5.94177C11.6396 6.05114 11.2322 5.88982 11.0299 5.55075L8.74941 1.74997L6.46894 5.55075C6.26659 5.88982 5.85917 6.05114 5.47909 5.94177L1.01386 4.66482C0.486125 4.51443 0.22636 3.92107 0.472454 3.43161L1.60995 1.15114ZM8.77948 3.49997L10.2807 5.99919C10.6881 6.67732 11.5002 6.99997 12.2631 6.78122L15.7494 5.78591V10.3523C15.7494 10.9539 15.3392 11.4789 14.7541 11.6265L9.17323 13.0211C8.89433 13.0922 8.60175 13.0922 8.32558 13.0211L2.74472 11.6265C2.15956 11.4761 1.74941 10.9511 1.74941 10.3496V5.78318L5.23847 6.78122C5.99863 6.99997 6.81347 6.67732 7.22089 5.99919L8.71933 3.49997H8.77948Z" fill="#01370C"/>
              </svg>
            </div>
            <span className="user-dropdown__label">Quản lý đơn hàng</span>
          </Link>

          <Link to="/quan-ly-workshop" className="user-dropdown__item">
            <div className="user-dropdown__icon-wrap user-dropdown__icon-wrap--green">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.375 1.75C4.375 0.784766 5.15977 0 6.125 0H15.75C16.7152 0 17.5 0.784766 17.5 1.75V9.625C17.5 10.5902 16.7152 11.375 15.75 11.375H9.20937C8.88672 10.6777 8.3918 10.0762 7.77656 9.625H10.5V8.75C10.5 8.26602 10.891 7.875 11.375 7.875H13.125C13.609 7.875 14 8.26602 14 8.75V9.625H15.75V1.75H6.125V3.09258C5.61094 2.79453 5.01211 2.625 4.375 2.625V1.75ZM4.375 3.5C4.71972 3.5 5.06106 3.5679 5.37954 3.69982C5.69802 3.83173 5.9874 4.02509 6.23116 4.26884C6.47491 4.5126 6.66827 4.80198 6.80018 5.12046C6.9321 5.43894 7 5.78028 7 6.125C7 6.46972 6.9321 6.81106 6.80018 7.12954C6.66827 7.44802 6.47491 7.7374 6.23116 7.98116C5.9874 8.22491 5.69802 8.41827 5.37954 8.55018C5.06106 8.6821 4.71972 8.75 4.375 8.75C4.03028 8.75 3.68894 8.6821 3.37046 8.55018C3.05198 8.41827 2.7626 8.22491 2.51884 7.98116C2.27509 7.7374 2.08173 7.44802 1.94982 7.12954C1.8179 6.81106 1.75 6.46972 1.75 6.125C1.75 5.78028 1.8179 5.43894 1.94982 5.12046C2.08173 4.80198 2.27509 4.5126 2.51884 4.26884C2.7626 4.02509 3.05198 3.83173 3.37046 3.69982C3.68894 3.5679 4.03028 3.5 4.375 3.5ZM3.64492 9.625H5.10234C7.11758 9.625 8.75 11.2574 8.75 13.2699C8.75 13.6719 8.42461 14 8.01992 14H0.730078C0.325391 14 0 13.6746 0 13.2699C0 11.2574 1.63242 9.625 3.64492 9.625Z" fill="#01370C"/>
              </svg>
            </div>
            <span className="user-dropdown__label">Quản lý Workshop</span>
          </Link>

          {/* ── Kích hoạt Seller — chỉ hiện khi chưa là Seller ── */}
          {!isSeller && (
            <>
              <div className="user-dropdown__divider" />
              <button
                className="user-dropdown__item user-dropdown__item--seller"
                onClick={handleRegisterSeller}
                disabled={sellerLoading}
              >
                <div className="user-dropdown__icon-wrap user-dropdown__icon-wrap--amber">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 1.667a8.333 8.333 0 100 16.666A8.333 8.333 0 0010 1.667zm.833 12.5H9.167v-5h1.666v5zm0-6.667H9.167V5.833h1.666V7.5z" fill="#D97706"/>
                  </svg>
                </div>
                <span className="user-dropdown__seller-label">
                  {sellerLoading ? 'Đang kích hoạt...' : 'Trở thành Seller'}
                </span>
              </button>
              {sellerMsg && (
                <p className={`user-dropdown__seller-msg${sellerMsg.startsWith('✓') ? ' user-dropdown__seller-msg--success' : ' user-dropdown__seller-msg--error'}`}>
                  {sellerMsg}
                </p>
              )}
            </>
          )}

          <div className="user-dropdown__divider" />

          <button className="user-dropdown__item user-dropdown__item--logout" onClick={onLogout}>
            <div className="user-dropdown__icon-wrap user-dropdown__icon-wrap--red">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3332 2.8957L13.691 6.25352C13.8879 6.45039 14 6.72109 14 7C14 7.27891 13.8879 7.54961 13.691 7.74648L10.3332 11.1043C10.1582 11.2793 9.92305 11.375 9.67695 11.375C9.16562 11.375 8.75 10.9594 8.75 10.448V8.75H5.25C4.76602 8.75 4.375 8.35898 4.375 7.875V6.125C4.375 5.64102 4.76602 5.25 5.25 5.25H8.75V3.55195C8.75 3.04062 9.16562 2.625 9.67695 2.625C9.92305 2.625 10.1582 2.72344 10.3332 2.8957ZM4.375 2.625H2.625C2.14102 2.625 1.75 3.01602 1.75 3.5V10.5C1.75 10.984 2.14102 11.375 2.625 11.375H4.375C4.85898 11.375 5.25 11.766 5.25 12.25C5.25 12.734 4.85898 13.125 4.375 13.125H2.625C1.17578 13.125 0 11.9492 0 10.5V3.5C0 2.05078 1.17578 0.875 2.625 0.875H4.375C4.85898 0.875 5.25 1.26602 5.25 1.75C5.25 2.23398 4.85898 2.625 4.375 2.625Z" fill="#EF4444"/>
              </svg>
            </div>
            <span className="user-dropdown__logout-label">Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  )
}
