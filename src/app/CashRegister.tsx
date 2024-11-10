import { useState } from 'react';
import { sendPosnetRequest } from './posnetRequest';

const sampleData = {
  sale: {
    id: "12345",
    items: [
      {name: "Item 1", quantity: 1, price: 10},
      {name: "Item 2", quantity: 2, price: 20},
    ],
    total: 50
  },
  report: {
    id: "report-001",
    sales: 100,
    revenue: 5000
  }
};

export function CashRegister() {
  const [format, setFormat] = useState<'JSON' | 'XML'>('JSON');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [sentData, setSentData] = useState('');
  const [receivedData, setReceivedData] = useState('');
  const [error, setError] = useState('');

  const handleSendData = async () => {
    try {
      const dataToSend = format === 'XML' ? convertToXML(sampleData) : JSON.stringify(sampleData, null, 2);
      setSentData(dataToSend);

      const response = await sendPosnetRequest(ip, port, sampleData, format);
      setReceivedData(response);
      setError('');
    } catch (err: any) {
      setError(`Failed to send data: ${err?.message}`);
      setReceivedData('');
    }
  };

  const convertToXML = (obj: any): string => {
    let xml = '';
    for (const prop in obj) {
      xml += obj[prop] instanceof Array
        ? obj[prop].map((item: any) => `<${prop}>${convertToXML(item)}</${prop}>`).join('')
        : `<${prop}>${typeof obj[prop] === 'object' ? convertToXML(obj[prop]) : obj[prop]}</${prop}>`;
    }
    return xml;
  };

  return (
    <div className={"border border-gray-400 rounded-md p-6 w-full"}>
    <h2>Cash Register</h2>
    <div className="my-4">
    <label htmlFor="ip" className="block mb-2">IP Address:</label>
    <input
      id="ip"
      type="text"
      value={ip}
      onChange={(e) => setIp(e.target.value)}
      className="border rounded p-2 w-full"
      placeholder="Enter IP Address"
    />
    </div>
    <div className="my-4">
    <label htmlFor="port" className="block mb-2">Port:</label>
    <input
      id="port"
      type="text"
      value={port}
      onChange={(e) => setPort(e.target.value)}
      className="border rounded p-2 w-full"
      placeholder="Enter Port"
    />
    </div>
    <div className="my-4">
      <label htmlFor="format" className="block mb-2">Select Data Format:</label>
      <select id="format" value={format} onChange={(e) => setFormat(e.target.value)} className="border rounded p-2 w-full">
        <option value="JSON">JSON</option>
        <option value="XML">XML</option>
      </select>
    </div>
    <button onClick={handleSendData} className="bg-blue-500 text-white py-2 px-4 rounded">Send Data</button>
    {error && <div className="my-4 text-red-500">{error}</div>}
    <div className="my-4">
      <h3>Sent Data ({format}):</h3>
      <pre className="border border-gray-500 p-2 rounded">{sentData}</pre>
    </div>
    <div className="my-4">
      <h3>Received Data:</h3>
      <pre className="border border-gray-500 p-2 rounded">{receivedData}</pre>
    </div>
    </div>
  );
}
