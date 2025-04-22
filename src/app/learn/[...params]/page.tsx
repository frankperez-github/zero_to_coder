'use client'

import { useState, useEffect } from 'react';
import { questions } from '@/lib/questions';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import QuestionComp from '@/components/Question';
import { toast } from 'react-toastify';


const LearnPage = () => {
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [initialQuestions, setInitialQuestions] = useState(questions.filter(q => q.difficulty === 'easy'));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  

    // Get filter params (type, topic, difficulty)
    const params = useParams().params!;

    const type = params[0]
    const topic = params[1]
    const difficulty = params[2]

  

  useEffect(()=>{
    // Filter questions based on type, topic, and difficulty params
    let questions = initialQuestions
    if (type) {
        questions = questions.filter((q) => q.type === type)
    }
    
    if (topic) {
        questions = questions.filter((q) => q.topic === topic)
    }
    
    if (difficulty) {
        questions = questions.filter((q) => q.difficulty === difficulty)
    }
    setInitialQuestions(questions)
  }, [type, topic, difficulty])

  // Filter the questions based on the current difficulty
  const easyQuestions = initialQuestions.filter(q => q.difficulty === 'easy');
  const mediumQuestions = initialQuestions.filter(q => q.difficulty === 'medium');
  const hardQuestions = initialQuestions.filter(q => q.difficulty === 'hard');

  // Effect to update questions based on difficulty
  useEffect(() => {
    if (difficulty) {
      // If difficulty is provided, use it directly
      setCurrentDifficulty(difficulty as 'easy' | 'medium' | 'hard');
    } else {
      // Otherwise, set initial questions based on available difficulty levels
      if (easyQuestions.length > 0) {
        setCurrentDifficulty('easy');
        setInitialQuestions(easyQuestions);
      } else if (mediumQuestions.length > 0) {
        setCurrentDifficulty('medium');
        setInitialQuestions(mediumQuestions);
      } else if (hardQuestions.length > 0) {
        setCurrentDifficulty('hard');
        setInitialQuestions(hardQuestions);
      }
    }
  }, [difficulty]);

  

  const goToNextQuestion = () => {
    if (currentQuestionIndex < initialQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If we reach the end of the current difficulty, move to the next level of difficulty if no difficulty param is provided
      if (!difficulty) {
        if (currentDifficulty === 'easy' && mediumQuestions.length > 0) {
          setCurrentDifficulty('medium');
          setInitialQuestions(mediumQuestions);
          setCurrentQuestionIndex(0);
        } else if (currentDifficulty === 'medium' && hardQuestions.length > 0) {
          setCurrentDifficulty('hard');
          setInitialQuestions(hardQuestions);
          setCurrentQuestionIndex(0);
        }
      }
      else
      {
        toast.success('You have completed all questions in this topic.');
        setTimeout(() => {
            window.location.href = '/train';
        }, 3000);
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }


  const currentQuestion = initialQuestions[currentQuestionIndex];

  return (
    <div className="min-h-[100vh] p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
        <h1 className="text-3xl font-bold text-center mb-6">Learn Page</h1>
        <p className="text-xl mb-16 text-center">
            In this section, you can practice and improve your skills. Answer the following questions and get immediate feedback.
        </p>

        <QuestionComp 
            question={currentQuestion} 
            questionIndex={currentQuestionIndex} 
            goToNextQuestion={goToNextQuestion}
            goToPreviousQuestion={goToPreviousQuestion}
        />

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
