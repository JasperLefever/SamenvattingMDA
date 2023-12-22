use exercises

db.laptops.insert({name:'Acer Aspire F5-573G-57GD', price: 749, properties: {processor:'Intel Core i5', RAM:'8GB', HD:'650GB', OS:'Windows 10', USB:{USB2_0:0, USB3_0:2, USB3_1:1}}, LanguageOS:['Dutch', 'French', 'English'], reviews:[{by:'Aline', score:4,text:'Very well'}, {by:'Me', score:3.5, text:'Compact'}]})


db.laptops.insert({name:'HP Pavilion 17-g101nd', price: 534, properties: {processor:'
Intel Pentium N3700', RAM:'4GB', HD:'1000GB', HDSpeed: 5400, OS:'Windows 10', displayType: 'Shiny', USB:{USB2_0:0, USB3_0:3}}, LanguageOS:['Dutch', 'French', 'English','German'], networkConnections: ['bluetooth','wi-fi','ethernet'], reviews:[{by:'Melanie', score:4.3,text:'Very good'}, {by:'Eric', score:4.5, text:'Nice'}]})


db.laptops.insert({name:'Apple MacBook Pro Retina', price: 1359, properties: {processor:'Intel Core i5', RAM:'8GB', clockSpeed: '2.3 GHz', HD:'850GB', OS:'Mac OS X 10.11', USB:{USB2_0:0, USB3_0:2,  USB3_0:0}}, LanguageOS:['Dutch', 'French'], software: ['iMovie', 'GarageBand','iBooks','Safari','FaceTime'], reviews:[{by:'Tom', score:4.4,text:'Superb'}]})
