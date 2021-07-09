import { MinHeap } from './modules/DataStructures.js'
//internal representation of the data
let grid = [];
grid.animationSpeed = 0;
grid.inUse = false;

const gridSizeSlider = document.querySelector("#grid-size-slider");
const gridWrapper = document.querySelector(".visualiser");
const clearBtn = document.querySelector('#clear-board');
const animationSpeedBtn = document.querySelector('#animation-speed');

const pathfindingDropdownBtn = document.querySelector('#pathfinding-dropdown');
const mazeGenDroptdownBtn = document.querySelector('#maze-gen-dropdown');

class Node {
  constructor(id) {
    this.id = id;
    this.index = id.split("-").map( x => Number(x));
    this.x = [...this.index][1];
    this.y = [...this.index][0];
    this.visited = false;
    this.isWall = false;
    this.isStart = false;
    this.isEnd = false;
    this.DOMRef;
  }

  up() {
    if (this.y <= 0) {
      return null;
    } else {
      return grid[this.y-1][this.x];
    }
  }

  right() {
    if (this.x >= grid[0].length - 1) {
      return null;
    } else {
      return grid[this.y][this.x+1];
    }
  }

  down() {
    if (this.y >= grid.length - 1) {
      return null;
    } else {
      return grid[this.y+1][this.x];
    }
  }

  left() {
    if (this.x <= 0) {
      return null;
    } else {
      return grid[this.y][this.x-1];
    }
  }

  getNeighbors() {
    return {
      up: this.up(),
      right: this.right(),
      down: this.down(),
      left: this.left()
    };
  }

  getNeighborsReversed() {
    return {
      left: this.left(),
      down: this.down(),
      right: this.right(),
      up: this.up()
    }
  }
}

//helper method for clearing all DOM element child nodes
HTMLElement.prototype.empty = function () {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
};



//---------------
//
//EVENT LISTENER DEFS
//
//---------------


//initialise grid
createGrid(parseInt(gridSizeSlider.value), gridWrapper);
setStartEndNodes();

//update grid and populte dom with divs as range slider is updated and on page load
gridSizeSlider.addEventListener("input", handleRangeInputSlider);

function handleRangeInputSlider() {
  grid.length = 0;
  gridWrapper.empty();
  createGrid(Number(gridSizeSlider.value), gridWrapper);
  setStartEndNodes();
}

pathfindingDropdownBtn.addEventListener('click', e => {
  switch (e.target.value) {
    case "a*":
      clearVisited();
      aStar();
      break;
    case "dfs":
      clearVisited();
      depthFirstSearch()
      break;
    case "bfs":
      clearVisited();
      breadthFirstSearch();
      break;
    case "gbfs":
      clearVisited();
      greedyBreadthFirstSearch();
      break;
    case "bdbfs":
      clearVisited();
      biDirectionalBreadthFirstSearch();
      break;
    
    default:
      return;
  }
});

mazeGenDroptdownBtn.addEventListener('click', e => {
  switch (e.target.id) {
    case 'recursive-backtracker':
      clearButton();
      generateMazeRecursiveBacktracker(5, 5);
      break;
    case 'recursive-division':
      clearButton();
      generateWallsPerimiter();
      generateWallsRecursiveDivision(1, 1, grid[0].length - 2, grid.length - 2,
        chooseOrientation(grid[0].length, grid.length));
      break;
    case 'random-walls':
      clearButton();
      generateWallsRandom();
      break;
    default:
      return;
  }
});

animationSpeedBtn.addEventListener('click', e => {
  switch (e.target.value){
    case 'fast':
      //change from fastto slow on click
      e.target.value = 'slow';
      e.target.innerHTML = 'Animation Speed: Slow'
      grid.animationSpeed = 15;
      break;
    
    case 'slow':
      //change from slow to none on click
      e.target.value = 'instant';
      e.target.innerHTML = 'Animation Speed: None';
      grid.animationSpeed = 0;
      break;

    default:
      //change from instant to fast on click
      e.target.value = 'fast';
      e.target.innerHTML = 'Animation Speed: Fast';
      grid.animationSpeed = 5;
      break;
  }
});

