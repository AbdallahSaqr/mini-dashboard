import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const getStoredUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const storeUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const generateMockToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp: Date.now() + 3600000 
  }));
  const signature = btoa('mock-signature'); // In real apps, this would be cryptographically signed
  return `${header}.${payload}.${signature}`;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved token on mount
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp > Date.now()) {
          const users = getStoredUsers();
          const foundUser = users.find(u => u.email === payload.email);
          if (foundUser) {
            setUser(foundUser);
          }
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getStoredUsers();
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      return {
        success: false,
        error: 'Email already registered'
      };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Store user
    users.push(newUser);
    storeUsers(users);

    return { 
      success: true,
      message: 'Account created successfully! Please login to continue.'
    };
  };

  const login = async (email, password) => {
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getStoredUsers();
    const foundUser = users.find(u => u.email === email);

    if (foundUser && foundUser.password === password) {
      const token = generateMockToken(foundUser);
      localStorage.setItem('token', token);
      setUser(foundUser);
      return { success: true };
    }
    
    return { 
      success: false, 
      error: 'Invalid email or password'
    };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    register,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
