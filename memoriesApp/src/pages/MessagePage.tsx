import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import Loading from "../components/Loading";

export default function MessagePage() {
    const [inputValue, setInputValue] = useState<string | undefined>();
    const [sending, setSending] = useState<boolean>(false);
    const [message, setMessage] = useState<string | undefined>();
    const [fetching, setFetching] = useState<boolean>(false);
    useEffect(() => {
        fetchMessage();
    }, [])
    const fetchMessage = async () => {
        setFetching(true);
        console.log('fetching')
        const { data, error } = await supabase.functions.invoke('message',{
            method: 'GET'
        })
        if (error) {
            console.error('error', error)
            setFetching(false);
            return
        }
        console.log('data', data)
        setFetching(false);
        setMessage(data.message);
    }

    const handleNewMessage = async () => {
        setSending(true);
        const { error } = await supabase.from('messages').insert({
            message: inputValue,
        })
        if (error) {
            console.log('error', error)
            setSending(false);
            return
        }
        setInputValue('');
        setSending(false);
        fetchMessage();
    }
    return (
        <div className="w-full min-h-screen flex justify-center items-center py-5">
            <div className="md:w-1/2 w-full mx-5 flex flex-col bg-gray-100/80 rounded-md px-5">
                <h1 className="text-3xl text-center my-4">:)</h1>
                <div className="flex flex-col w-full my-2 p-4 border-black border-2 rounded-md text-black justify-center space-y-4 bg-white/95">
                    <p>{fetching?(<div className="flex justify-center items-center">
                        <p className="mr-3">Obteniendo mensaje</p>
                        <Loading/>
                    </div> ):(!message?"Error":message)}</p>
                </div>
                <div className="w-full flex justify-center  px-2 my-2 p-4  rounded-b-md mx-auto relative">
                    <input type="text" className="w-full rounded-md pr-12 pl-1 focus:outline-none border-t-2 border-b-2 border-l-2 border-black" value={inputValue ?? ''} onChange={(e) => setInputValue(e.target.value)} />
                    <button className={`absolute right-2 transform  text-black rounded-r-md px-2 border-t-2 border-b-2 border-r-2 border-black ${sending ? 'bg-gray-200' : 'bg-gray-200  hover:bg-gray-400'}`} disabled={sending} onClick={handleNewMessage}>
                        {sending ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </div>
        </div>
    )
}