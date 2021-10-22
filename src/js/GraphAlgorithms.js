import { MinHeap, grid } from './DataStructures';

//-----------------------------------------------------------------------------
//
//=============================================================================
//
//------------------------GRAPH ALGO'S AND HELPER FUCNTIONS--------------------
//
//=============================================================================
//
//-----------------------------------------------------------------------------

function randInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateWallsRandom() {
  const height = grid.length - 1;
  const width = grid[0].length - 1;

  const totalWalls = (height * width) / 3;
  const nodesToAnimate = [];
  nodesToAnimate.push('add wall');

  for (let i = 0; i < totalWalls; i++) {
    const y = randInt(height);
    const x = randInt(width);
    if (grid[y][x].isWall || grid[y][x].isStart || grid[y][x].isEnd) {
      i--;
    } else {
      nodesToAnimate.push(grid[y][x]);
    }
  }
  animateNodes(nodesToAnimate);
}

//-----------------------------------------------------
//Create Walls Recursive Backtracker and helper function
//-----------------------------------------------------

function chooseOrientation(width, height) {
  if (width < height) {
    return 'horizontal';
  } else if (height < width) {
    return 'vertical';
  } else {
    return Math.floor(Math.random() * 2) ? 'horizontal' : 'vertical';
  }
}

function generateWallsRecursiveDivision() {
  const wallsToAnimate = [];
  wallsToAnimate.push('add wall');
  const previousHoles = grid.map((row) => row.map((node) => false));

  grid.forEach((row, yIndex) =>
    row.forEach((node, xIndex) => {
      if (yIndex === 0 || yIndex === grid.length - 1) wallsToAnimate.push(node);
      else if (xIndex === 0 || xIndex === row.length - 1)
        wallsToAnimate.push(node);
    })
  );

  // const reversedBottomRow = wallsToAnimate.splice(-grid[0].length).reverse();
  // wallsToAnimate.concat(reversedBottomRow);
  // console.log(wallsToAnimate);

  const firstYStart = 1;
  const firstYEnd = grid.length - 2;
  const firstXStart = 1;
  const firstXEnd = grid[0].length - 2;

  const orientation = chooseOrientation(
    firstXEnd - firstXStart,
    firstYEnd - firstYStart
  );
  divide(firstYStart, firstYEnd, firstXStart, firstXEnd, orientation);
  animateNodes(wallsToAnimate);

  function divide(yStart, yEnd, xStart, xEnd, orient) {
    const width = xEnd - xStart + 1;
    const height = yEnd - yStart + 1;

    //prevents walls right next to eachother
    if (width < 2 || height < 2 || height * width < 5) return;

    if (orient === 'horizontal') {
      const yDivideCoord = randInt(yEnd - 1, yStart + 1);
      let holeCoord;

      if (previousHoles[yDivideCoord][xStart - 1]) {
        holeCoord = xStart;
      } else if (previousHoles[yDivideCoord][xEnd + 1]) {
        holeCoord = xEnd;
      } else {
        holeCoord = Math.random() > 0.5 ? xStart : xEnd;
        // holeCoord = randInt(xEnd, xStart);
      }

      for (let i = xStart; i <= xEnd; i++) {
        if (
          grid[yDivideCoord][i].isStart ||
          grid[yDivideCoord][i].isEnd ||
          i === holeCoord
        ) {
          previousHoles[yDivideCoord][i] = true;
        }
        if (previousHoles[yDivideCoord][i]) continue;

        wallsToAnimate.push(grid[yDivideCoord][i]);
      }

      //topside
      let orient = chooseOrientation(width, yDivideCoord - yStart);
      divide(yStart, yDivideCoord - 1, xStart, xEnd, orient);

      //bottomside
      orient = chooseOrientation(width, yEnd - yDivideCoord);
      divide(yDivideCoord + 1, yEnd, xStart, xEnd, orient);
    } else {
      const xDivideCoord = randInt(xEnd - 1, xStart + 1);

      let holeCoord;
      if (previousHoles[yStart - 1][xDivideCoord]) {
        holeCoord = yStart;
      } else if (previousHoles[yEnd + 1][xDivideCoord]) {
        holeCoord = yEnd;
      } else {
        holeCoord = Math.random() > 0.5 ? yStart : yEnd;
        // holeCoord = randInt(yEnd, yStart);
      }

      for (let i = yStart; i <= yEnd; i++) {
        if (
          grid[i][xDivideCoord].isStart ||
          grid[i][xDivideCoord].isEnd ||
          i === holeCoord
        ) {
          previousHoles[i][xDivideCoord] = true;
        }
        if (previousHoles[i][xDivideCoord]) continue;

        wallsToAnimate.push(grid[i][xDivideCoord]);
      }

      //divide left side
      let orient = chooseOrientation(xDivideCoord - xStart, height);
      divide(yStart, yEnd, xStart, xDivideCoord - 1, orient);

      //divide right side
      orient = chooseOrientation(xEnd - xDivideCoord, height);
      divide(yStart, yEnd, xDivideCoord + 1, xEnd, orient);
    }
  }
}

