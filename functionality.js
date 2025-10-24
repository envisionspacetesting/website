// Scroll reveal animation
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

// ===== YouTube modal functionality =====
const modal = document.getElementById("videoModal");
const iframe = document.getElementById("modalIframe");
const modalInfo = document.getElementById("modalInfo");
const closeBtn = document.getElementById("closeModal");

// Example default description (can be changed per project)
const defaultDesc = `
<p>With a built up area of over 45,000 sq ft, The Hinge is a mansion combining two of four villas commissioned to me‬. This has been designed for the family of Mr. Arjanbhai Dholakia of SRK Exports, one of the global leaders in Diamond industry. This project houses independent villas for his two sons - Mr. Ishver Dholakia and Mr. Akshay Dholakia, and is a part of a larger residential campus.</p>

<p>The villa is thoughtfully planned to cater to the distinct needs of two families while presenting a unified architectural form. It is essentially two homes combined into one expansive structure, connected by a central rotunda that serves as a grand living space. Each of the two homes has eight bedrooms, living and family rooms, as well as elaborate kitchen and dining areas. The design ensures privacy for both families while promoting communal living through shared spaces.</p>

<p>This interesting villa was designed and constructed in a record time of 15 months. It endeavours to capture the grandeur of an American Neo-Classical Villa as well as elegant and functional Modern living.</p>

<p>Architects: ‪‪</p>
<p>Video Credits: ‪‪‬</p>
`;

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const videoUrl = card.getAttribute("data-video") || "https://www.youtube.com/embed/8Lgi_X8VC-A"; // default placeholder
    const infoText = card.getAttribute("data-info") || defaultDesc;

    iframe.src = videoUrl + "?autoplay=1&rel=0";
    modalInfo.innerHTML = infoText;

    modal.style.display = "flex";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = "";
});

// Close when clicking outside content
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
