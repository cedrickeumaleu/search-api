const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table-results");

let dataArray;
//recupération des datas dans l'Api
async function getUsers() {
  const res = await fetch("https://randomuser.me/api/?nat=fr&results=50");
  //destrusturing de mon resultat fetch
  const { results } = await res.json();
  dataArray = orderList(results);
  createUserList(dataArray);
}
getUsers();

// function de tri qui retourne mon tableau
// par ordre alphabétique
function orderList(data) {
  const orderedData = data.sort((a, b) => {
    if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
      return -1;
    }
    if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return orderedData;
}

//function pour afficher les résultats
function createUserList(data) {
  data.forEach((user) => {
    const listItem = document.createElement("div");
    listItem.setAttribute("class", "table-item");
    listItem.innerHTML = `
    <div class="container-img">
      <img src=${user.picture.medium}>
      <p class="name">${user.name.last} ${user.name.first} </p>
    </div>
      <p class="emai">${user.email}</p>
      <p class="phone">${user.phone}</p>`;

    searchResult.appendChild(listItem);
  });
}

// filtre des résultats dans la bar de recherche
searchInput.addEventListener("input", filterData);
function filterData(e) {
  searchResult.innerHTML = "";
  //voir ce que l'on cherche dans une variable
  //suprimer les vides ou space .replace(/\s/g, "")
  const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");
  console.log(e);
  // filtre le tableau
  const filteredArr = dataArray.filter(
    (el) =>
      el.name.first.toLowerCase().includes(searchedString) ||
      el.name.last.toLowerCase().includes(searchedString) ||
      `${el.name.last + el.name.first}`
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(searchedString) ||
      `${el.name.first + el.name.last}`
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(searchedString)
  );

  //retourne l'affichage avec le nouveau tableau
  createUserList(filteredArr);
}
// includes  (vériffier un element dans le tableau et revoir si c'est true)
// replace(/\s/g, "") permet de vider les spaces dans la recherche
