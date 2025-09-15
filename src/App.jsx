import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashbord from "./pages/Dashbord"
import { ToastContainer } from "react-toastify"
import ProtectedRout from "./components/ProtectedRout"
import ErrorPage from "./pages/ErrorPage"
import Addlabs from "./pages/Labs/Addlabs"
import Viewlab from "./pages/Labs/Viewlab"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashbord" element={<ProtectedRout> <Dashbord /> </ProtectedRout>} />
        <Route path="/add-lab" element={<Addlabs />} />
        <Route path="/add-lab/:labid" element={<Addlabs />} />
        <Route path="/view-lab" element={<Viewlab />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App