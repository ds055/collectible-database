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