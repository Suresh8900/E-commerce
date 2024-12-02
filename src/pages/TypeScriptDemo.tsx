import React, { useState } from 'react';


const TypeScriptDemo: React.FC = () => {
 
  const [count, setCounter] = useState<number>(0);

  const handleCounter = (): void => {
    setCounter((prevCount) => prevCount + 1);
  
  };
  const names:string[] =['y','n'];
  return ( 
    <div className='flex flex-col border'>
      <div className='flex border-1 gap-5 border-gray-200 p-2'>
        <p>{count}</p>
        <button onClick={handleCounter}>Increment</button> 
      </div>
      {names.map((currentItem: string, index: number) => (
        <p key={index}>{currentItem}</p> 
      ))}

    </div>
  );
};

export default TypeScriptDemo;
