document.addEventListener("DOMContentLoaded", function () {
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const ageInput = document.getElementById("age");
    const genderInput = document.getElementById("gender")
    const calculateButton = document.getElementById("calculate");
    const resultDiv = document.getElementById("result");

    calculateButton.addEventListener("click", calculateBMI);

    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const age = parseFloat(ageInput.value);
        const gender = parseFloat(genderInput.value);

        if (!isNaN(weight) && !isNaN(height) && height > 0) {
            const bmi = calculateBMIValue(weight, height);
            const category = determineBMICategory(bmi);

            resultDiv.innerHTML = `Your BMI is ${bmi.toFixed(2)} (${category}) refresh to apply changes`;
            const data = {
                weight: weight,
                height: height,
                age: age,
                gender: gender,
                bmi: bmi
            };
            // Send a POST request with JSON data
            fetch("/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseData => {
                    // Handle the response here if needed
                    console.log("POST response:", responseData);
                })
                .catch(error => {
                    console.error("Error sending POST request:", error);

                });
        } else {
            resultDiv.innerHTML = "Please enter valid weight and height values.";
        }
    }

    function calculateBMIValue(weight, height) {
        const cmtom = height / 100
        return weight / (cmtom * cmtom);
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

const xhr = new XMLHttpRequest();
xhr.open('GET', '/data');
xhr.onload = () => {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        const tableBody = document.querySelector('#data-table tbody');

        // Loop through the data and add it to the table
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${data.weight}</td>
            <td>${data.height}</td>
            <td>${data.age}</td>
            <td>${data.gender === false ? 'male' : data.gender === true ? 'female' : 'null'}</td>
            <td>${data.bmi}</td>
        `;
        tableBody.appendChild(tr);
    }
};
xhr.send();
