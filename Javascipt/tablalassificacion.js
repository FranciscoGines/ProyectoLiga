

const getData = async () => {
    let info = await fetch(
      "https://api.football-data.org/v2/competitions/2014/standings",
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
        return (data.standings)
      })
      .catch(function (error) {
        console.log(error);
      });
    return info;
  };
  
  const init = async () => {
    let standings = await getData();
    console.log(standings[0].table);
    crearclassif(standings[0].table);
    
  };
  
  init();



function crearclassif(classif){

  let cuerpoclassif = document.getElementById("tabla2");

    for (let i = 0; i < classif.length; i++){
        const fila = document.createElement("tr");

        let pj = document.createElement("td");
        pj.innerHTML = classif[i].playedGames;

        let v = document.createElement("td");
        v.innerHTML = classif[i].won;

        let e = document.createElement("td");
        e.innerHTML = classif[i].draw;

        let lost = document.createElement("td");
        lost.innerHTML = classif[i].lost;

        let gf = document.createElement("td");
        gf.innerHTML = classif[i].goalsFor;

        let gc = document.createElement("td");
        gc.innerHTML = classif[i].goalsAgainst;

        let dg = document.createElement("td");
        dg.innerHTML = classif[i].goalDifference;

        let pts = document.createElement("td");
        pts.innerHTML = classif[i].points;

        let equipo = document.createElement("td");
        equipo.innerHTML = classif[i].team.name;
  
        let logo = document.createElement("img");
        logo.setAttribute("src",classif[i].team.crestUrl);
        logo.classList.add("imagen")

        let Posicion = document.createElement("td");
        Posicion.innerHTML =classif[i].position

        
    

        let resultadosclasi = [pj, logo, equipo, v, e, lost, gf, gc, dg, pts];
        for (let j = 0; j < resultadosclasi.length ; j++) {
            const columna = document.createElement("td")
            columna.append(resultadosclasi[j]);
            fila.appendChild(columna);


            cuerpoclassif.appendChild(fila);
        }

    }    


};
