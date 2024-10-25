import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import FormData from './components/FormData';
import TableData from './components/TableData';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Users from './components/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
       <Provider store={store}>
      <Router>
        <div   className="relative w-full h-[105vh] bg-cover bg-center bg-[url('./assets/459-background.png')]">
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,50,0.8)] to-[rgba(0,0,50,0.8)]">
      <div className="flex justify-center space-x-4 my-4">
            <Link to="/form" className="bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Show Form
            </Link>
            <Link to="/table" className="bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Show Table
            </Link>
          </div>

          <Routes>
            <Route path='/' element={<Users />} />
            <Route path="/form" element={<FormData />} />
            <Route path="/table" element={<TableData />} />
          </Routes>
      </div>

  
         
        </div>
      </Router>
      <ToastContainer />
    </Provider>
   

  );
}

export default App;