clearBtn.addEventListener('click', clearButton);

function clearButton() {
  grid.map(row => row.map(node => {
    node.isWall = false;
    node.visited = false;
    node.DOMRef.classList.remove('wall-node');
    node.DOMRef.classList.remove('visited');
    node.DOMRef.classList.remove('path-node');
  }))
}

function clearVisited() {
  grid.map(row => row.map( node => {
    node.visited = false;
    node.DOMRef.classList.remove('visited');
    node.DOMRef.classList.remove('path-node');
  }))
}



function setStartEndNodes() {
  const gridWidth = grid[0].length - 1;
  const gridHeight = grid.length - 1

  const startAndEndY = Math.floor(gridHeight / 2);
  const startX = Math.floor(0.15 * gridWidth);
  const endX = Math.ceil(0.85 * gridWidth);

  grid[startAndEndY][startX].isStart = true;
  grid[startAndEndY][startX].DOMRef.classList.add('start-node');
  grid.startNode = [startAndEndY, startX];

  grid[startAndEndY][endX].isEnd = true;
  grid[startAndEndY][endX].DOMRef.classList.add('end-node');
  grid.endNode = [startAndEndY, endX];

}



//inital value. would prefer to initialise to nothing but is janky unless I do this
let prevEle = gridWrapper.querySelector('div[id="0-0"]');

gridWrapper.addEventListener('mousedown', handleMousedown);

function handleMousedown(e) {
  e.preventDefault();
  if (!e.target.classList.contains('visualiser')) {
    const DOMEle = e.target;
    const isWall = e.target.classList.contains('wall-node');
    const isStart = e.target.classList.contains('start-node');
    const isEnd = e.target.classList.contains('end-node');

    if (e.buttons === 1 && !isWall && !isStart && !isEnd) {
      gridWrapper.querySelector(`div[id="${DOMEle.id}"]`).classList.add('wall-node');
      const gridCoords = DOMEle.id.split('-');
      grid[gridCoords[0]][gridCoords[1]].isWall = true;
      prevEle = DOMEle;
    } else if (e.buttons === 1 && isWall && !isStart && !isEnd){
      gridWrapper.querySelector(`div[id="${DOMEle.id}"]`).classList.remove('wall-node');
      const gridCoords = DOMEle.id.split('-');
      grid[gridCoords[0]][gridCoords[1]].isWall = false;
      prevEle = DOMEle;
    } else if (e.buttons === 1 && isStart) {
      prevEle = DOMEle;
    } else if (e.buttons === 1 && isEnd) {
      prevEle = DOMEle;
    }
  } 
}



gridWrapper.addEventListener('mouseover', handleMouseover);

