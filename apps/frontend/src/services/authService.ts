export const registerUser = async (userData: any) => {
  const response = await fetch('http://localhost:3001/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en el registro de usuario');
  }

  return response.json();
};

export const loginUser = async (credentials: any) => {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en el inicio de sesión');
  }

  const data = await response.json();
  
  if (data.data && data.data.token) {
    localStorage.setItem('token', data.data.token);
    if (data.data.user) {
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
  }

  return data.data;
};
