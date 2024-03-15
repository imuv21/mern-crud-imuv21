import './App.css';
import './components/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComp from './components/PrivateComp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Universities from './components/Universities';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>

          <Route element={<PrivateComp />}>
            <Route path='/' element={< ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/logout' element={<h2>Logout Product</h2>} />
            <Route path='/profile' element={<h2>Profile Product</h2>} />
          </Route>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/universities' element={<Universities />} />
          
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}
export default App