'use strict';
const calculateNextState = require('./src/calculateNextState');
const Hapi = require('hapi');
const server = Hapi.server({
    port: 8000,
    host: 'localhost'
});


const init = async() =>{
    await server.register(require('inert'));
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: false,
            logEvents: ['response']
        }
    });


    server.route({
        method: ['PUT', 'POST'],
        path: '/calculate',
        handler: function (request, h) {
            console.log(request.payload.calculatorState);
            console.log(request.payload.input);
            return calculateNextState(request.payload.calculatorState, request.payload.input);
        }
    });

// default /js directory
    server.route({
        method: 'GET',
        path: '/js/{params*}',
        handler: {
            directory: {
                path: './public/js',
                listing: false
            }
        }
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();