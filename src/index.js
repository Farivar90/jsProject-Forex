import { Chart } from "chart.js/auto";
import Music  from "./music.js";



const backendServerUrl = 'http://localhost:5001';

// const apiKey = process.env.API_KEY;
const apiKey = "5a18964394c03fc2da032a8c";

const chartCanvas = document.getElementById("forexChart").getContext("2d");

async function fetchExchangeRates(baseCurrency) {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
    );
    const data = await response.json();
    return data.conversion_rates;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function renderChart(data, baseCurrency) {
  const currencies = Object.keys(data);
  const rates = Object.values(data);

  const chartData = {
    labels: currencies,
    datasets: [
      {
        label: `Exchange Rates against ${baseCurrency}`,
        data: rates,
        backgroundColor: "yellow",
        borderWidth: 1 / 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const existingChart = chartCanvas.chart;
  console.log(chartCanvas);
  if (existingChart) {
    existingChart.data = chartData;
    existingChart.options = chartOptions;
    existingChart.update();
  } else {
    new Chart(chartCanvas, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }
}

async function updateChart() {
  const baseCurrency = document.getElementById("currency-pair").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  if (startDate >= endDate) {
    console.error("Start date must be before end date.");
    return;
  }

  const data = await fetchExchangeRatesWithTimeframe(
    baseCurrency,
    startDate,
    endDate
  );

  if (data) {
    renderChart(data, baseCurrency);
  } else {
    console.error("Failed to fetch data.");
  }
}

function selectBase() {
  const baseCurrency = document.getElementById("select-base").value;
  updateChartWithBaseCurrency(baseCurrency);
}

async function updateChartWithBaseCurrency(baseCurrency) {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  if (startDate >= endDate) {
    console.error("Start date must be before end date.");
    return;
  }

  const data = await fetchExchangeRatesWithTimeframe(baseCurrency, startDate, endDate);

  if (data) {
    renderChart(data, baseCurrency);
  } else {
    console.error("Failed to fetch data.");
  }
}

// async function fetchExchangeRatesWithTimeframe(
//   baseCurrency,
//   startDate,
//   endDate
// ) {
//   try {
//     const response = await fetch(
//       `https://v6.exchangerate-api.com/v6/${apiKey}/history/${baseCurrency}/${startDate}/${endDate}`
//     );
//     const data = await response.json();
//     return data.rates;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }


async function fetchExchangeRatesWithTimeframe(baseCurrency, startDate, endDate) {
  try {
    // const response = await fetch(`${backendServerUrl}/?url=https://v6.exchangerate-api.com/v6/${apiKey}/history/${baseCurrency}/${startDate}/${endDate}`);
    const response = await fetch(`${backendServerUrl}/?url=https://v6.exchangerate-api.com/v6/${apiKey}/history/USD/2022/12/11`);
    const data = await response.json();
    console.log(data);
    return data.conversion_rates;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function calculateMovingAverage(data, period) {
  const movingAverages = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data
      .slice(i - period + 1, i + 1)
      .reduce((acc, rate) => acc + rate, 0);
    const average = sum / period;
    movingAverages.push(average);
  }
  return movingAverages;
}

// Entry point - fetch data and render the chart
async function startApp() {
  const baseCurrency = "USD";
  const data = await fetchExchangeRates(baseCurrency);

  if (data) {
    renderChart(data, baseCurrency);
  } else {
    console.error("Failed to fetch data.");
  }
  const music = new Music();

  const nextMusicButton = document.getElementById('next-music');
  nextMusicButton.addEventListener('click', () => {
    music.nextMusic();
  });

  const previousMusicButton = document.getElementById('previous-music');
  previousMusicButton.addEventListener('click', () => {
    music.previousMusic();
  });
}

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
// Define an object with language-specific content
const languageContent = {
  en: {
      aboutMeHead: "About Me",
      // aboutMe: "Hello! I'm Farivar Amiri, and I am a developer and financial enthusiast. 
      // I created this project, Forex Data Visualization by F.A Financial CORP, to combine my interests 
      // in finance and web development. 
      // With a background in both fields, I aim to provide an interactive and informative 
      // experience for traders and anyone interested in Forex exchange rates.
      // <br>
      // As a developer, I always strive to build user-friendly and visually appealing web applications. 
      // This project has given me the opportunity to leverage my skills in HTML, CSS, JavaScript,
      //  and data visualization libraries like Chart.js to create an engaging Forex data visualization tool.
      //  I am continually working on enhancing the project and incorporating new features to make it more valuable for users.</p>",
      projectInfoHead: "Project Info",
      // projectInfo: "Project Name: Forex Data Visualization by F.A Financial CORP <br>
      // Version: 1.0 beta (people like this kind of name, they think it will be something big soon :-)) <br>
      // <br>
      // <br>
      // Description: <br>
      // Forex Data Visualization by F.A Financial CORP is a web-based 
      // application that allows users to visualize historical exchange rates for various currency pairs. <br>
      //  The project provides traders and financial enthusiasts with an 
      //  interactive chart to analyze and compare currency trends over specific time frames.
      //   It allows users to select different currency pairs, set start and end dates for analysis, 
      //   and even calculate moving averages for better insights into the market. <br>
      //  <br>
      //  <br>
      // Key Features: <br>
      // <br>
      // Forex Exchange Rate Chart: 
      // The application displays a bar chart with exchange rates of selected currency pairs against a base currency,
      //  providing a clear view of the currency market trends. <br>
      // <br>
      // Date Range Selection:
      //  Users can specify start and end dates to view historical exchange rate data for specific time frames. <br>
      // <br>
      // Moving Average Calculation: 
      // The project includes a feature to calculate moving averages for the selected currency pairs,
      //  aiding users in identifying potential trends and patterns. <br>
      // <br>
      // Music Player:
      //  For a more enjoyable experience, 
      //  the project incorporates a music player that allows users to play and pause background music. <br>
      // <br>
      // Responsive Design: 
      // The application is designed to be responsive,
      //  ensuring a seamless experience on various devices, including desktops, tablets, and mobile phones. <br>
      // <br>
      // Future Enhancements: <br>
      // As the project evolves, 
      // I plan to introduce additional features and improvements to enhance its functionality and user experience.
      //  Some of the future enhancements include: <br>
  
      // Live Forex Data:
      //  Implementing real-time exchange rate data to enable users to analyze the most up-to-date market trends. <br>
      
      // Additional Technical Indicators: 
      // Introducing more technical indicators to aid traders in making informed decisions. <br>
      
      // User Accounts: 
      // Creating user accounts to save preferences and customizations. <br>
      
      // User-Friendly Interface: 
      // Continuously refining the user interface for easier navigation and interaction. <br>
      
      // I hope you find this project helpful and insightful for your Forex analysis needs.
      //  Your feedback and suggestions are always welcome as I work to make this project even better! 
      //  Thank you for visiting "Forex Data Visualization by F.A Financial CORP."",
      fdvFd: "Forex Data Visualization by F.A Financial Department",
      tradingSession: "Forex Trading Sessions",
      welcome: "Welcome Trader",
      startDate: "Start Date:",
      endDate: "End Date:",
      cPair: "Select Currency Pair:",
      updateChart: "Update Chart",
      movingAveragePeriod: "Moving Average Period:",
      updateMovingAverage: "Update Moving Average",
      selectBaseCurrency: "Select Base Currency:",
      fMaC: "For more accurate charts which update every second please go to:"
  },
  fa: {
      aboutMeHead: "درباره ی من",
      // aboutMe: "Hello! I'm Farivar Amiri, and I am a developer and financial enthusiast. 
      // I created this project, Forex Data Visualization by F.A Financial CORP, to combine my interests 
      // in finance and web development. 
      // With a background in both fields, I aim to provide an interactive and informative 
      // experience for traders and anyone interested in Forex exchange rates.
      // <br>
      // As a developer, I always strive to build user-friendly and visually appealing web applications. 
      // This project has given me the opportunity to leverage my skills in HTML, CSS, JavaScript,
      //  and data visualization libraries like Chart.js to create an engaging Forex data visualization tool.
      //  I am continually working on enhancing the project and incorporating new features to make it more valuable for users.</p>",
      projectInfoHead: "اطلاعات پروژه",
      // projectInfo: "Project Name: Forex Data Visualization by F.A Financial CORP <br>
      // Version: 1.0 beta (people like this kind of name, they think it will be something big soon :-)) <br>
      // <br>
      // <br>
      // Description: <br>
      // Forex Data Visualization by F.A Financial CORP is a web-based 
      // application that allows users to visualize historical exchange rates for various currency pairs. <br>
      //  The project provides traders and financial enthusiasts with an 
      //  interactive chart to analyze and compare currency trends over specific time frames.
      //   It allows users to select different currency pairs, set start and end dates for analysis, 
      //   and even calculate moving averages for better insights into the market. <br>
      //  <br>
      //  <br>
      // Key Features: <br>
      // <br>
      // Forex Exchange Rate Chart: 
      // The application displays a bar chart with exchange rates of selected currency pairs against a base currency,
      //  providing a clear view of the currency market trends. <br>
      // <br>
      // Date Range Selection:
      //  Users can specify start and end dates to view historical exchange rate data for specific time frames. <br>
      // <br>
      // Moving Average Calculation: 
      // The project includes a feature to calculate moving averages for the selected currency pairs,
      //  aiding users in identifying potential trends and patterns. <br>
      // <br>
      // Music Player:
      //  For a more enjoyable experience, 
      //  the project incorporates a music player that allows users to play and pause background music. <br>
      // <br>
      // Responsive Design: 
      // The application is designed to be responsive,
      //  ensuring a seamless experience on various devices, including desktops, tablets, and mobile phones. <br>
      // <br>
      // Future Enhancements: <br>
      // As the project evolves, 
      // I plan to introduce additional features and improvements to enhance its functionality and user experience.
      //  Some of the future enhancements include: <br>
  
      // Live Forex Data:
      //  Implementing real-time exchange rate data to enable users to analyze the most up-to-date market trends. <br>
      
      // Additional Technical Indicators: 
      // Introducing more technical indicators to aid traders in making informed decisions. <br>
      
      // User Accounts: 
      // Creating user accounts to save preferences and customizations. <br>
      
      // User-Friendly Interface: 
      // Continuously refining the user interface for easier navigation and interaction. <br>
      
      // I hope you find this project helpful and insightful for your Forex analysis needs.
      //  Your feedback and suggestions are always welcome as I work to make this project even better! 
      //  Thank you for visiting "Forex Data Visualization by F.A Financial CORP."",
      fdvFd: "تصویرسازی داده های فارکس توسط بخش مالی ف.ا",
      tradingSession: "دوره های معاملاتی فارکس",
      welcome: "درود بر شما",
      startDate: "تاریخ شروع:",
      endDate: "تاریخ پایان:",
      cPair: "انتخاب جفت ارز:",
      updateChart: "بروزرسانی نمودار",
      movingAveragePeriod: "دوره ی موینگ اوریج:",
      updateMovingAverage: "بروزرسانی موینگ اوریج",
      selectBaseCurrency: "انتخاب ارز پایه:",
      fMaC: "برای دسترسی به چارت های دقیق تر که هر ثانیه تغببر میکنند به آدرس زیر بروید:"
  }
};


let currentLanguage = 'en';

function updateLanguageContent() {
  const lang = currentLanguage;
  const content = languageContent[lang];

  
  document.getElementById('about-me-head').textContent = content.aboutMeHead;
  document.getElementById('project-info-head').textContent = content.projectInfoHead;
  document.getElementById('fdv-fd').textContent = content.fdvFd;
  document.getElementById('welcome').textContent = content.welcome;
  document.getElementById('trading-session').textContent = content.tradingSession;
  document.getElementById('start-d').textContent = content.startDate;
  document.getElementById('end-d').textContent = content.endDate;
  document.getElementById('c-pair').textContent = content.cPair;
  document.getElementById('update-ch').textContent = content.updateChart;
  document.getElementById('m-a-p').textContent = content.movingAveragePeriod;
  document.getElementById('u-m-a').textContent = content.updateMovingAverage;
  document.getElementById('s-b').textContent = content.selectBaseCurrency;
  document.getElementById('fmac').textContent = content.fMaC;
}





// Function to toggle the language between English and another language (e.g., French)
function toggleLanguage() {
  // Change the current language between 'en' and 'fr' (you can add more languages as needed)
  currentLanguage = currentLanguage === 'en' ? 'fa' : 'en';

  // Update the language-specific content on the page
  updateLanguageContent();
}

// Add event listener to the language button
const languageToggle = document.getElementById('language-toggle');
languageToggle.addEventListener('click', toggleLanguage);


// Call the startApp function when the page loads
window.selectBase = selectBase;
window.calculateMovingAverage = calculateMovingAverage;
window.updateChart = updateChart;
window.onload = startApp;