//-------------------------------------------------------------------------
//Create walls Recursive Backtracker and helper function
//-------------------------------------------------------------------------

function getRecursiveBacktrackerUnvisitedNeighbors(
  currentX,
  currentY,
  visited
) {
  let possibleNeighbors = [
    [currentY - 2, currentX],
    [currentY, currentX + 2],
    [currentY + 2, currentX],
    [currentY, currentX - 2],
  ];

  let neighbors = [];

  for (let i = 0; i < possibleNeighbors.length; i++) {
    let [y, x] = possibleNeighbors[i];
    if (y < 0 || y > grid.length - 1 || x < 0 || x > grid[0].length - 1)
      continue;
    if (visited[y][x]) continue;

    neighbors.push([y, x]);
  }
  if (neighbors.length > 0) {
    const nextIdx = Math.floor(Math.random() * neighbors.length);
    return neighbors[nextIdx];
  } else {
    return;
  }
}

function generateMazeRecursiveBacktracker(startX, startY) {
  grid.map((row) =>
    row.map((node) => {
      if (node.isStart || node.isEnd) return;

      node.isWall = true;
      node.DOMRef.classList.add('wall-node');
    })
  );

  const visited = grid.map((row) => row.map((_) => false));
  visited[startY][startX] = true;

  const nodesToAddWall = [];
  nodesToAddWall.push('remove wall');
  const stack = [];
  let [currentY, currentX] = [startY, startX];

  while (true) {
    let next = getRecursiveBacktrackerUnvisitedNeighbors(
      currentX,
      currentY,
      visited
    );
    nodesToAddWall.push(grid[currentY][currentX]);

    if (next) {
      stack.push(next);

      let [nextY, nextX] = next;
      visited[nextY][nextX] = true;
      let inbetweenWall;
      if (currentX === nextX) {
        if (currentY > nextY) {
          inbetweenWall = [currentY - 1, currentX];
        } else {
          inbetweenWall = [currentY + 1, currentX];
        }
      } else if (currentY === nextY) {
        if (currentX > nextX) {
          inbetweenWall = [currentY, currentX - 1];
        } else {
          inbetweenWall = [currentY, currentX + 1];
        }
      }

      nodesToAddWall.push(grid[inbetweenWall[0]][inbetweenWall[1]]);

      currentY = nextY;
      currentX = nextX;
    } else {
      if (stack.length > 0) {
        next = stack.pop();

        [currentY, currentX] = next;
      } else {
        break;
      }
    }
  }
  animateNodes(nodesToAddWall);
}

//horizontal manhattan distance from Greedy bfs and A* search

function manhattanDist(yCurrent, xCurrent, yEnd, xEnd) {
  return Math.abs(yEnd - yCurrent) + Math.abs(xEnd - xCurrent);
}

