import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HeaderContainer = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 32px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  
  @media (max-width: 768px) {
    padding: 0 16px;
    height: 64px;
  }
`;

const Logo = styled(Link)`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #7c3aed;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const NavLink = styled(Link)`
  color: #666;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #7c3aed;
  }
  
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const LogoutBtn = styled.button`
  padding: 10px 20px;
  background: #ffffff;
  border: 1.5px solid #e5e5e5;
  border-radius: 10px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #7c3aed;
    color: #7c3aed;
    background: #faf9ff;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 640px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <Logo to="/">🏠 LOCK LOCK</Logo>
      <Nav>
        <NavLink to="/">홈</NavLink>
        <NavLink to="/face">얼굴인식</NavLink>
        <NavLink to="/logs">로그</NavLink>
        <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
      </Nav>
    </HeaderContainer>
  );
}