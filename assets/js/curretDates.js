document.addEventListener("DOMContentLoaded", () => {

	fetch("/shared/dates.json")
		.then(res => res.json())
		.then(data => {

			const today = new Date();
			today.setHours(0, 0, 0, 0);

			const formatDateHuman = (dateObj) => {
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

			const formatTimeHuman = (start, end) =>
				`${start.replace(":", ".")}–${end.replace(":", ".")} Uhr`;

			document.querySelectorAll(".infoBox[data-type]").forEach(box => {

				const type = box.dataset.type;
				const entries = data[type];
				if (!entries) return;

				const next = entries
					.map(t => ({ ...t, d: new Date(t.date) }))
					.filter(t => t.d >= today)
					.sort((a, b) => a.d - b.d)[0];

				const dateTimeEl = box.querySelector(".date time");
				const timeTimeEl = box.querySelector(".time time");
				const timeWrapper = box.querySelector(".time");

				// 🛟 Fallback: kein Termin
				if (!next) {
					dateTimeEl.textContent = "Zurzeit kein Termin geplant";
					dateTimeEl.removeAttribute("datetime");
					timeWrapper.hidden = true;
					return;
				}

				/* ======================
				   📅 Datum
				====================== */

				const isoDate = next.d.toISOString().split("T")[0];
				dateTimeEl.setAttribute("datetime", isoDate);
				dateTimeEl.textContent = formatDateHuman(next.d);

				/* ======================
				   🕒 Uhrzeit
				====================== */

				if (next.start && next.end) {
					const startISO = next.start;
					const endISO = next.end;

					timeWrapper.hidden = false;

					timeTimeEl.setAttribute(
						"datetime",
						`${startISO}/${endISO}`
					);

					timeTimeEl.textContent =
						formatTimeHuman(next.start, next.end);

				} else {
					timeWrapper.hidden = true;
					timeTimeEl.textContent = "";
					timeTimeEl.removeAttribute("datetime");
				}
			});
		})
		.catch(() => {
			console.warn("Termine konnten nicht geladen werden");
		});
});
