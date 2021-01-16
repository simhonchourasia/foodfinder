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

    //LOCATION:
    address = '';//Some user input string

    //const location = await fetch()

    main_url = 'https://api.yelp.com/v3/businesses/search?term&latitude=43.6532&longitude=-79.3832';
    url2 = 'https://api.yelp.com/v3/businesses/search?term&radius=10000&location=' + address;
    // const response = await fetch(main_url,
    //     { method: 'GET', headers: { Authorization: "Bearer R-v4bb0uqTia9h_S5cC5-v4cy3JTcqPaEcFoZ26WjmheQiOsh0Brc-QT0kiMfX_nc-PePBM4ZiPpdyVrrcSdwmrty0y3D94hn2N92b0mPx3OeOI__ZMjl1bjVnkCYHYx" } });
    // const json = await response.json();

    const response = await fetch(url2, 
    {method: 'GET', headers: { Authorization: "Bearer R-v4bb0uqTia9h_S5cC5-v4cy3JTcqPaEcFoZ26WjmheQiOsh0Brc-QT0kiMfX_nc-PePBM4ZiPpdyVrrcSdwmrty0y3D94hn2N92b0mPx3OeOI__ZMjl1bjVnkCYHYx"}});
    const json = await response.json();

    const restaurants = JSON.stringify(json);
    const business = json.businesses;
    //console.log(business);

    var restaurant_name = new Array(business.length);
    var is_closed = new Array(business.length);
    var rating = new Array(business.length);
    var address = new Array(business.length);
    var price = new Array(business.length);
    var catagories = new Array(business.length);
    var image_url = new Array(business.length);
    
    //Filtering out useless data
    for (var i = 0; i < business.length; i++) {
        restaurant_name[i] = business[i].name;
        is_closed[i] = business[i].is_closed;
        rating[i] = business[i].rating;
        address[i] = business[i].location.address1;
        price[i] = business[i].price;
        catagories[i] = business[i].catagories;
        image_url[i] = business[i].image_url;
    }

    //Filtering out businesses that dont meet standard
    for (i = 0; i < rating.length; i++) {
        if (rating[i] < 2.5 || is_closed[i] == 'true') {
            restaurant_name.splice(i, 1);
            is_closed.splice(i, 1);
            rating.splice(i, 1);
            address.splice(i, 1);
            price.splice(i, 1);
            catagories.splice(i, 1);
            image_url.splice(i,1);
            i -= 1;
        }
    } 
}
test();