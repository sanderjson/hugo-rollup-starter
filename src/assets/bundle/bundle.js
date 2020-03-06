(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var test = function () {
    return console.log("test");
  };

  test();

})));
