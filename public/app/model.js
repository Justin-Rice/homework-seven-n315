var MODEL = (function(){
    var _changePage = function(pageName){
        $.get(`pages/${pageName}/${pageName}.html`, function(data){
            //console.log(data)
            $("#app").html(data);
        });
    }
    return {
        changePage : _changePage,
    }

})();