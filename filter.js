function filter_results(){
    var filters = [];
    $('.filter:visible').each(function(i,e){
        filters.push(e.textContent)
    });
    $(filters).each(function(index,filter){
        $('tbody tr:visible').each(function(i,row){
            if ($(row).attr('data').toLowerCase().indexOf(filter.toLowerCase()) == -1){
                $(row).addClass('hidden');
            }
        });
    })
}

function add_filter(text){
    if(!text){
        return false
    }
    var button = "<button class='btn filter' style='margin:10px'>" + text + "</button>";

    if (!filter_exists(text)){
        $('.filters:visible').append(button);
        filter_results();
    }
    $('.filter').on('click', function(){
        $(this).remove();
        unhide_all_rows();
        filter_results();
    });
}

function unhide_all_rows(){
    $('tbody:visible tr').each(function(i,row){
        $(row).removeClass('hidden')
    });
}

function remove_filters(){
    $('.filter').each(function(i,e){
        $(e).remove();
    });
    $('tbody:visible tr').each(function(i,row){
        $(row).removeClass('hidden')
    });
}

function filter_exists(text){
    var match = false;
    $('.filter').each(function(i,e){
        if (e.textContent === text){
            match = true
        }
    });
    return match;
}
