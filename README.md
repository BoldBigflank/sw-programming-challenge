Startup Weekend Programming Challenge
========================

I created an event list for mobile devices.

## The problem

The current Startup Weekend page is very pretty and featured.  This makes going to the site on my phone very clunky.

## How I solved it

My quick-and-dirty Responsive Bootstrap page lets me check upcoming Startup Weekends at a glance, both from a desktop and phone.  The map is removed when the screen is small.  Also, the list of cities is removed on small screens, going into a drill-down style.  Otherwise, the city is highlighted and the box is added to the top of the screen.

I tried out the MapQuest API to put in SW locations, which work pretty well.  It is also pretty rough, some polish would go a long way.  I prefer to get my name in the running sooner rather than later.

## What's left

* The api calls are gathering the max limit (1000) from the SW API often, which causes slow loading times.  I'd need a skip/limit or count/page parameter to properly gather this information.
* I could add search/filter functionality
* I could style the page and the details block more
* The map doesn't like to play nice with the Responsive Bootstrap module, but for most sizes it's fine.