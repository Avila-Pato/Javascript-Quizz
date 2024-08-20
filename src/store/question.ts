import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti';

// describe como es el estado 
interface State {
    questions: Question[]
    currentQuestion: number
    // como va a ser asicncrona va a devolder una promesa
    fetchQuestions: (limit: number) => Promise<void>,
    selectAnswer: (questionId: number, answerIndex: number) => void,
    goNextQuestion: () => void,
    goPreviousQuestion: () => void
}


// Con esto ya estamos creando el estado global de la web 
// set es para actualizar el estado, get para leer el estado
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useQuestionsStore = create<State>((set, get) => {
    return {
        questions: [],
        // currentQuestion: 0, es la primera pregunta de donde empezara 
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
            // el get devuelve el objeto  desde el return hasta abajo
            const { questions }= get()
            // usar el strucTure clone para clonar el objeto de manera profunda
            const newQuestions = structuredClone(questions)
            //encontrar el indice de la pregunta 
            const questionIndex = newQuestions.findIndex(
                (q) => q.id === questionId
            )
            // obtener la informacion de la pregunta
            const questionInfo = newQuestions[questionIndex]
            // averiguar si el usuario a seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            // si es correcta mostrar confetti
            if (isCorrectUserAnswer) confetti()
            // cambiar esta informacion en la copia de la pegunta 
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            // actualizar el estado global
            set({ questions: newQuestions })

        },
        // ir hacia la otra pregunta

        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if(nextQuestion < questions.length){
                set({currentQuestion: nextQuestion})
            }
        },

        goPreviousQuestion: () => {
            const { currentQuestion, questions } = get()
            const previousQuestion = currentQuestion - 1

            if(previousQuestion < questions.length){
                set({currentQuestion: previousQuestion})
            }
        }
    }

})