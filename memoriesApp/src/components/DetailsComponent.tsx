import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase/client"
import Loading from "../components/Loading"

interface TodoType {
    id: number,
    title: string,
    completed: boolean,
    description: string
}

interface TodoComponentType {
    todoItem: TodoType
    fetchTodos: () => void;
    setDetailedTodo: React.Dispatch<React.SetStateAction<TodoType | undefined>>;
}

export default function DetailsComponent({ todoItem, fetchTodos, setDetailedTodo }: TodoComponentType) {
    const [description, setDescription] = useState<string | undefined>();
    const [title, setTitle] = useState<string | undefined>();
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        setDescription(todoItem.description)
        setTitle(todoItem.title)
    }, [todoItem])
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }
    const [loadingSendDescription, setLoadingSendDescription] = useState(false);
    const handleSendDescription = async () => {
        setLoadingSendDescription(true);
        const { error } = await supabase.from('todos').update({
            description: description
        }).eq('id', todoItem.id)
        if (error) {
            console.log('error', error)
            setLoadingSendDescription(false);
            return
        }
        setLoadingSendDescription(false);
        fetchTodos();
    }
    const [loadingComplete, setLoadingComplete] = useState(false);
    const handleComplete = async () => {
        setLoadingComplete(true);
        const { error } = await supabase.from('todos').update({
            completed: !todoItem.completed
        }).eq('id', todoItem.id)
        if (error) {
            console.log('error', error)
            setLoadingComplete(false);
            return
        }
        setLoadingComplete(false);
        fetchTodos();
        setDetailedTodo({ ...todoItem, completed: !todoItem.completed });
    }
    
    return (
        <div className="w-1/2 flex flex-col items-center bg-gray-100/80 rounded-md">
            <div className="w-full flex flex-col items-center flex-grow overflow-y-auto py-2">
                <input type="text" value={title ?? ''} className="text-center font-extrabold text-lg w-full my-5 bg-transparent focus:outline-none" onChange={(e) => setTitle(e.target.value)} />
                <div className="flex flex-col w-full px-4">
                    <h3 className="font-bold">Descripcion</h3>
                    <textarea ref={textAreaRef} rows={1} className="w-full  bg-transparent rounded-md p-2 focus:outline-none resize-none" value={description ?? ''} onChange={handleInput} />
                </div>
            </div>
            <div className="w-full flex justify-center   rounded-b-md  relative">
                <button className="w-1/2 px-2 py-1 bg-gray-300" disabled={loadingComplete} onClick={handleComplete}>{loadingComplete?<Loading/>:(todoItem.completed ? "Repetir" : "Completar")}</button>
                <button className={`w-1/2 px-2 py-1 ${!description ? 'bg-gray-600' : 'bg-gray-400'}`} disabled={!description || loadingSendDescription} onClick={handleSendDescription}>{loadingSendDescription? <Loading/>:'Enviar cambios'}</button>
            </div>
        </div>
    )
}