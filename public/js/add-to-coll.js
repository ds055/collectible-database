let addCollinit = () => {
    const addToCollBtns = document.getElementsByClassName("add-to-coll");
    for (var i = 0; i < addToCollBtns.length; i++) {
        addToCollBtns[i].addEventListener("click", (event) => {
            addtoCollOptions(event.currentTarget.dataset.type, event.currentTarget.dataset.id);
        })
    }
}

// init load
document.addEventListener("load", addCollinit())

// fills coll modal
const addtoCollOptions = async (itemType, itemId) => {
    try {
        // sets the html of the modal
        modal.innerHTML = addToCollectionHtml;
        // initiate cancel button from edit-item-all-modal
        cancelBtnFunction();

        // get select from modal
        const select = document.getElementById("coll-select")
        // gets type data preset to button on partial

        // api call to find user collections based on type
        let rawData = await fetch(`/api/collection/user/${itemType}`)
        let data = await rawData.json()

        // for loop to create select options from returned data; one for each collection of matching type
        for (let i = 0; i < data.length; i++) {
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
        document.querySelector("#add-to-coll-form").addEventListener("submit", function (event) { addToCollection(event, itemType, select.value, itemId) })
    } catch (err) {
        console.log(err)
    }
}

// adds item to collection
const addToCollection = async (event, itemType, collectionId, itemId) => {
    // prevents reload on submit
    event.preventDefault();

    // declare variables for use: urlType used to fill in post url
    let urlType;
    let bodyId;

    try {
        // based on item, set value for above variables
        if(itemType === "Action Figure") {
            urlType = "fig";
            bodyId = "action_figure_id"
        } else {
            urlType = itemType.toLowerCase();
            bodyId = `${urlType}_id`
        }

        // create object to be passed into POST route
        const bodyObj = {
            [bodyId]: itemId,
            collection_id: collectionId
        }

        // api Post call to update item
        const response = await fetch(`/api/collection/${urlType}`, {
            method: 'POST',
            body: JSON.stringify(bodyObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // based on error return, send message to user
        if (response.ok) {
            successMsg("Added to collection!");
        } else {
            const data = await response.json()
            errorHandling(data)
        }
    } catch(err){
        console.log(err)
    }
}