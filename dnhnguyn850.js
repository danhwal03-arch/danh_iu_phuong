// ================================
// LẤY CÁC PHẦN TỬ HTML
// ================================
const startScreen = document.getElementById("startScreen");
const angryScreen = document.getElementById("angryScreen");
const sorryScreen = document.getElementById("sorryScreen");
const thanksScreen = document.getElementById("thanksScreen");
const questionScreen = document.getElementById("questionScreen");
const loveScreen = document.getElementById("loveScreen");

const openButton = document.getElementById("openButton");
const angryYesBtn = document.getElementById("angryYesBtn");
const angryNoBtn = document.getElementById("angryNoBtn");
const toQuestionBtn = document.getElementById("toQuestionBtn");
const toQuestionBtn2 = document.getElementById("toQuestionBtn2");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const message = document.getElementById("message");
const bgMusic = document.getElementById("bgMusic");

// ================================
// XỬ LÝ ÂM THANH NỀN
// ================================
function playAudio() {
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(err => {
            console.log("Chờ tương tác từ người dùng...", err);
        });
    }
}

["click", "touchstart", "pointerdown"].forEach(eventType => {
    window.addEventListener(eventType, playAudio, { once: true });
});

// ================================
// BƯỚC 1: MỞ PHONG BÌ
// ================================
openButton.addEventListener("click", function () {
    playAudio();
    startScreen.classList.add("hidden");
    angryScreen.classList.remove("hidden");
});

// ================================
// BƯỚC 2: CÒN GIẬN KHÔNG?
// ================================
angryYesBtn.addEventListener("click", function () {
    angryScreen.classList.add("hidden");
    sorryScreen.classList.remove("hidden");
});

angryNoBtn.addEventListener("click", function () {
    angryScreen.classList.add("hidden");
    thanksScreen.classList.remove("hidden");
});

toQuestionBtn.addEventListener("click", goToQuestionScreen);
toQuestionBtn2.addEventListener("click", goToQuestionScreen);

function goToQuestionScreen() {
    sorryScreen.classList.add("hidden");
    thanksScreen.classList.add("hidden");
    
    // Reset vị trí nút Không về lại trong khung ban đầu
    noButton.style.position = "static";
    questionScreen.classList.remove("hidden");
}

// ================================
// BƯỚC 3: HIỆU ỨNG NÚT "KHÔNG" NÉ TRÊN TOÀN MÀN HÌNH NỀN
// ================================
function moveNoButton() {
    const btnWidth = noButton.offsetWidth;
    const btnHeight = noButton.offsetHeight;

    // Giữ khoảng cách 20px so với mép màn hình để nút không bị tràn ra ngoài
    const padding = 20; 
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // Tính tọa độ ngẫu nhiên trên toàn bộ vùng ảnh nền
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    // Chuyển nút sang position fixed để nhảy tự do
    noButton.style.position = "fixed";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}

// Sự kiện di chuột (PC) và chạm (Điện thoại)
noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", function (event) {
    event.preventDefault();
    moveNoButton();
}, { passive: false });

noButton.addEventListener("click", function (event) {
    event.preventDefault();
    moveNoButton();
});

// ================================
// BƯỚC 4: CHUYỂN SANG MÀN HÌNH LỜI NHẮN
// ================================
yesButton.addEventListener("click", function () {
    questionScreen.classList.add("hidden");
    loveScreen.classList.remove("hidden");
    showMessages();
});

// ================================
// CHUỖI THÔNG ĐIỆP (ĐÃ SỬA LỖI CÚ PHÁP)
// ================================
const messages = [
    "Có một điều Danh muốn nói",
    "Danh có phần mất kiểm soát khi yêu Phương",
    "Dù vậy Danh vẫn biết lỗi sai và Danh sẽ cố sửa",
    "Danh vẫn muốn là người mà Phương có thể thương",
    "Và Danh vẫn yêu Phương như ngày nào",
    "Dù thời gian có trôi qua,<br>cảm xúc ấy vẫn còn ở đây.",
    "Danh vẫn nhớ, vẫn thương<br>và vẫn yêu Phương. ❤️",
    "Mong Phương vẫn yêu Danh như ngày nào ❤️"
];

function showMessages() {
    let index = 0;

    function nextMessage() {
        message.style.opacity = "0";

        setTimeout(function () {
            message.innerHTML = messages[index];
            message.style.opacity = "1";
            index++;

            if (index < messages.length) {
                setTimeout(nextMessage, 2800);
            }
        }, 500);
    }

    nextMessage();
}