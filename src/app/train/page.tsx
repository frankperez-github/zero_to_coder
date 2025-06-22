'use client'

import API from '@/api'
import Question from '@/types/Question'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SyntaxTrain() {
  const router = useRouter()

  const [questions, setQuestions] = useState<Question[]>()

  useEffect(()=>{
        API.get("/questions", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((data)=>{
            setQuestions(data.data)
        }
        ).catch((err)=>{
            console.log(err)
        })
  },[])

  // Obtener opciones únicas de type, topic y difficulty
  const topics = Array.from(new Set(questions?.map(q => q.topics).map(t => t.map((topic) => topic)).flat()))
  const [difficulties, setDifficulties] = useState(Array.from(new Set(questions?.map(q => q.difficulty))))

  // Estados del formulario
  const [topic, setTopic] = useState<string>("")
  const [difficulty, setDifficulty] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/learn/${topic}/${difficulty}`)
  }

  useEffect(()=>{
    if(topic !== "")
        setDifficulties(Array.from(new Set(questions?.filter(q=>q.topics.includes(topic)).map(q => q.difficulty))))
    
  },[topic])

  return (
    <div className="max-w-md text-gray-600 mx-auto mt-10 p-4 border-2 border-gray-600 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Comenzar entrenamiento</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Tema:
            <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="" disabled/>
                {topics.map((t) => (
                <option key={t} value={t}>
                    {t}
                </option>
                ))}
            </select>
        </label>

        <label className="flex flex-col">
          Dificultad:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border p-2 rounded"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
        >
          Empezar
        </button>
      </form>
    </div>
  )
}
