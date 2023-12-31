import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';
import MyOrders from './screens/MyOrders';
import ForgotPassword from './screens/ForgotPassword.js';
import ResetPassword from './screens/ResetPassword.js';
function App() {
  return (
    <CartProvider>

    <Router>
    <div id='main'>
      <Routes>
        <Route exact path = '/' element={<Home/>}></Route>
        <Route exact path = '/login' element={<Login/>}></Route>
        <Route exact path = '/signup' element={<Signup/>}></Route>
        <Route exact path = '/forgotpassword' element={<ForgotPassword/>}></Route>
        <Route exact path = '/resetpassword/:token' element={<ResetPassword/>}></Route>
        <Route exact path = '/cart' element={<Cart/>}></Route>
        <Route exact path = '/myorders' element={<MyOrders/>}></Route>
      </Routes>

    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
