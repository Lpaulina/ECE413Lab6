function findRegisters(){
    $.ajax({
        url:'/lab/status',
        method: 'GET'
    })
    .done(function (data, textStatus, jqXHR){
        $('#rxData').html(JSON.stringify(data, null, 2));
    })
    .fail(function (data, textStatus, errorThrown){
        $('#rxData').html(JSON.stringify(data, null, 2));
    })
}

function registerZip(){
    const zipData = {
        zip: $('#zipInput').val(),           
        airQuality: $('#airQualityInput').val()
    };
    $.ajax({
        url: '/lab/register',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(zipData)
    })
    .done(function (data, textStatus, jqXHR){
        $('#rxData').html(JSON.stringify(data, null, 2));
    })
    .fail(function (data, textStatus, errorThrown){
        $('#rxData').html(JSON.stringify(data, null, 2));
    })
}
