const BOLETAS_POR_PEDIDO = 5;
const BUFFER_BOLETAS = 10;
const TIEMPO_ESPERA = 5; // segundos

let casilla_id = -1;
let imagenes = [];
let segundos = TIEMPO_ESPERA;

function consigueBoletas() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            imagenes = imagenes.concat(JSON.parse(this.responseText));
            setTimeout(actualizaContador, 1000);
            actualizaImagen();
        }
    }

    req.open('post', 'http://localhost:3000/image', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.send(`n=${BUFFER_BOLETAS - imagenes.length}`); // manda la cantidad de imágenes que quiere
                                                       // el servidor puede responder con cualquier número
                                                       // de imágenes entre 0 y la cantidad especificada
};

function actualizaContador() {
    if (segundos > 0) {
        segundos--;
        setTimeout(actualizaContador, 1000);
    } else {
        segundos = TIEMPO_ESPERA;
        consigueBoletas();
        console.log(imagenes);
    }

    document.getElementById('contador').innerHTML = segundos;
}

function actualizaImagen() {
    let img = document.getElementById('boleta');

    if (imagenes) {
        img.src = imagenes.shift()['img'];
    } else {
        img.src = '#';
    }
}

function configuraUsuario(id) {
    casilla_id = id;
    [...document.getElementsByClassName('seleccion-casilla')].forEach(
        btn => btn.remove()
    );

    document.getElementById('boleta').style.visibility = 'visible';
    document.getElementById('contador').style.visibility = 'visible';

    btnAgree = document.createElement('button');
    btnAgree.id = 'btn-agree';
    btnAgree.innerHTML = 'De acuerdo';
    btnAgree.setAttribute('onclick', `consigueBoletas(${casilla_id})`);

    btnDisagree = document.createElement('button');
    btnDisagree.id = 'btn-disagree';
    btnDisagree.innerHTML = 'En desacuerdo';
    btnDisagree.setAttribute('onclick', `consigueBoletas(${casilla_id})`);

    let btnDiv = document.getElementById('btn-container');
    btnDiv.appendChild(btnAgree);
    btnDiv.appendChild(btnDisagree);

    consigueBoletas();
}
