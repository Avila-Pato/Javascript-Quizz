

// desde aqui se renderizara la customHooks
import { useQuestionsStore } from './../../store/question';

export const useQuestionsData = () => {
    const questions = useQuestionsStore(state => state.questions)

    let correct = 0
    let incorrect = 0
    let unanswer = 0
    

    questions.forEach(question => {
        const { userSelectedAnswer, correctAnswer } = question
        if(userSelectedAnswer == null) unanswer++
        else if(userSelectedAnswer === correctAnswer) correct++
        else incorrect++
    })
    return {correct, incorrect, unanswer, questions}
}