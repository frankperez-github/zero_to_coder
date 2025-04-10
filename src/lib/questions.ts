export interface Question {
  id: number;
  type: 'logic' | 'syntax';
  topic: 'math' | 'sequences' | 'primes' | 'operations' | 'conditionals' | 'loops' | 'strings' | 'lists';
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export const questions: Question[] = [
  // Existing questions with topic field added
  {
    id: 1,
    type: 'logic',
    topic: 'sequences',
    question: 'What number comes next in the sequence? 1, 4, 9, 16, ?',
    options: ['20', '25', '30', '22'],
    correctAnswer: '25',
    hint: 'Think about square numbers.',
    difficulty: 'easy',
    explanation: 'This question tests your knowledge of square numbers. Each number in the sequence is the square of a consecutive integer: 1^2, 2^2, 3^2, 4^2, and so on.',
  },
  {
    id: 2,
    type: 'logic',
    topic: 'sequences',
    question: 'What comes next in the sequence of letters? A, C, E, G, ?',
    options: ['H', 'I', 'F', 'J'],
    correctAnswer: 'I',
    hint: 'The sequence skips every other letter.',
    difficulty: 'easy',
    explanation: 'This sequence follows the pattern of skipping one letter at a time. A -> C -> E -> G -> I.',
  },
  {
    id: 3,
    type: 'logic',
    topic: 'sequences',
    question: 'What is the next number in the sequence? 2, 5, 10, 17, ?',
    options: ['20', '26', '24', '30'],
    correctAnswer: '26',
    hint: 'The difference between the numbers increases by 2.',
    difficulty: 'medium',
    explanation: 'This is a number sequence where the differences between consecutive terms increase by 2: 5 - 2 = 3, 10 - 5 = 5, 17 - 10 = 7, and the next difference is 9.',
  },
  {
    id: 4,
    type: 'logic',
    topic: 'primes',
    question: 'Which of the following numbers is prime? 15, 17, 21, 25',
    options: ['15', '17', '21', '25'],
    correctAnswer: '17',
    hint: 'A prime number is only divisible by 1 and itself.',
    difficulty: 'easy',
    explanation: 'A prime number has no divisors other than 1 and itself. 17 is the only prime number in the list.',
  },
  {
    id: 5,
    type: 'logic',
    topic: 'operations',
    question: 'What is the result of this operation? 5 + (3 * 2) - 8',
    options: ['5', '3', '10', '11'],
    correctAnswer: '3',
    hint: 'Remember the order of operations (PEMDAS).',
    difficulty: 'easy',
    explanation: 'This question tests your knowledge of the order of operations (PEMDAS). First, you do the multiplication (3 * 2 = 6), then add and subtract in order: 5 + 6 - 8 = 3.',
  },
  {
    id: 6,
    type: 'logic',
    topic: 'operations',
    question: 'Which number is missing in the following equation? 3 * _ = 24',
    options: ['5', '6', '7', '8'],
    correctAnswer: '8',
    hint: 'Think about multiplication.',
    difficulty: 'easy',
    explanation: 'This question tests basic multiplication. To find the missing number, divide 24 by 3: 24 ÷ 3 = 8.',
  },
  {
    id: 7,
    type: 'logic',
    topic: 'sequences',
    question: 'What comes next in the sequence? 1, 1, 2, 3, 5, 8, ?',
    options: ['12', '13', '16', '18'],
    correctAnswer: '13',
    hint: 'This is the Fibonacci sequence.',
    difficulty: 'medium',
    explanation: 'This is the Fibonacci sequence, where each number is the sum of the two preceding ones: 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8, and 5 + 8 = 13.',
  },
  {
    id: 8,
    type: 'logic',
    topic: 'sequences',
    question: 'What is the 5th term of the sequence: 2, 6, 12, 20, ?',
    options: ['30', '32', '36', '40'],
    correctAnswer: '30',
    hint: 'The difference between consecutive terms is increasing by 2 each time.',
    difficulty: 'medium',
    explanation: 'The difference between consecutive terms increases by 2: 6 - 2 = 4, 12 - 6 = 6, 20 - 12 = 8, and the next difference is 10. Thus, 20 + 10 = 30.',
  },
  {
    id: 20,
    type: 'logic',
    topic: 'sequences',
    question: 'Which of the following is the next number in the series? 3, 9, 27, 81, ?',
    options: ['162', '243', '360', '512'],
    correctAnswer: '243',
    hint: 'Each number is multiplied by 3 to get the next number.',
    difficulty: 'hard',
    explanation: 'This is a geometric progression where each number is multiplied by 3 to get the next: 3 * 3 = 9, 9 * 3 = 27, 27 * 3 = 81, and 81 * 3 = 243.',
  },

  // Lista de preguntas sobre listas (desde archivo)
  {
    id: 21,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que pida al usuario un número y verifique si ese número está presente en una lista de números predefinida.',
    options: [],
    correctAnswer: '',
    hint: 'Usa una estructura de control para verificar la pertenencia en la lista.',
    difficulty: 'easy',
    explanation: 'La lógica consiste en usar una instrucción condicional para verificar si el número ingresado está en una lista predefinida.',
  },
  {
    id: 22,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que sume todos los elementos de una lista de números y muestre el resultado.',
    options: [],
    correctAnswer: '',
    hint: 'Usa un bucle para recorrer la lista.',
    difficulty: 'easy',
    explanation: 'Se recorre la lista acumulando la suma en una variable.',
  },
  {
    id: 23,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que recorra una lista de números y muestre solo aquellos que son pares.',
    options: [],
    correctAnswer: '',
    hint: 'Utiliza el operador módulo (%) para identificar los pares.',
    difficulty: 'easy',
    explanation: 'Los números pares se detectan comprobando si el resto al dividir por 2 es 0.',
  },
  {
    id: 24,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que cuente cuántos elementos en una lista son mayores que 50 y muestre ese conteo.',
    options: [],
    correctAnswer: '',
    hint: 'Usa una variable contador y una condición dentro de un bucle.',
    difficulty: 'easy',
    explanation: 'Se cuenta cada elemento que cumple la condición de ser mayor que 50.',
  },
  {
    id: 25,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que encuentre el número mayor en una lista de números y lo muestre.',
    options: [],
    correctAnswer: '',
    hint: 'Mantén una variable con el mayor valor encontrado durante el recorrido.',
    difficulty: 'easy',
    explanation: 'Comparando cada número con el mayor actual se puede obtener el máximo.',
  },
  {
    id: 26,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que tenga una lista de calificaciones de estudiantes y clasifique cada calificación como "Aprobado" (60 o más) o "Reprobado" (menos de 60). Muestra el resultado para cada estudiante.',
    options: [],
    correctAnswer: '',
    hint: 'Usa una estructura condicional para clasificar.',
    difficulty: 'easy',
    explanation: 'Cada elemento se compara con 60 para decidir si está aprobado o reprobado.',
  },
  {
    id: 27,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que tome una lista de elementos y la invierta, mostrando la lista invertida al final.',
    options: [],
    correctAnswer: '',
    hint: 'Utiliza un índice decreciente o una función de inversión.',
    difficulty: 'medium',
    explanation: 'La inversión puede lograrse recorriendo la lista desde el final o usando un método que la invierta directamente.',
  },
  {
    id: 28,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que recorra una lista de números y elimine los duplicados, mostrando la lista resultante sin duplicados.',
    options: [],
    correctAnswer: '',
    hint: 'Utiliza una nueva lista para guardar los elementos únicos.',
    difficulty: 'medium',
    explanation: 'La lista resultante se forma añadiendo solo los elementos que no estén ya en ella.',
  },
  {
    id: 29,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que calcule el promedio de los números en una lista y muestre el resultado.',
    options: [],
    correctAnswer: '',
    hint: 'Suma los elementos y divide entre la cantidad.',
    difficulty: 'easy',
    explanation: 'El promedio se obtiene dividiendo la suma total de los números por la cantidad de elementos.',
  },
  {
    id: 30,
    type: 'syntax',
    topic: 'lists',
    question: 'Escribe un pseudocódigo que verifique si una lista de números está ordenada de menor a mayor.',
    options: [],
    correctAnswer: '',
    hint: 'Compara cada par de elementos consecutivos.',
    difficulty: 'medium',
    explanation: 'Si algún elemento es mayor que el siguiente, la lista no está ordenada.',
  },
];
