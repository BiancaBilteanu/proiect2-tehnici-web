window.onload = function(){
const form = document.getElementById('contactForm');
const trimiteFormular = document.getElementById('trimiteFormular');
const lista = document.getElementById('comentarii');

getdata();

trimiteFormular.onclick = function () {
    const postObject = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
    }
    postdata(postObject);
    reseteazaFormular(form);
}

function reseteazaFormular(formular) {
    formular.firstName.value = '';
    formular.lastName.value = '';
    formular.email.value = '';
    formular.subject.value = '';
    formular.message.value = '';
}

// fetch the data list
function getdata() {
    fetch('http://localhost:3000/data')
        .then(function (response) {
            // Trasform server response to get the data
            response.json().then(function (data) {
                appenddataToDOM(data);
            });
        });
};

function appenddataToDOM(data) {
    if(lista.children.length > 0) {
        
        while(lista.children.length > 0) {
            lista.removeChild(lista.firstChild);
        }
    }
    for(const item of data) {
        let li = document.createElement('li');
        li.innerText = item.firstName+' '+item.lastName+': ' +item.message;
        li.style.color = 'white';
        lista.appendChild(li);
    }
}

// post data
function postdata(postObject) {
    // post data
    fetch('http://localhost:3000/data', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function (data) {
        getdata();
    });
}
}