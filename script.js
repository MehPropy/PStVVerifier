// Names and Ore amounts
const items = [ 
    { name: 'Ore', points: 1 },
      { name: 'Champion Mask', points: 500 },
      { name: 'Champion Scarf', points: 500 },
      { name: 'Champion Haorie', points: 500 },
      { name: 'Champion Katana', points: 500 },
      { name: 'Champion Neckless', points: 400 },
      { name: 'Devourer Top', points: 400 },
      { name: 'Akaza Bottom', points: 400 },
      { name: 'Akaza Top', points: 400 },
      { name: 'Enmu Bottom', points: 380 },
      { name: 'Enmu Top', points: 380 },
      { name: 'Samurai Maidens Amigasa', points: 250 },
      { name: 'Devourer Bottom', points: 200 },
      { name: 'Sealed Box', points: 120 },
      { name: 'Rengoku Haorie', points: 75 },
      { name: 'Tengen Uniform', points: 60 },
      { name: 'Devourer Scythe', points: 40 },
      { name: 'Devourer Fans', points: 40 },
      { name: 'Devourer Katana', points: 30 },
      { name: 'Polar Fans', points: 35 },
      { name: 'Polar Scythe', points: 35 },
      { name: 'Polar Katana', points: 25 },
      { name: 'Polar Bottom', points: 20 },
      { name: 'Polar Mask', points: 20 },
      { name: 'Douma Bottom', points: 20 },
      { name: 'Skull Scythe', points: 20 },
      { name: 'War Fans', points: 19 }, // War Fans nerfed
      { name: 'Living Flesh', points: 15 },
      { name: 'Sound Katanas', points: 15 },
      { name: 'Polar Top', points: 15 },
      { name: 'Orbed Glacier', points: 14 },
      { name: 'Black Bamnoo Amigasa', points: 10 },
      { name: 'Devourer Mask', points: 10 },
      { name: 'Douma Top', points: 10 },
      { name: 'Beast Katanas', points: 5 },
      { name: 'Bone Claws', points: 5 },
      { name: 'Butterfly Katana', points: 5 },
      { name: 'Metal Scythe', points: 5 },
      { name: 'Volcanic Katana', points: 5 },
      { name: 'Yatagarasu Mask', points: 5 },
      { name: 'Snow Katana', points: 5 },
      { name: 'Straw Hat', points: 5 },
      { name: 'Cloud Katana', points: 4 },
      { name: 'Tornadic Katana', points: 4 },
      { name: 'Flame Katana', points: 4 },
      { name: 'Thundercloud Katana', points: 4 },
      { name: 'Waterfall Katana', points: 4 },
      { name: 'Banigaru Mask', points: 2 },
      { name: 'Skull Claws', points: 2 },
      { name: 'Kesshoseki Neckless', points: 2 },
      { name: 'Insect Katana', points: 1 },
      { name: 'Thunder Katana', points: 1 },
      { name: 'Mist Katana', points: 1 },
      { name: 'Scythe', points: 1 },
      { name: 'Tonakai Keikai Mask', points: 1 },
      { name: 'Tigress Warding Mask', points: 1 },
      { name: 'Hiretsuna Kitsune Mask', points: 1 },
      { name: 'Vigilante Scarft', points: 1 }
  ];

// Lists
function populateLists() {
  const giveList = document.getElementById('give-list');
  const getList = document.getElementById('get-list');

  items.forEach(item => {
    const giveItem = createListItem(item.name, 'give');
    giveList.appendChild(giveItem);

    const getItem = createListItem(item.name, 'get');
    getList.appendChild(getItem);
  });
}

// Making CheckBoxes
function createListItem(itemName, section) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = itemName;
  checkbox.name = section + '-checkbox';

  const amountInput = document.createElement('input');
  amountInput.type = 'number';
  amountInput.min = '1';
  amountInput.value = '1';
  amountInput.className = 'amount-input';

  listItem.appendChild(checkbox);
  listItem.append(itemName);
  listItem.appendChild(amountInput);

  return listItem;
}

