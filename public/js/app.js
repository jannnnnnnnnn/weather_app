console.log(" i am in app.js");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#location");
const msg2 = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;
  console.log(address);
  fetch(`/weather?address=${address}`)
    .then((response) => response.json())
    .then((data) => {
      data.error
        ? ((msg1.innerHTML = data.error), (msg2.innerHTML = ""))
        : ((msg1.innerHTML = data.location), (msg2.innerHTML = data.forecast));
    })
    .catch((err) => console.log(err));
});
