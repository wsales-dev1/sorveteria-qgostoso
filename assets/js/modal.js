// ============================================
// DADOS DE EXEMPLO
// ============================================
const productsData = {
    comum: [
        {
            id: 1,
            name: "Chocolate c/ Amendoim",
            img: "assets/img/cascao/cascao_cobertura_chocolate.webp",
            badge: "Oferta",
            color: "text-blue-300 to-cyan-500/20",
            bg_color: "from-blue-500/20 to-cyan-500/20",
        },
        {
            id: 2,
            name: "Morango c/ Confetti",
            img: "assets/img/cascao/cascao_cobertura_morango.webp",
            badge: "Novo",
            color: "text-emerald-300 to-teal-500/20",
            bg_color: "from-emerald-500/20 to-teal-500/20",
        }
    ],
    especial: [
        {
            id: 101,
            name: "Trufado C/ Nutella e Amendoim",
            img: "assets/img/cascao/cascao_cobertura_trufado.webp",
            badge: "Premium",
            color: "text-rose-300 to-pink-500/20",
            bg_color: "from-rose-500/20 to-pink-500/20",
        },
        {
            id: 102,
            name: "Trufado C/ Ovomaltine",
            img: "assets/img/cascao/cascao_trufado_ovomaltine.webp",
            badge: "Importado",
            color: "text-amber-300 to-yellow-500/20",
            bg_color: "from-amber-500/20 to-yellow-500/20",
        },
        {
            id: 103,
            name: "Trufado C/ Brigadeiro",
            img: "assets/img/cascao/cascao_trufado_brigadeiro.webp",
            badge: "Oferta",
            color: "text-red-300 to-orange-500/20",
            bg_color: "from-red-500/20 to-orange-500/20",
        },
        {
            id: 104,
            name: "Trufado C/ Nutella",
            img: "assets/img/cascao/cascao_trufado_nutella.webp",
            badge: "Oferta",
            color: "text-lime-300 to-green-500/20",
            bg_color: "from-lime-500/20 to-green-500/20",
        },
        {
            id: 105,
            name: "Trufado C/ Amendoim",
            img: "assets/img/cascao/cascao_trufado_amendoim.webp",
            badge: "Oferta",
            color: "text-emerald-300 to-teal-500/20",
            bg_color: "from-emerald-500/20 to-teal-500/20",
        },
        {
            id: 106,
            name: "Trufado C/ Nutella e Banana",
            img: "assets/img/cascao/cascao_trufado_nutella_banana.webp",
            badge: "Oferta",
            color: "text-cyan-300 to-sky-500/20",
            bg_color: "from-cyan-500/20 to-sky-500/20",
        },
        {
            id: 107,
            name: "Calda Quente C/ Chocolate",
            img: "assets/img/cascao/cascao_calda_quente.webp",
            badge: "Oferta",
            color: "text-blue-300 to-indigo-500/20",
            bg_color: "from-blue-500/20 to-indigo-500/20",
        }
    ],
};

// ============================================
// ELEMENTOS DOM
// ============================================
const modalOverlay = document.getElementById("modalOverlay");
const modalContainer = document.getElementById("modalContainer");
const closeBtn = document.getElementById("closeModalBtn");
const backBtn = document.getElementById("backBtn");
const categoriesView = document.getElementById("categoriesView");
const productsView = document.getElementById("productsView");
const productsGrid = document.getElementById("productsGrid");
const pageTitle = document.getElementById("pageTitle");
const categoryCards = document.querySelectorAll(".category-card");
let currentCategory = "";

// ============================================
// FUNÇÕES
// ============================================
function openModal() {
    modalOverlay.classList.remove("pointer-events-none", "opacity-0");
    modalOverlay.classList.add("opacity-100");

    setTimeout(() => {
        modalContainer.classList.remove("translate-y-8", "scale-95");
        modalContainer.classList.add("translate-y-0", "scale-100");
    }, 50);

    document.body.style.overflow = "hidden";
    showCategories();
}

function closeModal() {
    modalContainer.classList.remove("translate-y-0", "scale-100");
    modalContainer.classList.add("translate-y-8", "scale-95");

    setTimeout(() => {
        modalOverlay.classList.remove("opacity-100");
        modalOverlay.classList.add("opacity-0", "pointer-events-none");
        document.body.style.overflow = "";
    }, 600);
}

