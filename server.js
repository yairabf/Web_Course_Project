'use strict';

const Hapi = require('hapi');
const server = Hapi.server({
    port: 8000,
    host: 'localhost'
});

// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: (request, h) => {
//         request.logger.info('In handler %s', request.path);
//         return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
//     }
// });


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
        handler: (request, h) => {

            return h.file('./public/index.html');
        }
    });

    server.route({
        method: ['PUT', 'POST'],
        path: '/insertNum',
        handler: function (request, h) {
            let x = request.payload.num;
            console.log(x);
            return x;
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


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function calculateNextState(stage, nextInput) {
    if(isNumber(nextInput)){
        stage = stage + nextInput.toString();
    }
    return stage;
}

init();