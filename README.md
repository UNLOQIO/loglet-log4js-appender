# log4js-loglet

Log4js appender for loglet.io 

Getting Started
---------------

#### Account creation:
Go to https://loglet.io, login with UNLOQ and create an application

#### Installation:

    npm install log4js-loglet

#### Usage:

    var log4js = require('log4js');
    var logletAppender = require('log4js-loglet');
    log4js.addAppender(logletAppender({
        key: 'YOUR_APP_KEY',
        secret: 'YOUR_APP_SECRET',
        name: 'optional-server-name',
        namespace: 'optional-namespace'
    }));
    var logger = log4js.getLogger();
    logger.info('Hello world!');
    
#### FAQ
You can find additional info in https://github.com/UNLOQIO/loglet-node-client