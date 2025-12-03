import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import FaceRecognition from "./pages/FaceRecognition";
import Logs from "./pages/Logs";
import TestApp from "./TestApp";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
      <TestApp />
    </>

    // <AuthProvider>
    //   <BrowserRouter>

    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/signup" element={<Signup />} />

    //       {/* 로그인해야 Home, Face, Logs 접근 가능 */}
    //       <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
    //       <Route path="/face" element={<PrivateRoute><FaceRecognition /></PrivateRoute>} />
    //       <Route path="/logs" element={<PrivateRoute><Logs /></PrivateRoute>} />
    //     </Routes>

    //   </BrowserRouter>
    // </AuthProvider>
  )
}
