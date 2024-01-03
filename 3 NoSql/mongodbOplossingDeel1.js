// Exercise 1

//add database smartphone
use exercises

db.smartphones.insert({name:'Samsung Galaxy S7', price: 645, system:{os:'Android 6.0', processor:'EQualcomm MSM8996 Snapdragon 820', screensize:5.1, screen: 'Super Amoled', storageCapacity: '32GB', batteryCapacity: '3000 mAh'}, organizer:['Agenda', 'Contact persons', 'Phonebook', 'Tasks', 'Calculator', 'Call list', 'Clock'], properties: ['voice control', 'fingerprint scanner', 'heart rate monitor', 'barometer'], review:[{by:'Alex', stars:4,text:'Super'}, {by:'El pico', stars:5, text:'Very fast'}]})

db.smartphones.insert({name:'Samsung Galaxy A5', price: 320, system:{os:'Android 5.1', processor:'1.6 GHz Octa-Core', screensize:5.2, batteryCapacity: '3000 mAh'}, organizer:['Agenda', 'Contact persons', 'Phonebook', 'Clock'], properties: ['voice control', 'fingerprint scanner'], reviews:[{by:'Stefan', stars:4,text:'Very good'}, {by:'Emiel', starts:4, text:'No problems'}]})

db.smartphones.insert({name:'Apple iPhone SE 64GB', price: 549, system:{os:'iOS 9', processor:'Quad core (4)', screensize:4},organizer: ['Agenda', 'Phonebook', 'Tasks', 'Calculator', 'Call list'], reviews:[{by:'Paul', stars:5, text:'Good quality'}]})
// 1. Give all smartphones with a price between 400 and 700 euro
db.smartphones.find()
db.smartphones.find({price:{$lte:700,$gte:400}})

// 2. Give all smartphones with Android as operating system
db.smartphones.find({'system.os': {$regex:/Android.*/i}})

// 3. Give name, price and reviews of the most expensive smartphone
 db.smartphones.find({},{price:true,name:true,reviews:true}).sort({price:-1}).limit(1)
 
 // 4. Add to the Apple iPhone the field ‘wifi’ with the following values: 802.11b, 802.11g, 802.11n
 db.smartphones.updateOne({name:'Apple iPhone SE 64GB'}, {'$set':{'wifi': ['802.11b', '802.11g', '802.11n']}})
 db.smartphones.find()
 // 5. Give all smartphones with a phonebook and a clock, but no call list or calculator in the organizer
db.smartphones.find({
  $and: [
    { organizer: 'Clock' },
    { organizer: 'Phonebook' },
    {
      $nor: [
        { organizer: 'Call List' },
        { organizer: 'Calculator' }
      ]
    }
  ]
})

// Exercise 2

// First create the collection photoframes

use exercises

db.photoframes.insert({name:'Proline PL-DPF707 Black', price: 29, properties:{screensize:17.2, compatibility:'JPEG', power:'AC', contrastratio:'400:1'}, memorycard:['SD', 'MMC', 'MS'], reviews: [{by:'Aline', score:4,text:'Very good'}, {by:'Anita', score:4.5, text:'Excellent price/quality'}]})

db.photoframes.insert({name:'PHILIPS SPF 1208/10', price: 69, properties: {screensize:20.32, compatibility:'JPEG', power:'AC', contrastratio:'500:1'}, memorycard:['CF','SD', 'SDHC','MMC','xD','MS'], reviews:[{by:'MS', score:4.5,text:'Easy to use'}, {by:'Ani', score:4.2, text:'Nice design'}]})

db.photoframes.insert({name:'TELEFUNKEN DPF 9323', price: 99, properties: {screensize:20.3, compatibility:'JPEG', power:'AC', contrastratio:'500:1'}, memorycard:['SD','SDHC','MMC','xD','Memory card'],reviews:[{by:'Alex', score:4.6,text:'Super product'}]})


// 1. Give all photoframes with a price lower than 50 euro or with a screensize smaller then 20
db.photoframes.find()
db.photoframes.find({$or:  [{'properties.screensize':{$lt:20},price:{$lt:50}}]})


// 2. Give name, price and screensize of the second cheapest photoframe
db.photoframes.find({},{price:true,name:true,'properties.screensize':true}).sort({price:1}).limit(1).skip(1)


// 3. Give all photoframes with 2 or more reviews

db.photoframes.find({
  reviews: { $exists: true, $not: { $size: 1 } }
})
// 4. Give all photoframes that can handle memorycards of type SDHC, MMC, xD, but can’t handle memorycards of type MS or CF

