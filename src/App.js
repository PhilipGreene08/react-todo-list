import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Profile from './pages/Profile';
import Todos from './pages/Todos';
import Footer from './component/Footer';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/about' element={<About />} />
          <Route path='/todo-list' element={<Todos />} />

          <Route path='/profile' element={<Profile />} />

          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
