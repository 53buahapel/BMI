document.addEventListener("DOMContentLoaded", function () {
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const calculateButton = document.getElementById("calculate");
    const resultDiv = document.getElementById("result");

    calculateButton.addEventListener("click", calculateBMI);

    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100;

        if (!isNaN(weight) && !isNaN(height) && height > 0) {
            const bmi = calculateBMIValue(weight, height);
            const category = determineBMICategory(bmi);

            resultDiv.innerHTML = `Your BMI is ${bmi.toFixed(2)} (${category})`;
        } else {
            resultDiv.innerHTML = "Please enter valid weight and height values.";
        }
    }

    function calculateBMIValue(weight, height) {
        return weight / (height * height);
    }

    function determineBMICategory(bmi) {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            return "Normal weight";
        } else if (bmi >= 25 && bmi < 30) {
            return "Overweight";
        } else {
            return "Obese";
        }
    }
});
