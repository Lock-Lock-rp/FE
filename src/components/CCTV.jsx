import styled from "@emotion/styled";

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

const VideoBox = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '🎥';
    font-size: 48px;
    position: absolute;
    opacity: 0.2;
  }
`;

const LiveBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(220, 38, 38, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export default function CCTV() {
  return (
    <Container>
      <Title>실시간 CCTV</Title>
      <VideoBox>
        <LiveBadge>LIVE</LiveBadge>
        CCTV 영상
      </VideoBox>
    </Container>
  );
}