import { GetCountriesByContinent, busqueda, orderAZ, orderZA,GetCountriesBySubregion} from './data.js';
import data from './data/countries/countries.js';

const root =document.getElementById('root');
const dataCountries = data.countries;
/**************Creacion de cartas****************/
const showCards =(data)=>{
  root.innerHTML="";
  for (let i = 0; i< data.length; i++){
    const card = document.createElement ('div');
    card.className= 'card';
    card.id = data[i].name.common;
    card.innerHTML= ` 
    <img src=${data[i].flags.png}>
    <h2>${data[i].name.common}</h2>
    `
    root.appendChild(card);
    /**********Seleccion de cartas para Modal********/
    card.addEventListener('click', (e) => {
      e.preventDefault();         
      showModal(data[i])        
    });  
  }
}
showCards(dataCountries)
/**************Busqueda por pais****************/
const input = document.getElementById('Buscar');
const searchButton = document.querySelector('#boton');

searchButton.addEventListener('click',function(){
  const valor= input.value.toLowerCase();
  const resultado = busqueda(dataCountries,valor);

  if (resultado.length === 0 || valor.length === 0){
    alert('Pais no encontrado')
  } else{
    showCards(resultado);
  }
});
/**********Creacion de ventana Modal****************/
const showModal = (dataCountry) => {
  const modal = document.createElement("div")
  modal.innerHTML = `
  <section class="modal">
  <div class="modal_container">
  <ul class="modal_lista"></ul>
  <a href="a" class="modal_close_button"> Cerrar</a>
  <img src=${dataCountry.flags.png}>
  <h2 name="Nombre_de_pais" id="informacion">${dataCountry.name.common}</h2>
  <li name="Nombre_de_pais_oficial" id="informacion">Official Country Name: ${dataCountry.name.official}</li>
  <li name="Capital" id="informacion">Capital: ${dataCountry.capital}</li>
  <li name="Continente" id="informacion">Continent: ${dataCountry.continents}</li>
  <li name="Subregion" id="informacion">Subregion: ${dataCountry.subregion}</li>
  <li name="Idioma" id="informacion">Language: ${dataCountry.languages.spa}</li>
  <li name="Paises_limitantes">Neighboring countries: ${dataCountry.borders}</li>
  <li name="Poblacion_total">Population: ${dataCountry.population}</li>
  <li name="Area_total">Area: ${dataCountry.area}</li>
  </div> 
  </section> 
  `
  root.appendChild(modal)

  const closeModalButton = document.querySelector('.modal_close_button');
  closeModalButton.addEventListener('click', (e) => {
    e.preventDefault();         
    modal.remove();       
  });
}

/****Filtrado por continentes****/
let countriesContinent = [];
let subregionCheckboxes = [];
const selectContinent = document.getElementById('continent-select');

selectContinent.addEventListener('change', function() {
  const selectedContinent = selectContinent.value;
  countriesContinent = GetCountriesByContinent(dataCountries, selectedContinent);
  showCards(countriesContinent); 
  
  /****Checkbox por subregion****/
  const filterSubregion = countriesContinent.map(country => country.subregion);
  const subregionByContinent = filterSubregion.filter((subregion,index) => filterSubregion.indexOf(subregion) === index);
  subregionCheckboxes = document.getElementById('subregion-checkboxes');
  subregionCheckboxes.innerHTML = '';

  subregionByContinent.forEach(subregion => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'subregion-checkbox';
    checkbox.value = subregion;
    const label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(subregion));
    subregionCheckboxes.appendChild(label);
    subregionCheckboxes.appendChild(document.createElement('br'));
    /****Seleccion de un solo checkbox por subregion****/
    checkbox.addEventListener('change',function(){
      const checkboxes = subregionCheckboxes.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(cb => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
  
      const selectedSubregion = GetCountriesBySubregion(dataCountries,subregion)
      showCards(selectedSubregion);
    });
  });
  const selectOrder = document.getElementById('order-select');
  selectOrder.selectedIndex = 0;
});

const selectOrder = document.getElementById('order-select');

selectOrder.addEventListener('change', function() {
  const selectedOrder = selectOrder.value;
  if(selectedOrder === 'a-z'){
    showCards(orderAZ(countriesContinent)); 
  }
  else{
    showCards(orderZA(countriesContinent));
  }
});

/***Funcionalidad al boton Inicio */
const inicio =document.getElementById('Inicio');
inicio.addEventListener("click",function(){
  subregionCheckboxes.innerHTML = '';
  showCards(dataCountries);
});

