// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/heap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinHeap = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MinHeap = /*#__PURE__*/function () {
  function MinHeap() {
    _classCallCheck(this, MinHeap);

    _defineProperty(this, "leftChild", function (index) {
      return index * 2 + 1;
    });

    _defineProperty(this, "rightChild", function (index) {
      return index * 2 + 2;
    });

    _defineProperty(this, "parent", function (index) {
      return Math.floor((index - 1) / 2);
    });

    this.heap = [];
  }

  _createClass(MinHeap, [{
    key: "isEmpty",
    value: function isEmpty() {
      return this.heap.length === 0;
    }
  }, {
    key: "swap",
    value: function swap(idx1, idx2) {
      var tmp = this.heap[idx1];
      this.heap[idx1] = this.heap[idx2];
      this.heap[idx2] = tmp;
    }
  }, {
    key: "peek",
    value: function peek() {
      return this.heap[0];
    }
  }, {
    key: "insert",
    value: function insert(element) {
      this.heap.push(element);
      var idx = this.heap.length - 1;

      while (idx !== 0 && this.heap[idx][0] < this.heap[this.parent(idx)][0]) {
        this.swap(idx, this.parent(idx));
        idx = this.parent(idx);
      }
    }
  }, {
    key: "extractMin",
    value: function extractMin() {
      //remove ele from the front of the heap
      var root = this.heap.shift(); //put the last element to the front of the heap and remove the last element from the
      //heap as it is now sitting at the front of the heap

      this.heap.unshift(this.heap[this.heap.length - 1]);
      this.heap.pop();
      this.heapify(0);
      return root;
    }
  }, {
    key: "heapify",
    value: function heapify(idx) {
      var left = this.leftChild(idx);
      var right = this.rightChild(idx);
      var biggest = idx; //if left node is bigger than the current node

      if (left < this.heap.length && this.heap[biggest][0] > this.heap[left][0]) {
        biggest = left;
      } //if the right child is bigger than the curr node


      if (right < this.heap.length && this.heap[biggest][0] > this.heap[right][0]) {
        biggest = right;
      } //if the value of the smallest has changed, then swap


      if (biggest != idx) {
        this.swap(biggest, idx);
        this.heapify(biggest);
      }
    }
  }]);

  return MinHeap;
}();

