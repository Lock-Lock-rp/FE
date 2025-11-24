import { useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #fafafa;
`;

const Box = styled.div`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
  
  @media (max-width: 640px) {
    padding: 40px 24px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 40px 0;
  text-align: center;
  
  @media (max-width: 640px) {
    font-size: 28px;
    margin: 0 0 32px 0;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #444;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1.5px solid #e5e5e5;
  font-size: 15px;
  transition: all 0.2s;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #7c3aed;
    background: #faf9ff;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
  
  ${props => props.error && `
    border-color: #ef4444;
    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  `}
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
`;

const Btn = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background: #7c3aed;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.2s;
  
  &:hover {
    background: #6d28d9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 24px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  
  &:hover {
    color: #7c3aed;
  }
`;

export default function Signup() {
  const nav = useNavigate();
  const { signup } = useAuth();
  
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }
    
    if (!pw) {
      newErrors.pw = "비밀번호를 입력해주세요";
    } else if (pw.length < 4) {
      newErrors.pw = "비밀번호는 4자 이상이어야 합니다";
    }
    
    if (!pwConfirm) {
      newErrors.pwConfirm = "비밀번호 확인을 입력해주세요";
    } else if (pw !== pwConfirm) {
      newErrors.pwConfirm = "비밀번호가 일치하지 않습니다";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // 실제 API 호출 시뮬레이션 (0.5초 딜레이)
    setTimeout(() => {
      const result = signup(email, pw);
      
      if (result.success) {
        alert(result.message);
        nav("/login");
      } else {
        alert(result.message);
      }
      
      setIsSubmitting(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <Container>
      <Box>
        <Title>회원가입</Title>

        <InputGroup>
          <Label>이메일</Label>
          <Input 
            type="email"
            placeholder="example@email.com" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: "" }));
            }}
            onKeyPress={handleKeyPress}
            error={errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label>비밀번호</Label>
          <Input 
            type="password" 
            placeholder="비밀번호를 입력하세요 (4자 이상)" 
            value={pw} 
            onChange={(e) => {
              setPw(e.target.value);
              setErrors(prev => ({ ...prev, pw: "" }));
            }}
            onKeyPress={handleKeyPress}
            error={errors.pw}
          />
          {errors.pw && <ErrorMessage>{errors.pw}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label>비밀번호 확인</Label>
          <Input 
            type="password" 
            placeholder="비밀번호를 다시 입력하세요" 
            value={pwConfirm} 
            onChange={(e) => {
              setPwConfirm(e.target.value);
              setErrors(prev => ({ ...prev, pwConfirm: "" }));
            }}
            onKeyPress={handleKeyPress}
            error={errors.pwConfirm}
          />
          {errors.pwConfirm && <ErrorMessage>{errors.pwConfirm}</ErrorMessage>}
        </InputGroup>

        <Btn 
          onClick={handleSignup} 
          type="button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "처리중..." : "회원가입"}
        </Btn>

        <LoginLink to="/login">이미 계정이 있으신가요? 로그인</LoginLink>
      </Box>
    </Container>
  );
}