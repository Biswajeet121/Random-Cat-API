const key = "live_P24qvbz3apAYHdgXyuKfJaifGC48eYqil8pgv43rF9G5TyMUMtK5gWHz4zBYUb5s";

const gallery = document.getElementById("gallery");
const loadmore = document.getElementById("loadmore");
const breedselect = document.getElementById("breedselect");

function fetchCats(breed = "") {
    gallery.innerHTML = "";
    fetch(`https://api.thecatapi.com/v1/images/search?limit=6&size=small&breed_ids=${breed}`, {
        headers: { "x-api-key": key }
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(cat => {
            let img = document.createElement("img");
            img.src = cat.url;
            gallery.appendChild(img);
        });
    });
}

function fetchBreeds() {
    fetch("https://api.thecatapi.com/v1/breeds", { headers: { "x-api-key": key } })
    .then(res => res.json())
    .then(data => {
        data.forEach(breed => {
            let option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.name;
            breedselect.appendChild(option);
        });
    });
}

loadmore.onclick = () => fetchCats(breedselect.value);
breedselect.onchange = () => fetchCats(breedselect.value);

fetchBreeds();
fetchCats();

