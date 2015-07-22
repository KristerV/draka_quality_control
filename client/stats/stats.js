Template.stats.helpers({
    statsLast8: function() {
        return getStatistics({limit: 8})
    },
    statsLastMonth: function() {
        return getStatistics({fromDate: moment().subtract(1, 'month').toDate()})
    },
    statsLastYear: function() {
        return getStatistics({fromDate: moment().subtract(1, 'year').toDate()})
    },
});

var getStatistics = function(options) {

    var products = ProductsCollection.find(
        {measurementsTakenDatetime: {$gte: options.fromDate}},
        {limit: options.limit}
    ).fetch()

    var data = {x: []}
    var groups = []

    _.each(products, function(product){
        if (!product.measurementsTakenDatetime)
            return false
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

    var chart = {
        data: {
            x: 'x',
            json: data,
            type: 'bar',
            groups: [groups],
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%d.%m.%Y'
                }
            }
        }
    }

    return chart
}
