import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashbord from "./pages/Dashbord"
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


const App = () => {
  const {users} = useContext(Authcontext);

  return (
    <BrowserRouter>
      <div className="flex">
        {users && <Aside />}
        <div className="h-screen w-full">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashbord" element={<ProtectedRout> <Dashbord /> </ProtectedRout>} />

            <Route path="/add-lab" element={<Addlabs />} />
            <Route path="/view-lab" element={<Viewlab />} />
            <Route path="/edit-lab/:labid" element={<Addlabs />} />

            <Route path="/add-pcs" element={<Addpcs />} />
            <Route path="/view-pcs" element={<Viewpcs />} />
            <Route path="/edit-pc/:pcid" element={<Addpcs />} />

            <Route path="/add-student" element={<Addstudent />} />
            <Route path="/view-student" element={<Viewstudent />} />
            <Route path="/edit-student/:studentid" element={<Addstudent />} />


            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App