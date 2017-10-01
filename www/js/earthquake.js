$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading"); },
    ajaxStop: function() { $body.removeClass("loading"); }
});

$( document ).ready(function() {

    var requestUrl   = 'https://www.emsc-csem.org/service/rss/rss.php?typ=emsc&map_epicenter=true';
    last_earthquakes = $('div.last-earthquakes');

    init();

    $.ajax({
        url: 'https://api.rss2json.com/v1/api.json',
        method: 'GET',
        dataType: 'jsonp',
        data: {
            rss_url: requestUrl,
            api_key: 'f5kfxlgdrrt9xu7lrtnonhmqquyqzjvels7nqxic',
            count: 50
        }
    }).done(function (data) {

        if(data.status !== 'ok') {
            throw data.message;
        }

        var dataContainer = $('div.data-container');

        $.each(data.items, function(k, row) {
            dataContainer.append(buildList(row));
        });

        last_earthquakes.html(data.items.length + ' movimientos');
    });
});

/**
 * Initialize
 */
function init() {
    var d = new Date();
    var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();

    $('div.today-date').html(strDate);
}

/**
 * Build List
 *
 * @param row
 * @returns {string}
 */
function buildList(row) {

    var html = '<div class="row data">\n' +
        '                <div class="col-xs-2"></div>\n' +
        '                <div class="col-xs-6">' + row.title + '</div>\n' +
        '                <div class="col-xs-4">' + row.pubDate + '</div>\n' +
        '            </div>    ';

    return html;
}