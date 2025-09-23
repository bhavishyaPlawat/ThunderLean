import React from "react";
import { HelmetProvider } from "react-helmet-async";
import Routing from "./utils/Routing";

const App = () => {
  return (
    <HelmetProvider>
      <div className="bg-[#E3E7F0] min-h-screen overflow-x-hidden">
        <Routing />
      </div>
    </HelmetProvider>
  );
};

export default App;
