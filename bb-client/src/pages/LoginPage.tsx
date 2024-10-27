import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import GoogleButton from 'react-google-button';

const LoginPage: React.FC = () => {
  const { setProfile } = useUser();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Google login setup
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUserToken(tokenResponse.access_token),
    onError: (error) => console.error('Google Login Failed:', error),
  });

  // Function to fetch user profile
  const fetchUserProfile = async (token: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userProfile = {
        id: data.id,
        name: data.name,
        email: data.email,
        picture: data.picture,
      };
      setProfile(userProfile);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard'); // Redirect after login
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile if token is available
  useEffect(() => {
    if (userToken) fetchUserProfile(userToken);
  }, [userToken]);

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-3">
      {/* Login Section */}
      <div className="col-span-1 h-full z-20 flex flex-col items-center justify-center bg-background">
        <div className="absolute top-3 left-3 text-2xl font-bold">
          BætteryBrainz
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold mb-6 text-primary">Log In</h2>
          <GoogleButton onClick={() => login()} label="Sign in with Google" />
          {loading && <p className="text-gray-500 mt-4">Loading...</p>}
        </div>
      </div>

      {/* Background Image Section */}
      <div className="col-span-2 relative">
        <img
          src={`${process.env.PUBLIC_URL}/login.webp`}
          alt="Login Background"
          className="h-screen w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
    </div>
  );
};

export default LoginPage;
