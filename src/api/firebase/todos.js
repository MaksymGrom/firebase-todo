import {addDoc, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import {db, todosCollection} from "../../fb";

const apiTodos = {
    async getTodos() {
        const querySnapshot = await getDocs(todosCollection);
        const todos = [];
        querySnapshot.forEach(todo => {
            todos.push({
                id: todo.id,
                ...todo.data()
            });
        })
        return todos;
    },
    async addTodo(text) {
        await addDoc(todosCollection, {text, isDone: false});
    },
    async deleteTodo(id) {
        await deleteDoc(doc(db, 'todos', id));
    },
    async toggleTodo(id, isDone) {
        await updateDoc(doc(db, 'todos', id), {isDone});
    }
}

export default apiTodos;
