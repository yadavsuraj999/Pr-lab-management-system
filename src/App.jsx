import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Header from "./components/Header"
import Dashbord from "./pages/Dashbord"
import { ToastContainer } from "react-toastify"
import ProtectedRout from "./components/ProtectedRout"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashbord" element={<ProtectedRout> <Dashbord /> </ProtectedRout>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App