'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuestionComp from '@/components/Question';
import API from '@/api';
import Question from '@/types/Question';
import { toast } from 'react-toastify';


const LearnPage = () => {

    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(()=>{
        API.get("/questions/start", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((data)=>{
            setQuestions([data.data[0]])
            setCurrentQuestion(data.data[0])
        })
    },[])

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            API.get("/questions/"+currentQuestion?.id+"/next", {
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
                            toast.success("You have completed all the questions!")
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
        API.put("/questions/"+currentQuestion?.id+"/done", {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
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
        <div className="min-h-[100vh] p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <h1 className="text-3xl font-bold text-center mb-6">Learn Page</h1>
            <p className="text-xl mb-16 text-center">
                In this section, you can practice and improve your skills. Answer the following questions and get immediate feedback.
            </p>
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
                        <p className="text-lg">Loading questions...</p>
                    </div>
            }

            <div className="absolute bottom-8 text-center">
                <Link
                href="/resources"
                className="bg-green-600 hover:bg-green-700 text-white font-bold p-5 rounde-md transition duration-300"
                >
                    Explore More Resources
                </Link>
            </div>
        </div>
    );
};

export default LearnPage;
