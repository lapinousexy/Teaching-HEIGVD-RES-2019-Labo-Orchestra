var dgram = require('dgram');
var protocol = require('./musician-protocol');

var instrumentArray = [["piano","ti-ta-ti"],["trumpet","pouet"],["flute","trulu"],["violin","gzi-gzi"],["drum","bum-boum"]];
var instrumentMap = new Map(instrumentArray);
var socketUDP = dgram.createSocket('udp4');

// This was inspired by Thermometer example
function Musician(instrument){
    this.instrument = instrument;

    Musician.prototype.playInstrument = function(){
        var udpPayload = this.instrument.sound;
    
        soundMessage = new Buffer(udpPayload);
        socketUDP.send(soundMessage,0,soundMessage.length, protocol.PORT, protocol.GROUP_IP, function() {
        });
    };
    
    setInterval(this.playInstrument.bind(this), protocol.INTERVAL);
}

function Instrument(type){
    this.instrument = type;
    this.sound = instrumentMap.get(type);
}

// TODO : Connect to TCP server to receive JSON Instrument
var instru = new Instrument("piano");
var musi = new Musician(instru);