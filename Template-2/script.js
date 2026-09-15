document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const header = document.getElementById("siteHeader");

    const menuBtn = document.getElementById("menuBtn");
    const mobileNav = document.getElementById("mobileNav");

    const searchBtn = document.getElementById("searchBtn");
    const searchOverlay = document.getElementById("searchOverlay");
    const searchPanel = document.getElementById("searchPanel");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    const bagBtn = document.getElementById("bagBtn");
    const bagOverlay = document.getElementById("bagOverlay");
    const bagPanel = document.getElementById("bagPanel");
    const closeBag = document.getElementById("closeBag");

    const bagCount = document.getElementById("bagCount");
    const bagItems = document.getElementById("bagItems");
    const bagTotal = document.getElementById("bagTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");

    const newsletterForm =
        document.getElementById("newsletterForm");

    const year =
        document.getElementById("year");


    /* =========================================
       SETTINGS
       CHANGE THIS NUMBER TO YOUR WHATSAPP
    ========================================= */

    const WHATSAPP_NUMBER = "233000000000";


    /* =========================================
       PRODUCT DATA
    ========================================= */

    const products = [
        {
            name: "Essential Oversized Tee",
            price: 39,
            category: "men",
            image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"
        },

        {
            name: "Luna Minimal Dress",
            price: 69,
            category: "women",
            image:
                "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85"
        },

        {
            name: "Classic Leather Bag",
            price: 89,
            category: "accessories",
            image:
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85"
        },

        {
            name: "Urban Street Jacket",
            price: 119,
            category: "men",
            image:
                "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85"
        },

        {
            name: "Sofia Knit Set",
            price: 79,
            category: "women",
            image:
                "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85"
        },

        {
            name: "NOVA Signature Watch",
            price: 129,
            category: "accessories",
            image:
                "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85"
        }
    ];


    /* =========================================
       SHOPPING BAG
    ========================================= */

    let bag = [];


    function saveBag() {
        localStorage.setItem(
            "novaBag",
            JSON.stringify(bag)
        );
    }


    function loadBag() {

        const savedBag =
            localStorage.getItem("novaBag");

        if (!savedBag) {
            bag = [];
            return;
        }

        try {
            bag = JSON.parse(savedBag);
        } catch {
            bag = [];
        }
    }


    function updateBag() {

        const totalItems = bag.reduce(
            (total, item) => total + item.quantity,
            0
        );

        const totalPrice = bag.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


        bagCount.textContent = totalItems;

        bagTotal.textContent =
            totalPrice.toFixed(2);


        renderBag();

        saveBag();
    }


    function addToBag(productName) {

        const product = products.find(
            item => item.name === productName
        );

        if (!product) return;


        const existingItem = bag.find(
            item => item.name === product.name
        );


        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            bag.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });

        }


        updateBag();

        openBag();

        showNotification(
            `${product.name} added to bag`
        );
    }


    function removeFromBag(productName) {

        bag = bag.filter(
            item => item.name !== productName
        );

        updateBag();
    }


    function changeQuantity(productName, amount) {

        const item = bag.find(
            product => product.name === productName
        );

        if (!item) return;


        item.quantity += amount;


        if (item.quantity <= 0) {

            bag = bag.filter(
                product => product.name !== productName
            );

        }


        updateBag();
    }


    function renderBag() {

        if (!bagItems) return;


        if (bag.length === 0) {

            bagItems.innerHTML = `
                <div class="empty-bag">

                    <div class="empty-icon">
                        ○
                    </div>

                    <h4>Your bag is empty</h4>

                    <p>
                        Add something you love.
                    </p>

                    <a
                        href="#shop"
                        class="btn btn-dark"
                        id="startShopping"
                    >
                        Start Shopping
                    </a>

                </div>
            `;

            return;
        }


        bagItems.innerHTML = bag.map(item => {

            return `
                <div class="bag-item">

                    <div class="bag-item-image">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                    </div>


                    <div class="bag-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            $${item.price.toFixed(2)}
                        </p>


                        <div
                            style="
                                display:flex;
                                align-items:center;
                                gap:8px;
                                margin-top:8px;
                            "
                        >

                            <button
                                class="quantity-btn"
                                data-action="minus"
                                data-name="${item.name}"
                                style="
                                    width:25px;
                                    height:25px;
                                    border:1px solid rgba(17,16,14,.15);
                                    background:#fff;
                                    border-radius:6px;
                                "
                            >
                                −
                            </button>


                            <strong
                                style="
                                    font-size:.78rem;
                                "
                            >
                                ${item.quantity}
                            </strong>


                            <button
                                class="quantity-btn"
                                data-action="plus"
                                data-name="${item.name}"
                                style="
                                    width:25px;
                                    height:25px;
                                    border:1px solid rgba(17,16,14,.15);
                                    background:#fff;
                                    border-radius:6px;
                                "
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        class="remove-item"
                        data-name="${item.name}"
                    >
                        Remove
                    </button>

                </div>
            `;

        }).join("");


        document
            .querySelectorAll(".remove-item")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        removeFromBag(
                            button.dataset.name
                        );

                    }
                );

            });


        document
            .querySelectorAll(".quantity-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const amount =
                            button.dataset.action === "plus"
                                ? 1
                                : -1;

                        changeQuantity(
                            button.dataset.name,
                            amount
                        );

                    }
                );

            });
    }


    /* =========================================
       BAG OPEN / CLOSE
    ========================================= */

    function openBag() {

        bagPanel.classList.add("active");
        bagOverlay.classList.add("active");

        document.body.classList.add("no-scroll");
    }


    function closeBagPanel() {

        bagPanel.classList.remove("active");
        bagOverlay.classList.remove("active");

        document.body.classList.remove("no-scroll");
    }


    bagBtn.addEventListener(
        "click",
        openBag
    );


    closeBag.addEventListener(
        "click",
        closeBagPanel
    );


    bagOverlay.addEventListener(
        "click",
        closeBagPanel
    );


    /* =========================================
       ADD TO BAG BUTTONS
    ========================================= */

    document
        .querySelectorAll(".quick-add")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const productName =
                        button.dataset.product;

                    addToBag(productName);

                }
            );

        });


    /* =========================================
       FILTER PRODUCTS
    ========================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const productCards =
        document.querySelectorAll(".product-card");


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");


                const filter =
                    button.dataset.filter;


                productCards.forEach(card => {

                    const category =
                        card.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.classList.remove("hidden");

                    } else {

                        card.classList.add("hidden");

                    }

                });

            }
        );

    });


    /* =========================================
       SEARCH
    ========================================= */

    function openSearch() {

        searchPanel.classList.add("active");
        searchOverlay.classList.add("active");

        document.body.classList.add("no-scroll");

        setTimeout(() => {

            searchInput.focus();

        }, 300);
    }


    function closeSearchPanel() {

        searchPanel.classList.remove("active");
        searchOverlay.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }


    searchBtn.addEventListener(
        "click",
        openSearch
    );


    closeSearch.addEventListener(
        "click",
        closeSearchPanel
    );


    searchOverlay.addEventListener(
        "click",
        closeSearchPanel
    );


    function searchProducts(query) {

        const cleanQuery =
            query.trim().toLowerCase();


        if (!cleanQuery) {

            searchResults.innerHTML = "";

            return;
        }


        const matches =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(cleanQuery)
            );


        if (matches.length === 0) {

            searchResults.innerHTML = `
                <div
                    style="
                        padding:20px;
                        text-align:center;
                        color:#77736d;
                    "
                >
                    No products found.
                </div>
            `;

            return;
        }


        searchResults.innerHTML =
            matches.map(product => {

                return `
                    <div class="search-result">

                        <div>

                            <strong>
                                ${product.name}
                            </strong>

                            <div
                                style="
                                    color:#77736d;
                                    font-size:.75rem;
                                    margin-top:3px;
                                "
                            >
                                ${product.category}
                            </div>

                        </div>

                        <span>
                            $${product.price}
                        </span>

                    </div>
                `;

            }).join("");
    }


    searchInput.addEventListener(
        "input",
        () => {

            searchProducts(
                searchInput.value
            );

        }
    );


    /* =========================================
       MOBILE MENU
    ========================================= */

    menuBtn.addEventListener(
        "click",
        () => {

            mobileNav.classList.toggle("active");

        }
    );


    document
        .querySelectorAll(".mobile-nav a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove(
                        "active"
                    );

                }
            );

        });


    /* =========================================
       HEADER SCROLL
    ========================================= */

    function handleHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleHeader
    );


    handleHeader();


    /* =========================================
       NEWSLETTER
    ========================================= */

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "newsletterEmail"
                ).value.trim();


            if (!email) return;


            newsletterForm.innerHTML = `
                <p
                    style="
                        color:#e86f32;
                        font-weight:700;
                        padding:15px 0;
                    "
                >
                    You're on the list ✓
                </p>
            `;

        }
    );


    /* =========================================
       CHECKOUT / WHATSAPP
    ========================================= */

    checkoutBtn.addEventListener(
        "click",
        () => {

            if (bag.length === 0) {

                showNotification(
                    "Your bag is empty."
                );

                return;
            }


            let message =
                "Hello NOVA! 👋%0A%0A" +
                "I'd like to order:%0A";


            bag.forEach(item => {

                message +=
                    `%0A• ${item.name}` +
                    ` x${item.quantity}` +
                    ` — $${(
                        item.price *
                        item.quantity
                    ).toFixed(2)}`;

            });


            const total =
                bag.reduce(
                    (sum, item) =>
                        sum +
                        item.price *
                        item.quantity,
                    0
                );


            message +=
                `%0A%0ATotal: $${total.toFixed(2)}` +
                `%0A%0APlease send me the next steps.`;


            window.open(
                `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
                "_blank"
            );

        }
    );


    /* =========================================
       WHATSAPP LINKS
       UPDATE ALL PLACEHOLDERS AUTOMATICALLY
    ========================================= */

    document
        .querySelectorAll(
            'a[href*="wa.me/233000000000"]'
        )
        .forEach(link => {

            link.href =
                `https://wa.me/${WHATSAPP_NUMBER}`;

        });


    /* =========================================
       START SHOPPING FROM BAG
    ========================================= */

    document.addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "startShopping"
            ) {

                closeBagPanel();

            }

        }
    );


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            closeBagPanel();
            closeSearchPanel();

            mobileNav.classList.remove(
                "active"
            );

        }
    );


    /* =========================================
       NOTIFICATION
    ========================================= */

    function showNotification(message) {

        const oldNotification =
            document.querySelector(
                ".nova-notification"
            );

        if (oldNotification) {
            oldNotification.remove();
        }


        const notification =
            document.createElement("div");


        notification.className =
            "nova-notification";


        notification.textContent =
            message;


        Object.assign(
            notification.style,
            {
                position: "fixed",
                left: "50%",
                bottom: "25px",
                transform: "translateX(-50%) translateY(20px)",
                zIndex: "3000",
                background: "#11100e",
                color: "#fff",
                padding: "13px 20px",
                borderRadius: "100px",
                fontSize: ".8rem",
                fontWeight: "700",
                opacity: "0",
                transition: "all .3s ease",
                boxShadow: "0 15px 40px rgba(0,0,0,.2)"
            }
        );


        document.body.appendChild(
            notification
        );


        requestAnimationFrame(() => {

            notification.style.opacity = "1";

            notification.style.transform =
                "translateX(-50%) translateY(0)";

        });


        setTimeout(() => {

            notification.style.opacity = "0";

            notification.style.transform =
                "translateX(-50%) translateY(20px)";


            setTimeout(() => {

                notification.remove();

            }, 300);

        }, 2200);

    }


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       LOAD SAVED BAG
    ========================================= */

    loadBag();

    updateBag();

});