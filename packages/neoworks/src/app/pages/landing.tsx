import { useState, useContext } from 'react';

import { AuthContext } from '../context/authContext';

export function Landing() {
  const { signInWithEmail } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = () => {
    signInWithEmail(username, password);
  };
  return (
    <div>
      <h1>Welcome to Neoworks</h1>
      <div>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        Password:{' '}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}
