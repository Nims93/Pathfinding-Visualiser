//internal representation of the data
let grid = [];
const gridSizeSlider = document.querySelector("#grid-size-slider");
const gridSizeOutput = document.querySelector(".grid-size-output");
const gridWrapper = document.querySelector(".visualiser");
const demoBtn = document.querySelector("#demo-button");

//node object to populate grid cells
class Node {
  constructor(id) {
    this.id = id;
    this.index = id.split("-").map((x) => Number(x));
    this.x = [...this.index][1];
    this.y = [...this.index][0];
    this.visited = false;
    this.isWall = false;
    this.start = false;
    this.end = false;
  }

  up() {
    if (this.index[0] <= 0) {
      return null;
    } else {
      let index = [...this.index];
      index[0] = Number(index[0]) - 1;
      let upIndex = index.join("-");
      return upIndex;
    }
  }

  right() {
    if (this.index[1] >= grid[0][0].length - 1) {
      return null;
    } else {
      let index = [...this.index];
      index[1] = Number(index[1]) + 1;
      let rightIndex = index.join("-");
      return rightIndex;
    }
  }

  down() {
    if (this.index[0] >= grid.length - 1) {
      return null;
    } else {
      let index = [...this.index];
      index[0] = Number(index[0]) + 1;
      let downIndex = index.join("-");
      return downIndex;
    }
  }

  left() {
    if (this.index[1] <= 0) {
      return null;
    } else {
      let index = [...this.index];
      index[1] = Number(index[1]) - 1;
      let leftIndex = index.join("-");
      return leftIndex;
    }
  }

  getNeighbors() {
    let neighbors = {
      up: this.up(),
      right: this.right(),
      down: this.down(),
      left: this.left(),
    };
    return neighbors;
  }
}

//helper method for clearing all DOM element child nodes
HTMLElement.prototype.empty = function () {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
};

