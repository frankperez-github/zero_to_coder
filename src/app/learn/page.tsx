'use client'

import { useState, useEffect } from 'react';
import QuestionComp from '@/components/Question';
import API from '@/api';
import Question from '@/types/Question';
import { TypeAnimation } from 'react-type-animation';
import ConfettiOnLoad from '@/components/ConffetiOnLoad';


const LearnPage = () => {

    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [noQuestions, setNoQuestions] = useState(false)

    useEffect(()=>{
        API.get("/questions/start", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((data)=>{
            if (data.data.length == 0)
                setNoQuestions(true)
            setQuestions([data.data[0]])
            setCurrentQuestion(data.data[0])
        })
    },[])

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const goToNextQuestion = (time:string) => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            API.post("/questions/"+currentQuestion?.id+"/next", { time },
            {
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
                        setQuestions(previousQuestions => [...previousQuestions, ...data.data])
                    })
                }
                else
                {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setQuestions(previousQuestions => [...previousQuestions, ...data.data])
                }
            })
        }
    };

    useEffect(() => {
        setCurrentQuestion(questions[currentQuestionIndex])
    }, [currentQuestionIndex]);

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setCurrentQuestion(questions[currentQuestionIndex - 1]);
        }
    }


    return (
        <div className="p-4 w-full px-20 text-gray-800">
            {
                noQuestions ?
                    <div className="">
                        <ConfettiOnLoad />
                        <TypeAnimation
                            sequence={[
                            'Felicidades! has completado tu camino, ya puedes salir al mundo real buscando nuevos retos que resolver usando tus conocimientos de programación, buena suerte.',
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
                <div className="">

                    <TypeAnimation
                            sequence={[
                            'En esta sección puedes mejorar tus habilidades. Responde los ejercicios y obtendrás retroalimentación inmediatamente.'
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
                    {
                        currentQuestion ? 
                            <QuestionComp 
                                question={questions[currentQuestionIndex]} 
                                questionIndex={currentQuestionIndex} 
                                goToNextQuestion={goToNextQuestion}
                                goToPreviousQuestion={goToPreviousQuestion}
                            />
                        :
                            <div className="text-center">
                                <p className="text-lg">Cargando preguntas...</p>
                            </div>
                    }
                </div>
            }

        </div>
    );
};

export default LearnPage;
