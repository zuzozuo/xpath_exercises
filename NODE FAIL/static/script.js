document.addEventListener("DOMContentLoaded", function() {

    const WOJEWODZTWO = document.getElementById("WOJ"),
        POWIAT = document.getElementById("POW"),
        GMINA = document.getElementById("GMI"),
        MIEJSCOWOSC = document.getElementById("MIE"),
        ULICA = document.getElementById("ULI")

    //wysyłanie na początku prośby o nazwy województw
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText)
            let names = JSON.parse(this.responseText)
                //console.log(names)

            for (let i = 0; i < names.length; i++) {
                let option = document.createElement('option')
                option.value = names[i].name;
                option.text = option.value;
                WOJEWODZTWO.appendChild(option)

            }
        }
    };
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-type",
        "text/plain");
    xhttp.send("1");


    WOJEWODZTWO.addEventListener("change", function() {
        if (WOJEWODZTWO.value != 0) {
            console.log(this.value)
        } else {
            console.log("blep")
        }
    })


})