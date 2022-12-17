import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Layout/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import DetailPage from "./pages/DetailPage";
import Payment from "./pages/Payment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/pay" element={<Payment />} />
          {/* 해당부분에 라우터 넣으면 됩니다. */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
