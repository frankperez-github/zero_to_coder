"use client";
import API from "@/api";
import Question from "@/types/Question";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface QuestionProps {
  question: Question;
  questionIndex: number;
  goToNextQuestion: (time:string) => void;
  goToPreviousQuestion: () => void;
  onAnswerSelected?: (answer: string, questionId: number) => void;
}

const QuestionComp: React.FC<QuestionProps> = ({
    question: currentQuestion,
    questionIndex: currentQuestionIndex,
    goToNextQuestion,
    onAnswerSelected,
    goToPreviousQuestion
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answered, setAnswered] = useState<boolean>(false);
    const [tests, setTests] = useState<{
        input: [
            [
                type: string,
                value: string
            ]
        ],
        expected: string,
        actual: string,
        passed: boolean,
        error?: string
    }[]>()
    const [testsCount, setTestsCount] = useState(0)
    const [passedTestsCount, setPassedTestsCount] = useState(0)
    const [showingTestIndex, setShowingTestIndex] = useState(-1)
    const [showCodeResults, setShowCodeResults] = useState(false);
    const [loadingResults, setLoadingResults] = useState(false)
    const [userCode, setUserCode] = useState("");
    
    const [revealedTests, setRevealedTests] = useState(0);
    
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (intervalRef.current !== null) return; // avoid multiple intervals
        intervalRef.current = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);
    };
    
    const pauseTimer = () => {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTimer(0);
    };



    useEffect(() => {
        resetTimer()
        startTimer()
        setUserCode(`# Escribe tu código aquí\n\ndef Solution${currentQuestion.solutionSignature}:\n    # Tu código\n`);
        return () => clearInterval(intervalRef.current!);
    }, []);


    useEffect(() => {
        if (!loadingResults && (tests?.length || 0) > 0) {
            setRevealedTests(0);
            setShowCodeResults(true)
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setRevealedTests(i);
                if (i > (tests?.length || 0)) {
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [loadingResults, tests]);

    const handleAnswerSelected = (answer: string) => {
        setAnswered(true);
        setSelectedAnswer(answer);
        if(onAnswerSelected)
        {
            onAnswerSelected(answer, currentQuestionIndex);
        }
    };

    const handlePreviousQuestion = () => {
        setAnswered(false);
        setSelectedAnswer(null);
        goToPreviousQuestion();
    }

    useEffect(()=>{
        setUserCode(`# Escribe tu código aquí\n\ndef Solution${currentQuestion.solutionSignature}:\n    # Tu código\n`);
    },[currentQuestion])

    const handleNextQuestion = () => {
        setAnswered(false);
        setSelectedAnswer(null);
        goToNextQuestion(timer+"");
        resetTimer()
        startTimer()
    };

    const handleCodeSubmit = async () => {
        if(userCode == "")
        {
            toast.info("Escribe tu solución antes de enviar el código.")
            return
        }
        setLoadingResults(true)
        const response = await API.post(`/questions/${currentQuestion.id}/test-solution`, 
            {
                code: userCode,
            },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        if (response.status == 200)
        {
            const answered = response.data.passedCount==response.data.totalCount
            if(answered)
                pauseTimer()
            setTests(response.data.results)
            setPassedTestsCount(response.data.passedCount)
            setTestsCount(response.data.totalCount)
            setAnswered(answered)
            setLoadingResults(false)
        }
        else
        {
            toast.error("Hemos tenido problemas para completar la solicitud, intenta de nuevo.")                
        }
    }

    return (
        <div className="py-10">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">
                    Ejercicio {currentQuestionIndex + 1}:
                </h2>
                {timer}
                <p className="text-lg">{currentQuestion?.text}</p>
            </div>

            <div className="mb-6 grid grid-cols-4 gap-10">
                {currentQuestion?.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerSelected(option)}
                    className={`w-full p-3 mb-2 rounded-md text-lg font-semibold ${
                    selectedAnswer === option
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                    }`}
                >
                    {option}
                </button>
                ))}
            </div>
            <div className="flex flex-row gap-5">
                <div className="flex flex-col w-[80%]">
                    <div className="">
                        <textarea value={userCode} name="" onChange={(e)=>setUserCode(e.target.value)} className="bg-white text-gray-700 h-[30vh] w-full py-5" id=""></textarea>
                        <button
                            onClick={handleCodeSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                        >
                            Enviar solución
                        </button>
                    </div>
                    <details className="my-6 cursor-pointer">
                        <summary>Pista</summary>
                        {currentQuestion.hint}
                    </details>

                    {answered && currentQuestion.options.length > 0 && (
                        <div className="mb-4">
                        {selectedAnswer === currentQuestion?.answer ? (
                            <p className="text-green-600">Correcto!! Buen trabajo.</p>
                        ) : (
                            <p className="text-red-600">
                            Incorrecto!!. La respuesta es: {currentQuestion?.answer}
                            </p>
                        )}
                        <div className="mt-4">
                            <p className="text-sm text-white">{currentQuestion?.explanation}</p>
                        </div>
                        </div>
                    )}
                </div>
                
                {
                    showCodeResults &&
                    <div className="w-[20%] border-2 rounded-sm p-2">
                        {
                            !loadingResults ?
                                <div className="mt-4">
                                    {
                                        tests?.map((x, key) => (
                                            <div
                                                className={`border-2 my-2 py-3 px-3 cursor-pointer`}
                                                onClick={() => setShowingTestIndex(showingTestIndex === key ? -1 : key)}
                                                key={key}
                                            >
                                                <div className="flex gap-5">
                                                    <p>Prueba #{key + 1}</p>
                                                    <p>{revealedTests >= key && (x.passed ? "✅" : "❌")}</p>
                                                </div>
                                                {
                                                    showingTestIndex === key &&
                                                    <div className="border-t-2 mt-3 py-3">
                                                        <p>Entrada: {Array.isArray(x.input) ? x.input.map(i => i[1]).join(", ") : "Entrada no disponible"}</p>
                                                        <p>Valor esperado: {x.expected}</p>
                                                        <p>Valor obtenido: {x.actual}</p>
                                                        {
                                                            x.error && 
                                                            <p className="text-red-600">Error: {x.error}</p>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                    {
                                        revealedTests >= (tests?.length || 0) && (
                                            <>
                                                <p>Pruebas pasadas: {passedTestsCount}</p>
                                                <p>Total de pruebas: {testsCount}</p>
                                            </>
                                        )
                                    }
                                    {
                                        revealedTests >= (tests?.length || 0) && answered &&
                                            <button
                                                onClick={handleNextQuestion}
                                                className="bg-blue-600 mt-16 hover:bg-blue-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                                                disabled={!answered}
                                            >
                                                Siguiente ejercicio
                                            </button>
                                    }
                                </div>
                            :
                            <div className=""></div>
                        }
                    </div>
                }
            </div>

            <div className="flex justify-evenly">
                {
                    currentQuestionIndex > 0 && (
                        <div className="flex justify-between w-1/4 mx-auto mt-20">
                            <button
                                onClick={handlePreviousQuestion}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                            >
                                Ejercicio anterior
                            </button>
                        </div>
                    )
                }
                
                {
                    currentQuestion.options.length > 0 &&    
                    <div className="flex justify-between w-1/4 mx-auto mt-20">
                        <button
                        onClick={handleNextQuestion}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                        disabled={!answered}
                        >
                            Siguiente ejercicio
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default QuestionComp;
