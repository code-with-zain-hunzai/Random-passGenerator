import { useCallback, useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef()

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*(){}+_";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

const copyPass = useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500">
      <h1 className='my-3 text-center text-3xl font-bold'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
          value={password}
         ref={passwordRef}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly />
        <button
        onClick={copyPass} 
        className='outline-none bg-blue-700 text-white px-3 py-0.5'>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className='flex items-center gap-x-1'>
          <input type="range"
            min={6}
            max={24}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(parseInt(e.target.value)) }}
          />
          <label htmlFor="">Length:{length}</label>
        </div>
        <div className="flex text-sm gap-x-2">
          <input type="checkbox"
            checked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className="flex text-sm gap-x-2">
          <input type="checkbox"
            checked={charAllowed}
            id='charInput'
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
