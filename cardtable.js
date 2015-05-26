$(document).ready(function() {
    $('#periodCards').disableSelection().sortable({revert: 100});
});

var newCardHandler = function() {
    this.numCards = (this.numCards || 0) + 1;
    $newCard = $("<div>", {class: "card" });
    $newCard.append("<h1>" + numCards + "</h1>");
    $("#periodCards").append($newCard);
}

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
    if (this.orientation == 'portrait') {
        this.orientation = 'landscape';
    } else if (this.orientation == 'landscape') {
        this.orientation = 'portrait';
    }    
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
