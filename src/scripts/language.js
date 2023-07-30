const languageContent = {
  en: {
      aboutMeHead: "About Me",
      // aboutMe: "Hello!
      projectInfoHead: "Project Info",
      // projectInfo: "Project Name
      fdvFd: "Forex Data Visualization by F.A Financial Department",
      tradingSession: "Forex Trading Sessions",
      welcome: "Welcome Trader",
      startDate: "Start Date:",
      endDate: "End Date:",
      cPair: "Select Currency Pair:",
      updateChart: "Update",
      movingAveragePeriod: "Moving Average Period:",
      updateMovingAverage: "Update Moving Average",
      selectBaseCurrency: "Select Base Currency:",
      fMaC: "For more accurate charts which update every second please go to:",
      refer: "Here, you can choose base currency and a date for historical data.The Base currency is USD and if you don't choose a date it will be today's data.",
      percentageNote: "Here, you can choose base currency and a date for historical data and you van see the change of the value by percentage.",
      changeP: "Show Percentage"
  },
  fa: {
      aboutMeHead: "درباره ی من",
      // aboutMe: "Hello!
      projectInfoHead: "اطلاعات پروژه",
      // projectInfo: "Project Name
      fdvFd: "تصویرسازی داده های فارکس توسط بخش مالی ف.ا",
      tradingSession: "دوره های معاملاتی فارکس",
      welcome: "درود بر شما",
      updateChart: "بروزرسانی ",
      selectBaseCurrency: "انتخاب ارز پایه:",
      fMaC: "برای دسترسی به چارت های دقیق تر که هر ثانیه تغییر میکنند به آدرس زیر بروید:",
      refer: "در اینجا، می‌توانید ارز پایه و تاریخ را برای داده‌های تاریخی انتخاب کنید. ارز پایه USD است و اگر تاریخی را انتخاب نکنید، داده‌های امروز خواهد بود.",
      percentageNote: "در اینجا، می توانید ارز پایه و تاریخ را برای داده های تاریخی انتخاب کنید و تغییر مقدار را بر حسب درصد مشاهده کنید.",
      changeP: "نمایش درصد"
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
  document.getElementById('percentage-note').textContent = content.percentageNote;
  document.getElementById('change-p').textContent = content.changeP;
  // document.getElementById('c-pair').textContent = content.cPair;
  document.getElementById('submit-btn').textContent = content.updateChart;
  // document.getElementById('m-a-p').textContent = content.movingAveragePeriod;
  // document.getElementById('u-m-a').textContent = content.updateMovingAverage;
  document.getElementById('refer').textContent = content.refer;
  document.getElementById('fmac').textContent = content.fMaC;
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'fa' : 'en';
  updateLanguageContent();
}

export { updateLanguageContent, toggleLanguage };