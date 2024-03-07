let result = document.getElementById('result');
let searchBtn = document.getElementById('search-btn');
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener('click', () => {
    let userInput = document.getElementById('user-input').value;
    if (userInput.length === 0) {
        result.innerHTML = `<h2 id="warning">Please enter a meal name</h2>`;
    }
    else{
        fetch(url + userInput)
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
        result.innerHTML += `<h2>${myMeal.strMeal}</h2>`;
        result.innerHTML += `<p>${myMeal.strArea}</p>`;
        result.innerHTML += `<div id="ingredients-container"></div>`;
        result.innerHTML += `
        <div id="recipe-container">
        <div class="close-recipe"><button id="close-recipe">X</button></div>
        <pre id="instructions">${myMeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>`
        let ingredientsContainer = document.getElementById('ingredients-container');
        let parent = document.createElement('ul');
        let recipe = document.getElementById('recipe-container');
        let closeRecipe = document.getElementById('close-recipe');
        let showRecipe = document.getElementById('show-recipe');
    
        myIngredients.forEach((i) => {
            let child = document.createElement('li');
            child.textContent = i;
            parent.appendChild(child);
            ingredientsContainer.appendChild(parent);
        });
    
        closeRecipe.addEventListener('click', () =>
        recipe.style.display = "none");
        showRecipe.addEventListener('click', () =>
        recipe.style.display = "block");
        }); 
    
    }
});
document.getElementById('user-input').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        document.getElementById('search-btn').click();
    }
});