import React, { useContext } from "react";
import "./App.css";
import TransactionsList from "./pages/TransactionList";
import { AuthProvider } from "./app/AuthContext";
import TransactionDetail from "./pages/TransactionDetail";
import { pagesMapping, RoutingContext } from "./Router";

function App() {
  const { page, urlId } = useContext(RoutingContext);
  return (
    <AuthProvider>
      <div className="App">
        <>
          {pagesMapping.list === page && <TransactionsList />}
          {pagesMapping.detail === page && <TransactionDetail id={urlId} />}
        </>
      </div>
    </AuthProvider>
  );
}

export default App;
