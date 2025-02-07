interface CardType {
    id: number,
    image: string,
    title: string,
    date: Date,
    details: string
    images: ImageDataType[]
}
interface ImageDataType {
    url: string,
    ishighlight: boolean
}


export default function Card(item: CardType) {
    const handleClick = () => {
        console.log(item.images)
    }
    return (
        <div key={item.id} className="bg-gray-100/80 rounded-md flex flex-col justify-center p-4 h-full hover:cursor-pointer hover:bg-gray-400 hover:shadow-2xl transition-all duration-400" onClick={handleClick}>
            <div className="w-full h-52 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg mt-2">{item.title}</h2>
            <p className="text-sm">{item.date + ''}</p>
            <p className="w-full h-20 overflow-hidden">
                {item.details}
            </p>
        </div>
    )
}