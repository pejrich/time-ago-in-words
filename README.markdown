# timeAgoInWords.js #

This is a short simple Javascript plugin that converts dates into words. Like this

Assuming today is October 24, 2015 at 13:30

> October 24, 2015 at 12:30 => "about an hour ago"

> October 24, 2015 at 13:25 => "5 minutes ago"

There's another similar plugin called jQuery timeago (which this plugin heavily uses code from), so why make a new one? Well that plugin wasn't working how I thought it should, and how its documentation said it would. I asked a question on GitHub and got a pretty dickish response from the creator. So I decided to make it work how I think it should. This plugin is also compatable with that one.

## How to use it ##

This plugin will work with or without jQuery and is called like this:

This plugin will convert any date that is parseable by Javascript's ```new Date()``` object or Unix timestamps.

    Sat Oct 24 2015 13:39:01 GMT+0700 (ICT)
    Sat Oct 24 2015 13:39:01 // This is not reccomended. It's best to include a timezone.
    1445668757697
    2015-10-24 13:39:44 +0700
    2015-10-24T06:40:24.037Z

Put it in any element with any class (though the plugin will automatically look for ```.timeago``` if another selector is not given) and place the date in a ```title``` attribute

    <div class="timeago" title="1445668757697">1445668757697</div>"

    <div class="timeago" title="Sat Oct 24 2015 13:39:01">Sat Oct 24 2015 13:39:01</div>"


Call it like this WITH jQuery:

    $(".timeago").timeago();

Call it like this WITHOUT jQuery:

    TimeAgo();

You can also pass in a different selector class or ID if you don't want to use .timeago

    TimeAgo("#different_id");

The plugin will automatically recall itself every minutes so the display will update itself.

I can't promise the plugin will parse everything or work exactly as intended (let me know if it doesn't). But I can promise if you have an issue or a question I won't be a dick.

####DISCLAIMER:####

This plugin will not handle timezone conversions. If you feed it a bare date like this ```"Sat, 24 Oct 2015 06:58:17"``` It will assume it's the broswers local time. To combat this, if you can, add a timezone to your dates or use an ISO date. The following JS Date methods will work ```date.toISOString()```, ```date.toUTCString()```, ```date.toGMTString()```. I'm sure your server side language has a function that can split out a similar format.


[MIT License](http://www.opensource.org/licenses/mit-license.php)


If you find any bugs or you want me to add features, open an Isuue, Pull Request, email, etc.