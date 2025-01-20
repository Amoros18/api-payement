'use client'
// src/app/page.tsx
import { useEffect, useState } from 'react';
import type { User } from '../../lib/definitions';

const users: User[] = [
    { id: 1, name: 'John Doe', email: '', password: '' },
    { id: 2, name: 'John Doe', email: '', password: '' },
    // Ajoutez d'autres utilisateurs ici
  ];
export default function Home() {
  // var [users, setUsers] = useState<User[]>([]);
  // var users =  [
  //   { id: 1, name: 'John Doe', email: '', password: '' },
  //   { id: 2, name: 'John Doe', email: '', password: '' },
  //   // Ajoutez d'autres utilisateurs ici
  // ];


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await fetch('/api/users');
  //     const data = await response.json();
  //     setUsers(data);
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}