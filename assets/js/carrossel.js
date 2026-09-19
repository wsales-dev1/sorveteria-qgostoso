const favoritos = [
    {
        name: "Casquinha",
        desc: "Sorvete de casquinha sabor mista cremoso",
        old_price: "R$4,00",
        price: "R$3,50",
        img: "assets/img/casquinha.webp",
        rating: "4.8/5",
    },
    {
        name: "Sundae",
        desc: "Sundae refrescante sabor chocolate.",
        old_price: "R$4,99",
        price: "R$3,99",
        img: "assets/img/sundae.webp",
        rating: "4.9/5",
    },
    {
        name: "MilkShake",
        desc: "Milkshake cremoso com várias opções de sabores deliciosos.",
        old_price: "R$4,99",
        price: "R$4,99",
        img: "assets/img/shake.webp",
        rating: "4.9/5",
    },
    {
        name: "Cascão",
        desc: "Sorvete de cascão sabor chocolate, baunilha ou misto.",
        old_price: "R$4,49",
        price: "R$4,49",
        img: "assets/img/cascao.webp",
        rating: "4.8/5",
    },
];

const VISIBLE = 3;         // cards visíveis por vez (desktop)
const AUTO_MS = 3500;      // intervalo do autoplay

const track = document.getElementById("track");
const dotsWrap = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function cardHTML(item) {
    return `
    <div class="scoop-card pb-3 px-3">
        <div class="flex flex-col bg-white rounded-3xl p-5 h-full shadow-lg transition-all ease-[ease] 
                duration-300 hover:translate-y-[-7px] hover:shadow-xl cursor-pointer">
            <div class="relative rounded-2xl overflow-hidden mb-4 aspect-square flex items-center justify-center">
            <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover" loading="lazy">
            <span class="rating-badge absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full">★ ${item.rating}</span>
            </div>
            <h3 class="text-xl font-bold mb-1">${item.name}</h3>
            <p class="text-md text-neutral-700 mb-4 leading-snug">${item.desc}</p>
            <div class="mt-auto flex items-end justify-between">
            <div class="flex items-baseline gap-2">
                <span class="old-price text-sm text-neutral-600">${item.old_price}</span>
                <span class="text-2xl font-bold text-pink-candy">${item.price}</span>
            </div>
            </div>
        </div>
    </div>`;
}

// Clona os primeiros VISIBLE itens no final para permitir loop infinito suave
const total = favoritos.length;
const extended = [...favoritos, ...favoritos.slice(0, VISIBLE)];
track.innerHTML = extended.map(cardHTML).join("");

// Dots (um por sabor real)
for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Ir para o sabor ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
}
const dots = () => [...dotsWrap.children];


function getVisibleCards() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
}

let visible = getVisibleCards();
let cardWidthPercent = 100 / visible;
// let cardWidthPercent = 100 / VISIBLE;

let index = 0;

function render(withTransition = true) {
    track.classList.toggle("no-transition", !withTransition);
    track.style.transform = `translateX(-${index * cardWidthPercent}%)`;
    const activeDot = index % total;
    dots().forEach((d, i) => d.classList.toggle("active", i === activeDot));
}

function next() {
    index++;
    render(true);
    if (index >= total) {
        // Quando alcança os clones, espera a transição e reseta sem animação
        setTimeout(() => {
            index = 0;
            render(false);
        }, 600);
    }
}

function prev() {
    if (index <= 0) {
        index = total;
        render(false);
        // força reflow antes de animar
        requestAnimationFrame(() => {
            index = total - 1;
            render(true);
        });
    } else {
        index--;
        render(true);
    }
}

function goTo(i) {
    index = i;
    render(true);
    resetAutoplay();
}

let timer = setInterval(next, AUTO_MS);
function resetAutoplay() {
    clearInterval(timer);
    timer = setInterval(next, AUTO_MS);
}

// nextBtn.addEventListener("click", () => { next(); resetAutoplay(); });
// prevBtn.addEventListener("click", () => { prev(); resetAutoplay(); });

// Pausa o autoplay quando o mouse está sobre o carrossel
const section = track.closest("section");
section.addEventListener("mouseenter", () => clearInterval(timer));
section.addEventListener("mouseleave", resetAutoplay);

render(false);

(function () {
    const track = document.getElementById('testiTrack');
    const slides = track.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot-coment');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-pink-candy', i === currentIndex);
            dot.classList.toggle('bg-neutral-300', i !== currentIndex);
            dot.classList.toggle('w-6', i === currentIndex); // dot ativo mais largo
        });
    }

    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        updateCarousel();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Botões
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    // Dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            resetAutoplay();
        });
    });

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Suporte a swipe (touch)
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
            resetAutoplay();
        }
        isDragging = false;
    });

    // Inicializa
    updateCarousel();
    startAutoplay();
})();