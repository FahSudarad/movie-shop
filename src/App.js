// localStorage, getTotalItems, handleAddToCart, handleRemoveFromCart, clearCart, handleSearch, Route, ส่งค่าไปที่ต่างๆ
import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./page/home";
import CartPage from "./page/cartPage";
import { fetchAllMovie } from "./api/fetchMovie";

function App() {
  const storedItems = JSON.parse(localStorage.getItem("cartItems"));
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(storedItems || []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const movieData = await fetchAllMovie();
        setData(movieData.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie data", error);
      }
    }
    fetchData();

    if (cartItems !== null) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const getTotalItems = (items) => {
    if (items === null) {
      return 0;
    }
    return items.reduce((acc, item) => acc + item.amount, 0);
  };

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => {
      if (prev === null) {
        return prev;
      }

      return prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, []);
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredResults = data.filter((item) =>
      item.original_title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <Header
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        clearCart={clearCart}
        getTotalItems={getTotalItems}
        isLoading={isLoading}
        error={error}
        onSearch={handleSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={searchTerm ? searchResults : data}
              handleAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
      {searchTerm && searchResults.length === 0 && (
        <p className="text-center text-[1.5rem]">
          No movies found for "{searchTerm}"
        </p>
      )}
    </>
  );
}

export default App;
