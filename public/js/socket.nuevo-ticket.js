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


$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        //FUNCION DE RECIBIR NUEVO TICKET
        label.text(siguienteTicket);

    });

});