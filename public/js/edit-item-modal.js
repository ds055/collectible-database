const editBtns = document.getElementsByClassName("edit-btn")
var modal = document.getElementById("myModal");

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Calls dom query to find close button on modal
const cancelBtnFunction = () => {
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function () { modal.style.display = "none" };
}


const selectEditRoute = (number) => {
    const itemToEdit = editBtns[(number - 1)]
    const itemType = itemToEdit.dataset.type
    const itemID = itemToEdit.dataset.id;

    if (itemType === "figure") {
        figureEdit(number)
    } else if (itemToEdit === "coin") {

    } else if (itemToEdit === "card") {

    } else if (itemToEdit === "music") {

    }
}

// Get Modal Buttons
const getModalButtons = (delUrl) => {
    const updateBtn = document.getElementById("update-btn");
    const deleteBtn = document.getElementById("delete-btn");
    deleteBtn.onclick = function () { deletePath(delUrl) };
    return updateBtn;
}

/// Figure Options///
// Populate figure data and listen
const figureEdit = async (id) => {
    try {
        let rawData = await fetch(`/api/actionfigure/${id}`)
        let data = await rawData.json()

        modal.innerHTML = updateFigureHtml
        modal.style.display = "block"
        cancelBtnFunction()
        document.querySelector('#name').value = data.name
        document.querySelector('#line').value = data.line
        document.querySelector('#series').value = data.series
        document.querySelector('#manufacturer').value = data.manufacturer
        document.querySelector('#release_year').value = data.release_year
        document.querySelector('#barcode').value = data.barcode
        document.querySelector('#condition').value = data.condition
        document.querySelector('#price').value = data.price
        document.querySelector('#url').value = data.image
        const url = `/api/actionfigure/${id}`
        const updateBtn = getModalButtons(url)
        updateBtn.onclick = function () {
            const updObj = {
                name: document.querySelector('#name').value,
                line: document.querySelector('#line').value,
                series: document.querySelector('#series').value,
                manufacturer: document.querySelector('#manufacturer').value,
                release_year: document.querySelector('#release_year').value,
                barcode: document.querySelector('#barcode').value,
                condition: document.querySelector('#condition').value,
                price: document.querySelector('#price').value,
                image: document.querySelector('#url').value
            }
            updatePath(updObj, url)
        };


    } catch (error) {

    }
}

const deletePath = async (url) => {
    await fetch(`${url}`, {
        method: 'DELETE'
    });

    // send user back to dashboard after deletion
    document.location.reload();
}

