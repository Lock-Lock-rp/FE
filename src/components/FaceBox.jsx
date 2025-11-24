import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const IconBox = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f8f7ff 0%, #f0edff 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
`;

const Description = styled.p`
  font-size: 15px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #6d28d9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default function FaceBox() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>얼굴 인식</Title>
      <Content>
        <IconBox>👤</IconBox>
        <Info>
          <Description>
            등록된 얼굴을 인식하여 자동으로 문을 열어드립니다
          </Description>
          <Button onClick={() => navigate("/face")}>
            인식 시작하기
          </Button>
        </Info>
      </Content>
    </Container>
  );
}