import { useState, useEffect } from 'react';
import './admin.css';

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';

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

import InxepaLogo from '../../assets/images/logo3.svg';

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('');
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

  async function handleLogout() {
    await signOut(auth);
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

      {/* <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        {Object.keys(edit).length > 0 ? (
          <button className="btn-register" type="submit">
            Atualizar tarefa
          </button>
        ) : (
          <button className="btn-register" type="submit">
            Registrar tarefa
          </button>
        )}
      </form> */}

      {tarefas.map((item) => (
        <article key={item.id} className="list">
          <p>Nome: {item.name}</p>
          <p>Telefone: {item.phone}</p>
          <p>Email: {item.email}</p>
        </article>
      ))}

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
