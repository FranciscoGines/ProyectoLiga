let inputBusqueda = document.getElementById("busqueda");

const getData = async () => {
  let info = await fetch(
    "https://api.football-data.org/v2/competitions/2014/matches?season=2020",
    {
      method: "GET",
      headers: {
        "X-Auth-Token": "8e17dd5364604508b184ba73f7950979",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data.matches;
    })
    .catch(function (error) {
      console.log(error);
    });
  return info;
};

const init = async () => {
  let partidos = await getData();
  console.log(partidos);
  creartabla(partidos);
  inputBusqueda.addEventListener("keyup", function () {
    busqueda(partidos);
  });
};

init();

function creartabla(partidos) {
  let tabla = document.getElementById("tabla");
  tabla.innerText = "";
  for (let i = 0; i < partidos.length; i++) {
    let tr = document.createElement("tr");

    let tdfecha = new Date(partidos[i].utcDate);

    let tdjornada = document.createElement("p");
    tdjornada.innerHTML = partidos[i].matchday;

    let tdlocal = document.createElement("p");
    tdlocal.innerHTML = partidos[i].homeTeam.name;

    //colocar aqui el escudo local
    let img = document.createElement("img");
    img.src =
      "https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg";
    img.classList.add("escudo");

    //colocar aqui el escudo visitante

    let img2 = document.createElement("img");
    img2.src =
      "https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg";
    img2.classList.add("escudo");

    let tdvisitante = document.createElement("p");
    tdvisitante.innerHTML = partidos[i].awayTeam.name;

    let tdresultado = document.createElement("p");
    tdresultado.innerHTML =
      partidos[i].score.fullTime.homeTeam +
      "-" +
      partidos[i].score.fullTime.awayTeam;

    let tdArbitro = document.createElement("p");
    tdArbitro.innerHTML = partidos[i].referees.name;
    
    console.log();

    let cabeceracolumna = [
      tdfecha.toLocaleString(),
      tdjornada,
      img,
      tdlocal,
      img2,
      tdvisitante,
      tdresultado,
      tdArbitro,
    ];

    for (let j = 0; j < cabeceracolumna.length; j++) {
      const columna = document.createElement("td");
      columna.append(cabeceracolumna[j]);
      tr.appendChild(columna);
    }

    tabla.appendChild(tr);
  }
}

/*funcion busqueda con array a partidos*/

/*primer fallo en partidos tenia ;*/
function busqueda(partidos) {
  if (inputBusqueda.value == "") {
    creartabla(partidos);
  }

  let datosFiltrados = partidos.filter((nombres) => {
    return (
      nombres.homeTeam.name
        .toLowerCase()
        .includes(inputBusqueda.value.toLowerCase()) ||
      nombres.awayTeam.name
        .toLowerCase()
        .includes(inputBusqueda.value.toLowerCase())
    );
  });
  /*segundo fallo creartable en vez con tabla*/
  creartabla(datosFiltrados);
}
/*tercer fallo imput es con input*/
