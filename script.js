const photos = [
  { src: "assets/images/bmx-mens-race-2.jpg", category: "bmx", title: "Rounding the Corner", size: "feature" },
  { src: "assets/images/lacrosse-easton-celebration.jpg", category: "hockey", title: "Goal Celebration", size: "medium" },
  { src: "assets/images/horse-winning.jpg", category: "racing", title: "The Winning Horse", size: "medium" },
  { src: "assets/images/bmx-46.jpg", category: "bmx", title: "Full Focus", size: "large" },
  { src: "assets/images/lacrosse-asher-drive.jpg", category: "lacrosse", title: "Driving the Net", size: "large" },
  { src: "assets/images/bmx-kids-race-2.jpg", category: "bmx", title: "Into the Turn", size: "medium" },
  { src: "assets/images/hockey-duncan-goal.jpg", category: "lacrosse", title: "Contested Possession", size: "medium" },
  { src: "assets/images/lacrosse-kien-rowan.jpg", category: "lacrosse", title: "Face Off", size: "medium" },
  { src: "assets/images/bmx-jackson-panning.jpg", category: "bmx", title: "Pace", size: "large" },
  { src: "assets/images/horse-splash.jpg", category: "racing", title: "Splash", size: "large" },
  { src: "assets/images/lacrosse-mason-closeup.jpg", category: "lacrosse", title: "Locked In", size: "medium" },
  { src: "assets/images/bmx-580.jpg", category: "bmx", title: "Airborne", size: "medium" },
  { src: "assets/images/lacrosse-jack.jpg", category: "lacrosse", title: "Possession", size: "large" },
  { src: "assets/images/bmx-womens-cruiser.jpg", category: "bmx", title: "Cruiser Class", size: "medium" },
  { src: "assets/images/lacrosse-owen-save.jpg", category: "lacrosse", title: "The Save", size: "medium" },
  { src: "assets/images/bmx-522-110.jpg", category: "bmx", title: "Chasing the Line", size: "large" },
  { src: "assets/images/lacrosse-rowan-arabella.jpg", category: "lacrosse", title: "In Traffic", size: "medium" },
  { src: "assets/images/bmx-teen-race.jpg", category: "bmx", title: "Race Face", size: "medium" },
  { src: "assets/images/lacrosse-mason-goalie-pass.jpg", category: "lacrosse", title: "Outlet Pass", size: "medium" },
  { src: "assets/images/bmx-mens-moto.jpg", category: "bmx", title: "Golden Hour Moto", size: "large" },
  { src: "assets/images/hockey-easton-save.jpg", category: "hockey", title: "Set for the Shot", size: "medium" },
  { src: "assets/images/bmx-kids-race.jpg", category: "bmx", title: "Early Laps", size: "large" },
  { src: "assets/images/lacrosse-mason-sixes-move.jpg", category: "lacrosse", title: "Sixes", size: "medium" },
  { src: "assets/images/bmx-langley-5.jpg", category: "bmx", title: "On the Pedals", size: "medium" },
  { src: "assets/images/bmx-rounding-corner.jpg", category: "bmx", title: "Rounding the Corner", size: "medium" },
  { src: "assets/images/bmx-mens-moto-2.jpg", category: "bmx", title: "Moto", size: "large" },
  { src: "assets/images/bmx-58.jpg", category: "bmx", title: "Outside Line", size: "medium" },
  { src: "assets/images/bmx-teen-race-2.jpg", category: "bmx", title: "Trackside", size: "medium" },
];

const labels = {
  bmx: "BMX",
  lacrosse: "Lacrosse",
  hockey: "Hockey",
  racing: "Horse Racing",
};

const gallery = document.querySelector(".gallery");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCategory = lightbox.querySelector(".lightbox-category");
const lightboxTitle = lightbox.querySelector(".lightbox-title");
let visiblePhotos = photos;
let currentIndex = 0;

function renderGallery(filter = "all") {
  visiblePhotos = filter === "all" ? photos : photos.filter((photo) => photo.category === filter);
  gallery.innerHTML = visiblePhotos
    .map(
      (photo, index) => `
        <button class="gallery-card ${photo.size}" data-index="${index}" aria-label="View ${photo.title}">
          <img src="${photo.src}" alt="${photo.title}" loading="lazy" />
          <span class="caption">
            <small>${labels[photo.category]}</small>
            <strong>${photo.title}</strong>
          </span>
        </button>
      `,
    )
    .join("");
}

function showPhoto(index) {
  currentIndex = (index + visiblePhotos.length) % visiblePhotos.length;
  const photo = visiblePhotos[currentIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.title;
  lightboxCategory.textContent = labels[photo.category];
  lightboxTitle.textContent = photo.title;
  if (!lightbox.open) lightbox.showModal();
  document.body.classList.add("modal-open");
}

gallery.addEventListener("click", (event) => {
  const card = event.target.closest(".gallery-card");
  if (card) showPhoto(Number(card.dataset.index));
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");
    renderGallery(button.dataset.filter);
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showPhoto(currentIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showPhoto(currentIndex + 1));
lightbox.addEventListener("close", () => document.body.classList.remove("modal-open"));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") showPhoto(currentIndex - 1);
  if (event.key === "ArrowRight") showPhoto(currentIndex + 1);
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderGallery();
