import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Saved from "./pages/Saved";
import CryptoModal from "./features/modal/CryptoModal";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="modal/:id" element={<CryptoModal />} />
        <Route path="/trending/modal/:id" element={<CryptoModal />} />
        <Route path="/saved/modal/:id" element={<CryptoModal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
