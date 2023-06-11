// get modal for editing
var modal = document.getElementById("myModal");

// Calls dom query to find close button on modal
const cancelBtnFunction = () => {
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function () { modal.style.display = "none" };
}

const successMsg = (text) => {
    modal.innerHTML = successHtml(text);
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function () { document.location.reload() };
}

const failedMsg = (text) => {
    modal.innerHTML = failHtml(text);
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function () { document.location.reload() };
}

function fixCapAndHyph (string) {

    if (string.includes("_") ){
        const array = string.split("_")
        for (let i = 0; i < array.length; i++) {
            array[i]= array[i].charAt(0).toUpperCase() + array[i].slice(1);
        }
        const fixedArray = array.join(" ")
        return fixedArray
    } else if (string === "actionfigure" ) {
        return "Action Figure"
    } else {
        const fixed = string.charAt(0).toUpperCase() + string.slice(1)
        return fixed
    }
}

const errorHandling = async (data) => {
    try {
        const errorType = data.errors[0].type

        switch(errorType) {
            case "notNull Violation":
                failedMsg(`${fixCapAndHyph(data.errors[0].path)} cannot be empty!`)
                break;
            case "unique violation":
                failedMsg("This item is already in your collection!")
                break;

    }
        } catch (err) {
        console.log(err)
    }
}

const defCollObj = {
    name: "Collection name", 
    collection_type: "",
    description: "Describe your collection",
    image: ""
}

const defFigureObj = {
    name: "Figure Name",
    line: "Eg: G.I. Joe",
    series: "Eg: Series 1",
    manufacturer: "Eg: Kenner",
    release_year: "",
    barcode: "",
    condition: "Eg: 9.0, Fine",
    price: "",
    image: ""
}

const defCardObj = {
    name: "Eg: Black Lotus, Charizard",
    release_year: "",
    series: "Eg: Series 1",
    set: "",
    subtype: "",
    holographic: false,
    manufacturer: "Eg: Kenner",
    condition: "Eg: 9.0, Fine",
    price: "",
    image: ""
}

const defCoinObj = {
    denomination: "Eg: penny, $5",
    country: "Country of Origin",
    time_period: "Eg: 1935, Colonial",
    coin_finish: "Eg: Circulated, Proof",
    mint_mark: "Eg: P, A, D",
    design_theme: "Eg: Sacagawea, Liberty",
    artist: "",
    condition: "9.0, Fine",
    price: "",
    image: ""
}

const defMusicObj = {
    album_name: "",
    artist: "Artist/Band Name",
    genre: "Eg: Rock",
    style: "Eg: Grunge, Heavy Metal",
    release_year: "",
    format: "Vinyl, CD, Cassette",
    pressing_info: "1 of 300",
    barcode: "",
    condition: "Eg: 9.0, Fine",
    price: "",
    image: ""
}


const getPlaceText = (type, field) => {
    switch(type) {
        case "collection":
            return defCollObj[field]
            break;
        case "actionfigure":
            return defFigureObj[field]
            break;
        case "card":
            return defCardObj[field]
            break;
        case "coin":
            return defCoinObj[field]
            break;
        case "music":
            return defMusicObj[field]
            break;
}}

const genItemModal = (obj, itemType) => {
    // sets modal's html to item for population of elements
    modal.innerHTML = itemHtml

    // gets the container for the data from the modal
    const dataCont = document.querySelector("#data-cont")

    if(itemType === "collection"){
        collTypeSelect = collectionSelectHtml;
        dataCont.innerHTML += collTypeSelect;
    } 

    // for each field in the object, populate the modal with saved info
    for (const field in obj){
        // avoids fields that will not be seen or have different html 
        if (field !== "id" && field !== "user_id" && field !== "createdAt" && field !== "updatedAt" && field !== "image" && field !== "holographic" && field !== "collection_type") {
            // if the field is empty, add empty string
            if(obj[field] === null){
            // dataUpdEl function from modal.js, populates html with needed data from db object
            const itemEl = dataUpdEl(field, "", itemType);
            // add generated html for the item to the data container
            dataCont.innerHTML += itemEl;
            } else {
            const itemEl = dataUpdEl(field, obj[field], itemType);
            dataCont.innerHTML += itemEl;
            }
        // if the field is holographic or image, grab the appropriate html from the modal.js
        } else if (field === "holographic"){
            // holographicEl function called from modal.js
            const holographicElHtml = holographicEl(obj[field]);
            dataCont.innerHTML += holographicElHtml;
        } else if (field === 'image'){
            const imageElHtml = imageEl();
            dataCont.innerHTML += imageElHtml;
        } 
    }

    cancelBtnFunction();
}

