'use strict';

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
            console.log(request.payload._state);
            console.log(request.payload.num);
            let state = JSON.parse(request.payload._state)
            return calculateNextState(state, request.payload.num);
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

function calculateNextState(state, nextInput) {
    if(isNumber(nextInput)){
        state.now_been_calculated = state.now_been_calculated * 10 + parseInt(nextInput);
    }
    else {
        if(state.saved_num != null ){
            calculate(state);
            state.now_been_calculated = null;
            state.operation = nextInput;
        } else {
            state.saved_num = state.now_been_calculated;
            state.now_been_calculated = null;
            state.operation = nextInput;
        }
    }
    return state;
}

function calculate(state){
    let cal = 0;
    if(state.operation === '+'){
        cal = parseInt(state.saved_num) + parseInt(state.now_been_calculated);
    } else if(state.operation === '-'){
        cal = parseInt(state.saved_num) - parseInt(state.now_been_calculated);
    } else if(state.operation === '*'){
        cal = parseInt(state.saved_num) * parseInt(state.now_been_calculated);
    } else if(state.operation === '/'){
        cal = parseInt(state.saved_num) / parseInt(state.now_been_calculated);
    }
    state.saved_num = cal.toString();
}
init();