// Initialize the charts
const ctxGain = document.getElementById('gainChart').getContext('2d');
const ctxSNR = document.getElementById('snrChart').getContext('2d');
const ctxNoise = document.getElementById('noiseChart').getContext('2d');

const gainChart = new Chart(ctxGain, {
  type: 'line',
  data: {
    labels: ['0', '10', '20', '30', '40', '50'],
    datasets: [{
      label: 'Gain (dB)',
      data: [0, 10, 20, 30, 40, 50],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
    }]
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Frequency (Hz)',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Gain (dB)',
        }
      }
    }
  }
});

const snrChart = new Chart(ctxSNR, {
  type: 'line',
  data: {
    labels: ['0', '10', '20', '30', '40', '50'],
    datasets: [{
      label: 'SNR (dB)',
      data: [10, 15, 20, 25, 30, 35],
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2,
      fill: false,
    }]
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Frequency (Hz)',
        }
      },
      y: {
        title: {
          display: true,
          text: 'SNR (dB)',
        }
      }
    }
  }
});

const noiseChart = new Chart(ctxNoise, {
  type: 'line',
  data: {
    labels: ['0', '10', '20', '30', '40', '50'],
    datasets: [{
      label: 'Noise Power (dBm)',
      data: [-100, -95, -90, -85, -80, -75],
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 2,
      fill: false,
    }]
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Frequency (Hz)',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Noise Power (dBm)',
        }
      }
    }
  }
});

// Advanced Noise Models Calculation
document.getElementById('noise-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const temperature = parseFloat(document.getElementById('temperature').value);
  const bandwidth = parseFloat(document.getElementById('bandwidth').value);
  const frequency = parseFloat(document.getElementById('frequency').value);
  const power = parseFloat(document.getElementById('power').value);

  // Calculate Thermal Noise (Johnson-Nyquist noise)
  const k = 1.38e-23; // Boltzmann constant in J/K
  const thermalNoise = k * temperature * bandwidth;
  const thermalNoiseDbm = 10 * Math.log10(thermalNoise * 1e3) + 30;
  
  // Calculate Flicker Noise (Pink Noise)
  const flickerNoise = 1 / Math.pow(frequency, 2); // Simplified model
  const flickerNoiseDbm = 10 * Math.log10(flickerNoise * 1e3) + 30;

  document.getElementById('thermal-noise').textContent = `Thermal Noise (dBm): ${thermalNoiseDbm.toFixed(2)} dBm`;
  document.getElementById('flicker-noise').textContent = `Flicker Noise (dBm): ${flickerNoiseDbm.toFixed(2)} dBm`;
});

// Non-linear Amplifier Calculation
document.getElementById('amplifier-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const inputPower = parseFloat(document.getElementById('inputPower').value);
  
  // Non-linear gain model (simplified)
  const nonlinearGain = inputPower - 10; // Assumed a simple compression model
  
  document.getElementById('nonlinear-gain').textContent = `Non-linear Gain (dB): ${nonlinearGain.toFixed(2)} dB`;
});
