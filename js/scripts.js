$(document).ready(function(){
    
    
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
            swal({
                title: "Sweet!",
                text: "Go ahead and switch tabs to see it work",
                timer: 10000,
                type: "success"
            });
                
        } catch(e){
            swal({
                title: "Oops!",
                "text": ("You had an error: " + e.message),
                "type": "error"
            });
        }
        
    });
    
});