function handleMouseover(e) {
  if (!e.target.classList.contains('visualiser')) {
   
   const DOMEle = e.target;
   const isWall = e.target.classList.contains('wall-node');
   const isStart = e.target.classList.contains('start-node');
   const isEnd = e.target.classList.contains('end-node');
 
   if (e.target != prevEle) {
     if (e.buttons === 1 && prevEle.classList.contains('start-node')) {
       prevEle.classList.remove('start-node');
       const prevGridCoords = prevEle.id.split('-');
       grid[prevGridCoords[0]][prevGridCoords[1]].isStart = false;
 
       const current = gridWrapper.querySelector(`div[id="${DOMEle.id}"]`);
       const gridCoords = current.id.split('-');

       current.classList.add('start-node');
       grid[gridCoords[0]][gridCoords[1]].isStart = true;
       grid.startNode = [parseInt(gridCoords[0]), parseInt(gridCoords[1])];
 
       current.classList.remove('wall-node');
       grid[gridCoords[0]][gridCoords[1]].isWall = false;
 
       prevEle = DOMEle;

     } else if (e.buttons === 1 && prevEle.classList.contains('end-node')) {
       prevEle.classList.remove('end-node');
       const prevGridCoords = prevEle.id.split('-');
       grid[prevGridCoords[0]][prevGridCoords[1]].isEnd = false;
 
       const current = gridWrapper.querySelector(`div[id="${DOMEle.id}"]`);
       const gridCoords = current.id.split('-');
       current.classList.add('end-node');
       grid[gridCoords[0]][gridCoords[1]].isEnd = true;
       grid.endNode = [parseInt(gridCoords[0]), parseInt(gridCoords[1])];
 
       current.classList.remove('wall-node');
       grid[gridCoords[0]][gridCoords[1]].isWall = false;
 
       prevEle = DOMEle;
 
     } else if (e.buttons === 1 && isWall && !isStart && !isEnd) {
       gridWrapper.querySelector(`div[id="${DOMEle.id}"]`).classList.remove('wall-node');
       const gridCoords = DOMEle.id.split('-');
       grid[gridCoords[0]][gridCoords[1]].isWall = false;
       prevEle = DOMEle;
 
     } else if (e.buttons === 1 && !isWall && !isStart && !isEnd) {
       gridWrapper.querySelector(`div[id="${DOMEle.id}"]`).classList.add('wall-node');
       const gridCoords = DOMEle.id.split('-');
       grid[gridCoords[0]][gridCoords[1]].isWall = true;
       prevEle = DOMEle;
     }
  }}
 }


 //---------------------------------------------
 //
 //GRAPH ALGO'S
 //
 //---------------------------------------------

 function randInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createGrid(gridSize, wrapper) {
  const wrapperWidth = wrapper.offsetWidth;
  const wrapperHeight = wrapper.offsetHeight;

  const gridWidth = gridSize;
  const gridHeight = Math.round(gridSize * 0.45);

  const divWidth = (wrapperWidth / gridWidth).toFixed(3);
  const divHeight = (wrapperHeight / gridHeight).toFixed(3);

  for (let y = 0; y < gridHeight; y++) {
    grid.push(new Array());
    for (let x = 0; x < gridWidth; x++) {
      const div = document.createElement("div");
      div.classList.add("node");
      div.setAttribute("id", y + "-" + x);
      div.style.width = divWidth + "px";
      div.style.height = divHeight + "px";
      wrapper.append(div);

      grid[y].push(new Node(`${y}-${x}`));
      grid[y][x].DOMRef = div;
    }
  }
}

function generateWallsRandom() {
  const height = grid.length-1;
  const width = grid[0].length -1

  const totalWalls = (height * width) /4;
  const nodesToAnimate = [];

  for (let i=0; i < totalWalls; i++) {
    const y = randInt(height);
    const x = randInt(width);
    if (grid[y][x].isWall || grid[y][x].isStart || grid[y][x].isEnd) {
      i--;
    } else {
      nodesToAnimate.push(grid[y][x])
    }
  }
  animateNodes(nodesToAnimate, 'wall');
}

