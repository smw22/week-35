import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../modules/firebase';
import { ref } from 'vue';
import router from "@/router";

export const useUsers = () => {
    const user = ref(null);
    
    const login = async (email, password ) => {
        try{
            await signInWithEmailAndPassword(auth, email, password)
        } 
        catch (error) {
            console.log(error.message)
        }
    }

    const logout = async () => {
        try{
            await signOut(auth)
            router.push('/')
        }
        catch (error) {
            console.log(error.message)
        }
    }

    onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
    })

    return {user, login, logout}
}