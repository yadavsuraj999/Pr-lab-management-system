import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react"
import { db } from "../config/firebase";
import { toast } from "react-toastify";

export const Labcontext = createContext();

const Labprovider = ({ children }) => {
    const [allLab, setAllLab] = useState([])
    const [isEdit, setIsEdit] = useState(null)

    useEffect(() => {
        fetchLab()
    }, [])

    const addLab = async (labinput) => {
        try {
            await addDoc(collection(db, "labs"), {
                ...labinput,
                createdAt: new Date(),
                currentCapacity: parseInt(labinput.capacity)
            })
            toast.success("lab added successfully...")
            fetchLab()
        } catch (error) {
            console.log(error);
            toast.error("something went worng....")
        }
    }

    const fetchLab = async () => {
        try {
            const snapShort = await getDocs(collection(db, "labs"))
            const Labs = snapShort.docs.map((lab) => {
                return {
                    id: lab.id,
                    ...lab.data()
                }
            })
            setAllLab(Labs)
        } catch (error) {
            toast.error(error)
        }

    }

    const deleteLab = async (id) => {
        try {
            await deleteDoc(doc(db, "labs", id))
            fetchLab()
            toast.success("lab delete successfully ....")
        } catch (error) {
            toast.error(error)
        }
    }

    const editLab = async (id, data) => {
        try {
            setIsEdit(true)
            await updateDoc(doc(db, "labs", id), data)
            toast.success("lab edit successfully ....")
            fetchLab()
            setIsEdit(null)
        } catch (error) {
            console.log(error);
            toast.error("Failed to edit lab")
        }
    }



    return (
        <Labcontext.Provider value={{ addLab, fetchLab, allLab, deleteLab, isEdit, editLab, setIsEdit }}>
            {children}
        </Labcontext.Provider>
    )
}

export default Labprovider