// Calculate trade result
function calculateTrade() {
  const giveItems = document.querySelectorAll('#give-list input[type="checkbox"]:checked');
  const getItems = document.querySelectorAll('#get-list input[type="checkbox"]:checked');

  let givePoints = 0;
  let getPoints = 0;

  giveItems.forEach(item => {
    const itemName = item.value;
    const itemPoints = items.find(i => i.name === itemName).points;
    const itemAmount = Number(item.nextElementSibling.value);
    givePoints += itemPoints * itemAmount;
  });

  getItems.forEach(item => {
    const itemName = item.value;
    const itemPoints = items.find(i => i.name === itemName).points;
    const itemAmount = Number(item.nextElementSibling.value);
    getPoints += itemPoints * itemAmount;
  });

  const tradeResult = givePoints - getPoints;
  let resultText = '';
  
  document.getElementById("give-items-worth").textContent = givePoints;
  document.getElementById("get-items-worth").textContent = getPoints;

  if (tradeResult > 2) {
    resultText = 'Trade is bad';
  } else if (tradeResult < -2) {
    resultText = 'Trade is good';
  } else {
    resultText = 'Trade is fair';
  }

  document.getElementById('trade-result').textContent = resultText;
}

// Filter and highlight based on search
function filterItems(inputId, listId) {
  const input = document.getElementById(inputId);
  const filter = input.value.toLowerCase();
  const list = document.getElementById(listId);
  const items = list.getElementsByTagName('li');
  const AmountInput = document.getElementById("amount-input")

  Array.from(items).forEach(item => {
    const itemName = item.textContent.toLowerCase();

    if (itemName.includes(filter)) {
      item.classList.remove('highlight');
    } else {
      item.classList.add('highlight');
    }
  });
}

populateLists();

const calculateButton = document.getElementById('calculate-button');
calculateButton.addEventListener('click', calculateTrade);

const giveSearchInput = document.getElementById('give-search-input');
giveSearchInput.addEventListener('input', function () {
  filterItems('give-search-input', 'give-list');
});

const getSearchInput = document.getElementById('get-search-input');
getSearchInput.addEventListener('input', function () {
  filterItems('get-search-input', 'get-list');
});

function mobileMode() {
    const ps = document.getElementsByTagName("p");
    const ul = document.getElementsByTagName("ul");
    const buttons = document.getElementsByTagName("button");
    const inputs = document.getElementsByTagName("input");
    const h2s = document.getElementsByTagName("h2")
    const searchGive = document.getElementById("give-search-input")
    const searchGet = document.getElementById("get-search-input")
  
    for (var i = 0; i < ul.length; i++) {
      ul[i].style.fontSize = "15px";
    }
    for (var i = 0; i < ps.length; i++) {
      ps[i].style.fontSize = "15px";
    }
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.fontSize = "15px";
    }
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].style.fontSize = "10px";
      inputs[i].style.width = "20px";
    }
    for (var i = 0; i < h2s.length; i++) {
        h2s[i].style.fontSize = "15px";
    }
    searchGive.style.width = "100px";
    searchGet.style.width = "100px";
}
function notice() {
    alert("Hello, welcome to Project Slayers trading Value Verifier (PStVVerifier)! This website is made by MehPropy and with the help of my friend for the item value. You can use this website to determine if the trade you are doing in Project Slayers is Good, Fair or Bad. Some items (mostly champion items) MIGHT be incorrect value since they are hard to get and people that trade them will almost always have different needs. Most of the items (such as most necklesses) have been removed due to people just not trading them. If you want to contact me for correcting the values or adding the items, add me on discord: mehpropy.")
    alert("You can check the checkboxes at the item in the 'Give' and 'Get' sections and with clicking 'Calculate Trade' the program will calculate the trade based on Ores")
    alert("Please keep in mind that 'Good' trade dosen't mean that the trade is a fair trade, it simply means you get more than you give")
    alert("Same goes for 'Bad', it means you give more than get")
    alert("You also have text boxes at every item, it is for putting the amount of the item")
    alert("That's it, enjoy!")
    alert("Oh and by the way, you can just see how much item is worth by just clicking 'Calculate trade' when selecting one item")
}