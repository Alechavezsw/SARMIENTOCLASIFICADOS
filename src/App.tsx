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
          <Route path="*" element={<div className="text-center py-20">Página no encontrada</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