function randInt(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function populateGrid(gridSize) {
  for (i = 0; i < gridSize; i++) {
    grid.push([]);
    for (i2 = 0; i2 < gridSize; i2++) {
      grid[i].push(new Node(`${i}-${i2}`));
    }
  }
}

function populateDOM(wrapper) {
  const wrapperWidth = wrapper.offsetWidth;
  const wrapperHeight = wrapper.offsetHeight;

  let divWidth = wrapperWidth / grid.length;
  let divHeight = wrapperHeight / grid.length;

  for (i = 0, len = grid.length; i < len; i++) {
    for (i2 = 0, len2 = grid[i].length; i2 < len2; i2++) {
      const div = document.createElement("div");
      div.setAttribute("class", "node");
      div.setAttribute("id", i + "-" + i2);
      div.style.width = divWidth + "px";
      div.style.height = divHeight + "px";
      wrapper.append(div);
    }
  }
}

function sleep(time) {
  setTimeout((_) => {
    console.log(1);
  }, time);
}

function chooseOrientation(width, height) {
  if (width < height) {
    return "horizontal";
  } else if (height < width) {
    return "vertical";
  } else {
    Math.floor(Math.random() * 2) ? "horizontal" : "vertical";
  }
}

function generateWallsRandom() {
  let x = grid.length;
  let y = grid[0].length;
  let totalWallCells = Math.floor((x * y) / 4);
  for (let i = 0; i < totalWallCells; i++) {
    let wallX = randInt(x);
    let wallY = randInt(y);
    console.log("test");
    if (
      grid[wallX][wallY].isWall ||
      grid[wallX][wallY].start ||
      grid[wallX][wallY].end
    ) {
      i--;
    } else {
      let id = `${wallX}-${wallY}`;
      let div = gridWrapper.querySelector(`div[id="${id}"]`);
      div.classList.add("wall-node");
      grid[wallX][wallY].isWall = true;
    }
  }
}

function generateWallsPerimiter() {
  for (let i = 0; i < grid[0].length; i++) {
    grid[0][i].isWall = true;
    gridWrapper.querySelector(`div[id="0-${i}"]`).classList.add("wall-node");
  }
  for (let i = 1; i < grid.length; i++) {
    grid[i][0].isWall = true;
    grid[i][grid[i].length - 1].isWall = true;
    gridWrapper.querySelector(`div[id="${i}-0"]`).classList.add("wall-node");
    gridWrapper
      .querySelector(`div[id="${i}-${grid[i].length - 1}"]`)
      .classList.add("wall-node");
  }
  for (let i = grid[grid.length - 1].length - 1; i > 0; i--) {
    grid[grid.length - 1][i].isWall = true;
    gridWrapper
      .querySelector(`div[id="${grid[grid.length - 1].length - 1}-${i}"]`)
      .classList.add("wall-node");
  }
}

function chooseOrientation(width, height) {
  if (width < height) {
    return "horizontal";
  } else if (height < width) {
    return "vertical";
  } else {
    return Math.floor(Math.random() * 2) ? "horizontal" : "vertical";
  }
}

function createMaze(index) {
  let stack = [];
  let visitedNodes = [];
  stack.push(index);

  while (stack.length) {
    let [outerIndex, innerIndex] = stack.pop().split("-");
    let currNode = grid[outerIndex][innerIndex];
    if (visitedNodes.includes(currNode)) {
      continue;
    }

    let neighbors = Object.values(currNode.getNeighbors()).filter(Boolean);
  }
}

function depthFirstSearchTest(index) {
  //queue data structure
  let queue = [];
  let visitedNodes = [];
  queue.push(index);

  while (queue.length) {
    let [outerIndex, innerIndex] = queue.shift().split("-");
    //ERROR breaking here values are undefined after second interation
    let currNode = grid[outerIndex][innerIndex];
    if (visitedNodes.includes(currNode)) {
      continue;
    }

    let div = document.querySelector(`div[id="${outerIndex}-${innerIndex}"]`);
    div.classList.add("wall-node");

    //Push current vertex neighbors onto the stack that are within the bounds of the grid filtered by non null results returned by the Node getNeighbors method
    let neighborValues = Object.values(currNode.getNeighbors()).filter(Boolean);

    queue = queue.concat(neighborValues);

    console.log(`Queue: ${queue}`);
    visitedNodes.push(currNode);
    queue.unshift();

    sleep(500);
  }
}

//---------------
//
//EVENT LISTENER DEFS
//
//---------------

//initialise grid
gridSizeOutput.textContent = gridSizeSlider.value;
populateGrid(Number(gridSizeSlider.value));
populateDOM(gridWrapper);

//update grid and populte dom with divs as range slider is updated
gridSizeSlider.addEventListener("input", () => {
  grid = [];
  gridWrapper.empty();
  gridSizeOutput.textContent = gridSizeSlider.value;
  populateGrid(Number(gridSizeSlider.value));
  populateDOM(gridWrapper);
});

demoBtn.addEventListener("click", (e) => {
  // let outerIndex = Math.floor(Math.random() * grid.length);
  // let innerIndex = Math.floor(Math.random() * grid.length);
  // depthFirstSearchTest(`${outerIndex}-${innerIndex}`);
  // generateRandomWalls();
  generateWallsPerimiter();
  generateWallsRecursiveDivision(
    1,
    1,
    grid[0].length - 2,
    grid.length - 2,
    chooseOrientation(grid[0].length, grid.length)
  );
});

function generateWallsRecursiveDivision(
  xStart,
  yStart,
  xEnd,
  yEnd,
  orientation
) {
  let height = yEnd - yStart;
  let width = xEnd - xStart;

  if ((width <= 2 ) || (height <= 2)) {
    console.log('passed call')
    return;
  }
  
  if (orientation == "horizontal") {
    console.log(orientation);
    let yDivideCoord = randInt(yStart + 1, yEnd - 1);
    let holeCoord = randInt(xStart + 1, xEnd - 1);
    console.log('yDivideCoord: ' + yDivideCoord);
    for (i = xStart; i <= xEnd; i++) {
      i !== holeCoord ? console.log(i) : console.log('HOLE!');
      if (i === holeCoord) {
        continue;
      }
      grid[yDivideCoord][i].isWall = true;
      gridWrapper
        .querySelector(`div[id="${grid[yDivideCoord][i].id}"]`)
        .classList.add("wall-node");
    }
    let dir = chooseOrientation(width, height - yDivideCoord - 1);
    // console.log(xStart, yStart, width, yDivideCoord, dir)
    generateWallsRecursiveDivision(xStart, yStart, xEnd, yDivideCoord-1, dir);
  
    dir = chooseOrientation(width, height - yDivideCoord + 1);
    generateWallsRecursiveDivision(xStart, yDivideCoord+1, xEnd, yEnd, dir);

  } else if (orientation == "vertical") {
    console.log(orientation);
    let xDivideCoord = randInt(xStart + 1 , xEnd -1);
    let holeCoord = randInt(yStart + 1, yEnd -1);
    console.log('xDivideCoord: ' + xDivideCoord);
    for (i = yStart; i <= yEnd; i++) {
      i !== holeCoord ? console.log(i) : console.log('HOLE!');
      if (i === holeCoord) {
        continue;
      }
    
      grid[i][xDivideCoord].iswall = true;
      gridWrapper
        .querySelector(`div[id="${grid[i][xDivideCoord].id}"]`)
        .classList.add("wall-node");
    }
      let dir = chooseOrientation(width - xDivideCoord - 1, height);
      // console.log(xStart, yStart, xDivideCoord, height, dir);
      generateWallsRecursiveDivision(xStart, yStart, xDivideCoord - 1, yEnd, dir);
  
      dir = chooseOrientation(width - xDivideCoord + 1, height);
      generateWallsRecursiveDivision(xDivideCoord + 1, yStart, xEnd, yEnd, dir);
  }

  /* let horizontal = orientation == 'horizontal';

  let wallX = xStart + (horizontal ? 0 : randInt(xStart+1, xEnd-1));
  let wallY = yStart + (horizontal ? randInt(yStart+1, yEnd-1) : 0);
  let passageX = wallX + (horizontal ? randInt(xStart+1, xEnd-1) : 0);
  let passageY = wallY + (horizontal ? 0 : randInt(yStart, yEnd));

  let directionX = horizontal ? 1: 0;
  let directionY = horizontal ? 0: 1;

  let wallLength = horizontal ? xEnd - xStart : yEnd - yStart;

  let dir = horizontal ? 'S' : 'E'; */
}

/*function generateWallsRecursiveDivision(x, y, width, height, orientation) {
   if (width < 3 || height < 3) {return}

  horizontal = orientation === 'horizontal'
  let wallX = x + (horizontal ? 0 :randInt(width-2));
  let wallY = y +(horizontal ? randInt(height-2) : 0);

  //where will the passage through the wall exist
  let passageX = wallX = (horizontal ? randInt(width) : 0);
  let passageY = wallY = (horizontal ? 0 : randInt(height));

  let directionX = horizontal ? 1 : 0;
  let directionY = horizontal ? 0 : 1;

  let wallLength = horizontal ? width : height;
  let dir = horizontal ? 'S' : 'E';

  for (i=0; i < )
} */
