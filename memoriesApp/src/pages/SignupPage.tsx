import { Link } from 'react-router-dom';

export default function SignupPage() {
    return (
        <div className="h-screen bg-gradient-to-tr from-slate-900 to-blue-900 flex justify-center items-center">
            <div className="bg-slate-800 rounded-md text-white p-4 w-full max-w-lg mx-4">
                <div className="flex justify-center items-center my-10">
                    <h1 className="text-3xl font-extrabold">Empieza aqui</h1>
                </div>
                <div className="flex flex-col">
                    <input id={"name"} name={"name"} type={"text"} autoComplete="on" required placeholder={"Nombre"} className={`w-full appearance-none rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-slate-700 px-3 py-2 my-1 border border-slate-600 placeholder-slate-500 text-slate-200 rounded-t-md`}/>
                    <input id={"mail"} name={"mail"} type={"email"} autoComplete="email" required placeholder={"Correo"} className={`w-full appearance-none rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-slate-700 px-3 py-2 my-1 mb-2 border border-slate-600 placeholder-slate-500 text-slate-200`}/>
                    <input id={"password"} name={"password"} type={"password"} autoComplete="on" required placeholder={"Contrasenia"} className={`w-full appearance-none rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-slate-700 px-3 py-2  border border-slate-600 placeholder-slate-500 text-slate-200`}/>
                    <input id={"repeat_password"} name={"repeat_password"} type={"password"} autoComplete="on" required placeholder={"Repetir contrasenia"} className={`w-full appearance-none rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-slate-700 px-3 py-2 border border-slate-600 placeholder-slate-500 text-slate-200 rounded-b-md`}/>
                
                    <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-slate-900 bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300 my-2">Sign up</button>
                
                    <p className="flex flex-row justify-center">Ya empezaste? <Link className="underline hover:text-gray-400 hover:cursor-pointer ml-1" to='/login'>Empieza</Link></p>
                </div>
            </div>
        </div>
    )
}