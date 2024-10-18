const monthImages = [
    './App/Images/january.webp',
    './App/Images/february.jpg',
    './App/Images/march.jpg',
    './App/Images/april.jpg',
    './App/Images/may.jpg',
    './App/Images/june.jpg',
    './App/Images/july.jpg',
    './App/Images/august.jpg',
    './App/Images/september.jpg',
    './App/Images/october.avif',
    './App/Images/november.jpg',
    './App/Images/december.png'
]

document.addEventListener('DOMContentLoaded', function () {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const selectMonthYear = document.getElementById('selectMonthYear');
    const calendarBody = document.getElementById('calendarBody');
    const aside = document.getElementsByTagName("aside")[0];


    const toggleAside = () => {
        if(aside.style.display === "none" || aside.style.display === "") {
            aside.style.display = "block";
        } else {
            aside.style.display = "none";
        }
    };


    const toggleTd = function (event) {
        const td = event.target;    
        
        if (td.classList.contains("tdSelected")) {
            td.classList.remove("tdSelected");
        } else {
            td.classList.add("tdSelected");
        }
    }


    const tdListener = function () {
        const tdElements = calendarBody.getElementsByTagName('td');
        for (let i = 0; i < tdElements.length; i++) {
            tdElements[i].addEventListener("click", function(event) {
                toggleAside();
                toggleTd(event)
            });
        }
    }


    if (!monthSelect || !yearSelect || !selectMonthYear || !calendarBody) {
        console.error('One or more calendar elements are missing in the DOM.');
        return;
    }
 

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
  

    function getDaysInMonth(month, year) {
        const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysInMonth[month];
    }
  

    function getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }
   

    function displayMonth(monthIndex, year) {
        const daysInMonth = getDaysInMonth(monthIndex, year);
        const firstDay = getFirstDayOfMonth(monthIndex, year);

        selectMonthYear.innerHTML = `${monthSelect.options[monthIndex].text} ${year}`;

        let tableHTML = '<tr>';
       
        for (let i = 0; i < firstDay; i++) {
            tableHTML += `<td></td>`;
        }
       

        for (let day = 1; day <= daysInMonth; day++) {
            tableHTML += `<td>${day}</td>`;
            if ((firstDay + day) % 7 === 0) {  
                tableHTML += '</tr><tr>';
            }
        }
     

        tableHTML += '</tr>';
        calendarBody.innerHTML = tableHTML;

        tdListener();
    }

   
    displayMonth(9, 2023);

    monthSelect.addEventListener('change', function () {
        displayMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));

        var img = document.getElementById("BackgroundImg");
        if (monthSelect.value == 0) {
            img.style.backgroundImage = `url('${monthImages[0]}')`;  
         } else if(monthSelect.value == 1) {
            img.style.backgroundImage = `url('${monthImages[1]}')`; 
         } else if(monthSelect.value == 2) {
            img.style.backgroundImage = `url('${monthImages[2]}')`; 
         } else if(monthSelect.value == 3) {
            img.style.backgroundImage = `url('${monthImages[3]}')`; 
         } else if(monthSelect.value == 4) {
            img.style.backgroundImage = `url('${monthImages[4]}')`; 
         } else if(monthSelect.value == 5) {
            img.style.backgroundImage = `url('${monthImages[5]}')`; 
         } else if(monthSelect.value == 6) {
            img.style.backgroundImage = `url('${monthImages[6]}')`; 
         } else if(monthSelect.value == 7) {
            img.style.backgroundImage = `url('${monthImages[7]}')`; 
         } else if(monthSelect.value == 8) {
            img.style.backgroundImage = `url('${monthImages[8]}')`; 
         } else if(monthSelect.value == 9) {
            img.style.backgroundImage = `url('${monthImages[9]}')`; 
         } else if(monthSelect.value == 10) {
            img.style.backgroundImage = `url('${monthImages[10]}')`; 
         } else if(monthSelect.value == 11) {
            img.style.backgroundImage = `url('${monthImages[11]}')`; 
         }


    });

    yearSelect.addEventListener('change', function () {
        displayMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));
    });
})

document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    const apiKey = 'a72fd5b57b39a74eb1bd5d872c138b8f'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

			const tempInF = (data.main.temp * 9 / 5) +32;
            const weatherInfo = `
                <p>${data.name} Weather</p>
                <p>Temperature: ${tempInF.toFixed(2)} °F</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Description: ${data.weather[0].description}</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});