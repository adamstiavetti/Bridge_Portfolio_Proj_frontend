
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import ProjectPage from "./components/project-page.tsx";
import ProjectForm from "./components/project-form.tsx";

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<ProjectPage/>}/>
            <Route path="/new" element={<ProjectForm/>}/>
            <Route path="/edit/:id" element={<ProjectForm/>}/>
        </Routes>
    </Router>
  )
}

export default App
