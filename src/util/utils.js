export const convertDateWithLongMonth = (date) => {
  if (!date) return null;
  const formattedDate = new Date(`${date[0]}-${date[1]}-${date[2]}`);
  return `${formattedDate.toLocaleString('default', { month: 'long' })} ${date[1]}, ${date[0]}`
};

export const convertDateWithBreaksUS = (date) => {
  if (!date) return null;
  return `${date[1]}/${date[2]}/${date[0]}`
};

export const getPublicURL = () => {
  return 'localhost:3000'
};

export const sortItems = (sortMethod) => {
  switch (sortMethod) {
    case ("name_asc"): {
      return function(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
    }

    case ("name_desc"): {
      return function(a, b) {
        if (a.name < b.name) return 1;

        if (a.name > b.name) return -1;
        return 0;
      }
    }

    case ("date_desc"): {
      return function(a, b) {
        const formattedDateA = new Date(`${a.uploadDate[0]}-${a.uploadDate[1]}-${a.uploadDate[2]}`);
        const formattedDateB = new Date(`${b.uploadDate[0]}-${b.uploadDate[1]}-${b.uploadDate[2]}`);
        if (formattedDateA < formattedDateB) return 1;
        if (formattedDateA > formattedDateB) return -1;
        return 0;
      }
    }

    case ("date_asc"): {
      return function(a, b) {
        const formattedDateA = new Date(`${a.uploadDate[0]}-${a.uploadDate[1]}-${a.uploadDate[2]}`);
        const formattedDateB = new Date(`${b.uploadDate[0]}-${b.uploadDate[1]}-${b.uploadDate[2]}`);
        if (formattedDateA < formattedDateB) return -1;
        if (formattedDateA > formattedDateB) return 1;
        return 0;
      }
    }

    default:
      return '';
  }
}
