import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti';
import { persist } from 'zustand/middleware'

interface State {
    loading: boolean; // Estado para manejar la carga de las preguntas
    reset: () => void;
    questions: Question[];
    currentQuestion: number;
    fetchQuestions: (limit: number) => Promise<void>;
    selectAnswer: (questionId: number, answerIndex: number) => void;
    goNextQuestion: () => void;
    goPreviousQuestion: () => void;
}

export const useQuestionsStore = create<State>()(persist((set, get) => ({
    questions: [], // Inicializa el array de preguntas vacío
    currentQuestion: 0, // Inicia la primera pregunta
    loading: false, // Estado inicial de carga es falso

    fetchQuestions: async (limit: number) => {
        set({ loading: true }); // Inicia el estado de carga
        const res = await fetch('http://localhost:5173/data.json'); // Obtiene las preguntas del archivo JSON
        const json = await res.json();

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit); // Ordena aleatoriamente y selecciona un límite de preguntas
        set({ questions, loading: false }); // Actualiza el estado con las preguntas y desactiva el estado de carga
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
        const { questions } = get();
        const newQuestions = structuredClone(questions); // Clona profundamente el array de preguntas
        const questionIndex = newQuestions.findIndex(q => q.id === questionId); // Encuentra la pregunta seleccionada por ID
        const questionInfo = newQuestions[questionIndex];
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex; // Verifica si la respuesta seleccionada es correcta

        if (isCorrectUserAnswer) confetti(); // Muestra confetti si la respuesta es correcta

        newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex
        };
        set({ questions: newQuestions }); // Actualiza el estado global con la respuesta seleccionada
    },

    goNextQuestion: () => {
        const { currentQuestion, questions } = get();
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion }); // Avanza a la siguiente pregunta si existe
        }
    },

    goPreviousQuestion: () => {
        const { currentQuestion } = get();
        const previousQuestion = currentQuestion - 1;
        if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion }); // Retrocede a la pregunta anterior si es posible
        }
    },

    reset: () => {
        set({ questions: [], currentQuestion: 0 }); // Reinicia el estado global a su valor inicial
    }
}), {
    name: 'questions' // Guarda el estado en localStorage con la clave 'questions'
}));
