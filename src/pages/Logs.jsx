import { useState, useEffect } from "react";
import Header from "../components/Header";
import LogBox from "../components/LogBox";
import styled from "@emotion/styled";
import { getAccessLogs } from "../api/api";

const Container = styled.div`
  min-height: calc(100vh - 72px);
  background: #fafafa;
  padding: 32px 20px;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header2 = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.active ? '#7c3aed' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#666'};
  border: 1.5px solid ${props => props.active ? '#7c3aed' : '#e5e5e5'};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #7c3aed;
    color: ${props => props.active ? '#ffffff' : '#7c3aed'};
    background: ${props => props.active ? '#6d28d9' : '#faf9ff'};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
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
  font-size: 24px;
  font-weight: 700;
  color: #7c3aed;
`;

export default function Logs() {
  const [filter, setFilter] = useState("all");
  const [allLogs, setAllLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // API에서 로그 가져오기
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const data = await getAccessLogs();
      
      // API 데이터를 표시 형식으로 변환
      const formatted = data.map(log => 
        `${log.timestamp || ''} ${log.name || '방문자'} ${log.action || '출입'} ${log.authorized ? '✓' : '✗'}`
      );
      
      setAllLogs(formatted);
      setLoading(false);
    };

    fetchLogs();
    
    // 10초마다 자동 갱신
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  const getFilteredLogs = () => {
    if (filter === "all") return allLogs;
    if (filter === "visitor") return allLogs.filter(log => log.includes("방문자"));
    if (filter === "face") return allLogs.filter(log => log.includes("얼굴") || log.includes("인식"));
    if (filter === "door") return allLogs.filter(log => log.includes("문") || log.includes("출입"));
    return allLogs;
  };

  const filteredLogs = getFilteredLogs();

  // 오늘 날짜 필터링
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = allLogs.filter(log => log.includes(today));

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <Header2>
            <Title>활동 로그</Title>
            <FilterSection>
              <FilterButton 
                active={filter === "all"} 
                onClick={() => setFilter("all")}
              >
                전체
              </FilterButton>
              <FilterButton 
                active={filter === "visitor"} 
                onClick={() => setFilter("visitor")}
              >
                방문자
              </FilterButton>
              <FilterButton 
                active={filter === "face"} 
                onClick={() => setFilter("face")}
              >
                얼굴인식
              </FilterButton>
              <FilterButton 
                active={filter === "door"} 
                onClick={() => setFilter("door")}
              >
                출입
              </FilterButton>
            </FilterSection>
          </Header2>

          <StatsGrid>
            <StatCard>
              <StatLabel>전체 로그</StatLabel>
              <StatValue>{allLogs.length}개</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>오늘 활동</StatLabel>
              <StatValue>{todayLogs.length}개</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>필터링 결과</StatLabel>
              <StatValue>{filteredLogs.length}개</StatValue>
            </StatCard>
          </StatsGrid>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              로딩 중...
            </div>
          ) : (
            <LogBox logs={filteredLogs} />
          )}
        </Wrapper>
      </Container>
    </>
  );
}