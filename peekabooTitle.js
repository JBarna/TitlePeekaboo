var peekaboo = function(options){
    
    function peekabooInstance(){
        
        var originalTitle = {text: document.title, delay: 2000}; //makeshift because our helper hasn't been defined yet
        var visibilityState = true;
        var startTime; 
        
        //default options
        var options = {
            titles: new Array(),
            defaultDelay: 2000,
            initialDelay: 2000,
            includeOriginal : false,
            welcomeBack: null,
            goodBye: null,
            prefix: "",
            timeout: 60,
            mode: "random",
            loopMax: 0
        };
        
        //helper function... this is so we can pass using function.prototype.apply
        var makeTitle = function(text, delay){
            function title(text, delay){
                this.text = text;
                this.delay = delay;
            };
            return new title(text, delay);
        };
        
        
        var setTitle = function(title, callback){
            document.title = title == originalTitle ? title.text : options.prefix + title.text;
            setTimeout(callback, title.delay || options.defaultDelay);
        };
        
        //public methods
        this.titles = function(){ return options.titles; };
        
        this.addTitles = function(newTitle, delay){
            for (var i = 0; i < arguments.length; i++){
                 if (typeof arguments[i] === 'string'){
                     if (typeof arguments[i + 1] === "number")
                         options.titles.push(makeTitle(arguments[i], arguments[i + 1]));
                     else
                         options.titles.push(makeTitle(arguments[i]));
                 }
             }
        };
        
        this.clear = function(){
            options.titles = new Array();
        };
        
        this.stop = function(){
            onFocusHandler();
        };
        
        this.start = function(){ 
            onBlurHandler();
        };
        
        this._includeOriginal = function(state, delay){
            if (state){
                originalTitle.delay = delay;
                if (!options.includeOriginal) //only add to our titles if not previously added
                    options.titles.push(originalTitle);
            } else{
                var originalIndex = titles.indexOf(originalTitle);
                if (originalIndex > -1)
                    options.titles.splice(originalIndex, 1);
            }
            
            options.includeOriginal = state;
        };
        
        
        //set the global variable peekaboo to have our public functions of this once instance
        for (publicFun in this){
            if (!publicFun.startsWith('_'))
                peekaboo[publicFun] = this[publicFun];
        }
        
             
        //private functions
        this._setOptions = function(newOptions){
            newOptions = newOptions || {};
            
            //fill in the options variables with newOptions and default options
            for (option in newOptions)
                this._setOption(option, newOptions[option]);
        };
        
        this._setOption = function(newOptionName, state){
            
            //filter specific results if they need additional maintenences
            if (newOptionName === "titles"){
                this.clear();
                this.addTitles.apply(null, state);
            } else if (newOptionName === "includeOriginal")
                typeof state === "string" ? this._includeOriginal(state) : this._includeOriginal.apply(null, state);
            else if (newOptionName === "welcomeBack" || newOptionName === "goodBye")
                options[newOptionName] = typeof state === "string" ? makeTitle(state) : makeTitle.apply(null, state);
            else if (options.hasOwnProperty(newOptionName))
                options[newOptionName] = state;
            else
                console.warn("Unknown option name %s", newOptionName);
        };
                 
        //listener functions
        var onBlurHandler = function(){
            
            visibilityState = false;
            startTime = Date.now()/1000;
            var innerCount = 0; 
            var outerCount = 0;
            
            var changeTitles = function(){
                if (options.titles.length > 0 && !visibilityState){
                    
                    //check the timeout
                    if (options.timeout && Date.now()/1000 - startTime > options.timeout){
                        if (options.goodBye)
                            setTitle(options.goodBye, function(){ setTitle(originalTitle); });
                        else
                            setTitle(originalTitle);
                    } else {
                        
                        
                        if (options.mode === "random"){
                            setTitle(options.titles[Math.floor(Math.random() * options.titles.length)], changeTitles);

                        } else if (options.mode === "ordered"){

                            if (options.loopMax){
                                if (outerCount < options.loopMax)
                                    setTitle(options.titles[innerCount], changeTitles);
                                else{
                                    if (options.goodBye)
                                        setTitle(options.goodBye, function(){ setTitle(originalTitle); });
                                    else
                                        setTitle(originalTitle);
                                }
                                    

                            } else 
                                setTitle(options.titles[innerCount], changeTitles);


                            innerCount = ++innerCount % options.titles.length;
                            if (innerCount === 0) outerCount++;
                            
                            
                        }
                    }
                }           
            };
            
            if (options.initialDelay)
                setTimeout(changeTitles, options.initialDelay);
            else
                changeTitles();
        };
        
        var onFocusHandler = function(){
            
            //this fixes the first time the page is loaded
            if (!visibilityState){
                if (options.welcomeBack)
                    setTitle(options.welcomeBack, function(){ setTitle(originalTitle); });
                else
                    setTitle(originalTitle);
            }

            visibilityState = true;
        };

            
        //add our handlers to the focus and blur event listeners
        if(window.addEventListener) {
             window.addEventListener('focus', onFocusHandler);
             window.addEventListener('blur', onBlurHandler);
         }
         /* Detect if the browser supports `attachEvent`
           Only Internet Explorer browsers support that. */
         else if(window.attachEvent) {
             window.attachEvent('onfocus', onFocusHandler);
             window.attachEvent('onblur', onBlurHandler);
         }
         /* If neither event handler function exists, then overwrite 
         the built-in event handers. With this technique any previous event
         handlers are lost. */
         else {
             window.onfocus = onFocusHandler;
             window.onblur = onBlurHandler;
         }
    };
    
    //create peekaboo if we haven't already (singleton)
    if (!peekaboo.instance)
        peekaboo.instance = new peekabooInstance();
    
    //options
    //if person is only setting one option...
    if (typeof options === 'string')
        peekaboo.instance._setOption(options, Array.prototype.slice.call(arguments, 1));
    else if (typeof options === "object")
        peekaboo.instance._setOptions(options);

};