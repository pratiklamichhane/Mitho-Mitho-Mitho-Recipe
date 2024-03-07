let result = document.getElementById('result');
let searchBtn = document.getElementById('search-btn');
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

let userInput = document.getElementById('user-input').value;

fetch(url + "chicken")
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    let myMeal = data.meals[0];
    console.log(myMeal);
    console.log(myMeal.strMealThumb);
    console.log(myMeal.strMeal);
    console.log(myMeal.strArea);
    console.log(myMeal.strInstructions);
    let count = 1;
    let myIngredients = [];
    for ( let i in myMeal) {
        let ingredient = "";
        let measure = "";
        if(i.startsWith("strIngredient") && myMeal[i] != "") {
            ingredient = myMeal[i];
            measure = myMeal["strMeasure" + count];
            myIngredients.push(measure + " " + ingredient);
            count++;
            }
        }
    console.log(myIngredients);
    
    result.innerHTML = `<img src="${myMeal.strMealThumb}">`;

    })