function generateWallsPerimiter() {
    const nodesToAnimate = grid.map((row, index1) => row.map((node, index2) => {
    
    if (index1 === 0 || index1 === grid.length-1) {
      return node
    } else if(index2 === 0 || index2 === row.length-1){
      return node
    }
  }))
  .flat()
  .filter(n => n);

  animateNodes(nodesToAnimate, 'wall')
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

function generateWallsRecursiveDivision(xStart, yStart, xEnd, yEnd, orientation) {
  let height = yEnd - yStart;
  let width = xEnd - xStart;

  if ((width < 3 ) || (height < 3)) {
    console.log('passed call width: ' + width + ' height: ' + height)
    return;
  }
  console.log('New Grid = xstart '+xStart+', yStart ' + yStart + ', xEnd ' + xEnd + ', yEnd ' +yEnd)
  
  if (orientation == "horizontal") {
    console.log(orientation);
    let yDivideCoord = randInt(yEnd - 1, yStart + 1);
    let holeCoord = randInt(xEnd - 1, xStart + 1);
    console.log('yDivideCoord: ' + yDivideCoord);

    for (let i = xStart; i <= xEnd; i++) {
      i !== holeCoord ? console.log(i) : console.log('HOLE!');
      if (i === holeCoord || grid[yDivideCoord][i].isEnd || grid[yDivideCoord][i].isStart) {
        continue;
      }
      console.log(grid[yDivideCoord][i]);
      grid[yDivideCoord][i].isWall = true;
      grid[yDivideCoord][i].DOMRef.classList.add('wall-node');
    }
    let dir = chooseOrientation(width, height - yDivideCoord - 1);
    // console.log(xStart, yStart, width, yDivideCoord, dir)
    generateWallsRecursiveDivision(xStart, yStart, xEnd, yDivideCoord-1, dir);
  
    dir = chooseOrientation(width, height - yDivideCoord + 1);
    generateWallsRecursiveDivision(xStart, yDivideCoord+1, xEnd, yEnd, dir);

  } else if (orientation == "vertical") {
    console.log(orientation);
    let xDivideCoord = randInt(xEnd -1, xStart + 1);
    let holeCoord = randInt(yEnd -1, yStart + 1);
    console.log('xDivideCoord: ' + xDivideCoord);

    for (let i = yStart; i <= yEnd; i++) {
      i !== holeCoord ? console.log(i) : console.log('HOLE!');
      if (i === holeCoord || grid[i][xDivideCoord].isEnd || grid[i][xDivideCoord].isStart) {
        continue;
      }
    
      grid[i][xDivideCoord].isWall = true;
      grid[i][xDivideCoord].DOMRef.classList.add('wall-node');
    }
      let dir = chooseOrientation(width - xDivideCoord - 1, height);
      // console.log(xStart, yStart, xDivideCoord, height, dir);
      generateWallsRecursiveDivision(xStart, yStart, xDivideCoord - 1, yEnd, dir);
  
      dir = chooseOrientation(width - xDivideCoord + 1, height);
      generateWallsRecursiveDivision(xDivideCoord + 1, yStart, xEnd, yEnd, dir);
  }
}

function breadthFirstSearch() {
  const queue = [];
  const nodesToDisplay = []

  const endNode = grid[grid.endNode[0]][grid.endNode[1]];
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];

  const prev = grid.map(row => row.map(n => null));
  const visited = grid.map(row => row.map(n => false));
  
  queue.push(startNode);

  while (queue.length) {
    let currentNode = queue.shift();

    // nodesToDisplay.push(currentNode);

    if (currentNode === endNode) {
      const shortestPath = getShortestPath(currentNode, prev, startNode);
      animateNodes(nodesToDisplay, 'visited');
      animateNodes(shortestPath, 'path');
      
      return;
    }

    const neighbors = Object.values(currentNode.getNeighbors()).filter(n => {
      if (n && !n.isWall) return n
    });

    for (let neighbor of neighbors) {
      if (visited[neighbor.y][neighbor.x]) continue;

      visited[neighbor.y][neighbor.x] = true;
      nodesToDisplay.push(neighbor)
      // neighbor.DOMRef.classList.add('visited');
      prev[neighbor.y][neighbor.x] = currentNode;
      queue.push(neighbor);
    }
  }
  animateNodes(nodesToDisplay, 'visited');
}

