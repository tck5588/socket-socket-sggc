const fs = require('fs');

//CREACION DE CLASES

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}



class TicketControl {

    //CONSTRUCTOR DE PROPIEDADES
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();

        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            //METODO PERSISTENTE DEL CONTEO
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo()
            console.log('Se ha reinicializado el sistema')
            this.grabarArchivo();

        }

        // console.log(data);
    }

    //METODOS 

    siguienteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }


    atenderTicket(escritorio) {

        //Validacion de tickets existetes
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }


    reiniciarConteo() {

        this.ultimo == 0;
        this.tickets = [];

    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsoDataString = JSON.stringify(jsonData);

        //Grabado de nuevo archivo
        fs.writeFileSync('./server/data/data.json', jsoDataString);

        // console.log('Se ha reinicializado el sistema');
    }



}

module.exports = {
    TicketControl
}