Template.stats.helpers({
    statsLast8: function() {
        return getStatistics({limit: 8, label: "8 päeva"})
    },
    statsLastMonth: function() {
        var aMonthAgo = moment().subtract(1, 'month').toDate()
        return getStatistics({fromDate: aMonthAgo, label: "Kuu"})
    },
    statsLastYear: function() {
        var aYearAgo = moment().subtract(1, 'year').toDate()
        return getStatistics({fromDate: aYearAgo, label: "Aasta"})
    },
});

var getStatistics = function(options) {
    var find = {}
    var settings = {}
    if (options.fromDate) {
        find['measurementsTakenDatetime'] = {$gte: options.fromDate}
    }
    if (options.limit) {
        settings['limit'] = options.limit
    }

    settings['sort'] = {measurementsTakenDatetime: 1}

    var products = ProductsCollection.find(find, settings).fetch()
    var data = []
    var groups = []

    _.each(products, function(product){
        if (!product.measurementsTakenDatetime)
            return false
        var dataPoint = {}
        _.each(product.measurements, function(m, key){
            dataPoint[m.label] = m.result - m.resistance
        })
        dataPoint['x'] = moment(product.measurementsTakenDatetime).format("HH:mm D.MM.YY")
        data.push(dataPoint)
    })

    var keys = []
    _.each(Settings.measurements, function(value, key){
        keys.push(value)
    })

    var chart = {
        tooltip: {
            show: !options.hideTooltips,
            format: {
            },
        },
        subchart: {
            show: options.minimap
        },
        size: {
            height: $(window).height() / 3.2,
        },
        data: {
            json: data,
            keys: {
                value: keys
            },
            type: 'bar',
            // groups: [groups], // enable this to stack bars
        },
        legend: {
            position: 'right'
        },
        axis: {
            y: {
                label: {
                    text: options.label,
                    position: 'outer-middle'
                }
            },
        },
    }

    if (!options.hideDates) {
        chart.data.keys.x = 'x'
        chart.axis.x = {
            type: 'category',
            tick: {
                fit: false,
                centered: true,
                culling: true,
            }
        }
    }

    return chart
}
