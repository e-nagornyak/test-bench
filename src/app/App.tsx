import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Scanner } from './Scanner';
import { CashRegister } from './CashRegister';

function App() {
  return (
    <Router>
    <div className="flex flex-col mx-auto border border-gray-400 rounded-md shadow-md items-center gap-6 size-full">
    <h1>Sh Bench</h1>
    <nav className="flex space-x-4 p-4">
      <Link to="/" className="text-blue-500 p-2 border border-gray-400 rounded-md hover:underline">Scanner</Link>
      <Link to="/cash-register" className="text-blue-500 p-2 border border-gray-400 rounded-md hover:underline">Cash Register</Link>
    </nav>
    <div className="size-full space-y-6 p-6">
      <Routes>
        <Route path="/" element={<Scanner />} />
        <Route path="/cash-register" element={<CashRegister />} />
      </Routes>
    </div>
    </div>
    </Router>
  );
}

export default App;
