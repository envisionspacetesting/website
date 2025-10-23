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

// Modal video functionality
const modal = document.getElementById("videoModal");
const modalIframe = modal.querySelector("iframe");
const modalDesc = modal.querySelector(".modal-description");
const closeBtn = modal.querySelector(".modal-close");
const commentsList = document.getElementById("comments-list");
const commentInput = document.getElementById("comment-input");
const commentBtn = document.getElementById("comment-btn");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalIframe.src = card.getAttribute("data-video") + "?autoplay=1";
    modalDesc.textContent = card.getAttribute("data-description");
    commentsList.innerHTML = ""; // reset comments
  });
});

closeBtn.addEventListener("click", () => { modal.style.display = "none"; modalIframe.src = ""; });
window.addEventListener("click", (e) => { if(e.target === modal){ modal.style.display="none"; modalIframe.src=""; }});

// Comment functionality
commentBtn.addEventListener("click", () => {
  const val = commentInput.value.trim();
  if(val){
    const div = document.createElement("div");
    div.textContent = val;
    commentsList.appendChild(div);
    commentInput.value = "";
  }
});

// Form submission
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  fetch(form.action, {
    method:"POST",
    body: new FormData(form),
    headers: {'Accept':'application/json'}
  }).then(response => {
    if(response.ok){ form.reset(); document.getElementById("form-success").style.display="block"; }
    else alert("Oops! There was a problem.");
  });
});
