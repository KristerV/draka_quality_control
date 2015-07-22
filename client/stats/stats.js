Template.stats.helpers({
    statsLast8: function() {
        return getStatistics({limit: 8, showDates: false, label: "8 päeva"})
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
    options.showDates = options.showDates !== false ? true : false
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
        dataPoint['x'] = product.measurementsTakenDatetime
        data.push(dataPoint)
    })

    var keys = []
    _.each(Settings.measurements, function(value, key){
        keys.push(value)
    })

    if (options.showDates) {
        var chart = {
            tooltip: {
              show: false
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
                    x: 'x',
                    value: keys,
                },
                type: 'bar',
                // groups: [groups], // enable this to stack bars
            },
            legend: {
                position: 'right'
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%d.%m.%Y'
                    }
                },
                y: {
                    label: {
                        text: options.label,
                        position: 'outer-middle'
                    }
                },
            },
        }
    } else {
        var chart = {
            tooltip: {
              show: false
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
    }

    return chart
}
