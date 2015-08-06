$(document).ready(function(){
    
    var alertShown = false;
    
    //init peekaboo
    peekaboo({
        titles: ["Are you leaving?", "Don't leave...", 2500, "Checkout the project!", 10000],
        mode: "ordered",
        timeout: 120,
        welcomeBack: ["Thx bby", 500],
        initialDelay: 1000
    });
    
    $('.btn').click(function(){
        peekaboo.clear();
        
        var id = $(this).attr('id');
        
        if (id === "code-1"){
            peekaboo({
                titles: ["Where are you going?", 
                        "Don't leave!", 2500,
                        "Have fun w/o me :(", 4000],
                defaultDelay: 3500,
                initialDelay: 1000
            });
        } else if (id === "code-2"){
            peekaboo({
                titles: "New Message!",
                mode: "ordered",
                defaultDelay: 7500,
                includeOriginal: true,
                initialDelay: 1000
            });
            
            
        } else if (id === "code-3"){
            peekaboo('initialDelay', 1000);
            peekaboo.addTitles("Video is paused", "Want to keep watching?", 2000);
            
        }
        
        if (!alertShown)
            bootbox.alert("To see it work, go ahead and switch tabs!");
        
        alertShown = true;
    });
    
});