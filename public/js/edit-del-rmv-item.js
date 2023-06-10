// grab dynamically rendered edit buttons
let init = () => {
    // get edit buttons to assign function
    const editBtns = document.getElementsByClassName("edit-btn");

    // adds event listener to each edit button, passing in target and id pulled from dataset
    for (var i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener("click", (event) => {
            editModal(event.currentTarget, event.currentTarget.dataset.id);
        })
    }
}

// run init on page load
document.addEventListener("load", init())

// opens edit modal, populates data, and adds listeners
const editModal = async (currentTarget, id) => {
    try {
        // based on button clicked, gets type of collectible
        let itemType = currentTarget.dataset.type

        // translates "figure" data to usable text
        if (itemType === "figure") { itemType = "actionfigure"; }

        // url for api calls
        const url = `/api/${itemType}/${id}`

        // get saved data for item
        let rawData = await fetch(url)
        let data = await rawData.json()

        // called from modal.js to create item modal
        genItemModal(data, itemType);

        // get page name from hidden input el on page
        const pageName = document.getElementById("page-name-inp");
        // get delete btn to assign eventlistener
        const delBtn = document.getElementById("delete-btn")

        document.getElementById("modal-title").textContent = `Update Coolectible`

        // Render correct delete/remove button based on page name
        if (pageName.value === "collections"){
            // sets delete button's text
            delBtn.textContent = "Boot from Collection"
            // adds event listener with appropriate function based on current page
            delBtn.addEventListener("click", () => {
                removeFromColl(itemType, id)
            })
        }else{
            delBtn.textContent = "Delete"
            delBtn.addEventListener("click", () => {
                deleteItem(url)
            })
        }

        // assign update button's function
        document.getElementById("update-btn").addEventListener("click", () => {
            updateItem(url, id, itemType);
        })

        // display modal
        modal.style.display = "block";
    } catch(err) {
        console.log(err)
}}

// updates item data to db, arguments taken from editModal function
const updateItem = async (url, id, itemType) => {
    try{

        const updObj = createItemObj();
    
        // call to update item in db
        const response = await fetch (`${url}`, {
            method: 'PUT',
            body: JSON.stringify(updObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // if successfull, updates image if present and send user success message
        if (response.ok) {
            switch (itemType) {
                case 'actionfigure':
                    await uploadFigureImg(id);
                    successMsg("Update succeeded!");
                    break;
                case 'coin':
                    await uploadCoinImg(id);
                    successMsg("Update succeeded!");
                    break;
                case 'music':
                    await uploadMusicImg(id);
                    successMsg("Update succeeded!");
                    break;
                case 'card':
                    await uploadCardImg(id);
                    successMsg("Update succeeded!");
                    break;
            }
        } else {
            failedMsg("Update Failed!");
        }
    } catch(err){
        console.log(err)
    }
}

// remove item from a collection, arguments taken from editModal function
const removeFromColl = async (itemType, itemId) => {
    try {
        // translates itemType into string usable in url
        if (itemType === "actionfigure") {
            itemType = "fig";
        }
        // gets collectionId from value on page
        const collectionId = document.getElementById("collection-id").value

        // fetch to get through table id
        const rawData = await fetch(`/api/collection/${itemType}/${itemId}/${collectionId}`)
        const data = await rawData.json();
        const throughId = data.id;

        // using through table id, delete the collectionItem table entry
        response = await fetch(`/api/collection/${itemType}/${throughId}`, { method: 'DELETE' })

        // inform user of operation results
        if(response.ok) { successMsg("Removed from Collection!") }
        else { failedMsg("Something went wrong!") }
    } catch (err) {
        console.log(err)
        failedMsg("Something went wrong!")
    }
}

// deletes item from db, url argument from editModal function
const deleteItem = async (url) => {
    try {
        // call to delete from db
        const response = await fetch(`${url}`, { method: 'DELETE' });
        // inform user of operation results
        if (response.ok) {
            successMsg("Item successfully deleted!")
        } else {
            failedMsg("Failed to delete item!")
        }
    } catch (err) {
        console.log(err)
        failedMsg("Failed to delete item!")
    }
}