const createItemObj = () => {
            // get all inputs from the Modal
            const inputs = document.getElementsByClassName("input-holder")
            // create empty object to be sent in PUT method
            const obj = {}
    
            // object created from input id as key and value as obj field value
            for (let i = 0; i < inputs.length; i++){
                const key = inputs[i].id
                const value = inputs[i].value.trim() || null
                obj[key] = value;
            }

            return obj;
}

const dataUpdEl = (field, value, type) => {  return `
<div class="flex flex-row w-full justify-between">
    <label class="mt-2 ps-2 pt-1 font-bold text-lg" for="${field}">${fixCapAndHyph(field)}:</label>
    <input class="input-holder w-52 m-2 p-1.5 rounded-lg" id="${field}" type="text" value="${value}" placeholder="${getPlaceText(type, field)}"> 
</div>
`
} 

const imageEl = () => {  return `
<div class="flex flex-row w-full justify-between">
    <label class="ps-2 mt-3 font-bold text-lg" for="photo-input-el">Upload Image:</label>
    <input class="w-52 m-2 p-1.5 rounded-lg" id="photo-input-el" type="file" accept="image/png, image/jpeg, image/jpg"> 
</div>
`
} 

const holographicEl = (defValue) => { return `
<div class="flex flex-row w-full justify-between items-center mt-3 mb-3">
        <label class="ps-2 pb-2 font-bold text-lg" for="holographic">Holographic:</label>
    <div class="flex ms-3 me-8 flex-row w-full justify-start items-center">
        <select class="input-holder ms-2 py-1 px-3 rounded-lg" id="holographic" name="type-select" value="${defValue}">
            <option value="true">True</option>
            <option value="false">False</option>
        </select> 
    </div>
</div>
`
}

const failHtml = (text) => {
    return `
<div class="bg-indigo-400 m-5">
    <p class="px-3 pt-3 text-center text-white text-2xl font-extrabold">
        <span class="text-emerald-300">Bummer!</span>
        <br>
        ${text} 
    </p>
<div class="flex justify-center">
    <button id="close" type="button" class="m-4 border-2 border-black bg-indigo-500 rounded-lg text-white text-xl px-1 ms3">Cool!</button>
</div>
</div>
`}

const successHtml = (text) => {
    return `
<div class="bg-indigo-400 m-5">
<p class="px-3 pt-3 text-center text-white text-2xl font-extrabold">
    <span class="text-emerald-300">Tubular!</span>
    <br>
    ${text}
</p>
<div class="flex justify-center">
    <button id="close" type="button" class="m-4 border-2 border-black bg-indigo-500 rounded-lg text-white text-xl px-1 ms3">Cool!</button>
</div>
</div>
`}

const itemHtml = `
<div class="modal-content">
<div class="bg-indigo-600">
    <h2 id="modal-title" class="py-3 text-center text-white text-2xl font-extrabold"></h2>
</div>
<form id="item-form" class="flex flex-col items-start p-4">
    <div id="data-cont">
    </div>
    <div class="flex w-full justify-center mt-7">
        <button id="update-btn" type="button" class="border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1">Update</button>
        <button id="close" type="button" class="border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1 ms-4">Cancel</button>
        <button id="delete-btn" type="button" class="border-2 border-white bg-rose-600 rounded-lg text-white text-lg p-1.5 ms-4 hover:bg-rose-500 transition duration-400 hover:scale-110"></button>
    </div>
</form>
</div>        
`