db.photoframes.find({
  $and: [
    { memorycard: 'SDHC' },
    { memorycard: 'MMC' },
    { memorycard: 'xD' },
    {
      $nor: [
        { memorycard: 'MS' },
        { memorycard: 'CF' }
      ]
    }
  ]
})

// 5. Add the remark ‘Not available’ to all the photoframes with a contrastratio different from 500:1, 600:1 or 700:1
 db.photoframes.updateMany({'properties.contrastratio':{$nin:['500:1', '600:1', '700:1']}}, {'$set':{'remark':'Not available'}})



//Excercise 4
//Give all laptops with a pruce between 500 and 1000 with a hard disk of 850 gb

db.laptops.find({$or:[{$and:[{price:{$gt:500}},{price:{$lt:1000}}]},{'properties.HD':'850GB'}]})

// Change windows 10 to Windows 11

db.laptops.updateMany({'properties.OS':'Windows 10'},{'$set':{'properties.OS':'Windows 11'}})

//Give name,price and operating System of the 2 cheapest Laptop

db.laptops.find({},{name:true,price:true,'properties.OS':true,_id:false}).sort({price:1}).limit(2)

//Give all laptops with at least 1 review with a score between 4 and 4.2
db.laptops.find()
db.laptops.find({'reviews.score':{$gte:4,$lte:4.2}})

//Give all laptops with 2 USB 3_0 ports and that support at least 2 languages including dutch
db.laptops.find({$and:[{'properties.USB.USB3_0':2}, {LanguageOS:'Dutch'}, {$where: "this.LanguageOS.length>=2"}]})

// Excercise 5

//create the collection

db.irons.insert({model: 'GC4516/20', price: 49, brand:'Philips', type: 'Steam iron', description: {color: 'blue/white', waterreservoir:0.300}, extras: ['anti-calc system', 'cord storage space', 'drop stop', 'spray function'], technically:{power: 2400, weight: 1.7, steampressure: 45}, measures: {width: 16, height: 30, depth: 36, cordlength: 200}, reviews:{plus: ['good quality','longevous'], minus: ['cord does not roll up properly', 'cord too short']}})

db.irons.insert({model: 'FV3930', price: 35, brand:'Tefal', type: 'Steam iron', description: {color: 'purple/white', waterreservoir:0.300}, extras: ['anti-calc system', 'drop stop', 'spray function'], technically:{power: 2300, weight: 1.6, steampressure: 40}, measures: {width: 34, height: 18, depth: 15, cordlength: 200}, reviews:{plus: ['good quality', 'advantageous purchase', 'is very easy to iron'], minus: ['water tank quickly empty', 'cord too short']}})

db.irons.insert({model: 'FV3730', price: 30, brand:'Tefal', type: 'Steam iron', description: {color: 'darkblue/white', waterreservoir:0.300}, extras: ['anti-calc system', 'cord storage space', 'drop stop', 'spray function'], technically:{power: 2000, weight: 1.7, steampressure: 30}, measures: {width: 17, height: 15, depth: 32, cordlength: 250}, reviews:{plus: ['good quality', 'advantageous purchase', 'fits perfectly'], minus: ['expensive', 'heavy']}})

db.irons.insert({model: 'GC1433/40', price: 23, brand:'Philips', type: 'Steam iron', description: {color: 'red/white', waterreservoir:0.220}, extras: ['anti-calc system', 'cord storage space', 'drop stop', 'spray function'], technically:{power: 2000, weight: 1.1, steampressure: 25}, measures: {width: 29, height: 15, depth: 13, cordlength: 195}, reviews:{plus: ['good quality'], minus: ['fragile', 'average quality', 'not easy to use']}})

// 1. Give all irons of the brand Philips or Tefal that cost 30 euros or less, that are red, have a power of 2000 or more and have a cord storage space and spray function.
db.irons.find()
db.irons.find({$and:[{brand:{$in:['Philips','Tefal']}},{price:{$lte:30}},{'technically.power':{$gte:2000}},{extras:'spray function'},{extras:'cord storage space'}]})

// 2. Give the model, price and brand of the most expensive iron that is not red, weighing less than 2 kilos, 
// that has at least 2 plus points, a maximum height of 20 centimeters and that does not have cord storage space as extra

db.irons.find({$and:[ {'description.color':{$not: {$regex:/red.*/i}}},{'technically.weight':{$lt:2}}
,{'reviews.plus':{$not:{$size:1}}},{'measures.height':{$lte:20}},{extras:{$ne:'cord storage space'}}]},{model:true,price:true,brand:true})



//drop all collections to try again
db.comedy.drop()
db.smartphones.drop()
db.photoframes.drop()
db.laptops.drop()
db.irons.drop()

