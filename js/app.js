//Variables
const carrtio = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners() {

  //cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener('click', agregarCurso)

  //Elimina cursos del carrito
  carrtio.addEventListener('click', eliminarCurso)


   //Muestra los cursos del local storage

  document.addEventListener('DOMContentLoaded',()=>{
    articulosCarrito=JSON.parse(localStorage.getItem('carrito')) || [] //esto es porque en caso de que no haya nada le agrega un array vacio

    
    carrtioHTML()
})

  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []
    limpiarHTML() //Eliminamos todo el HTML
  })
}


//Funciones

function agregarCurso(e) {

  e.preventDefault()

  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement

    leerDatosCurso(cursoSeleccionado)

  }
}

//Eliminar un curso del carrito
function eliminarCurso(e)/* con esta e identifico a que elemento le doy click */ {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id')

    //Eliminar del arreglo de articulosCarritos por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

    carrtioHTML() //Iterar sobre el carrito y mostrar su html

  }
}

//Lee el contendio del html al que le dimos click y extrae info del curso

function leerDatosCurso(curso) {


  //Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,

  }

  // Revisa si un elemnto ya existe en el carrito
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

  if (existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++
        return curso //Retorna el objeto actualizado
      } else {
        return curso //Retorna los objetos no duplicados
      }
    })
    articulosCarrito = [...cursos]
  } else {

    //Agregar elemntos al arreglo del carrito

    articulosCarrito = [...articulosCarrito, infoCurso]
  }



  //articulosCarrito.push(infoCurso) -- Tambien se puede hacer con .push

  carrtioHTML()
}


//Muestra el carrito de compra en html

function carrtioHTML() {

  //Limpiar el HTML 
  limpiarHTML()

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach(curso => {
    const { imagen, titulo, precio, cantidad, id } = curso
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>
      <img src="${imagen}" width="100">
        
      </td>
      <td>
        ${titulo}
      </td>
      <td>
      ${precio}
      <td>
      ${cantidad}
    </td>
    <td>
        <a href="#" class="borrar-curso"  data-id="${id}">X </a>
  </td>
    </td>
    `
    //agregar el html al carrito en el tbody

    contenedorCarrito.appendChild(row)

  })

  //Agregar carrito de compras al storage
  sincronizarStorage()

}

function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//Eliminar los cursos del tbody
function limpiarHTML() {
  //forma lenta
  /* contenedorCarrito.innerHTML='' */

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}

