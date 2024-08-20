import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { type Question as QuestionType } from './types.d';
import { useQuestionsStore } from "./store/question";
import SyntaxHighLighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";



const Question = ({info}: {info: QuestionType}) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    // marcar si el usuario a seleccionado la respuesta correcta por color

    const getBackgroundColor = (index: number) => {
        const { userSelectedAnswer, correctAnswer } = info
        // usuario no ha seleccionado nada todavia
        if (userSelectedAnswer == null) return 'transparent'
        // si ya selecciono pero la selecciono incorrecta
        if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
        // si esta es la seleccion correcta
        if (index === correctAnswer) return 'green'
        // si esta es la seleccion incorrecta
        if (index === userSelectedAnswer) return 'red'
        // si no es ninguna de las anteriores
        return 'transparent'
    }

    return (
        <Card variant="outlined" sx={{bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4}}>

        <Typography variant="h5">
            {info.question}
        </Typography>
        {/* // el codigo que se va a mostrar en el codigo en una consola */}
        <SyntaxHighLighter language="javascript" style={gradientDark}>
            {info.code}
        </SyntaxHighLighter>

        <List sx={{bgcolor: '#333'}} disablePadding>
        {info.answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
                <ListItemButton 
                // desabilitar el boton cuando ya se ha seleccionado una respuesta
                disabled={info.userSelectedAnswer != null}
                onClick={createHandleClick(index)}
                sx={{
                    bgcolor: getBackgroundColor(index)
                }}>
                    <ListItemText primary={answer}  sx={{textAlign: 'center'}} />
                </ListItemButton>
                </ListItem>
                 ))}
        </List>

        </Card>
    )
}

export const Game = () => {
    // recuperar las questions(inforamcion de las preguntas)
    const questions = useQuestionsStore(state => state.questions)
    // recuperar la pregunta actual
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)

    // Paginacion 
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
    



    const questionInfo = questions[currentQuestion]
   
    return (
        <>
        {/* // renderizar  el gont next y go previous */}
        <Stack direction="row" gap={2} alignItems='center' justifyContent="center">
            <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                <ArrowBackIosNew />
                </IconButton>

                {/* // mostrar el numero de la pregunta actual y el total de preguntas */}
                {currentQuestion + 1} / {questions.length}

                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= 
                    questions.length - 1 }>
                <ArrowForwardIos />
                    </IconButton>
             </Stack>
        <Question info={questionInfo} />
        <Footer />
        </>
    )
}