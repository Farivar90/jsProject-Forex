import * as topojson from "topojson";
import * as d3 from "d3";
import Music  from "./scripts/music";
import { updateLanguageContent, toggleLanguage } from "./scripts/language"

const backendServerUrl = 'http://localhost:5001';
let width = 1200;
let height = 800;
let svg = d3.select("body")
    .append("svg")
    .attr("width", width) 
    .attr("height", height) 
    .append("g");

let projection = d3.geoMercator()
    .scale(150) 
    .translate([width / 2, height / 2]);

let path = d3.geoPath().projection(projection);
let color = d3.scaleQuantize().range(d3.schemeCategory10);

const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

let countryToCurrency = {
  'United States of America': 'USD',
  'Australia': 'AUD',
  'Bulgaria': 'BGN',
  'Canada': 'CAD',
  'Switzerland': 'CHF',
  'China': 'CNY',
  'Egypt': 'EGP',
  'Eurozone': 'EUR',
  'United Kingdom': 'GBP',
  'Iran': 'IRR',
  'Trinidad and Tobago': 'TTD', 
  'S. Sudan': 'SSP', 
  'Eritrea': 'ERN',
  'Japan': 'JPY',
  'Paraguay': 'PYG',
  'Yemen': 'YER',
  'Saudi Arabia': 'SAR',
  'Antarctica': 'N/A', // Antarctica is not a country and does not have a standard currency
  'N. Cyprus': 'TRY', // Northern Cyprus uses Turkish Lira
  'Cyprus': 'EUR',
  'Morocco': 'MAD',
  'Libya': 'LYD',
  'Ethiopia': 'ETB',
  'Djibouti': 'DJF',
  'Somaliland': 'SLS', // Somaliland uses Somaliland shilling, not officially recognized
  'Uganda': 'UGX',
  'Rwanda': 'RWF',
  'Bosnia and Herz.': 'BAM',
  'Macedonia': 'MKD',
  'Serbia': 'RSD',
  'Montenegro': 'EUR',
  'Kosovo': 'EUR',
  'Trinidad and Tobago': 'TTD',
  'S. Sudan': 'SSP',
  "Hungary": "HUF",
  "Moldova": "MDL",
  "Romania": "RON",
  "Lithuania": "EUR",
  "Latvia": "EUR",
  "Estonia": "EUR",
  "Germany": "EUR",
  "Greece": "EUR",
  "Turkey": "TRY",
  "Albania": "ALL",
  "Croatia": "HRK",
  "Luxembourg": "EUR",
  "Belgium": "EUR",
  "Netherlands": "EUR",
  "Portugal": "EUR",
  "Spain": "EUR",
  "Ireland": "EUR",
  "New Caledonia": "XPF",
  "Solomon Is.": "SBD",
  "New Zealand": "NZD",
  "Sri Lanka": "LKR",
  "Taiwan": "TWD",
  "Italy": "EUR",
  "Denmark": "DKK",
  "Iceland": "ISK",
  "Azerbaijan": "AZN",
  "Georgia": "GEL",
  "Philippines": "PHP",
  "Malaysia": "MYR",
  "Brunei": "BND",
  "Slovenia": "EUR",
  "Finland": "EUR",
  "Norway": "NOK",
  "Sweden": "SEK",
  "Russia": "RUB",
  "Poland": "PLN",
  "Czech Rep.": "CZK",
  "Switzerland": "CHF",
  "France": "EUR",
  "Austria": "EUR",
  "UK": "GBP",
  "Cyprus": "EUR",
  "Malta": "EUR",
  "Bosnia and Herz.": "BAM",
  "Serbia": "RSD",
  "Montenegro": "EUR",
  "Kosovo": "EUR",
  "Trinidad and Tob.": "TTD",
  "Ecuador": "USD",
  "Peru": "PEN",
  "Colombia": "COP",
  "Venezuela": "VES",
  "Guyana": "GYD",
  "Brazil": "BRL",
  "Suriname": "SRD",
  "Bolivia": "BOB",
  "Paraguay": "PYG",
  "Chile": "CLP",
  "Argentina": "ARS",
  "Uruguay": "UYU",
  "Falkland Is.": "FKP",
  'Jordan': 'JOD',
  'United Arab Emirates': 'AED',
  'Qatar': 'QAR',
  'Kuwait': 'KWD',
  'Iraq': 'IQD',
  'Oman': 'OMR',
  'Vanuatu': 'VUV',
  'Cambodia': 'KHR',
  'Thailand': 'THB',
  'Laos': 'LAK',
  'Myanmar': 'MMK',
  'Vietnam': 'VND',
  'North Korea': 'KPW',
  'South Korea': 'KRW',
  'Mongolia': 'MNT',
  'India': 'INR',
  'Bangladesh': 'BDT',
  'Bhutan': 'BTN',
  'Nepal': 'NPR',
  'Pakistan': 'PKR',
  'Afghanistan': 'AFN',
  'Tajikistan': 'TJS',
  'Kyrgyzstan': 'KGS',
  'Turkmenistan': 'TMT',
  'Syria': 'SYP',
  'Armenia': 'AMD',
  'Sweden': 'SEK',
  'Belarus': 'BYN',
  'Ukraine': 'UAH',
  'Poland': 'PLN',
  'Austria': 'AUD',
  'Benin': 'XOF', // West African CFA franc
  'Niger': 'XOF', // West African CFA franc
  'Nigeria': 'NGN', // Nigerian Naira
  'Cameroon': 'XAF', // Central African CFA franc
  'Togo': 'XOF', // West African CFA franc
  'Ghana': 'GHS', // Ghanaian Cedi
  'Côte d\'Ivoire': 'XOF', // West African CFA franc
  'Guinea': 'GNF', // Guinean Franc
  'Guinea-Bissau': 'XOF', // West African CFA franc
  'Liberia': 'LRD', // Liberian Dollar
  'Sierra Leone': 'SLL', // Sierra Leonean Leone
  'Burkina Faso': 'XOF', // West African CFA franc
  'Central African Rep.': 'XAF', // Central African CFA franc
  'Congo': 'XAF', // Central African CFA franc
  'Gabon': 'XAF', // Central African CFA franc
  'Eq. Guinea': 'XAF', // Central African CFA franc
  'Zambia': 'ZMW', // Zambian Kwacha
  'Malawi': 'MWK', // Malawian Kwacha
  'Mozambique': 'MZN', // Mozambican Metical
  'eSwatini': 'SZL', // Swazi Lilangeni
  'Angola': 'AOA', // Angolan Kwanza
  'Burundi': 'BIF', // Burundian Franc
  'Israel': 'ILS', // Israeli New Shekel
  'Lebanon': 'LBP', // Lebanese Pound
  'Madagascar': 'MGA', // Malagasy Ariary
  'Palestine': 'ILS', // Israeli New Shekel
  'Gambia': 'GMD', // Gambian Dalasi
  'Tunisia': 'TND', // Tunisian Dinar
  'Algeria': 'DZD', // Algerian Dinar
  'Slovakia': 'EUR', // Euro
  'Trinidad and Tobago': 'TTD',
  'S. Sudan': 'SSP',
  'Greenland': 'DKK',
  'Fr. S. Antarctic Lands': null, // no official currency, research station uses various currencies
  'Timor-Leste': 'USD',
  'South Africa': 'ZAR',
  'Lesotho': 'LSL',
  'Mexico': 'MXN',
  'Panama': 'PAB',
  'Costa Rica': 'CRC',
  'Nicaragua': 'NIO',
  'Honduras': 'HNL',
  'El Salvador': 'USD',
  'Guatemala': 'GTQ',
  'Belize': 'BZD',
  'Puerto Rico': 'USD',
  'Jamaica': 'JMD',
  'Cuba': 'CUP',
  'Zimbabwe': 'ZWL',
  'Botswana': 'BWP',
  'Namibia': 'NAD',
  'Senegal': 'XOF',
  'Mali': 'XOF',
  'Mauritania': 'MRU',
  'Fiji': 'FJD', // Fijian dollar
  'Tanzania': 'TZS', // Tanzanian shilling
  'W. Sahara': 'MAD', // Moroccan Dirham
  'Kazakhstan': 'KZT', // Kazakhstani tenge
  'Uzbekistan': 'UZS', // Uzbekistani soʻm
  'Papua New Guinea': 'PGK', // Papua New Guinean kina
  'Indonesia': 'IDR', // Indonesian rupiah
  'Dem. Rep. Congo': 'CDF', // Congolese franc
  'Somalia': 'SOS', // Somali shilling
  'Kenya': 'KES', // Kenyan shilling
  'Sudan': 'SDG', // Sudanese pound
  'Chad': 'XAF', // Central African CFA franc
  'Haiti': 'HTG', // Haitian gourde
  'Dominican Rep.': 'DOP', // Dominican peso
  'Bahamas': 'BSD', // Bahamian dollar
  'Czechia': 'CZK', // Czech korun
};

