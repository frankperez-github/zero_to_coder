'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {questions} from '../../lib/questions'

export default function SyntaxTrain() {
  const router = useRouter()

  // Obtener opciones únicas de type, topic y difficulty
  const types = Array.from(new Set(questions.map(q => q.type)))
  const topics = Array.from(new Set(questions.map(q => q.topic)))
  const difficulties = Array.from(new Set(questions.map(q => q.difficulty)))

  // Estados del formulario
  const [type, setType] = useState<string>(types[0])
  const [topic, setTopic] = useState<string>(topics[0])
  const [difficulty, setDifficulty] = useState<string>(difficulties[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/learn/${type}/${topic}/${difficulty}`)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Comenzar Entrenamiento</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Tipo:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          Tema:
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border p-2 rounded"
          >
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
