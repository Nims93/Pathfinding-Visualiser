import { Node, grid } from './DataStructures.js';
import {
  generateWallsRandom,
  generateWallsRecursiveDivision,
  generateMazeRecursiveBacktracker,
  aStar,
  greedyBreadthFirstSearch,
  biDirectionalBreadthFirstSearch,
  breadthFirstSearch,
  depthFirstSearch,
} from './GraphAlgorithms';

const gridSizeSlider = document.querySelector('#grid-size-slider');
const gridWrapper = document.querySelector('.visualiser');
const clearBtn = document.querySelector('#clear-board');
const animationSpeedBtn = document.querySelector('#animation-speed');
const pathfindingDropdownBtn = document.querySelector('#pathfinding-dropdown');
const mazeGenDroptdownBtn = document.querySelector('#maze-dropdown');
const tutorialBtn = document.querySelector('#help');

//helper method for clearing all DOM element child nodes
HTMLElement.prototype.empty = function () {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
};

//----------------------------------------------------------
//
//
//EVENT LISTENERS & UI FUNCTIONS
//
//
//------------------------------------------------------------

//initialise grid
grid.canMutate = false;
createGrid(parseInt(gridSizeSlider.value), gridWrapper);
setStartEndNodes();
grid.canMutate = true;

function createGrid(gridSize, visualiserWrapper) {
  const wrapperWidth = visualiserWrapper.clientWidth;
  const wrapperHeight = visualiserWrapper.clientHeight;

  const gridWidth = gridSize;
  const gridHeight = Math.floor(gridSize * 0.45);
  // console.log(wrapperWidth);

  const divWidth = (wrapperWidth / gridWidth).toFixed(3);
  const divHeight = (wrapperHeight / gridHeight).toFixed(3);

  for (let y = 0; y < gridHeight; y++) {
    grid.push(new Array());
    for (let x = 0; x < gridWidth; x++) {
      const div = document.createElement('div');
      div.classList.add('node');
      div.setAttribute('id', y + '-' + x);
      div.style.width = divWidth + 'px';
      div.style.height = divHeight + 'px';
      visualiserWrapper.append(div);

      grid[y].push(new Node(`${y}-${x}`));
      grid[y][x].DOMRef = div;
    }
  }
}

//update grid and populte dom with divs as range slider is updated and on page load
gridSizeSlider.addEventListener('input', handleGridSizeInputSlider);

function handleGridSizeInputSlider() {
  if (grid.canMutate) {
    grid.canMutate = false;
    grid.length = 0;
    gridWrapper.empty();
    createGrid(parseInt(gridSizeSlider.value), gridWrapper);
    setStartEndNodes();
    grid.canMutate = true;
  }
}

window.addEventListener('resize', handleGridSizeInputSlider);

pathfindingDropdownBtn.addEventListener('click', (e) => {
  if (grid.canMutate) {
    grid.canMutate = false;
    switch (e.target.value) {
      case 'a*':
        grid.previousAlgo = 'a*';
        clearVisited();
        aStar();
        break;
      case 'dfs':
        grid.previousAlgo = 'dfs';
        clearVisited();
        depthFirstSearch();
        break;
      case 'bfs':
        grid.previousAlgo = 'bfs';
        clearVisited();
        breadthFirstSearch();
        break;
      case 'gbfs':
        grid.previousAlgo = 'gbfs';
        clearVisited();
        greedyBreadthFirstSearch();
        break;
      case 'bdbfs':
        grid.previousAlgo = 'bdbfs';
        clearVisited();
        biDirectionalBreadthFirstSearch();
        break;

      default:
        return;
    }
  }
});

mazeGenDroptdownBtn.addEventListener('click', (e) => {
  if (grid.canMutate) {
    grid.canMutate = false;
    switch (e.target.id) {
      case 'recursive-backtracker':
        clearBoard();
        generateMazeRecursiveBacktracker(5, 5);
        break;
      case 'recursive-division':
        clearBoard();
        generateWallsRecursiveDivision();
        break;
      case 'random-walls':
        clearBoard();
        generateWallsRandom();
        break;
      default:
        return;
    }
  }
});

