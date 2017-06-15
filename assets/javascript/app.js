$(document).ready(function() {

var apikey = "dc6zaTOxFJmzC";
var searchURL;
var searchParams;
var defaultButtons = ["Friends", "Seinfeld", "Buffy", "Family Guy"];

function renderButtons(){
	$.each(defaultButtons, function(index,value) {
		var buttonContainer = $("#buttons-container");
		var buttonEl = $("<button>");
		buttonEl.text(value)
		buttonContainer.append(buttonEl);
	})
}
renderButtons()

function newButton(){
	var buttonEl = $("<button>");
	var nameInput = $("#new-button-name");
	var value = nameInput.val();
	if ( value !== ""){	
		nameInput.val("")
		var buttonContainer = $("#buttons-container");
		buttonEl.text(value);
		buttonContainer.append(buttonEl);
		buttonEl.click(function(){
			grabGifs(value)
		})
		grabGifs(value)
	}
}

$( "#new-button-form" ).submit(function(event) {
  newButton()
  event.preventDefault();
})

function grabGifs(searchTerm){
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    	searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .done(function(response) {

      // storing the data from the AJAX request in the results variable
      var data = response.data;

      // clearing gifs for new button click

     $("#Gif").html("")

      // Looping through each result item
      for (var i = 0; i < data.length; i++) {

        // Creating and storing a div tag
        var resultDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + data[i].rating);

        // Creating and storing an image tag
        var resultImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        resultImage.attr("src", data[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        resultDiv.append(p);
        resultDiv.append(resultImage);

        // Prependng the Div to the HTML page in the "#gifs-appear-here" div
        $("#Gif").prepend(resultDiv);
      }

    });
}

$("#buttons-container > button").click(function(event){
	grabGifs(event.currentTarget.innerText)
})
	
})