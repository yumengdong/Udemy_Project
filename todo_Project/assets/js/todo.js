// // check off clicked items
// $("li").click(function(){
//     // check if it is gray
//     if($(this).css("color") === "rgb(128, 128, 128)"){
//         $(this).css({
//             color: "black",
//             textDecoration: "none"
//         })
//     }
//     else{
//         $(this).css({
//             color:"gray",
//             textDecoration: "line-through"
//         });
//     }
// });

$("ul").on('click','li',function(){
    $(this).toggleClass("completed")
});

// click on delete button
$("ul").on('click','span',function(event){

    $(this).parent().fadeOut(400, function(){
        $(this).remove();
    });
    
    event.stopPropagation();
});

//add new todo
$("input[type='text']").keypress(function(event){
    if(event.which === 13){ 
        //grabbing input value
        var todoText = $(this).val();
        //clear up the input
        $(this).val("");
        $('ul').append('<li><span><i class="fas fa-trash-alt"></i></span> ' + todoText + '</li>');
    }
})

$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
})