animationSpeedBtn.addEventListener('click', (e) => {
  switch (e.target.value) {
    case 'fast':
      //change from fast to slow on click
      e.target.value = 'slow';
      e.target.innerHTML = 'Animations: Slow';
      grid.animationSpeed = 15;
      break;

    case 'slow':
      //change from slow to none on click
      e.target.value = 'instant';
      e.target.innerHTML = 'Animations: None';
      grid.animationSpeed = 0;
      break;

    default:
      //change from none to fast on click
      e.target.value = 'fast';
      e.target.innerHTML = 'Animations: Fast';
      grid.animationSpeed = 5;
      break;
  }
});

clearBtn.addEventListener('click', () => {
  if (grid.canMutate) {
    grid.previousAlgo = null;
    clearBoard();
  }
});

function clearBoard() {
  grid.map((row) =>
    row.map((node) => {
      node.isWall = false;
      node.visited = false;
      node.DOMRef.classList.remove('wall-node');
      node.DOMRef.classList.remove('visited');
      node.DOMRef.classList.remove('path-node');
    })
  );
}

function clearVisited() {
  grid.map((row) =>
    row.map((node) => {
      node.visited = false;
      node.DOMRef.classList.remove('visited');
      node.DOMRef.classList.remove('path-node');
    })
  );
}

