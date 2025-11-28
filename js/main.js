function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

const questions = [
  {
    text: "Bạn nhận được email yêu cầu nhập mật khẩu để 'xác minh tài khoản Facebook'. Bạn nên?",
    answers: [
      { text: "Nhập ngay để tránh bị khóa", correct: false },
      { text: "Kiểm tra địa chỉ gửi & chỉ đăng nhập từ app/chrome.facebook.com", correct: true },
      { text: "Chuyển email đó cho tất cả bạn bè", correct: false },
      { text: "Reply email hỏi lại mật khẩu là gì", correct: false },
    ],
  },
  {
    text: "Một 'nhân viên ngân hàng' gọi điện yêu cầu đọc mã OTP để 'hủy giao dịch lạ'. Bạn nên?",
    answers: [
      { text: "Đọc OTP ngay để họ hủy", correct: false },
      { text: "Không đọc OTP & gọi lại số ngân hàng chính thức trên website/app", correct: true },
      { text: "Gửi luôn cả số thẻ cho tiện", correct: false },
      { text: "Chụp màn hình OTP gửi qua Zalo", correct: false },
    ],
  },
];

let currentIndex = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const statusDiv = document.getElementById("quiz-status");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;

  const q = questions[currentIndex];
  questionText.textContent = q.text;
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, idx) => {
    const btn = document.createElement("button");
    btn.textContent = ans.text;
    btn.className = "answer-btn";
    btn.onclick = () => handleAnswer(ans.correct, btn);
    answersDiv.appendChild(btn);
  });

  statusDiv.textContent = `Câu ${currentIndex + 1} / ${questions.length} - Điểm: ${score}`;
}

function handleAnswer(isCorrect, button) {
  if (answered) return;
  answered = true;

  if (isCorrect) {
    score++;
    button.classList.add("correct");
    statusDiv.textContent = "That's right! Bạn xử lý rất tỉnh táo.";
  } else {
    button.classList.add("wrong");
    statusDiv.textContent =
      "Too bad. Nếu được, bạn nên kiểm tra kỹ nguồn & không cung cấp thông tin.";
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= questions.length) {
    questionText.textContent = `Good job! Bạn làm đúng được ${score}/${questions.length} câu.`;
    answersDiv.innerHTML = "";
    nextBtn.disabled = true;
    statusDiv.textContent =
      score === questions.length
        ? "Good job, man. You are the GOAT."
        : "Nice try, nếu có thể bạn xem lại nội dung để tránh bị lừa nhá.";
  } else {
    loadQuestion();
  }
});

if (questions.length > 0) {
  loadQuestion();
}

function chooseScenario(option) {
  const result = document.getElementById("scenario-result");
  if (option === 1) {
    result.textContent =
      "Bạn đã bị lừa bấm vào link giả mạo :(( → nguy cơ bị đánh cắp tài khoản! Lần sau hãy kiểm tra kỹ địa chỉ email & URL.";
  } else {
    result.textContent =
      "Tuyệt! Bạn đã chọn cách an toàn: kiểm tra kỹ & chỉ đăng nhập từ kênh chính thức.";
  }
}
