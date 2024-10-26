// Mock credentials for demonstration purposes
const mockUser = {
  username: 'admin',
  password: 'password123',
};

// Function to authenticate user with mock credentials
export const authenticate = (username: string, password: string): boolean => {
  if (username === mockUser.username && password === mockUser.password) {
    // Set user as authenticated (in a real app, you would use a token here)
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

// Function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Function to log out the user
export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
};
