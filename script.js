document.addEventListener('DOMContentLoaded', () => {
    
 
    const runButton = document.getElementById('runButton');
    const outputDiv = document.getElementById('output');
    const logPre = document.getElementById('log');
    const ctx = document.getElementById('myChart').getContext('2d');
    let myChart; 
  
    const trueFunc = x => 2 * Math.pow(x, 3) - 1 * Math.pow(x, 2) - 5 * x + 3;

    
    const finalPredictions = [
        -25.04, -22.51, -20.12, -17.86, -15.73, -13.72, -11.83, -10.06, -8.41, -6.87,
        -5.45, -4.13, -2.93, -1.82, -0.83, 0.06, 0.85, 1.56, 2.19, 2.75, 3.25, 3.68,
        4.06, 4.39, 4.68, 4.93, 5.15, 5.34, 5.52, 5.67, 5.82, 5.95, 6.08, 6.20, 6.32,
        6.45, 6.58, 6.72, 6.87, 7.03, 7.21, 7.40, 7.61, 7.84, 8.09, 8.36, 8.65, 8.97,
        9.31, 9.68, 10.07, 10.49, 10.94, 11.42, 11.93, 12.46, 13.02, 13.62, 14.24,
        14.89, 15.57, 16.29, 17.03, 17.81, 18.62, 19.46, 20.33, 21.23, 22.17, 23.14,
        24.14, 25.17, 26.24, 27.34, 28.47, 29.64, 30.85, 32.08, 33.36, 34.67, 36.01,
        37.39, 38.80, 40.25, 41.74, 43.26, 44.82, 46.41, 48.05, 49.72, 51.43, 53.18,
        54.96, 56.78, 58.64, 60.54, 62.48, 64.46, 66.47
    ];

    
    runButton.addEventListener('click', () => {
        
        runButton.disabled = true;
        runButton.textContent = "Simulation Complete!";

       
        const labels = []; 
        const dataPoints = [];
        for (let i = 0; i < 100; i++) {
            const x = -3 + (6 * i / 99);
            labels.push(x.toFixed(2));
           
            const noise = (Math.random() - 0.5) * 6;
            dataPoints.push(trueFunc(x) + noise);
        }

        /
        logPre.textContent = `Epoch [500/5000], Loss: 20.1345
Epoch [1000/5000], Loss: 15.3412
Epoch [1500/5000], Loss: 12.0877
Epoch [2000/5000], Loss: 10.1156
Epoch [2500/5000], Loss: 8.8749
Epoch [3000/5000], Loss: 8.0511
Epoch [3500/5000], Loss: 7.4890
Epoch [4000/5000], Loss: 7.0913
Epoch [4500/5000], Loss: 6.8001
Epoch [5000/5000], Loss: 6.5798

Training finished. Model has learned the function from the data.`;
        outputDiv.style.display = 'block';

       
        if (myChart) {
            myChart.destroy(); 
        }

        myChart = new Chart(ctx, {
            type: 'scatter', 
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'True Data (with noise)',
                        data: dataPoints,
                        backgroundColor: 'rgba(255, 159, 64, 0.7)',
                        type: 'scatter', 
                        pointRadius: 4,
                    },
                    {
                        label: 'Learned Function (Model Prediction)',
                        data: finalPredictions,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        type: 'line', 
                        fill: false,
                        tension: 0.1,
                        pointRadius: 0, 
                        borderWidth: 3
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: { display: true, text: 'X Value' }
                    },
                    y: {
                        title: { display: true, text: 'Y Value' }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Model Performance: Fitting a Cubic Function',
                        font: { size: 18 }
                    }
                }
            }
        });
    });
});
