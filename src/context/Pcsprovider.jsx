import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, doc, getDocs, increment, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Labcontext } from "./Labprovider";

export const Pcscontext = createContext();

const Pcsprovider = ({ children }) => {
    const { fetchLab, allLab } = useContext(Labcontext)

    const [pcs, setPcs] = useState([]);
    const [isPcEdit, setIsPcEdit] = useState(null)

    useEffect(() => {
        fetchPcs();
    }, []);

    const fetchPcs = async () => {
        try {
            const snapshot = await getDocs(collection(db, "pcs"));
            const allPcs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPcs(allPcs);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addPcs = async (newPc) => {
        console.log(newPc);
        try {
            await addDoc(collection(db, "pcs"), {
                ...newPc,
                createdAt: new Date(),
                status: "Available"
            });
            await updateDoc(doc(db, "labs", newPc.lab), {
                currentCapacity: increment(-1)
            })

            fetchLab()
            fetchPcs();
        } catch (error) {
            toast.error(error.message);
        }
    };


    const deletePcs = async (pcId) => {
        const p = pcs.find((pc) => {
            return pc.id == pcId
        })
        console.log(p);
        try {
            await deleteDoc(doc(db, "pcs", pcId))
            await updateDoc(doc(db, "labs", p?.lab), {
                currentCapacity: increment(1)
            })
            fetchLab()
            fetchPcs()
        } catch (error) {
            toast.error(error.message);
        }
    }

    const editPc = async (pcid, data) => {
        try {
            setIsPcEdit(true)
            await updateDoc(doc(db, "pcs", pcid), data)
            fetchPcs()
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <Pcscontext.Provider value={{ pcs, addPcs, fetchPcs, deletePcs, isPcEdit, setIsPcEdit, editPc }}>
            {children}
        </Pcscontext.Provider>
    );
};

export default Pcsprovider;
