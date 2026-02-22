<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>

<@ elements/header.php @>
<body>

<@ elements/navbar.php @>

<main id="main">
	<section class="pageIntroSection">

		<div>
			<h1>@{ HeadlinePage | def ('Seiten Headline') }</h1>

			<div class="pageIntro imgLeft">
				@{ +BildIntro }
				<div>
					<h2>@{ IntroHeadline | def ('Intro Headline') }</h2>
					<p>@{ IntroText | markdown }
					</p>
				</div>
			</div>
		</div>
	</section>
	<div class="wave introWave" aria-hidden="true"></div>


		@{ +BlocksSeitenInhalt }

</main>


</body>
</html>

<@ elements/footer.php @>