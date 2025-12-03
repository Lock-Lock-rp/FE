import styled from "@emotion/styled";
import { getHealth, getVideoFeedUrl } from "../api/api.js";
import { useEffect, useState, useRef } from "react"; // useRef 추가!

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

const Video = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  z-index: 10;

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

const StatusBadge = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  z-index: 10;
`;

export default function CCTV() {
  const [useServerFeed, setUseServerFeed] = useState(true);
  const [serverStatus, setServerStatus] = useState('확인 중...');
  const videoRef = useRef(null); // 추가!

  useEffect(() => {
    // 서버 헬스 체크
    getHealth().then(data => {
      console.log("Server status:", data);
      if (data.status === 'ok') {
        setServerStatus('서버 연결됨');
      } else {
        setServerStatus('로컬 웹캠 사용');
        setUseServerFeed(false);
      }
    });

    // 웹캠 백업
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("웹캠 접근 실패:", err));
    }
  }, []);

  return (
    <Container>
      <Title>실시간 CCTV</Title>
      <VideoBox>
        <LiveBadge>LIVE</LiveBadge>
        <StatusBadge>{serverStatus}</StatusBadge>

        {useServerFeed ? (
          // 서버의 video-feed 사용
          <Video
            src={getVideoFeedUrl()}
            alt="Video Feed"
            onError={() => {
              setUseServerFeed(false);
              setServerStatus('서버 연결 실패');
            }}
          />
        ) : (
          // 웹캠 사용 (백업)
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        )}
      </VideoBox>
    </Container>
  );
}