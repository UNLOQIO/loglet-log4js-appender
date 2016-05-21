'use strict';
'use strict';
/**
 * Created by Adrian on 21-May-16.
 */
'use strict';
/**
 * Created by Adrian on 21-May-16.
 */
var log4js = require('log4js'),
  logletAppender = require('../index'); // require('log4js-loglet')

log4js.addAppender(logletAppender({
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
  name: 'my-server-id',
  namespace: 'microservice-app-1'
}));
var logger = log4js.getLogger();

logger.debug("A debug message that will print: %s", 3, {
  withSome: 'additional Data'
});
logger.trace('A new kind of tagging perhaps?', {
  tags: ['stripe', 'payment', 'cash']
});

var err = new Error('Some nasty error.');
err.code = 500;
logger.warn('An error has occurred', err);