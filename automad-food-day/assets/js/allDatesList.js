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

			document.querySelectorAll(".dateList[data-type]").forEach(list => {

				const type = list.dataset.type;
				const entries = data[type];
				if (!entries) return;

				let nextMarked = false;

				entries
					.map(t => ({ ...t, d: new Date(t.date) }))
					.filter(t => t.d >= today)
					.sort((a, b) => a.d - b.d)
					.forEach(t => {

						const li = document.createElement("li");
						li.className = "dateItem";

						// ⭐ ERSTER ZUKÜNFTIGER TERMIN
						if (!nextMarked) {
							li.classList.add("is-next");
							li.setAttribute("aria-current", "date");
							nextMarked = true;
						}

						li.innerHTML = `
							<h3>${t.d.toLocaleString("de-DE", {
							month: "long",
							year: "numeric"
						})}</h3>

							<p class="date infoIcon">
								<time datetime="${t.date}">
								${formatDateHuman(t.d)}
								</time>
							</p>

							<p class="time infoIcon">
								<span class="visually-hidden">Uhrzeit:</span>
								${formatTimeDE(t.start, t.end)}
							</p>
						`;

						list.appendChild(li);
					});
			});
		})
		.catch(() => {
			console.warn("Terminliste konnte nicht geladen werden");
		});
});
