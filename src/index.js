import { Chart } from "chart.js/auto";
import Music  from "./music.js";


// const apiKey = process.env.API_KEY;
const apiKey = "f41a980b1e5d6ab7d3d45fe4";

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

async function fetchExchangeRatesWithTimeframe(
  baseCurrency,
  startDate,
  endDate
) {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/history/${baseCurrency}/${startDate}/${endDate}`
    );
    const data = await response.json();
    return data.rates;
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



// Call the startApp function when the page loads
window.selectBase = selectBase;
window.calculateMovingAverage = calculateMovingAverage;
window.updateChart = updateChart;
window.onload = startApp;