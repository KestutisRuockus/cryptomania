import { Routes, Route, useLocation, type Location } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Saved from "./pages/Saved";
import NotFound from "./pages/NotFound";
import CryptoModal from "./features/modal/CryptoModal";

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation: Location };
  const backgroundLocation = state?.backgroundLocation || location;

  return (
    <>
      <Routes location={backgroundLocation}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trending" element={<Trending />} />
          <Route path="saved" element={<Saved />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {location !== backgroundLocation && (
        <Routes>
          <Route path="modal/:id" element={<CryptoModal />} />
          <Route path="trending/modal/:id" element={<CryptoModal />} />
          <Route path="saved/modal/:id" element={<CryptoModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
