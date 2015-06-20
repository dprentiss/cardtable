"use strict";

$(document).ready(function () {
    $('#periodCardRow').disableSelection().sortable({revert: 100});
});

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
};;

var newSceneHandler = function (button) {
    var parentCard = $(button).closest('.eventStack');
    var sceneNum = parentCard.children().length;
    var newCard = $("<div>", {class: "card scene"});
    var cardSpacing = 10;
    var scenesOriginLeft = 20;
    var scenesOriginTop = 40;
    var cardPosition = {'top': scenesOriginTop + sceneNum * -cardSpacing, 'left': scenesOriginLeft + sceneNum * cardSpacing, 'z-index': -sceneNum};
    newCard.css(cardPosition);
    parentCard.append(newCard);
};;
