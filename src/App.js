import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Read from "./components/Read";
import Update from "./components/Update";
import Create from "./components/Create";


function App() {


  return (
  <>
      <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Read />} />
          <Route path="/update/:userId" element={<Update  />} />
          <Route path="/create" element={<Create  />} />

        </Routes>
      </Router>
    </div>
     </>

  );
}

export default App;
