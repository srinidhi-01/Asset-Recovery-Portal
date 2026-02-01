import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";


import Navbar from "./components/Navbar";
import ItemList from "./pages/ItemList";
import UploadItem from "./pages/UploadItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ItemDetails from "./pages/ItemDetails";
import SuccessStories from "./pages/SuccessStories";
import Settings from "./pages/Settings";

function App() {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("items");
    return stored ? JSON.parse(stored) : [];
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addItem = (item) => {
    setItems((prev) => [item, ...prev]);
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Navbar
        user={user}
        logout={logout}
        theme={theme}
        setTheme={setTheme}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ItemList
              items={items}
              deleteItem={deleteItem}
              user={user}
            />
          }
        />

        <Route path="/upload" element={<UploadItem addItem={addItem} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stories" element={<SuccessStories />} />

        <Route
          path="/item/:id"
          element={<ItemDetails items={items} />}
        />

        <Route
          path="/settings"
          element={
            <Settings
              user={user}
              theme={theme}
              setTheme={setTheme}
            />
          }
        />
        <Route
  path="/upload"
  element={
    <ProtectedRoute user={user}>
      <UploadItem addItem={addItem} />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute user={user}>
      <Settings user={user} theme={theme} setTheme={setTheme} />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
