'use strict';
const calculateNextState = require('./src/calculateNextState');
const Hapi = require('hapi');
const server = Hapi.server({
    port: 8000,
    host: '0.0.0.0'
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
        method: 'GET',
        path: '/',
        handler: function () {
            return "hello from your mother";
        }
    });

    server.route({
        method: ['PUT', 'POST'],
        path: '/calculate',
        handler: function (request, h) {
            let val = request.payload.input;
            let allowed = "*/=+-";
            // input check
            if (isNaN(val) && allowed.indexOf(val) == -1) {
                h.json({display: "error"});
                return;
            }
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