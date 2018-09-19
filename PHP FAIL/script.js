document.addEventListener("DOMContentLoaded", function() {

    //-----------ma wyszukac od razu woj-----------------------------------------------
    fetch('/php/woj.php', {
        method: 'post',
        headers: { 'Content-type': 'application/x-www-form=urlencoded; charset=UTF-8' },
        body: 'data = 1'
    }).then((response) => response.json())
        .then(response => console.log('Sukces, cos mam', JSON.stringify(response)))
        .catch(error => console.log('Nie ma sukcesu :( ', error))




    //---------to na potem--------------------------------------
    function search(name, data, url) {
        fetch(url, {
            method: 'post',
            body: { rodzaj: name, wybrane: data } //rodzaj- jaki select , wybrane - co zostało wybrane
        }).then(response => console.log('Sukces, cos mam', JSON.stringify(response)))
            .catch(error => console.log('Nie ma sukcesu :( ', error))
    }

    //-----------------------------------------------------------------
})