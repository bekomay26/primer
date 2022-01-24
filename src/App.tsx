import React from "react";
import "./App.css";
import TransactionsList from "./pages/TransactionsList";
import { AuthProvider } from "./app/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <TransactionsList />
      </div>
    </AuthProvider>
  );
}

export default App;
