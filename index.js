'use strict';
var loglet = require('loglet.io'),
  util = require('util'),
  isConfigured = false,
  streamConfig = {};

var logger = function logletAppender(config) {
  if(typeof config !== 'object' || !config) {
    console.warn('log4js-loglet: config must be an object with "key" and "secret"');
    return;
  }
  isConfigured = true;
  loglet(config, function(err) {
    if(err) {
      console.warn('log4js-loglet: encountered an error.', err);
    }
  });
  if(config.name) streamConfig.name = config.name;
  if(config.namespace) streamConfig.namespace = config.namespace;
  return logger.appender;
};

logger.configure = function(config) {
  if(!isConfigured) {
    logger(config);
  }
  return logger;
};

logger.appender = function logletAppender(item) {
  var payload = {
    level: item.level.levelStr.toLowerCase()
  };
  if(streamConfig.name) payload.name = streamConfig.name;
  if(streamConfig.namespace) {
    payload.namespace = streamConfig.namespace;
  } else if(item.categoryName) {
    payload.namespace = item.categoryName;
  }
  var errors = [], tags = [], datas = [], message = [];
  for(var i=0; i < item.data.length; i++) {
    var l = item.data[i];
    if(l instanceof Error) {
      errors.push(l);
      message.push('[' + l.toString() + ']');
      continue;
    }
    if(typeof l === 'object' && l) {
      // check if we have tags
      if(typeof l.tags !== 'undefined') {
        var t = l.tags;
        delete l.tags;
        if(typeof t === 'string') {
          tags.push(t);
        } else if(t instanceof Array) {
          tags = tags.concat(t);
        }
      }
      datas.push(l);
      continue;
    }
    message.push(l);
  }
  payload.message = util.format.apply(util, message);
  if(errors.length > 0) {
    payload.error = (errors.length === 1 ? errors[0] : errors);
    if(payload.message === '') {
      payload.message = 'Error: ' + errors[0].message;
    }
  }
  if(datas.length > 0) {
    payload.data = (datas.length === 1 ? datas[0] : datas);
    if(payload.message === '') {
      payload.message = 'Data container';
    }
  }
  if(tags.length > 0) {
    payload.tags = [];
    for(var j=0; j < tags.length; j++) {
      if(typeof tags[j] === 'string' || typeof tags[j] === 'number') {
        payload.tags.push(tags[j]);
      }
    }
    if(payload.message === '') {
      payload.message = 'Tag container';
    }
  }
  loglet.send(payload);
};



module.exports = logger;