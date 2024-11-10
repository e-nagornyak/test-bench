
type DataFormat = 'JSON' | 'XML';

export const sendPosnetRequest = async (ip: string, port: string, data: any, format: DataFormat): Promise<string> => {
  const convertToXML = (obj: any): string => {
    let xml = '';
    for (const prop in obj) {
      xml += obj[prop] instanceof Array
        ? obj[prop].map((item: any) => `<${prop}>${convertToXML(item)}</${prop}>`).join('')
        : `<${prop}>${typeof obj[prop] === 'object' ? convertToXML(obj[prop]) : obj[prop]}</${prop}>`;
    }
    return xml;
  };

  let dataToSend: string;
  if (format === 'XML') {
    dataToSend = convertToXML(data);
  } else {
    dataToSend = JSON.stringify(data, null, 2);
  }

  try {
    const response = await fetch(`http://${ip}:${port}/api/posnet`, {
      method: 'POST',
      headers: {
        'Content-Type': format === 'XML' ? 'application/xml' : 'application/json',
      },
      body: dataToSend,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = format === 'XML' ? await response.text() : await response.json();
    return format === 'XML' ? responseData : JSON.stringify(responseData, null, 2);
  } catch (err) {
    throw new Error(`Failed to send data: ${err.message}`);
  }
};
