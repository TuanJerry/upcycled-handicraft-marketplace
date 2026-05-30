import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ShopListPage from './pages/ShopListPage'
import ShopDetailPage from './pages/ShopDetailPage'
import ProductPage from './pages/ProductPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/san-pham" element={<ShopListPage />} />
        <Route path="/cua-hang/:slug" element={<ShopDetailPage />} />
        <Route path="/cua-hang/:storeSlug/san-pham/:productId" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}