const collectionSelectHtml = `
<div id="collect-select" class="mt-3 flex flex-row w-full justify-between items-center">
    <label class="ps-2 pb-3 font-bold text-lg" for="collection_type"> Type:</label>
    <select class="input-holder w-52 p-1.5 me-2 mb-2 rounded-lg" id="collection_type" name="type-select">
        <option value="Action Figure">Action Figure</option>
        <option value="Card">Card</option>
        <option value="Coin">Coin</option>
        <option value="Music">Music</option>
    </select> 
</div>
`

const updateCollectionHtml = `
<div class="modal-content">
    <div class="bg-indigo-600">
        <h2 class="py-3 text-center text-white text-2xl font-extrabold">Update Collection Entry</h2>
    </div>
    <form id="update-collection-form" class="flex flex-col items-start p-4">
        <div class="flex flex-row w-full justify-between">
            <label class="ps-2 pt-1 font-bold text-lg" for="up-name">Collection Name:</label>
            <input class="w-52 m-2 p-1.5 rounded-lg" id="up-name" type="required" placeholder="Enter name here"> 
        </div>
        <div class="flex flex-row w-full justify-between">
        <label class="ps-2 pt-1 font-bold text-lg" for="description">Description:</label>
        <textarea class="w-52 m-2 p-1.5 rounded-lg" id="description" placeholder="Describe your collection"> </textarea>
        </div>
        <div class="flex flex-row w-full justify-between">
            <label class="ps-2 pt-1 font-bold text-lg" for="photo-input-el">Select Image</label>
            <input class="w-52 m-2 p-1.5 rounded-lg" id="photo-input-el" type="file" accept="image/png, image/jpeg, image/jpg"> 
        </div>
        <div class="flex w-full justify-center mt-7">
            <input class="cursor-pointer border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1 px-2 me-3" type="submit">
            <button id="close" type="button" class="border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1">Cancel</button>
            <button id="delete-coll-btn" type="button" class="border-2 bg-rose-500 hover:bg-rose-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1 ms-3">Delete</button>
        </div>
    </form>
</div>
`

const addToCollectionHtml = `
<div class="bg-indigo-400 p-8 m-4 rounded-lg">
    <p class="px-3 pt-3 m-4 text-center text-white text-2xl font-extrabold">
        <span class="text-white">Add to which collection?</span>
    </p>
    <form id="add-to-coll-form">
        <div class="flex mt-3 flex-row w-full justify-center">
                <select id="coll-select" class = "w-52 m-2 p-1.5 rounded-lg" name="type-select">

                </select> 
            </div>
        <div class="mt-4 flex justify-center items-center">
        <input id="submit" type="submit" class="cursor-pointer border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1 px-2 me-3"">
        <button id="close" type="button" class="border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1 ms3">Cancel</button>
    </form>
    </div>
</div>
`

const collectibleTypeHtml = `
<div class="modal-content">
<div class="bg-indigo-600">
    <h2 class="py-3 text-center text-white text-2xl font-extrabold">New Coolectible</h2>
</div>
<form id="coll-type-form" class="flex flex-col items-start p-4">
    <div class="pt-3 mt-2">
    <label class="ps-2 pe-2 font-bold text-lg" for="type-box">Coolectible Type:</label>
    <select class="me-3 p-1.5 rounded-lg" id="coll-types" name="type-select">
        <option value="actionfigure">Action Figure</option>
        <option value="card">Card</option>
        <option value="coin">Coin</option>
        <option value="music">Music</option>
    </select>
    </div>
    <div class="flex w-full justify-center mt-7">
    <button id="next-btn" type="button" class="border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white px-4 py-1.5 me-3">Next</button>
    <button id="close" type="button" class="border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white px-4 py-1.5 ms-3">Cancel</button>
    </div>
</form>
</div>
`