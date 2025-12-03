// src/api/api.js
const API_BASE = 'http://localhost:5000/api';

// 서버 상태 확인
export const getHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    console.error('Health check failed:', err);
    return { status: 'error', message: err.message };
  }
};

// 얼굴 감지
export const detectFace = async (imageData) => {
  try {
    const formData = new FormData();
    
    // Base64 이미지를 Blob으로 변환
    if (imageData.image && imageData.image.startsWith('data:image')) {
      const blob = await (await fetch(imageData.image)).blob();
      formData.append('image', blob, 'capture.jpg');
    } else if (imageData instanceof File) {
      formData.append('image', imageData);
    }

    const res = await fetch(`${API_BASE}/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: imageData.image })
    });
    return await res.json();
  } catch (err) {
    console.error('Face detection failed:', err);
    return { success: false, error: err.message };
  }
};

// 실시간 영상 URL
export const getVideoFeedUrl = () => {
  return `${API_BASE}/video-feed`;
};

// 알림 목록 가져오기
export const getAlerts = async () => {
  try {
    const res = await fetch(`${API_BASE}/alerts`);
    const data = await res.json();
    return data.alerts || []; // ← 수정!
  } catch (err) {
    console.error('Failed to fetch alerts:', err);
    return [];
  }
};

// 출입 기록 가져오기
export const getAccessLogs = async () => {
  try {
    const res = await fetch(`${API_BASE}/access-logs`);
    const data = await res.json();
    return data.logs || []; // ← 수정!
  } catch (err) {
    console.error('Failed to fetch access logs:', err);
    return [];
  }
};