function biDirectionalBreadthFirstSearch() {
  const endNode = grid[grid.endNode[0]][grid.endNode[1]];
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];
  const nodesToDisplay = [];

  const startNodeQueue = [];
  const startNodePrev = grid.map(row => row.map(_ => null));
  const startVisited = grid.map(row => row.map(_ => false));
  startNodeQueue.push(startNode);


  const endNodeQueue = [];
  const endNodePrev = grid.map(row => row.map(_ => null));
  const endVisited = grid.map(row => row.map(_ => false));
  endNodeQueue.push(endNode);

  while (endNodeQueue.length && startNodeQueue.length) {
    const currentEndNode = endNodeQueue.shift();
    const currentStartNode = startNodeQueue.shift();
    let intersection;

    for (let y=0; y < startVisited.length; y++) {
      for (let x=0; x < startVisited.length; x++) {
        if (startVisited[y][x] && endVisited[y][x]) {
          intersection = grid[y][x];
          break;
        }
      }
    }
    
    if (intersection) {
      animateNodes(nodesToDisplay, 'visited');
      const shortestPathStart = getShortestPath(intersection, startNodePrev, startNode);
      const shortestPathEnd = getShortestPath(intersection, endNodePrev, endNode);
      shortestPathStart.push(intersection);
      animateNodes(shortestPathStart.concat(shortestPathEnd.reverse()), 'path');
      return
    }

    const startNeighbors = Object.values(currentStartNode.getNeighbors()).filter(n => n && !n.isWall);
    const endNeighbors = Object.values(currentEndNode.getNeighborsReversed()).filter(n => n && !n.isWall);

    for (let neighbor of startNeighbors) {
      if(startVisited[neighbor.y][neighbor.x]) continue;

      startVisited[neighbor.y][neighbor.x] = true;
      nodesToDisplay.push(neighbor);
      startNodePrev[neighbor.y][neighbor.x] = currentStartNode;
      startNodeQueue.push(neighbor);
    }

    for (let neighbor of endNeighbors) {
      if (endVisited[neighbor.y][neighbor.x]) continue;
  
      endVisited[neighbor.y][neighbor.x] = true;
      nodesToDisplay.push(neighbor);
      endNodePrev[neighbor.y][neighbor.x] = currentEndNode;
      endNodeQueue.push(neighbor);
    }
  }

  animateNodes(nodesToDisplay, 'visited');
}

function manhattanDist(yCurrent, xCurrent, yEnd, xEnd) {
  return Math.abs((yEnd - yCurrent)) + Math.abs((xEnd - xCurrent))
}

function greedyBreadthFirstSearch() {
  const visitedNodesToDisplay = [];
  const visited = grid.map(row => row.map(node => false));
  const horizDist = grid.map(row => row.map(node => Infinity));
  const prev = grid.map(row => row.map(node => null));
  
  const priorityQueue = new MinHeap;
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];
  const endNode = grid[grid.endNode[0]][grid.endNode[1]];
  let currentHorizDist = manhattanDist(startNode.y, startNode.x, endNode.y, endNode.x);

  priorityQueue.insert([currentHorizDist, startNode]);
  
  while (!priorityQueue.isEmpty()) {
    const [currentHorizDist, currentNode] = priorityQueue.extractMin();
    visited[currentNode.y][currentNode.x] = true;
    visitedNodesToDisplay.push(currentNode);

    if (currentNode === endNode) {
      const shortestPath = getShortestPath(currentNode, prev, startNode);
      animateNodes(visitedNodesToDisplay, 'visited');
      animateNodes(shortestPath, 'path');
      return
    };

    const neighbors = Object.values(currentNode.getNeighbors()).filter(n => {
      if (n && !n.isWall) return n;
    });

    for (let neighbor of neighbors) {
      if (visited[neighbor.y][neighbor.x]) continue;

      let newHorizDist = manhattanDist(neighbor.y, neighbor.x, endNode.y, endNode.x);
      if (newHorizDist < horizDist[neighbor.y][neighbor.x]) {
        horizDist[neighbor.y][neighbor.x] = newHorizDist;
        priorityQueue.insert([newHorizDist, neighbor]);
        prev[neighbor.y][neighbor.x] = currentNode;
      }      
    }
  }
  animateNodes(visitedNodesToDisplay, 'visited');
}