function greedyBreadthFirstSearch() {
  const visitedNodesToDisplay = [];
  visitedNodesToDisplay.push('visited');
  const visited = grid.map((row) => row.map((node) => false));
  const horizDist = grid.map((row) => row.map((node) => Infinity));
  const prev = grid.map((row) => row.map((node) => null));

  const priorityQueue = new MinHeap();
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];
  const endNode = grid[grid.endNode[0]][grid.endNode[1]];
  let currentHorizDist = manhattanDist(
    startNode.y,
    startNode.x,
    endNode.y,
    endNode.x
  );

  priorityQueue.insert([currentHorizDist, startNode]);

  while (!priorityQueue.isEmpty()) {
    const [currentHorizDist, currentNode] = priorityQueue.extractMin();
    visited[currentNode.y][currentNode.x] = true;
    visitedNodesToDisplay.push(currentNode);

    if (currentNode === endNode) {
      const shortestPath = getShortestPath(currentNode, prev, startNode);
      shortestPath.unshift('path');
      animateNodes(visitedNodesToDisplay.concat(shortestPath));
      return;
    }

    const neighbors = Object.values(currentNode.getNeighbors()).filter((n) => {
      if (n && !n.isWall) return n;
    });

    for (let neighbor of neighbors) {
      if (visited[neighbor.y][neighbor.x]) continue;

      let newHorizDist = manhattanDist(
        neighbor.y,
        neighbor.x,
        endNode.y,
        endNode.x
      );
      if (newHorizDist < horizDist[neighbor.y][neighbor.x]) {
        horizDist[neighbor.y][neighbor.x] = newHorizDist;
        priorityQueue.insert([newHorizDist, neighbor]);
        prev[neighbor.y][neighbor.x] = currentNode;
      }
    }
  }
  animateNodes(visitedNodesToDisplay);
}

function aStar() {
  const visitedNodesToDisplay = [];
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];
  const endNode = grid[grid.endNode[0]][grid.endNode[1]];

  const visited = grid.map((row) => row.map((node) => false));
  const prev = grid.map((row) => row.map((node) => null));
  const horizDist = grid.map((row) => row.map((node) => Infinity));

  horizDist[startNode.y][startNode.x] = 0;
  const weight = 1;
  let currentHorizDist = manhattanDist(
    startNode.y,
    startNode.x,
    endNode.y,
    endNode.x
  );

  const priorityQueue = new MinHeap();
  priorityQueue.insert([0, startNode]);
  visitedNodesToDisplay.push('visited');

  while (!priorityQueue.isEmpty()) {
    const [currentGlobalCost, currentNode] = priorityQueue.extractMin();
    visited[currentNode.y][currentNode.x] = true;
    visitedNodesToDisplay.push(currentNode);

    if (currentNode == endNode) {
      const shortestPath = getShortestPath(currentNode, prev, startNode);
      shortestPath.unshift('path');
      animateNodes(visitedNodesToDisplay.concat(shortestPath));
      break;
    }

    const neighbors = Object.values(currentNode.getNeighbors()).filter(
      (n) => n && !n.isWall
    );

    for (let neighbor of neighbors) {
      if (visited[neighbor.y][neighbor.x]) continue;

      const newNeighborDist = horizDist[currentNode.y][currentNode.x] + weight;
      const neighborHorizDist = manhattanDist(
        neighbor.y,
        neighbor.x,
        endNode.y,
        endNode.x
      );
      const newGlobalCost = newNeighborDist + neighborHorizDist;

      if (
        newGlobalCost <
        horizDist[neighbor.y][neighbor.x] + neighborHorizDist
      ) {
        horizDist[neighbor.y][neighbor.x] = newNeighborDist;
        priorityQueue.insert([newGlobalCost, neighbor]);
        prev[neighbor.y][neighbor.x] = currentNode;
      }
    }
  }
  animateNodes(visitedNodesToDisplay);
}

function breadthFirstSearch() {
  const queue = [];
  const visitedNodesToDisplay = [];
  visitedNodesToDisplay.push('visited');

  const endNode = grid[grid.endNode[0]][grid.endNode[1]];
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];

  const prev = grid.map((row) => row.map((n) => null));
  const visited = grid.map((row) => row.map((n) => false));

  queue.push(startNode);

  while (queue.length) {
    const currentNode = queue.shift();
    visited[currentNode.y][currentNode.x] = true;

    // nodesToDisplay.push(currentNode);

    if (currentNode === endNode) {
      const shortestPath = getShortestPath(currentNode, prev, startNode);
      shortestPath.unshift('path');
      animateNodes(visitedNodesToDisplay.concat(shortestPath));

      return;
    }

    const neighbors = Object.values(currentNode.getNeighbors()).filter((n) => {
      if (n && !n.isWall) return n;
    });

    for (let neighbor of neighbors) {
      if (visited[neighbor.y][neighbor.x]) continue;

      visited[neighbor.y][neighbor.x] = true;
      visitedNodesToDisplay.push(neighbor);
      prev[neighbor.y][neighbor.x] = currentNode;
      queue.push(neighbor);
    }
  }
  animateNodes(visitedNodesToDisplay);
}

