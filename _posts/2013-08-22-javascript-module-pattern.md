---
layout: post
title:  "The Module Pattern"
date:   2013-08-21 13:39:31
categories: 
snippet: The idea of this pattern is to create variables that are completely private from the global scope. In the example below, we see that the countervariable cannot be directly accessed. The only way the variable can be manipulated is through the defined methods that the module returns...
---

Module Pattern
==============

The idea of this pattern is to create variables that are completely private
from the global scope. In the example below, we see that the countervariable
cannot be directly accessed. The only way the variable can be manipulated is
through the defined methods that the module returns.

The counters value is preserved through a closure.

{% highlight javascript %}
myModule = (function () {
	
	var counter = 0;

	return {

		incrementCounter: function () {
			counter++;
			console.log('Current counter is ' + counter);
		},

		decrementCounter: function () {
			counter--;
			console.log('Current counter is ' + counter);
		},

		getCounter: function () {
			return counter;
		},

		setCounter: function (newCounter) {
			counter = newCounter;
		}
	}

})();
{% endhighlight %}