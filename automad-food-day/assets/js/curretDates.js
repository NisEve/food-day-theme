document.addEventListener("DOMContentLoaded", () => {

	fetch("/shared/dates.json")
		.then(res => res.json())
		.then(data => {

			const today = new Date();
			today.setHours(0, 0, 0, 0);

			const formatDateHuman = (dateObj) => {
				const today = new Date();
				today.setHours(0, 0, 0, 0);

				const check = new Date(dateObj);
				check.setHours(0, 0, 0, 0);

				const diffDays = Math.round(
					(check - today) / (1000 * 60 * 60 * 24)
				);

				const base = new Intl.DateTimeFormat("de-DE", {
					weekday: "long",
					day: "2-digit",
					month: "2-digit",
					year: "numeric"
				}).format(dateObj);

				if (diffDays === 0) return `Heute · ${base}`;
				if (diffDays === 1) return `Morgen · ${base}`;

				return base;
			};


			const formatTimeDE = (start, end) =>
				`${start.replace(":", ".")}–${end.replace(":", ".")} Uhr`;

			document.querySelectorAll(".infoBox[data-type]").forEach(box => {

				const type = box.dataset.type;
				const entries = data[type];
				if (!entries) return;

				const next = entries
					.map(t => ({ ...t, d: new Date(t.date) }))
					.filter(t => t.d >= today)
					.sort((a, b) => a.d - b.d)[0];

				const dateEl = box.querySelector(".date");
				const timeEl = box.querySelector(".time");

				// 🛟 Fallback
				if (!next) {
					dateEl.textContent = "Zurzeit kein Termin geplant";
					timeEl.textContent = "";
					timeEl.hidden = true;
					return;
				}

				dateEl.textContent = formatDateHuman(next.d);

				if (next.start && next.end) {
					timeEl.hidden = false;
					timeEl.textContent = formatTimeDE(next.start, next.end);
				} else {
					timeEl.textContent = "";
					timeEl.hidden = true;
				}
			});
		})
		.catch(() => {
			console.warn("Termine konnten nicht geladen werden");
		});
});
