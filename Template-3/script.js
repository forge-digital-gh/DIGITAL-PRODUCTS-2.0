/* =========================================
   SAVOR — TEMPLATE 3
   Restaurant / Café / Food Website
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CONFIG
    ========================================= */

    const WHATSAPP_NUMBER = "233000000000";

    const whatsappBase = `https://wa.me/${WHATSAPP_NUMBER}`;


    /* =========================================
       ELEMENTS
    ========================================= */

    const header = document.querySelector(".site-header");

    const menuBtn = document.querySelector(".menu-btn");
    const mobileNav = document.querySelector(".mobile-nav");

    const cartBtn = document.querySelector(".cart-btn");
    const cartCount = document.querySelector("#cartCount");

    const cartOverlay = document.querySelector(".cart-overlay");
    const cartPanel = document.querySelector(".cart-panel");

    const cartItems = document.querySelector(".cart-items");
    const cartTotal = document.querySelector("#cartTotal");

    const checkoutBtn = document.querySelector(".checkout-btn");

    const menuFilters = document.querySelectorAll(".menu-filter");
    const menuCards = document.querySelectorAll(".menu-card");

    const reservationForm = document.querySelector(".reservation-form");

    const footerYear = document.querySelector("#year");


    /* =========================================
       MENU DATA
    ========================================= */

    const menuData = [
        {
            id: 1,
            name: "Truffle Cream Pasta",
            price: 18,
            category: "mains",
            image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85"
        },

        {
            id: 2,
            name: "Signature Margherita",
            price: 15,
            category: "pizza",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85"
        },

        {
            id: 3,
            name: "Grilled Steak",
            price: 28,
            category: "mains",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85"
        },

        {
            id: 4,
            name: "Passion Fruit Cooler",
            price: 7,
            category: "drinks",
            image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1000&q=85"
        },

        {
            id: 5,
            name: "Chocolate Lava Cake",
            price: 9,
            category: "desserts",
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85"
        },

        {
            id: 6,
            name: "Herb Roasted Chicken",
            price: 21,
            category: "mains",
            image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85"
        }
    ];


    /* =========================================
       CART
    ========================================= */

    let cart = JSON.parse(localStorage.getItem("savorCart")) || [];


    /* =========================================
       SAVE CART
    ========================================= */

    function saveCart() {
        localStorage.setItem("savorCart", JSON.stringify(cart));
    }


    /* =========================================
       UPDATE CART COUNT
    ========================================= */

    function updateCartCount() {

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }


    /* =========================================
       UPDATE CART DISPLAY
    ========================================= */

    function renderCart() {

        if (!cartItems) return;

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>

                    <h4>Your cart is empty</h4>

                    <p>
                        Add something delicious from our menu.
                    </p>

                    <button class="btn btn-dark" id="startShopping">
                        View Menu
                    </button>
                </div>
            `;

            if (cartTotal) {
                cartTotal.textContent = "$0.00";
            }

            const startShopping =
                document.querySelector("#startShopping");

            if (startShopping) {
                startShopping.addEventListener("click", () => {
                    closeCart();

                    document
                        .querySelector("#menu")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });
                });
            }

            updateCartCount();

            return;
        }


        cartItems.innerHTML = cart.map(item => {

            const subtotal = item.price * item.quantity;

            return `
                <div class="cart-item">

                    <div class="cart-item-image">
                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >
                    </div>

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <p>$${item.price.toFixed(2)}</p>

                        <div class="quantity-controls">

                            <button
                                class="quantity-btn"
                                data-action="decrease"
                                data-id="${item.id}"
                            >
                                −
                            </button>

                            <span class="quantity-value">
                                ${item.quantity}
                            </span>

                            <button
                                class="quantity-btn"
                                data-action="increase"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <div>

                        <strong>
                            $${subtotal.toFixed(2)}
                        </strong>

                        <br>

                        <button
                            class="remove-cart-item"
                            data-action="remove"
                            data-id="${item.id}"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;

        }).join("");


        const total = cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

        if (cartTotal) {
            cartTotal.textContent =
                `$${total.toFixed(2)}`;
        }


        updateCartCount();
    }


    /* =========================================
       ADD TO CART
    ========================================= */

    function addToCart(id) {

        const product = menuData.find(
            item => item.id === id
        );

        if (!product) return;


        const existingItem = cart.find(
            item => item.id === id
        );


        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });

        }


        saveCart();
        renderCart();

        showNotification(
            `${product.name} added to your cart`
        );
    }


    /* =========================================
       CHANGE QUANTITY
    ========================================= */

    function changeQuantity(id, action) {

        const item = cart.find(
            product => product.id === id
        );

        if (!item) return;


        if (action === "increase") {
            item.quantity += 1;
        }


        if (action === "decrease") {

            item.quantity -= 1;

            if (item.quantity <= 0) {

                cart = cart.filter(
                    product => product.id !== id
                );

            }
        }


        if (action === "remove") {

            cart = cart.filter(
                product => product.id !== id
            );
        }


        saveCart();
        renderCart();
    }


    /* =========================================
       ADD BUTTON EVENTS
    ========================================= */

    document
        .querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(
                    button.dataset.id
                );

                addToCart(id);
            });

        });


    /* =========================================
       CART ACTION EVENTS
    ========================================= */

    if (cartItems) {

        cartItems.addEventListener("click", event => {

            const button =
                event.target.closest("[data-action]");

            if (!button) return;


            const id = Number(
                button.dataset.id
            );

            const action =
                button.dataset.action;


            changeQuantity(id, action);

        });
    }


    /* =========================================
       OPEN CART
    ========================================= */

    function openCart() {

        cartPanel?.classList.add("active");
        cartOverlay?.classList.add("active");

        document.body.classList.add("no-scroll");

        renderCart();
    }


    /* =========================================
       CLOSE CART
    ========================================= */

    function closeCart() {

        cartPanel?.classList.remove("active");
        cartOverlay?.classList.remove("active");

        document.body.classList.remove("no-scroll");
    }


    cartBtn?.addEventListener(
        "click",
        openCart
    );


    cartOverlay?.addEventListener(
        "click",
        closeCart
    );


    document
        .querySelector(".cart-close")
        ?.addEventListener(
            "click",
            closeCart
        );


    /* =========================================
       CHECKOUT / WHATSAPP
    ========================================= */

    checkoutBtn?.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showNotification(
                    "Your cart is empty."
                );

                return;
            }


            let message =
                "Hello SAVOR! I would like to place an order.%0A%0A";


            cart.forEach(item => {

                message +=
                    `${item.name} x${item.quantity} — $${(
                        item.price * item.quantity
                    ).toFixed(2)}%0A`;

            });


            const total = cart.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );


            message +=
                `%0ATotal: $${total.toFixed(2)}`;


            window.open(
                `${whatsappBase}?text=${message}`,
                "_blank"
            );
        }
    );


    /* =========================================
       MENU FILTERS
    ========================================= */

    menuFilters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                menuFilters.forEach(
                    button =>
                        button.classList.remove("active")
                );

                filter.classList.add("active");


                const selected =
                    filter.dataset.filter;


                menuCards.forEach(card => {

                    const category =
                        card.dataset.category;


                    if (
                        selected === "all" ||
                        category === selected
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
       MOBILE MENU
    ========================================= */

    menuBtn?.addEventListener(
        "click",
        () => {

            mobileNav?.classList.toggle("active");

        }
    );


    document
        .querySelectorAll(".mobile-nav a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav?.classList.remove(
                        "active"
                    );

                }
            );

        });


    /* =========================================
       HEADER SCROLL
    ========================================= */

    function handleHeader() {

        if (!header) return;


        if (window.scrollY > 40) {

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
       RESERVATION FORM
    ========================================= */

    reservationForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(reservationForm);


            const name =
                formData.get("name") || "";

            const phone =
                formData.get("phone") || "";

            const date =
                formData.get("date") || "";

            const time =
                formData.get("time") || "";

            const guests =
                formData.get("guests") || "";

            const request =
                formData.get("request") || "None";


            const message =
                `Hello SAVOR! I would like to reserve a table.%0A%0A` +
                `Name: ${name}%0A` +
                `Phone: ${phone}%0A` +
                `Date: ${date}%0A` +
                `Time: ${time}%0A` +
                `Guests: ${guests}%0A` +
                `Special request: ${request}`;


            window.open(
                `${whatsappBase}?text=${message}`,
                "_blank"
            );


            reservationForm.reset();


            showNotification(
                "Reservation request prepared!"
            );

        }
    );


    /* =========================================
       SET MINIMUM DATE
    ========================================= */

    const dateInput =
        document.querySelector(
            'input[type="date"]'
        );


    if (dateInput) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        dateInput.min = today;
    }


    /* =========================================
       UPDATE WHATSAPP LINKS
    ========================================= */

    document
        .querySelectorAll(
            'a[href*="233000000000"]'
        )
        .forEach(link => {

            const currentUrl =
                link.getAttribute("href");

            if (!currentUrl) return;


            link.setAttribute(
                "href",
                currentUrl.replace(
                    "233000000000",
                    WHATSAPP_NUMBER
                )
            );

        });


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            closeCart();

            mobileNav?.classList.remove(
                "active"
            );

        }
    );


    /* =========================================
       NOTIFICATION
    ========================================= */

    function showNotification(message) {

        let notification =
            document.querySelector(
                ".savor-notification"
            );


        if (!notification) {

            notification =
                document.createElement("div");

            notification.className =
                "savor-notification";


            notification.innerHTML = `
                <span></span>
            `;


            document.body.appendChild(
                notification
            );


            const style =
                document.createElement("style");


            style.textContent = `
                .savor-notification {
                    position: fixed;
                    left: 50%;
                    bottom: 30px;

                    z-index: 3000;

                    transform:
                        translate(-50%, 20px);

                    padding: 13px 20px;

                    border-radius: 100px;

                    background: #171613;
                    color: #ffffff;

                    box-shadow:
                        0 15px 45px rgba(0,0,0,.3);

                    font-size: .76rem;
                    font-weight: 700;

                    opacity: 0;

                    pointer-events: none;

                    transition:
                        opacity .3s ease,
                        transform .3s ease;
                }

                .savor-notification.show {
                    opacity: 1;

                    transform:
                        translate(-50%, 0);
                }

                .savor-notification span {
                    color: #f0c66b;
                }
            `;


            document.head.appendChild(style);
        }


        notification.querySelector(
            "span"
        ).textContent = message;


        notification.classList.add("show");


        clearTimeout(
            notification.timeout
        );


        notification.timeout =
            setTimeout(() => {

                notification.classList.remove(
                    "show"
                );

            }, 2500);
    }


    /* =========================================
       FOOTER YEAR
    ========================================= */

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       INITIALIZE
    ========================================= */

    renderCart();
    updateCartCount();

});