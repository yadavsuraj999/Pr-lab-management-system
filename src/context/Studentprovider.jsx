import { createContext, useState } from "react"


const StudentContext = createContext()

const Studentprovider = ({ children }) => {

    const[student, setStudent] = useState([])


    return (
        <StudentContext.Provider value={student}>
            {children}
        </StudentContext.Provider>
    )
}

export default Studentprovider