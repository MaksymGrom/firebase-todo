import './App.css';
import {doc, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import {db, todosCollection} from "./fb";
import {useEffect, useState} from "react";

function App() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const getData = async () => {
        const querySnapshot = await getDocs(todosCollection);
        const newTodos = [];
        querySnapshot.forEach(todo => {
            newTodos.push({
                id: todo.id,
                ...todo.data()
            });
        })
        setTodos(newTodos);
    }

    useEffect(() => {
        getData()
    }, []);

    const addTodo = async () => {
        if (!text) {
            return;
        }
        setDisabled(true);
        await addDoc(todosCollection, { text, isDone: false });
        await getData();
        setText('');
        setDisabled(false);
    }

    const deleteTodo = async (id) => {
        setDisabled(true);
        await deleteDoc(doc(db, 'todos', id));
        await getData();
        setDisabled(false);
    }

    const toggleTodo = async (id, isDone) => {
        setDisabled(true);
        await updateDoc(doc(db, 'todos', id), { isDone });
        await getData();
        setDisabled(false);
    }

    return (
        <div>
            <input disabled={disabled} type="text" value={text} onInput={(event) => setText(event.target.value)} />
            <button disabled={disabled} onClick={() => addTodo()}>Add Todo</button>
            <div>
                <ol>
                    {todos.map(({id, text, isDone}) => (
                        <li key={id}>
                            <input type="checkbox" checked={isDone} onChange={() => toggleTodo(id, !isDone)}/> {text} ->
                            <button onClick={() => deleteTodo(id)}>DELETE</button></li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default App;
