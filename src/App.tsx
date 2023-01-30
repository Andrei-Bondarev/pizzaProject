import "./App.css";
import "./scss/app.scss";
import Header from "./features/header";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import Cart from "./pages/cart";
import FullPizza from "./pages/full-pizza";
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
          <Route />
        </Routes>
      </div>
    </div>
  );
}

export default App;
