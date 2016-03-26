Template.ksm.helpers({
    ksmData6: function() {
        return getKSMStatistics({
            line: 6,
            label: "LIIN 6",
        })
    },
    ksmData8: function() {
        return getKSMStatistics({
            line: 8,
            label: "LIIN 8",
        })
    },
    ksmData21: function() {
        return getKSMStatistics({
            line: 21,
            label: "LIIN 21",
        })
    },
    ksmData22: function() {
        return getKSMStatistics({
            line: 22,
            label: "LIIN 22",
        })
    },
    ksmData36: function() {
        return getKSMStatistics({
            line: 36,
            label: "LIIN 36",
        })
    },
    ksmData38: function() {
        return getKSMStatistics({
            line: 38,
            label: "LIIN 38",
        })
    },
});

Template.ksm.events({
    'click button[name="year"]': function(){
        Session.set('KSM-range', 'year')
    },
    'click button[name="month"]': function(){
        Session.set('KSM-range', 'month')
    },
    'click button[name="last20"]': function(){
        Session.set('KSM-range', 'last20')
    },
})


var getKSMStatistics = function(options) {
    var rangeString = Session.get('KSM-range')

    // Fetch data
    var rangeStamp = 0
    var limit = 10000
    if (rangeString === 'year')
        rangeStamp = moment().subtract(1, 'year').unix()
    else if (rangeString === 'month')
        rangeStamp = moment().subtract(1, 'month').unix()
    else if (rangeString === 'last20')
        limit = 20
    var lineName = options.line+".liin"
    var dataIn = KSMCollection.find({info4: lineName, measure_time1970: {$gt: rangeStamp}}, {sort: {'measure_time1970': -1}, limit: limit}).fetch()

    // Organize data
    var organized = []
    var lastDay
    var lastMonth
    dataIn.forEach(function(item, i){
        var hour = moment(item.measure_time1970 * 1000).hour()
        var day = moment(item.measure_time1970 * 1000).date()
        var month = moment(item.measure_time1970 * 1000).month()

        // Summarise data?
        var addToLast
        if (rangeString === 'year' && lastMonth === month) {
            addToLast = true
        } else if (rangeString === 'month' && lastDay === day) {
            addToLast = true
        } else {
            lastDay = day
            lastMonth = month
            addToLast = false
        }

        console.log(item.measure_time);

        // Format datapoint
        var datapoint = {
            measure_time: item.measure_time,
            total: item.wall_extra_percent,
        }

        // Divide day and night shift
        if (7 < hour && hour <= 19)
            datapoint.day = item.wall_extra_percent
        else
            datapoint.night = item.wall_extra_percent

        // Save data
        if (addToLast && organized[organized.length-1]) {
            var lastPoint = organized[organized.length-1]
            organized[organized.length-1] = {
                measure_time: lastPoint.measure_time,
                total: (lastPoint.total + datapoint.total) / 2,
                day: ((lastPoint.day || 0) + (datapoint.day || 0)) / 2,
                night: ((lastPoint.night || 0) + (datapoint.night || 0)) / 2,
            }
        } else {
            organized.push(datapoint)
        }

    })

    // Compose chart
    var chart = {
        size: {
            height: $(window).height() / 3.1,
            width: $(window).width() / 2.1,
        },
        data: {
            json: organized,
            keys: {
                x: 'measure_time',
                value: ['total', 'day', 'night']
            },
            types: {
                total: 'line',
                day: 'bar',
                night: 'bar',
            },
            colors: {
                total: 'black',
                day: 'yellow',
                night: 'darkblue',
            }
            // groups: [groups], // enable this to stack bars
        },
        legend: {
            hide: true,
        },
        axis: {
            x: {
                type: 'category',
                tick: {
                    fit: false,
                    centered: true,
                    culling: true,
                }
            },
            y: {
                tick: {
                    // format: function (d) { return d.toPrecision(7); }
                }
            },
        },
    }

    return chart
}
