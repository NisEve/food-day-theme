document.addEventListener("DOMContentLoaded", () => {
	const burger = document.getElementById("burgerNavi");
	const navi = document.getElementById("mainNavi");
	const closeNavi = document.getElementById("closeNavi");
	const body = document.body;

	let overlay = null;

	function openNavi() {
		navi.classList.add("open");
		closeNavi.classList.add("open");
		burger.setAttribute("aria-expanded", "true");
		body.classList.add("no-scroll");

		overlay = document.createElement("div");
		overlay.id = "overlay";
		overlay.className = "overlay";

		overlay.addEventListener("click", closeNaviFn);
		document.body.appendChild(overlay);
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
	}

	if (burger && navi && closeNavi) {
		burger.addEventListener("click", () => {
			const isOpen = navi.classList.contains("open");
			isOpen ? closeNaviFn() : openNavi();
		});

		closeNavi.addEventListener("click", closeNaviFn);
	}
});
