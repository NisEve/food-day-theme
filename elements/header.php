
<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>
<!DOCTYPE html>
<html lang="de">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php if (substr(AM_VERSION, 0, 1) == '1') { ?>
		<title>@{ metaTitle | def('@{ sitename } / @{ title | def ("404") }') }</title>
		<@ elements/metatags.php @>
	<?php } ?>

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

	<link rel="stylesheet" href="/packages/food-day/automad-food-day/public/css/main.min.css">
	<script src="/packages/food-day/automad-food-day/public/js/main.min.js" defer></script>

	<@ elements/favicons.php @>


</head>
<body>




