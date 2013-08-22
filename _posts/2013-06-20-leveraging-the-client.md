---
layout: post
title:  "Leveraging the Client"
date:   2013-06-20 13:39:31
categories: 
snippet: It often time occurs that web developers need to display time on a web application. Whether that time be the server time, the current time to the user, the time in New York, etc. For all these functions, how can we come up with a cross browser compatible solution of not only outputting the right time, but also receiving the right time from the user in the format that we want it in. There are several different ways to go about this...
---

It often time occurs that web developers need to display time on a web application. Whether that time be the server time, the current time to the user, the time in New York, etc. For all these functions, how can we come up with a cross browser compatible solution of not only outputting the right time, but also receiving the right time from the user in the format that we want it in. There are several different ways to go about this.

Way #1) Let the Server Handle It

When the data gets output or data received, let the server deal with parsing the time to the correct format, validating it, and ensuring that it is compatible with the system.

Way # 2) Let the Client Handle It

Write some JavaScript to sanitize the input before it ever makes it to the server

Way # 3) Server and Client Side Handling

Throw some validation down on the client, but have the server also check it to make sure that it’s valid.

The proper answer, *ahem*, the answer that I would go with, is clearly # 3. Firstly, a goal of all web developers should be to make robust web apps that work, and are lightweight. No one wants their browser bogged down with a sluggish page or application. Client side browsers are becoming ever more powerful and capable of processing enormous amounts without the browser even flinching. With this new development, many developers are offloading a large portion of logic onto the client, and off from the server. This is why a RESTful concept is becoming increasingly more popular. The client handles the logic, the server simply handles reads and writes, sends the raw data to the client who then parses it and displays it properly. The other idea behind REST is that one server for all of them. That is, one server can handle requests from an iPhone, Android, iOS, Windows Phone, and even Blackberry if we wanted.

Server validation is also important. Any web application needs basic security measures and man in the middle attacks and proxy attacks are out there, so we can’t blindly trust the data that comes from the client. Therefore, basic security needs to be issued on the server. That being said, the client should handle the majority of the logic. There are numerous libraries out there for time, such as datejs or momentjs, and they can parse time into essentially any format you want as well as display it in any format that you can think of. By using these libraries and setting everything to UTC time format, there will never arise issues of time between time zones, countries, continents, etc. The clients read the system time and offset given to them from the browser, and the javascript code can parse it to the correct time zone then display it. Likewise, if the user says he wants a reminder at 10:00 AM his time, the javascript can parse his response, transform it to our server time, store it, then chron jobs running on the server will now when to shoot out that reminder because its set to the standard time that the server is running on.

The reason why we don’t use the server validation as is popular in older java frameworks and even new ones, is that this burdens the server with doing basic validation that every client device can handle itself. Why make the server a) validate the stuff, b) determine that it’s wrong, c) reparse new html d) redirect the browser and send over the new html. That seems like several steps that aren’t needed. The client can validate the stuff, and see an issue that the user can correct before ever even issuing an ajax request or http request, or talking with the java servlet. You see, that’s smart. Every user has their own machine with their own processing chip. If we leverage that processing power, we can dramatically decrease our server needs, and still have a peppy web application.

The key here, is leverage the client. It is powerful.