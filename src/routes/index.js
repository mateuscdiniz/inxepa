import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Admin from '../pages/Admin';

import Private from './Private';
import Form from '../pages/Form';

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <Private>
            {' '}
            <Admin />{' '}
          </Private>
        }
      />
    </Routes>
  );
}

export default RoutesApp;