function aStar() {
  const visitedNodesToDisplay = [];
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];
  const endNode = grid[grid.endNode[0]][grid.endNode[1]];

  const visited = grid.map(row => row.map(node => false));
  const prev = grid.map(row => row.map(node => null));
  const horizDist = grid.map(row => row.map(node => Infinity));

  horizDist[startNode.y][startNode.x] = 0;
  const weight = 1
  let currentHorizDist = manhattanDist(startNode.y, startNode.x, endNode.y, endNode.x);

  

  const priorityQueue = new MinHeap;
  priorityQueue.insert([0, startNode]);

  while(!priorityQueue.isEmpty()) {
    const [currentGlobalCost, currentNode] = priorityQueue.extractMin();
    visited[currentNode.y][currentNode.x] = true;
    visitedNodesToDisplay.push(currentNode);

    if (currentNode == endNode) {
      const shortestPath = getShortestPath(currentNode, prev, startNode);
      animateNodes(visitedNodesToDisplay, 'visited');
      animateNodes(shortestPath, 'path');
      break;
    };

    const neighbors = Object.values(currentNode.getNeighbors()).filter(n => n && !n.isWall);
    
    for (let neighbor of neighbors){
      if (visited[neighbor.y][neighbor.x]) continue;
      
      const newNeighborDist = horizDist[currentNode.y][currentNode.x] + weight;
      const neighborHorizDist = manhattanDist(neighbor.y, neighbor.x, endNode.y, endNode.x);
      const newGlobalCost = newNeighborDist + neighborHorizDist;
      // console.log( newNeighborDist, neighborHorizDist, newGlobalCost);

      if (newGlobalCost < horizDist[neighbor.y][neighbor.x] + neighborHorizDist){
        horizDist[neighbor.y][neighbor.x] = newNeighborDist;
        priorityQueue.insert([newGlobalCost, neighbor]);
        prev[neighbor.y][neighbor.x] = currentNode;
      }
      
    
    }
  }
  animateNodes(visitedNodesToDisplay, 'visited');
}

function depthFirstSearch() {
  const stack = [];
  const nodesToDisplay = [];

  const endNode = grid[grid.endNode[0]][grid.endNode[1]];
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];

  const prev = grid.map(row => row.map(n => null));
  const visited = grid.map(row => row.map(n => false));
  visited[startNode.y][startNode.x];

  stack.push(startNode);

  while(stack.length) {
    const currentNode = stack.pop();
    visited[currentNode.y][currentNode.x] = true;
    nodesToDisplay.push(currentNode);

    if (currentNode == endNode) {
      
      const shortestPath = getShortestPath(currentNode, prev, startNode);
      animateNodes(nodesToDisplay, 'visited');
      animateNodes(shortestPath, 'path');
      return;
    }


    const neighbors = Object.values(currentNode.getNeighbors()).filter(n => {
      if (n && !n.isWall) return n;
    });

    for (let neighbor of neighbors) {
      if (visited[neighbor.y][neighbor.x]) continue;

      
      prev[neighbor.y][neighbor.x] = currentNode;
      stack.push(neighbor);
      // break;
    }
  }
  animateNodes(nodesToDisplay, 'visited');
}

function getShortestPath(currentNode, prev, startNode) {
  const shortestPath = [];
  while (true) {
    if (prev[currentNode.y][currentNode.x] == startNode) break;

    shortestPath.unshift(prev[currentNode.y][currentNode.x])
    currentNode = prev[currentNode.y][currentNode.x]
  }
  return shortestPath
}

function animateNodes (nodesArray, type, reverse = false) {
  const speed = grid.animationSpeed;
  console.log(speed);
  switch (type) {
    case 'wall':
      for (let i=0; i<nodesArray.length; i++) {
        const currentNode = nodesArray[i];
        if (speed === 0) {
          (reverse) ? currentNode.isWall = false : currentNode.isWall = true;
          (reverse) ? currentNode.DOMRef.classList.remove('wall-node') : currentNode.DOMRef.classList.add('wall-node');
        } else {
          setTimeout(() => {
            (reverse) ? currentNode.isWall = false : currentNode.isWall = true;
            (reverse) ? currentNode.DOMRef.classList.remove('wall-node') : currentNode.DOMRef.classList.add('wall-node');
          }, speed * i);
        }
      }
      break;
    
    case 'visited':
      for (let i=0; i<nodesArray.length; i++) {
        const node = nodesArray[i];
        if (speed === 0) {
          node.visited = true;
          node.DOMRef.classList.add('visited');         
      } else {
        setTimeout(() => {
          node.visited = true;
          node.DOMRef.classList.add('visited');
        }, speed * i);
      }
    }
    break;

    case 'path':
      for (let i=0; i<nodesArray.length; i++) {
        const node = nodesArray[i];
        if (speed === 0) {
          node.DOMRef.classList.add('path-node');
        } else {
          setTimeout(() => {
            node.DOMRef.classList.add('path-node');
          }, speed * i)
        }
      }
      break;

    default:
      return;
  }
}

