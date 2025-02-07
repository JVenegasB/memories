import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const [password1Approved, setPassword1Approved] = useState<boolean>(false);
    const [password2Approved, setPassword2Approved] = useState<boolean>(false);
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    useEffect(() => {
        console.log(password1, password2)
        if (password1 === '1234') {
            setPassword1Approved(true)
        } else {
            setPassword1Approved(false)
        }
        if (password2 === '4321') {
            setPassword2Approved(true)
        } else {
            setPassword2Approved(false)
        }
    }, [password1, password2])

    const signIn = async () => {
        try {
            const { error } = await supabase.auth.signInAnonymously();
            if (error) {
                console.error(error)
                return
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignIn = async () => {
        await signIn();
        navigate('/');
    }
    return (
        <div className="h-screen bg-gradient-to-tr flex justify-center items-center" style={{ backgroundImage: 'url(/src/assets/Kintsugibg.jpg)', backgroundSize: 'cover' }}>
            <div className="bg-slate-800 rounded-md text-white p-4 w-full max-w-lg mx-4">
                <div className="flex justify-center items-center my-10">
                    <h1 className="text-3xl font-extrabold">Ingresa tu clave!</h1>
                </div>

                <div className="flex flex-col">
                    <input onChange={(e) => setPassword1(e.target.value)} id={"password1"} name={"password1"} type={"text"} required placeholder={"Tu clave"} className={`w-full appearance-none rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-slate-700 px-3 py-2 my-1 border border-slate-600 placeholder-slate-500 text-slate-200 rounded-t-md`} />
                </div>
                {password1Approved && (
                    <>
                        <div className="flex justify-center items-center my-10">
                            <h2 className="text-3xl font-extrabold">Ingresa MI clave!</h2>
                        </div>
                        <input onChange={(e) => setPassword2(e.target.value)} id={"password2"} name={"password2"} type={"text"} required placeholder={"Mi clave"} className={`w-full appearance-none rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-slate-700 px-3 py-2 border border-slate-600 placeholder-slate-500 text-slate-200 rounded-b-md`} />
                    </>
                )}
                {(password1Approved && password2Approved) && (
                    <button onClick={handleSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-slate-900 bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300 mt-5 mb-2">
                        Ingresa
                    </button>
                )}
            </div>
        </div>
    )
}