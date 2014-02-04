


Function.prototype.bind = function(){ 
  var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift(); 
  return function(){ 
    return fn.apply(object, 
      args.concat(Array.prototype.slice.call(arguments))); 
  }; 
};




// Ways we can instantiate functions
function log (message) {
    console.log(message);
}

var log = function (message) {
    console.log(message);
}

window.log = function (message) {
    console.log(message);
}


// Objects - Object Literal
var myObject = {

    name: 'Seth Howard',

    getName: function () {
        return this.name;
    }

}


// Access an object
myObject.name // 'Seth Howard'
myObject['name'] // 'Seth Howard'


// Hoisting

console.log(myVar)
console.log(myVar2)

var myVar2 = "variable"

// Function hoisting
log();
log2();

function log () {
    console.log('foo');
}

var log2 = function () {
    console.log('foo');
}

// You can refer a function to itself by invoking it by name
function log () {
    console.log('Logging!')
    log()
}


// Functions are merely objects
var obj = {}
obj.foo = 'bar'

var func = function () {}
func.foo = 'bar'

obj.foo == func.foo


// Set Timeouts
setTimeout(function () {
    console.log('Timer Firing');
}, 3000);

setInterval(function () {
    console.log('Interval Firing')
}, 2000);


// Best Practice
function render () {
    console.log("Rendering");
    setTimeout(render, 1000)
}

render();



// Context
var bird = {
    name: 'Cardinal',
    chirp: function () {
        console.log('The ' + this.name + ' is chirping.')
    }
}

bird.chirp();

// Context has changed
window.chirp = bird.chirp;
window.chirp();

// Invoke a method in a certain context
window.chirp.call(bird,); // Accepts individual arguments
window.chirp.apply(bird); // Accepts an array of arguments

// Create your own object
function User(first, last) {
    this.name = first + ' ' + last;
}

// Instantiate it
var user = new User('John', 'Smith');

// Arguments - function overloading
function reverse () {
    var array = [];
    for(var i = arguments.length - 1; i >= 0; i--){
        array.push(arguments[i]);
    }
    return array;
}

smallestNumber(5,10,3,124,-10,3)

// Array min method
function reverse () {
    return Array.prototype.reverse.call(arguments);
}

// What is the prototype
function Animal (fname, lname) {
    this.fname = fname;
    this.lname = lname;
}

Animal.prototype = {

    getName: function () {
        return this.fname + ' ' + this.lname;
    }

}

var gecko = new Animal('Loki', 'Padfoot')

gecko.getName()

gecko instanceof Animal
Animal instanceof Object
Animal instanceof Function

Animal.prototype.getName.call(context)



// Closures

var num = 10;

function addNum (myNum) {
    return num + myNum;
}

addNum(10);

// Common use cases
var that = this;

$.ajax ({
    url: '/endpoint',
    success: function (data) {
        that.parseData();
    }
})












