class Music {
    constructor() {
      this.currentSongIndex = 0;
      this.songs = [
        new Audio('./src/songs/80s 100 Hits - Volume 2 CD 1 TRACK 4 (320).mp3'),
        // new Audio('./src/songs/Blackstreet, Dr. Dre, Queen Pen - No Diggity.mp3'),
        new Audio('./src/songs/Earth, Wind & Fire - Lets Groove.mp3'),
        new Audio('./src/songs/Grover_Washington,_Jr_,_Bill_Withers_Just_the_Two_of_Us_feat_Bill.mp3'),
        new Audio('./src/songs/Huey Lewis And The News - The Power Of Love.mp3'),
        new Audio('./src/songs/Laugh.mp3'),
        new Audio('./src/songs/Ryan Gosling, Emma Stone - City Of Stars.mp3'),
        new Audio('./src/songs/The World We Knew CD 1 TRACK 2 (320).mp3')
      ];
      this.playing = false;
      this.toggle = document.getElementById('music-toggle');
      this.toggle.addEventListener('click', this.toggleMusic.bind(this));
    }
  
    toggleMusic() {
      if (!this.playing) {
        this.songs[this.currentSongIndex].play();
        this.playing = true;
      } else {
        this.songs[this.currentSongIndex].pause();
        this.playing = false;
      }
    }
  
    nextMusic() {
      this.songs[this.currentSongIndex].pause();
      this.playing = false;
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
      this.songs[this.currentSongIndex].play();
      this.playing = true;
    }

    previousMusic() {
      this.songs[this.currentSongIndex].pause();
      this.playing = false;
      this.currentSongIndex =
        (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
      this.songs[this.currentSongIndex].play();
      this.playing = true;
    }
  }
  
  export default Music;