---
layout: post
title:  "Animating CSS Transform Rotate with jQuery"
date:   2012-08-08 13:39:31
categories: 
snippet: In a recent project that I’ve been working on, I constantly was needing to rotate divs. My first solution, I created my own animation function that recursively called itself on a given interval, which worked pretty well. However, with this solution, I lost the easing capability that was native to jQuery animations. My one option linear easing wasn’t good enough for me, and I also had to deal with figuring out how often the steps happened and so forth and in the end it worked, but didn’t look nearly as pretty as jQuery has it done. So, instead of reinventing the wheel, I looked through the jQuery animate API and created this solution which now works perfectly...
---

Posted on August 8, 2012 by admin
In a recent project that I’ve been working on, I constantly was needing to rotate divs. My first solution, I created my own animation function that recursively called itself on a given interval, which worked pretty well. However, with this solution, I lost the easing capability that was native to jQuery animations. My one option linear easing wasn’t good enough for me, and I also had to deal with figuring out how often the steps happened and so forth and in the end it worked, but didn’t look nearly as pretty as jQuery has it done. So, instead of reinventing the wheel, I looked through the jQuery animate API and created this solution which now works perfectly.

Here are the scripts that I used to accomplish this.

 


First thing to do, create a dummy element that will temporarily store the information we need. I created the following:
{% highlight html %}
<div id="degree_holder">Dummy Div<div>
{% endhighlight %}
Now, we also need the div we are trying to manipulate.
{% highlight html %}
<div id="rotate">Rotate Me!<div>
{% endhighlight %}
We have our HTML setup, so let’s add the javascript, here are a few steps that explain the process.

We need to know what the start and ending degrees are for the rotation. In this example, we are going to use 90 to start with and end at 180 degrees.
Set our starting degree as the margin-top for our dummy div
Animate the margin-top property to our ending value
On each step, pass a function that will change the rotation value of our rotate div. The ‘now’ parameter that jQuery provides us with is the value at which the animation should be for that given point in time. Change the css transform value for our rotate div to the ‘now’ value.
Check out the example below to see each step of the process.

{% highlight javascript %}
    $('#degree_holder').css('margin-top',90);
    $('#degree_holder').animate({
        'marginTop' : 180
    },{
        duration:750,
        step: function(now, fx) {
            $('#rotate').css('transform','rotate(' + now + 'deg)');
        }
    });
{% endhighlight %}
So, we are theoretically animating the margin-top of our dummy div, but at each step along the way, we are rotating the div to the position of that step. By doing this, we are taking advantage of the easing properties and letting jQuery handle all the work.

Demo:

Dummy Div
Rotate Me!


In reality, you probably don’t want your dummy div to show or alter the margins of the page, so you should give it a display:none.

To make life easier on you, go use the animate/rotate jQuery plugin available by zachstronaut, which will properly apply your .css(‘transform’) with the proper prefix depending on the browser. (My example above DEPENDS on this inclusion, so if you just straight copy and paste without it, it won’t work like expected).

Now that you’ve seen this example, you can see how this could apply to other animations that jQuery doesn’t support. Let me know of any other interesting animations you use this technique for!