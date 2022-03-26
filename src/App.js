import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Welcome from './pages/Welcome';
import About from './pages/About';

import Todos from './pages/Todos';
import Footer from './component/Footer';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/about' element={<About />} />
          <Route path='/todo-list' element={<Todos />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
        <Footer />
        <Navbar />
      </Router>
    </>
  );
}

export default App;
