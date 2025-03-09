"use strict";

//Select all the elemts

//Header
const money = document.querySelector(".money");
const restart = document.querySelector(".restart-button");
const moneyStatus = document.querySelector(".money-status");

//Main Box
const diceA = document.querySelector(".dice-a");
const diceB = document.querySelector(".dice-b");
const diceC = document.querySelector(".dice-c");
const diceD = document.querySelector(".dice-d");

//Main
const updateText = document.querySelector(".update-text");
const status = document.querySelector(".status");
const rollButton = document.querySelector(".roll-button");
const selectColor = document.getElementById("color");
const bet = document.getElementById("bet");

//Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay2");
const openModalButton = document.querySelector(".game-info-button");
const closeModalButton = document.querySelector(".close-modal");

//Functions to call
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const displayUpdate = function (update) {
  updateText.textContent = update;
};
const displayStatus = function (statusText) {
  status.textContent = statusText;
};
const displayMoney = function (moneyNum) {
  money.textContent = moneyNum;
};

//Color selection function
const colorSelection = function (colorName) {
  let number = 0;
  if (colorName === "red") {
    number = 1;
  } else if (colorName === "green") {
    number = 2;
  } else if (colorName === "blue") {
    number = 3;
  } else if (colorName === "yellow") {
    number = 4;
  }
  return number;
};

//1. Roll Button eventlistener
let moneyCount = 0;
rollButton.addEventListener("click", function () {
  // dices for diceA to diceD
  const dices1 = Math.trunc(Math.random() * 4) + 1;
  const dices2 = Math.trunc(Math.random() * 4) + 1;
  const dices3 = Math.trunc(Math.random() * 4) + 1;
  const dices4 = Math.trunc(Math.random() * 4) + 1;

  diceA.src = `dice${dices1}.jpg`;
  diceB.src = `dice${dices2}.jpg`;
  diceC.src = `dice${dices3}.jpg`;
  diceD.src = `dice${dices4}.jpg`;

  const colorName = selectColor.value;
  const colorNumber = colorSelection(colorName);
  const arrayDices = [dices1, dices2, dices3, dices4];

  //count the number of times the selected color matched the dices
  let count = 0;
  for (let i = 0; i < arrayDices.length; i++) {
    if (colorNumber == arrayDices[i]) {
      count++;
    }
  }

  //For the bet
  //Converts texts to number
  const betNumber = Number(bet.value);

  if (betNumber >= 5 && betNumber <= 10) {
    displayMoney(betNumber);
    if (count == 1) {
      displayUpdate("Remain coin");
      displayStatus("You can win this champ!");
      moneyCount += betNumber * 1;
      displayMoney(moneyCount);
      //TODO Add the money count
    } else if (count == 2) {
      displayUpdate("DOBLE!!");
      displayStatus("DREAM BIIIG!!!");
      moneyCount += betNumber * 2;
      displayMoney(moneyCount);
    } else if (count == 3) {
      displayUpdate("TRIPLE!!!");
      displayStatus("Oh my, a triple!!");
      moneyCount += betNumber * 3;
      displayMoney(moneyCount);
    } else if (count == 4) {
      displayUpdate("🎉🎉JACKPOT🎉🎉");
      displayStatus("YOU GOT IT MASTER!");
      moneyCount += betNumber * 4;
      displayMoney(moneyCount);
    }
    if (count == 0) {
      displayUpdate("Lost");
      displayStatus("Better luck next time master");
      if (moneyCount < 20) {
        moneyCount = moneyCount - betNumber * 2;
        displayMoney(moneyCount);
      } else if (moneyCount >= 20 && moneyCount < 50) {
        moneyCount = moneyCount - betNumber * 4;
        displayMoney(moneyCount);
      } else if (moneyCount >= 50 && moneyCount < 100) {
        moneyCount = moneyCount - betNumber * 6;
        displayMoney(moneyCount);
      } else if (moneyCount >= 100) {
        moneyCount = moneyCount - betNumber * 8;
        displayMoney(moneyCount);
      }
    }
  } else {
    displayStatus("The bet must be between 20 and 100");
  }
  if (moneyCount < 0) {
    moneyStatus.classList.add("background");
  } else {
    moneyStatus.classList.remove("background");
  }
});

//Restart button
restart.addEventListener("click", function () {
  moneyCount = 0;
  displayMoney("0");
  moneyStatus.classList.remove("background");
  displayStatus("Press the red button to roll dice");
  displayUpdate("WELCOME TO THE GAME");
  diceA.src = "dice1.jpg";
  diceB.src = "dice3.jpg";
  diceC.src = "dice2.jpg";
  diceD.src = "dice4.jpg";
});

//open modal button
openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);
