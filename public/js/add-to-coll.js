
const addToCollBtn = document.querySelector("#add-to-coll");

addToCollBtn.onclick = function () {
    modal.innerHTML = addToCollectionHtml;
    cancelBtnFunction();
    
    const type = addToCollBtn.dataset.type

    

    document.querySelector('#next-btn').addEventListener("click", function (event) {
    //   if (select.value === "Action Figure") {

    //     newFigureForm(event);
    //   }
    //   else if (select.value === "Music") {
    //     newMusicForm(event);
    //   }
    //   else if (select.value === "Coin") {
    //     newCoinForm(event);
    //   }
    //   else if (select.value === "Card") {
    //     newCardForm(event);
    //   }
    })
    modal.style.display = "block";
  }


  // Calls dom query to find close button on modal
const cancelBtnFunction = () => {
    const addToCancelBtn = document.getElementById("close");
    addToCancelBtn.onclick = function () { modal.style.display = "none" };
  }

const addToCollectionHtml = `
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