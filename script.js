const ingredientSubstitutes = {
    "butter": "1/4 cup oil or margarine",
    "oil": "1 cup applesauce (for baking)",
    "applesauce": "1/4 cup mashed banana",
    "yogurt": "1 cup sour cream or buttermilk",
    "coconut oil": "1 cup butter or margarine",
    "margarine": "1 cup butter",
    "sour cream": "1 cup Greek yogurt",
    "heavy cream": "1 cup milk + 1/4 cup butter",
    "milk": "1 cup almond milk or oat milk",
    "flour": "1 cup almond flour or gluten-free flour"
};
const flavorPairings = {
    "chicken": ["garlic", "thyme", "rosemary", "lemon", "parsley"],
    "beef": ["garlic", "rosemary", "bay leaves", "thyme"],
    "salmon": ["dill", "lemon", "garlic", "chives"],
    "pasta": ["basil", "garlic", "parmesan", "tomato"],
    "tofu": ["soy sauce", "ginger", "garlic", "sesame oil"],
    "chocolate": ["vanilla", "coffee", "salt", "peanut butter"],
    "cheese": ["wine", "fruit", "nuts", "bread"],
    "egg": ["cheese", "spinach", "mushrooms", "bacon"],
    "potato": ["cheese", "sour cream", "chives", "bacon"]
};
document.getElementById("substitute-btn").addEventListener("click", suggestSubstitute);
document.getElementById("time-calc-btn").addEventListener("click", calculateTime);
document.getElementById("temp-calc-btn").addEventListener("click", calculateRequiredTemperature);
document.getElementById("pairing-btn").addEventListener("click", suggestFlavorPairing);
document.getElementById("coin-flip-btn").addEventListener("click", flipCoin);
document.getElementById("add-timer-btn").addEventListener("click", addTimer);
function suggestSubstitute() {
    const ingredient = document.getElementById("ingredient-substitution").value.toLowerCase();
    const result = document.getElementById("substitute-result");
    if (ingredientSubstitutes[ingredient]) {
        result.textContent = `The wizard dude says the substitute for ${ingredient}: ${ingredientSubstitutes[ingredient]}`;
    } else {
        result.textContent = "Sorry dude no substitute I know of.";
    }
}
function calculateTime() {
    const originalTime = parseInt(document.getElementById("original-time").value);
    const originalQuantity = parseInt(document.getElementById("original-quantity").value);
    const scaledQuantity = parseInt(document.getElementById("scaled-quantity").value);
    const temperature = parseInt(document.getElementById("temperature").value);
    const unit = document.getElementById("unit-toggle").value;
    const recipeType = document.getElementById("recipe-type").value;
    const result = document.getElementById("time-result");
    if (isNaN(originalTime) || isNaN(originalQuantity) || isNaN(scaledQuantity) || isNaN(temperature) ||
        originalTime <= 0 || originalQuantity <= 0 || scaledQuantity <= 0 || temperature <= 0) {
        result.textContent = "Oh yeah lemme just make up data. Fill in all the fields dude";
        return;
    }
    let tempInFahrenheit = temperature;
    if (unit === "C") {
        tempInFahrenheit = (temperature * 9 / 5) + 32; 
    }
    let scalingExponent = 1;
    if (recipeType === "boil" || recipeType === "stovetop") scalingExponent = 0.8;
    let scaledTime = originalTime * Math.pow((scaledQuantity / originalQuantity), scalingExponent);
    if (tempInFahrenheit > 375) {
        scaledTime *= 0.85;
    } else if (tempInFahrenheit < 325) {
        scaledTime *= 1.05;
    }
    result.textContent = `New cooking time for ${scaledQuantity} servings at ${tempInFahrenheit}°F: ${scaledTime.toFixed(2)} minutes.`;
}
function calculateRequiredTemperature() {
    const originalTime = parseInt(document.getElementById("original-time").value);
    const originalQuantity = parseInt(document.getElementById("original-quantity").value);
    const scaledQuantity = parseInt(document.getElementById("scaled-quantity").value);
    const targetTime = parseInt(document.getElementById("target-time").value);
    const recipeType = document.getElementById("recipe-type").value;
    const tempResult = document.getElementById("temp-result");
    if (isNaN(originalTime) || isNaN(originalQuantity) || isNaN(scaledQuantity) || isNaN(targetTime) ||
        originalTime <= 0 || originalQuantity <= 0 || scaledQuantity <= 0 || targetTime <= 0) {
        tempResult.textContent = "Please enter valid inputs for all fields.";
        return;
    }
    const timeScalingFactor = targetTime / originalTime;
    let baseTemperature = 350;
    if (recipeType === "bake") {
        baseTemperature = 350;
    } else if (recipeType === "boil") {
        baseTemperature = 212;
    } else if (recipeType === "grill") {
        baseTemperature = 400;
    } else if (recipeType === "stovetop") {
        baseTemperature = 300;
    }
    let requiredTemperature = baseTemperature * Math.pow(timeScalingFactor, 1);
    tempResult.textContent = `Required temperature to cook ${scaledQuantity} servings in ${targetTime} minutes: ${Math.round(requiredTemperature)}°F.`;
}
function suggestFlavorPairing() {
    const ingredient = document.getElementById("flavor-pairing").value.toLowerCase();
    const result = document.getElementById("pairing-result");
    if (flavorPairings[ingredient]) {
        result.textContent = `Flavor pairings for ${ingredient}: ${flavorPairings[ingredient].join(", ")}`;
    } else {
        result.textContent = "Sorry, no flavor pairings found for this ingredient."; //dead code but I dont wanna bother removing :p futrure karol problem
    }
}
function flipCoin() {
    const ingredient1 = document.getElementById("coin-ingredient-1").value.toLowerCase();
    const ingredient2 = document.getElementById("coin-ingredient-2").value.toLowerCase();
    const result = document.getElementById("coin-result");
    if (!ingredient1 || !ingredient2) {
        result.textContent = "Please enter both ingredients.";
        return;
    }
    if((ingredient1=='drinking'&&ingredient2=='driving'||(ingredient1=="driving")&&ingredient2=='drinking'))
    {
        result.textContent = "HUGE HELL YEA. THATS FIVE BIG BOOMS. BOOM. BOOM. BOOM. BOOM. BOOM."
        return
    }
    const outcome = Math.random() < 0.5 ? "Hell yea" : "Prob not";
    result.textContent = `Will ${ingredient1} pair with ${ingredient2}? ${outcome}`;
}
let timerCount = 0;
function addTimer() {
    timerCount++;
    const timersContainer = document.getElementById("timers-container");
    const timerDiv = document.createElement("div");
    timerDiv.classList.add("timer");
    const timerNameInput = document.createElement("input");
    timerNameInput.type = "text";
    timerNameInput.placeholder = "Timer Name";
    timerNameInput.classList.add("timer-name");
    const timerInput = document.createElement("input");
    timerInput.type = "number";
    timerInput.placeholder = "Minutes";
    timerInput.classList.add("timer-duration");
    const timerSecondsInput = document.createElement("input");
    timerSecondsInput.type = "number";
    timerSecondsInput.placeholder = "Seconds";
    timerSecondsInput.classList.add("timer-duration");
    const startButton = document.createElement("button");
    startButton.textContent = "Start Timer";
    startButton.onclick = function() {
        startTimer(timerNameInput.value, timerInput.value, timerSecondsInput.value);
    };
    const timerDisplay = document.createElement("p");
    timerDisplay.classList.add("timer-display");
    timerDisplay.textContent = "";
    timerDiv.appendChild(timerNameInput);
    timerDiv.appendChild(timerInput);
    timerDiv.appendChild(timerSecondsInput);
    timerDiv.appendChild(startButton);
    timerDiv.appendChild(timerDisplay);
    timersContainer.appendChild(timerDiv);
}
function startTimer(name, minutes, seconds) {
    if (!name || (!minutes && !seconds) || (minutes <= 0 && seconds <= 0)) {
        alert("One trillion seconds until ur court trial. Maybe next time put in some valid inputs dawg");
        return;
    }
    const totalTime = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0); // Convert to seconds
    let remainingTime = totalTime;
    const timerDisplay = document.querySelector(".timer-display:last-child");
    timerDisplay.textContent = `${name}: ${formatTime(remainingTime)}`;
    const timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert(`${name} timer is up!`);
            timerDisplay.textContent = `${name}: Time's up!`;
        } else {
            remainingTime--;
            timerDisplay.textContent = `${name}: ${formatTime(remainingTime)}`;
        }
    }, 1000);
}
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
}
addTimer();