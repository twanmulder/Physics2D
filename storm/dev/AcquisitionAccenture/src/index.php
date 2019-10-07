<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <title>Preview Campaign</title>

    <!-- FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Roboto|Titillium+Web&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/css.css">
    <link rel="stylesheet" href="css/mediaqueries.css">

    <!-- FAVICON -->
    <link rel="icon" type="image/png" sizes="16x16" href="https://www.stormdigital.nl/wp-content/themes/storm/includes/images/favicons/favicon-16x16.png">

</head>
<body>
    <main>
        <div class="txtwrapper">
            <h1>Preview</h1>
            <h3 class="campaignName campaignName1"></h3>
            <div class="formats">
                <h3>Formats:</h3>
                <div class="buttonwrapper">
                </div>
            </div>
        </div>
        <div class="logo">
            <img src="img/SDAI-Logo-W.png" class="logo-img" alt="Storm Digital by Accenture Interactive logo">
        </div> 
    </main>

    <div class="previewBlock">
        <div class="header">
            <h3 class=" campaignName campaignName2"></h3>
        </div>
        <div class="mobile-warning">
            <h4>Some previews may not be visible on mobile.</h4>
        </div>
        <div class="previews">
        </div>
    </div>


    <!-- Oh man PHP -->
    <!-- This PHP fetches all the folders in the creatives folder and adds them to the $dirname variable -->
    <?php
    $dirname = null;
    foreach(glob('../creatives/*', GLOB_ONLYDIR) as $dir) {
        $dirname .= '"'.basename($dir).'", ';
    }
    echo $dirname;
    ?>
    <!-- Add the PHP variable to JS global scope, which means it can be used by main.js -->
    <script type=text/javascript> sizes = <?php echo '['.$dirname.']'; ?>;</script>


    <script src="js/main.js"></script>
</body>
</html>