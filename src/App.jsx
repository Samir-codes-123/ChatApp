import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full bg-slate-200">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
