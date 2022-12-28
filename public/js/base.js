
getById = (URL) => {
    responseData = null;
    $.ajax({
        url: URL,
        async: false,
        success: function (response) {
            responseData = response;
        },
        fail: function(){
            console.log('fail');
        }
    });
    return responseData;
}