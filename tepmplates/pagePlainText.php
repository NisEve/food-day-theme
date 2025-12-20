<@ elements/header.php @>
<body>

<@ elements/navbar.php @>

<main>
	<section class="pageIntroSection plainTextIntroSection">

		<div class="pageIntroPlaintText">
			<div>
				<h1>@{ HeadlinePage | def ('Seiten Headline') }</h1>
				@{ +BlocksIntroInhalt }

			</div>
		</div>
	</section>

	<section class="pageSection plainTextSection">
		<div>
			@{ +BlocksSeitenInhalt }
		</div>
	</section>
</main>


</body>
</html>

<@ elements/footer.php @>