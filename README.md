# 🌈 무지개편지
<b>펫로스 극복을 위한 챗봇 서비스</b>
"무지개 편지"는 펫로스 증후군을 겪고 있는 사람들에게 극복의 토대를 제공하기 위해 태어났습니다. 다양한 기능을 통해 반려동물을 떠나보낸 사람들이 일상을 찾을 수 있도록 돕고자 합니다. 시간이 흘러도 여전히 그리운, 당신의 가족이자 기억하고 싶은 이들에게 미처 하지 못했던 말을 직접 전해주세요. 그리고 행복했던 추억을 떠올리며 내 반려동물이 무지개 별에서도 행복하게 지내고 있다고 상상하세요.
무지개 편지는 무지개 다리를 건너 간 나의 반려동물에게 향하는 징검다리를 놓아드리겠습니다.
<br>
<br>

## 🖥️ Demo video
[![Video Label](http://img.youtube.com/vi/8pW3X7zxmLs/0.jpg)](https://youtu.be/8pW3X7zxmLs)


<br>
<br>

## 🚀 Version
동작환경: chrome 119.0.6045.105
<br> 개발환경: react 18.2.0
<br>
<br>

## 💥 Deployment
Vercel
![front](https://github.com/ewha-cse-HACK/HACK_client/assets/79117648/f1240f60-d42b-4653-aaa7-396e96180860)
<br>
<br>

## 🖼️ Project Architecture
![image](https://github.com/ewha-cse-HACK/HACK_Server/assets/67634926/99676a61-6f99-48af-8b07-4c52f4c09ec5)
<br>
<br>

## 💪 Teck stack
<b>Client</b> <br>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/></a> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/></a>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/></a>
<br>
<br>

## ✨ Client 구성요소
- React (18.2.0) : 클라이언트 개발에서 사용한 프레임워크 
- Axios ^1.5.0 : Promise 기반의 HTTP 통신 라이브러리로 백엔드에 api 요청을 보낼 때 사용
- styled-component ^6.0.8 : React 컴포넌트를 스타일링하기 위한 CSS-in-JS 라이브러리
<br><br>

## 🧩 사용한 오픈소스
- mui-Material UI ^5.14.12 : 스타일을 사용하기 위한 CSS 패키지
- mui/x-date-pickers ^6.16.2 : 달력 요소를 위한 mui 라이브러리
- dayjs ^1.11.10 : Javascript 날짜 라이브러리
- react-spinners 0.13.8 : 리액트 스피너 라이브러리 (채팅, 일기 훔쳐보기에 사용)
- react-toastify ^9.1.3 : 알림을 띄우기 위한 리액트 라이브러리
<br>

~~~
npm install @mui/material@5.14.12
npm install @mui/x-date-pickers@6.16.2
npm install dayjs@1.11.10
npm install react-spinners@0.13.8
npm install react-toastify@9.1.3
~~~
<br><br>


## 🌟 How to Install
1. package.json 파일에 vercel-deploy 추가
  ~~~
  "scripts": {
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev": "next dev",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "lint": "next lint",
    "vercel-deploy": "next build && next export"
  }
  ~~~
2. Vercel에 회원가입 후 깃허브 연동
3. 연동된 깃허브 계정에서 배포할 레포지토리 (HACK-client) 등록 
4. 해당 레포지토리 import 후 Deploy 
5. 프로젝트 Settings > Domains 메뉴에서 도메인 (rainbow-letter.com) 추가
6. Route53에서 주어진 값대로 레코드 생성
7. 프로젝트 Deployments > Promote to Production 


## 🌤️ How to build
~~~
git clone https://github.com/ewha-cse-HACK/HACK_client.git
~~~

## 🎮 How to test
  1. 리액트 앱이 있는 폴더에서 프롬프트를 열어 리액트 앱 구동
  ~~~
  npm start 
  ~~~
  2. 오류가 없을 경우 localhost:3000으로 연결되어 앱 로딩


## 👍 Developers
<table>
  <thead>
    <tr>
        <th align=center><a href="https://github.com/minji1289">김민지</a></td>
        <th align=center><a href="https://github.com/ehvzmf">최유나</a></td>
        <th align=center><a href="https://github.com/yunji118">하윤지</a></td>
    </tr>
  </thead>
    <tr>
        <td align=center><img src = "https://github.com/ewha-cse-HACK/HACK_Server/assets/67634926/b9b5e64d-45d7-4a6d-af6f-7d7456c10da8"></td>
        <td align=center><img src = "https://github.com/ewha-cse-HACK/HACK_Server/assets/67634926/5b560b07-6128-4b81-aa64-e3093d7f77ed"></td>
        <td align=center><img src = "https://github.com/ewha-cse-HACK/HACK_Server/assets/67634926/5580da4f-6b71-4d2e-9a25-96889a4c48ca"></td>
    </tr>
    <tr>
        <td align=center>Server<br>AI</td>
        <td align=center>Client<br>Design</td>
        <td align=center>Server<br>AI</td>
    </tr>
</table>
<br>



