import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCart } from '../app/features/cart/cartSlice'
import { clearFavorite } from '../app/features/favorite/favoriteSlice'

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate();
  const dispatch = useDispatch()
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
      dispatch(clearCart([]));
      dispatch(clearFavorite([]))
      navigate('/')
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return {currentUser, Logout}
}

export default useAuth