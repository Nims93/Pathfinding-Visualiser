let grid = [];
//helper method for clearing all DOM element child nodes
HTMLElement.prototype.empty = function () {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
};

function populateGrid(gridSize) {
  for (i = 0; i < gridSize; i++) {
    grid.push(Array(gridSize).fill("blank"));
  }
}

function populateDOM(wrapper) {
  const wrapperWidth = wrapper.offsetWidth;
  const wrapperHeight = wrapper.offsetHeight;
  // console.log(`Wrapper height = ${wrapperHeight}\nWrapper width = ${wrapperWidth}`)

  let divWidth = wrapperWidth / grid.length;
  let divHeight = wrapperHeight / grid.length;

  for (i = 0, len = grid.length ** 2; i < len; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "node");
    div.style.width = divWidth.toString() + "px";
    div.style.height = divHeight.toString() + "px";
    wrapper.append(div);
  }
}

//---------------
//
//EVENT LISTENER DEFS
//
//---------------

window.addEventListener("load", (e) => {
  const gridSizeSlider = document.querySelector("#grid-size");
  const gridSizeOutput = document.querySelector(".grid-size-output");
  const gridWrapper = document.querySelector(".visualiser");

  //initialise grid
  gridSizeOutput.textContent = gridSizeSlider.value;
  populateGrid(Number(gridSizeSlider.value));
  populateDOM(gridWrapper);

  //update grid as range slider is updated
  gridSizeSlider.addEventListener("input", () => {
    grid = [];
    gridWrapper.empty();
    gridSizeOutput.textContent = gridSizeSlider.value;
    populateGrid(Number(gridSizeSlider.value));
    populateDOM(gridWrapper);
  });
});
