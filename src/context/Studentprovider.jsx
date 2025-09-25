import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { Pcscontext } from "./Pcsprovider";

export const StudentContext = createContext();

const Studentprovider = ({ children }) => {
    const [student, setStudent] = useState([]);
    const [isEdit, setIsEdit] = useState(null)

    const { fetchPcs } = useContext(Pcscontext)

    useEffect(() => {
        fetchStudent();
    }, []);

    const fetchStudent = async () => {
        try {
            const Snapshot = await getDocs(collection(db, "student"));
            const allStudent = Snapshot.docs.map((student) => ({
                id: student.id,
                ...student.data()
            }));
            setStudent(allStudent);
        } catch (error) {
            toast.error("Failed to fetch students.");
        }
    };

    const addStudent = async (studentData) => {
        console.log(studentData);
        try {
            await addDoc(collection(db, "student"), {
                ...studentData,
                createAt: new Date()
            });
            await updateDoc(doc(db, "pcs", studentData.pc), {
                status: "Occupied"
            })
            fetchStudent();
            fetchPcs()
            toast.success("Student added successfully...");
        } catch (error) {
            toast.error("Something went wrong while adding student...");
        }
    };

    const deleteStudent = async (studentId) => {
        try {
            await deleteDoc(doc(db, "student", studentId.id));
            await updateDoc(doc(db, "pcs", studentId.pc), {
                status: "Available"
            })
            toast.success("Student deleted successfully.....");
            fetchPcs()
            fetchStudent();
        } catch (error) {
            toast.error("Failed to delete student.");
        }
    };

    const editStudent = async (studentid, data) => {
        try {
            await updateDoc(doc(db, "student", studentid), data)
            toast.success("Student Edit successfully.....");
            fetchStudent()
            setIsEdit(null)
        } catch (error) {
            toast.error("Failed to update student.");
        }
    }

    return (
        <StudentContext.Provider value={{ student, addStudent, deleteStudent, editStudent, setIsEdit, isEdit }}>
            {children}
        </StudentContext.Provider>
    );
};

export default Studentprovider;
