// The request for the Clearbit API needs an authorization (api key)
// sent in the headers of the request. The next 2 variables are preparing
// this.
// More info on the docs: https://clearbit.com/docs?shell#enrichment-api
const authorization = "Bearer sk_33883e2b8b3066b2216f3dd4aa063ee0";
const fetchParams = {
  headers: {
    Authorization: authorization
  }
}

// Selecting the html elements that are going to display the user info.
const userNameDisplay     = document.querySelector('#userName');
const userEmailDisplay    = document.querySelector('#userEmail');
const userBioDisplay      = document.querySelector('#userBio');
const userLocationDisplay = document.querySelector('#userLocation');

// This function updates the interface (html fields) when given a person obj.
const updatePersonDisplay = (person) => {
  userNameDisplay.innerText     = person.name.fullName;
  userEmailDisplay.innerText    = person.email;
  userBioDisplay.innerText      = person.bio;
  userLocationDisplay.innerText = person.location;
};

// This fetches the info about a given person when given an email
// It then calls the updatePersonDisplay function when the request is answered.
const fetchPersonInfo = (email) => {
  const url = `https://person.clearbit.com/v2/combined/find?email=${email}`;
  fetch(url, fetchParams)
    .then(response => response.json())
    .then(data => updatePersonDisplay(data.person));
};

// The form (duh!)
const clearbitForm = document.querySelector('#clearbitForm');

// This defines the behaviour of the form
const formFetchBehaviour = (event) => {
  event.preventDefault();

  const form  = event.currentTarget;
  const email = form.querySelector('input').value;
  fetchPersonInfo(email);
}

// ==================== Notice this separation! ==============================
// We have only ground work before this.

// And (after all this setup) this is the only function call on the page. =)
// We add a listener on the form submit.
clearbitForm.addEventListener('submit', formFetchBehaviour);
