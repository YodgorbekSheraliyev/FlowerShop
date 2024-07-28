import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title',
        font: {
          size: 16,
          family: 'Arial',
          weight: 'bold'
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'black',
          font: {
            size: 14,
            family: 'Arial',
            weight: 'normal'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        bodySpacing: 10,
        borderColor: 'transparent',
        borderWidth: 0,
        displayColors: false,
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.value;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
            family: 'Arial',
            weight: 'normal'
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 12,
            family: 'Arial',
            weight: 'normal'
          }
        }
      }
    }
  }
});
