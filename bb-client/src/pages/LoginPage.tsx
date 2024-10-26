import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { User } from '../types/User';
import axios from 'axios';
import GoogleButton from 'react-google-button';

const LoginPage: React.FC = () => {
  const { setProfile } = useUser();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState<string | null>(null);

  // Set up Google login
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUserToken(tokenResponse.access_token),
    onError: (error) => console.error('Google Login Failed:', error),
  });

  // Fetch user profile if token is available
  useEffect(() => {
    if (userToken) {
      axios
        .get<User>(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userToken}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          const userProfile: User = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            picture: res.data.picture,
          };
          setProfile(userProfile);
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/dashboard'); // Redirect to dashboard after login
        })
        .catch((err) => console.error('Error fetching user profile:', err));
    }
  }, [userToken, navigate, setProfile]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-primary">Log In</h2>
        <GoogleButton onClick={() => login()} label="Sign in with Google" />
      </div>
    </div>
  );
};

export default LoginPage;
