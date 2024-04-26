new Vue({
  el: '#app',
  data() {
    return {
      theWheel: {},
      selectedPrize: '',
      wheelSpinning: false,
      options: ''
    };
  },
  
  computed: {
    segments() {
      return this.options.split('\n').map((text, i) => {
        const truncatedText = text.length > 10 ? text.slice(0, 8) + '...' : text;
        const key = i % 2 === 0 ? 'even' : 'odd';
        const style = {
          even: {
            fillStyle: '#FFC72C', 
            textFillStyle: '#bf1f27', 
          },
          odd: {
            fillStyle: '#bf1f27', 
            textFillStyle: '#FFC72C', 
          }
        };

        return {
          ...style[key],
          text: truncatedText,
          strokeStyle: '#ffe677'
        };
      });
    }
  },

  methods: {
    spin() {
      if (this.theWheel) {
        this.theWheel.startAnimation();
        this.wheelSpinning = true;
      }
    },

    showWinnerPrize(e) {
      let audio = new Audio('../assets/victory-sound.mp3');
      audio.volume = 0.1;
      audio.play();
      this.selectedPrize = e.text;
    },

    initializeWheel() {
      this.theWheel = new Winwheel({
        numSegments: this.segments.length,
        strokeStyle: null,
        outerRadius: 190,
        textFontSize: 22,
        segments: this.segments,
        animation: {
          type: 'spinToStop',
          duration: 5,
          spins: 8,
          callbackFinished: this.showWinnerPrize
        },
        canvasId: 'canvas',
      });
    },
  },

  watch: {
    segments: {
      handler() {
        this.initializeWheel();
      },
    }
  },

  mounted() {
    this.initializeWheel();
  }
});
