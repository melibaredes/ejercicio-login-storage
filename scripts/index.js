// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
  usuarios: [
    {
      id: 1,
      name: "Steve Jobs",
      email: "steve@jobs.com",
      password: "Steve123",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "shanna@melissa.tv",
      password: "Ervin345",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "nathan@yesenia.net",
      password: "Floppy39876",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "julianne.oconner@kory.org",
      password: "MysuperPassword345",
    },
  ],
};

// ACTIVIDAD

// Paso a paso:

// 1) Al momento de que la persona inicia sesión, si las validaciones que ya tenemos implementadas
// han sido exitosas, deberemos almacenar la información del usuario en el LocalStorage.

// 2) Al mensaje de bienvenida que ya teníamos implementado, deberemos agregarle el nombre de la
// persona y un botón de "Cerrar Sesión".

// 3) Una vez iniciada la sesión, la misma se deberá mantener en ese estado para el caso de que la persona
// recargue la página. Para ello, deberás validar si existe información del usuario al momento en
// que se produce la carga de la página, y en base a dicha condción decidir que elementos mostrar.

// 3) Para el caso de que la persona haga click en el botón "Cerrar Sesión", se deberá eliminar
// la información del usuario, mostrar un mensaje indicando que se ha cerrado la sesión, y recargar
// la página para mostrar nuevamente el formulario de login.

/* 
TIPS:
  - Para lograr los objetivos de este ejercicio, deberás valerte de algunos eventos y métodos que vimos en
    las clases anteriores. Te invitamos a que revises los recursos en caso de que tengas dudas, ya que allí
    encontrarás todas las respuestas que necesitas para completar la actividad.

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - Al momento de guardar información del usuario en el navegador, recuerda que debemos almacenar solo la 
    información necesaria, y EN NINGUN CASO DEBEMOS GUARDAR LA CONTRASEÑA. Por ello, deberás seleccionar y
    separar la información que tienes que almacenar, a partir del objeto que contiene la información del 
    usuario.

   ¡Manos a la obra!
 */

const emailInput = document.getElementById('email-input');
const passInput = document.getElementById('password-input');
const formulario = document.querySelector('form');
const loader = document.getElementById('loader');
const errorContainer = document.getElementById('error-container');
const botonLogIn = document.querySelector('.login-btn');
const user = document.getElementById('email-input');
const pass = document.getElementById('password-input');
const main = document.querySelector('main');


botonLogIn.addEventListener('click', verificarInfo);
function verificarInfo(event){
  let sesionCorrecta = false;
  console.log('Entre a la función');
  baseDeDatos.usuarios.forEach(usuario => {
    console.log(usuario);
    if (usuario.email == user.value && usuario.password == pass.value) {
      loader.classList.remove('hidden');
      console.log('Entre al if de iniciar sesión');
      sesionCorrecta = true;
      errorContainer.innerHTML = "";
      const infoUsuario = {
        nombre: usuario.name,
        mailUsuario: usuario.email,
        idUsuario: usuario.id
      };
      localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario));
      setTimeout(function recargarPagina(){
        location.reload();
      }, 1500)
    }});
  if (!sesionCorrecta){
    errorContainer.classList.remove('hidden');
    errorContainer.innerHTML += "<p>Los datos ingresados son incorrectos.</p>";
    loader.classList.add('hidden');
  }
}


window.addEventListener('load', validarUsuario);

function validarUsuario(){
  try {
    const usuarioLocal = JSON.parse(localStorage.getItem("infoUsuario"));
    if (usuarioLocal){
      main.innerHTML = `<h1>Bienvenid@, ${usuarioLocal.nombre}</h1> <button id="botonSignOut" class = "login-btn">Cerrar sesión</button>`
    }
    const botonCerrarSesion = document.getElementById('botonSignOut');
    botonCerrarSesion.addEventListener('click', function cerrarSesion(){
      alert('Estás cerrando sesión.');
      localStorage.clear();
      location.reload();
    })
  } catch (error) {
    //
  }
  
}