function biDirectionalBreadthFirstSearch() {
  const endNode = grid[grid.endNode[0]][grid.endNode[1]];
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];
  const visitedNodesToDisplay = [];
  visitedNodesToDisplay.push('visited');

  const startNodeQueue = [];
  const startNodePrev = grid.map((row) => row.map((_) => null));
  const startVisited = grid.map((row) => row.map((_) => false));
  startNodeQueue.push(startNode);

  const endNodeQueue = [];
  const endNodePrev = grid.map((row) => row.map((_) => null));
  const endVisited = grid.map((row) => row.map((_) => false));
  endNodeQueue.push(endNode);

  while (endNodeQueue.length && startNodeQueue.length) {
    const currentEndNode = endNodeQueue.shift();
    const currentStartNode = startNodeQueue.shift();
    let intersection;

    for (let y = 0; y < startVisited.length; y++) {
      for (let x = 0; x < startVisited[0].length; x++) {
        if (startVisited[y][x] && endVisited[y][x]) {
          intersection = grid[y][x];
          break;
        }
      }
    }

    if (intersection) {
      const shortestPathStart = getShortestPath(
        intersection,
        startNodePrev,
        startNode
      );
      shortestPathStart.unshift('path');
      shortestPathStart.push(intersection);

      const shortestPathEnd = getShortestPath(
        intersection,
        endNodePrev,
        endNode
      );

      const pathNodesToDisplay = shortestPathStart.concat(
        shortestPathEnd.reverse()
      );
      animateNodes(visitedNodesToDisplay.concat(pathNodesToDisplay));
      return;
    }

    const startNeighbors = Object.values(
      currentStartNode.getNeighbors()
    ).filter((n) => n && !n.isWall);
    const endNeighbors = Object.values(
      currentEndNode.getNeighborsReversed()
    ).filter((n) => n && !n.isWall);

    for (let neighbor of startNeighbors) {
      if (startVisited[neighbor.y][neighbor.x]) continue;

      startVisited[neighbor.y][neighbor.x] = true;
      visitedNodesToDisplay.push(neighbor);
      startNodePrev[neighbor.y][neighbor.x] = currentStartNode;
      startNodeQueue.push(neighbor);
    }

    for (let neighbor of endNeighbors) {
      if (endVisited[neighbor.y][neighbor.x]) continue;

      endVisited[neighbor.y][neighbor.x] = true;
      visitedNodesToDisplay.push(neighbor);
      endNodePrev[neighbor.y][neighbor.x] = currentEndNode;
      endNodeQueue.push(neighbor);
    }
  }

  animateNodes(visitedNodesToDisplay);
}

function depthFirstSearch() {
  const stack = [];
  const visitedNodesToDisplay = [];
  visitedNodesToDisplay.push('visited');

  const endNode = grid[grid.endNode[0]][grid.endNode[1]];
  const startNode = grid[grid.startNode[0]][grid.startNode[1]];

  const prev = grid.map((row) => row.map(() => null));
  const visited = grid.map((row) => row.map(() => false));
  visited[startNode.y][startNode.x];

  stack.push(startNode);

  while (stack.length) {
    const currentNode = stack.pop();
    visited[currentNode.y][currentNode.x] = true;
    visitedNodesToDisplay.push(currentNode);

    if (currentNode == endNode) {
      const shortestPath = getShortestPath(currentNode, prev, startNode);
      shortestPath.unshift('path');
      animateNodes(visitedNodesToDisplay.concat(shortestPath));
      return;
    }

    const neighbors = Object.values(currentNode.getNeighbors()).filter((n) => {
      if (n && !n.isWall) return n;
    });

    for (let neighbor of neighbors) {
      if (visited[neighbor.y][neighbor.x]) continue;

      prev[neighbor.y][neighbor.x] = currentNode;
      stack.push(neighbor);
      // break;
    }
  }
  animateNodes(visitedNodesToDisplay);
}

