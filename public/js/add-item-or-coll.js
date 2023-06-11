// Get the buttons that opens the modal
const collectionBtn = document.getElementById("addCollectionBtn");
const coolectibleBtn = document.getElementById("addCoolectibleBtn");

// Modal initializers to add new collectible
coolectibleBtn.onclick = function () {
    // html for modal
    modal.innerHTML = collectibleTypeHtml;
    // initialize generated cancel button
    cancelBtnFunction();
    // display modal 
    modal.style.display = "block";
    // get select from modal
    let select = document.getElementById("coll-types");
    // event listener for next button on modal after users selects the type of the new collectible
    document.getElementById('next-btn').addEventListener("click", function () {
      // Response sent to various methods based on the user select input; displays next section of form based on which item type 
      newItemForm(select.value)
})
}

// creates collection form for user to fill out
collectionBtn.onclick = function () {
  newItemForm("collection");
  modal.style.display = "block";
}

// create modal for users to fill out based on selection from previous form
const newItemForm = (itemType) => {
    // create variable to hold object
    let obj;
    // based on answer to select from pervious form, create an obj item based on default obj for given type
    switch(itemType) {
      case "collection":
          obj = {...defCollObj}
          break;
      case "actionfigure":
          obj = {...defFigureObj}
          break;
      case "card":
          obj = {...defCardObj}
          break;
      case "coin":
          obj = {...defCoinObj}
          break;
      case "music":
          obj = {...defMusicObj}
          break;
    }

    // empty out fields from default object, which are used for placeholder text
    for (const field in obj){
      obj[field] = "";
    }

    // calls method from modal.js to create modal from object and item type
    genItemModal(obj, itemType)

    // get modal title

    const modalTitle =document.getElementById("modal-title")

    // set title for modal
    if (itemType === "collection"){
      modalTitle.textContent = `Create Collection`
    } else {
      modalTitle.textContent = `Create Coolectible`
    }

    // set text for update button
    document.getElementById("update-btn").textContent = `Create`

    // hide delete button for add functions
    document.getElementById("delete-btn").style.display = "none"

    // add event to update button
    const updateBtn = document.getElementById("update-btn")
    document.getElementById("update-btn").addEventListener("click", function () {
      addNewItem(itemType)
    }, { once: true})
}

// Adds new figure via api call
const addNewItem = async function (itemType) {
    // function from modal.js, takes entry from inputs to create new object for api call

    const newItemObj = createItemObj()

    // api call to create new figure
    let response = await fetch(`/api/${itemType}`, {
      method: 'POST',
      body: JSON.stringify(newItemObj),
      headers: { 'Content-Type': 'application/json' },
    });

    // error handling and confirmation message
    if (response.ok) {
      const data = await response.json();
      await uploadImage(itemType, data.id);
      successMsg(fixCapAndHyph(itemType) + " created!");
    } else {
      const data = await response.json()
      errorHandling(data)
    }
};

// uploads image to server
const uploadImage = async (itemType, itemId) => {
    try{
      // get photo upload el and file
      const file = document.querySelector("#photo-input-el").files[0] || null;
      // if user provided no image, return
      if (file === null) {
        return;
      }
      // create new FormData and add image
      const formData = new FormData();
      formData.append('file', file);

      // add new image to db and update item in db with link
      const data = await fetch(`/api/images/${itemType}/${itemId}`, {
        method: 'POST',
        body: formData
      });
    } catch(err){
      console.log(err)
    }
}