import { useEffect, useState } from "react"
import DetailsComponent from "../components/DetailsComponent"
import PendingComponent from "../components/PendingComponent"
import { supabase } from "../supabase/client"


interface TodoType {
    id: number,
    title: string,
    completed: boolean,
    description: string
}


export default function TodoListPage() {
    const [todos, setTodos] = useState<TodoType[]>([])
    const fetchTodos = async() => {
        const {data, error} = await supabase.from('todos').select('*')
        if (error) {
            console.log('error', error)
            return
        } 
        setTodos(data)
    }

    
    useEffect(() => {
        fetchTodos()
    }, [])

    const [selectedToDo, setSelectedToDo] = useState<TodoType>()


    return (
        <div className="w-full flex gap-5 p-5 h-screen flex-row">
            <PendingComponent todoList={todos} setDetailedTodo={setSelectedToDo} fetchTodos={fetchTodos}/>
            {selectedToDo && <DetailsComponent todoItem={selectedToDo} fetchTodos={fetchTodos} setDetailedTodo={setSelectedToDo}/> }

        </div>
    )
}