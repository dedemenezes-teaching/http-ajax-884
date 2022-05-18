// RECAP
// FIRST THING WILL **ALWAYS** BE TO SELECT THE ELEMENTS YOU WANT TO WORK WITH
// const btn = document.querySelector('#click-me');
const btn = document.getElementById('click-me');
console.log(btn);

// AFTER IT, WE CAN ADD EVENTS LISTENERS ON THE ELEMENTS
btn.addEventListener('click', (event)=> {
  // INSIDE THE CALL BACK WE DEFINE WHAT IT WILL ACTUALLY
  // EVENT.CURRENTTARGET WILL REFER TO THE ELEMENT WHERE THE EVENT WAS FIRED!!!
  event.currentTarget.innerText = 'Searching...';
  event.currentTarget.setAttribute('disabled', '');
  // btn.disabled = true; => DIFFERENT WAY TO ADD THE DISABLED ATTRIBUTE
});

// SELECTING MULTIPLE ELEMENTS
const items = document.querySelectorAll('#students li');
const list = document.querySelector('#students');
const students = list.querySelectorAll('li');
console.log(students);


// AJAX REQUESTS BELOW

// GET REQUEST
const searchMovies = (title) => {
  // WHEN DOING GET REQUEST THE FETCH FUNCTION HAS ONLY ONE ARGUMENT
  // THE URL WE WILL MAKE THE REQUEST
  fetch(`http://www.omdbapi.com/?s=${title}&apikey=adf1f2d7`)
    // SERVE WILL RESPOND WITH A JSON FILE AS STRING
    // WE NEED TO PARSE THE RESPONSE INTO JAVASCRIPT OBJECT
    .then(response => response.json())
    .then((data) => {
      // AFTER IT IS PARSED WE CAN EXECUTE SOME CODE USING THE RESPONSE DATA
      // Always console.log(data) to know what you will be dealing with!!!
      // console.log(data);
      const ul = document.getElementById('movies');
      // CLEAR THE LIST BEFORE ADD NEW CONTENT
      ul.innerHTML = '';
      data.Search.forEach((movie) => {
        const liHTML = `<li class="list-inline-item">
        <img src="${movie.Poster}" alt="">
        <p>${movie.Title}</p>
      </li>`;
        ul.insertAdjacentHTML('beforeend', liHTML);
      });
    });
};

// CAPTURE YOUR FORM
const searchForm = document.getElementById('search-form');

// THE FORM ELEMENT WILL ALWAYS HAVE A SUBMIT EVENT ATTACHED TO IT
// WHEN WE SUMBIT THE FORM THIS EVENT IS LAUNCHED
searchForm.addEventListener('submit', (event) => {
  // SUMBIMTTING A FORM YOU MAKE A NEW REQUEST
  // WE NEED TO PREVENT THIS DEFUALT BEHAVIOUR
  event.preventDefault();
  // get the input
  const input = document.getElementById('search-input');
  // Send the input value to the searchMovies function
  searchMovies(input.value);
});


// POST REQUEST
const signUp = (event) => {
  // PREVENT DEFAULT BEHAVIOUR OF THE FORM
  event.preventDefault();
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  // WHEN DOING A POST REQUEST, THE FETCH FUNCTION TAKES TWO ARGUMENTS!!!
  // THE URL OF THE REQUEST
  // THE ""INSTRUCTIONS"" TO OUR POST REQUEST!
  // THE SECOND ARGUMENT CONTAINS THE METHOD, THE HEADERS AND THE BODY OF YOUR POST REQUEST!
  // TO SEND THE DATA TO THE SERVER WE NEED TO CONVERT THE JAVASCRIPT OBJECT
  // SENT IN THE BODY TO A JSON STRING.
  fetch("https://reqres.in/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "email": emailValue, "password": passwordValue })
  })
    // SERVE WILL RESPOND WITH A JSON FILE
    // WE NEED TO PARSE THE RESPONSE INTO JAVASCRIPT OBJECT
    .then(response => response.json())
    .then((data) => {
      // AFTER IT IS PARSED WE CAN EXECUTE SOME CODE USING THE RESPONSE DATA
      // Always console.log(data) to know what you will be dealing with!!!
      console.log(data);
    });
};

// SAME STRATEGY AS BEFORE
// SELECT THE ELEMENT WEHE WE WANT TO ATTACH OUR EVENT(MICROPHONE)
const form = document.querySelector("#form");
form.addEventListener("submit", signUp);
