
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

	<link rel="stylesheet" href="@{ theme }/assets/css/main.min.css">
	<script src="@{ theme }/assets/js/main.min.js" defer></script>

	<@ elements/favicons.php @>


</head>
<body>



