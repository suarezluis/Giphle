var sugestions = [
  "capybara",
  "jaguar",
  "toucan",
  "sloth",
  "caiman",
  "tapir"
  
];
var lastButton = 0;
var api = "https://api.giphy.com/v1/gifs/search?q=";
var q = "";
var limit = "&limit=10";
var rating = "&rating=g";
var key = "&api_key=EUn1ryZVkHr5u0dzKwMD53x52Rmn9qgd";
var url = "";
var response = [];
$(document).ready(function() {
  //Populate buttons for sugested searches
  PopulateSugestions();
  // Listen for enter on input text
  $(".input").keypress(function(element) {
    if (element.which == 13) {
      q = $(".input")
        .val()
        .trim()
        .toLowerCase();
      executeSearch(q);
      $(".input").val("");
    }
  });
  // Listen for click on search button
  $(".button").on("click", function() {
    q = $(".input")
      .val()
      .trim()
      .toLowerCase();
    executeSearch(q);
    $(".input").val("");
  });
  //listens for clicks on the newly created gifs
  listenNewBox();

  //Listen for click in sugestions and past search
  function listenNewBox() {
    $(".savedButton").on("click", function(element) {
      q = element.currentTarget.innerText;
      executeSearch(q);
      $(".savedButton").off("click");
    });
  }
  // Starts flow of search engine
  function executeSearch(string) {
    searchAPI(string);
  }
  //Create buttons for sugestions in array
  function PopulateSugestions() {
    for (let i = 0; i < sugestions.length; i++) {
      createButton(sugestions[i]);
    }
  }
  // populates the results alternating colors for the background
  function populateResults() {
    $(".results").empty();
    for (let i = 0; i < response.length; i++) {
      $(".results").append(
        "<div class='result' style='background-color: " +
          alternateColors() +
          "'><p class='rating'><strong>Rating: </strong>" +
          response[i].rating.toUpperCase() +
          "</p><img src='" +
          response[i].images.original_still.url +
          "' alt='" +
          response[i].title +
          "' status='still' src-still='" +
          response[i].images.original_still.url +
          "' src-animated='" +
          response[i].images.fixed_height.url +
          "'class='gif' ><br> <a target='_blank' href='" +
          response[i].images.original.url +
          "' >Original Size</a> <p class='gifTittle'><strong>Tittle:</strong><br>" +
          (response[i].title.charAt(0).toUpperCase() + response[i].title.slice(1)) +
          "</p> </div>"
      );
    }
    playPause();
    switch (lastButton) {
      case 1:
        lastButton = 3;
        break;
      case 2:
        lastButton = 4;
        break;
      case 3:
        lastButton = 5;
        break;
      case 4:
        lastButton = 6;
        break;
      case 5:
        lastButton = 1;
        break;
      case 6:
        lastButton = 2;
        break;
    }
  }
  // Changes src and status attributes in image when clicked
  function playPause() {
    $(".gif").on("click", function() {
      var status = $(this).attr("status");

      if (status === "still") {
        $(this).attr("src", $(this).attr("src-animated"));
        $(this).attr("status", "animated");
      } else {
        $(this).attr("src", $(this).attr("src-still"));
        $(this).attr("status", "still");
      }
    });
  }

  //Builds the url for api
  function buildURL(string) {
    return api + q + limit + rating + key;
  }

  //performs search
  function searchAPI(q) {
    url = buildURL(q);

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: url,
      method: "GET"
    })

      // After the data from the AJAX request comes back
      .then(function(answer) {
        response = answer.data;
        if (sugestions.indexOf(q) < 0 && q != "") {
          sugestions.push(q);
          createButton(q);
        }
        populateResults();
        listenNewBox();
      });
  }
  // create button and append to results
  function createButton(string) {
    $(".savedSearch").append(
      "<p class='savedButton' style='background-color: " +
        alternateColors() +
        ";'>" +
        string +
        "</p>"
    );
  }
  // alternate colors of buttons
  function alternateColors() {
    lastButton = lastButton + 1;
    if (lastButton == 7) {
      lastButton = 1;
    }
    switch (lastButton) {
      case 1:
        return "#4286f3";
      case 2:
        return "#ea4333";
      case 3:
        return "#fbbe04";
      case 4:
        return "#4286f3";
      case 5:
        return "#34aa52";
      case 6:
        return "#ea4333";
    }
  }
});

console.log(
  `%c ~~~~~~~~~~~~~~~~~~~~~~~~~
| Did you lose something? |
 ~~~~~~~~~~~~~~~~~~~~~~~~~
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     || Made by Luis Suarez.`,
  "font-family:monospace"
);
