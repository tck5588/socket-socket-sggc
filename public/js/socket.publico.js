//COMANDO PARA ESTABLECER LA COMUNICACION

var socket = io();

var label = $('#lblNuevoTicket');

// CONEXION AL SERVIDOR
socket.on('connect', function() {
    console.log('conectado al servidor');
})

//INFORMACION DE DESCONEXION
socket.on('disconnect', function() {
    console.log('Se perdio la conexion con el server');
});


var lbl1 = $('#lblTicket1');
var lbl2 = $('#lblTicket2');
var lbl3 = $('#lblTicket3');
var lbl4 = $('#lblTicket4');

var escr1 = $('#lblEscritorio1');
var escr2 = $('#lblEscritorio2');
var escr3 = $('#lblEscritorio3');
var escr4 = $('#lblEscritorio4');


var lblTicket = [lbl1, lbl2, lbl3, lbl4];
var lblEscritorio = [escr1, escr2, escr3, escr4];

socket.on('ticketActal', function(data) {
    console.log(data.ultimos4);
    actualizaHTML(data.ultimos4)
});


socket.on('ultimos4', function(data) {

    // REPRODUCCION DE AUDIO AL EJECUTARSE EL EVENTO
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(data.ultimos4)


})


function actualizaHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTicket[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorio[i].text('Escriorio ' + ultimos4[i].escritorio);
    }
}