function getRecursiveBacktrackerUnvisitedNeighbors(currentX, currentY, visited) {
  let possibleNeighbors = [
    [currentY - 2, currentX],
    [currentY, currentX + 2],
    [currentY + 2, currentX],
    [currentY, currentX - 2]
  ];

  let neighbors = [];

  for (let i=0; i < possibleNeighbors.length; i++) {
    let [y,x] = possibleNeighbors[i];
    if (y < 0 || y > grid.length - 1 || x < 0 || x > grid[0].length -1) continue;
    if (visited[y][x]) continue;

    neighbors.push([y,x]);
  }
  if (neighbors.length > 0) {
    const nextIdx = Math.floor(Math.random() * neighbors.length);
    return neighbors[nextIdx];
  } else {
    return
  }
}

function generateMazeRecursiveBacktracker(startX, startY) {
  grid.map(row => row.map(node => {
    if(node.isStart || node.isEnd) return;

    node.isWall = true;
    node.DOMRef.classList.add('wall-node');
  }));

  const visited = grid.map(row => row.map( _ => false));
  visited[startY][startX] = true;

  const nodesToAddWall = [];
  const stack = [];
  let [currentY, currentX] = [startY, startX];
  
  while(true) {
    
    let next = getRecursiveBacktrackerUnvisitedNeighbors(currentX, currentY, visited);
    console.log('next[Y, X] ' + next);
    nodesToAddWall.push(grid[currentY][currentX]);

    if (next) {
      stack.push(next);

      let [nextY, nextX] = next;
      visited[nextY][nextX] = true;
      let inbetweenWall;
      if (currentX === nextX) {
        if (currentY > nextY) {
          inbetweenWall = [currentY - 1, currentX]
        } else {
          inbetweenWall = [currentY + 1, currentX]
        }
      } else if (currentY === nextY) {
        if (currentX > nextX) {
          inbetweenWall = [currentY, currentX - 1]
        } else {
          inbetweenWall = [currentY, currentX + 1]
        }
      }

      nodesToAddWall.push(grid[inbetweenWall[0]][inbetweenWall[1]]);
      
      currentY = nextY;
      currentX = nextX;
    } else {
      console.log('no next')
      if (stack.length > 0) {
        next = stack.pop();

        [currentY, currentX] = next;
      } else {
        break;
      }

      
    }
  }
  animateNodes(nodesToAddWall, 'wall', true)
}

/* function djikstra() {
  const visited = grid.map(row => row.map(node => false));
  const weight = grid.map(row => row.map(node => (node.isWeight) ? 10 : 1 ));
  const dist = grid.map(row => row.map(node => Infinity));
  const prev = grid.map(row => row.map(node => null));
  const visitedNodesToDisplay = [];

  const startNode = grid[grid.startNode[0]][grid.startNode[1]];
  const endNode = grid[grid.endNode[0]][grid.endNode[1]];

  dist[startNode.y][startNode.x] = 0;
  const priorityQueue = new MinHeap;

  priorityQueue.insert([0, startNode]);

  while (!priorityQueue.isEmpty()) {
    const [currentDist, currentNode] = priorityQueue.extractMin();
    visited[currentNode.y][currentNode.x] = true;
    visitedNodesToDisplay.push(currentNode);
    console.log(priorityQueue.heap);

    

    if (currentNode == endNode) {
      animateNodes(visitedNodesToDisplay, 'visited');
      console.log(prev);
      break;
    }

    const neighbors = Object.values(currentNode.getNeighbors()).filter(n => {
      if (n && !n.isWall) return n;
    });

    for (const neighbor of neighbors) {
      if (visited[neighbor.y][neighbor.x]) {
        console.log('passed');
        continue;
      }

      let newDistance = currentDist + weight[neighbor.y][neighbor.x];

      if (newDistance < dist[neighbor.y][neighbor.x]) {
        dist[neighbor.y][neighbor.x] = newDistance;
        priorityQueue.insert([newDistance, neighbor]);
        prev[neighbor.y][neighbor.x] = currentNode;
      }
    }
  }

} */