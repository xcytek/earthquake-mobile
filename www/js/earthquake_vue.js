var apiURL = 'https://www.emsc-csem.org/service/rss/rss.php?typ=emsc&map_epicenter=true';
var url    = 'https://api.rss2json.com/v1/api.json';
$body      = $("body");

/**
 * Actual demo
 */

var app = new Vue({

    el: '#app',

    data: {
        today: moment().format('MMMM Do YYYY, h:mm'),
        moves: 'Actualizar',
        results: null
    },

    created: function () {
        this.fetchData();
    },

    watch: {
    },

    filters: {
        truncate: function (v) {
            var newline = v.indexOf('\n');
            return newline > 0 ? v.slice(0, newline) : v;
        },
        formatDate: function (v) {
            return v.replace(/T|Z/g, ' ');
        }
    },

    methods: {
        fetchData: function () {
            $body.addClass("loading");
            var xhr  = new XMLHttpRequest();
            var self = this;

            xhr.open('GET', url + this.formatParams({
                rss_url : apiURL,
                api_key : 'f5kfxlgdrrt9xu7lrtnonhmqquyqzjvels7nqxic',
                count   : 50
            }));

            xhr.onload = function () {
                response = JSON.parse(xhr.responseText);
                self.results = response.items;
            };

            xhr.send(null);
            setTimeout(function () { $body.removeClass("loading"); }, 1000);
        },
        formatParams: function ( params ) {
            return "?" + Object
                .keys(params)
                .map(function(key){
                    return key+"="+encodeURIComponent(params[key])
                }).join("&")
        }
    }
});