function showCategories() {
    categoriesView.classList.remove("hidden");
    categoriesView.style.display = "block";
    productsView.classList.add("hidden");
    productsView.style.display = "none";
    pageTitle.textContent = "📋 Categorias";
    backBtn.style.opacity = "0.5";
    backBtn.style.pointerEvents = "none";
    // Reset scroll
    document.getElementById("contentContainer").scrollTop = 0;
}

function showProducts(category) {
    const products = window.productSelected.categoria[category];//productsData[category];
    if (!products || products.length === 0) {
        // console.warn(`Nenhum produto encontrado para a categoria: ${category}`);
        return;
    }

    const categoryNames = {
        comum: "🍦 Comum",
        especial: "⭐ Especial",
    };

    pageTitle.textContent = categoryNames[category] || "Produtos";
    backBtn.style.opacity = "1";
    backBtn.style.pointerEvents = "auto";



    // Esconde categorias e mostra produtos
    categoriesView.style.display = "none";
    categoriesView.classList.add("hidden");
    productsView.classList.remove("hidden");
    productsView.style.display = "block";

    // Renderiza produtos com squircle
    renderProducts(products);

    // Scroll para o topo
    document.getElementById("contentContainer").scrollTop = 0;
}



// const openBtn = document.getElementById("cat-1");
// openBtn.addEventListener("click", openModal);

function openModalWithCategory(category) {
    openModal();
    // showProducts(category);
}

function renderProducts(products) {
    productsGrid.innerHTML = products
        .map(
            (product, index) =>
                `<div class="product-item" style="transition-delay: ${index * 80}ms">
                    <div class="product-squircle relative glow-effect">
                        <div class="squircle-border" aria-hidden="true">
                    </div>
                    
                    <div class="product-content bg-gradient-to-br ${product.bg_color || "from-white/5 to-white/5"}">
                        <h4 class="font-semibold text-lg ${product.color || "text-white"}">${product.name}</h4>
                        <img src="${product.img}" alt="${product.name}" class="product-icon h-72 object-cover rounded-t-2xl relative" style="bottom: -40px;" /> 
                        </div>
                    </div>
                </div>`,
        )
        .join("");

    // Anima entrada com stagger
    requestAnimationFrame(() => {
        document.querySelectorAll(".product-item").forEach((el, i) => {
            setTimeout(() => {
                el.classList.add("visible");
            }, i * 80);
        });
    });
}

// ============================================
// EVENT LISTENERS
// ============================================



closeBtn.addEventListener("click", closeModal);
backBtn.addEventListener("click", showCategories);

// Clique nas categorias
categoryCards.forEach((card) => {
    card.addEventListener("click", (x) => {
        // console.log("Categoria clicada:", card.dataset.category);
        const category = card.dataset.category;
        showProducts(category);

        // window.categorySelected
        // const category = window.product.find(x => x.id == card.dataset.category);
        // openModalWithCategory(category);
    });
});

// Fechar ao clicar no overlay (apenas no fundo)
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Tecla ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (
            productsView.style.display !== "none" &&
            productsView.style.display !== ""
        ) {
            showCategories();
        } else {
            closeModal();
        }
    }
});

// ============================================
// TOUCH/GESTOS (Swipe para voltar)
// ============================================
let touchStartX = 0;
let touchStartY = 0;
let isSwiping = false;

document.getElementById("contentContainer").addEventListener(
    "touchstart",
    (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
    },
    { passive: true },
);

document.getElementById("contentContainer").addEventListener(
    "touchmove",
    (e) => {
        if (!isSwiping) return;
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;

        // Se for swipe horizontal para direita e estiver na view de produtos
        if (
            deltaX > 80 &&
            Math.abs(deltaY) < 50 &&
            productsView.style.display !== "none"
        ) {
            isSwiping = false;
            showCategories();
        }
    },
    { passive: true },
);

document.getElementById("contentContainer").addEventListener(
    "touchend",
    () => {
        isSwiping = false;
    },
    { passive: true },
);

// ============================================
// INICIALIZAÇÃO
// ============================================
// Garante que a view inicial seja categorias
showCategories();
