import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "../Contexts/AuthContext";
import "../Styled-component/App.css";
import Layout from "./Layout.js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute> }/>
            <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute> }/>
            <Route path="/result/:id" element={<PrivateRoute><Result /> </PrivateRoute> }/>
            <Route path="/quiz/:id" element={<PrivateRoute><Quiz /> </PrivateRoute> } />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
