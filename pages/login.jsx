import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useConnectedUserContext } from "../pages/_app"

export default function Login() {
  const { connectedUser, setConnectedUser } = useConnectedUserContext()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter()
  
  function onSubmit(data) {
    console.log(data)
    setConnectedUser({
      name: "john doe"
    })
    router.push("/feed")
  }
  
  return (
    <main className="flex flex-col w-full max-w-3xl py-10 mx-auto sm:px-6">
      <section className="flex flex-col w-full px-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg">
        <h1 className="mb-8 text-xl font-bold text-rose-600">Se connecter</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col">
            <label className="text-sm">Votre adresse e-mail</label>
            <input 
              className={`block w-full mt-1 ${errors.email ? "border-red-300 focus:border-red-400 placeholder-red-500 focus:ring-red-200" : "border-gray-300 focus:border-indigo-300 focus:ring-indigo-200"} rounded-md shadow-sm  focus:ring focus:ring-opacity-50`} 
              type="email" 
              placeholder="johndoe@mail.com"
              {...register("email", { required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" })}
            />
            { errors.email && <p className="text-red-500">L'adresse e-mail doit être renseignée !</p> }
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm">Votre mot de passe</label>
            <input 
              className={`${errors.password ? "border-red-300 focus:border-red-400 placeholder-red-500 focus:ring-red-200" : "border-gray-300 focus:border-indigo-300 focus:ring-indigo-200"} block w-full mt-1 rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
              type="password" 
              {...register("password", { required: true })}
            />
            { errors.password && <p className="text-red-500">Le mot de passe doit être renseignée</p> }
          </div>
          <div className="flex items-center mt-4">
            <input 
              className="w-full px-4 py-2 font-medium text-white transition duration-75 border border-transparent rounded-md shadow-sm cursor-pointer bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500" 
              type="submit" 
              value="Se connecter" 
            />
          </div>
        </form>
      </section>
      <Link href="/signup"><a className="block px-4 py-2 m-auto mt-8 text-sm text-center text-gray-600 transition duration-75 hover:underline hover:rounded hover:text-black" href="">Je n'ai pas de compte</a></Link>
    </main>
  )
}