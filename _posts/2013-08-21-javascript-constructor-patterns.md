---
layout: post
title:  "The Constructor Pattern"
date:   2013-08-21 13:39:31
categories: 
snippet: The constructor pattern is used for creating new objects. The two most common ways of creating a new object are cited below...
---

The constructor pattern is used for creating new objects. The two most common ways
of creating a new object are cited below.

{% highlight javascript %}
var myObject = {}

var myObject = new Object()
{% endhighlight %}

The common ways to add properties to these values are seen below.

{% highlight javascript %}
// Set property
myObject.myProperty = "hello world"

// Get property
myObject.myProperty
{% endhighlight %}

The way the above works, is by creating new properties that have several default
keys added to them. For example, the writable and enumerable keys default
to `true`. This is what makes the property able to be reassigned and iterable through
a `for in` loop. Below is an example of creating an object with explicit definitions
using the `Object.defineProperty` method.

{% highlight javascript %}
Object.defineProperty(myObject, 'newProp', {
	value: 'My new Property',
	writable: false,
	configurable: false,
	enumerable: false
})
{% endhighlight %}

After running that code, in the Chrome debugger the object will appear as though the
property had never been added. Yet, when you type `myObject.newProp`, `My new Property` is
returned. You can try to change the property but it will fail. To learn more about this
method and property keys, check out [MDN`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
page about it.

The Prototype
=============

In JavaScript, functions can be considered classes. I hesitate to say that because JavaScript is
a classless language. What this really means, is that functions can be used to imitate class-like
structures common to classical languages. Creating a new class is as simple as the code below.

{% highlight javascript %}
MyClass = function () {}
{% endhighlight %}

myClass is now a new class constructor. You have not created a new class yet, but written the constructor
for your new class. By inspecting myClass, you will notice that it has a prototype property, albeit empty.
The prototype property is the hash that all new instances of myClass will be created with. Below,
we will create a new class and expand the constructor a little bit.

{% highlight javascript %}
Person = function (fname, lname, age) {
	this.fname = fname
	this.lname = lname
	this.age = age
}
{% endhighlight %}

Person now accepts three arguments and the arguments are passed directly into the class and assigned as class
variables. Those variables can be accessed after instantiation through the normal property accessors noted above.
However, if I want to expand the Person class to have a new function of returning the first and last name together,
I can achieve this by expanding the prototype.

{% highlight javascript %}
Person.prototype.displayName = function () {
	return this.fname + ' ' + this.lname
}
{% endhighlight %}

Now, every instantiation of Person will have access to the `displayName` function.

{% highlight javascript %}
var myPerson = new Person('Seth', 'Howard', 24)
console.log(myPerson.displayName())
// Outputs `Seth Howard`
{% endhighlight %}

The other important piece of information is that each instantiation of the class only references a single prototype
object, they are not unique to each class. Therefore, if I expand or contract the prototype after the creation of a
class, that class will only have access to whatever is currently on the Prototype.

{% highlight javascript %}
delete Person.prototype.displayName
myPerson.displayName()
TypeError: Object [object Object] has no method 'displayName'
{% endhighlight %}

General rules of thumb for the prototype include
1 Do not modify the prototype of Objects you do not own






