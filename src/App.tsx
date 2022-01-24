import React from "react";
import "./App.css";
import TransactionsList from "./pages/TransactionsList";
import { AuthProvider } from "./app/AuthContext";
import TransactionDetail from "./pages/TransactionDetail";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        {/*<TransactionsList />*/}
        <TransactionDetail id={"GkjaEpEr"} />
      </div>
    </AuthProvider>
  );
}

export default App;
