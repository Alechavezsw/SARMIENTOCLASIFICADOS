import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { AdDetailPage } from './pages/AdDetailPage';
import { LoginPage } from './pages/LoginPage';
import { PostAdPage } from './pages/PostAdPage';
import { NewsPage } from './pages/NewsPage';
import { WeatherPage } from './pages/WeatherPage';
import { BusSchedulePage } from './pages/BusSchedulePage';
import { RadioPage } from './pages/RadioPage';
import { PharmaciesPage } from './pages/PharmaciesPage';
import { UsefulPhonesPage } from './pages/UsefulPhonesPage';
import { CommercialDirectoryPage } from './pages/CommercialDirectoryPage';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminAdsPage } from './pages/admin/AdminAdsPage';
import { AdminBusinessesPage } from './pages/admin/AdminBusinessesPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:slug" element={<CategoryPage />} />
          <Route path="/anuncio/:id" element={<AdDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/publicar" element={<PostAdPage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/clima" element={<WeatherPage />} />
          <Route path="/colectivos" element={<BusSchedulePage />} />
          <Route path="/radio" element={<RadioPage />} />
          <Route path="/farmacias" element={<PharmaciesPage />} />
          <Route path="/telefonos-utiles" element={<UsefulPhonesPage />} />
          <Route path="/directorio-comercial" element={<CommercialDirectoryPage />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/categorias" 
            element={
              <ProtectedRoute requireAdmin>
                <AdminCategoriesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/anuncios" 
            element={
              <ProtectedRoute requireAdmin>
                <AdminAdsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/negocios" 
            element={
              <ProtectedRoute requireAdmin>
                <AdminBusinessesPage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<div className="text-center py-20">Página no encontrada</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
