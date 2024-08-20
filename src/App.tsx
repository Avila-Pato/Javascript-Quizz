import { Container, Stack, Typography, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import './App.css';
import { JavascriptLogo } from './Javascrit.tsx';
import { Start } from './Start.tsx';
import { useQuestionsStore } from './store/question.ts';
import { Game } from './Game.tsx';
import { useQuestionsData } from './assets/hooks/QuestionsData.tsx';

function App() {
  const { questions, loading } = useQuestionsStore(state => ({
    questions: state.questions,
    loading: state.loading
  }));

  const { unanswer } = useQuestionsData();
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up("md"));

    console.log("Questions length:", questions.length);
    console.log("Unanswered questions:", unanswer);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <JavascriptLogo />
          <Typography variant={medium ? 'h2' : 'h5'} component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>
        
        {loading && <CircularProgress />} {/* Muestra un spinner mientras se cargan las preguntas */}
        
        {!loading && questions.length === 0 && <Start />} {/* Muestra el botón de inicio si no hay preguntas cargadas */}
        
        {!loading && questions.length > 0 && unanswer > 0 && <Game />} {/* Muestra el juego si hay preguntas cargadas */}
      </Container>
    </main>
  );
}

export default App;
