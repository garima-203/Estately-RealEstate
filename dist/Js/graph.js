function initializeCharts() {
    const ctx1 = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Sales',
                data: [120, 190, 300, 500, 200, 300],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });

    const ctx2 = document.getElementById('customerChart').getContext('2d');
    const customerChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Customers',
                data: [50, 100, 150, 200, 250, 300],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });

    const ctx3 = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Residential', 'Commercial', 'Industrial'],
            datasets: [{
                label: 'Revenue',
                data: [300, 500, 200],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });
    
    const ctx4 = document.getElementById('propertyChart').getContext('2d');
    const propertyChart = new Chart(ctx4, {
        type: 'doughnut',
        data: {
            labels: ['Flats', 'Villas', 'Bungalows', 'Plots'],
            datasets: [{
                label: 'Properties',
                data: [150, 100, 50, 200],
                backgroundColor: [
                    'rgba(235, 139, 54, 0.14)',
                    'rgba(86, 176, 255, 0.18)',
                    'rgba(192, 75, 75, 0.16)',
                    'rgba(34, 33, 34, 0.16)'
                ],
                borderColor: [
                    'rgb(235, 139, 54)',
                    'rgb(86, 176, 255)',
                    'rgb(192, 75, 75)',
                    'rgb(34, 33, 34)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,  
            plugins: {
                legend: {
                     position: 'bottom',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
    

   
}
 
initializeCharts();
