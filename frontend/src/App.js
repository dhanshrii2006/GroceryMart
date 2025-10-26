import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Set up polling
  useEffect(() => {
    fetchItems(); // Initial fetch
    
    const interval = setInterval(() => {
      fetchItems();
    }, 3000); // Poll every 3 seconds
    
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle sell action
  const handleSell = async (id) => {
    try {
      await axios.post(`/api/items/${id}/sell`);
      fetchItems(); // Refresh data
    } catch (error) {
      console.error('Error selling item:', error);
    }
  };

  // Handle restock action
  const handleRestock = async (id) => {
    try {
      await axios.post(`/api/items/${id}/restock`);
      fetchItems(); // Refresh data
    } catch (error) {
      console.error('Error restocking item:', error);
    }
  };

  // Helper function to determine stock level class
  const getStockLevelClass = (stock) => {
    if (stock === 0) return 'stock-out';
    if (stock <= 10) return 'stock-low';
    return 'stock-high';
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Live Grocery Inventory Dashboard</h1>
        <p>
          Track your inventory in real-time with dynamic surge pricing.
          Stock levels update automatically every 3 seconds.
        </p>
      </header>

      <main className="dashboard">
        <div className="items-grid">
          {items.map(item => (
            <div key={item._id} className="item-card">
              <h3>{item.name}</h3>
              
              <div className={`stock-info ${getStockLevelClass(item.stock)}`}>
                Stock: {item.stock} units
                {item.stock <= 10 && item.stock > 0 && " (Low Stock!)"}
                {item.stock === 0 && " (Out of Stock!)"}
              </div>
              
              <div className="price-info">
                <div className="base-price">Base Price: ${item.basePrice.toFixed(2)}</div>
                <div className="display-price">
                  Current Price: ${item.displayPrice.toFixed(2)}
                  {item.stock <= 10 && item.stock > 0 && " (Surge Pricing!)"}
                </div>
              </div>

              <button
                className="button button-sell"
                onClick={() => handleSell(item._id)}
                disabled={item.stock === 0}
              >
                Sell 1
              </button>
              
              <button
                className="button button-restock"
                onClick={() => handleRestock(item._id)}
              >
                Restock (+20)
              </button>
            </div>
          ))}
        </div>
      </main>

      <section className="about">
        <h2>About This Dashboard</h2>
        <p>
          This website helps grocery managers track live inventory and pricing in real time.
          Built with the MERN stack, it demonstrates dynamic surge pricing, automatic updates,
          and clean React design.
        </p>
      </section>
    </div>
  );
}

export default App;