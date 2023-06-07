const editBtns = document.getElementsByClassName("edit-btn")
var modal = document.getElementById("myModal");

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Calls dom query to find close button on modal
const cancelBtnFunction = () => {
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function() { modal.style.display = "none"};
}

const selectEditRoute = (currentTarget, id) => {
    const itemToEdit = currentTarget
    const itemType = itemToEdit.dataset.type

    if( itemType === "figure"){
        figureEdit(id, itemType);
    }else if( itemType === "coin"){
        coinEdit(id, itemType);
    }else if( itemType === "card"){
        cardEdit(id, itemType);
    }else if( itemType === "music"){
        musicEdit(id, itemType);
    }
}

// Get Modal Buttons
const getModalButtons = (delUrl) => {
    const updateBtn = document.getElementById("update-btn");
    const deleteBtn = document.getElementById("delete-btn");
    deleteBtn.onclick = function() { deletePath(delUrl) };
    return updateBtn;
}

/// Edit Options based on Item Type///
// Populate figure data and listen for update or edit
const figureEdit = async (id, itemType) => {
    try{
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
        const url = `/api/actionfigure/${id}`
        const updateBtn = getModalButtons(url)
        updateBtn.onclick = function () { 

            if(document.querySelector('#name').value.trim() === ""){
                generatedUpdateFail('Name cannot be empty');
                return;
            }

            const updObj = {
                name: document.querySelector('#name').value.trim() || null,
                line: document.querySelector('#line').value.trim() || null,
                series: document.querySelector('#series').value.trim() || null,
                manufacturer: document.querySelector('#manufacturer').value.trim() || null,
                release_year: document.querySelector('#release_year').value.trim() || null,
                barcode: document.querySelector('#barcode').value.trim() || null,
                condition: document.querySelector('#condition').value.trim() || null,
                price: document.querySelector('#price').value.trim() || null,
            }

            updatePath(updObj, url, id, itemType)
        }
    } catch(error) {
        console.log(err)
        updateFailed();
    }
}

// Edit Coin //
const coinEdit = async (id, itemType) => {
    try{
        let rawData = await fetch(`/api/coin/${id}`)
        let data = await rawData.json()

        modal.innerHTML = updateCoinHtml
        modal.style.display = "block"
        cancelBtnFunction()
        document.querySelector('#denomination').value = data.denomination
        document.querySelector('#country').value = data.country
        document.querySelector('#time_period').value = data.time_period
        document.querySelector('#coin_finish').value = data.coin_finish
        document.querySelector('#mint_mark').value = data.mint_mark
        document.querySelector('#design_theme').value = data.design_theme
        document.querySelector('#artist').value = data.artist
        document.querySelector('#condition').value = data.condition
        document.querySelector('#price').value = data.price
        const url = `/api/coin/${id}`
        const updateBtn = getModalButtons(url)
        updateBtn.onclick = function () { 

            if(document.querySelector('#denomination').value.trim() === ""){
                generatedUpdateFail('Denomination cannot be empty');
                return;
            }else if(document.querySelector('#country').value.trim() === ""){
                generatedUpdateFail('Country cannot be empty');
                return;
            }else if(document.querySelector('#time_period').value.trim() === ""){
                generatedUpdateFail('Time Period cannot be empty');
                return;
            }

        const updObj = {
            denomination: document.querySelector('#denomination').value.trim() || null,
            country: document.querySelector('#country').value.trim() || null,
            time_period: document.querySelector('#time_period').value.trim() || null,
            coin_finish: document.querySelector('#coin_finish').value.trim() || null,
            mint_mark: document.querySelector('#mint_mark').value.trim() || null,
            design_theme: document.querySelector('#design_theme').value.trim() || null,
            artist: document.querySelector('#artist').value.trim() || null,
            condition: document.querySelector('#condition').value.trim() || null,
            price: document.querySelector('#price').value.trim() || null,
        }

            updatePath(updObj, url, id, itemType)
        }
        
    } catch(error) {
        console.log(err)
        updateFailed();
    }
}

