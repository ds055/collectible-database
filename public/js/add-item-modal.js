// Get the modal
var modal = document.getElementById("myModal");

// Get the buttons that opens the modal
const collectionBtn = document.getElementById("addCollectionBtn");
const coolectibleBtn = document.getElementById("addCoolectibleBtn");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Modal initializers
collectionBtn.onclick = function () {
  modal.innerHTML = collectionHtml;
  cancelBtnFunction();
  modal.style.display = "block";
  document.querySelector('#new-collection-form').addEventListener("submit", newCollectionSubmit)
}

coolectibleBtn.onclick = function () {
  modal.innerHTML = collectibleTypeHtml;
  cancelBtnFunction();
  modal.style.display = "block";
  let select = document.getElementById("coll-types");
  document.querySelector('#next-btn').addEventListener("click", function (event) {

    if (select.value === "Action Figure") {
      newFigureForm(event);
    }
    else if (select.value === "Music") {
      newMusicForm(event);
    }
    else if (select.value === "Coin") {
      newCoinForm(event);
    }
    else if (select.value === "Card") {
      newCardForm(event);
    }
  })
}

// Calls dom query to find close button on modal
const cancelBtnFunction = () => {
  const cancelBtn = document.getElementById("close");
  cancelBtn.onclick = function () { modal.style.display = "none" };
}

// Generates modal for new coolectible based on drop down answer from select above
const newFigureForm = (event) => {
  modal.innerHTML = newFigureHtml;
  cancelBtnFunction();
  document.querySelector('#new-figure-form').addEventListener("submit", addNewActionFigure)
}

const newMusicForm = (event) => {
  modal.innerHTML = newMusicHtml;
  cancelBtnFunction();
  document.querySelector('#new-music-form').addEventListener("submit", addNewMusic)
}

const newCoinForm = (event) => {
  modal.innerHTML = newCoinHtml;
  cancelBtnFunction();
  document.querySelector('#new-coin-form').addEventListener("submit", addNewCoin)
}

const newCardForm = (event) => {
  modal.innerHTML = newCardHtml;
  cancelBtnFunction();
  document.querySelector('#new-card-form').addEventListener("submit", addNewCard)
}

