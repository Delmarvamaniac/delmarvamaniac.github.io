// if local storage has been cleared, or no houses have been stored yet,
// fetch them from json file and put in local storage
if (!localStorage.hasOwnProperty("houses")) {
    fetch('houses.json')
    .then((response) => response.json())
    .then((json) => {
        localStorage.setItem("houses", JSON.stringify(json.houses));
    });
}