
import './App.css';
import Layout from './Components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
     <Layout/>
     <ToastContainer />
    </div>
  );
}

export default App;
