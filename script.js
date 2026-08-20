/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1200);

});


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {

    nav.classList.toggle("active");

});


/* Закрываем мобильное меню
   после нажатия на ссылку */

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* =========================
   MODALS
========================= */

const modals = document.querySelectorAll(".modal");


function openModal(modalId) {

    const modal = document.getElementById(modalId);

    if (!modal) return;

    modal.classList.add("active");

    document.body.classList.add("modal-open");

}


function closeModal(modalId) {

    const modal = document.getElementById(modalId);

    if (!modal) return;

    modal.classList.remove("active");

    /*
        Проверяем, есть ли ещё открытое окно.
        Если нет — снова разрешаем прокрутку страницы.
    */

    const anotherModalIsOpen =
        document.querySelector(".modal.active");

    if (!anotherModalIsOpen) {
        document.body.classList.remove("modal-open");
    }

}


/* =========================
   CLOSE BUTTONS
========================= */

document.querySelectorAll("[data-close]").forEach(button => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.close;

        closeModal(modalId);

    });

});


/* =========================
   CLOSE BY OVERLAY
========================= */

modals.forEach(modal => {

    const overlay = modal.querySelector(".modal-overlay");

    overlay.addEventListener("click", () => {

        closeModal(modal.id);

    });

});


/* =========================
   CLOSE BY ESC
========================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        const activeModal =
            document.querySelector(".modal.active");

        if (activeModal) {
            closeModal(activeModal.id);
        }

    }

});


/* =========================
   ORDER BUTTONS
========================= */

const orderButton = document.getElementById("orderButton");
const contactButton = document.getElementById("contactButton");

orderButton.addEventListener("click", () => {

    openModal("orderModal");

});

contactButton.addEventListener("click", () => {

    openModal("orderModal");

});


/* =========================
   HELP BUTTON
========================= */

const helpButton = document.getElementById("helpButton");

helpButton.addEventListener("click", () => {

    openModal("helpModal");

});


/* =========================
   FORM HELP
========================= */

const formHelpButton =
    document.getElementById("formHelpButton");

formHelpButton.addEventListener("click", () => {

    openModal("helpModal");

});


/* =========================
   PORTFOLIO
========================= */

const portfolioButton =
    document.getElementById("portfolioButton");

portfolioButton.addEventListener("click", () => {

    openModal("portfolioModal");

});


/* =========================
   REVIEW
========================= */

const reviewButton =
    document.getElementById("reviewButton");

reviewButton.addEventListener("click", () => {

    openModal("reviewModal");

});


/* =========================
   ORDER FORM
========================= */


const orderForm =
    document.getElementById("orderForm");

orderForm.addEventListener("submit", async event => {

    event.preventDefault();

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const description =
        document.getElementById("description").value.trim();


    if (
        !firstName ||
        !lastName ||
        !email ||
        !description
    ) {

        alert("Пожалуйста, заполните все поля.");

        return;

    }


    const formData = new FormData();

    formData.append("Имя", firstName);
    formData.append("Фамилия", lastName);
    formData.append("Email клиента", email);
    formData.append("Описание сайта", description);


    try {

        const response = await fetch(
            "https://formspree.io/f/mgawdvle",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (response.ok) {

            closeModal("orderModal");

            orderForm.reset();

            openModal("successModal");

        } else {

            alert(
                "Не удалось отправить заявку. Попробуйте ещё раз."
            );

        }

    } catch (error) {

        alert(
            "Произошла ошибка соединения. Проверьте интернет."
        );

    }

});


/* =========================
   REVIEW FORM
========================= */

const reviewForm =
    document.getElementById("reviewForm");

reviewForm.addEventListener("submit", async event => {

    event.preventDefault();

    const name =
        document.getElementById("reviewName").value.trim();

    const text =
        document.getElementById("reviewText").value.trim();

    if (!name || !text) {

        alert("Пожалуйста, заполните все поля.");

        return;

    }

    const formData = new FormData();

    formData.append("Имя", name);
    formData.append("Отзыв", text);

    try {

        const response = await fetch(
            "https://formspree.io/f/xljrzbnz",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (response.ok) {

            reviewForm.reset();

            closeModal("reviewModal");

            alert("Спасибо! Отзыв отправлен.");

        } else {

            alert("Не удалось отправить отзыв. Попробуйте ещё раз.");

        }

    } catch (error) {

        alert("Ошибка соединения. Проверьте интернет.");

    }

});
/* =========================
   FAQ
========================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const item =
            question.parentElement;

        const answer =
            item.querySelector(".faq-answer");


        item.classList.toggle("active");


        if (item.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});


/* =========================
   SCROLL TOP
========================= */

const scrollTopButton =
    document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTopButton.classList.add("visible");

    } else {

        scrollTopButton.classList.remove("visible");

    }

});


scrollTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   REVEAL ANIMATIONS
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   PROTECT AGAINST MODAL
   SCROLL ISSUES
========================= */

window.addEventListener("resize", () => {

    const activeModal =
        document.querySelector(".modal.active");

    if (!activeModal) {

        document.body.classList.remove("modal-open");

    }

});