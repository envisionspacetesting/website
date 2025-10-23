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

// Modal video
const modal = document.getElementById("videoModal");
const modalIframe = modal.querySelector("iframe");
const closeBtn = modal.querySelector(".modal-close");
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const videoURL = card.getAttribute("data-video");
    modal.style.display = "flex";
    modalIframe.src = videoURL + "?autoplay=1";
  });
});
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalIframe.src = "";
});
window.addEventListener("click", (e) => {
  if(e.target === modal) { modal.style.display="none"; modalIframe.src=""; }
});

// Form submission via Formspree
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  fetch(form.action, {
    method:"POST",
    body: new FormData(form),
    headers: {'Accept':'application/json'}
  }).then(response=>{
    if(response.ok){
      form.reset();
      document.getElementById("form-success").style.display="block";
    } else alert("Oops! There was a problem.");
  });
});
