import styled from "@emotion/styled";

const Container = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  min-width: 350px;
  max-width: 450px;
  
  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
`;

const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 600px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d0d0d0;
    border-radius: 10px;
    
    &:hover {
      background: #b0b0b0;
    }
  }
`;

const LogItem = styled.div`
  padding: 14px 16px;
  background: #fafafa;
  border-radius: 12px;
  font-size: 14px;
  color: #444;
  line-height: 1.5;
  border: 1px solid #f0f0f0;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
    border-color: #e5e5e5;
  }
  
  strong {
    color: #1a1a1a;
    font-weight: 600;
  }
`;

const Time = styled.span`
  color: #999;
  font-size: 13px;
  margin-right: 8px;
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
`;

export default function LogBox({ logs }) {
  if (!logs || logs.length === 0) {
    return (
      <Container>
        <Title>활동 로그</Title>
        <EmptyState>아직 기록된 활동이 없습니다</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>활동 로그</Title>
      <LogList>
        {logs.map((log, idx) => {
          const parts = log.split(' ');
          const date = parts[0];
          const time = parts[1];
          const message = parts.slice(2).join(' ');
          
          return (
            <LogItem key={idx}>
              <Time>{date} {time}</Time>
              <strong>{message}</strong>
            </LogItem>
          );
        })}
      </LogList>
    </Container>
  );
}