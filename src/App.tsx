

import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavascriptLogo } from './Javascrit.tsx'
import { Start } from './Start.tsx'
import { useQuestionsStore } from './store/question.ts'
import { Game } from './Game.tsx'

function App() {

// aqui el fect se esta ejecutando en el momento que se renderiza el juego
const questions = useQuestionsStore(state => state.questions)
console.log(questions)

  return (
    <main>
      <Container maxWidth="sm">
       <Stack direction='row' gap={2} alignItems='center' justifyContent= 'center'>
      <JavascriptLogo />
        <Typography variant='h2' component= 'h1' >
       Javascript Quizz
           </Typography>
       </Stack>

       { questions.length === 0 && <Start />}
      { questions.length > 0 && <Game />}
      </Container>
    </main>
  
  )
}

export default App
