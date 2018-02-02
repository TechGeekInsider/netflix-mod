
//  $("body").append(<h1>'Test'</h1>);
$( document ).ajaxSuccess(function(){
    $(".slider-item").hover(function(){
        console.log("Pandas are evil!");
    })

});