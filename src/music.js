class Music {
    constructor() {
      this.currentSongIndex = 0;
      this.songs = [
        new Audio('./src/songs/mix.mp3'),
        new Audio('./src/songs/mix1.mp3'),
        new Audio('./src/songs/mix2.mp3'),
        new Audio('./src/songs/mix3.mp3'),
        new Audio('./src/songs/mix4.mp3'),
        new Audio('./src/songs/mix5.mp3'),
        new Audio('./src/songs/mix6.mp3')
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
  }
  
  export default Music;