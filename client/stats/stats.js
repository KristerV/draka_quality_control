Template.stats.helpers({
    statsLast8: function() {
        return getStatistics({
            limit: 30,
            label: "30 viimast",
            minimap:true,
            legend: false
        })
    },
    statsLastMonth: function() {
        var aMonthAgo = moment().subtract(1, 'month').toDate()
        return getStatistics({
            fromDate: aMonthAgo,
            label: "Kuu"
        })
    },
    statsLastYear: function() {
        var aYearAgo = moment().subtract(1, 'year').toDate()
        return getStatistics({
            fromDate: aYearAgo,
            label: "Aasta",
            minimap:true,
            legend: false,
            summarize: 'month',
        })
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
    var lastProduct

    _.each(products, function(product){
        if (!product.measurementsTakenDatetime)
            return false
        var dataPoint = {}
        _.each(product.measurements, function(m, key){
            dataPoint[m.label] = m.result - m.resistance
        })
        var x = moment(product.measurementsTakenDatetime).format("HH:mm D.MM.YY")

        var monthLast = lastProduct ? moment(lastProduct.measurementsTakenDatetime).month() : null
        var monthThis = moment(product.measurementsTakenDatetime).month()

        if (options.summarize === 'month') {
            if (monthLast === monthThis) {
                _.each(data[data.length-1], function(value, key) {
                    if (key === 'x') return
                    data[data.length-1][key] = (value + dataPoint[key]) / 2
                })
            } else {
                dataPoint['x'] = x
                data.push(dataPoint)
            }
            lastProduct = product
        } else {
            x += " " + product.productDescription // Add description to tooltip title
            dataPoint['x'] = x
            data.push(dataPoint)
        }
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
            height: $(window).height() / 2.1,
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
            hide: !options.legend,
            position: 'right'
        },
        axis: {
            y: {
                label: {
                    text: options.label,
                    position: 'outer-middle'
                },
                tick: {
                    format: function (d) { return d.toFixed(4); }
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
