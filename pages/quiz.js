/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

function QuestionWidget({ question, totalQuestions, questionIndex, onSubmit }) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Questão ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <h2>{question.title}</h2>
          <p>{question.description}</p>

          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
              >
                <input id={alternativeId} name={questionId} type="radio" />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit">Confirmar</Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = db.questions[currentQuestion];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleQuizSubmit() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={currentQuestion}
            totalQuestions={totalQuestions}
            onSubmit={handleQuizSubmit}
          />
        )}

        {screenState === screenStates.LOADING && <div>Loading...</div>}

        {screenState === screenStates.RESULT && (
          <div>Vc acertou X, parabén bichão...</div>
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
