
import './App.css';
import Layout from './Components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
    
     <Routes>
     <Route path="/login" element={<Login/>}></Route>
     <Route path="*" element={<Layout />} />
     </Routes>
     
     <ToastContainer />
    </div>
  );
}

export default App;
