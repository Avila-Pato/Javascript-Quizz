// App.tsx
import { useEffect, useState } from 'react';
import { Container, Stack, Typography, CircularProgress } from '@mui/material';
import './App.css';
import { JavascriptLogo } from './Javascrit.tsx';
import { Start } from './Start.tsx';
import { useQuestionsStore } from './store/question.ts';
import { Game } from './Game.tsx';

function App() {
  const { questions, fetchQuestions } = useQuestionsStore((state) => ({
    questions: state.questions,
    fetchQuestions: state.fetchQuestions,
  }));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      await fetchQuestions(10); // Llama a fetchQuestions con el límite deseado
      setLoading(false);
    };
    loadQuestions();
  }, [fetchQuestions]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <CircularProgress />
          <Typography variant='h6'>Cargando preguntas...</Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavascriptLogo />
          <Typography variant='h2' component='h1'>
            Javascript Quizz
          </Typography>
        </Stack>
        {/* Mostrar Start solo si questions.length es 0 después de la carga */}
        {questions.length === 0 && <Start />}
        {/* Mostrar Game si questions.length es mayor que 0 */}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
