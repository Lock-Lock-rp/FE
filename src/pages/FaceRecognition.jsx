import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import { detectFace } from "../api/api.js";

export default function FaceRecognition() {
  const [status, setStatus] = useState("인식 중...");
  const [isSuccess, setIsSuccess] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // 웹캠 스트리밍
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => setStatus("웹캠 접근 실패"));

    // 1초마다 얼굴 감지
    const interval = setInterval(() => {
      if (!videoRef.current) return;
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL("image/jpeg");

      detectFace({ image: imageBase64 })
        .then(res => {
          if (res.success) {
            setStatus("인식 성공! 문이 열립니다 🔓");
            setIsSuccess(true);
            clearInterval(interval);
          } else {
            setStatus("얼굴을 카메라에 맞춰주세요");
          }
        })
        .catch(() => setStatus("얼굴 감지 오류"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Box>
          <CameraIcon success={isSuccess}>
            📷
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              style={{ display: "none" }} 
            />
          </CameraIcon>
          <Title>얼굴을 카메라에 맞춰주세요</Title>
          <Status success={isSuccess}>{status}</Status>
        </Box>
      </Container>
    </>
  );
}

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const Box = styled.div`
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 24px;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
`;

const CameraIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #f8f7ff 0%, #f0edff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  font-size: 48px;
  
  ${props => props.success && `
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  `}
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  text-align: center;
`;

const Status = styled.div`
  font-size: 15px;
  color: #666;
  text-align: center;
  min-height: 24px;
  
  ${props => props.success && `
    color: #7c3aed;
    font-weight: 500;
  `}
`;