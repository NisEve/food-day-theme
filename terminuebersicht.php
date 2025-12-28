<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>

<@ elements/header.php @>
<body>

<@ elements/navbar.php @>

<main class="dateOverview main">

	<section class="pageIntroSection plainTextIntroSection">

		<div class="pageIntroDates pageIntroPlaintText">
			<div>
				<h1>@{ TerminHeadline | def ('Termine') } </h1>

				<p>@{ IntroText | def ('Einleitender Info Text ') }
				</p>

				<button
					type="button"
					class="subscribeCalendar"
					data-calendar-source="pickup"
					data-calendar-title="Food Day Abholtermine">
					Termine herunterladen und im Kalender speichern
				</button>

			</div>
		</div>

	</section>
	<div class="wave introWave" aria-hidden="true"></div>

	<section class="pageSection pageDatesSection">

		@{ +BlocksTerminInhalt }


	</section>

	<section>
	</section>

</main>


</body>
</html>

<@ elements/footer.php @>