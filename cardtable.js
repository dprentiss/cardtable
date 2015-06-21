"use strict";

$(document).ready(function () {
    $('#periodCardRow').disableSelection().sortable({revert: 100});
});

let slide = {
    create: function () { 
	var newSlide = Object.create(slide);
	newSlide.periods = [];
	return newSlide;
    	},
    addPeriod: function () {
	this.periods.push(period.create())
	}
};

let period = {
    create: function () {
	var newPeriod = Object.create(period);
	newPeriod.events = [];
	return newPeriod;
        },
    addEvent: function () {
	this.events.push(card.create())
	}
};

let card = {
    create: function () {
        var newCard = Object.create(slide);
	newCard.front = {};
	return newCard;
        }
};

var newPeriodHandler = function () {
    var newPeriod = $("<div>", {class: "periodColumn"});
    newPeriod.disableSelection().sortable({revert: 100});
    var newCard = $("<div>", {class: "card"});
    newCard.append("<button onclick=newEventCardHandler(this)>Add Event</button>");
    newPeriod.append(newCard);
    $("#periodCardRow").append(newPeriod);
};

var newEventCardHandler = function (button) {
    var newEvent = $("<div>", {class: "eventStack"});
    newEvent.disableSelection().sortable({revert: 100});
    var newCard = $("<div>", {class: "card event"});
    newCard.append("<button onclick=newSceneHandler(this)>Add Scene</button>");
    newEvent.append(newCard);
    $(button).closest('.periodColumn').append(newEvent);
};

var newSceneHandler = function (button) {
    var parentCard = $(button).closest('.eventStack');
    var sceneNum = parentCard.children().length;
    var newCard = $("<div>", {class: "card scene"});
    var cardSpacing = 5;
    var scenesOriginLeft = 20;
    var scenesOriginTop = 75;
    var cardPosition = {top: scenesOriginTop + sceneNum * -cardSpacing, left: scenesOriginLeft + sceneNum * cardSpacing, 'z-index': -sceneNum};
    newCard.css(cardPosition);
    parentCard.append(newCard);
};
