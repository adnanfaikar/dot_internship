import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Quiz from './components/Quiz';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/quiz" element={<Quiz />} />
            </Routes>
        </Router>
    );
};

export default App;

// import React from 'react';

// const App = () => {
//   return (
//     <div className="bg-blue-500 text-white p-4 text-center">
//       <h1 className="text-2xl font-bold">Hello, Tailwind CSS!</h1>
//     </div>
//   );
// };

// export default App;
