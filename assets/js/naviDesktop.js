document.querySelectorAll("#mainNavi li").forEach(li => {
	const link = li.querySelector(":scope > a");
	if (!link) return;

	const submenu = li.querySelector(":scope > ul");

	/* Wrapper immer (für sauberes Markup / Layout) */
	const wrapper = document.createElement("div");
	wrapper.className = "menu-item";
	link.before(wrapper);
	wrapper.appendChild(link);

	/* ❗ Nur wenn Submenü existiert */
	if (!submenu) return;

	li.classList.add("has-submenu");
	submenu.hidden = true;

	/* Button */
	const button = document.createElement("button");
	button.type = "button";
	button.className = "submenu-toggle";
	button.innerHTML = `<span aria-hidden="true">▾</span>`;

	/* ARIA */
	button.setAttribute("aria-haspopup", "true");
	button.setAttribute("aria-expanded", "false");
	button.setAttribute(
		"aria-label",
		`Untermenü ${link.textContent.trim()} öffnen`
	);

	wrapper.appendChild(button);



	/* Click */
	button.addEventListener("click", () => {
		const open = button.getAttribute("aria-expanded") === "true";
		button.setAttribute("aria-expanded", String(!open));
		submenu.hidden = open;
		li.classList.toggle("is-open", !open);
	});

	/* Keyboard: Enter / Space */
	button.addEventListener("keydown", e => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			button.click();
			submenu.querySelector("a")?.focus();
		}
	});

	/* Keyboard: Escape */
	li.addEventListener("keydown", e => {
		if (e.key === "Escape" && !submenu.hidden) {
			button.setAttribute("aria-expanded", "false");
			submenu.hidden = true;
			li.classList.remove("is-open");
			button.focus();
		}
	});

	li.addEventListener("focusout", e => {
		// Element, das jetzt Fokus bekommt
		const nextFocus = e.relatedTarget;

		// Wenn Fokus komplett außerhalb des <li> geht → schließen
		if (!li.contains(nextFocus)) {
			button.setAttribute("aria-expanded", "false");
			submenu.hidden = true;
			li.classList.remove("is-open");
		}
	});
});
