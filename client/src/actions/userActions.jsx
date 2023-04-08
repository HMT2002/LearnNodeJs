export const SignInAction = async (userData) => {
  const response = await fetch('/api/v1/users/signin', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  // console.log(response_data);
  return data;
};
export const SignUpAction = async (userData) => {
  const response = await fetch('/api/v1/users/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
};
