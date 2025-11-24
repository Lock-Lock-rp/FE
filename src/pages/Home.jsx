import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import CCTV from '../components/CCTV';
import FaceBox from '../components/FaceBox';
import LogBox from '../components/LogBox';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  min-height: calc(100vh - 72px);
  background: #fafafa;
  padding: 32px 20px;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const WelcomeSection = styled.div`
  max-width: 1400px;
  margin: 0 auto 24px;
  padding: 24px;
  background:white;
  border-radius: 20px;
  color: white;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
`;

const WelcomeText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color:black;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const WelcomeSubtext = styled.p`
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
  color: rgba(37, 35, 37, 0.7);
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Body = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 24px;
  
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  max-width: 1400px;
  margin: 0 auto 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  
  ${props => props.highlight && `
    color: #7c3aed;
  `}
`;

export default function Home() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 실시간 시계
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const logs = [
    "2025-11-17 19:10 방문자 감지",
    "2025-11-17 18:40 얼굴 인식 성공",
    "2025-11-17 12:30 문 열림",
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "좋은 아침이에요";
    if (hour < 18) return "좋은 오후에요";
    return "좋은 저녁이에요";
  };

  return (
    <>
      <Header />
      <Container>
        <WelcomeSection>
          <WelcomeText>{getGreeting()}, {user?.name || user?.email || "사용자"}님! </WelcomeText>
          <WelcomeSubtext>
            {currentTime.toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })} {currentTime.toLocaleTimeString('ko-KR')}
          </WelcomeSubtext>
        </WelcomeSection>
        <StatsSection>
          <StatCard>
            <StatLabel>오늘 방문자</StatLabel>
            <StatValue highlight>3명</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>이번 주 출입</StatLabel>
            <StatValue>15회</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>시스템 상태</StatLabel>
            <StatValue style={{ color: '#10b981', fontSize: '20px' }}>● 정상</StatValue>
          </StatCard>
        </StatsSection>

        <Body>
          <Left>
            <CCTV />
            <FaceBox />
          </Left>
          <LogBox logs={logs} />
        </Body>
      </Container>
    </>
  );
}