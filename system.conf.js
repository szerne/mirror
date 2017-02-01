SystemJS.config({
    baseURL: '/dist',
    meta: {
        'clock.js': {
            globals: {
                moment: '../../node_modules/moment/moment.js'
            }
        },
        'mirror.js': {
            globals: {
                jquery: '../../node_modules/jquery/dist/jquery.js'
            }
        },
        'voiceService.js': {
            globals: {
                annyang: '//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js'
            }
        }
    },
});

SystemJS.defaultJSExtensions = true;
SystemJS.import('mirror.js');