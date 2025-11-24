import { useState } from "react";
import Header from "../components/Header";
import LogBox from "../components/LogBox";
import styled from "@emotion/styled";

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

const allLogs = [
  "2025-11-17 19:10 방문자 감지",
  "2025-11-17 18:40 얼굴 인식 성공",
  "2025-11-17 12:30 문 열림",
  "2025-11-16 22:10 방문자 감지",
  "2025-11-16 19:40 문 열림",
  "2025-11-16 14:20 얼굴 인식 성공",
  "2025-11-15 20:15 방문자 감지",
  "2025-11-15 09:30 문 열림",
  "2025-11-14 18:45 얼굴 인식 실패",
  "2025-11-14 16:20 방문자 감지",
];

export default function Logs() {
  const [filter, setFilter] = useState("all");

  const getFilteredLogs = () => {
    if (filter === "all") return allLogs;
    if (filter === "visitor") return allLogs.filter(log => log.includes("방문자"));
    if (filter === "face") return allLogs.filter(log => log.includes("얼굴"));
    if (filter === "door") return allLogs.filter(log => log.includes("문"));
    return allLogs;
  };

  const filteredLogs = getFilteredLogs();

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
              <StatValue>{allLogs.filter(log => log.includes("2025-11-17")).length}개</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>필터링 결과</StatLabel>
              <StatValue>{filteredLogs.length}개</StatValue>
            </StatCard>
          </StatsGrid>

          <LogBox logs={filteredLogs} />
        </Wrapper>
      </Container>
    </>
  );
}