'use strict';

var Promise = require('bluebird');

module.exports = function (Model, options) {
    
  Model.observe('before save', function event(ctx, next) { 
    console.log('before save mixin');
    var records = [];
    
    Object.keys(Model.relations).forEach(function (related) {
        console.log(related);
      var record = ctx.instance[related]();
      if (typeof record !== 'undefined') {
        records.push(ctx.instance[related].create(record).then(function (record) {
          ctx.instance.set(related, record);          
        }));
      }
    });
    
    Promise.all(records).then(function () {
      return next();
    });
    
  });
  
};