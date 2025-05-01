'use client'

/* const ResultsPage = ({ logicScore, sintaxScore }: { logicScore: number; sintaxScore: number }) => {

    const [questions, setQuestions] = useState<Question[]>([]);
    useEffect(()=>{
        API.get('/questions', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            const data = res.data;
            setQuestions(data);
        })
    },[])


    return (
        <div className="min-h-[100vh] p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <h1 className="text-3xl font-bold text-center mb-6">Test Results</h1>

            <div className="mt-6 gap-10 flex text-center">
                <button
                onClick={()=>location.href = `/learn/logic/${logicScore < 5 ? 'operations' : 'sequences'}/${logicScore < 3 ? 'easy' : logicScore < 5 ? 'medium' : 'hard'}`}
                className="bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                >
                    Start Logic Practice
                </button>
                <button
                onClick={()=>location.href = `/learn/sintax/lists/${sintaxScore < 3 ? 'easy' : sintaxScore < 5 ? 'medium' : 'hard'}`}
                className="bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                >
                    Start Sintax Practice
                </button>
            </div>
        </div>
    );
}; */

const InitTest = () => {
    /* const [answers, setAnswers] = useState<Record<string, string>>({});
    const [finished, setFinished] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [questions, setQuestions] = useState<Question[]>([]);
    
    useEffect(()=>{
        API.get('/questions', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            const data = res.data;
            setQuestions(data);
        })
    },[])

    const handleAnswerSelected = (answer: string, questionId: number) => {
        setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answer,
        }));
    };

    const goToNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="min-h-[100vh] overflow-auto p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <h1 className="text-3xl font-bold text-center mb-6">Initial Test:</h1>
            {!finished && (
                <div>
                <QuestionComp
                    key={questions[currentIndex]?.id}
                    question={questions[currentIndex]}
                    questionIndex={currentIndex}
                    goToNextQuestion={goToNextQuestion}
                    onAnswerSelected={handleAnswerSelected}
                    goToPreviousQuestion={goToPreviousQuestion}
                />
                
                <div className="flex justify-end mt-10">
                    <div className="text-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 px-10 text-white font-bold p-2 rounded-md w-full mt-4 transition duration-300"
                        onClick={()=>{}}
                    >
                        Finish Test
                    </button>
                    </div>
                </div>
                </div>
            )}
        </div>
    ); */
    return(
        <div className=""></div>
    )
};

export default InitTest;
