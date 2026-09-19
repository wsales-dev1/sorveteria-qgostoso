//SCRIPT 1
/* ================= CARD BUILDERS ================= */


const oferta = {
    name: "Primavera do Açaí",
    descricao:
        "Compre um açaí e ganhe #valordesconto# de desconto no segundo!",
    desconto: "10%",
    img: "assets/img/acai.webp",
};

const instaImgs = [
    "https://placehold.co/240x240/fce7f3/EC4899?text=IG+1",
    "https://placehold.co/240x240/f3e8ff/7C3AED?text=IG+2",
    "https://placehold.co/240x240/dcfce7/16a34a?text=IG+3",
    "https://placehold.co/240x240/fef3c7/f59e0b?text=IG+4",
    "https://placehold.co/240x240/dbeafe/3b82f6?text=IG+5",
];

/* ================= CARD BUILDERS ================= */
function productCard(p, i) {
    return `
        <div class="carousel-slide flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 md:px-3">
            <div class="rainbow product-card bg-white rounded-2xl shadow-sm border border-neutral-100 p-4 md:p-6 h-full flex flex-col">
                <div class="relative mb-3 md:mb-4">
                    <button class="absolute top-2 right-2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow flex items-center justify-center text-pink-candy z-10 text-xl md:text-2xl hover:text-red-500 transition-colors">♡</button>
                    <img src="${p.img}" alt="${p.name}" class="rounded-xl w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover">
                </div>
                <div class="flex items-start justify-between mb-3 md:mb-4">
                    <h3 class="font-semibold text-xl sm:text-2xl md:text-3xl">${p.name}</h3>
                    <span class="text-base sm:text-lg md:text-xl text-yellow-500 whitespace-nowrap ml-2">★ ${p.rating}</span>
                </div>
                <p class="text-base sm:text-lg md:text-xl text-neutral-500 flex-1 pb-2 md:pb-3">${p.desc}</p>
                <div class="flex items-center">
                    <span class="text-neutral-400 text-sm sm:text-base md:text-lg line-through mr-2">${p.old_price}</span>
                </div>
                <div class="flex items-center">
                    <span class="text-pink-candy font-bold text-2xl sm:text-3xl md:text-4xl">${p.price}</span>
                </div>
            </div>
        </div>`;
}

function categoryCard(c, i) {
    return `<div class="relative rounded-[2rem] overflow-hidden transition-transform hover:shadow-2xl hover:scale-[1.05] duration-300 w-full max-w-sm mx-auto group cursor-pointer" data-product-id="${c.id}">
                <div class="absolute inset-0 h-full w-full overflow-hidden">
                    <img src="${c.img}" alt="${c.name}" class="w-full h-full object-cover contrast-125 object-center opacity-90 transition-transform duration-300 ease-in-out group-hover:scale-110 grayscale-0">
                    <div class="noise-overlay"></div>
                    <div class="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-0"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent top-1/4 opacity-100 transition-opacity duration-300 group-hover:opacity-0"></div>
                </div>
                <div class="relative z-10 flex flex-col justify-end h-[45vh] p-8">
                    <div class="absolute inset-0 z-10 flex items-center justify-center p-8">
                        <button id="cat-${c.id}" class="category-btn w-full max-w-[90%] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 
                            hover:text-blue-500 p-3 bg-white rounded-xl uppercase border border-2 border-transparent group-hover:border-pink-candy font-semibold text-lg text-pink-candy">
                            ${c.name} ➜
                        </button>
                    </div>
                </div>
            </div>`;
}

async function carregarDados() {
    const resposta = await fetch('./assets/js/data.json');
    const product = await resposta.json();

    window.product = product;

    document.getElementById("catGrid").innerHTML = product
        .map(categoryCard)
        .join("");

    // Delegação de eventos - um único listener para todos os botões
    document.getElementById("catGrid").addEventListener("click", function (e) {
        const btn = e.target.closest('.category-btn');
        if (btn) {
            const card = btn.closest('[data-product-id]');
            if (card) {
                const productId = parseInt(card.dataset.productId);
                window.productSelected = window.product.find(x => x.id == productId);

                document.getElementById("preco-cascao-comum").textContent = "R$" + (window.productSelected?.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                document.getElementById("preco-cascao-especial").textContent = "R$" + (window.productSelected?.price + 1).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                document.getElementById("total-produtos-comum").textContent = window.productSelected.categoria['comum'].length;
                if (window.productSelected.categoria['comum'].length === 0) document.getElementById("btnProdutoComum").style.display = "none";
                else document.getElementById("btnProdutoComum").style.display = "block";

                document.getElementById("total-produtos-especial").textContent = window.productSelected.categoria['especial'].length;
                if (window.productSelected.categoria['especial'].length === 0) document.getElementById("btnProdutoEspecial").style.display = "none";
                else document.getElementById("btnProdutoEspecial").style.display = "block";

                openModalWithCategory();
            }
        }
    });
}

carregarDados();




document.getElementById("texto-oferta").innerHTML = oferta.name;
document.getElementById("texto-oferta-descricao").innerHTML =
    oferta.descricao.replace("#valordesconto#", oferta.desconto);
document.getElementById("desconto-oferta").innerHTML =
    oferta.desconto + " <br>OFF";
document.getElementById("img-oferta").src = oferta.img;

/* ================= SCROLL REVEAL ================= */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 },
);

document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
    .forEach((el) => observer.observe(el));

/* back to top */
const toTopBtn = document.getElementById("toTop");
window.addEventListener("scroll", () => {
    toTopBtn.style.opacity = window.scrollY > 400 ? "1" : "0";
});
toTopBtn.style.opacity = "0";
toTopBtn.style.transition = "opacity .3s ease";
toTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
);