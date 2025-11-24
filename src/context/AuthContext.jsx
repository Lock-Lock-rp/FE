import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // localStorage에서 유저 정보 불러오기 (새로고침 대응)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 유저 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (email, password) => {
    // 실제 API 연동 전 테스트용 로그인
    // 백엔드 연동 시: const response = await fetch('/api/login', { ... })
    
    if (email === "test@test.com" && password === "1234") {
      const userData = { 
        email,
        name: "테스트 유저",
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const signup = (email, password, name) => {
    // 실제 API 연동 전 테스트용 회원가입
    // 백엔드 연동 시: const response = await fetch('/api/signup', { ... })
    
    // 간단한 유효성 검사
    if (!email || !password) {
      return { success: false, message: "이메일과 비밀번호를 입력해주세요" };
    }
    
    if (password.length < 4) {
      return { success: false, message: "비밀번호는 4자 이상이어야 합니다" };
    }
    
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "올바른 이메일 형식이 아닙니다" };
    }
    
    return { success: true, message: "회원가입이 완료되었습니다" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};