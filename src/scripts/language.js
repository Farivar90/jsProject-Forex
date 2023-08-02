const languageContent = {
  en: {
      aboutMeHead: "About Me",
      aboutMe: "Hello! I'm Farivar Amiri, and I am a developer and financial enthusiast. I created this project, Forex Data Visualization by F.A Financial CORP, to combine my interests in finance and web development. With a background in both fields, I aim to provide an interactive and informative experience for traders and anyone interested in Forex exchange rates. <br> As a developer, I always strive to build user-friendly and visually appealing web applications. This project has given me the opportunity to leverage my skills in HTML, CSS, JavaScript, and data visualization libraries like Chart.js to create an engaging Forex data visualization tool. I am continually working on enhancing the project and incorporating new features to make it more valuable for users.</p>",
      projectInfoHead: "Project Info",
      // projectInfo: "
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
      percentageNote: "Here, you can choose base currency and a date for historical data and you can see the change of the value by percentage.",
      changeP: "Show Percentage",
      liveN: "Live News",
      page1: "Language <br> You can choose language with this button located at top left, first button (Farsi or English) <br> Second button is to show my github page and 3rd is for linkedin. Last one is to show some information about me and this project. <br>",

  },
  fa: {
      aboutMeHead: "درباره ی من",
      aboutMe: "سلام! من فریور امیری هستم و یک توسعه دهنده و علاقه مند به امور مالی هستم. من این پروژه را با نام تجسم داده های فارکس توسط F.A Financial CORP ایجاد کردم تا علایقم را در امور مالی و توسعه وب ترکیب کنم. با سابقه ای در هر دو زمینه، هدف من ارائه یک تجربه تعاملی و آموزنده برای معامله گران و هر کسی که علاقه مند به نرخ ارز فارکس است. <br> به‌عنوان یک توسعه‌دهنده، همیشه تلاش می‌کنم تا برنامه‌های وب کاربرپسند و از نظر بصری جذاب بسازم. این پروژه به من این فرصت را داد تا از مهارت های خود در HTML، CSS، جاوا اسکریپت و کتابخانه های تجسم داده ها مانند Chart.js استفاده کنم تا ابزاری جذاب برای تجسم داده های فارکس ایجاد کنم. من به طور مداوم در حال کار بر روی بهبود پروژه و ترکیب ویژگی های جدید برای ارزشمندتر کردن آن برای کاربران هستم.",
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
      changeP: "نمایش درصد",
      liveN: "اخبار زنده",
      page1: "زبان <br> شما می توانید با این دکمه که در بالای صفحه و در سمت چپ قرار دارد زبان را تغییر دهید (فارسی یا انگلیسی) <br> دکمه دوم برای نمایش صفحه گیت هاب من و دکمه سوم برای نمایش صفحه لینکدین من است. دکمه آخر برای نمایش بخشی از اطلاعات من و این پروژه است. <br>",
      
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
  document.getElementById('live-n').textContent = content.liveN;
  document.getElementById('submit-btn').textContent = content.updateChart;
  // document.getElementById('about-me').textContent = content.aboutMe;
  // document.getElementById('u-m-a').textContent = content.updateMovingAverage;
  document.getElementById('refer').textContent = content.refer;
  document.getElementById('fmac').textContent = content.fMaC;
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'fa' : 'en';
  updateLanguageContent();
}

export { updateLanguageContent, toggleLanguage };