var dgram = require('dgram');
var uuid = require('uuid');

var protocol = require('./musician-protocol');

var instrumentArray = [["piano","ti-ta-ti"],["trumpet","pouet"],["flute","trulu"],["violin","gzi-gzi"],["drum","bum-boum"]];
var instrumentMap = new Map(instrumentArray);
var socketUDP = dgram.createSocket('udp4');

// This was inspired by Thermometer example
function Musician(instrument){
    this.uuid = uuid.v4();
    this.instrument = instrument;

    Musician.prototype.playInstrument = function(){
        var udpPayload = this.instrument.sound;
    
        soundMessage = new Buffer(udpPayload);
        socketUDP.send(soundMessage,0,soundMessage.length, protocol.PORT, protocol.GROUP_IP, function() {
            this.date = new Date();
        });
    };
    
    setInterval(this.playInstrument.bind(this), protocol.INTERVAL);
}

function Instrument(type){
    this.instrument = type;
    this.sound = instrumentMap.get(type);
}

var instrumentArg = process.argv[2];

if(instrumentMap.has(instrumentArg)){
    var instru = new Instrument(instrumentArg);
    var musi = new Musician(instru);
}else{
    console.log("Error, instrument doesn't exist");
}