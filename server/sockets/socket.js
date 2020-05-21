const { io } = require('../server');
const { TicketControl } = require('../classes/ticket.control');


//INSTANCIA CLASES
const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();

        console.log(siguiente);
        callback(siguiente);


    });

    //EMISION ESTADO ACUTUAL

    client.emit('ticketActal', {

        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()

    });

    client.on('ultimos4', () => {
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()

        })
    })



    client.on('atenderTicket', (data, callback) => {

        //SI NO SE RECIBE PARAMETRO DE ESCRITOIO EN EL EMIT DEL CLIENTE
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El Escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);



    })



});