'use client'

import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SingUpModal";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Home() {

  const [showModal, setShowModal] = useState<""|"register"|"login">("")

  return (
        <div className="flex flex-col text-gray-600 items-center min-h-screen bg-gray-100">
            <div className="flex flex-row gap-10 w-[70%]">
                <div className="w-[50%]">
                    <TypeAnimation
                        className="text-6xl"
                        sequence={[
                            'Bienvenido a Zero to Hero',
                            1000,
                            'Bienvenido a Zero to Coder',
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={0}
                        style={{ fontSize: '2em', display: 'inline-block' }}
                    />
                </div>
                <div className="w-[60%]">
                    <p className="text-lg text-left mb-4 max-w-2xl">
                        Zero to Coder es una aplicación que te guiará en tu camino hacia la programación, a tu propio ritmo. Tanto si eres principiante como si tienes experiencia, nuestra plataforma te permitirá aprender a tu propio ritmo, con recursos y desafíos personalizados adaptados a tu nivel actual.
                    </p>
                    <p className="text-lg text-left mb-4 max-w-2xl">
                        Para empezar tu experiencia, comenzaremos con una prueba de diagnóstico. Esta prueba evaluará tus conocimientos actuales y nos ayudará a personalizar tu proceso de aprendizaje para que tu experiencia sea lo más eficaz y eficiente posible.
                    </p>
                    <p className="text-lg text-left mb-4 max-w-2xl">
                        ¡No te preocupes si no sabes todas las respuestas! Intenta responder tantas preguntas como puedas y usa las sugerencias que te ayuden. Todo esto forma parte del proceso para que podamos comprender tu situación y guiarte hacia el éxito.
                    </p>
                    <div className="flex flex-row gap-5">
                        <button
                            onClick={() => setShowModal("register")}
                            className="bg-blue-500 text-white p-3 rounded-md text-xl font-semibold transition-all hover:bg-blue-600 mt-6"
                        >
                            Comencemos
                        </button>
                    </div>
                </div>
            </div>
            {
                showModal === "register" && <SignUpModal showModal={showModal} setShowModal={setShowModal} />
            }
            {
                showModal === "login" && <SignInModal showModal={showModal} setShowModal={setShowModal} />
            }
        </div>
  );
}
