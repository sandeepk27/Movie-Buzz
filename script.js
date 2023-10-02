let data = document.getElementById("appendData");
let noData = document.getElementById("not_found");

//1 getting fetch data using async await>>>>

async function getRequest() {
    data.innerHTML = "";
    let input = document.getElementById("name").value;
    let result = await fetch("https://www.omdbapi.com/?t=" + input + "&apikey=234b003d");
    //console.log('result:', result);

    let mainData = await result.json();
    let obj = mainData; //Finally getting the data in a format
    //console.log('obj:', obj);

    //2 if movie not found>>>
    if (obj.Error == "Movie not found!") { //The error msg should be same then only its work
        noData.style.display = "block";
    } else {
        noData.style.display = "none";
        //create all styles
        let movieFrame = document.createElement("img");
        let movieTitle = document.createElement("h3");
        let year = document.createElement("span");
        let rated = document.createElement("span");
        let rating = document.createElement("span_rating");
        let runtime = document.createElement("span");
        let plot = document.createElement("p");
        let actors = document.createElement("h6");
        let genre = document.createElement("h6");
        let recommended = document.createElement("span");

        let movieDiv = document.createElement("div");
        let detailsDiv = document.createElement("div");

        movieFrame.src = obj.Poster;
        movieTitle.innerHTML = obj.Title; //the name should be same as api data;

        year.innerHTML = obj.Year;
        rated.innerHTML = " | " + obj.Rated;
        runtime.innerHTML = " | " + obj.Runtime;
        rating.innerHTML = " | " + obj.imdbRating + "/10 IMDb ";
        genre.innerHTML = "Genre: " + obj.Genre;
        recommended.innerHTML = "  Recommended";

        if (obj.imdbRating == 0.0) {
            rating.innerHTML += " | ";
            detailsDiv.append(year, rated, runtime, rating, recommended);
            //detailsDiv.setAttribute("id", "movie-info");
            //console.log('detailsDiv:', detailsDiv)
        } else
            detailsDiv.append(year, rated, runtime, rating);
        detailsDiv.setAttribute("id", "movie-info");

        plot.innerHTML = obj.Plot;
        actors.innerHTML = "Starring: " + obj.Actors;

        movieDiv.append(movieTitle, detailsDiv, plot, actors, genre);
        movieDiv.setAttribute("id", "movie-div")
        data.append(movieDiv, movieFrame);

    }

}