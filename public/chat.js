// 전송 버튼 클릭 시 메시지를 전송하는 함수
document.getElementById("send-btn").addEventListener("click", function() {
    sendMessage();
});

// 엔터 키를 누를 때도 메시지를 전송하는 함수
document.getElementById("msg-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// 메시지를 전송하는 함수
function sendMessage() {
    const messageInput = document.getElementById("msg-input");
    const messageText = messageInput.value;

    if (messageText.trim() !== "") {
        // 메시지를 서버에 보내는 코드를 작성해야 합니다.
        // 여기서는 메시지를 콘솔에 출력하는 예시를 사용합니다.
        console.log("보낸 메시지:", messageText);

        // 메시지 입력란 초기화
        messageInput.value = "";
    }
}

function displayMessage(message) {
    // 메시지를 표시할 <div> 요소를 선택합니다.
    const messageContainer = document.getElementById("msg-box");

    // 새로운 메시지를 생성하고 텍스트를 설정합니다.
    const newMessage = document.createElement("p");
    newMessage.textContent = message;

    // <div>에 메시지를 추가합니다.
    messageContainer.appendChild(newMessage);
}

// API에서 메시지를 가져와서 표시합니다.
const userMessage = "사용자가 입력한 메시지"; // 예시 메시지
// 이 부분에서 API 호출 후 응답을 가져와서 displayMessage 함수를 호출하세요.
// 반환된 메시지를 함수에 전달합니다.
const gptResponse = "GPT에서 생성한 답변"; // 예시 응답
displayMessage(gptResponse);
