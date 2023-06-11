let updateCollinit = () => {
    const editCollBtns = document.getElementsByClassName("edit-coll");
    for (var i = 0; i < editCollBtns.length; i++) {
                editCollBtns[i].addEventListener("click", (event) => {
            updateCollOptions(event.currentTarget, event.currentTarget.dataset.id);
        })
    }}

const updateCollOptions = async (eTarget, id) => {
    try {
        // sets the html of the modal
        modal.innerHTML = updateCollectionHtml;
        // initiate cancel button from edit-item-all-modal
        cancelBtnFunction();

        // get inputs from modal
        const nameInput = document.getElementById("up-name");
        const descripInput = document.getElementById("description");

        // gets type data preset to button on partial
        const collectionId = id

        // api call to find user collection
        let rawData = await fetch(`/api/collection/${collectionId}`)
        let data = await rawData.json()

        // set values to display saved info to users
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

// delete collection method
const deleteColl = async (collectionId) => {
    try{
        // api call to delete collection
        const response = await fetch(`/api/collection/${collectionId}`, { method: 'DELETE' });
        // result handling
        if (response.ok){
            successMsg("Collection deleted!")
        } else {
            failedMsg("Updated failed!")
        }
    } catch(err){
        console.log(err)
        failedMsg("Updated failed!")
    }
}

// update collection data
const updateCollection = async (event, collectionId) => {
    try{ 
        // prevent page reload
        event.preventDefault();
        // get user input and trim
        const nameVal = document.getElementById("up-name").value.trim() || null;
        const colldescr = document.getElementById("description").value.trim();

        // create object to be used in PUT path
        const object = {
            name: nameVal,
            description: colldescr
        }

        // Updated data route
        const response = await fetch(`/api/collection/${collectionId}`, {
            method: 'PUT',
            body: JSON.stringify(object),
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            await uploadImage("collection", collectionId);
            successMsg("Collection updated!");
        } else {
            const data = await response.json()
            errorHandling(data)
        }
    } catch(err) {
        console.log(err)
    }
}

document.addEventListener("load", updateCollinit())