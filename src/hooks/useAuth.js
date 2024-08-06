import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  const Logout = async () => {
    try {
      await signOut(auth);
      navigate('/')
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return {currentUser, Logout}
}

export default useAuth