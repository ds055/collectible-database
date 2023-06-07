let addCollinit = () => {
    const addToCollBtns = document.getElementsByClassName("add-to-coll");
    for (var i = 0; i < addToCollBtns.length; i++) {
                addToCollBtns[i].addEventListener("click", (event) => {
            addtoCollOptions(event.currentTarget.dataset.type, event.currentTarget.dataset.id);
        })
    }}

const addtoCollOptions = async (item_type, id) => {
    try {
        // grabs modal dom element from view-all.handlebar
        const modal = document.getElementById("myModal")
        // sets the html of the modal
        modal.innerHTML = addToCollectionHtml;
        // initiate cancel button from edit-item-all-modal
        cancelBtnFunction();

        // get select from modal
        const select = document.getElementById("coll-select")
        // gets type data preset to button on partial
        const type = item_type
        const itemId = id

        // api call to find user collections based on type
        let rawData = await fetch(`/api/collection/user/${type}`)
        let data = await rawData.json()

                // for loop to create select options from returned data; one for each collection of matching type
        for(let i = 0; i < data.length; i++){
            // creates new option for select
            let option = document.createElement("option");
            // sets option's text and value to collection name
            option.text = data[i].name
            option.value = data[i].id
            // adds option to select html
            select.add(option);
        } 
        // display the modal
        modal.style.display = "block";

        // add event listener for form submit
        document.querySelector("#add-to-coll-form").addEventListener("submit", function (event) { addToCollection(event, type, select.value, itemId)})
    } catch (err) {
        console.log(err)
    }    
}


const addToCollection = async (event, type, collectionId, itemId) => {
    event.preventDefault();
    switch (type) {
        case 'Action Figure':
            figureAddtoColl(collectionId, itemId)
            break;
        case 'Coin':
            coinAddtoColl(collectionId, itemId)
            break;
        case 'Music':
            musicAddtoColl(collectionId, itemId)
            break;
        case 'Card':
            cardAddtoColl(collectionId, itemId)
            break;
    }
}

const figureAddtoColl = async (collectionId, itemId) => {
    try{
        const response = await fetch(`/api/collection/fig`, { 
            method: 'POST',
            body: JSON.stringify({
                action_figure_id: itemId,
                collection_id: collectionId
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        
        const data = await response.json()
        
        if (data.errors){
            if(data.errors[0].type === "unique violation"){
                generatedAddFail("This item is already in your collection!")
            }
        }
    }catch(err) {
        console.log(err)
    }
}

const cardAddtoColl = async (collectionId, itemId) => {
    try{
        const response = await fetch(`/api/collection/card`, { 
            method: 'POST',
            body: JSON.stringify({
                card_id: itemId,
                collection_id: collectionId
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        
        const data = await response.json()
        
        if (data.errors){
            if(data.errors[0].type === "unique violation"){
                generatedAddFail("This item is already in your collection!")
            }
        }
    }catch(err) {
        console.log(err)
    }
}

const coinAddtoColl = async (collectionId, itemId) => {
    try{
        const response = await fetch(`/api/collection/coin`, { 
            method: 'POST',
            body: JSON.stringify({
                coin_id: itemId,
                collection_id: collectionId
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        
        const data = await response.json()
        
        if (data.errors){
            if(data.errors[0].type === "unique violation"){
                generatedAddFail("This item is already in your collection!")
            }
        }
    }catch(err) {
        console.log(err)
    }
}

const musicAddtoColl = async (collectionId, itemId) => {
    try{
        const response = await fetch(`/api/collection/music`, { 
            method: 'POST',
            body: JSON.stringify({
                music_id: itemId,
                collection_id: collectionId
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        
        const data = await response.json()
        
        if (data.errors){
            if(data.errors[0].type === "unique violation"){
                generatedAddFail("This item is already in your collection!")
            }
        }
    }catch(err) {
        console.log(err)
    }
}

document.addEventListener("load", addCollinit())

const generatedAddFail = (msg) => {
    modal.innerHTML = generatedAddFailText(msg);
    modal.style.display = "block";
    console.log(document.getElementById("close"));
    document.getElementById("close").addEventListener("click", function () { modal.style.display = "none" })
}


const generatedAddFailText = (text) => {
    return `
    <div class="bg-indigo-400 m-5">
    <p class="px-3 pt-3 text-center text-white text-2xl font-extrabold">
        <span class="text-emerald-300">Bummer!</span>
        <br>
        ${text} 
    </p>
    <div class="flex justify-center">
        <button id="close" type="button" class="m-4 border-2 border-black bg-indigo-500 rounded-lg text-white text-xl px-1 ms3 hover:bg-indigo-300 hover:text-black">Sadness!</button>
    </div>
  </div>
    `
}


const addToCollectionHtml = `
<div class="bg-indigo-400 m-5">
  <p class="px-3 pt-3 text-center text-white text-2xl font-extrabold">
      <span class="text-emerald-300">Add to which collection?</span>
  </p>
  <form id="add-to-coll-form">
    <div class="flex mt-3 flex-row w-full justify-center">
            <select class="ms-2" id="coll-select" name="type-select">

            </select> 
        </div>
    <div class="flex justify-center">
      <input id="close" type="submit" class="m-4 border-2 border-black bg-indigo-500 rounded-lg text-white text-xl px-1 ms3 hover:bg-indigo-300 hover:text-black">
      <button id="close" type="button" class="border-2 border-black bg-indigo-500 rounded-lg text-white text-lg px-0.5 ms3">Cancel</button>
  </form>
  </div>
</div>
`