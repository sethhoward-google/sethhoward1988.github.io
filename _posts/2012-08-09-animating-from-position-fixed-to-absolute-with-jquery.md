---
layout: post
title:  "Animating from Position Fixed to Absolute with jQuery"
date:   2012-08-09 13:39:31
categories: 
snippet: This was another challenge faced when creating my website. If you go there, you will notice that the navigation column is normally fixed (most noticeable when on the portfolio page), but then on the design page I wanted to use the entire width of the page, but didn’t want my navigation to float on top of the content. So, I had to figure out how to animate it from fixed to absolute smoothly and back again. The following example demonstrates how we can move the element from an absolute position to a fixed position...
---

Animating from Position Fixed to Absolute with jQuery

Another post on jQuery animations!

This was another challenge faced when creating my website. If you go there, you will notice that the navigation column is normally fixed (most noticeable when on the portfolio page), but then on the design page I wanted to use the entire width of the page, but didn’t want my navigation to float on top of the content. So, I had to figure out how to animate it from fixed to absolute smoothly and back again. The following example demonstrates how we can move the element from an absolute position to a fixed position.

Here’s the theory behind what needs to happen.

Store the element that you’re trying to move into a variable
Briefly change the element to visibility:none and to the desired position, in this example, to position:fixed
Grab the position of your now invisible element and store it into a variable
Switch the visibility and position back to it’s original state
Do a normal jQuery animate to where the final end is going to be, using our end position object as our point of reference
When the animation completes, switch the element completely to position:fixed
And thats about it. You most likely will have to do some tinkering with it before it’s perfect and account for various factors such as margins and paddings that might affect where the div ends up when switching from absolute to fixed and vice versa. But, this example will help get you going. Note: the -10 in this example is the margin-top of the body.

{% highlight javascript %}
    //From absolute to fixed
    var el = $('#position');   
    el.css({
        visibility:'hidden',
        position:'fixed'
    })

    // Get the static position
    var end = el.position();
    var top = el.css('top');

    // Turn it back to absolute
    el.css({
        visibility:'visible',
        position:'absolute'
    })

    // Animate to the static position
    el.animate({ 
        top: end.top - 10
    },function(){
        el.css({
            position:'fixed',
            top:top
        }).text('Current Div Position: Fixed')
    });
{% endhighlight %}

For this one, we are going to animate from fixed to an absolute state. The theory is slightly different

Store the element that you’re trying to move into a variable
Grab the elements current absolute position
Switch the element from fixed to absolute and apply the current top. This will change but leave the element in the exact same spot, no visible change is noticeable
Now, animate it back to the beginning or original top
{% highlight javascript %}
    var el = $('#position');  
    // Get the static position
    var beginning = el.position();
    var top = el.css('top');
    
    // Turn it to absolute
    el.css({
        top:beginning.top - 10,
        position:'absolute'
    })
    // Animate to the proper position
    el.animate({
        top: top
    });
{% endhighlight %}
Demo:

Scroll down in the iframe to see the animate button. Notice that when it’s fixed and you scroll, it stays in the fixed position.