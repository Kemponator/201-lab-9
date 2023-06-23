"use strict";

console.log("Salmon cookies");

const totalCookiesSold = 0;
const totalCookiesSoldWorldWide = 0;
const openHours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

const container = document.getElementById("container");

const h2 = document.createElement("h2");
h2.textContent = "Sales";
container.appendChild(h2);

const article = document.createElement("article");
container.appendChild(article);

const table = document.createElement("table");
article.appendChild(table);

const tr = document.createElement("tr");
table.appendChild(tr);
storeOpenHours();

function storeOpenHours() {
  const th = document.createElement("th");
  th.textContent = "Shop Location";
  tr.appendChild(th);

  for (let i = 0; i < openHours.length; i++) {
    const td = document.createElement("td");
    td.textContent = openHours[i];
    tr.appendChild(td);
  }
}

const td = document.createElement("td");
td.textContent = "Daily Location Total";
tr.appendChild(td);

function Shop(shopName, minCust, maxCust, avgCookiePerCust) {
  this.shopName = shopName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiePerCust = avgCookiePerCust;
  this.custPerHour = [];
  this.calcCustomersEachHour();
  this.cookiesPerHour = [];
  this.calcCookiesEachHour();
  this.totalDailyCookies = this.calcDailyCookies();

  this.render();
}

Shop.prototype.calcCustomersEachHour = function () {
  for (let i = 0; i < openHours.length; i++) {
    this.custPerHour.push(randomCust(this.minCust, this.maxCust));
  }
};

Shop.prototype.calcCookiesEachHour = function () {
  for (let i = 0; i < openHours.length; i++) {
    const oneHour = Math.ceil(this.custPerHour[i] * this.avgCookiePerCust);
    this.cookiesPerHour.push(oneHour);
    this.totalCookiesSold += oneHour;
  }
};

function randomCust(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Shop.prototype.calcDailyCookies = function () {
  let totalDailyCookies = 0;
  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    totalDailyCookies += this.cookiesPerHour[i];
  }
  return totalDailyCookies;
};

Shop.prototype.render = function () {
  const containerElement = document.getElementById("container");

  const tr = document.createElement("tr");
  table.appendChild(tr);

  const th = document.createElement("th");
  th.textContent = this.shopName;
  tr.appendChild(th);

  for (let i = 0; i < openHours.length; i++) {
    const td = document.createElement("td");
    td.textContent = this.cookiesPerHour[i];
    tr.appendChild(td);
  }
  const td = document.createElement("td");
  td.textContent = this.totalDailyCookies;
  tr.appendChild(td);
};

function hoursTotal(stores) {
  const tr = document.createElement("tr");
  table.appendChild(tr);

  const th = document.createElement("th");
  th.textContent = "Totals";
  tr.appendChild(th);

  for (let i = 0; i < openHours.length; i++) {
    const td = document.createElement("td");
    let totalHourCookiesSold = 0;
    for (let j = 0; j < stores.length; j++) {
      totalHourCookiesSold += stores[j].cookiesPerHour[i];
    }
    td.textContent = totalHourCookiesSold;
    tr.appendChild(td);
  }
  let totalGlobalSales = 0;

  const td = document.createElement("td");
  for (let i = 0; i < stores.length; i++) {
    totalGlobalSales += stores[i].totalDailyCookies;
  }
  td.textContent = totalGlobalSales;
  tr.appendChild(td);
}

const seattle = new Shop("seattle", 23, 65, 6.3);
const tokyo = new Shop("tokyo", 3, 24, 1.2);
const dubai = new Shop("dubai", 11, 38, 3.7);
const paris = new Shop("paris", 20, 38, 2.3);
const lima = new Shop("lima", 2, 16, 4.6);
hoursTotal([seattle, tokyo, dubai, paris, lima]);

//test for a form (below)

kittenForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // console.log(event);
  const name = event.target.name.value;
  let interests = event.target.interests.value;
  interests = interests.split(",");

  const isGoodWithKids = event.target.isGoodWithKids.checked;
  const isGoodWithDogs = event.target.isGoodWithDogs.checked;
  const isGoodWithCats = event.target.isGoodWithCats.checked;
  const imageUrl = "ADD IMAGE HERE";

  const newKitten = new Kitten(
    name,
    interests,
    isGoodWithKids,
    isGoodWithDogs,
    isGoodWithCats,
    imageUrl
  );
  console.log(newKitten);
  console.log(allKittens);

  renderAllKittens();
  kittenForm.reset();
});

function renderAllKittens() {
  for (let i = 0; i < allKittens.length; i++) {
    allKittens[i].render();
  }
}

renderAllKittens();