d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then(function(world) {
    var countries = topojson.feature(world, world.objects.countries).features;

    fetch(`${backendServerUrl}/?url=https://v6.exchangerate-api.com/v6/5a18964394c03fc2da032a8c/latest/USD`)
        .then(response => response.json())
        .then(data => {
            var rates = data.conversion_rates;
            color.domain(d3.extent(Object.values(rates)));  // Set the color domain based on rates

            countries.forEach(country => {
                let currencyCode = countryToCurrency[country.properties.name];
                if (currencyCode) {
                    country.rate = rates[currencyCode];
                } else {
                    console.warn(`No currency mapping found for country: ${country.properties.name}`);
                }
            });

            // Draw world map
            svg.selectAll(".country")
                .data(countries)
                .enter().append("path")
                .attr("class", "country")
                .attr("d", path)
                .attr("fill", function(d) { 
                    return d.rate ? color(d.rate) : 'gray';  // Use the rate to color the country
                })
                .on("mouseover", function (event, d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    tooltip.html(`${d.properties.name}: ${d.rate || "No data"}`)
                        .style("left", (event.pageX) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function (d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        })
        .catch(error => console.log('Error:', error));
});


document.getElementById('submit-btn').addEventListener('click', function() {
  let currency = document.getElementById('currency-select').value;
  let date = document.getElementById('date-input').value;

  // Convert date to required format: 'YEAR/MONTH/DAY'
  let formattedDate = date ? new Date(date).toISOString().split('T')[0].replace(/-/g, '/') : '';

  updateVisualization(currency, formattedDate);
});

updateVisualization('USD', '');


function updateVisualization(baseCurrency, date) {
  let apiUrl = `${backendServerUrl}/?url=https://v6.exchangerate-api.com/v6/5a18964394c03fc2da032a8c/${date ? 'history' : 'latest'}/${baseCurrency}${date ? '/' + date : ''}`;

  d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then(function(world) {
    var countries = topojson.feature(world, world.objects.countries).features;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          var rates = data.conversion_rates;

          let color = d3.scaleOrdinal()
                  .domain(countries.map(country => country.properties.name))
                  .range(d3.schemeCategory10);
          countries.forEach(country => {
              let currencyCode = countryToCurrency[country.properties.name];
              if (currencyCode) {
                  country.rate = rates[currencyCode];
              } else {
                  console.warn(`No currency mapping found for country: ${country.properties.name}`);
              }
          });

          // Update world map
          svg.selectAll(".country")
              .data(countries)
              .attr("fill", function(d) { 
                  return d.rate ? color(d.rate) : 'gray';  // Use the rate to color the country
              });
      })
      .catch(error => console.log('Error:', error));
  });
}




// Create a color scale function
function colorScale(percentChange) {
  let r, g, b = 0;
  if (percentChange < 0) {
    r = 255;
    g = Math.round(255 * (1+percentChange));
    b = Math.round(255 * (1+percentChange));
  } else {
    g = 255;
    r = Math.round(255 * (1 - percentChange));
    b = Math.round(255 * (1 - percentChange));
  }

  return "rgb(" + r + "," + g + "," + b + ")";
}


// Function to calculate percent change

function calculatePercentChange(current, previous) {
  return ((current - previous) / previous) * 100;
}




// Modify fetchExchangeRates to include baseCurrency
async function fetchExchangeRates(baseCurrency, date) {
  let formattedDate = date ? new Date(date).toISOString().split('T')[0].replace(/-/g, '/') : '';
  let url = `${backendServerUrl}/?url=https://v6.exchangerate-api.com/v6/5a18964394c03fc2da032a8c/history/${baseCurrency}${formattedDate ? '/' + formattedDate : ''}`;
  let response = await fetch(url);
  let data = await response.json();
  
  return data.conversion_rates;
}

// Modify updateMap to include baseCurrency
async function updateMap(baseCurrency, baseDate) {
  let currentRates = await fetchExchangeRates(baseCurrency, baseDate);
  let previousRates = await fetchExchangeRates(baseCurrency, new Date(baseDate.getTime() - 24 * 60 * 60 * 1000)); // day before

  d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then(function(world) {
    var countries = topojson.feature(world, world.objects.countries).features;

    countries.forEach(country => {
        let currencyCode = countryToCurrency[country.properties.name];
        if (currencyCode && currentRates[currencyCode] && previousRates[currencyCode]) {
            let percentChange = calculatePercentChange(currentRates[currencyCode], previousRates[currencyCode]);
            country.percentChange = percentChange;
        } else {
            console.warn(`No currency mapping or no rate data found for country: ${country.properties.name}`);
        }
    });

    // Create a tooltip
    var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#ffffff")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .text("a simple tooltip");

    // Update world map
    svg.selectAll(".country")
        .data(countries)
        .attr("fill", function(d) { 
            return d.percentChange ? colorScale(d.percentChange) : 'gray';
        })
        .on("mouseover", function(event, d) {
            tooltip.text(`${d.properties.name}: ${d.percentChange ? d.percentChange.toFixed(2) + '%' : 'N/A'}`);
            return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(event) {
            return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
        })
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
  });
}


document.getElementById('change-p').addEventListener('click', function() {
  let currencyB = document.getElementById('currency-base').value || 'USD';
  let baseDateValue = document.getElementById('date-picker').value;
  let baseDate = baseDateValue ? new Date(baseDateValue) : new Date();
  updateMap(currencyB, baseDate);
});



  // Music
  const music = new Music();

  const nextMusicButton = document.getElementById('next-music');
  nextMusicButton.addEventListener('click', () => {
    music.nextMusic();
  });

  const previousMusicButton = document.getElementById('previous-music');
  previousMusicButton.addEventListener('click', () => {
    music.previousMusic();
  });



  //modal
function showAboutModal() {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.style.display = 'block';
}

function hideAboutModal() {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.style.display = 'none';
}

const aboutButton = document.getElementById('about-button');
aboutButton.addEventListener('click', showAboutModal);

const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', hideAboutModal);

function showSessionModal() {
  const sessionModalContainer = document.getElementById('session-modal-container');
  sessionModalContainer.style.display = 'block';
}

function hideSessionModal() {
  const sessionModalContainer = document.getElementById('session-modal-container');
  sessionModalContainer.style.display = 'none';
}

const aboutSessionImage = document.getElementById('about-session');
aboutSessionImage.addEventListener('click', showSessionModal);

const sessionCloseButton = document.getElementById('session-close-button');
sessionCloseButton.addEventListener('click', hideSessionModal);






//language
updateLanguageContent();
// Add event listener to the language button
const languageToggle = document.getElementById('language-toggle');
languageToggle.addEventListener('click', toggleLanguage);

