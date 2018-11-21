
// a global animal array to hold the animals and be appended to with the input form
var animals = ["cat",
    "dog",
    "rabbit",
    "hamster",
    "skunk",
    "goldfish",
    "bird",
    "ferret",
    "turtle",
    "sugar glider",
    "chinchilla",
    "hedgehog",
    "hermit crab",
    "gerbil",
    "pygmy goat",
    "chicken",
    "capybara",
    "teacup pig",
    "seagull",
    "salamander",
    "frog",
]

// create new buttons div to append to #buttons-div 

for (var i = 0; i< animals.length; i++) {
    var buttonsDiv = $("<button>").attr("class", "animal")
    buttonsDiv.text(animals[i]);
    $("#buttons-div").append(buttonsDiv);
}

$("#buttons-div").on("click", ".animal", function () {
        searchAnimal($(this).text())
})


// Constructing a queryURL using the animal name with 10 results

function searchAnimal(string) {
     var xhr = "https://api.giphy.com/v1/gifs/search?q=" +
        string + "&api_key=dc6zaTOxFJmzC&limit=11";
        
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: xhr,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (res) {
            console.log(xhr);
            console.log(res);
            for (i in res.data) { 


            // create giphyDiv to hold all results
            var giphyDiv = $("<div>");
            // get rating and create a rating p tag
            var rating = res.data[i].rating;
            var p = $("<p>").text("Rating: " + string +" " + rating);

            // append it to the giphy div
            giphyDiv.append(p);

            // create image div and get the still image to animate/still later
            var giphyImg = $("<img>").attr("src", res.data[i].images.original_still.url).attr("data-still", res.data[i].images.original_still.url).attr("data-animate", res.data[i].images.original.url).attr("class", "gif").attr("data-state", "still");
            
            giphyDiv.append(giphyImg);
            giphyDiv.attr("class", "container")

            // prepend so they show up first on scroll
            $("#giphys").prepend(giphyDiv)





            // now that im getting the correct animal i will need to pull the queryURL into the ajax request so that i can get all the animals that will be needed using the forloop
            }
        });
};

$("#giphys").on("click", ".gif", function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});