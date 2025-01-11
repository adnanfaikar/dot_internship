import React from 'react';

const Question = ({ question, onAnswer }) => {
    const { question: text, correct_answer, incorrect_answers } = question;
    const options = [correct_answer, ...incorrect_answers].sort();

    const handleAnswer = (answer) => {
        onAnswer(answer === correct_answer);
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                {text}
            </h3>
            <div className="w-full flex flex-col space-y-3">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
