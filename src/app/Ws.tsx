import React, { useEffect, useState } from 'react';

const CashRegisterComponent = ({ ipAddress }) => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState('Disconnected');

  useEffect(() => {
    // Створення WebSocket-з'єднання при завантаженні компонента
    const ws = new WebSocket(`ws://${ipAddress}`);

    // Встановлення з'єднання
    ws.onopen = () => {
      console.log("WebSocket з'єднано з касою.");
      setStatus('Connected');
      sendTestPrint(ws);
    };

    // Обробка повідомлень
    ws.onmessage = (event) => {
      console.log("Отримано повідомлення:", event.data);
    };

    // Закриття з'єднання
    ws.onclose = () => {
      console.log("WebSocket з'єднання закрито.");
      setStatus('Disconnected');
    };

    // Обробка помилок
    ws.onerror = (error) => {
      console.error("WebSocket помилка:", error);
      setStatus('Error');
    };

    // Збереження з'єднання
    setSocket(ws);

    // Закриття WebSocket при відмонтованні компонента
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [ipAddress]);

  const sendTestPrint = (ws) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const testPrintCommand = JSON.stringify({
        command: "print",
        data: "Тестовий друк",
      });
      ws.send(testPrintCommand);
      console.log("Тестовий друк надіслано.");
    } else {
      console.error("WebSocket з'єднання не встановлено.");
    }
  };

  return (
    <div>
      <h3>Cash Register WebSocket Component</h3>
      <p>Status: {status}</p>
      <button onClick={() => sendTestPrint(socket)}>Send Test Print</button>
    </div>
  );
};

export default CashRegisterComponent;