// Edit Card //
const cardEdit = async (id, itemType) => {
    try{
        let rawData = await fetch(`/api/card/${id}`)
        let data = await rawData.json()

        modal.innerHTML = updateCardHtml
        modal.style.display = "block"
        cancelBtnFunction()
        document.querySelector('#name').value = data.name
        document.querySelector('#release_year').value = data.release_year
        document.querySelector('#series').value = data.series
        document.querySelector('#set').value = data.set
        document.querySelector('#subtype').value = data.subtype
        document.querySelector('#holographic').value = data.holographic
        document.querySelector('#manufacturer').value = data.manufacturer
        document.querySelector('#condition').value = data.condition
        document.querySelector('#price').value = data.price
        const url = `/api/card/${id}`
        const updateBtn = getModalButtons(url)
        updateBtn.onclick = function () { 

            if(document.querySelector('#name').value.trim() === ""){
                generatedUpdateFail('Name cannot be empty');
                return;
            }

            const updObj = {
                name: document.querySelector('#name').value.trim() || null,
                release_year: document.querySelector('#release_year').value.trim() || null,
                series: document.querySelector('#series').value.trim() || null,
                set: document.querySelector('#set').value.trim() || null,
                subtype: document.querySelector('#subtype').value.trim() || null,
                holographic: document.querySelector('#holographic').value.trim() || null,
                manufacturer: document.querySelector('#manufacturer').value.trim() || null,
                condition: document.querySelector('#condition').value.trim() || null,
                price: document.querySelector('#price').value.trim() || null,
            }

            updatePath(updObj, url, id, itemType)};
    } catch(error) {
        console.log(err)
        updateFailed();
    }
}

// Edit Music //
const musicEdit = async (id, itemType) => {
    try{
        let rawData = await fetch(`/api/music/${id}`)
        let data = await rawData.json()

        modal.innerHTML = updateMusicHtml
        modal.style.display = "block"
        cancelBtnFunction()
        document.querySelector('#album_name').value = data.album_name
        document.querySelector('#artist').value = data.artist
        document.querySelector('#genre').value = data.genre
        document.querySelector('#style').value = data.style
        document.querySelector('#release_year').value = data.release_year
        document.querySelector('#format').value = data.format
        document.querySelector('#pressing_info').value = data.pressing_info
        document.querySelector('#barcode').value = data.barcode
        document.querySelector('#condition').value = data.condition
        document.querySelector('#price').value = data.price
        const url = `/api/music/${id}`
        const updateBtn = getModalButtons(url)
        updateBtn.onclick = function () { 
            
            if(document.querySelector('#album_name').value.trim() === ""){
                generatedUpdateFail('Album name cannot be empty');
                return;
            }else if(document.querySelector('#artist').value.trim() === ""){
                generatedUpdateFail('Artist cannot be empty');
                return;
            }else if(document.querySelector('#format').value.trim() === ""){
                generatedUpdateFail('Format cannot be empty');
                return;
            } 

            const updObj = {
                album_name: document.querySelector('#album_name').value.trim() || null,
                artist: document.querySelector('#artist').value.trim() || null,
                genre: document.querySelector('#genre').value.trim() || null,
                style: document.querySelector('#style').value.trim() || null,
                release_year: document.querySelector('#release_year').value.trim() || null,
                format: document.querySelector('#format').value.trim() || null,
                pressing_info: document.querySelector('#pressing_info').value.trim() || null,
                barcode: document.querySelector('#barcode').value.trim() || null,
                condition: document.querySelector('#condition').value.trim() || null,
                price: document.querySelector('#price').value.trim() || null,
            }

            updatePath(updObj, url, id, itemType)};
    } catch(error) {
        console.log(err)
        updateFailed();
    }
}

const deletePath = async (url) => {
    try{
        const response = await fetch(`${url}`, { method: 'DELETE' });

        if (response.ok){
            updateSuccess();
        } else {
            updateFailed();
        }
    } catch(err){
        console.log(err)
        updateFailed();
    }
}

