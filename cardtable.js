"use strict";

var currentSlide = {};
var currentSlideString = {};
var localParticipant = {};

var init = function() {

    // set local participant
    localParticipant = (gapi.hangout.getLocalParticipant());

    // listen for particpant changes
    gapi.hangout.onParticipantsChanged.add(function(e) {
	participantsChangedHandler(e);
    });

    // listen for changes to hangout state
    gapi.hangout.data.onStateChanged.add(function(e) {
	stateChangeHandler(e);
    });
}

$(document).ready(function () {
    var currentSlide = slide.create();
    var mainMenu = $('<ul>').attr('id', 'mainMenu');
    $('body').append(mainMenu);
    var addPeriodButton = $('<button>').click({s:currentSlide}, newPeriodHandler).text('Add Period');
    mainMenu.append($('<li>').append(addPeriodButton));
    $('body').append($('<div>').attr('id', 'periodCardRow'));
    $('#periodCardRow').disableSelection().sortable({revert: 100});
});

// handle participant changes
var participantsChangedHandler = function(e) {
}

// handle changes to hangout state
var stateChangeHandler = function(e) {
    gapi.hangout.data.setValue('currentSlide','this is a newer slide');
    console.log(localParticipant);
}

var updateSlide = function(e) {
    if(currentSlideString != e.state.currentSlide) {
    }
}

let slide = {
    create: function () { 
	var newSlide = Object.create(slide);
	newSlide.bigPicture = '';
	newSlide.periods = [];
	return newSlide;
    },
    addPeriod: function () {
	this.periods.push(period.create());
    }
};

let period = {
    create: function () {
	var newPeriod = Object.create(period);
	newPeriod.bookend = null;
	newPeriod.description = '';
	newPeriod.tone = 'light';
	newPeriod.events = [];
	return newPeriod;
    },
    addEventStack: function () {
	this.events.push(eventStack.create());
    }
};

let eventStack = {
    create: function () {
	var newEventStack = Object.create(eventStack);
	newEventStack.description = '';
	newEventStack.tone = 'light';
	newEventStack.scenes = [];
	return newEventStack;
    },
    addScene: function () {
	this.scenes.push(card.create());
    }
};

let scene = {
    create: function () {
        var newScene = Object.create(scene);
	newScene.description = '';
	newScene.tone = 'light';
	return newScene;
        }
};

let card = {
    create: function (type) {
        var newCard = Object.create(card);
	newCard.type = type;
	newCard.front = {};
	return newCard;
        }
};

var newPeriodHandler = function (e) {
    e.data.s.addPeriod();
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
