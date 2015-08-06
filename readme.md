# Title Peekaboo
---
##### [Title Peekaboo](http://jbarna.github.io/TitlePeekaboo/) lets you grab the fading attention of users by playing a game of peek-a-boo through a webpage's title. 

## Why?

***People suck at paying attention on the Internet***. In fact, this year the human race broke a new record. We now have a [smaller attention span than a goldfish](http://time.com/3858309/attention-spans-goldfish/) (gasp!)

### What are we suppose to do?
**Get their attention back!** When a user leaves your webpage the only content they see is your website title. With Title Peekaboo, you can cleverly bring a user's attention back to your site.

### Quick Links
* [Example](#example)
* [Get Started](#get-started)
* [Default Options](#default-options)
* [Options explained in detail](#options-explained)
* [Methods](#methods)
* [License](#license)

### Example
See a demonstration and example of TitlePeekaboo at [http://jbarna.github.io/TitlePeekaboo/](http://jbarna.github.io/TitlePeekaboo/)

### Get Started
Simply include TitlePeekaboo.js in your HTML and then initalize it:
```html
<script src="./TitlePeekaboo.js"></script>
<script>
    peekaboo({
        titles: ["Are you leaving me?", "Hey!", 500, "We miss you..."],
        welcomeBack: "Welcome back!"
    });
</script>
```

### Default Options
##### Listed below are all the [options](#options-explained) with their default values
```javascript
peekaboo({
    titles: [],
    mode: "random",
    initialDelay: 5000, 
    defaultDelay: 5000,
    timeout: 60,
    prefix: "",
    welcomeBack: null,
    goodBye: null,
    includeOriginal: false,
    loopMax: 0
});
```
# Options Explained
There are *two* ways to set options in `peekaboo`. 
**a)** If you want to change more than one setting, send a JSON object 
*Example*:`peekaboo({timeout: 50, prefix: "Peek!"});` 
**b)** If you only want to change one setting, the first argument is a `string` denoting the option, followed by the arguments necessary for that option. 
*Example:* `peekaboo('titles', 'First title', 500, 'Second title', 'third title');` 

* **`titles`** - A list of titles to display when the page isn't visible. If a title is followed by a number, that number defines how long in milliseconds the title will be shown. 
* **`mode`** - A string, either `"random"` or `"ordered"` that defines how the titles are iterated.
* **`initialDelay`** - A time in milliseconds which denotes how long to wait before changing the original title. This timer is started once a user switches focus away from your webpage.
* **`defaultDelay`** - A time in milliseconds which is the default time a string will be displayed as the title before another string is shown. To add **individual delays**, add a number argument after a title. *Example*: `peekaboo.addTitles("This will be shown for 500ms", 500, "This title has defaultDelay");`
* **`timeout`** - A time in seconds afterwhich the webpage title changes back to the original title. If the `timeout` is a false-y value, `peekaboo` will continue to display titles until a user refocuses on your webpage.
* **`prefix`** - A string indicating a prefix to put infront of all titles (except the original title).
* **`welcomeBack`** - A string indicating a title to display when a user focues back on your webpage. If followed by a number, it will denote how to long to display the welcomeBack title. *Example:* `peekaboo('welcomeBack', "Nice to see you again!, 2000);`
* **`goodBye`** - A string indicating a title to display when either **a)** The timeout occurs **b)** The titles have ran `loopMax` amount of times. After the `goodBye` has been shown, the title changes back to the original title. If followed by a number, it will denote how long to display the `goodBye` title.
* **`includeOriginal`** - A boolean that denotes whether or not the original title will be in the mix of titles to show when a user loses focus of your webpage. If followed by a number, it will denote how long to display the title for. 
* **`loopMax`** - Only applicable when `mode` is set to `"ordered"`. `loopMax` is the maximum number of times the list of titles will be iterated through. If the max is reached before the timeout, the `goodBye` title will be displayed. If `loopMax` is set to a false-y value, `peekaboo` will continue to display the titles until the timeout occurs.  

# Methods
Methods are only availible after `peekaboo` has been initialized with `peekaboo([options])`;
* **addTitles** -  A list of titles to add to the initial list. *Example:* `peekaboo.addTitles("First title", "Second Title", 1000);`
* **clearTitles** - Remove all previously added titles.
* **reset** - Remove all previously added options and stop `peekaboo`.
* **start** - Simulates a user's focus leaving the page.
* **stop** - Simulates a user's focus returning to the page.

# License
The MIT License (MIT)

Copyright (c) 2015 Joel Barna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