// Adds new collection via api call
const newCollectionSubmit = async function (event) {
  event.preventDefault();

  // grab dom els
  const name = document.querySelector('#name').value.trim() || null;
  const collection_type = document.querySelector('#collection_type').value.trim() || null;
  const image = document.querySelector('#url').value.trim() || null;

  if (name === null) {
    generatedFail('Name cannot be empty');
    return;
  }

  // api call to create new figure
  let response = await fetch(`/api/collection`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      collection_type,
      image
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // error handling and confirmation message
  if (response.ok) {
    addSuccess();
  } else {
    addFailed();
  }
};

// Adds new figure via api call
const addNewActionFigure = async function (event) {
  event.preventDefault();

  // grab dom els
  const name = document.querySelector('#name').value.trim() || null;
  const line = document.querySelector('#line').value.trim() || null;
  const series = document.querySelector('#series').value.trim() || null;
  const manufacturer = document.querySelector('#manufacturer').value.trim() || null;
  const release_year = document.querySelector('#release_year').value.trim() || null;
  const barcode = document.querySelector('#barcode').value.trim() || null;
  const condition = document.querySelector('#condition').value.trim() || null;
  const price = document.querySelector('#price').value.trim() || null;
  const image = document.querySelector('#url').value.trim() || null;

  if (name === null) {
    generatedFail('Name cannot be empty');
    return;
  }

  // api call to create new figure
  let response = await fetch(`/api/actionfigure`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      line,
      series,
      manufacturer,
      release_year,
      barcode,
      condition,
      price,
      image,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // error handling and confirmation message
  if (response.ok) {
    addSuccess();
  } else {
    addFailed();
  }
};

// Adds new music entry via api call
const addNewMusic = async function (event) {
  event.preventDefault();

  // grab dom els
  const album_name = document.querySelector('#album_name').value.trim() || null;
  const artist = document.querySelector('#artist').value.trim() || null;
  const genre = document.querySelector('#genre').value.trim() || null;
  const style = document.querySelector('#style').value.trim() || null;
  const release_year = document.querySelector('#release_year').value.trim() || null;
  const format = document.querySelector('#format').value.trim() || null;
  const pressing_info = document.querySelector('#pressing_info').value.trim() || null;
  const barcode = document.querySelector('#barcode').value.trim() || null;
  const condition = document.querySelector('#condition').value.trim() || null;
  const price = document.querySelector('#price').value.trim() || null;
  const image = document.querySelector('#url').value.trim() || null;

  // Handling required fields
  if (album_name === null) {
    generatedFail('Album Name cannot be empty');
    return;
  } else if (artist === null) {
    generatedFail('Artist name cannot be empty');
    return;
  } else if (format === null) {
    generatedFail('Format cannot be empty');
    return;
  }

  // api call to create new music
  let response = await fetch(`/api/music`, {
    method: 'POST',
    body: JSON.stringify({
      album_name,
      artist,
      genre,
      style,
      release_year,
      format,
      pressing_info,
      barcode,
      condition,
      price,
      image,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // error handling and confirmation message
  if (response.ok) {
    addSuccess();
  } else {
    addFailed();
  }
};


// Adds new coin entry via api call
const addNewCoin = async function (event) {
  event.preventDefault();

  // grab dom els
  const denomination = document.querySelector('#denomination').value.trim() || null;
  const country = document.querySelector('#country').value.trim() || null;
  const time_period = document.querySelector('#time_period').value.trim() || null;
  const coin_finish = document.querySelector('#coin_finish').value.trim() || null;
  const mint_mark = document.querySelector('#mint_mark').value.trim() || null;
  const design_theme = document.querySelector('#design_theme').value.trim() || null;
  const artist = document.querySelector('#artist').value.trim() || null;
  const condition = document.querySelector('#condition').value.trim() || null;
  const price = document.querySelector('#price').value.trim() || null;
  const image = document.querySelector('#url').value.trim() || null;

  // Handling required fields
  if (denomination === null) {
    generatedFail('Denomination cannot be empty');
    return;
  } else if (country === null) {
    generatedFail('Country name cannot be empty');
    return;
  } else if (time_period === null) {
    generatedFail('Time period cannot be empty');
    return;
  }

  // api call to create new coin
  let response = await fetch(`/api/coin`, {
    method: 'POST',
    body: JSON.stringify({
      denomination,
      country,
      time_period,
      coin_finish,
      mint_mark,
      design_theme,
      artist,
      condition,
      price,
      image,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // error handling and confirmation message
  if (response.ok) {
    addSuccess();
  } else {
    addFailed();
  }
};


// Adds new card entry via api call
const addNewCard = async function (event) {
  event.preventDefault();

  // grab dom els
  const name = document.querySelector('#name').value.trim() || null;
  const release_year = document.querySelector('#release_year').value.trim() || null;
  const series = document.querySelector('#series').value.trim() || null;
  const set = document.querySelector('#set').value.trim() || null;
  const subtype = document.querySelector('#subtype').value.trim() || null;
  const holographic = document.querySelector('#holographic').value.trim() || null;
  const manufacturer = document.querySelector('#manufacturer').value.trim() || null;
  const condition = document.querySelector('#condition').value.trim() || null;
  const price = document.querySelector('#price').value.trim() || null;
  const image = document.querySelector('#url').value.trim() || null;

  // Handling required fields
  if (name === null) {
    generatedFail('Name cannot be empty');
    return;
  }

  // api call to create new card
  let response = await fetch(`/api/card`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      release_year,
      series,
      set,
      subtype,
      holographic,
      manufacturer,
      condition,
      price,
      image,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // error handling and confirmation message
  if (response.ok) {
    addSuccess();
  } else {
    addFailed();
  }
};

const addSuccess = () => {
  modal.innerHTML = successHtml;
  const cancelBtn = document.getElementById("close");
  cancelBtn.onclick = function () {  document.location.reload() };
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

const collectionHtml = `
<div class="modal-content">
  <div class="bg-indigo-600">
      <h2 class="py-3 text-center text-white text-2xl font-extrabold">New Collection Entry</h2>
  </div>
  <form id="new-collection-form" class="flex flex-col items-start p-4">
          
          <div class="flex flex-row w-full justify-start items-center">
            <label class="ps-2 pt-2 pb-2 me-2 font-bold text-lg" for="collection_type">Collection Type:</label>
          <select class="ms-2" id="collection_type" name="type-select">
              <option value="Action Figure">Action Figure</option>
              <option value="Card">Card</option>
              <option value="Coin">Coin</option>
              <option value="Music">Music</option>
          </select> 
          </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 pt-1 font-bold text-lg" for="name">Collection Name:</label>
          <input class="m-2" id="name" type="required" placeholder="Enter name here"> 
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 pt-1 font-bold text-lg" for="url">Image URL:</label>
          <input class="m-2" id="url" type="text" placeholder="URL for Image"> 
      </div>
      <div class="flex w-full justify-center mt-7">
          <input class="cursor-pointer border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 me-3" type="submit">
          <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
      </div>
  </form>
</div> 
`

const collectibleTypeHtml = `
<div class="modal-content">
  <div class="bg-indigo-600">
      <h2 class="py-3 text-center text-white text-2xl font-extrabold">New Coolectible</h2>
  </div>
  <form id="coll-type-form" class="flex flex-col items-start p-4">
      <div class="pt-3 mt-2">
          <label class="ps-2 pe-2  font-bold text-lg" for="type-box">Coolectible Type:</label>
          <select class="me-3" id="coll-types" name="type-select">
              <option value="Action Figure">Action Figure</option>
              <option value="Card">Card</option>
              <option value="Coin">Coin</option>
              <option value="Music">Music</option>
          </select>
      </div>
      <div class="flex w-full justify-center mt-7">
        <button id="next-btn" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 me-3">Next</button>
        <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms-3">Cancel</button>
      </div>
  </form>
  </div>
`

const newFigureHtml = `
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
    <div class="flex w-full justify-center mt-7">
        <input class="cursor-pointer border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 me-3" type="submit">
        <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
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
