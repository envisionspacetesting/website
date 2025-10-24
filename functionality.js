// ===== Scroll reveal animation =====
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  for (let el of reveals) {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) el.classList.add("active");
  }
});

// ===== Hero parallax =====
window.addEventListener("scroll", () => {
  const heroImg = document.querySelector(".hero img");
  if (heroImg) heroImg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
});

// ===== YouTube modal functionality =====
const modal = document.getElementById("videoModal");
const iframe = document.getElementById("modalIframe");
const modalInfo = document.getElementById("modalInfo");
const closeBtn = document.getElementById("closeModal");

// Open modal on project card click
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const videoUrl = card.getAttribute("data-video");  // YouTube link
    const infoText = card.getAttribute("data-info");   // Project description

    iframe.src = videoUrl + "?autoplay=1&rel=0";
    modalInfo.innerHTML = `<p>${infoText}</p>`;
    modal.style.display = "flex";
  });
});

// Close modal on red cross
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = "";
});

// Close modal when clicking outside the content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    iframe.src = "";
  }
});

// ===== Form submission =====
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
