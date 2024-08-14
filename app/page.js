'use client';
import { useState, useEffect, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sublime } from '@uiw/codemirror-theme-sublime'
import { Console, Hook, Unhook } from 'console-feed'


function Home() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([])

  


  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    )
    return () => Unhook(hookedConsole)
  }, [])

  const onChange = useCallback((val, viewUpdate) => {
    // console.log('val:', val);
    setInput(val);
  }, []);

  const runCode = () => {
    try {
      eval(input);
    } catch (error) {
      console.error(error);
    }
  }

  const clearConsole = () => {
    setLogs([]);
  }


  return (
    <main className='grid grid-rows-[auto_auto_1fr] grid-cols-2 h-screen' 
      onKeyDown={ (e) => { e.ctrlKey && e.key === "Enter" && runCode() } }>
      <div className='row-span-1 col-span-2 bg-gray-200'>Banner</div>
      <div className='row-span-1 col-span-1 bg-gray-400 py-2 ps-2'>
        <button
          className='px-4 text-2xl bg-blue-300 rounded-md hover:bg-blue-500'
         onClick={runCode}>
          Run
        </button>
      </div>
      <div className='row-span-1 col-span-1 bg-gray-400 py-2 ps-2'>
      <button
          className='px-4 text-2xl bg-blue-300 rounded-md hover:bg-blue-500'
         onClick={clearConsole}>
          Clear
        </button>
      </div>
      
      <CodeMirror 
        theme={sublime} 
        value={input} 
        height="100%" 
        extensions={[javascript({ jsx: true })]} 
        onChange={onChange}
        className='w-full row-span-1 col-span-1 [&_.cm-content]:text-2xl [&_.cm-tooltip-autocomplete]:text-2xl' 
      />
      <div className='w-full row-span-1 col-span-1 bg-gray-900'>
        <Console logs={logs} variant="dark" styles={{BASE_FONT_SIZE: 'px'}} />
      </div>
    </main>
  );
}
export default Home;
