var peekaboo = function(options){
    
    function peekabooInstance(){
        
        var titles = new Array();
        var originalTitle = new title(document.title);
        var visibilityState = true;
        
        //default options
        var options = {
            defaultDelay: 2000,
            initialDelay: 2000,
            includeOriginal : false,
            welcomeBack: []
        };
        
        function title(text, delay){
            this.text = text;
            this.delay = delay;
        };
        
        //public methods
        this.titles = function(newTitles){
            if (newTitles instanceof Array){
                titles = new Array();
                for (newTitle of newTitles){
                    if (newTitle instanceof Array)
                        this.addTitle(newTitle[0], newTitle[1]);
                    else if(typeof newTitle === 'string')
                        this.addTitle(newTitle)
                    else{
                        console.warn("Unknown parameter in peekaboo.titles.");
                        console.warn(newTitle);
                    }

                }
            }
            return titles;
        };
        
        this.addTitle = function(newTitle, delay){
            if (typeof newTitle === 'string')
                titles.push(new title(newTitle, delay));
        };
        
        this.clear = function(){
            titles = new Array();
            onFocusListener();
        };
        
        this.includeOriginal = function(state, delay){
            if (state){
                originalTitle.delay = delay;
                if (!options.includeOriginal) //only add to our titles if not previously added
                    titles.push(originalTitle);
            } else{
                var originalIndex = titles.indexOf(originalTitle);
                if (originalIndex > -1)
                    titles.splice(originalIndex, 1);
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
            if (newOptionName === "titles")
                this.titles(state);
            else if (newOptionName === "includeOriginal")
                this.includeOriginal.apply(null, state);
            else if (options.hasOwnProperty(newOptionName))
                options[newOptionName] = state;
            else
                console.warn("Unknown option name %s", newOptionName);
        };
                 
        //listener functions
        var onBlurListener = function(){
            
            visibilityState = false;
            
            var changeTitles = function(){ 
                if (titles.length === 1){
                    document.title = titles[0].text;
                }
                else if (titles.length > 1){
                    var count = 0; 
                    var nextTitle = function(){ 
                        if (!visibilityState){
                            document.title = titles[count].text;
                            setTimeout(nextTitle, titles[count].delay || options.defaultDelay);
                            count = ++count % titles.length;
                        }
                    };
                    
                    nextTitle();
                }
            };
            
            if (options.initialDelay)
                setTimeout(changeTitles, options.initialDelay);
            else
                changeTitles();
        };
        
        var onFocusListener = function(){
            visibilityState = true;
            
            //welcome back!
            if (options.welcomeBack[0]){
                document.title = options.welcomeBack[0];
                setTimeout(function(){ document.title = originalTitle.text; }, options.welcomeBack[1] || options.defaultDelay);
            }
            document.title = originalTitle.text;
        };

            
        if(window.addEventListener) {
             window.addEventListener('focus', onFocusListener);
             window.addEventListener('blur', onBlurListener);
         }
         /* Detect if the browser supports `attachEvent`
           Only Internet Explorer browsers support that. */
         else if(window.attachEvent) {
             window.attachEvent('onfocus', onFocusListener);
             window.attachEvent('onblur', onBlurListener);
         }
         /* If neither event handler function exists, then overwrite 
         the built-in event handers. With this technique any previous event
         handlers are lost. */
         else {
             window.onfocus = onFocusListener;
             window.onblur = onBlurListener;
         }
    };
    
    if (!peekaboo.instance)
        peekaboo.instance = new peekabooInstance();
    
    //options
    //if person is only setting one option...
    if (typeof options === 'string')
        peekaboo.instance._setOption(options, arguments[1]);
    else if (typeof options === "object")
        peekaboo.instance._setOptions(options);

};