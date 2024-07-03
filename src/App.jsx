import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default App;