function setStartEndNodes() {
  const gridWidth = grid[0].length - 1;
  const gridHeight = grid.length - 1;

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

//inital value
let prevEle = gridWrapper.querySelector('div[id="0-0"]');

gridWrapper.addEventListener('mousedown', handleMousedown);

function handleMousedown(e) {
  e.preventDefault();
  if (!e.target.classList.contains('visualiser') && grid.canMutate) {
    const DOMEle = e.target;
    const isWall = e.target.classList.contains('wall-node');
    const isStart = e.target.classList.contains('start-node');
    const isEnd = e.target.classList.contains('end-node');

    if (e.buttons === 1 && !isWall && !isStart && !isEnd) {
      gridWrapper
        .querySelector(`div[id="${DOMEle.id}"]`)
        .classList.add('wall-node');
      const gridCoords = DOMEle.id.split('-');
      grid[gridCoords[0]][gridCoords[1]].isWall = true;
      prevEle = DOMEle;
    } else if (e.buttons === 1 && isWall && !isStart && !isEnd) {
      gridWrapper
        .querySelector(`div[id="${DOMEle.id}"]`)
        .classList.remove('wall-node');
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
  if (!e.target.classList.contains('visualiser') && grid.canMutate) {
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

        if (grid.previousAlgo)
          findPathOnStartOrEndNodeMouseDrag(grid.previousAlgo);
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

        if (grid.previousAlgo)
          findPathOnStartOrEndNodeMouseDrag(grid.previousAlgo);
      } else if (e.buttons === 1 && isWall && !isStart && !isEnd) {
        gridWrapper
          .querySelector(`div[id="${DOMEle.id}"]`)
          .classList.remove('wall-node');
        const gridCoords = DOMEle.id.split('-');
        grid[gridCoords[0]][gridCoords[1]].isWall = false;
        prevEle = DOMEle;
      } else if (e.buttons === 1 && !isWall && !isStart && !isEnd) {
        gridWrapper
          .querySelector(`div[id="${DOMEle.id}"]`)
          .classList.add('wall-node');
        const gridCoords = DOMEle.id.split('-');
        grid[gridCoords[0]][gridCoords[1]].isWall = true;
        prevEle = DOMEle;
      }
    }
  }
}

function findPathOnStartOrEndNodeMouseDrag(value) {
  if (grid.canMutate) {
    const prevAnimationSpeed = grid.animationSpeed;
    grid.animationSpeed = 0;
    switch (value) {
      case 'a*':
        clearVisited();
        aStar();
        break;
      case 'dfs':
        clearVisited();
        depthFirstSearch();
        break;
      case 'bfs':
        clearVisited();
        breadthFirstSearch();
        break;
      case 'gbfs':
        clearVisited();
        greedyBreadthFirstSearch();
        break;
      case 'bdbfs':
        clearVisited();
        biDirectionalBreadthFirstSearch();
        break;

      default:
        return;
    }
    grid.animationSpeed = prevAnimationSpeed;
  }
}

const closeTutorialBtnArray = document.querySelectorAll('.close-tutorial');

tutorialBtn.addEventListener('click', () => {
  const tutorialTransparencyLayer = document.querySelector(
    '.tutorial-transparency-layer'
  );
  tutorialTransparencyLayer.classList.add('visible');

  for (let closeBtn of closeTutorialBtnArray) {
    closeBtn.addEventListener('click', () => {
      tutorialTransparencyLayer.classList.remove('visible');
    });
  }
});

const tutorialNextAndPrevBtns = document.querySelectorAll(
  '.tutorial-switcher-btn'
);

for (let btn of tutorialNextAndPrevBtns) {
  btn.addEventListener('click', handleNextAndPreTutorialClick);
}

function handleNextAndPreTutorialClick(e) {
  const pageChangeBtn = e.currentTarget;
  const tutorialWrapper = document.querySelector('.tutorial-wrapper');

  for (let i = 0; i < tutorialWrapper.children.length; i++) {
    if (tutorialWrapper.children[i].classList.contains('visible')) {
      var currVisChildIdx = i;
      break;
    }
  }

  tutorialWrapper.children[currVisChildIdx].classList.remove('visible');

  if (pageChangeBtn.classList[0] === 'next-tutorial-slide') {
    currVisChildIdx + 1 < tutorialWrapper.children.length
      ? tutorialWrapper.children[currVisChildIdx + 1].classList.add('visible')
      : tutorialWrapper.children[0].classList.add('visible');
  } else {
    currVisChildIdx > 0
      ? tutorialWrapper.children[currVisChildIdx - 1].classList.add('visible')
      : tutorialWrapper.children[
          tutorialWrapper.children.length - 1
        ].classList.add('visible');
  }
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

//incase I find out how to stop two animateNodes loop running
//at the same time
/* function animateNodes(nodesArray, type, reverse = false) {
  const speed = grid.animationSpeed;

  switch (type) {
    case 'wall':
      let wallAnimation;
      reverse
        ? (wallAnimation = [
            { transform: 'scale(1.2)', offset: 0.75 },
            { backgroundColor: 'hsl(0, 0%, 100%)' },
          ])
        : [
            { transform: 'scale(1.2)', offset: 0.75 },
            { backgroundColor: 'hsla(240, 23%, 8%, 0.9)' },
          ];

      for (let i = 0; i < nodesArray.length; i++) {
        const currentNode = nodesArray[i];
        if (speed === 0) {
          reverse ? (currentNode.isWall = false) : (currentNode.isWall = true);
          reverse
            ? currentNode.DOMRef.classList.remove('wall-node')
            : currentNode.DOMRef.classList.add('wall-node');
          reverse
            ? currentNode.DOMRef.animate(wallAnimation, 400)
            : currentNode.DOMRef.animate(wallAnimation, 400);
        } else {
          setTimeout(() => {
            reverse
              ? (currentNode.isWall = false)
              : (currentNode.isWall = true);
            reverse
              ? currentNode.DOMRef.classList.remove('wall-node')
              : currentNode.DOMRef.classList.add('wall-node');
            reverse
              ? currentNode.DOMRef.animate(wallAnimation, 400)
              : currentNode.DOMRef.animate(wallAnimation, 400);
          }, speed * i);
        }
      }
      return true;

    case 'visited':
      const visitedAnimation = [
        { transform: 'scale(.2)' },
        {
          borderRadius: '50%',
          backgroundColor: 'hsl(281, 53%, 24%)',
          offset: 0.25,
        },
        { transform: 'scale(1.2)', offset: 0.7 },
      ];

      for (let i = 0; i < nodesArray.length; i++) {
        const currentNode = nodesArray[i];
        if (speed === 0) {
          currentNode.visited = true;
          currentNode.DOMRef.classList.add('visited');
        } else {
          setTimeout(() => {
            console.log(i, nodesArray.length);
            currentNode.visited = true;
            currentNode.DOMRef.classList.add('visited');
            currentNode.DOMRef.animate(visitedAnimation, 400);
          }, speed * i);
        }
      }
      return true;

    case 'path':
      const pathAnimation = [
        { transform: 'scale(.5)' },
        { backgroundColor: 'hsla(115, 41%, 30%, 0.397)', offset: 0.5 },
        { transform: 'scale(1.2)', offset: 0.75 },
      ];
      for (let i = 0; i < nodesArray.length; i++) {
        const node = nodesArray[i];
        if (speed === 0) {
          node.DOMRef.classList.add('path-node');
        } else {
          setTimeout(() => {
            node.DOMRef.classList.add('path-node');
            node.DOMRef.animate(pathAnimation, 400);
          }, speed * i);
        }
      }

    default:
      return;
  }
} */
