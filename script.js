fetch('http://localhost:8080/').then((res) => res.json().then((value) => {
    document.getElementById("table").innerHTML = document.getElementById("table").innerHTML + value.result;
    console.log(value);
    console.log(typeof value);

}));