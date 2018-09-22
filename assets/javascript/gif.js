$(document).ready(function() {

var topics = ["The Princess Bride", "Donnie Darko", "Lord of the Rings", "Star Wars", "GoodFellas", "The Usual Suspects", "Monty Python and the Holy Grail", "Time Bandits", "The Boondock Saints", "I, Robot"]
var results;
//var giphyURL = "https://api.giphy.com/v1/gifs/trending?api_key=FksXZxJtNgMhBh9yoAtA6sJfP13eNyd4";

// MAKE BUTTONS	AND ADD ONCLICK FUNCTION

	function makeButtons() {

		$("#movie-buttons").empty();

		for (i = 0; i < topics.length; i++) {
			
			var b = $("<button>");

			b.addClass("movie-btn");
			b.attr("data-name", topics[i]);
			b.text(topics[i]);

			$("#movie-buttons").append(b);
		};
	};

	$("#add-movie").on("click", function(event) {

		event.preventDefault();

		var movie = $("#movie-input").val().trim();

		topics.push(movie);
		$("#movie-input").val("");

		makeButtons();

		console.log(topics);
	});

	makeButtons();

	//FUNCTION FOR GRABBING GIPHY API CONTENT

  	function dataPull() {

 		var movieName = $(this).attr("data-name");
 		var movieStr = movieName.split(" ").join("+");
 		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + movieStr + "&api_key=dc6zaTOxFJmzC&limit=10";

 		$.ajax({
        url: giphyURL,
        method: "GET"
      }).done(function(response) {
        
        console.log(giphyURL);
        console.log(response);

        results = response.data;

        $("#gifs").empty();
        for (var i = 0; i < results.length; i++) {
        	
        	var movieDiv = $("<div>");
        	var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
        	var movieImage = $("<img>");

        	para.addClass("rating-text")
        	
          movieImage.addClass("image-gifs")
        	movieImage.attr("src", results[i].images.fixed_height_still.url);
        	movieImage.attr("data-state", "still");
          movieImage.attr("data-position", i);

        	movieDiv.append(para);
          movieDiv.append(movieImage);
          movieDiv.addClass("individual-gifs")

          $("#gifs").prepend(movieDiv);

        }; //ENDS FOR LOOP
      }); // ENDS AJAX FUNCTION
  
	};

  // Use document on click function to apply function for elements AFTER the page has loaded

	$(document).on("click", ".movie-btn", dataPull);

	// ANIMATE GIFS

    function gifAnimation() {
      var state = $(this).attr("data-state");
      var position = $(this).attr("data-position"); //will return a string
      position = parseInt(position); //string to integer

      console.log(results[position].images.fixed_height.url);
      console.log(position);

      if (state === "still") {
        console.log("we're here");
        $(this).attr("src", results[position].images.fixed_height.url);
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", results[position].images.fixed_height_still.url);
        $(this).attr("data-state", "still");
      }
    };

  $(document).on("click", ".image-gifs", gifAnimation);

}); //document.ready 



