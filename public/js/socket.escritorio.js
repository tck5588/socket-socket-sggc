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


//OBTENER PARAMETROS DE URL

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);

$('#escritorio').text(escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {


        if (resp === 'No hay tickets') {
            alert(resp);
            $('small').text(resp);
            return;
        }

        $('small').text(resp.numero);

        console.log(resp);
    });


    //EMISION DE EVENTO PARA ACTUALIZAR ESCRITORIO PUBLICO
    socket.emit('ultimos4', null);


});
socket.on('ticketActalEscritorio', function(resp) {
    $('small').text(resp.actual);
})