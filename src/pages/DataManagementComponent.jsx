import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
  data: [], // Ensure data is initialized as an array
  loading: false,
  error: null,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        data: Array.isArray(action.payload) ? action.payload : [], // Ensure payload is an array
        loading: false 
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_ITEM':
      return { ...state, data: [...state.data, action.payload] };
    case 'DELETE_ITEM':
      return { ...state, data: state.data.filter(item => item.id !== action.payload) };
    case 'UPDATE_ITEM':
      return {
        ...state,
        data: state.data.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    case 'LOADING':
      return { ...state, loading: true };
    default:
      return state;
  }
};

function DataManagementComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const authToken = '874|USNiMsI6rqqm3CHwcTPr3RwCg4MBoYFYfWZY7iDt'; // Replace with actual token

  // Axios instance with Authorization header
  const axiosInstance = axios.create({
    baseURL: 'http://3.144.131.203/ecommerce-web/public/api',
    headers: {
      'Authorization': `Bearer ${authToken}`, 
      'Content-Type': 'application/json',
    },
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'LOADING' });
      try {
        const response = await axiosInstance.post('/get_cart'); 
        console.log("API Response========>:", response.data);  // Log the response data
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        console.error("Fetch Error:", error);
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchData();
  }, []);

  // Add item
  const addItem = async () => {
    const newItem = { id: Date.now(), name: 'New Item' };
    try {
      await axiosInstance.post('/add_to_cart', newItem); 
      dispatch({ type: 'ADD_ITEM', payload: newItem });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await axiosInstance.post(`/remove_cart/${id}`); 
      dispatch({ type: 'DELETE_ITEM', payload: id });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Update item
  const updateItem = async (updatedItem) => {
    try {
      await axiosInstance.post(`/update_cart/${updatedItem.id}`, updatedItem); 
      dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <h1>Data Management</h1>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      <button onClick={addItem}>Add Item</button>
      <ul>
        {Array.isArray(state.data) && state.data.length > 0 ? ( // Ensure data is an array before mapping
          state.data.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => deleteItem(item.id)}>Delete</button>
              <button onClick={() => updateItem({ ...item, name: 'Updated Item' })}>
                Update
              </button>
            </li>
          ))
        ) : (
          <p>No items available.</p> // Fallback message if data is empty or not an array
        )}
      </ul>
    </div>
  );
}

export default DataManagementComponent;
