import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { Pcscontext } from "./Pcsprovider";
import { Labcontext } from "./Labprovider";

export const StudentContext = createContext();

const Studentprovider = ({ children }) => {
    const [student, setStudent] = useState([]);
    const [isEdit, setIsEdit] = useState(null);

    const { fetchPcs, pcs } = useContext(Pcscontext);
    const { fetchLab } = useContext(Labcontext);

    useEffect(() => {
        fetchStudent();
    }, [pcs]);

    const fetchStudent = async () => {
  try {
    const Snapshot = await getDocs(collection(db, "student"));
    const allStudent = [];

    for (const stu of Snapshot.docs) {
      const studentData = { id: stu.id, ...stu.data() };

      // Check PC validity
      let pcExists = false;
      if (studentData.pc) {
        const pcRef = doc(db, "pcs", studentData.pc);
        const pcSnap = await getDoc(pcRef);
        if (pcSnap.exists()) {
          pcExists = true;
        } else {
          // Clean invalid PC reference
          await updateDoc(doc(db, "student", stu.id), {
            pc: null,
          });
        }
      }

      // Check Lab validity
      let labExists = false;
      if (studentData.lab) {
        const labRef = doc(db, "labs", studentData.lab);
        const labSnap = await getDoc(labRef);
        if (labSnap.exists()) {
          labExists = true;
        } else {
          // Clean invalid Lab reference
          await updateDoc(doc(db, "student", stu.id), {
            lab: null,
          });
        }
      }

      // Push cleaned or valid student into array
      allStudent.push({
        ...studentData,
        pc: pcExists ? studentData.pc : null,
        lab: labExists ? studentData.lab : null,
      });
    }

    setStudent(allStudent);
  } catch (error) {
    console.error("Failed to fetch students:", error);
    toast.error("Failed to fetch students.");
  }
};


    const addStudent = async (studentData) => {
        try {
            await addDoc(collection(db, "student"), {
                ...studentData,
                createAt: new Date(),
            });

            if (studentData.pc) {
                await updateDoc(doc(db, "pcs", studentData.pc), {
                    status: "Occupied",
                });
            }

            fetchStudent();
            fetchPcs();
            toast.success("Student added successfully...");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while adding student...");
        }
    };

   const deleteStudent = async (studentObj) => {
  try {
    if (studentObj.pc) {
      const pcRef = doc(db, "pcs", studentObj.pc);
      const pcSnap = await getDoc(pcRef);

      // Only update if PC actually exists
      if (pcSnap.exists()) {
        await updateDoc(pcRef, {
          status: "Available",
        });
      } else {
        console.warn(`PC ${studentObj.pc} not found — skipping status update.`);
      }
    }

    await deleteDoc(doc(db, "student", studentObj.id));

    toast.success("Student deleted successfully...");
    fetchPcs();
    fetchStudent();
  } catch (error) {
    console.error("Error deleting student:", error);
    toast.error("Failed to delete student.");
  }
};


    const editStudent = async (studentId, updatedData) => {
        try {
            const oldDataSnap = await getDoc(doc(db, "student", studentId));
            const oldData = oldDataSnap.data();

            if (oldData.pc !== updatedData.pc) {
                if (oldData.pc) {
                    await updateDoc(doc(db, "pcs", oldData.pc), {
                        status: "Available",
                    });
                }
                if (updatedData.pc) {
                    await updateDoc(doc(db, "pcs", updatedData.pc), {
                        status: "Occupied",
                    });
                }
            }

            await updateDoc(doc(db, "student", studentId), updatedData);

            toast.success("Student edited successfully.");
            fetchStudent();
            fetchPcs();
            setIsEdit(null);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update student.");
        }
    };

    return (
        <StudentContext.Provider
            value={{
                student,
                addStudent,
                deleteStudent,
                editStudent,
                setIsEdit,
                isEdit,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};

export default Studentprovider;