const updatePath = async (obj, url, id, itemType) => {
    try{ 
        // Updated data
        const response = await fetch(`${url}`, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        if (response.ok){
            switch (itemType) {
                case 'figure':
                    await uploadFigureImg(id);
                    updateSuccess();
                    break;
                case 'coin':
                    await uploadCoinImg(id);
                    updateSuccess();
                    break;
                case 'music':
                    await uploadMusicImg(id);
                    updateSuccess();
                    break;
                case 'card':
                    await uploadCardImg(id);
                    updateSuccess();
                    break;
            }
        } else {
                updateFailed();
            }
    } catch(err) {
        console.log(err)
    }
}

// dynamically renders edit buttons
let init = () => {
for (var i = 0; i < editBtns.length; i++) {
    
    editBtns[i].addEventListener("click", (event) => {
        selectEditRoute(event.currentTarget, event.currentTarget.dataset.id);
    })
}}

const updateSuccess = () => {
    modal.innerHTML = updateSuccessHtml;
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function() { document.location.reload() };
}

const updateFailed = () => {
    modal.innerHTML = generalUpdateFailedHtml;
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function() { document.location.reload() };
}

const generatedUpdateFail = (msg) => {
    modal.innerHTML = generatedUpdateFailText(msg);
    const cancelBtn = document.getElementById("close");
    cancelBtn.onclick = function() { document.location.reload()};
}

const generatedUpdateFailText = (text) => {
    return `
    <div class="bg-indigo-400 m-5">
    <p class="px-3 pt-3 text-center text-white text-2xl font-extrabold">
        <span class="text-emerald-300">Bummer!</span>
        <br>
        ${text} 
    </p>
    <div class="flex justify-center">
        <button id="close" type="button" class="m-4 border-2 border-black bg-indigo-500 rounded-lg text-white text-xl px-1 ms3">Sadness!</button>
    </div>
  </div>
    `
}

// wait until everything dynamically loaded before trying to grab dom
document.addEventListener("load", init())

const updateFigureHtml = `
<div class="modal-content">
<div class="bg-indigo-600">
    <h2 class="py-3 text-center text-white text-2xl font-extrabold">Update Action Figure</h2>
</div>
<form id="update-figure-form" class="flex flex-col items-start p-4">
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
        <label class="ps-2 font-bold text-lg" for="actionfigure-photo-input-el">Upload Image:</label>
        <input class="w-52 m-2 p-1.5 rounded-lg" id="actionfigure-photo-input-el" type="file" accept="image/png, image/jpeg, image/jpg"> 
    </div>
    <div class="flex w-full justify-around mt-7">
        <button id="update-btn" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Update</button>
        <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
        <button id="delete-btn" type="button" class="border-2 border-black bg-rose-500 rounded-lg text-white text-lg px-0.5 ms3">Delete</button>
    </div>
</form>
</div>        
`

const updateMusicHtml = `
<div class="modal-content">
  <div class="bg-indigo-600">
      <h2 class="py-3 text-center text-white text-2xl font-extrabold">Update Music Entry</h2>
  </div>
  <form id="update-music-form" class="flex flex-col items-start p-4">
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
        <label class="ps-2 font-bold text-lg" for="music-photo-input-el">Upload Image:</label>
        <input class="w-52 m-2 p-1.5 rounded-lg" id="music-photo-input-el" type="file" accept="image/png, image/jpeg, image/jpg"> 
      </div>
      <div class="flex w-full justify-center mt-7">
        <button id="update-btn" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Update</button>
        <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
        <button id="delete-btn" type="button" class="border-2 border-black bg-rose-500 rounded-lg text-white text-lg px-0.5 ms3">Delete</button>
      </div>
  </form>
</div>  
`

const updateCoinHtml = `
<div class="modal-content">
  <div class="bg-indigo-600">
      <h2 class="py-3 text-center text-white text-2xl font-extrabold">Update Coin Entry</h2>
  </div>
  <form id="update-coin-form" class="flex flex-col items-start p-4">
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
        <label class="ps-2 font-bold text-lg" for="coin-photo-input-el">Upload Image:</label>
        <input class="w-52 m-2 p-1.5 rounded-lg" id="coin-photo-input-el" type="file" accept="image/png, image/jpeg, image/jpg"> 
      </div>
      <div class="flex w-full justify-center mt-7">
        <button id="update-btn" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Update</button>
        <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
        <button id="delete-btn" type="button" class="border-2 border-black bg-rose-500 rounded-lg text-white text-lg px-0.5 ms3">Delete</button>
      </div>
  </form>
</div>  
`

const updateCardHtml = `
<div class="modal-content">
  <div class="bg-indigo-600">
      <h2 class="py-3 text-center text-white text-2xl font-extrabold">Update Card Entry</h2>
  </div>
  <form id="update-card-form" class="flex flex-col items-start p-4">
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
        <label class="ps-2 font-bold text-lg" for="card-photo-input-el">Upload Image:</label>
        <input class="w-52 m-2 p-1.5 rounded-lg" id="card-photo-input-el" type="file" accept="image/png, image/jpeg, image/jpg">
      </div>
      <div class="flex w-full justify-center mt-7">
        <button id="update-btn" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Update</button>
        <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
        <button id="delete-btn" type="button" class="border-2 border-black bg-rose-500 rounded-lg text-white text-lg px-0.5 ms3">Delete</button>
      </div>
  </form>
</div>  
`
const updateSuccessHtml = `
<div class="bg-indigo-400 m-5">
  <p class="px-3 pt-3 text-center text-white text-2xl font-extrabold">
      <span class="text-emerald-300">Tubular!</span>
      <br>
      Update Success
  </p>
  <div class="flex justify-center">
      <button id="close" type="button" class="m-4 border-2 border-black bg-indigo-500 rounded-lg text-white text-xl px-1 ms3">Cool!</button>
  </div>
</div>
`

const generalUpdateFailedHtml = `
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