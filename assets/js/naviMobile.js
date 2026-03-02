document.addEventListener("DOMContentLoaded", () => {
	const burger = document.getElementById("burgerNavi");
	const navi = document.getElementById("mainNavi");
	const closeNavi = document.getElementById("closeNavi");
	const body = document.body;

	let overlay = null;
	let lastFocusedElement = null;

	const focusableSelector = `
		a[href],
		button:not([disabled]),
		input:not([disabled]),
		select:not([disabled]),
		textarea:not([disabled]),
		[tabindex]:not([tabindex="-1"])
	`;

	function trapFocus(e) {
		if (!navi.classList.contains("open")) return;

		const focusables = navi.querySelectorAll(focusableSelector);
		if (!focusables.length) return;

		const first = focusables[0];
		const last = focusables[focusables.length - 1];

		if (e.key === "Tab") {
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}

		if (e.key === "Escape") {
			closeNaviFn();
		}
	}

	function openNavi() {
		lastFocusedElement = document.activeElement;

		navi.classList.add("open");
		closeNavi.classList.add("open");
		burger.setAttribute("aria-expanded", "true");
		body.classList.add("no-scroll");

		overlay = document.createElement("div");
		overlay.id = "overlay";
		overlay.className = "overlay";
		overlay.addEventListener("click", closeNaviFn);
		document.body.appendChild(overlay);

		document.addEventListener("keydown", trapFocus);

		// Fokus ins Menü setzen (erstes fokussierbares Element)
		const firstFocusable = navi.querySelector(focusableSelector);
		firstFocusable?.focus();
	}

	function closeNaviFn() {
		navi.classList.remove("open");
		closeNavi.classList.remove("open");
		burger.setAttribute("aria-expanded", "false");
		body.classList.remove("no-scroll");

		if (overlay) {
			overlay.remove();
			overlay = null;
		}

		document.removeEventListener("keydown", trapFocus);

		// Fokus zurück zum Auslöser
		lastFocusedElement?.focus();
	}

	if (burger && navi && closeNavi) {
		burger.addEventListener("click", () => {
			const isOpen = navi.classList.contains("open");
			isOpen ? closeNaviFn() : openNavi();
		});

		closeNavi.addEventListener("click", closeNaviFn);
	}
});
