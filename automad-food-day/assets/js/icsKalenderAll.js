document.addEventListener("DOMContentLoaded", () => {

	const DATA_URL = "/shared/dates.json";
	const NL = "\r\n";

	/* ===============================
	   Hilfsfunktionen
	================================ */

	const escapeICS = (value = "") =>
		value
			.replace(/\\/g, "\\\\")
			.replace(/;/g, "\\;")
			.replace(/,/g, "\\,")
			.replace(/\n/g, "\\n");

	const toLocalICS = (date, time) => {
		const [y, m, d] = date.split("-");
		const [h, min] = time.split(":");
		return `${y}${m}${d}T${h}${min}00`;
	};

	const nowStampUTC = () =>
		new Date()
			.toISOString()
			.replace(/[-:]/g, "")
			.split(".")[0] + "Z";

	/* ===============================
	   JSON laden
	================================ */

	fetch(DATA_URL)
		.then(res => {
			if (!res.ok) throw new Error("dates.json nicht erreichbar");
			return res.json();
		})
		.then(data => initCalendarButtons(data))
		.catch(err => {
			console.warn("Kalender-Abo Fehler:", err);
		});

	/* ===============================
	   Buttons initialisieren
	================================ */

	function initCalendarButtons(data) {

		document.querySelectorAll(".subscribeCalendar").forEach(button => {

			const type = button.dataset.calendarSource; // pickup | donation
			const title =
				button.dataset.calendarTitle || "Food Day Termine";

			const status =
				button.nextElementSibling?.classList.contains("calendarStatus")
					? button.nextElementSibling
					: null;

			/* ---- Guards ---- */
			if (!type || !Array.isArray(data[type])) {
				console.warn("Ungültige Kalenderquelle:", type);
				return;
			}

			button.addEventListener("click", () => {

				const events = data[type];
				if (!events.length) {
					if (status) {
						status.textContent =
							"Zurzeit sind keine Termine verfügbar.";
					}
					return;
				}

				let ics = "";
				const stamp = nowStampUTC();

				ics += "BEGIN:VCALENDAR" + NL;
				ics += "VERSION:2.0" + NL;
				ics += `PRODID:-//Food Day Seevetal//${escapeICS(title)}//DE` + NL;
				ics += "CALSCALE:GREGORIAN" + NL;
				ics += "METHOD:PUBLISH" + NL;

				/* --- ZEITZONE --- */
				ics += "BEGIN:VTIMEZONE" + NL;
				ics += "TZID:Europe/Berlin" + NL;
				ics += "X-LIC-LOCATION:Europe/Berlin" + NL;
				ics += "END:VTIMEZONE" + NL;
				ics += NL;

				events.forEach(ev => {
					if (!ev.date || !ev.start || !ev.end) return;

					ics += "BEGIN:VEVENT" + NL;
					ics += `UID:${type}-${ev.date}@food-day.de` + NL;
					ics += `DTSTAMP:${stamp}` + NL;
					ics += `DTSTART;TZID=Europe/Berlin:${toLocalICS(ev.date, ev.start)}` + NL;
					ics += `DTEND;TZID=Europe/Berlin:${toLocalICS(ev.date, ev.end)}` + NL;
					ics += `SUMMARY:${escapeICS(title)}` + NL;
					ics += `LOCATION:${escapeICS(
						"Helbach-Haus Bürgermeister-Heitmann-Straße 34c 21217 Seevetal"
					)}` + NL;
					ics += "END:VEVENT" + NL;
				});

				ics += "END:VCALENDAR" + NL;

				/* ---- Download ---- */
				const blob = new Blob([ics], {
					type: "text/calendar;charset=utf-8"
				});

				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = `${type}-termine.ics`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);

				/* ---- UX & a11y ---- */
				button.textContent = "Kalender heruntergeladen";
				button.disabled = true;
				button.setAttribute("aria-disabled", "true");

				if (status) {
					status.textContent =
						`Kalender „${title}“ wurde heruntergeladen.`;
				}
			});
		});
	}
});
