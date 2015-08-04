var peekaboo = function(options){
    
    function peekabooInstance(){
        
        var titles = new Array();
        var originalTitle = new title(document.title);
        var visibilityState = true;
        
        var defaultDelay = 2000;
        var includeOriginal = false;
        var initialDelay = 2000;
        
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
                if (!includeOriginal) //only add to our titles if not previously added
                    titles.push(originalTitle);
            } else{
                var originalIndex = titles.indexOf(originalTitle);
                if (originalIndex > -1)
                    titles.splice(originalIndex, 1);
            }
            
            includeOriginal = state;
        };
        
        
        //set the global variable peekaboo to have our public functions of this once instance
        //is there an easier way to do this...? maybe a for loop
        peekaboo.titles = this.titles;
        peekaboo.addTitle = this.addTitle;
        peekaboo.clear = this.clear;
        peekaboo.includeOriginal = this.includeOriginal;
        
             
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
                            setTimeout(nextTitle, titles[count].delay || defaultDelay);
                            count = ++count % titles.length;
                        }
                    };
                    
                    nextTitle();
                }
            };
            
            if (initialDelay)
                setTimeout(changeTitles, initialDelay);
            else
                changeTitles();
        };
        
        var onFocusListener = function(){
            visibilityState = true;
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
    
    //manage options
    if (options){
        if (typeof options.titles != 'undefined') instance.titles(options.titles);
        
        if (typeof instance.includeOriginal !== 'undefined'){
            options.includeOriginal instanceof Array ? instance.includeOriginal.apply(null, options.includeOriginal) : instance.includeOriginal.call(options.includeOriginal);
            instance.includeOriginal(options.includeOriginal); 
        }
    }

};