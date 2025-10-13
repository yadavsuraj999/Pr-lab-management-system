import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, updateDoc, query, where, setDoc, } from "firebase/firestore";
import { db } from "../config/firebase";
import { Labcontext } from "./Labprovider";

export const Pcscontext = createContext();

const Pcsprovider = ({ children }) => {
    const { fetchLab, allLab } = useContext(Labcontext);

    const [pcs, setPcs] = useState([]);
    const [isPcEdit, setIsPcEdit] = useState(false);

    useEffect(() => {
        fetchPcs();
    }, [allLab]);

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
        try {
            await addDoc(collection(db, "pcs"), {
                ...newPc,
                createdAt: new Date(),
                status: "Available",
            });
            if (newPc.lab) {
                await updateDoc(doc(db, "labs", newPc.lab), {
                    currentCapacity: increment(-1),
                });
            }
            toast.success("PC added successfully.");
            fetchLab();
            fetchPcs();
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const deletePcs = async (pcId) => {
        try {
            const p = (await getDoc(doc(db, "pcs", pcId))).data();

            const studentSnap = await getDocs(
                query(collection(db, "student"), where("pc", "==", pcId))
            );
            for (const stu of studentSnap.docs) {
                await updateDoc(doc(db, "student", stu.id), {
                    pc: null,
                    lab: null,
                });
            }

            await deleteDoc(doc(db, "pcs", pcId));

            if (p?.lab) {
                await updateDoc(doc(db, "labs", p.lab), {
                    currentCapacity: increment(1),
                });
            }

            toast.success("PC deleted successfully...");
            fetchLab();
            fetchPcs();
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const editPc = async (pcId, data) => {
        console.log(pcId);
        try {
            const oldPcSnap = await getDoc(doc(db, "pcs", pcId));
            const oldPc = oldPcSnap.data()
            if (oldPc?.lab !== data.lab) {
                if (oldPc?.lab) {
                    await updateDoc(doc(db, "labs", oldPc.lab), {
                        currentCapacity: increment(1),
                    });
                }
                if (data.lab) {
                    await updateDoc(doc(db, "labs", data.lab), {
                        currentCapacity: increment(-1),
                    });
                }

                const studentSnap = await getDocs(
                    query(collection(db, "student"), where("pc", "==", pcId))
                );
                for (const stu of studentSnap.docs) {
                    await updateDoc(doc(db, "student", stu.id), {
                        pc: null,
                        lab: null,
                    });
                }

                data.status = "Available";
            }

            await updateDoc(doc(db, "pcs", pcId), data);

            toast.success("PC edited successfully...");
            fetchPcs();
            fetchLab();
            setIsPcEdit(false);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <Pcscontext.Provider
            value={{ pcs, addPcs, fetchPcs, deletePcs, isPcEdit, setIsPcEdit, editPc }}
        >
            {children}
        </Pcscontext.Provider>
    );
};

export default Pcsprovider;
