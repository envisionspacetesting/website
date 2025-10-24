// Scroll animation
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  for (let el of reveals) {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) el.classList.add("active");
  }
});

// Hero parallax
window.addEventListener("scroll", () => {
  const heroImg = document.querySelector(".hero img");
  if (heroImg) heroImg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
});

// ======= Modal video functionality (for local .mp4 videos) =======
const modal = document.getElementById("videoModal");
const videoElement = document.getElementById("modalVideo");
const videoSource = videoElement.querySelector("source");
const modalInfo = document.getElementById("modalInfo");
const closeBtn = document.getElementById("closeModal");

// When user clicks on any project card
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const videoSrc = card.getAttribute("data-video");
    const infoText = card.getAttribute("data-info");

    // Update video and info dynamically
    videoSource.src = videoSrc;
    videoElement.load();
    modalInfo.innerHTML = `<p>${infoText}</p>`;

    // Show modal
    modal.style.display = "flex";
  });
});

// Close modal on red cross
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  videoElement.pause();
});

// Also close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    videoElement.pause();
  }
});

// ======= Form submission =======
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        form.reset();
        const successMsg = document.getElementById("form-success");
        if (successMsg) successMsg.style.display = "block";
      } else {
        alert("Oops! There was a problem.");
      }
    });
  });
}
