// Creamos siempre nuestro document ready que significa que el dom se haya cargado correctamente.
$(document).ready(function () {
  //Creamos nuestras variables con sus respectivos selectores

  let buscar = $("#addEnlace");
  let inputFindID = $("#numberPokeApi");
  let contentInfoPoke = $("#dataPoke");

  // CREAMOS LOS EVENTOS PARA SACAR EL NUMERO DEL INPUT
  inputFindID.change((e) => {
    e.preventDefault();
    let id = inputFindID.val();
    /* console.log('Retorna el id', id) */

    if (id.length != 0 && id > 0) {
      buscarPokemon(id);
    } else {
      alert("Ingrese un ID valido");
    }
  });

  buscar.change((e) => {
    e.preventDefault();
    let id = inputFindID.val();
    /* console.log('Retorna el id', id) */

    if (id.length != 0 && id > 0) {
      buscarPokemon(id);
    } else {
      alert("Ingrese un ID valido");
    }
  });

  const buscarPokemon = (id) => {
    $.ajax({
      // Parametro de la consulta o URL de la API
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      // Tipo de consulta "GET", "POST", "PUT", "DELETE"
      type: "GET",
      // Tipo de dato que se consulta
      dataType: "json",
      // SE CREAN TRES METODOS O FUNCIONES COMO :
      //  success
      //  error
      //  complete

      // success se va a ejecutar cuando la consulta es correcta
      // la respuesta viene intrinsica en el argumento de la funcion
      success: function (response) {
        console.log("salida de response--->", response);
        const data = response;

        const infoPoke = {
          imagen: data.sprites.other.dream_world["front_default"] !== null ? data.sprites.other.dream_world["front_default"] : data.sprites.other["official-artwork"].front_default ,
          especie: data.species["name"],
          dataChart: data.stats
        };
        // Creamos la desestructuracion para acceder mas rapido
        const { imagen, especie, dataChart} = infoPoke;
        // ejecutamos la funcion cardPokemon
        cardPokemon(imagen, especie);

        const lista = $('ul > li#dataInfo')
        const dataMoves = data.moves

        const datos=[]
        
        dataChart.forEach((element, index)=>{
            datos.push({
                y: dataChart[index].base_stat,
                label: dataChart[index].stat.name 
            })
        })


        dataMoves.forEach(mov=>{
            lista.append(`<span class="tag">${mov.move.name}</span>`)
        })

        // Creamos nuestro Chart
        let chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: `Estadisticas de ${especie}`
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: datos
            }]
        });
        chart.render();
        
        

      },
      error: function () {
        alert("Hay problemas con la API");
      },
      complete: function () {
        /* alert('Se realizo la consulta') */
      },
    });
  };

  const cardPokemon = (imagen, especie) => {
    contentInfoPoke.html(`<div class="card">
        <img src="${imagen}" class="card-img-top" alt="${especie}">
        <div class="card-body">
          <h5 class="card-title">${especie}</h5>
            <ul class="list-group" >
                <li class="list-group-item active" aria-current="true">Movimientos</li>
                <li class="list-group-item" id="dataInfo"></li>                
            </ul>
        </div>
      </div>`);
  };
});
