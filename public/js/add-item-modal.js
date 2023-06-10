// Get the buttons that opens the modal
const collectionBtn = document.getElementById("addCollectionBtn");
const coolectibleBtn = document.getElementById("addCoolectibleBtn");

// Modal initializers to add new collection
collectionBtn.onclick = function () {
  // html for modal
  modal.innerHTML = collectionHtml;
  // initiate cancel button listener
  cancelBtnFunction();
  // display modal from hidden
  modal.style.display = "block";
  // create listener for submit button
  document.querySelector('#new-collection-form').addEventListener("submit", newCollectionSubmit)
}

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

const newItemForm = (itemType) => {
  
  let obj;

  switch(itemType) {
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

  for (const field in obj){
    obj[field] = "";
  }

  genItemModal(obj, itemType)

  document.getElementById("modal-title").textContent = `Create Coolectible`

  document.getElementById("update-btn").textContent = `Create`

  document.getElementById("delete-btn").style.display = "none"

  document.getElementById("update-btn").addEventListener("click", function () {
    addNewItem(itemType)
  })
}

// Adds new figure via api call
const addNewItem = async function (itemType) {

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
    await uploadFigureImg(data.id);
    successMsg("Coolectible created!");

  } else {
    failedMsg("Failed to create Coolectible!")
  }
};


// Adds new collection via api call
const newCollectionSubmit = async function (event) {
  event.preventDefault();

  // grab dom els
  const name = document.querySelector('#name').value.trim() || null;
  const collection_type = document.querySelector('#collection_type').value.trim() || null;
  const description = document.querySelector('#description').value.trim() || null;

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
      description
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // error handling and confirmation message
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    await uploadCollectionImage(data.id);
    console.log('after');
    addSuccess();
  } else {
    addFailed();
  }
};




// Takes user images and uploads them 
// Collection image method
const uploadCollectionImage = async (collectionId) => {
  try {
    // get photo upload element
    const file = document.querySelector("#collection-photo-input-el").files[0];
    // create new form and add file option to it
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    // api call posts image to db
    const data = await fetch(`/api/images/collections/${collectionId}`, {
      method: 'POST',
      body: formData
    });
  } catch (err) {
    console.log(err);
  }
}

// Image upload for figure 
const uploadFigureImg = async (figureId) => {
  try {

    const file = document.querySelector("#actionfigure-photo-input-el").files[0];
    // create new form and add file option to it
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    const data = await fetch(`/api/images/actionfigure/${figureId}`, {
      method: 'POST',
      body: formData
    });

  } catch (err) {
    console.log(err);
  }

}

const uploadCardImg = async (cardId) => {
  try {

    const file = document.querySelector("#card-photo-input-el").files[0];
    // create new form and add file option to it
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const data = await fetch(`/api/images/card/${cardId}`, {
      method: 'POST',
      body: formData
    });

  } catch (err) {
    console.log(err);
  }

}

const uploadCoinImg = async (coinId) => {
  try {

    const file = document.querySelector("#coin-photo-input-el").files[0];
    // create new form and add file option to it
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const data = await fetch(`/api/images/coin/${coinId}`, {
      method: 'POST',
      body: formData
    });
  } catch (err) {
    console.log(err);
  }
}

const uploadMusicImg = async (musicId) => {
  try {

    const file = document.querySelector("#music-photo-input-el").files[0];

    // create new form and add file option to it
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const data = await fetch(`/api/images/music/${musicId}`, {
      method: 'POST',
      body: formData
    });
  } catch (err) {
    console.log(err);
  }
}

