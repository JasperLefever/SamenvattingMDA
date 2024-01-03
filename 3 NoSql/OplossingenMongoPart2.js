//Excercise 1

use info
db.cheese.insert({factory:'Belgomilk',name:'Brugge',properties:{taste:'Salty', cheesetype:'hard cheese'}, variants:['Brugge Oud','Brugge Blomme','Brugge Belegen'], comments:[{by:'Aline', score:8.5,text:'Very fine'}, {by:'Thomas', score:7.5, text:'Very tasteful'}]});
db.cheese.insert({factory:'Lindenhof',name:'Affligem',properties:{taste:'Soft', cheesetype:'abbeycheese'}, variants:['Affligem Traditie','Affligem Jong belegen'], comments:[{by:'Albert', score:9,text:'Very good choice'},{by:'Thamara', score:7.5, text:'Positif'}]});
db.cheese.insert({factory:'Belgomilk',name:'Nazareth',properties:{taste:'Soft', cheesetype:'hard cheese'}, variants:['Nazareth Classic','Nazareth Light'], comments:[{by:'Ellen', score:4,text:'Not nice'}, {by:'Kjell', score:7.5, text:'Nice'}, {by:'Kristel', score:6, text:'Delicious'}]});
db.cheese.insert({factory:'Lindenhof',name:'Grimbergen',properties:{taste:'Soft', cheesetype:'abbeycheese'}, variants:['Grimbergen Grand Cru'], comments:[{by:'Katrien', score:6.5,text:'Good choice'}, {by:'Martine', score:7, text:'Very tasteful'}]});

// Specify the number of cheeses per cheesetype in capital letters
db.cheese.aggregate([
    {
        $group: {
            _id: "$properties.cheesetype", 
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            cheesetype: { $toUpper: "$_id" },
            count: 1,
            _id: 0
        }
    }
]);


// Give the number of cheeses per cheese factory with at least 2 variants.
db.cheese.aggregate([
    {
        $match: {
            "variants": { $exists: true }
        }
    },
    {
        $project: {
            factory: "$factory",
            count_variants: { $size: "$variants" }
        }
    },
    {
        $match: {
            count_variants: { $gte: 2 }
        }
    },
    {
        $group: {
            _id: "$factory",
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            factory: "$_id",
            numberOfCheeses: "$count",
            _id: 0
        }
    }
])

// Exercise 2

//Give per share the average closing price, the minimum closing price, the maximum closing price and the
//average number of shares traded per day.

db.cheese.aggregate([
    {
        $group: {
            _id: "$properties.cheesetype", 
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            cheesetype: { $toUpper: "$_id" },
            count: 1,
            _id: 0
        }
    }
]);







use info

db.bel20.insert({name: "KBC", date:ISODate("2013-11-26"), price: {open: 40.51, high: 40.84, low: 40.35, end: 40.71}, number: 2280300});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-25"), price: {open: 40, high: 40.56, low: 39.97, end: 40.28}, number: 829500});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-22"), price: {open: 39.53, high: 39.85, low: 39.32, end: 39.7}, number: 730400});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-21"), price: {open: 39.47, high: 39.68, low: 39.1, end: 39.42}, number: 961900});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-20"), price: {open: 39.7, high: 39.84, low: 39.17, end: 39.49}, number: 1555000});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-19"), price: {open: 39.62, high: 40.05, low: 39.37, end: 39.6}, number: 3791500});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-18"), price: {open: 40.35, high: 40.9, low: 40.2, end: 40.68}, number: 713400});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-15"), price: {open: 40.59, high: 40.67, low: 39.99, end: 40.19}, number: 873900});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-14"), price: {open: 39.9, high: 41, low: 39.24, end: 40.74}, number: 2092600});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-13"), price: {open: 40.03, high: 40.24, low: 39.05, end: 39.33}, number: 999500});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-12"), price: {open: 40.32, high: 40.75, low: 40.1, end: 40.19}, number: 567500});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-11"), price: {open: 39.99, high: 40.54, low: 39.54, end: 40.44}, number: 816800});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-08"), price: {open: 39.4, high: 39.93, low: 38.99, end: 39.9}, number: 971700});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-07"), price: {open: 39.91, high: 40.7, low: 39.5, end: 39.67}, number: 1183700});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-06"), price: {open: 39.17, high: 40, low: 39.17, end: 40}, number: 946000});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-05"), price: {open: 39.69, high: 39.69, low: 38.51, end: 39.1}, number: 999000});
db.bel20.insert({name: "KBC", date:ISODate("2013-11-04"), price: {open: 39.98, high: 40.25, low: 39.4, end: 39.45}, number: 709300});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-26"), price: {open: 33.5, high: 33.51, low: 33.24, end: 33.4}, number: 36600});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-25"), price: {open: 33.45, high: 33.56, low: 33.35, end: 33.5}, number: 17900});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-22"), price: {open: 33.45, high: 33.48, low: 33.22, end: 33.38}, number: 18300});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-21"), price: {open: 33.27, high: 33.54, low: 33.26, end: 33.44}, number: 22400});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-20"), price: {open: 33.39, high: 33.47, low: 33.25, end: 33.4}, number: 24200});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-19"), price: {open: 33.51, high: 33.63, low: 33.25, end: 33.4}, number: 43400});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-18"), price: {open: 33.69, high: 33.73, low: 33.49, end: 33.67}, number: 17700});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-15"), price: {open: 33.58, high: 33.77, low: 33.47, end: 33.58}, number: 17500});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-14"), price: {open: 33.81, high: 33.81, low: 33.6, end: 33.65}, number: 37600});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-13"), price: {open: 33.81, high: 33.88, low: 33.5, end: 33.69}, number: 23600});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-12"), price: {open: 34.08, high: 34.08, low: 33.81, end: 33.9}, number: 26300});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-11"), price: {open: 33.9, high: 34.16, low: 33.85, end: 34.15}, number: 19300});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-08"), price: {open: 33.9, high: 34, low: 33.7, end: 33.83}, number: 20400});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-07"), price: {open: 33.9, high: 34.1, low: 33.71, end: 33.94}, number: 29500});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-06"), price: {open: 33.79, high: 34, low: 33.75, end: 33.94}, number: 24200});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-05"), price: {open: 33.78, high: 33.84, low: 33.64, end: 33.78}, number: 23700});
db.bel20.insert({name: "Elia", date:ISODate("2013-11-04"), price: {open: 33.99, high: 33.99, low: 33.69, end: 33.72}, number: 24000});

db.bel20.aggregate([
{
$group :{
    _id:'$name',
    avgClosingPrice:{$avg:"$price.open"},
    minClosingPrice:{$min:"$price.end"},
    maxClosingPrice:{$max:"$price.end"},
    avgSharedPerDay:{$avg:"$number"}
}
    
}
])

db.bel20.aggregate([
    {
        $project: {
            name: 1,
            endPrice: "$price.end",
            week: { $week: "$date" }
        }
    },
    {
        $group: {
            _id: "$name",
            minPrice: { $min: "$endPrice" },
            weeks: { $push: "$week" }
        }
    },
    {
        $unwind: "$weeks"
    },
    {
        $group: {
            _id: { name: "$_id", minPrice: "$minPrice" },
            weeks: { $addToSet: "$weeks" }
        }
    },
    {
        $project: {
            _id: 0,
            name: "$_id.name",
            minPrice: "$_id.minPrice",
            week: { $first: "$weeks" }
        }
    },
    {
        $sort: { name: 1 }
    }
]);
