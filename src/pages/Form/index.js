import { useState, useEffect } from 'react';
// import './admin.css';

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import InxepaLogo from '../../assets/images/logo3.svg';

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

export default function Form() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState({});

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const tarefaRef = collection(db, 'infos');
      const q = query(tarefaRef, orderBy('created', 'desc'));

      const unsub = onSnapshot(q, (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            phone: doc.data().phone,
            email: doc.data().email,
            userUid: doc.data().userUid,
          });
        });
        setTarefas(lista);
      });
    }

    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (name === '') {
      alert('Digite seu nome...');
      return;
    }

    await addDoc(collection(db, 'infos'), {
      name: name,
      phone: phone,
      email: email,
      created: new Date(),
      //   userUid: user?.uid,
    })
      .then(() => {
        alert('Cadastro Realizado');
        setName('');
        setPhone('');
        setEmail('');
      })
      .catch((error) => {
        alert('ERRO AO REGISTRAR ' + error);
      });
  }

  return (
    <div className="admin-container">
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

      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Digite seu nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Digite seu telefone..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="btn-register"
          type="submit "
          style={{ backgroundColor: '#930003' }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
