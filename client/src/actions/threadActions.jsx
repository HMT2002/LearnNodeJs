export const getThread = async (slug) => {
  const response = await fetch('/api/v1/threads/' + slug);
  const data = await response.json();
  return data;
};

export const getAllThread = async () => {
  const storedToken = localStorage.getItem('token');

  const response = await fetch('/api/v1/threads', {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: storedToken,
    },
  });
  if (!response.status || response.status === 'error') {
    throw new Error('Something went wrong!');
  }
  const data = await response.json();
  //   console.log(data);
  return data;
};
export const postThread = () => {};
