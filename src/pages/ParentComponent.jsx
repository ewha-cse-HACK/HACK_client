import React, { useState, useEffect } from "react";
import PersonaView from "./PersonaView"; // PersonaView 컴포넌트 불러오기
import axios from "axios";

function ParentComponent() {
  const [petId, setPetId] = useState(null);

  useEffect(() => {
    // 백엔드 API로부터 petId를 가져오는 비동기 함수 호출
    const fetchData = async () => {
      try {
        const response = await axios.get("API_ENDPOINT_TO_GET_PET_ID");
        // API 응답에서 petId 추출하고 state에 저장
        setPetId(response.data.petId);
      } catch (error) {
        // 에러 처리
        console.error("Error fetching petId: ", error);
      }
    };

    // 데이터 가져오기 함수 호출
    fetchData();
  }, []); // 빈 배열을 넘겨주면 컴포넌트가 마운트될 때만 실행됨

  return (
    <div>
      {/* petId가 로드될 때까지 로딩 상태를 보여줄 수 있음 */}
      {petId ? <PersonaView petId={petId} /> : <p>Loading...</p>}
    </div>
  );
}

export default ParentComponent;
