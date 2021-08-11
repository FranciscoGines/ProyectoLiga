let tbody = document.getElementById("tbody");

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
  // console.log(partidos);
  let top5 = estadisticas(partidos);
  console.log(top5);
  pintartop5(top5)
};

init();



// let arrayPartidos = data.matches;

function estadisticas(partidos) {
  let estadisticas = [];

  for (let i = 0; i < partidos.length; i++) {
    let estado = partidos[i].status;
    if (estado !== "FINISHED") {
      /*aqui le estoy diciendo hee estado recorreme por los 380 partidos y si no estan acabados continua no te detengas*/
      continue;
    }
    let estadosequipolocal = partidos[i].homeTeam.name;
    let idequipolocal = partidos[i].homeTeam.id;
    let golesequipolocal = partidos[i].score.fullTime.homeTeam;
    let introducido = false;
    estadisticas.forEach((idequipos) => {
      if (idequipos.id == idequipolocal) {
        introducido = true;
      }
    });
    if (introducido == false) {
      estadisticas.push({
        id: idequipolocal,
        name: estadosequipolocal,
        goals: golesequipolocal,
        matches: 0,
        average: 0,
      });
    }
  }

  for (let j = 0; j < estadisticas.length; j++) {
    for (let k = 0; k < partidos.length; k++) {
      if (estadisticas[j].id == partidos[k].homeTeam.id) {
        estadisticas[j].goals += partidos[k].score.fullTime.homeTeam;
        estadisticas[j].matches++;
      } else if (estadisticas[j].id == partidos[k].awayTeam.id) {
        estadisticas[j].goals += partidos[k].score.fullTime.awayTeam;
        estadisticas[j].matches++;
      }
    }
    let avg = estadisticas[j].goals / estadisticas[j].matches;

    estadisticas[j].average = avg.toFixed(2);
  }

  estadisticas.sort(function (a, b) {
    return b.average - a.average;
  });

  let top5 = estadisticas.slice(0, 5);

  return top5;
}

function pintartop5(cincoMejores) {
  for (let i = 0; i < cincoMejores.length; i++) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${cincoMejores[i].name}</td><td>${cincoMejores[i].matches}</td><td>${cincoMejores[i].goals}</td><td>${cincoMejores[i].average}</td>`;
    tbody.appendChild(tr);
  }
}
// pintartop5(estadisticas(arrayPartidos));
