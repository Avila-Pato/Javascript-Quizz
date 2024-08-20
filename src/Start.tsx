import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/question";

const LIMIT_QUESTIONS = 15;

export const  Start = () => {

    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

    const handleClick = () => {
        // fetchQuestions(10) me traera 10 preguntas
        fetchQuestions(LIMIT_QUESTIONS)
    }

    return (
        <Button onClick={handleClick} variant="contained" color="primary" size="large">
        Empezar
        </Button>
       
    );
}