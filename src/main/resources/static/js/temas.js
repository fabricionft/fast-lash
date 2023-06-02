window.onload = () =>{
    carregarTema();
}

function alterarTema(){
    localStorage.setItem('tema', (!document.getElementById('check').checked) ? "escuro" : "claro")
    carregarTema();
}

function carregarTema(){
    let html = document.querySelector('html');

    if(localStorage.getItem('tema') == "escuro"){
        html.classList.remove('temaClaro');
        html.classList.add('temaEscuro');
        $('#iconX').attr('src', "img/x-dark.png")
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(20, 20, 20)");
        document.getElementById('circulo').style.transform="translateX(24px)";
    }
    else{
        html.classList.remove('temaEscuro');
        html.classList.add('temaClaro');
        $('#iconX').attr('src', "img/x-light.png")
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#fff");
        document.getElementById('circulo').style.transform="translateX(0px)";
    }
}