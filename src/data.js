
/*************Filtro por continente***************/
export const GetCountriesByContinent= (countries, continent) => {
  const filterContinents= countries.filter((item) => item.continents[0] === continent);
  order(filterContinents,'a-z')
  return filterContinents
};

/*************Busqueda por pais*****************/
export const busqueda = (countries,valor) => {
  return countries.filter((item) => item.name.common.toLowerCase().startsWith(valor));
};

/*************Ordenar de la A-Z***************/
export const order = (countries, select) => {
  return countries.sort((a, b) => {
    const nameA = a.name.common.toUpperCase();
    const nameB = b.name.common.toUpperCase();
    if (select === 'a-z') {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    } else if (select === 'z-a') {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    }
  });
};




/*************Filtro por subregion***************/
export const GetCountriesBySubregion= (countries, subregion) => {
  const filterSubregion= countries.filter((item) => item.subregion === subregion);
  order(filterSubregion,'a-z')
  return filterSubregion
};

