import { ref, onMounted } from 'vue';
import { moviesCollection, db, moviesFirebaseCollectionRef } from '../modules/firebase';
import { onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const useMovies = () => {
    
    // //Step 1: new movie title and stored in a ref
    const newMovieTitle = ref('');

    //Step 2: list of movies stored in a li in a ref
    const movies = ref([]);

    //Step 3: create a function to retrieve a new movie from te list
    onMounted(() => {
        onSnapshot(moviesCollection, (snapshot) => {
        movies.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() //spread operator
            // title: doc.data().title,
        }))
        })
    });
    
    //Step 4: create a function to add a new movie to the list
    const addMovie = async () => {
        if (newMovieTitle.value.trim() == '') 
        return; //checks if input is empty, then returns(stop function)
    
        await addDoc(moviesCollection, {
        title: newMovieTitle.value
        })
    
        newMovieTitle.value = '';
    }
    
    //Step 5: create a function to delete a movie from the list
    const deleteMovie = async (id) => {
        console.log("deleting movie with id", id)
        await deleteDoc(doc(db, moviesFirebaseCollectionRef, id))
    }

    return {
        movies, 
        newMovieTitle,
        addMovie,
        deleteMovie
    }
}