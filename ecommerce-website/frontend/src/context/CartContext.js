import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  total: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, token } = useAuth();

  // Calculate total whenever items change
  useEffect(() => {
    const total = state.items.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
    
    if (state.total !== total) {
      // Only dispatch if total actually changed to avoid infinite loops
      setTimeout(() => {
        dispatch({ type: 'SET_TOTAL', payload: total });
      }, 0);
    }
  }, [state.items, state.total]);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user && token) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [user, token]);

  const fetchCart = async () => {
    if (!token) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Error fetching cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch cart' });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      dispatch({ type: 'SET_ERROR', payload: 'Please login to add items to cart' });
      return { success: false, message: 'Please login to add items to cart' };
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        productId,
        quantity
      });
      dispatch({ type: 'SET_CART', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add item to cart';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!token) return;

    try {
      const response = await axios.put('http://localhost:5000/api/cart/update', {
        productId,
        quantity
      });
      dispatch({ type: 'SET_CART', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`);
      dispatch({ type: 'SET_CART', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const clearCart = async () => {
    if (!token) return;

    try {
      await axios.delete('http://localhost:5000/api/cart/clear');
      dispatch({ type: 'CLEAR_CART' });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartItemCount,
    total: state.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};