/**Calculo agregado */
const buttonStatistics = document.getElementById('Estadisticas');
buttonStatistics.addEventListener("click", function(){ 
  root.innerHTML= " ";

  const table = document.createElement('table');
  table.setAttribute('border','5');
  table.setAttribute('class','style_table')
  
  // Crear una fila de encabezado
  let headerRow = document.createElement("tr");

  // Crear celdas de encabezado
  let headerCell1 = document.createElement("th");
  headerCell1.textContent = "CONTINETS";

  let headerCell2 = document.createElement("th");
  headerCell2.textContent = "AREA (km)" ;

  let headerCell3 = document.createElement("th");
  headerCell3.textContent = "PERCENTAGE (%)" ;

  // Agregar las celdas de encabezado a la fila de encabezado
  headerRow.appendChild(headerCell1);
  headerRow.appendChild(headerCell2);
  headerRow.appendChild(headerCell3);

  // Agregar la fila de encabezado a la tabla
  table.appendChild(headerRow);

  // Crear una fila de datos
  //Agregamos fila1
  let newRow1 = table.insertRow();
  let cellAmerica = newRow1.insertCell();
  cellAmerica.textContent = "America";
  const contAmerica = GetCountriesByContinent (dataCountries,"America");
  const TotalAreaAmerica = contAmerica .reduce((total,country)=> total +(country.area ||0), 0);
  const TotalAreasContinent = dataCountries.reduce((total,country)=> total +(country.area ||0), 0);

  let cellAreaAm = newRow1.insertCell();
  cellAreaAm.textContent = TotalAreaAmerica;
  let cellPercentAm = newRow1.insertCell();
  cellPercentAm.textContent=((TotalAreaAmerica/TotalAreasContinent)*100).toFixed(2);
  
 // Agregar fila 2
  let newRow2 = table.insertRow();
  let cellAfrica = newRow2.insertCell();
  cellAfrica.textContent = "Africa";
  const contAfrica = GetCountriesByContinent (dataCountries,"Africa");
  const TotalAreaAfrica = contAfrica .reduce((total,country)=> total +(country.area ||0), 0);
  
  let cellAreaAfr = newRow2.insertCell();
  cellAreaAfr.textContent = TotalAreaAfrica;
  let cellPercentAfrica = newRow2.insertCell();
  cellPercentAfrica.textContent=((TotalAreaAfrica/TotalAreasContinent)*100).toFixed(2);

 //Agregamos fila3
  let newRow3 = table.insertRow();
  let cellAsia= newRow3.insertCell();
  cellAsia.textContent = "Asia";
  const contAsia = GetCountriesByContinent (dataCountries,"Asia");
  const TotalAreaAsia= contAsia .reduce((total,country)=> total +(country.area ||0), 0);
 
  let cellAreaAsia = newRow3.insertCell();
  cellAreaAsia.textContent = TotalAreaAsia;
  let cellPercentAsia = newRow3.insertCell();
  cellPercentAsia.textContent=((TotalAreaAsia/TotalAreasContinent)*100).toFixed(2);

 // Agregar fila 4
  let newRow4 = table.insertRow();
  let cellEurope = newRow4.insertCell();
  cellEurope.textContent = "Europe";
  const contEurope = GetCountriesByContinent (dataCountries,"Europe");
  const TotalAreaEurope = contEurope .reduce((total,country)=> total +(country.area ||0), 0);

  let cellAreaEurope = newRow4.insertCell();
  cellAreaEurope.textContent = TotalAreaEurope;
  let cellPercentEurope = newRow4.insertCell();
  cellPercentEurope.textContent=((TotalAreaEurope/TotalAreasContinent)*100).toFixed(2);
 
 // Agregar fila 5
  let newRow5 = table.insertRow();
  let cellAntartica = newRow5.insertCell();
  cellAntartica.textContent = "Antartica";
  const contAntarctica = GetCountriesByContinent (dataCountries,"Antarctica");
  const TotalAreaAntarctica = contAntarctica .reduce((total,country)=> total +(country.area ||0), 0);

  let cellAreaAntartica = newRow5.insertCell();
  cellAreaAntartica.textContent = TotalAreaAntarctica;
  let cellPercentAntartica = newRow5.insertCell();
  cellPercentAntartica.textContent=((TotalAreaAntarctica/TotalAreasContinent)*100).toFixed(2);

 // Agregar fila 6
  let newRow6 = table.insertRow();
  let cellOceania = newRow6.insertCell();
  cellOceania.textContent = 'Oceania';
  const contOceania = GetCountriesByContinent (dataCountries,"Oceania");
  const TotalAreaOceania = contOceania .reduce((total,country)=> total +(country.area ||0), 0);

  let cellAreaOceania = newRow6.insertCell();
  cellAreaOceania.textContent = TotalAreaOceania;
  let cellPercentOceania = newRow6.insertCell();
  cellPercentOceania.textContent=((TotalAreaOceania/TotalAreasContinent)*100).toFixed(2);

 // Agregar fila 7
  let newRow7 = table.insertRow();
  let cellTotal = newRow7.insertCell();
  cellTotal.textContent = 'TOTAL';
 
  let cellAreaTotal = newRow7.insertCell();
  cellAreaTotal.textContent = TotalAreasContinent;

 root.appendChild(table);

 ///***  Tabla2 - calculo agregado de población**/
 
 const table1 = document.createElement('table');
  table1.setAttribute('border','5');
  table1.setAttribute('class','style_table1')
  
  // Crear una fila de encabezado
  let headerRow1 = document.createElement("tr");

  // Crear celdas de encabezado
  let headerCellA = document.createElement("th");
  headerCellA.textContent = "CONTINETS";

  let headerCellB = document.createElement("th");
  headerCellB.textContent = "POPULATION (hab)" ;

  let headerCellC = document.createElement("th");
  headerCellC.textContent = "PERCENTAGE (%)" ;

  // Agregar las celdas de encabezado a la fila de encabezado
  headerRow1.appendChild(headerCellA);
  headerRow1.appendChild(headerCellB);
  headerRow1.appendChild(headerCellC);

  // Agregar la fila de encabezado a la tabla
  table1.appendChild(headerRow1);

  // Crear una fila de datos
  //Agregamos fila1
  let newRowA = table1.insertRow();
  let cellAmerica1 = newRowA.insertCell();
  cellAmerica1.textContent = "America";
  
  const TotalPopulationAmerica = contAmerica .reduce((total,country)=> total +(country.population ||0), 0);
  const TotalPopulationContinent = dataCountries.reduce((total,country)=> total +(country.population ||0), 0);
  
  let cellPopulationAm = newRowA.insertCell();
  cellPopulationAm.textContent =  TotalPopulationAmerica;
  let cellPercentPopulationAm = newRowA.insertCell();
  cellPercentPopulationAm.textContent=((TotalPopulationAmerica/ TotalPopulationContinent)*100).toFixed(2);
  
  //Agregamos fila2
  let newRowB = table1.insertRow();
  let cellAfrica1 = newRowB.insertCell();
  cellAfrica1.textContent = "Africa";
  
  const TotalPopulationAfrica = contAfrica .reduce((total,country)=> total +(country.population ||0), 0);
    
  let cellPopulationAfrica = newRowB.insertCell();
  cellPopulationAfrica.textContent =  TotalPopulationAfrica;
  let cellPercentPopulationAfrica = newRowB.insertCell();
  cellPercentPopulationAfrica.textContent=((TotalPopulationAfrica/ TotalPopulationContinent)*100).toFixed(2);
  
  //Agregamos fila3
  let newRowC = table1.insertRow();
  let cellAsia1 = newRowC.insertCell();
  cellAsia1.textContent = "Asia";
  
  const TotalPopulationAsia = contAsia .reduce((total,country)=> total +(country.population ||0), 0);
    
  let cellPopulationAsia = newRowC.insertCell();
  cellPopulationAsia.textContent =  TotalPopulationAsia;
  let cellPercentPopulationAsia = newRowC.insertCell();
  cellPercentPopulationAsia.textContent=((TotalPopulationAsia/ TotalPopulationContinent)*100).toFixed(2);
  
  //Agregamos fila4
  let newRowD = table1.insertRow();
  let cellEurope1 = newRowD.insertCell();
  cellEurope1.textContent = "Europe";
  
  const TotalPopulationEurope = contEurope .reduce((total,country)=> total +(country.population ||0), 0);
    
  let cellPopulationEurope = newRowD.insertCell();
  cellPopulationEurope.textContent =  TotalPopulationEurope;
  let cellPercentPopulationEurope = newRowD.insertCell();
  cellPercentPopulationEurope.textContent=((TotalPopulationEurope/ TotalPopulationContinent)*100).toFixed(2);
  
  //Agregamos fila5
  let newRowE = table1.insertRow();
  let cellAntarctica1 = newRowE.insertCell();
  cellAntarctica1.textContent = "Antarctica";
  
  const TotalPopulationAntarctica = contAntarctica .reduce((total,country)=> total +(country.population ||0), 0);
    
  let cellPopulationAntarctica = newRowE.insertCell();
  cellPopulationAntarctica.textContent =  TotalPopulationAntarctica;
  let cellPercentPopulationAntarctica = newRowE.insertCell();
  cellPercentPopulationAntarctica.textContent=((TotalPopulationAntarctica/ TotalPopulationContinent)*100).toFixed(2);
  
  //Agregamos fila6
  let newRowF = table1.insertRow();
  let cellOceania1 = newRowF.insertCell();
  cellOceania1.textContent = "Oceania";
  
  const TotalPopulationOceania = contOceania.reduce((total,country)=> total +(country.population ||0), 0);
    
  let cellPopulationOceania = newRowF.insertCell();
  cellPopulationOceania.textContent =  TotalPopulationOceania;
  let cellPercentPopulationOceania = newRowF.insertCell();
  cellPercentPopulationOceania.textContent=((TotalPopulationOceania/ TotalPopulationContinent)*100).toFixed(2);
  
  //Agregamos fila7
  let newRowG = table1.insertRow();
  let cellTotalPop = newRowG.insertCell();
  cellTotalPop.textContent = "TOTAL";
  
  let cellPopulationTotal = newRowG.insertCell();
  cellPopulationTotal.textContent =  TotalPopulationContinent;
  
  root.appendChild(table1);
});

