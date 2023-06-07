let updateCollinit = () => {
    const editCollBtns = document.getElementsByClassName("edit-coll");
    for (var i = 0; i < editCollBtns.length; i++) {
                editCollBtns[i].addEventListener("click", (event) => {
            updateCollOptions(event.currentTarget, event.currentTarget.dataset.id);
        })
    }}

const updateCollOptions = async (eTarget, id) => {
    try {
        // grabs modal dom element from view-all.handlebar
        const modal = document.getElementById("myModal")
        // sets the html of the modal
        modal.innerHTML = updateCollectionHtml;
        // initiate cancel button from edit-item-all-modal
        addItemCancelBtnFunction();

        // get inputs from modal
        const nameInput = document.getElementById("up-name");
        const descripInput = document.getElementById("description");


        // gets type data preset to button on partial
        const collectionId = id

        // api call to find user collection
        let rawData = await fetch(`/api/collection/${collectionId}`)
        let data = await rawData.json()

        nameInput.value = data.name;
        descripInput.value = data.description;


        // display the modal
        modal.style.display = "block";

        // add event listener for form submit
        document.querySelector("#update-collection-form").addEventListener("submit", function (event) { updateCollection(event, collectionId)})
        document.getElementById("delete-coll-btn").addEventListener("click", function (event) { deleteColl(collectionId) })
    } catch (err) {
        console.log(err)
    }    
}

const deleteColl = async (collectionId) => {
    try{
        const response = await fetch(`/api/collection/${collectionId}`, { method: 'DELETE' });

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

const updateCollection = async (event, collectionId) => {
    try{ 
        event.preventDefault();
        const nameVal = document.getElementById("up-name").value.trim();
        const colldescr = document.getElementById("description").value.trim();

        const object = {
            name: nameVal,
            description: colldescr
        }

        // Updated data
        const response = await fetch(`/api/collection/${collectionId}`, {
            method: 'PUT',
            body: JSON.stringify(object),
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            await uploadCollectionImage(collectionId);
            addSuccess();
        } else {
            updateFailed();
        }
    } catch(err) {
        console.log(err)
    }
}

document.addEventListener("load", updateCollinit())

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
        <textarea class="w-52 m-2 p-1.5 rounded-lg" id="description" placeholder="Enter name here"> </textarea>
      </div>
      <div class="flex flex-row w-full justify-between">
          <label class="ps-2 pt-1 font-bold text-lg" for="up-collection-photo-input-el">Select Image</label>
          <input class="w-52 m-2 p-1.5 rounded-lg" id="collection-photo-input-el" type="file" accept="image/png, image/jpeg, image/jpg"> 
      </div>
      <div class="flex w-full justify-center mt-7">
          <input class="cursor-pointer border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1 px-2 me-3" type="submit">
          <button id="close" type="button" class="border-2 bg-indigo-500 hover:bg-indigo-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1">Cancel</button>
          <button id="delete-coll-btn" type="button" class="border-2 bg-rose-500 hover:bg-rose-600 rounded text-lg transition duration-400 hover:scale-110 text-white p-1 ms-3">Delete</button>
      </div>
  </form>
</div>
`