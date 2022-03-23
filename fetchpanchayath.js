var districtSelectElement = document.getElementById("sel1");
var talukElement = document.getElementById("sel2");
var panchayathElement = document.getElementById("sel3");

async function init() {
  let districts = await fetchDistricts();

  //adding districts to dropdown

  districts.forEach((item) => {
    var opt = document.createElement("option");
    opt.value = item.id;
    opt.innerHTML = item.district_name;
    districtSelectElement.appendChild(opt);
  });
}

async function fetchDistricts() {
  return fetch("https://aivarnadu.intellogicsoftware.net/api/district")
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => null);
}
async function fetchTaluks(id) {
  await fetch(`https://aivarnadu.intellogicsoftware.net/api/taluk/${id}`)
    .then((response) => response.json())
    .then((data) => {
      talukElement.innerHTML = "<option>Select Taluk</option>";
      //add taluks to dom
      data.forEach((item) => {
        var opt = document.createElement("option");
        opt.value = item.id;
        opt.innerHTML = item.taluk_name;
        talukElement.appendChild(opt);
      });
    })
    .catch((err) => null);
}
var url;
async function fetchPanchayaths(id) {
  await fetch(`https://aivarnadu.intellogicsoftware.net/api/panchayath/${id}`)
    .then((response) => response.json())
    .then((data) => {
      //add taluks to dom
      panchayathElement.innerHTML = "<option>Select Panchayat</option>";
      data.forEach((item) => {
        var opt = document.createElement("option");
        opt.value = item.id;
        opt.innerHTML = item.panchayath_name;
        let buttonElement = document.getElementById("goBtn");
        buttonElement.setAttribute("href", item.url);
        panchayathElement.appendChild(opt);
      });
    })
    .catch((err) => null);
}

districtSelectElement.addEventListener("change", function () {
  let id = districtSelectElement.value;
  fetchTaluks(id);
});
talukElement.addEventListener("change", function () {
  let id = talukElement.value;
  fetchPanchayaths(id);
});

(async function () {
  init();
})();
