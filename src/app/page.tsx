'use client'

import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SingUpModal";
import { useState } from "react";

export default function Home() {

  const [showModal, setShowModal] = useState<""|"register"|"login">("")

  return (
        <div className="flex flex-col text-gray-600 items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-semibold text-center mb-4">
                Welcome to Zero to Coder!
            </h1>
            <p className="text-lg text-center mb-4 max-w-2xl">
                Zero to Coder is an application that will guide you on your journey to becoming a skilled programmer, completely self-paced. Whether you’re a beginner or have some experience, our platform will allow you to learn at your own pace, with personalized resources and challenges tailored to your current level.
            </p>
            <p className="text-lg text-center mb-4 max-w-2xl">
                To kickstart your journey, we’ll begin with a diagnostic test. This test will assess your current knowledge and help us personalize your learning path to make your experience as effective and efficient as possible.
            </p>
            <p className="text-lg text-center mb-4 max-w-2xl">
                Don’t worry if you don’t know all the answers! Just try to answer as many questions as you can, and feel free to use hints if they help. It’s all part of the process to help us understand where you are and how we can guide you to success.
            </p>
            <button
                onClick={() => setShowModal("register")}
                className="bg-blue-500 text-white p-3 rounded-md text-xl font-semibold transition-all hover:bg-blue-600 mt-6"
            >
                Create account
            </button>
            <button
                onClick={() => setShowModal("login")}
                className="bg-blue-500 text-white p-3 rounded-md text-xl font-semibold transition-all hover:bg-blue-600 mt-6"
            >
                Log In
            </button>
            {
                showModal === "register" && <SignUpModal showModal={showModal} setShowModal={setShowModal} />
            }
            {
                showModal === "login" && <SignInModal showModal={showModal} setShowModal={setShowModal} />
            }
        </div>
  );
}
