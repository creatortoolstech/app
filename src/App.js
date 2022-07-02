import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

import { ChatContextProvider } from "./context";
import CreatorChat from "./views/CreatorChat";
import CreatorHome from "./views/CreatorHome";
import CreatorSignup from './views/CreatorSignup';
import Home from "./views/Home";

const App = () => {
  return (
    <ErrorBoundary>
      <ChatContextProvider>
        <Routes>
          <Route path="/chat/:creatorInsta" element={<Home />} />
          <Route path="/creator" element={<CreatorHome />} />
          <Route path="/creator/signup" element={<CreatorSignup />} />
          <Route path="/creator/chat/:chatId" element={<CreatorChat />} />
          <Route path="/" element={<CreatorHome />} />
        </Routes>
      </ChatContextProvider>
    </ErrorBoundary>
  )
}

export default App;