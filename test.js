"use strict";

var retrieveArguments = require('./index.js'),
  assert = require('assert');

class MyClass {
  method(arg1, arg2) {
  }
  static staticMethod(arg1, arg2) {
  }
}
function namedFunction(name) {}
describe('retrieve-arguments', function() {
  var
    funcNoArgs,
    funcOneArgs,
    funcTwoArgs,
    funcOneLineCallingNoArgs,
    funcOneLineCallingTwoArgs,
    es6funcNoArgs,
    es6funcOneArgs,
    es6funcTwoArgs,
    es6funcOneLineCallingNoArgs,
    es6funcOneLineCallingTwoArgs,
    es6Method,
    es6StaticMethod;

  beforeEach(function() {
    funcNoArgs = function() {};

    funcOneArgs = function(arg1) {};

    funcTwoArgs = function(arg1, arg2, arg3) {};

    funcOneLineCallingNoArgs = function(arg1, arg2) { return funcNoArgs(); };

    funcOneLineCallingTwoArgs = function(arg1, arg2) { return funcTwoArgs(arg1, arg2, 'stuff'); };

    es6funcNoArgs = () => {};

    es6funcOneArgs = (arg1) => {};

    es6funcTwoArgs = (arg1, arg2, arg3) => {};

    es6funcOneLineCallingNoArgs = (arg1, arg2) => { return es6funcNoArgs(); };

    es6funcOneLineCallingTwoArgs = (arg1, arg2) => { return es6funcTwoArgs(arg1, arg2, 'stuff'); };

    es6Method = MyClass.prototype.method;

    es6StaticMethod = MyClass.staticMethod;
  });

  it('should fail if no function given', function() {
    assert.throws(retrieveArguments, Error);
    assert.throws(retrieveArguments.bind(this, {}), Error);
    assert.throws(retrieveArguments.bind(this, 'foo'), Error);
    assert.doesNotThrow(retrieveArguments.bind(this, function() {}), Error);
  });

  it('should return an empty array if the function has no arguments', function() {
    assert.deepEqual(retrieveArguments(funcNoArgs), []);
  });

  it('should return names of a function\'s arguments', function() {
    assert.deepEqual(retrieveArguments(funcOneArgs), ['arg1']);
    assert.deepEqual(retrieveArguments(funcTwoArgs), ['arg1', 'arg2', 'arg3']);
    assert.deepEqual(retrieveArguments(namedFunction), ['name']);
  });

  it('should work with one-line functions that call other functions', function() {
    assert.deepEqual(retrieveArguments(funcOneLineCallingNoArgs), ['arg1', 'arg2']);
    assert.deepEqual(retrieveArguments(funcOneLineCallingTwoArgs), ['arg1', 'arg2']);
  });

  it('should return an empty array if the ES6 function has no arguments', function() {
    assert.deepEqual(retrieveArguments(es6funcNoArgs), []);
  });

  it('should return names of a ES6 function\'s arguments', function() {
    assert.deepEqual(retrieveArguments(es6funcOneArgs), ['arg1']);
    assert.deepEqual(retrieveArguments(es6funcTwoArgs), ['arg1', 'arg2', 'arg3']);
  });

  it('should work with one-line ES6 functions that call other functions', function() {
    assert.deepEqual(retrieveArguments(es6funcOneLineCallingNoArgs), ['arg1', 'arg2']);
    assert.deepEqual(retrieveArguments(es6funcOneLineCallingTwoArgs), ['arg1', 'arg2']);
  });

  it('should work with ES6 methods', function () {
    assert.deepEqual(retrieveArguments(es6Method), ['arg1', 'arg2']);
  });

  it('should work with ES6 static methods', function () {
    assert.deepEqual(retrieveArguments(es6StaticMethod), ['arg1', 'arg2']);
  });
});
