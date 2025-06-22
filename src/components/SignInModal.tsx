import API from "@/api";
import { IconX } from "@tabler/icons-react";
import { FormEvent } from "react";

export default function SignInModal({ showModal, setShowModal }:{ showModal: "" | "register" | "login", setShowModal: (value: "" | "register" | "login" | "") => void }) {
  const handleSignIn = async (e:FormEvent) => {
        e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());
        try {
            const response = await API.post('/users/login', data);
            localStorage.setItem("token",response.data.token);
            setShowModal("");
            location.href = '/profile'
        } catch (error) {
            console.error(error);
        }
  };
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-[#b6b6b667] ${showModal ? "" : "hidden"}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <IconX className="relative ml-auto w-10 cursor-pointer" onClick={()=>setShowModal("")}/>

        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input type="email" name="email" placeholder="Email" required className="border border-gray-300 rounded-md p-2 mb-4 w-full" />
          <input type="password" name="password" placeholder="Password" required className="border border-gray-300 rounded-md p-2 mb-4 w-full" />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-md text-xl font-semibold transition-all hover:bg-blue-600 mt-6">Sign In</button>
        </form>
        <p className="text-sm text-gray-500 mt-4">Don&apos;t have an account? <span onClick={() => setShowModal("register")} className="text-blue-500 cursor-pointer">Sign Up</span></p>
      </div>
    </div>
  );
}