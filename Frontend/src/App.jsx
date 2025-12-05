import Landing from './pages/landing'
import About from './pages/about'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/about' element={<About/>} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
