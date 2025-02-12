import { useEffect, useState } from "react"
import ListComponent from "../components/ListComponent"
import Loading from "../components/Loading"

import {supabase} from "../supabase/client"

interface TodoType {
    id: number,
    title: string,
    completed: boolean,
    description: string
}

interface TodoComponentType {
    todoList: TodoType[]
    setDetailedTodo: React.Dispatch<React.SetStateAction<TodoType | undefined>>;
    fetchTodos: () => void;

}

export default function PendingComponent({ todoList, setDetailedTodo,fetchTodos }: TodoComponentType) {
    const [todos, setTodos] = useState<TodoType[]>([])
    useEffect(() => {
        setTodos(todoList.sort((a, b) => {
            if (a.completed !== b.completed){
                return a.completed ? 1 : -1;
            }
            return a.id - b.id;
        }));
    }, [todoList]);

    const handleToDoClick = (todo: TodoType) => {
        setDetailedTodo(todo);
        console.log(todo)
    }
    const [newToDo, setNewToDo] = useState<string|undefined>();
    const [sending, setSending] = useState(false);
    const sendToDo = async () => {
        setSending(true);
        const {error} = await supabase.from('todos').insert({
            title: newToDo,
            completed: false,
        })
        if (error) {
            console.log('error', error)
            setSending(false);
            return
        }
        setSending(false);
        setNewToDo('');
        fetchTodos();
    }
    

    return (
        <div className="w-1/2 flex flex-col bg-gray-100/80 rounded-md h-full">
            <div className="w-full overflow-y-auto flex-grow my-1">
                {todos.length > 0 ? todos.map((item) => (
                    <div className="mx-2 my-2" key={item.id} onClick={() => handleToDoClick(item)}>
                        <ListComponent todoList={item} />
                    </div>
                )) : <div className="border-2 flex justify-center items-center my-3 rounded-md">No toDo registrados</div>}
            </div>

            <div className="w-full flex justify-center py-1 bg-gray-400 rounded-b-md px-2 relative">
                <input type="text" className="w-full rounded-md bg-gray-200 pr-12 pl-1 focus:outline-none" onChange={(e) => setNewToDo(e.target.value)} value={newToDo}/>
                <button className={`absolute right-2 transform  text-black rounded-r-md px-2  ${(!newToDo || sending) ? 'bg-gray-300':'bg-white hover:bg-gray-400'}`} onClick={sendToDo} disabled={!newToDo}>
                    {sending ? <Loading/>:'Agregar'}
                </button>
            </div>
        </div>
    )
}