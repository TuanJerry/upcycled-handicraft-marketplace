import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import CategorySection from '../components/CategorySection'
import BestSellers from '../components/BestSellers'
import ProductGrid from '../components/ProductGrid'
import WorkshopSection from '../components/WorkshopSection'
import AboutSection from '../components/AboutSection'
import Footer from '../components/Footer'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <main className="home-main">
        <HeroBanner />
        <CategorySection />
        <BestSellers />
        <ProductGrid />
        <WorkshopSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
