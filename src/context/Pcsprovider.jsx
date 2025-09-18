import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { data } from "react-router-dom";

export const Pcscontext = createContext();

const Pcsprovider = ({ children }) => {
    const [pcs, setPcs] = useState([]);
    const [isPcEdit, setIsPcEdit] = useState(null)

    const addPcs = async (newPc) => {
        try {
            await addDoc(collection(db, "pcs"),{
                ...newPc,
                createdAt: new Date()
            });
            fetchPcs();
        } catch (error) {
            toast.error(error.message);
        }
    };

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

    useEffect(() => {
        fetchPcs();
    }, []);


    const deletePcs = async (pcId) => {
        try {
            await deleteDoc(doc(db, "pcs", pcId))
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
        <Pcscontext.Provider value={{ pcs, addPcs, deletePcs, isPcEdit, setIsPcEdit, editPc }}>
            {children}
        </Pcscontext.Provider>
    );
};

export default Pcsprovider;
