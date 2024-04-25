Vue.config.devtools = true
new Vue({
  el: '#app',
  data() {
    return {
        theWheel: {},
        segments: [
          { fillStyle: '#FFC72C', text: '', textFillStyle: '#bf1f27', strokeStyle: '#ffe677' },
          { fillStyle: '#bf1f27', text: '', textFillStyle: '#ffe677', strokeStyle: '#ffe677' },
          { fillStyle: '#FFC72C', text: '', textFillStyle: '#bf1f27', strokeStyle: '#ffe677' },
          { fillStyle: '#bf1f27', text: '', textFillStyle: '#ffe677', strokeStyle: '#ffe677' },
          { fillStyle: '#FFC72C', text: '', textFillStyle: '#bf1f27', strokeStyle: '#ffe677' },
          { fillStyle: '#bf1f27', text: '', textFillStyle: '#ffe677', strokeStyle: '#ffe677' },
        ],
        nuevoPrizeText: '',
        colorIndex: 0,
        premioSeleccionado: '',
        wheelSpinning: false
    };
  },
  methods: {
    agregarPrize() {
      for (let i = 0; i < 6; i++) {
        const text = this.segments[i].text.trim();
        if (text !== '') {
          const color = this.fillStyles[i % this.fillStyles.length];
          this.segments[i].fillStyle = color;
          this.segments[i].textFillStyle = this.textFillStyles[this.colorIndex % this.textFillStyles.length];
          this.segments[i].strokeStyle = this.strokeStyle;
          this.colorIndex++;
        }
      }
      this.actualizarRuleta();
    },
    girar() {
      if (this.theWheel) {
        this.theWheel.startAnimation();
        this.wheelSpinning = true;
      }
    },
    mostrarPremioGanador(indicatedSegment) {
      this.premioSeleccionado = indicatedSegment.text;
      alert("Has ganado: " + indicatedSegment.text);
    },
    actualizarRuleta() {
      this.theWheel = new Winwheel({
        'numSegments': this.segments.length,
        'strokeStyle': null,
        'outerRadius': 212,
        'textFontSize': 22,
        'segments': this.segments,
        'animation': {
          'type': 'spinToStop',
          'duration': 5,
          'spins': 8,
          'callbackFinished': this.mostrarPremioGanador
        },
        'canvasId': 'canvas'  
      });
    },
  },
  watch: {
    segments: {
      handler() {
        this.actualizarRuleta();
      },
      deep: true
    }
  },
  mounted() {
    this.actualizarRuleta();
  }
});
