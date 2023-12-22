use exercises

db.smartphones.insert({name:'Samsung Galaxy S7', price: 645, system:{os:'Android 6.0', processor:'EQualcomm MSM8996 Snapdragon 820', screensize:5.1, screen: 'Super Amoled', storageCapacity: '32GB', batteryCapacity: '3000 mAh'}, organizer:['Agenda', 'Contact persons', 'Phonebook', 'Tasks', 'Calculator', 'Call list', 'Clock'], properties: ['voice control', 'fingerprint scanner', 'heart rate monitor', 'barometer'], review:[{by:'Alex', stars:4,text:'Super'}, {by:'El pico', stars:5, text:'Very fast'}]})

db.smartphones.insert({name:'Samsung Galaxy A5', price: 320, system:{os:'Android 5.1', processor:'1.6 GHz Octa-Core', screensize:5.2, batteryCapacity: '3000 mAh'}, organizer:['Agenda', 'Contact persons', 'Phonebook', 'Clock'], properties: ['voice control', 'fingerprint scanner'], reviews:[{by:'Stefan', stars:4,text:'Very good'}, {by:'Emiel', starts:4, text:'No problems'}]})

db.smartphones.insert({name:'Apple iPhone SE 64GB', price: 549, system:{os:'iOS 9', processor:'Quad core (4)', screensize:4},organizer: ['Agenda', 'Phonebook', 'Tasks', 'Calculator', 'Call list'], reviews:[{by:'Paul', stars:5, text:'Good quality'}]})