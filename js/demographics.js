// Year-Wise Admissions Chart (Yearly Placement)
var admissionCtx = document.getElementById('admissionChart').getContext('2d');
var admissionChart = new Chart(admissionCtx, {
    type: 'line',
    data: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [{
            // label: 'Admissions',
            data: [150, 160, 170, 180, 190],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Students',
                    color: '#666',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Year',
                    color: '#666',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: false
            }
        }
    }
});

// Placement Stats Chart
var placementCtx = document.getElementById('placementChart').getContext('2d');
var placementChart = new Chart(placementCtx, {
    type: 'bar',
    data: {
        labels: ['CSE', 'IT', 'ECE', 'Mech.', 'Civil', 'Chem.', 'IPE', 'EEE'],
        datasets: [{
            // label: 'Placements (%)',
            data: [75, 65, 80, 70, 60, 50, 55, 45],
            backgroundColor: '#1abc9c',
            borderColor: '#16a085',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Placement Percentage',
                    color: '#666',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Departments',
                    color: '#666',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: false
            }
        }
    }
});





// Global Variables
let isBranchDistribution = true;
let selectedBranchName = '';
let selectedBranchIndex = -1;

// Custom Plugin to draw lines and labels for Branch and Gender Distribution
const labelPlugin = {
    id: 'labelPlugin',
    afterDraw: (chart) => {
        if (window.innerWidth <= 768) {
            return; // Do not draw custom labels on mobile
        }

        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        const chartCenterX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const chartCenterY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

        // Loop through each slice
        meta.data.forEach((element, index) => {
            const data = chart.data.datasets[0].data[index];
            const label = chart.data.labels[index];
            const angle = (element.startAngle + element.endAngle) / 2;
            const outerRadius = element.outerRadius;

            // Calculate the starting point of the line (on the slice boundary)
            const xStart = chartCenterX + outerRadius * Math.cos(angle);
            const yStart = chartCenterY + outerRadius * Math.sin(angle);

            // Calculate the horizontal endpoint for the line
            const labelRadius = outerRadius + 50; // Distance of label from the chart
            const xEnd = chartCenterX + labelRadius * (Math.cos(angle) > 0 ? 1 : -1); // Ensure the endpoint is horizontal (left or right)
            const yEnd = yStart; // Keep y consistent for a horizontal line

            // Uniform gap between the line and the label
            const labelGap = 15;

            // Draw the line from the pie slice boundary to label
            ctx.beginPath();
            ctx.moveTo(xStart, yStart); // Start at the boundary of the slice
            ctx.lineTo(xEnd, yEnd); // Horizontal endpoint for the line
            ctx.strokeStyle = '#333'; // Line color
            ctx.stroke();

            // Set text alignment and calculate xLabel position based on side (left or right)
            ctx.textAlign = Math.cos(angle) > 0 ? 'left' : 'right';
            const xLabel = xEnd + (Math.cos(angle) > 0 ? labelGap : -labelGap); // Uniform gap on both sides
            const yLabel = yEnd;

            // Draw the label text
            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = '#333';
            ctx.fillText(label, xLabel, yLabel);
        });
    }
};

// Register the custom plugin
Chart.register(labelPlugin);

// Initialize the Branch Distribution Chart
var branchCtx = document.getElementById('branchChart').getContext('2d');
var branchChart = new Chart(branchCtx, {
    type: 'pie',
    data: {
        labels: ['CSE', 'IT', 'ECE', 'Mech.', 'Civil', 'Chem.', 'IPE', 'EEE'],
        datasets: [{
            data: [30, 25, 20, 15, 10, 12, 19, 11],
            backgroundColor: ['#2ecc71', '#e67e22', '#9b59b6', '#f1c40f', '#3498db', '#34495e', '#e74c3c', '#95a5a6']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
                bottom: 20
            }
        },
        plugins: {
            legend: {
                display: window.innerWidth <= 768, // Display legend only on mobile screens (<= 768px)
                position: 'bottom'
            }
        },
        onClick: (evt, item) => {
            if (isBranchDistribution && item.length > 0) {
                const branchIndex = item[0].index;
                const branchName = branchChart.data.labels[branchIndex];
                selectedBranchName = branchName;
                selectedBranchIndex = branchIndex;
                updateGenderDistribution(branchName);
            }
        }
    }
});

// Listen for window resize events to adjust legend display based on screen width
window.addEventListener('resize', () => {
    branchChart.options.plugins.legend.display = window.innerWidth <= 768;
    branchChart.update();
});

// Function to update Gender Distribution based on the selected branch
function updateGenderDistribution(branchName) {
    const genderData = {
        'CSE': [65, 35],
        'IT': [60, 40],
        'ECE': [70, 30],
        'Mech.': [85, 15],
        'Civil': [75, 25],
        'Chem.': [50, 50],
        'IPE': [55, 45],
        'EEE': [60, 40]
    };

    const selectedGenderData = genderData[branchName];

    // Update the chart with gender data
    branchChart.data.labels = ['Male', 'Female'];
    branchChart.data.datasets[0].data = selectedGenderData;
    branchChart.data.datasets[0].backgroundColor = ['#3498db', '#e74c3c'];

    // Update the title
    document.getElementById('chart-title').textContent = `Gender Distribution for ${branchName}`;

    // Show the "Back to Branch" button
    document.getElementById('backToBranchBtn').classList.remove('hidden');

    // Update state to indicate gender distribution
    isBranchDistribution = false;

    // Update the chart
    branchChart.update();
}

// Function to restore the Branch Distribution chart
function showBranchChart() {
    // Restore the original branch data
    branchChart.data.labels = ['CSE', 'IT', 'ECE', 'Mech.', 'Civil', 'Chem.', 'IPE', 'EEE'];
    branchChart.data.datasets[0].data = [30, 25, 20, 15, 10, 12, 19, 11];
    branchChart.data.datasets[0].backgroundColor = ['#2ecc71', '#e67e22', '#9b59b6', '#f1c40f', '#3498db', '#34495e', '#e74c3c', '#95a5a6'];

    // Update the title
    document.getElementById('chart-title').textContent = 'Branch Distribution';

    // Hide the "Back to Branch" button
    document.getElementById('backToBranchBtn').classList.add('hidden');

    // Reset the selected branch and index
    selectedBranchName = '';
    selectedBranchIndex = -1;

    // Mark the chart as branch distribution
    isBranchDistribution = true;

    // Update the chart
    branchChart.update();
}
