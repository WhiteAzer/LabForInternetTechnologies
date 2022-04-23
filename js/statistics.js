const x = document.querySelectorAll(".chart__table-x .chart__input");
const y = document.querySelectorAll(".chart__table-y .chart__input");
const color = document.querySelector(".chart__drop-list");
const btn = document.querySelector(".chart__button");

const colorsList = ["#ff6161", "#9999ff", "#42ff9e", "#fab62d", "#bd86f0"];


let labels = [1, 2, 3, 4, 5];


setInterval(() => {
    data.datasets[0].backgroundColor = colorsList[color.options[color.selectedIndex].value];
    data.datasets[0].borderColor = colorsList[color.options[color.selectedIndex].value];

    myChart.update();
}, 100);

let data = {
    labels: labels,
    datasets: [{
        label: 'График',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [8, 4, 3, 4, 8],
    }]
};

btn.addEventListener("click", () => {
    labels = [];
    data.datasets[0].data = [];

    x.forEach(element => {
        labels.push(element.value);

    });

    y.forEach(element => {
        data.datasets[0].data.push(element.value);
    });

    myChart.update();

    
});

let config = {
    type: 'line',
    data: data,
    options: {}
};


let myChart = new Chart(
    document.getElementById('myChart'),
    config
);