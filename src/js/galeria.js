document.addEventListener("DOMContentLoaded", ()=>{
    iniciarApp();
});
function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();
}
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i=1;i<=12;i++){
        const lista = document.createElement('li');
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img loading="lazy" src="img/thumb/${i}.jpg" alt="imagen-vocalista">  
        `;
        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(lista);
        lista.appendChild(imagen);
    }
}
function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img src="img/grande/${id}.jpg" loading="lazy" alt="imagen galeria ${id}">
    `;
    const overlay = document.createElement("div");
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    //Añadir boton cerrar
    const botonCerrar = document.createElement('p');
    botonCerrar.textContent = "X"
    botonCerrar.classList.add('btn-cerrar');
    botonCerrar.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };
    document.addEventListener("keydown", (e)=>{
        const key = e.key;
        if(key==="Escape"){
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }
    });
    overlay.appendChild(botonCerrar);
    //Añadir el elemento al document
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( (enlace)=>{
        enlace.addEventListener('click', function(event){
            event.preventDefault();
            const enla = event.target.attributes.href.value;
            const seccion = document.querySelector(enla);
            seccion.scrollIntoView( {behavior: 'smooth' } );
        });
    });
    
}
function navegacionFija(){
    const barra = document.querySelector('header');
    const sobreFestival = document.querySelector('.sobre-festival');
    window.addEventListener('scroll', function(){
         if( sobreFestival.getBoundingClientRect().bottom < 0 ){
             barra.classList.add('fijo');
             console.log('Done');
         }
         else{
             barra.classList.remove('fijo');
         }
    });

}

