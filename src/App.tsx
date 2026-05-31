import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ShopListPage from './pages/ShopListPage'
import ShopDetailPage from './pages/ShopDetailPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import WorkshopListPage from './pages/WorkshopListPage'
import WorkshopDetailPage from './pages/WorkshopDetailPage'
import OrderListPage from './pages/OrderListPage'
import OrderDetailPage from './pages/OrderDetailPage'
import MyWorkshopPage from './pages/MyWorkshopPage'
import SellerProductsPage from './pages/SellerProductsPage'
import SellerOrdersPage from './pages/SellerOrdersPage'
import SellerWorkshopPage from './pages/SellerWorkshopPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/san-pham" element={<ShopListPage />} />
        <Route path="/workshop" element={<WorkshopListPage />} />
        <Route path="/workshop/:id" element={<WorkshopDetailPage />} />
        <Route path="/cua-hang/:slug" element={<ShopDetailPage />} />
        <Route path="/cua-hang/:storeSlug/san-pham/:productId" element={<ProductPage />} />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/quan-ly-don-hang" element={<OrderListPage />} />
        <Route path="/don-hang/:id" element={<OrderDetailPage />} />
        <Route path="/quan-ly-workshop" element={<MyWorkshopPage />} />
        <Route path="/seller" element={<SellerProductsPage />} />
        <Route path="/seller/don-hang" element={<SellerOrdersPage />} />
        <Route path="/seller/workshop" element={<SellerWorkshopPage />} />
      </Routes>
    </BrowserRouter>
  )
}
