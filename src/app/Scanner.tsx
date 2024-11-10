import { useState, useEffect } from 'react';

export function Scanner() {
  const [keyboardInput, setKeyboardInput] = useState('');
  const [clipboardInput, setClipboardInput] = useState('');
  const [cursorInput, setCursorInput] = useState('');

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setKeyboardInput(prev => prev + event.key);
    };

    const handlePaste = (event: ClipboardEvent) => {
      const paste = event.clipboardData?.getData('text') || '';
      setClipboardInput(paste);
    };

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      setCursorInput(target.value);
    };

    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('paste', handlePaste);
    document.addEventListener('input', handleInput);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('paste', handlePaste);
      document.removeEventListener('input', handleInput);
    };
  }, []);

  return (
    <div className={"border border-gray-400 rounded-md p-6 w-full"}>
    <h2>Scanner</h2>
    <div>
      <h3>Keyboard event:</h3>
      <p>{keyboardInput}</p>
    </div>
    <div>
      <h3>Clipboard event:</h3>
      <p>{clipboardInput}</p>
    </div>
    <div>
      <h3>Cursor event:</h3>
      <p>{cursorInput}</p>
    </div>
    </div>
  );
}
