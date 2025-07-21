import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const initialState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  pagination: null,
  filters: {
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    sort: 'newest'
  }
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload.products,
        pagination: action.payload.pagination,
        isLoading: false,
        error: null
      };
    case 'SET_FEATURED_PRODUCTS':
      return {
        ...state,
        featuredProducts: action.payload,
        isLoading: false,
        error: null
      };
    case 'SET_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: action.payload,
        isLoading: false,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'CLEAR_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: null
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = async (page = 1, filters = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...filters
      });

      const response = await axios.get(`http://localhost:5000/api/products?${params}`);
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch products' });
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/featured');
      dispatch({ type: 'SET_FEATURED_PRODUCTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching featured products:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch featured products' });
    }
  };

  const fetchProductById = async (productId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      dispatch({ type: 'SET_CURRENT_PRODUCT', payload: response.data });
    } catch (error) {
      console.error('Error fetching product:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch product' });
    }
  };

  const searchProducts = async (searchTerm, filters = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        page: '1',
        limit: '12',
        ...filters
      });

      const response = await axios.get(`http://localhost:5000/api/products?${params}`);
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (error) {
      console.error('Error searching products:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to search products' });
    }
  };

  const updateFilters = (newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  const clearCurrentProduct = () => {
    dispatch({ type: 'CLEAR_CURRENT_PRODUCT' });
  };

  const addReview = async (productId, rating, comment) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/products/${productId}/reviews`, {
        rating,
        comment
      });
      dispatch({ type: 'SET_CURRENT_PRODUCT', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add review';
      return { success: false, message };
    }
  };

  const value = {
    ...state,
    fetchProducts,
    fetchFeaturedProducts,
    fetchProductById,
    searchProducts,
    updateFilters,
    clearCurrentProduct,
    addReview
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};