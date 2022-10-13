let pokeColumns = document.querySelector(".columns");
let leftColumn = document.querySelector(".left");
let infoMoveButtons = document.querySelectorAll(".info-move");
let pokeName = document.querySelector(".name");
let pokeImage = document.querySelector(".img-wrapper img");
let infoBlock = document.querySelector(".info-block");
let movesBlock = document.querySelector(".moves-block");
let pokeMove = document.querySelector(".move");
let pokeType = document.querySelector(".type");
let pokeHeight = document.querySelector(".height");
let pokeWeight = document.querySelector(".weight");
let pokeHP = document.querySelector(".hp")
let pokeAttack = document.querySelector(".attack")
let pokeDefense = document.querySelector(".defense")
let pokeSpecialAttack = document.querySelector(".special-attack")
let pokeSpecialDefense = document.querySelector(".special-defense")
let pokeSpeed = document.querySelector(".speed");
let prevNextButtons = document.querySelectorAll(".arrow");
let pokeTypes = document.querySelector(".types");
let buttonValue = 1;


let types = {
    normal: "A8A77A",
fire: "EE8130",
water: "6390F0",
electric: "F7D02C",
grass: "7AC74C",
ice: "96D9D6",
fighting: "C22E28",
poison: "A33EA1",
ground: "E2BF65",
flying: "A98FF3",
psychic: "F95587",
bug: "A6B91A",
rock: "B6A136",
ghost: "735797",
dragon: "6F35FC",
dark: "705746",
steel: "B7B7CE",
fairy: "D685AD",
}

async function getPokeData(){
    let pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${buttonValue}`);
    let data = await pokeData.json();
    showInfo(data)
}

prevNextButtons.forEach((button) => {
    button.addEventListener("click", async() => {
        if(button.classList.contains("prev")){
            buttonValue--;
            if(buttonValue < 1){
                buttonValue = 1;
            }
        }
        if(button.classList.contains("next")){
            buttonValue++;
            if(buttonValue > 800){
                buttonValue = 800;
            }
        }
        console.log(buttonValue, "button")
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${buttonValue}`);
        let data = await response.json();
        showInfo(data);
    })
})

function showInfo(data){
    console.log(data)
    pokeName.textContent = data.name;
    pokeImage.src = data.sprites.other["official-artwork"].front_default;
    pokeHeight.textContent = data.height;
    pokeWeight.textContent = data.weight;
    pokeHP.textContent = data.stats[0].base_stat;
    pokeAttack.textContent = data.stats[1].base_stat;
    pokeDefense.textContent = data.stats[2].base_stat;
    pokeSpecialAttack.textContent = data.stats[3].base_stat;
    pokeSpecialDefense.textContent = data.stats[4].base_stat;
    pokeSpeed.textContent = data.stats[5].base_stat;

    // grabbing all the moves
    let moves = data.moves;
    movesBlock.innerHTML = "";
    moves.forEach((move) => {
        let moveName = move.move.name;
        let newMove = document.createElement("p");
        newMove.textContent = moveName;
        movesBlock.appendChild(newMove);
    })



    // pokeType.textContent = data.types[0].type.name;
    // pokeType.style.backgroundColor = `#${types[data.types[0].type.name]}`;

    // grabbing all the types
    let pokeTypesData = data.types;
    pokeTypes.innerHTML = "";
    pokeTypesData.forEach((type) => {
        pokeTypes.innerHTML += `<span class="type" style="background-color: #${types[type.type.name]}">${type.type.name}</span>`;
    })
}   

infoMoveButtons.forEach((button) => {
    button.addEventListener("click", () => {
        infoMoveButtons.forEach((button) => {
            button.classList.remove("active");
        })
        button.classList.add("active");
        if(button.classList.contains("info")){
            infoBlock.style.display = "block";
            movesBlock.style.display = "none";
            document.querySelector(".info-move-name").textContent = "Info";
        } else{
            infoBlock.style.display = "none";
            movesBlock.style.display = "block";
            document.querySelector(".info-move-name").textContent = "Moves";
        }
    })
})

window.addEventListener("load", getPokeData);



















// pokeData.then((data) => {
//     console.log(data)
//     pokeColumns.innerHTML = `

//     <div class="left">
//         <div class="img-wrapper">
//             <img src="${data.sprites.front_default}" alt="${data.name}">
//         </div>
//         <h2 class="name">${data.name}</h2>
//         <h4>Types: 
//             <span class="type" style="background-color: #${types[data.types[0].type.name]}">${data.types[0].type.name}</span>
//         </h4>
//         <div class="icons-wrapper">
//             <p id="normal"></p> 
//             <div class="buttons-wrapper">
//                 <button class="arrow" id="prev"><</button>
//                 <button class="arrow" id="next">></button>
//             </div>
//         </div>
       
       
//     </div>
//     <div class="right">
//         <h2>Info</h2>
//         <div id="info-block">
//             <p>height: <span class="height">${data.height}m</span></p>
//             <p>weight: <span class="weight">${data.weight}kg</span></p>
//             <p>hp: <span class="hp">${data.stats[0].base_stat}</span></p>
//             <p>attack: <span class="attack">${data.stats[1].base_stat}</span></p>
//             <p>defense: <span class="defense">${data.stats[2].base_stat}</span></p>
//             <p>special-attack: <span class="special-attack">${data.stats[3].base_stat}</span></p>
//                 <p>special-defense: <span class="special-defense">${data.stats[4].base_stat}</span></p>
//                 <p>speed: <span class="speed">${data.stats[5].base_stat}</span></p>
//         </div>
//         <div class="buttons-wrapper">
//             <button class="info-move active" id="info">Info</button>
//             <button class="info-move" id="moves">Moves</button>
//         </div>
//     </div>
//     `
   
// })