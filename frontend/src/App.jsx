import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Achievements from './pages/Achievements'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Services from './pages/Services'
import ScrollToTop from './components/ScrollToTop'
import ProjectDetail from './pages/ProjectDetail'
import ProjectForm from './pages/ProjectForm'


function App() {


  return (
    <>
    <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/achievements' element={<Achievements />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services key={location.pathname}/>} />
        <Route path="/projects/:slug" element={<ProjectDetail/>} />
        <Route path="/add-project" element={<ProjectForm/>} />
      </Routes>
    </>
  )
}

export default App
