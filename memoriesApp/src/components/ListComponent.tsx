interface TodoType {
    id: number,
    title: string,
    completed: boolean,
    description: string
}

export default function ListComponent({todoList}: {todoList: TodoType}) {
    return (
        <div className={`w-full flex flex-row ${todoList.completed ? 'bg-gray-300':'bg-white'} px-2 rounded-md hover:cursor-pointer hover:bg-gray-400`}>
            <input type="checkbox" checked={todoList.completed} className="mx-2" readOnly/>
            <h1 className={todoList.completed ? 'line-through text-black/50' : ''}>{todoList.title}</h1>
        </div>
    )
}