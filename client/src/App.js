import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Main from './Components/Main';
import Register from './Components/Register';
import PrivateRoute from './Private/Private';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {/* protected User Routes  */}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="" element={<Main />} />
      </Route>
      {/* protected User Routes Ends  */}
    </Routes>
  );
}

export default App;
