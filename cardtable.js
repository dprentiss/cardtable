"use strict";

$(document).ready(function() {
  $('#periodCardRow').disableSelection().sortable({revert: 100});
});

var newPeriodHandler = function() {
  var numCards = (typeof(numCards) === "undefined" ? 0 : numCards + 1);
  var newPeriod = $("<div>", {class: "periodColumn"});
  newPeriod.disableSelection().sortable({revert: 100});
  var newCard = $("<div>", {class: "card"});
  newCard.append("<h1>" + numCards + "</h1>");
  newCard.append("<button onclick=newEventCardHandler(this)>Add Event</button>");
  newPeriod.append(newCard);
  $("#periodCardRow").append(newPeriod);
};

var newEventCardHandler = function(button) {
  var numCards = typeof(numCards) === "undefined" ? 0 : numCards + 1;
  var newEvent = $("<div>", {class: "eventStack"});
  newEvent.disableSelection().sortable({revert: 100});
  var newCard = $("<div>", {class: "card event"});
  newCard.append("<h1>" + numCards + "</h1>");
  newCard.append("<button>Add Scene</button>");
  newEvent.append(newCard);
  $(button).closest('.periodColumn').append(newEvent);
};

var CardGame = function() {
  this.createdDate = new Date();
};

var Table = function() {
  this.createdDate = new Date();
  this.stacks = [];
}

Table.prototype.addStack = function(stack, location) {
  this.stacks.push({stack: stack, location: location});
}

var Stack = function() {
  this.createdDate = new Date();
  this.cards = [];
};

Stack.prototype.addCard = function(card, orientation) {
  this.cards.push({card: card, orientation: orientation});
}

var Card = function() {
  this.createdDate = new Date();
  this.isLocked = false;
  this.front = 'Front';
  this.back = 'Back';
};

Card.prototype.toggleOrientation = function() {
  (this.orientation == 'portrait' ? this.orientation = 'landscape' : this.orientation = 'portrait');
};

Card.prototype.toggleLock = function() {
  if (this.isLocked) {this.isLocked = false;}
  else {this.isLocked = true;}
};

var test = function() {
  cardGame = new CardGame();
  table = new Table();
  stack = new Stack();
  for (i = 0; i < 3; i++) {
    stack.addCard(new Card(), 'portrait');
  }
  table.addStack(stack, 'center')
}

//test()
