<@ elements/header.php @>
<@ elements/navbar.php @>
<main class="container home" id="main">


	<section id="hero">
		<div class="heroText">
			<h1>Food Day Seevetal</h1>
			<h2>Gemeinsam gegen Hunger</h2>
			<p class="herInfoText">
				Wir sind die Lebensmittelausgabe für Menschen mit k(l)einem
				Einkommen in Seevetal
			</p>
			@{ +teaserLinkUeberUns | def ('Mehr über Uns') }
		</div>
		@{ +BildHero | def ('Hero Bild Food Day') }

	</section>

	<!-- Abholung -->

	<section class="teaserSection pageSection">
		<div class="teaser imgLeft">
			<!-- <img src="https://placehold.co/545x430" width="545" height="430" alt=""> -->
			@{ +BildTeaserAbholung | def ('Teaser Bild Abholung') }
			<div>
				<h3>@{ HeadlineTeaserAbholung | def ('Abholung') }</h3>
				<p>@{ TextTeaserAbholung | def ('Im Helbach-Haus in Meckelfeld haben berechtigte Einwohner der Gemeinde
					Seevetal einmal im Monat die Möglichkeit, gespendete Lebensmittel und Hygieneartikel zu erhalten.
					Für 2 Euro gibt es einen Einkaufskorb, der je nach Verfügbarkeit der Lebensmittel gefüllt werden
					kann. Bei Bedarf bieten wir auch einen Lieferservice direkt zu Ihnen nach Hause an.')}</p>

				@{ +teaserLinkAbholung | def ('Mehr zur Abholung') }
			</div>
		</div>

		@{ +infoBoxAbholung | def ('Info Box Abholung') }


	</section>

	<!-- Spenden -->

	<section class="teaserSection pageSection">
		<div class="teaser imgRight">

			<div>
				<h3>@{ HeadlineTeaserSpenden | def ('Spenden') }</h3>
				<p>@{ TextTeaserSpenden | def ('Unterstützen Sie den Food Day Seevetal! Ob haltbare Lebensmittel,
					Hygieneartikel oder finanzielle Hilfe – jede Spende hilft, sei es von Privatpersonen oder
					Unternehmen. Ihre Spenden können Sie am Dienstag vor dem Food Day zwischen 18 und 19 Uhr im
					Helbach-Haus abgeben. Zusätzlich stehen Ihnen unsere Spendenboxen im Helbach-Haus und in der
					Karoxbosteler Mühle an weiteren Tagen zur Verfügung.')}</p>

				@{ +teaserLinkSpenden | def ('Mehr zum Spenden') }

			</div>

			<!-- <img src="https://placehold.co/545x430" width="545" height="430" alt=""> -->
			@{ +BildTeaserSpenden | def ('Teaser Bild Spenden') }
		</div>

		@{ +infoBoxSpendenAnnahme }

	</section>

	<!-- News -->

	<section class="teaserSection pageSection">
		<div class="teaser imgLeft">
			<!-- <img src="https://placehold.co/545x430" width="545" height="430" alt=""> -->
			@{ +BildTeaserNeuigkeiten | def ('Teaser Bild Neuigkeiten') }
			<div>
				<h3>@{ HeadlineTeaserNeuigkeiten | def ('Neuigkeiten') }</h3>
				<p>@{ TextTeaserNeuigkeiten | def ('Bleiben Sie informiert! Hier finden Sie spannende Infos zu unseren
					aktuellen
					Aktionen, Terminen und wichtigen Neuigkeiten rund um den Food Day Seevetal.')}
				</p>

				<p>
					Folgen Sie uns auch auf <a  href="https://www.facebook.com/groups/1642482143177318" target="_blank" rel="nofollow"  class="fb socialIcon" aria-label="Facebook">Facebook</a>
					und <a href="https://www.instagram.com/foodyseevetal/" target="_blank" rel="nofollow" class="insta socialIcon" aria-label="Instagram">Instagram</a>
				</p>
				@{ +teaserLinkNeuigkeiten | def ('Mehr zu den Neuigkeiten') }
			</div>
		</div>


			@{ +infoBoxNews }



	</section>

</main>
<@ elements/footer.php @>