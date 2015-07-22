Template.stats.helpers({
    statsLast8: function() {
        return getStatistics({limit: 8, showDates: false})
    },
    statsLastMonth: function() {
        return getStatistics({fromDate: moment().subtract(1, 'month').toDate()})
    },
    statsLastYear: function() {
        return getStatistics({fromDate: moment().subtract(1, 'year').toDate()})
    },
});

var getStatistics = function(options) {
    options.showDates = options.showDates !== false ? true : false
    var find = {}
    var limit = {}
    if (options.fromDate) {
        find['measurementsTakenDatetime'] = {$gte: options.fromDate}
    }
    if (options.limit) {
        limit['limit'] = options.limit
    }

    var products = ProductsCollection.find(find, limit).fetch()

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
            data: {
                json: data,
                type: 'bar',
                // groups: [groups], // enable this to stack bars
            },
        }
    }

    return chart
}
