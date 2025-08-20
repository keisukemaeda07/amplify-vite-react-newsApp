import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./componets/Navbar";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<HomePage />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
