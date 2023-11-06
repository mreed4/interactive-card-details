import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import CompletePage from "./CompletePage";
import StartPage from "./StartPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/complete" element={<CompletePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
