import { useCallback, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(0);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumbers) str += "0123456789";
    if (includeSpecialChars) str += "!@#$%&*(){}+_";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, includeNumbers, includeSpecialChars]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  my-8 text-orange-500 bg-gray-500">
      <h1 className='my-3 text-center text-3xl font-bold'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5'>Copy</button>
      </div>
      
    </div>
  );
}

export default App;
