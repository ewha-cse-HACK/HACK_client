// 로그인 버튼 클릭 시 로그인 화면으로 이동
document.getElementById("loginBtn").addEventListener("click", function() {
    window.location.href = "login.html";
  });
  
  // 로그아웃 버튼 클릭 시 로그아웃 처리 후 홈 화면으로 이동
  document.getElementById("logoutBtn").addEventListener("click", function() {
    // 로그아웃 처리 로직
    // ...
  
    window.location.href = "index.html"; // 홈 화면으로 리다이렉트
  });
  
  // 사용자 로그인 상태에 따라 버튼 렌더링
  if (/* 사용자 로그인 상태 여부 확인 */) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
  } else {
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
  }
  