const baseUrl = 'http://localhost:3000/';

const createNewBin = async () => {
  const config = {
    method: 'POST'
  }

  const response = await fetch(baseUrl, config);
  return response.json();
}

const getBin = async (binId) => {
  console.log(binId)
  const response = await fetch(`${baseUrl}/${binId}`);
  return response.json();
}

export { createNewBin, getBin }

