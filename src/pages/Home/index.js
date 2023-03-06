import { useState } from 'react';
import './home.css';

import { Link } from 'react-router-dom';

import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import InxepaLogo from '../../assets/images/logo3.svg';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // navegar para /admin
          navigate('/dashboard', { replace: true });
        })
        .catch(() => {
          alert('ERRO AO FAZER O LOGIN');
        });
    } else {
      alert('Preencha todos os campos!');
    }
  }

  return (
    <div className="home-container">
      <img
        alt="Logo"
        src={InxepaLogo}
        className=" w-500px d-flex justify-content-center align-items-center"
        style={{
          width: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />

      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" style={{ backgroundColor: '#930003' }}>
          Acessar
        </button>
      </form>
    </div>
  );
}
