
const fsr = document.getElementById('fsr');
const led = document.getElementById('led');
const ctx = document.getElementById('graph').getContext('2d');

let data = {
  labels: [],
  datasets: [{
    label: 'Pressure Reading',
    data: [],
    borderColor: 'blue',
    borderWidth: 2,
    fill: false,
    tension: 0.1
  }]
};

let config = {
  type: 'line',
  data: data,
  options: {
    scales: {
      x: { title: { display: true, text: 'Time (s)' } },
      y: { min: 0, max: 1023, title: { display: true, text: 'Pressure' } }
    }
  }
};

let chart = new Chart(ctx, config);
let startTime = Date.now();

fsr.addEventListener('input', () => {
  let value = parseInt(fsr.value);
  let time = ((Date.now() - startTime) / 1000).toFixed(1);

  data.labels.push(time);
  data.datasets[0].data.push(value);
  chart.update();

  if (value > 800) {
    led.className = 'led-on';
  } else {
    led.className = 'led-off';
  }
});
