import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import ProtectedRout from "./components/ProtectedRout"
import ErrorPage from "./pages/ErrorPage"
import Addlabs from "./pages/Labs/Addlabs"
import Viewlab from "./pages/Labs/Viewlab"
import Addpcs from "./pages/Pcs/Addpcs"
import Viewpcs from "./pages/Pcs/Viewpcs"
import Addstudent from "./pages/Student/Addstudent"
import Viewstudent from "./pages/Student/Viewstudent"
import Aside from "./components/Aside"
import { useContext } from "react"
import { Authcontext } from "./context/Authprovider"
import Dashboard from "./pages/Dashboard"


const App = () => {
  const {users} = useContext(Authcontext);

  return (
    <BrowserRouter>
      <div className="flex">
        {users && <Aside />}
        <div className="h-screen w-full">
          <Routes>
            <Route path="/" element={<ProtectedRout> <Dashboard /> </ProtectedRout>} />
            <Route path="/login" element={<Login />} />

            <Route path="/add-lab" element={<ProtectedRout> <Addlabs /> </ProtectedRout>} />
            <Route path="/view-lab" element={<ProtectedRout> <Viewlab /> </ProtectedRout>} />
            <Route path="/edit-lab/:labid" element={<ProtectedRout> <Addlabs /> </ProtectedRout>} />

            <Route path="/add-pcs" element={<ProtectedRout> <Addpcs /> </ProtectedRout>} />
            <Route path="/view-pcs" element={<ProtectedRout> <Viewpcs /> </ProtectedRout>} />
            <Route path="/edit-pc/:pcid" element={<ProtectedRout> <Addpcs /> </ProtectedRout>} />

            <Route path="/add-student" element={<ProtectedRout> <Addstudent /> </ProtectedRout>} />
            <Route path="/view-student" element={<ProtectedRout> <Viewstudent /> </ProtectedRout>} />
            <Route path="/edit-student/:studentid" element={<ProtectedRout> <Addstudent /> </ProtectedRout>} />


            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App