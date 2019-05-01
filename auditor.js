var dgram = require('dgram');

var protocol = require('./musician-protocol');

var socketMusicUDP = dgram.createSocket('udp4');

function isDuplicateUUID(array, uuid){
    var isPresent = false;
    var returnElement;

    array.forEach(function(element){
        if(element.uuid == uuid){
            isPresent = true;
            returnElement = element;
        }
    });

    if(isPresent){
        return returnElement;
    }else{
        return null;
    }
}

function Auditor(){
    this.musicians = [];
    
    // Source : https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
    var self = this;

    socketMusicUDP.on("message", function(msg){
        var message = JSON.parse(msg.toString());

        element = isDuplicateUUID(self.musicians, message.uuid);

        if(element == null){
            self.musicians.push(message);
        }else{
            self.musicians[self.musicians.indexOf(element)].date = new Date();
        }
    });

    socketMusicUDP.bind(40001);
}

function Musician(uuid, instrument, activeSince){
    this.uuid = uuid;
    this.instrument = instrument;
    this.activeSince = this.activeSince;
}

var test = new Auditor();