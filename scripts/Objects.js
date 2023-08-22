//player object, currentPosition trait is for if a more traditional first-to-the-end wins gamemode is added
function Player(traits){
    defaultTraits = {
        'currentPosition' : 0,
        'name' : 'Default Player',
        'bonus' : 0
    };

    //code from Winwheel.js
    for (let key in defaultTraits) {
        if ((traits != null) && (typeof(traits[key]) !== 'undefined')) {
            this[key] = traits[key];
        } else {
            this[key] = defaultTraits[key];
        }
    }

    //code from Winwheel.js
    if (traits != null) {
        for (let key in traits) {
            if (typeof(this[key]) === 'undefined') {
                this[key] = traits[key];
            }
        }
    }
}

//coin object, utilized by setupGame to track where coins are placed on the board and how much they are worth when collected
function Coin(traits){
    defaultTraits = {
        'position' : 0,
        'value' : 0,
        'collected' : false
    };

    //code from Winwheel.js
    for (let key in defaultTraits) {
        if ((traits != null) && (typeof(traits[key]) !== 'undefined')) {
            this[key] = traits[key];
        } else {
            this[key] = defaultTraits[key];
        }
    }

    //code from Winwheel.js
    if (traits != null) {
        for (let key in traits) {
            if (typeof(this[key]) === 'undefined') {
                this[key] = traits[key];
            }
        }
    }
}