exports.MinHeap = MinHeap;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _heap = require("./modules/heap.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//internal representation of the data
var grid = [];
grid.animationSpeed = 0;
grid.inUse = false;
var gridSizeSlider = document.querySelector("#grid-size-slider");
var gridWrapper = document.querySelector(".visualiser");
var clearBtn = document.querySelector('#clear-board');
var animationSpeedBtn = document.querySelector('#animation-speed');
var pathfindingDropdownBtn = document.querySelector('#pathfinding-dropdown');
var mazeGenDroptdownBtn = document.querySelector('#maze-dropdown');

var Node = /*#__PURE__*/function () {
  function Node(id) {
    _classCallCheck(this, Node);

    this.id = id;
    this.index = id.split("-").map(function (x) {
      return Number(x);
    });
    this.x = _toConsumableArray(this.index)[1];
    this.y = _toConsumableArray(this.index)[0];
    this.visited = false;
    this.isWall = false;
    this.isStart = false;
    this.isEnd = false;
    this.DOMRef;
  }

  _createClass(Node, [{
    key: "up",
    value: function up() {
      if (this.y <= 0) {
        return null;
      } else {
        return grid[this.y - 1][this.x];
      }
    }
  }, {
    key: "right",
    value: function right() {
      if (this.x >= grid[0].length - 1) {
        return null;
      } else {
        return grid[this.y][this.x + 1];
      }
    }
  }, {
    key: "down",
    value: function down() {
      if (this.y >= grid.length - 1) {
        return null;
      } else {
        return grid[this.y + 1][this.x];
      }
    }
  }, {
    key: "left",
    value: function left() {
      if (this.x <= 0) {
        return null;
      } else {
        return grid[this.y][this.x - 1];
      }
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors() {
      return {
        up: this.up(),
        right: this.right(),
        down: this.down(),
        left: this.left()
      };
    }
  }, {
    key: "getNeighborsReversed",
    value: function getNeighborsReversed() {
      return {
        left: this.left(),
        down: this.down(),
        right: this.right(),
        up: this.up()
      };
    }
  }]);

  return Node;
}(); //helper method for clearing all DOM element child nodes


HTMLElement.prototype.empty = function () {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
}; //---------------
//
//EVENT LISTENERS
//
//---------------
//initialise grid


createGrid(parseInt(gridSizeSlider.value), gridWrapper);
setStartEndNodes(); //update grid and populte dom with divs as range slider is updated and on page load

gridSizeSlider.addEventListener("input", handleRangeInputSlider);

function handleRangeInputSlider() {
  grid.length = 0;
  gridWrapper.empty();
  createGrid(Number(gridSizeSlider.value), gridWrapper);
  setStartEndNodes();
}

window.addEventListener('resize', handleRangeInputSlider);
pathfindingDropdownBtn.addEventListener('click', function (e) {
  switch (e.target.value) {
    case "a*":
      clearVisited();
      aStar();
      break;

    case "dfs":
      clearVisited();
      depthFirstSearch();
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
mazeGenDroptdownBtn.addEventListener('click', function (e) {
  switch (e.target.id) {
    case 'recursive-backtracker':
      clearButton();
      generateMazeRecursiveBacktracker(5, 5);
      break;

    case 'recursive-division':
      clearButton();
      generateWallsRecursiveDivisionRedone();
      break;

    case 'random-walls':
      clearButton();
      generateWallsRandom();
      break;

    default:
      return;
  }
});
animationSpeedBtn.addEventListener('click', function (e) {
  switch (e.target.value) {
    case 'fast':
      //change from fastto slow on click
      e.target.value = 'slow';
      e.target.innerHTML = 'Animation Speed: Slow';
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
  grid.map(function (row) {
    return row.map(function (node) {
      node.isWall = false;
      node.visited = false;
      node.DOMRef.classList.remove('wall-node');
      node.DOMRef.classList.remove('visited');
      node.DOMRef.classList.remove('path-node');
    });
  });
}

function clearVisited() {
  grid.map(function (row) {
    return row.map(function (node) {
      node.visited = false;
      node.DOMRef.classList.remove('visited');
      node.DOMRef.classList.remove('path-node');
    });
  });
}

function setStartEndNodes() {
  var gridWidth = grid[0].length - 1;
  var gridHeight = grid.length - 1;
  var startAndEndY = Math.floor(gridHeight / 2);
  var startX = Math.floor(0.15 * gridWidth);
  var endX = Math.ceil(0.85 * gridWidth);
  grid[startAndEndY][startX].isStart = true;
  grid[startAndEndY][startX].DOMRef.classList.add('start-node');
  grid.startNode = [startAndEndY, startX];
  grid[startAndEndY][endX].isEnd = true;
  grid[startAndEndY][endX].DOMRef.classList.add('end-node');
  grid.endNode = [startAndEndY, endX];
} //inital value. would prefer to initialise to nothing but is janky unless I do this


var prevEle = gridWrapper.querySelector('div[id="0-0"]');
gridWrapper.addEventListener('mousedown', handleMousedown);

function handleMousedown(e) {
  e.preventDefault();

  if (!e.target.classList.contains('visualiser')) {
    var DOMEle = e.target;
    var isWall = e.target.classList.contains('wall-node');
    var isStart = e.target.classList.contains('start-node');
    var isEnd = e.target.classList.contains('end-node');

    if (e.buttons === 1 && !isWall && !isStart && !isEnd) {
      gridWrapper.querySelector("div[id=\"".concat(DOMEle.id, "\"]")).classList.add('wall-node');
      var gridCoords = DOMEle.id.split('-');
      grid[gridCoords[0]][gridCoords[1]].isWall = true;
      prevEle = DOMEle;
    } else if (e.buttons === 1 && isWall && !isStart && !isEnd) {
      gridWrapper.querySelector("div[id=\"".concat(DOMEle.id, "\"]")).classList.remove('wall-node');

      var _gridCoords = DOMEle.id.split('-');

      grid[_gridCoords[0]][_gridCoords[1]].isWall = false;
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
    var DOMEle = e.target;
    var isWall = e.target.classList.contains('wall-node');
    var isStart = e.target.classList.contains('start-node');
    var isEnd = e.target.classList.contains('end-node');

    if (e.target != prevEle) {
      if (e.buttons === 1 && prevEle.classList.contains('start-node')) {
        prevEle.classList.remove('start-node');
        var prevGridCoords = prevEle.id.split('-');
        grid[prevGridCoords[0]][prevGridCoords[1]].isStart = false;
        var current = gridWrapper.querySelector("div[id=\"".concat(DOMEle.id, "\"]"));
        var gridCoords = current.id.split('-');
        current.classList.add('start-node');
        grid[gridCoords[0]][gridCoords[1]].isStart = true;
        grid.startNode = [parseInt(gridCoords[0]), parseInt(gridCoords[1])];
        current.classList.remove('wall-node');
        grid[gridCoords[0]][gridCoords[1]].isWall = false;
        prevEle = DOMEle;
      } else if (e.buttons === 1 && prevEle.classList.contains('end-node')) {
        prevEle.classList.remove('end-node');

        var _prevGridCoords = prevEle.id.split('-');

        grid[_prevGridCoords[0]][_prevGridCoords[1]].isEnd = false;

        var _current = gridWrapper.querySelector("div[id=\"".concat(DOMEle.id, "\"]"));

        var _gridCoords2 = _current.id.split('-');

        _current.classList.add('end-node');

        grid[_gridCoords2[0]][_gridCoords2[1]].isEnd = true;
        grid.endNode = [parseInt(_gridCoords2[0]), parseInt(_gridCoords2[1])];

        _current.classList.remove('wall-node');

        grid[_gridCoords2[0]][_gridCoords2[1]].isWall = false;
        prevEle = DOMEle;
      } else if (e.buttons === 1 && isWall && !isStart && !isEnd) {
        gridWrapper.querySelector("div[id=\"".concat(DOMEle.id, "\"]")).classList.remove('wall-node');

        var _gridCoords3 = DOMEle.id.split('-');

        grid[_gridCoords3[0]][_gridCoords3[1]].isWall = false;
        prevEle = DOMEle;
      } else if (e.buttons === 1 && !isWall && !isStart && !isEnd) {
        gridWrapper.querySelector("div[id=\"".concat(DOMEle.id, "\"]")).classList.add('wall-node');

        var _gridCoords4 = DOMEle.id.split('-');

        grid[_gridCoords4[0]][_gridCoords4[1]].isWall = true;
        prevEle = DOMEle;
      }
    }
  }
} //---------------------------------------------
//
//GRAPH ALGO'S
//
//---------------------------------------------


function randInt(max) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createGrid(gridSize, wrapper) {
  var wrapperWidth = wrapper.offsetWidth;
  var wrapperHeight = wrapper.offsetHeight;
  var gridWidth = gridSize;
  var gridHeight = Math.round(gridSize * 0.45);
  var divWidth = (wrapperWidth / gridWidth).toFixed(3);
  var divHeight = (wrapperHeight / gridHeight).toFixed(3);

  for (var y = 0; y < gridHeight; y++) {
    grid.push(new Array());

    for (var x = 0; x < gridWidth; x++) {
      var div = document.createElement("div");
      div.classList.add("node");
      div.setAttribute("id", y + "-" + x);
      div.style.width = divWidth + "px";
      div.style.height = divHeight + "px";
      wrapper.append(div);
      grid[y].push(new Node("".concat(y, "-").concat(x)));
      grid[y][x].DOMRef = div;
    }
  }
}

function generateWallsRandom() {
  var height = grid.length - 1;
  var width = grid[0].length - 1;
  var totalWalls = height * width / 3;
  var nodesToAnimate = [];

  for (var i = 0; i < totalWalls; i++) {
    var y = randInt(height);
    var x = randInt(width);

    if (grid[y][x].isWall || grid[y][x].isStart || grid[y][x].isEnd) {
      i--;
    } else {
      nodesToAnimate.push(grid[y][x]);
    }
  }

  animateNodes(nodesToAnimate, 'wall');
}

function generateWallsPerimiter() {
  var nodesToAnimate = grid.map(function (row, index1) {
    return row.map(function (node, index2) {
      if (index1 === 0 || index1 === grid.length - 1) {
        return node;
      } else if (index2 === 0 || index2 === row.length - 1) {
        return node;
      }
    });
  }).flat().filter(function (n) {
    return n;
  });
  animateNodes(nodesToAnimate, 'wall');
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

function generateWallsRecursiveDivisionRedone() {
  var wallsToAnimate = [];
  var previousHoles = grid.map(function (row) {
    return row.map(function (node) {
      return false;
    });
  });
  grid.forEach(function (row, yIndex) {
    return row.forEach(function (node, xIndex) {
      if (yIndex === 0 || yIndex === grid.length - 1) wallsToAnimate.push(node);else if (xIndex === 0 || xIndex === row.length - 1) wallsToAnimate.push(node);
    });
  }); // const reversedBottomRow = wallsToAnimate.splice(-grid[0].length).reverse();
  // wallsToAnimate.concat(reversedBottomRow);
  // console.log(wallsToAnimate);

  var firstYStart = 1;
  var firstYEnd = grid.length - 2;
  var firstXStart = 1;
  var firstXEnd = grid[0].length - 2;
  var orientation = chooseOrientation(firstXEnd - firstXStart, firstYEnd - firstYStart);
  divide(firstYStart, firstYEnd, firstXStart, firstXEnd, orientation);
  animateNodes(wallsToAnimate, 'wall');

  function divide(yStart, yEnd, xStart, xEnd, orient) {
    var width = xEnd - xStart + 1;
    var height = yEnd - yStart + 1; //prevents walls right next to eachother

    if (width < 2 || height < 2 || height * width < 5) return;

    if (orient == 'horizontal') {
      var yDivideCoord = randInt(yEnd - 1, yStart + 1);
      var holeCoord;

      if (previousHoles[yDivideCoord][xStart - 1]) {
        holeCoord = xStart;
      } else if (previousHoles[yDivideCoord][xEnd + 1]) {
        holeCoord = xEnd;
      } else {
        holeCoord = Math.random() > .5 ? xStart : xEnd; // holeCoord = randInt(xEnd, xStart);
      }

      for (var i = xStart; i <= xEnd; i++) {
        if (grid[yDivideCoord][i].isStart || grid[yDivideCoord][i].isEnd || i === holeCoord) {
          previousHoles[yDivideCoord][i] = true;
        }

        if (previousHoles[yDivideCoord][i]) continue;
        wallsToAnimate.push(grid[yDivideCoord][i]);
      } //topside


      var _orient = chooseOrientation(width, yDivideCoord - yStart);

      divide(yStart, yDivideCoord - 1, xStart, xEnd, _orient); //bottomside

      _orient = chooseOrientation(width, yEnd - yDivideCoord);
      divide(yDivideCoord + 1, yEnd, xStart, xEnd, _orient);
    } else {
      var xDivideCoord = randInt(xEnd - 1, xStart + 1);

      var _holeCoord;

      if (previousHoles[yStart - 1][xDivideCoord]) {
        _holeCoord = yStart;
      } else if (previousHoles[yEnd + 1][xDivideCoord]) {
        _holeCoord = yEnd;
      } else {
        _holeCoord = Math.random() > .5 ? yStart : yEnd; // holeCoord = randInt(yEnd, yStart);
      }

      for (var _i = yStart; _i <= yEnd; _i++) {
        if (grid[_i][xDivideCoord].isStart || grid[_i][xDivideCoord].isEnd || _i === _holeCoord) {
          previousHoles[_i][xDivideCoord] = true;
        }

        if (previousHoles[_i][xDivideCoord]) continue;
        wallsToAnimate.push(grid[_i][xDivideCoord]);
      } //divide left side


      var _orient2 = chooseOrientation(xDivideCoord - xStart, height);

      divide(yStart, yEnd, xStart, xDivideCoord - 1, _orient2); //divide right side

      _orient2 = chooseOrientation(xEnd - xDivideCoord, height);
      divide(yStart, yEnd, xDivideCoord + 1, xEnd, _orient2);
    }
  }
}

function manhattanDist(yCurrent, xCurrent, yEnd, xEnd) {
  return Math.abs(yEnd - yCurrent) + Math.abs(xEnd - xCurrent);
}

function greedyBreadthFirstSearch() {
  var visitedNodesToDisplay = [];
  var visited = grid.map(function (row) {
    return row.map(function (node) {
      return false;
    });
  });
  var horizDist = grid.map(function (row) {
    return row.map(function (node) {
      return Infinity;
    });
  });
  var prev = grid.map(function (row) {
    return row.map(function (node) {
      return null;
    });
  });
  var priorityQueue = new _heap.MinHeap();
  var startNode = grid[grid.startNode[0]][grid.startNode[1]];
  var endNode = grid[grid.endNode[0]][grid.endNode[1]];
  var currentHorizDist = manhattanDist(startNode.y, startNode.x, endNode.y, endNode.x);
  priorityQueue.insert([currentHorizDist, startNode]);

  while (!priorityQueue.isEmpty()) {
    var _priorityQueue$extrac = priorityQueue.extractMin(),
        _priorityQueue$extrac2 = _slicedToArray(_priorityQueue$extrac, 2),
        _currentHorizDist = _priorityQueue$extrac2[0],
        currentNode = _priorityQueue$extrac2[1];

    visited[currentNode.y][currentNode.x] = true;
    visitedNodesToDisplay.push(currentNode);

    if (currentNode === endNode) {
      var shortestPath = getShortestPath(currentNode, prev, startNode);
      animateNodes(visitedNodesToDisplay, 'visited');
      animateNodes(shortestPath, 'path');
      return;
    }

    ;
    var neighbors = Object.values(currentNode.getNeighbors()).filter(function (n) {
      if (n && !n.isWall) return n;
    });

    var _iterator = _createForOfIteratorHelper(neighbors),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var neighbor = _step.value;
        if (visited[neighbor.y][neighbor.x]) continue;
        var newHorizDist = manhattanDist(neighbor.y, neighbor.x, endNode.y, endNode.x);

        if (newHorizDist < horizDist[neighbor.y][neighbor.x]) {
          horizDist[neighbor.y][neighbor.x] = newHorizDist;
          priorityQueue.insert([newHorizDist, neighbor]);
          prev[neighbor.y][neighbor.x] = currentNode;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  animateNodes(visitedNodesToDisplay, 'visited');
}

function aStar() {
  var visitedNodesToDisplay = [];
  var startNode = grid[grid.startNode[0]][grid.startNode[1]];
  var endNode = grid[grid.endNode[0]][grid.endNode[1]];
  var visited = grid.map(function (row) {
    return row.map(function (node) {
      return false;
    });
  });
  var prev = grid.map(function (row) {
    return row.map(function (node) {
      return null;
    });
  });
  var horizDist = grid.map(function (row) {
    return row.map(function (node) {
      return Infinity;
    });
  });
  horizDist[startNode.y][startNode.x] = 0;
  var weight = 1;
  var currentHorizDist = manhattanDist(startNode.y, startNode.x, endNode.y, endNode.x);
  var priorityQueue = new _heap.MinHeap();
  priorityQueue.insert([0, startNode]);

  while (!priorityQueue.isEmpty()) {
    var _priorityQueue$extrac3 = priorityQueue.extractMin(),
        _priorityQueue$extrac4 = _slicedToArray(_priorityQueue$extrac3, 2),
        currentGlobalCost = _priorityQueue$extrac4[0],
        currentNode = _priorityQueue$extrac4[1];

    visited[currentNode.y][currentNode.x] = true;
    visitedNodesToDisplay.push(currentNode);

    if (currentNode == endNode) {
      var shortestPath = getShortestPath(currentNode, prev, startNode);
      animateNodes(visitedNodesToDisplay, 'visited');
      animateNodes(shortestPath, 'path');
      break;
    }

    ;
    var neighbors = Object.values(currentNode.getNeighbors()).filter(function (n) {
      return n && !n.isWall;
    });

    var _iterator2 = _createForOfIteratorHelper(neighbors),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var neighbor = _step2.value;
        if (visited[neighbor.y][neighbor.x]) continue;
        var newNeighborDist = horizDist[currentNode.y][currentNode.x] + weight;
        var neighborHorizDist = manhattanDist(neighbor.y, neighbor.x, endNode.y, endNode.x);
        var newGlobalCost = newNeighborDist + neighborHorizDist; // console.log( newNeighborDist, neighborHorizDist, newGlobalCost);

        if (newGlobalCost < horizDist[neighbor.y][neighbor.x] + neighborHorizDist) {
          horizDist[neighbor.y][neighbor.x] = newNeighborDist;
          priorityQueue.insert([newGlobalCost, neighbor]);
          prev[neighbor.y][neighbor.x] = currentNode;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  animateNodes(visitedNodesToDisplay, 'visited');
}

function breadthFirstSearch() {
  var queue = [];
  var nodesToDisplay = [];
  var endNode = grid[grid.endNode[0]][grid.endNode[1]];
  var startNode = grid[grid.startNode[0]][grid.startNode[1]];
  var prev = grid.map(function (row) {
    return row.map(function (n) {
      return null;
    });
  });
  var visited = grid.map(function (row) {
    return row.map(function (n) {
      return false;
    });
  });
  queue.push(startNode);

  while (queue.length) {
    var currentNode = queue.shift();
    visited[currentNode.y][currentNode.x] = true; // nodesToDisplay.push(currentNode);

    if (currentNode === endNode) {
      var shortestPath = getShortestPath(currentNode, prev, startNode);
      animateNodes(nodesToDisplay, 'visited');
      animateNodes(shortestPath, 'path');
      return;
    }

    var neighbors = Object.values(currentNode.getNeighbors()).filter(function (n) {
      if (n && !n.isWall) return n;
    });

    var _iterator3 = _createForOfIteratorHelper(neighbors),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var neighbor = _step3.value;
        if (visited[neighbor.y][neighbor.x]) continue;
        visited[neighbor.y][neighbor.x] = true;
        nodesToDisplay.push(neighbor); // neighbor.DOMRef.classList.add('visited');

        prev[neighbor.y][neighbor.x] = currentNode;
        queue.push(neighbor);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  animateNodes(nodesToDisplay, 'visited');
}

function biDirectionalBreadthFirstSearch() {
  var endNode = grid[grid.endNode[0]][grid.endNode[1]];
  var startNode = grid[grid.startNode[0]][grid.startNode[1]];
  var nodesToDisplay = [];
  var startNodeQueue = [];
  var startNodePrev = grid.map(function (row) {
    return row.map(function (_) {
      return null;
    });
  });
  var startVisited = grid.map(function (row) {
    return row.map(function (_) {
      return false;
    });
  });
  startNodeQueue.push(startNode);
  var endNodeQueue = [];
  var endNodePrev = grid.map(function (row) {
    return row.map(function (_) {
      return null;
    });
  });
  var endVisited = grid.map(function (row) {
    return row.map(function (_) {
      return false;
    });
  });
  endNodeQueue.push(endNode);

  while (endNodeQueue.length && startNodeQueue.length) {
    var currentEndNode = endNodeQueue.shift();
    var currentStartNode = startNodeQueue.shift();
    var intersection = void 0;

    for (var y = 0; y < startVisited.length; y++) {
      for (var x = 0; x < startVisited[0].length; x++) {
        if (startVisited[y][x] && endVisited[y][x]) {
          intersection = grid[y][x];
          break;
        }
      }
    }

    if (intersection) {
      animateNodes(nodesToDisplay, 'visited');
      var shortestPathStart = getShortestPath(intersection, startNodePrev, startNode);
      var shortestPathEnd = getShortestPath(intersection, endNodePrev, endNode);
      shortestPathStart.push(intersection);
      animateNodes(shortestPathStart.concat(shortestPathEnd.reverse()), 'path');
      return;
    }

    var startNeighbors = Object.values(currentStartNode.getNeighbors()).filter(function (n) {
      return n && !n.isWall;
    });
    var endNeighbors = Object.values(currentEndNode.getNeighborsReversed()).filter(function (n) {
      return n && !n.isWall;
    });

    var _iterator4 = _createForOfIteratorHelper(startNeighbors),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var neighbor = _step4.value;
        if (startVisited[neighbor.y][neighbor.x]) continue;
        startVisited[neighbor.y][neighbor.x] = true;
        nodesToDisplay.push(neighbor);
        startNodePrev[neighbor.y][neighbor.x] = currentStartNode;
        startNodeQueue.push(neighbor);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    var _iterator5 = _createForOfIteratorHelper(endNeighbors),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _neighbor = _step5.value;
        if (endVisited[_neighbor.y][_neighbor.x]) continue;
        endVisited[_neighbor.y][_neighbor.x] = true;
        nodesToDisplay.push(_neighbor);
        endNodePrev[_neighbor.y][_neighbor.x] = currentEndNode;
        endNodeQueue.push(_neighbor);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }

  animateNodes(nodesToDisplay, 'visited');
}

function depthFirstSearch() {
  var stack = [];
  var nodesToDisplay = [];
  var endNode = grid[grid.endNode[0]][grid.endNode[1]];
  var startNode = grid[grid.startNode[0]][grid.startNode[1]];
  var prev = grid.map(function (row) {
    return row.map(function (n) {
      return null;
    });
  });
  var visited = grid.map(function (row) {
    return row.map(function (n) {
      return false;
    });
  });
  visited[startNode.y][startNode.x];
  stack.push(startNode);

  while (stack.length) {
    var currentNode = stack.pop();
    visited[currentNode.y][currentNode.x] = true;
    nodesToDisplay.push(currentNode);

    if (currentNode == endNode) {
      var shortestPath = getShortestPath(currentNode, prev, startNode);
      animateNodes(nodesToDisplay, 'visited');
      animateNodes(shortestPath, 'path');
      return;
    }

    var neighbors = Object.values(currentNode.getNeighbors()).filter(function (n) {
      if (n && !n.isWall) return n;
    });

    var _iterator6 = _createForOfIteratorHelper(neighbors),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var neighbor = _step6.value;
        if (visited[neighbor.y][neighbor.x]) continue;
        prev[neighbor.y][neighbor.x] = currentNode;
        stack.push(neighbor); // break;
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }

  animateNodes(nodesToDisplay, 'visited');
}

function getShortestPath(currentNode, prev, startNode) {
  var shortestPath = [];

  while (true) {
    if (prev[currentNode.y][currentNode.x] == startNode) break;
    shortestPath.unshift(prev[currentNode.y][currentNode.x]);
    currentNode = prev[currentNode.y][currentNode.x];
  }

  return shortestPath;
}

function animateNodes(nodesArray, type) {
  var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var speed = grid.animationSpeed;

  var _ret = function () {
    switch (type) {
      case 'wall':
        var wallAnimation;
        reverse ? wallAnimation = [{
          transform: 'scale(1.2)',
          offset: 0.75
        }, {
          backgroundColor: 'hsl(0, 0%, 100%)'
        }] : [{
          transform: 'scale(1.2)',
          offset: 0.75
        }, {
          backgroundColor: 'hsla(240, 23%, 8%, 0.9)'
        }];

        var _loop = function _loop(i) {
          var currentNode = nodesArray[i];

          if (speed === 0) {
            reverse ? currentNode.isWall = false : currentNode.isWall = true;
            reverse ? currentNode.DOMRef.classList.remove('wall-node') : currentNode.DOMRef.classList.add('wall-node');
            reverse ? currentNode.DOMRef.animate(wallAnimation, 400) : currentNode.DOMRef.animate(wallAnimation, 400);
          } else {
            setTimeout(function () {
              reverse ? currentNode.isWall = false : currentNode.isWall = true;
              reverse ? currentNode.DOMRef.classList.remove('wall-node') : currentNode.DOMRef.classList.add('wall-node');
              reverse ? currentNode.DOMRef.animate(wallAnimation, 400) : currentNode.DOMRef.animate(wallAnimation, 400);
            }, speed * i);
          }
        };

        for (var i = 0; i < nodesArray.length; i++) {
          _loop(i);
        }

        return {
          v: true
        };

      case 'visited':
        var visitedAnimation = [{
          transform: 'scale(.2)'
        }, {
          borderRadius: '50%',
          backgroundColor: 'hsl(281, 53%, 24%)',
          offset: 0.25
        }, {
          transform: 'scale(1.2)',
          offset: 0.7
        }];

        var _loop2 = function _loop2(_i2) {
          var currentNode = nodesArray[_i2];

          if (speed === 0) {
            currentNode.visited = true;
            currentNode.DOMRef.classList.add('visited');
          } else {
            setTimeout(function () {
              currentNode.visited = true;
              currentNode.DOMRef.classList.add('visited');
              currentNode.DOMRef.animate(visitedAnimation, 500);
            }, speed * _i2);
          }
        };

        for (var _i2 = 0; _i2 < nodesArray.length; _i2++) {
          _loop2(_i2);
        }

        return {
          v: true
        };

      case 'path':
        var pathAnimation = [{
          transform: 'scale(.5)'
        }, {
          backgroundColor: 'hsla(115, 41%, 30%, 0.397)',
          offset: .5
        }, {
          transform: 'scale(1.2)',
          offset: .75
        }];

        var _loop3 = function _loop3(_i3) {
          var node = nodesArray[_i3];

          if (speed === 0) {
            node.DOMRef.classList.add('path-node');
          } else {
            setTimeout(function () {
              node.DOMRef.classList.add('path-node');
              node.DOMRef.animate(pathAnimation, 500);
            }, speed * _i3);
          }
        };

        for (var _i3 = 0; _i3 < nodesArray.length; _i3++) {
          _loop3(_i3);
        }

        ;

      default:
        return {
          v: void 0
        };
    }
  }();

  if (_typeof(_ret) === "object") return _ret.v;
}

function getRecursiveBacktrackerUnvisitedNeighbors(currentX, currentY, visited) {
  var possibleNeighbors = [[currentY - 2, currentX], [currentY, currentX + 2], [currentY + 2, currentX], [currentY, currentX - 2]];
  var neighbors = [];

  for (var i = 0; i < possibleNeighbors.length; i++) {
    var _possibleNeighbors$i = _slicedToArray(possibleNeighbors[i], 2),
        y = _possibleNeighbors$i[0],
        x = _possibleNeighbors$i[1];

    if (y < 0 || y > grid.length - 1 || x < 0 || x > grid[0].length - 1) continue;
    if (visited[y][x]) continue;
    neighbors.push([y, x]);
  }

  if (neighbors.length > 0) {
    var nextIdx = Math.floor(Math.random() * neighbors.length);
    return neighbors[nextIdx];
  } else {
    return;
  }
}

function generateMazeRecursiveBacktracker(startX, startY) {
  grid.map(function (row) {
    return row.map(function (node) {
      if (node.isStart || node.isEnd) return;
      node.isWall = true;
      node.DOMRef.classList.add('wall-node');
    });
  });
  var visited = grid.map(function (row) {
    return row.map(function (_) {
      return false;
    });
  });
  visited[startY][startX] = true;
  var nodesToAddWall = [];
  var stack = [];
  var currentY = startY,
      currentX = startX;

  while (true) {
    var next = getRecursiveBacktrackerUnvisitedNeighbors(currentX, currentY, visited);
    console.log('next[Y, X] ' + next);
    nodesToAddWall.push(grid[currentY][currentX]);

    if (next) {
      stack.push(next);

      var _next = next,
          _next2 = _slicedToArray(_next, 2),
          nextY = _next2[0],
          nextX = _next2[1];

      visited[nextY][nextX] = true;
      var inbetweenWall = void 0;

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
      console.log('no next');

      if (stack.length > 0) {
        next = stack.pop();
        var _next3 = next;

        var _next4 = _slicedToArray(_next3, 2);

        currentY = _next4[0];
        currentX = _next4[1];
      } else {
        break;
      }
    }
  }

  animateNodes(nodesToAddWall, 'wall', true);
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
},{"./modules/heap.js":"modules/heap.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42675" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map