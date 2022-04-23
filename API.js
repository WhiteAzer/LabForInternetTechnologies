function GetAPI(APIName, DOMElement) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', APIName);

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || xhr.status != 200) {
            return;
        }
        let respons = JSON.parse(xhr.responseText);
        let data = respons.data;
        SelectAdd(data, DOMElement);

    }

    xhr.send();
}

function SelectAdd(DataArray, DOMElement) {
    let $select = document.querySelector(DOMElement);

    DataArray.forEach(element => {
        let option = document.createElement("option");

        option.innerHTML = element.title;
        element.secid ? option.value = element.secid : option.value = element.value;
        $select.append(option);
    });
}

function dateFormatter(numb) {
    return [...`${numb}`].length > 1 ? numb : '0' + numb;
}

let companyNames1 = GetAPI("https://sedelkin.ru/api/security_list", ".API__form-names1");
let companyNames2 = GetAPI("https://sedelkin.ru/api/security_list", ".API__form-names2");

let intervals = GetAPI("https://sedelkin.ru/api/interval", ".API__form-interval");

let availableCharts1 = new XMLHttpRequest();
let availableCharts2 = new XMLHttpRequest();

let btn = document.querySelector(".API__form-btn");

let response1;
let response2;

btn.addEventListener("click", function () {
    
    let body1 = new FormData();
    let body2 = new FormData();

    let secid1 = document.querySelector(".API__form-names1").value;
    let secid2 = document.querySelector(".API__form-names2").value;

    let interval = document.querySelector(".API__form-interval").value;
    let limits = document.querySelector(".API__form-limits").value;
    let start = document.querySelector(".API__form-start").value;
    let date = new Date();
    let finish = [date.getFullYear(), dateFormatter(date.getMonth() + 1), dateFormatter(date.getDate())].join('-');

    body1.append("app_key", "lpDRhW4f%5Bj|i8mB~BjlCD#Ve6wAi");
    body1.append("secid", secid1);
    body1.append("interval", interval);
    body1.append("limits", limits);
    body1.append("start", start);
    body1.append("finish", finish);

    body2.append("app_key", "lpDRhW4f%5Bj|i8mB~BjlCD#Ve6wAi");
    body2.append("secid", secid2);
    body2.append("interval", interval);
    body2.append("limits", limits);
    body2.append("start", start);
    body2.append("finish", finish);

    availableCharts1.open("POST", "https://sedelkin.ru/api/history/get_data");
    availableCharts2.open("POST", "https://sedelkin.ru/api/history/get_data");

    availableCharts1.onreadystatechange = function () {
        if (availableCharts1.readyState !== 4 || availableCharts1.status !== 200) {
            return;
        }
        response1 = JSON.parse(availableCharts1.responseText);
        console.log(response1);

        if (response1.status == "Error") {
            return;
        }
        data.datasets[0].label = response1.secid;

        data.labels = [];
        data.datasets[0].data = [];

        response1.data.forEach(item => {
            data.labels.push(item.datetime);
            data.datasets[0].data.push(item.close);
        });

        myChart.update();
    }

    availableCharts2.onreadystatechange = function () {
        if (availableCharts2.readyState !== 4 || availableCharts2.status !== 200) {
            return;
        }
        response2 = JSON.parse(availableCharts2.responseText);
        console.log(response2);

        if (response2.status == "Error") {
            return;
        }
        data.datasets[1].label = response2.secid;

        data.labels = [];
        data.datasets[1].data = [];

        response2.data.forEach(item => {
            data.labels.push(item.datetime);
            data.datasets[1].data.push(item.close);
        });

        myChart.update();
    }
    
    availableCharts1.send(body1);
    availableCharts2.send(body2);
});

let labels = [];
const data = {
    labels: labels,
    datasets: [
        {
        label: 'IMOEX',
        backgroundColor: 'rgb(132, 99, 255)',
        borderColor: 'rgb(132, 99, 255)',
        data: [0, 10]
    },
    {
        label: 'IMOEX',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10]
    },
]
};

let config = {
    type: 'line',
    data: data,
    options: {}
};


let myChart = new Chart(
    document.getElementById('myChart'),
    config
);