function getShortestPath(currentNode, prevArray, startNode) {
  const shortestPath = [];
  while (true) {
    if (prevArray[currentNode.y][currentNode.x] == startNode) break;

    shortestPath.unshift(prevArray[currentNode.y][currentNode.x]);
    currentNode = prevArray[currentNode.y][currentNode.x];
  }
  return shortestPath;
}

function animateNodes(nodesArray) {
  const removeWallAnimation = [
    { transform: 'scale(1.2)', offset: 0.75 },
    { backgroundColor: 'hsl(0, 0%, 100%)' },
  ];
  const wallAnimation = [
    { transform: 'scale(1.2)', offset: 0.75 },
    { backgroundColor: 'hsla(240, 23%, 8%, 0.9)' },
  ];
  const visitedAnimation = [
    { transform: 'scale(.2)' },
    {
      borderRadius: '50%',
      backgroundColor: 'hsl(281, 53%, 24%)',
      offset: 0.25,
    },
    { transform: 'scale(1.2)', offset: 0.7 },
  ];
  const pathAnimation = [
    { transform: 'scale(.5)' },
    { backgroundColor: 'hsla(115, 41%, 30%, 0.397)', offset: 0.5 },
    { transform: 'scale(1.2)', offset: 0.75 },
  ];

  const speed = grid.animationSpeed;
  let nodeTypeToAnimate;

  for (let i = 0; i < nodesArray.length; i++) {
    const currentNode = nodesArray[i];

    if (typeof currentNode === 'string') {
      nodeTypeToAnimate = currentNode;
      continue;
    }

    if (nodeTypeToAnimate === 'add wall') {
      if (speed === 0) {
        currentNode.isWall = true;
        currentNode.DOMRef.classList.add('wall-node');
        if (i === nodesArray.length - 1) grid.canMutate = true;
      } else {
        setTimeout(() => {
          currentNode.isWall = true;
          currentNode.DOMRef.classList.add('wall-node');

          currentNode.DOMRef.animate(wallAnimation, 400);
          if (i === nodesArray.length - 1) grid.canMutate = true;
        }, speed * i);
      }
    } else if (nodeTypeToAnimate === 'remove wall') {
      if (speed === 0) {
        currentNode.isWall = false;
        currentNode.DOMRef.classList.remove('wall-node');
        if (i === nodesArray.length - 1) grid.canMutate = true;
      } else {
        setTimeout(() => {
          currentNode.isWall = false;
          currentNode.DOMRef.classList.remove('wall-node');
          currentNode.DOMRef.animate(removeWallAnimation, 400);
          if (i === nodesArray.length - 1) grid.canMutate = true;
        }, speed * i);
      }
    } else if (nodeTypeToAnimate === 'visited') {
      if (speed === 0) {
        currentNode.visited = true;
        currentNode.DOMRef.classList.add('visited');
        if (i === nodesArray.length - 1 && !nodesArray.includes('path')) {
          grid.canMutate = true;
        }
      } else {
        setTimeout(() => {
          currentNode.visited = true;
          currentNode.DOMRef.classList.add('visited');
          currentNode.DOMRef.animate(visitedAnimation, 500);
          if (i === nodesArray.length - 1 && !nodesArray.includes('path')) {
            grid.canMutate = true;
          }
        }, speed * i);
      }
    } else if (nodeTypeToAnimate === 'path') {
      if (speed === 0) {
        currentNode.DOMRef.classList.add('path-node');
        if (i === nodesArray.length - 1) grid.canMutate = true;
      } else {
        setTimeout(() => {
          currentNode.DOMRef.classList.add('path-node');
          currentNode.DOMRef.animate(pathAnimation, 500);
          if (i === nodesArray.length - 1) grid.canMutate = true;
        }, speed * i);
      }
    }
  }
}

export {
  generateWallsRandom,
  generateWallsRecursiveDivision,
  generateMazeRecursiveBacktracker,
  aStar,
  greedyBreadthFirstSearch,
  biDirectionalBreadthFirstSearch,
  breadthFirstSearch,
  depthFirstSearch,
};
