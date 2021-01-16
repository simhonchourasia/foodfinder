
const request = require('request');
const fetch = require('node-fetch');

// const options = {
//   method: 'POST',
//   url: 'https://yelpapiserg-osipchukv1.p.rapidapi.com/getBusinesses',
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'x-rapidapi-key': '3e1b2561demshd0398fd2d749e71p1b2dd3jsnea2c6415e0ff',
//     'x-rapidapi-host': 'YelpAPIserg-osipchukV1.p.rapidapi.com',
//     useQueryString: true
//   },
//   form: {
//     term: 'restaurants',
//     accessToken: 'R-v4bb0uqTia9h_S5cC5-v4cy3JTcqPaEcFoZ26WjmheQiOsh0Brc-QT0kiMfX_nc-PePBM4ZiPpdyVrrcSdwmrty0y3D94hn2N92b0mPx3OeOI__ZMjl1bjVnkCYHYx',
//     radius: '10000',
//     location: 'Toronto',
//     limit: '20'
//   }
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);
//   console.log("Hello")
// 	console.log(body);
// });

async function test() {

const response = await fetch('https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972', 
{method: 'GET', headers: { Authorization: "Bearer R-v4bb0uqTia9h_S5cC5-v4cy3JTcqPaEcFoZ26WjmheQiOsh0Brc-QT0kiMfX_nc-PePBM4ZiPpdyVrrcSdwmrty0y3D94hn2N92b0mPx3OeOI__ZMjl1bjVnkCYHYx"}});
const json = await response.json();

const restaurants = JSON.stringify(json);
const business = json.businesses;
console.log(business[1].transactions[0]);


}
test();