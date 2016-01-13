Meteor.methods({
    generateFakeProducts:function(){
        var Mome = moment()
        for (var i = 0; i < 100; i++) {
            var date = Mome.toDate()
            var mapId = ProductMapCollection.findOne({L1PRUUN: {$exists: 1}})._id
            var data = {
                mapId: mapId,
                productCode: parseInt(Math.random() * 100000),
                productDescription: "DESCRIPTOPN",
                cooldownTime: 1,
                batch: "BATCH",
                orderNumber: 123,
                quantity: 123,
                createdAt: date,
                measurements: [
                    {
                        label: 'measurement1',
                        resistance: 0.3,
                        result: rand(0, 0.3),
                    },
                    {
                        label: 'measurement2',
                        resistance: 0.4,
                        result: rand(0, 0.3),
                    },
                    {
                        label: 'measurement3',
                        resistance: 0.3,
                        result: rand(0, 0.3),
                    },
                    {
                        label: 'measurement4',
                        resistance: 0.2,
                        result: rand(0, 0.3),
                    },
                ],
                measurementsTakenDatetime: date,
            }
            ProductsCollection.insert(data)
            Mome.subtract(randInt(0, 4), 'days').subtract(randInt(0, 12), 'hours')
        }
    }
});

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function rand(min, max) {
    return Math.random() * (max - min) + min;
}
