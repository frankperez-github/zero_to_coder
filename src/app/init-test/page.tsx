'use client'
import API from "@/api";
import ConfettiOnLoad from "@/components/ConffetiOnLoad";
import QuestionComp from "@/components/Question";
import Question from "@/types/Question";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function InitTest (){
    const [showQuestions, setShowQuestions] = useState(false)
    const [testQuestions, setTestQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<Question>()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [finished, setFinished] = useState(false)

    const [noQuestions, setNoQuestions] = useState(false)

    useEffect(()=>{
        API.get("/questions/start", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((data)=>{
            setTestQuestions([data.data[0]])
            setCurrentQuestion(data.data[0])
        })
    },[])

    const goToNextQuestion = (time:string) => {
            if (currentQuestionIndex < testQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                API.post("/questions/"+currentQuestion?.id+"/next", { time }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((data)=>{
                    if (data.data.length == 0)
                    {
                        API.get(`/questions/${currentQuestion?.id}/next-topics`, {
                            headers:{
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            }
                        }).then((data)=>{
                            if(data.data.length == 0)
                            {
                                setNoQuestions(true)
                                return
                            }
                            setCurrentQuestionIndex(currentQuestionIndex + 1);
                            setTestQuestions(previousQuestions => [...previousQuestions, ...data.data])
                        })
                    }
                    else
                    {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                        setTestQuestions(previousQuestions => [...previousQuestions, ...data.data])
                    }
                })
            }
    };
    
    useEffect(() => {
        setCurrentQuestion(testQuestions[currentQuestionIndex])
    }, [currentQuestionIndex]);

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setCurrentQuestion(testQuestions[currentQuestionIndex - 1]);
        }
    }

    return(
        <div className="text-gray-600">
            <div className="flex justify-between gap-10 mb-12">
                {
                    noQuestions ?
                        <div className="">
                            <ConfettiOnLoad />
                            <TypeAnimation
                                sequence={[
                                'Felicidades! Ya dominas todos los temas básicos de programación, ya puedes salir al mundo real buscando nuevos retos que resolver usando tus conocimientos de programación, buena suerte.',
                                10000,
                                'Gracias por usar Zero to Coder, tú también puedes ser parte de nuestro equipo, contáctanos a través del fp848584@gmail.com'
                                ]}
                                speed={{
                                        type: "keyStrokeDelayInMs", 
                                        value: 20
                                    }}
                                wrapper="span"
                                cursor={true}
                                repeat={0}
                                style={{ fontSize: '2em', display: 'inline-block' }}
                            />
                        </div>
                    :
                    !finished ?
                        <TypeAnimation
                            sequence={[
                                'Vamos a averiguar lo que sabes.',
                                2000,
                                'Completa todos los ejercicios que puedas, puedes usar las pistas si te son de ayuda.',
                                3000,
                                'Si no sabes responder a este ejercicio, presiona Finalizar exámen, así sabremos por donde empezar tu recorrido.',
                                200,
                                ()=>setShowQuestions(true)
                            ]}
                            speed={{
                                    type: "keyStrokeDelayInMs", 
                                    value: 20
                                }}
                            wrapper="span"
                            cursor={true}
                            repeat={0}
                            style={{ fontSize: '1em', display: 'inline-block' }}
                        />
                    :
                        <h2 className="text-xl">Exámen finalizado, ya estamos listos para comenzar tu camino hacia programador! <span className="text-blue-500 border-b-2 cursor-pointer" onClick={()=>location.href = "/learn"}>Comenzar</span></h2>
                }
                {
                    showQuestions && !finished &&
                        <button
                            onClick={()=>setFinished(true)}
                            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-md w-1/4 transition duration-300"
                        >
                            Finalizar exámen ✅
                        </button>
                }
            </div>
            {
                !finished && showQuestions && currentQuestion &&
                    <div className="">
                        <QuestionComp 
                            question={currentQuestion} 
                            questionIndex={0} 
                            goToNextQuestion={goToNextQuestion} 
                            goToPreviousQuestion={goToPreviousQuestion} 
                        />
                    </div>
            }
        </div>
    )
}