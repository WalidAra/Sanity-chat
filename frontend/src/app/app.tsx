import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import AuthProvider from "@/providers/auth-provider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
