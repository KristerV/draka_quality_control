Template.stats.helpers({
    statsLast8: function() {
        return getStatistics({limit: 8, showDates: false})
    },
    statsLastMonth: function() {
        var aMonthAgo = moment().subtract(1, 'month').toDate()
        return getStatistics({fromDate: aMonthAgo})
    },
    statsLastYear: function() {
        var aYearAgo = moment().subtract(1, 'year').toDate()
        return getStatistics({fromDate: aYearAgo})
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

    settings['sort'] = {measurementsTakenDatetime: -1}

    var products = ProductsCollection.find(find, settings).fetch()

    if (options.showDates)
        var data = {x: []}
    else
        var data = {}
    var groups = []

    _.each(products, function(product){
        if (!product.measurementsTakenDatetime)
            return false
        if (options.showDates)
            data.x.push(product.measurementsTakenDatetime)

        _.each(product.measurements, function(measurement){
            if (!measurement.result)
                return false
            if (!data[measurement.label]) {
                data[measurement.label] = []
                groups.push(measurement.label)
            }
            var stat = measurement.result - measurement.resistance
            data[measurement.label].push(stat)
        })
    })

    if (options.showDates) {
        var chart = {
            subchart: {
                show: options.minimap
            },
            size: {
                height: $(document).height() / 3.2,
            },
            data: {
                x: 'x',
                json: data,
                type: 'bar',
                // groups: [groups], // enable this to stack bars
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%d.%m.%Y'
                    }
                }
            },
        }
    } else {
        var chart = {
            subchart: {
                show: options.minimap
            },
            size: {
                height: $(document).height() / 3.2,
            },
            data: {
                json: data,
                type: 'bar',
                // groups: [groups], // enable this to stack bars
            },
        }
    }

    return chart
}
