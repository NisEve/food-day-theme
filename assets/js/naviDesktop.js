const desktopQuery = window.matchMedia("(min-width: 1024px)");

function initDesktopMenu() {
	document.querySelectorAll("#mainNavi li").forEach(li => {
		// Verhindert doppeltes Initialisieren
		if (li.dataset.desktopInit === "true") return;

		const link = li.querySelector(":scope > a");
		if (!link) return;

		const submenu = li.querySelector(":scope > ul");

		/* Wrapper immer */
		const wrapper = document.createElement("div");
		wrapper.className = "menu-item";
		link.before(wrapper);
		wrapper.appendChild(link);

		/* Nur wenn Submenü existiert */
		if (!submenu) {
			li.dataset.desktopInit = "true";
			return;
		}

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
		const onClick = () => {
			const open = button.getAttribute("aria-expanded") === "true";
			button.setAttribute("aria-expanded", String(!open));
			submenu.hidden = open;
			li.classList.toggle("is-open", !open);
		};

		button.addEventListener("click", onClick);

		/* Keyboard: Enter / Space */
		const onButtonKeydown = e => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
				submenu.querySelector("a")?.focus();
			}
		};
		button.addEventListener("keydown", onButtonKeydown);

		/* Keyboard: Escape */
		const onLiKeydown = e => {
			if (e.key === "Escape" && !submenu.hidden) {
				button.setAttribute("aria-expanded", "false");
				submenu.hidden = true;
				li.classList.remove("is-open");
				button.focus();
			}
		};
		li.addEventListener("keydown", onLiKeydown);

		/* Focusout */
		const onFocusOut = e => {
			if (!li.contains(e.relatedTarget)) {
				button.setAttribute("aria-expanded", "false");
				submenu.hidden = true;
				li.classList.remove("is-open");
			}
		};
		li.addEventListener("focusout", onFocusOut);

		/* Referenzen für Cleanup merken */
		li._desktopMenu = {
			wrapper,
			button,
			submenu,
			handlers: { onClick, onButtonKeydown, onLiKeydown, onFocusOut }
		};

		li.dataset.desktopInit = "true";
	});
}

function destroyDesktopMenu() {
	document.querySelectorAll("#mainNavi li").forEach(li => {
		if (li.dataset.desktopInit !== "true") return;

		const data = li._desktopMenu;
		const link = li.querySelector(":scope > .menu-item > a");

		// Wrapper zurückbauen
		if (data?.wrapper && link) {
			data.wrapper.before(link);
			data.wrapper.remove();
		}

		// Submenu zurücksetzen
		if (data?.submenu) {
			data.submenu.hidden = false;
		}

		li.classList.remove("has-submenu", "is-open");
		delete li._desktopMenu;
		delete li.dataset.desktopInit;
	});
}

function handleBreakpoint(e) {
	if (e.matches) {
		initDesktopMenu();
	} else {
		destroyDesktopMenu();
	}
}

// Initial
handleBreakpoint(desktopQuery);

// Bei Resize
desktopQuery.addEventListener("change", handleBreakpoint);
