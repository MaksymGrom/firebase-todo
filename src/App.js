import './App.css';
import {useEffect, useState} from "react";
import apiTodos from "./api/firebase/todos";

function App() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const getData = async () => {
        setTodos(await apiTodos.getTodos());
    }

    useEffect(() => {
        getData()
    }, []);

    const addTodo = async () => {
        if (!text) {
            return;
        }
        setDisabled(true);
        await apiTodos.addTodo(text);
        await getData();
        setText('');
        setDisabled(false);
    }

    const deleteTodo = async (id) => {
        await apiTodos.deleteTodo(id);
        await getData();
    }

    const toggleTodo = async (id, isDone) => {
        await apiTodos.toggleTodo(id, isDone);
        await getData();
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
