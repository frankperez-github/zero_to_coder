

interface Question {
    id: string;
    difficulty: 'easy' | 'medium' | 'hard';
    topics: string[];
    text: string;
    options: string[];
    answer: string;
    hint: string;
    explanation: string;
}

export default Question;
