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
    
    var editors = [];
    editors.push(ace.edit("editor-1"));
    editors.push(ace.edit("editor-2"));
    editors.push(ace.edit('editor-3'));
    
    for (editor of editors){
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");
    }
    
    $('.btn').click(function(){
        peekaboo.reset();
        
        var id = $(this).attr('id').split('-')[1] - 1;
        
        try{
            eval(editors[id].getValue());
            if (!alertShown)
            bootbox.alert("To see it work, go ahead and switch tabs!");
        
        alertShown = true;
        } catch(e){
            console.log(e);
        }
        
    });
    
});