const updatePath = async (obj, url) => {
    try {
        // Updated data
        await fetch(`${url}`, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // reload page
        document.location.reload();
    } catch (err) {
        console.log(err)
    }
}

// dynamically renders edit buttons
let init = () => {
    for (var i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener("click", (event) => {
            selectEditRoute(event.currentTarget.dataset.id);
        })
    }
}

const addSuccess = () => {
    modal.innerHTML = successHtml;
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function () { modal.style.display = "none" };
}

const addFailed = () => {
    modal.innerHTML = failedHtml;
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function () { modal.style.display = "none" };
}

const generatedFail = (msg) => {
    modal.innerHTML = generatedFailText(msg);
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function () { modal.style.display = "none" };
}

const generatedFailText = (text) => {
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
    `
}

// wait until everything dynamically loaded before trying to grab dom
document.addEventListener("load", init())

const updateFigureHtml = `
<div class="modal-content">
<div class="bg-indigo-600">
    <h2 class="py-3 text-center text-white text-2xl font-extrabold">New Action Figure</h2>
</div>
<form id="new-figure-form" class="flex flex-col items-start p-4">
    <div class="flex flex-row w-full justify-between">
        <label class="ps-2 font-bold text-lg" for="name">Name:</label>
        <input class="m-2" id="name" type="text" placeholder="Figure Name"> 
    </div>
    <div class="flex flex-row w-full justify-between">
        <label class="ps-2 font-bold text-lg" for="line">Line:</label>
        <input class="m-2" id="line" type="text" placeholder="Eg: G.I. Joe"> 
    </div>
    <div class="flex flex-row w-full justify-between">
        <label class="ps-2 font-bold text-lg" for="series">Series:</label>
        <input class="m-2" id="series" type="text" placeholder="Eg: Series 1"> 
    </div>
    <div class="flex flex-row w-full justify-between">
        <label class="ps-2 font-bold text-lg" for="manufacturer">Manufacturer:</label>
        <input class="m-2" id="manufacturer" type="text" placeholder="Eg: Kenner"> 
    </div>
    <div class="flex flex-row w-full justify-between">
        <label class="ps-2 font-bold text-lg" for="release_year">Release Year:</label>
        <input class="m-2" id="release_year" type="text" placeholder="Release Year"> 
    </div>
    <div class="flex flex-row w-full justify-between">
        <label class="ps-2 font-bold text-lg" for="barcode">Barcode:</label>
        <input class="m-2" id="barcode" type="text" placeholder="Barcode"> 
    </div>
    <div class="flex flex-row w-full justify-between">
        <label class="ps-2 font-bold text-lg" for="condition">Condition:</label>
        <input class="m-2" id="condition" type="text" placeholder="Eg: 9.0, Fine"> 
    </div>
    <div class="flex flex-row w-full justify-between">
        <label class="ps-2 font-bold text-lg" for="price">Price:</label>
        <input class="m-2" id="price" type="text" placeholder="Price"> 
    </div>
    <div class="flex flex-row w-full justify-between">
        <label class="ps-2 font-bold text-lg" for="url">Image URL:</label>
        <input class="m-2" id="url" type="text" placeholder="URL for Image"> 
    </div>
    <div class="flex w-full justify-around mt-7">
        <button id="update-btn" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Update</button>
        <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
        <button id="delete-btn" type="button" class="border-2 border-black bg-rose-500 rounded-lg text-white text-lg px-0.5 ms3">Delete</button>
    </div>
</form>
</div>        
`

const newMusicHtml = `
<div class="modal-content">
  <div class="bg-indigo-600">
      <h2 class="py-3 text-center text-white text-2xl font-extrabold">New Music Entry</h2>
  </div>
  <form id="new-music-form" class="flex flex-col items-start p-4">
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="album_name">Album Name:</label>
          <input class="m-2" id="album_name" type="text" placeholder="Album Name"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="artist">Artist:</label>
          <input class="m-2" id="artist" type="text" placeholder="Artist/Band Name"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="genre">Genre:</label>
          <input class="m-2" id="genre" type="text" placeholder="Eg: Rock"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="style">Style:</label>
          <input class="m-2" id="style" type="text" placeholder="Eg: Grunge, Heavy Metal"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="release_year">Release Year:</label>
          <input class="m-2" id="release_year" type="text" placeholder="Release Year"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="format">Format:</label>
          <input class="m-2" id="format" type="text" placeholder="Eg: Vinyl, Cassette"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="pressing_info">Pressing Info:</label>
          <input class="m-2" id="pressing_info" type="text" placeholder="Eg: 1 of 2000"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="barcode">Barcode:</label>
          <input class="m-2" id="barcode" type="text" placeholder="Barcode"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="condition">Condition:</label>
          <input class="m-2" id="condition" type="text" placeholder="Eg: 9.0, Fine"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="price">Price:</label>
          <input class="m-2" id="price" type="text" placeholder="Price"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="url">Image URL:</label>
          <input class="m-2" id="url" type="text" placeholder="URL for Image"> 
      </div>
      <div class="flex w-full justify-center mt-7">
          <input class="cursor-pointer border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 me-3" type="submit">
          <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
      </div>
  </form>
</div>  
`

const newCoinHtml = `
<div class="modal-content">
  <div class="bg-indigo-600">
      <h2 class="py-3 text-center text-white text-2xl font-extrabold">New Coin Entry</h2>
  </div>
  <form id="new-coin-form" class="flex flex-col items-start p-4">
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="denomination">Denomination:</label>
          <input class="m-2" id="denomination" type="text" placeholder="Eg: Penny, $5"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="country">Country:</label>
          <input class="m-2" id="country" type="text" placeholder="Country of origin"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="time_period">Time Period:</label>
          <input class="m-2" id="time_period" type="text" placeholder="Eg: 1935, Colonial"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="coin_finish">Coin Finish:</label>
          <input class="m-2" id="coin_finish" type="text" placeholder="Eg: Circulated, Proof"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="mint_mark">Mint Mark:</label>
          <input class="m-2" id="mint_mark" type="text" placeholder="Eg: P, A, D"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="design_theme">Design Theme:</label>
          <input class="m-2" id="design_theme" type="text" placeholder="Eg: Sacagawea, Liberty"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="artist">Artist:</label>
          <input class="m-2" id="artist" type="text" placeholder="Artist's Name"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="condition">Condition:</label>
          <input class="m-2" id="condition" type="text" placeholder="Eg: 9.0, Fine"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="price">Price:</label>
          <input class="m-2" id="price" type="text" placeholder="Price"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="url">Image URL:</label>
          <input class="m-2" id="url" type="text" placeholder="URL for Image"> 
      </div>
      <div class="flex w-full justify-center mt-7">
          <input class="cursor-pointer border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 me-3" type="submit">
          <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
      </div>
  </form>
</div>  
`

const newCardHtml = `
<div class="modal-content">
  <div class="bg-indigo-600">
      <h2 class="py-3 text-center text-white text-2xl font-extrabold">New Card Entry</h2>
  </div>
  <form id="new-card-form" class="flex flex-col items-start p-4">
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="name">Name:</label>
          <input class="m-2" id="name" type="text" placeholder="Eg: Black Lotus, Charizard"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="release_year">Release Year:</label>
          <input class="m-2" id="release_year" type="text" placeholder="Year Released"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="series">Series:</label>
          <input class="m-2" id="series" type="text" placeholder="Eg: Pokemon, MTG"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="set">Set:</label>
          <input class="m-2" id="set" type="text" placeholder="Eg: First Edition, International"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="subtype">Subtype:</label>
          <input class="m-2" id="subtype" type="text" placeholder="Eg: Item, Artifact, Resource"> 
      </div>
      <div class="flex flex-row w-full justify-between items-center">
          <label class="ps-2 pb-2 font-bold text-lg" for="holographic">Holographic:</label>
          <div class="flex ms-3 me-8 flex-row w-full justify-start items-center">
            <select class="ms-2" id="holographic" name="type-select">
              <option value="true">True</option>
              <option value="false">False</option>
            </select> 
          </div>
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="manufacturer">Manufacturer:</label>
          <input class="m-2" id="manufacturer" type="text" placeholder="Eg: Wizards of the Coast"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="condition">Condition:</label>
          <input class="m-2" id="condition" type="text" placeholder="Eg: 9.0, Fine"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="price">Price:</label>
          <input class="m-2" id="price" type="text" placeholder="Price"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 font-bold text-lg" for="url">Image URL:</label>
          <input class="m-2" id="url" type="text" placeholder="URL for Image"> 
      </div>
      <div class="flex w-full justify-center mt-7">
          <input class="cursor-pointer border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 me-3" type="submit">
          <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
      </div>
  </form>
</div>  
`
const successHtml = `
<div class="bg-indigo-400 m-5">
  <p class="px-3 pt-3 text-center text-white text-2xl font-extrabold">
      <span class="text-emerald-300">Tubular!</span>
      <br>
      Creation Success
  </p>
  <div class="flex justify-center">
      <button id="close" type="button" class="m-4 border-2 border-black bg-indigo-500 rounded-lg text-white text-xl px-1 ms3">Cool!</button>
  </div>
</div>
`

const generalFailedHtml = `
<div class="bg-indigo-400 m-5">
  <p class="px-3 pt-3 text-center text-white text-2xl font-extrabold">
      <span class="text-emerald-300">Bummer!</span>
      <br>
      Something went wrong! Please try again. 
  </p>
  <div class="flex justify-center">
      <button id="close" type="button" class="m-4 border-2 border-black bg-indigo-500 rounded-lg text-white text-xl px-1 ms3">Cool!</button>
  </div>
</div>
`
