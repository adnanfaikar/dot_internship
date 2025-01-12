import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../utils/api';
import Question from './Question';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(1000);

    useEffect(() => {
        const loadQuestions = async () => {
            const data = await fetchQuestions();
            setQuestions(data);
        };
        loadQuestions();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) setScore((prev) => prev + 1);
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    if (timer === 0 || currentQuestionIndex >= questions.length) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Finished</h2>
                    <p className="text-lg text-gray-700 mb-2">Score: {score}</p>
                    <p className="text-gray-600">
                        Answered: {currentQuestionIndex}/{questions.length}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz</h2>
                <p className="text-gray-600 mb-4">Time Left: {timer}s</p>
                {questions.length > 0 && (
                    <>
                        <p className="text-gray-600 mb-4">
                            Question {currentQuestionIndex + 1}/{questions.length}
                        </p>
                        <Question
                            question={questions[currentQuestionIndex]}
                            onAnswer={handleAnswer}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Quiz;
