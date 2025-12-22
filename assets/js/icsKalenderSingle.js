document.addEventListener("DOMContentLoaded", () => {
	console.log("Kal");

	const NL = "\r\n";

	const escapeICS = (v = "") =>
		v.replace(/\\/g, "\\\\")
			.replace(/;/g, "\\;")
			.replace(/,/g, "\\,")
			.replace(/\n/g, "\\n");

	const toUTC = (date, time) => {
		const [y, m, d] = date.split("-");
		const [h, min] = time.split(":");
		const local = new Date(y, m - 1, d, h, min);
		return local.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
	};



	fetch("/shared/dates.json")
		.then(res => res.json())
		.then(data => {

			document.querySelectorAll(".calendarSection").forEach(section => {

				const type = section.dataset.calendarType;
				const title =
					section.dataset.calendarTitle || "Food Day Termine";

				const button =
					section.querySelector(".subscribeCalendar");
				const status =
					section.querySelector(".calendarStatus");

				if (!data[type] || !button) return;

				console.log("Kalender-Typ:", type);
				console.log("Events:", data[type]);

				button.addEventListener("click", () => {

					const events = data[type];
					if (!events.length) return;

					const nowStamp =
						new Date().toISOString()
							.replace(/[-:]/g, "")
							.split(".")[0] + "Z";

					let ics = "";
					ics += "BEGIN:VCALENDAR" + NL;
					ics += "VERSION:2.0" + NL;
					ics += "PRODID:-//Food Day Seevetal//" + escapeICS(title) + "//DE" + NL;
					ics += "CALSCALE:GREGORIAN" + NL;
					ics += "METHOD:PUBLISH" + NL;
					ics += NL;

					events.forEach(ev => {
						ics += "BEGIN:VEVENT" + NL;
						ics += `UID:${type}-${ev.date}@food-day.de` + NL;
						ics += `DTSTAMP:${nowStamp}` + NL;
						ics += `DTSTART:${toUTC(ev.date, ev.start)}` + NL;
						ics += `DTEND:${toUTC(ev.date, ev.end)}` + NL;
						ics += `SUMMARY:${escapeICS(title)}` + NL;
						ics += `LOCATION:${escapeICS(
							"Helbach-Haus Bürgermeister-Heitmann-Straße 34c 21217 Seevetal"
						)}` + NL;
						ics += "END:VEVENT" + NL;
					});

					ics += "END:VCALENDAR" + NL;

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

					// ♿ Status & UX
					if (status) {
						status.textContent =
							`Kalendereinträge „${title}“ wurden heruntergeladen.`;
					}

					button.textContent = "Kalendereinträge heruntergeladen";
					button.disabled = true;
					button.setAttribute("aria-disabled", "true");
				});
			});
		})
		.catch(() => {
			console.warn("Kalenderdaten konnten nicht geladen werden");
		});
});
