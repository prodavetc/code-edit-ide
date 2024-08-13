'use client';
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sublime } from '@uiw/codemirror-theme-sublime'

function Home() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return (
    <main className='grid grid-rows-[auto_auto_1fr] grid-cols-2 h-screen'>
      <CodeMirror 
        theme={sublime} 
        value={value} 
        height="600px" 
        extensions={[javascript({ jsx: true })]} 
        onChange={onChange}
        className='[&_.cm-content]:text-2xl [&_.cm-tooltip-autocomplete]:text-2xl' 
      />
    </main>
  );
}
export default Home;
