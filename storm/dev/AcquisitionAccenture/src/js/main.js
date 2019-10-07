window.onload = function() {
    console.log("Static Banner Dashboard");

























    // CHANGE "Campaign Name" to your campaign name.
    // EXAMPLE: var campaignName = "Cordaid Zomer Campagne"; 
    var campaignName = "Storm Digital by Accenture Interactive";
    // Don't touch anything below here :)





































   

    // i(ndex) variable for loop functions
    var i;

    // Set the content of all campaign name h3s to be filled with the Campaign Name variable
    var header = document.querySelectorAll('.campaignName');
    for( i = 0; i < header.length; i++) {
        header[i].innerHTML = campaignName;
    }

    // sizes variable is imported using PHP via the index.html


    // Variables for button loop
    var buttonwrapper = document.querySelector('.buttonwrapper');
    var buttons = "";

    // For every size, create a button and add it to the buttons variable
    for (i = 0; i < sizes.length; i++) {
        buttons += '<button class="formatbutton format-' + sizes[i] + '">' + sizes[i] + '</button>'
    }
    // Set the the button filled variable(buttons) inside the buttonwrapper
    buttonwrapper.innerHTML = buttons;

    // Variables for preview loop
    var previewwrapper = document.querySelector('.previews');
    var previews = "";

    // For every size, create a preview and add it to the previews variable
    for (i= 0; i < sizes.length; i++) {
        previews += '<div class="preview preview-' + sizes[i] + '"><h3 class="preview-size">' + sizes[i] + '</h3><div class="iframe"><iframe class="size-' + sizes[i] + '" name="' + sizes[i]+ '" src="../creatives/' + sizes[i] + '/index.html" frameborder="0"></iframe> </div><div class="preview-controls"> <div class="replay button btn-' + sizes[i] + '"> <i class="material-icons">replay</i> </div></div></div>'
    };
    // Set the the preview filled variable(previews) inside the previewwrapper
    previewwrapper.innerHTML = previews;

    // Set the previewBlockTopMargin to be the height of the txtWrapper element
    var previewBlock = document.querySelector(".previewBlock"),
        txtWrapper = document.querySelector(".txtwrapper"),
        previewBlockTopMargin = txtWrapper.offsetHeight  + "px";

    // If the screen width is 810 or lower, change the margin-top to the previewBlockTopMargin,
    // which is equal to the height of the txtWrapper element
    window.addEventListener("resize", function() {
        if (window.matchMedia("(min-width: 811px)").matches) {
            previewBlock.style.marginTop = "inherit"
        } else {
            previewBlock.style.marginTop = previewBlockTopMargin
        }
    });

     // Trigger manual resize of browser
     // This so that the correct styling will trigger on first load
     window.dispatchEvent(new Event('resize'));


     // Loop that searches for every button-(size) class and adds an event listener that triggers the onRefreshClick function
     for(var x = 0; x < sizes.length; x++) {
        document.querySelector(".btn-" + sizes[x]).addEventListener("click", onRefreshClick)
     }
     // Function that refreshes the iFrame, taking in the size and location of index.html as parameters 
     function refreshFrame(frameName, iframeName) {
         window.frames[frameName].location = iframeName;
     }

     // When onRefreshClick is triggered
     function onRefreshClick(e){
         // Get the length of the class list of the parent
        var classNameLength = e.target.parentElement.classList.length;
        // Select the last class name of the list, and get rid of "btn-"
        var className =  e.target.parentElement.classList[classNameLength - 1].replace("btn-", "");
        // Trigger the refreshFrame function, containing the size and location of the iFrame
        refreshFrame(className, "../creatives/" + className + "/index.html" );
     }

     // Loop that adds an eventlistener to every format button that triggers the onFormatClick
     for(i = 0; i < sizes.length; i++) {
        document.querySelector(".format-" + sizes[i]).addEventListener("click", onFormatClick)
     }


     var selectedFormats = [];
     
     // Function triggers on click of format button
     function onFormatClick(e){
        var formatButton = e.target;
        var formatButtonContent = e.target.innerHTML;

        // Add or remove the "selected" class to the format button
        formatButton.classList.toggle('selected');


        // If the button has the "selected" class, push the format to the selectedFormats variable
        // Else, remove it from the selectedFormats variable
        if(formatButton.classList.contains('selected')){
            selectedFormats.push(formatButtonContent);
        // Elsem get Index of content and splice it from array
        } else{
            var indexOfFormat = selectedFormats.indexOf(formatButtonContent);
            selectedFormats.splice(indexOfFormat, 1);
        }

        // Loop through all the formats, and remove the "hidden" class on preview divs
        function showAllFormats() {
            formatsToShow = sizes;

            for(i = 0; i < formatsToShow.length; i++) {
                formatToShow = document.querySelector(".preview-" + formatsToShow[i]);
                formatToShow.classList.remove("hidden");
            }
        }

        // If there are no formats selected, loop through every preview div and remove the hidden class
        if (selectedFormats.length == 0) {
            showAllFormats();
        // If there are any formats selected, filter those who are not and add the hidden class
        // This will hide the preview
        } else{
            // First, reset all the "hidden" classes on the preview through a for loop
            showAllFormats();

            // Then, find which formats to hide by comparing the $sizes and $selectedFormats
            formatsToHide = sizes.filter(function (x) {
                return !selectedFormats.includes(x);
            });

            // Add the "hidden" class for evey format to hide
            for(i = 0; i < formatsToHide.length; i++) {
                formatToHide = document.querySelector(".preview-" + formatsToHide[i]);
                formatToHide.classList.add("hidden");
            }
        }
     }
}
