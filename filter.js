//npm install csvtojson
//npm install csv-string
const request = require('request');
const fetch = require('node-fetch');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const { stringify } = require('csv-string');
const csvtojson = require('csvtojson')

async function rest_data() {

    //LOCATION:
    address = '5995 Steeles Ave E, Scarborough, ON, CA';//Some user input string
    for (var i = 0; i < address.length; i++) {
        if (address[i] == ' ') {
            address[i] == '+';
        }
    }
    //const location = await fetch()

    def_url = 'https://api.yelp.com/v3/businesses/search?term&latitude=43.6532&longitude=-79.3832';
    url = 'https://api.yelp.com/v3/businesses/search?term&radius=10000&location=' + address;

    const response = await fetch(url,
        { method: 'GET', headers: { Authorization: "Bearer R-v4bb0uqTia9h_S5cC5-v4cy3JTcqPaEcFoZ26WjmheQiOsh0Brc-QT0kiMfX_nc-PePBM4ZiPpdyVrrcSdwmrty0y3D94hn2N92b0mPx3OeOI__ZMjl1bjVnkCYHYx" } });
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
    var rest_urls = new Array(business.length);
    var phone = new Array(business.length);

    //Filtering out useless data
    for (var i = 0; i < business.length; i++) {
        restaurant_name[i] = business[i].name;
        is_closed[i] = business[i].is_closed;
        rating[i] = business[i].rating;
        address[i] = business[i].location.address1;
        price[i] = business[i].price;
        rest_urls[i] = business[i].price;
        //catagories[i] = business[i].catagories;
        image_url[i] = business[i].url;
        phone[i] = business[i].phone;
    }

    //console.log(business[0].catagories);

    //Filtering out businesses that dont meet standard
    for (i = 0; i < rating.length; i++) {
        if (rating[i] < 2.5 || is_closed[i] == 'true') {
            restaurant_name.splice(i, 1); // string
            is_closed.splice(i, 1);// string
            rating.splice(i, 1); // double
            address.splice(i, 1); // string
            price.splice(i, 1); // string
            //catagories.splice(i, 1); // array of strings
            image_url.splice(i, 1); // string
            rest_urls.splice(i, 1);
            phone.splice(i, 1);
            i -= 1;
        }
    }
    //Converting arrays into one CSV array
    var csvContent = 'restaurant name,rating,address,price,image_url\r\n';
    for (i = 0; i < rating.length; i++) {
        var row = restaurant_name[i] + ',' + rating[i].toString() + ',' + address[i] + ',' + price[i] + ',' + image_url[i] + ',' + rest_urls[i] + ',' + phone[i];
        csvContent += row + '\r\n';
    }

    //https://www.npmjs.com/package/csv-string
    const CSV = require('csv-string');
    console.log(csvContent);
    // const parsedCsv = CSV.parse(csvContent);
    // console.log(parsedCsv);
}
rest_data();