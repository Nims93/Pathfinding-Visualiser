// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === "function" && parcelRequire;
  var nodeRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === "function" && parcelRequire;
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
        if (nodeRequire && typeof name === "string") {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = "MODULE_NOT_FOUND";
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
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
})(
  {
    "index.js": [
      function (require, module, exports) {
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          );
        }

        function _nonIterableRest() {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }

        function _iterableToArrayLimit(arr, i) {
          var _i =
            arr &&
            ((typeof Symbol !== "undefined" && arr[Symbol.iterator]) ||
              arr["@@iterator"]);
          if (_i == null) return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _s, _e;
          try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }
          return _arr;
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        function _toConsumableArray(arr) {
          return (
            _arrayWithoutHoles(arr) ||
            _iterableToArray(arr) ||
            _unsupportedIterableToArray(arr) ||
            _nonIterableSpread()
          );
        }

        function _nonIterableSpread() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (
            n === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen);
        }

        function _iterableToArray(iter) {
          if (
            (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
            iter["@@iterator"] != null
          )
            return Array.from(iter);
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        //internal representation of the data
        var grid = [];
        var gridSizeSlider = document.querySelector("#grid-size-slider");
        var gridSizeOutput = document.querySelector(".grid-size-output");
        var gridWrapper = document.querySelector(".visualiser");
        var demoBtn = document.querySelector("#demo-button"); //node object to populate grid cells

        var Node = /*#__PURE__*/ (function () {
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
            this.start = false;
            this.end = false;
          }

          _createClass(Node, [
            {
              key: "up",
              value: function up() {
                if (this.index[0] <= 0) {
                  return null;
                } else {
                  var index = _toConsumableArray(this.index);

                  index[0] = Number(index[0]) - 1;
                  var upIndex = index.join("-");
                  return upIndex;
                }
              },
            },
            {
              key: "right",
              value: function right() {
                if (this.index[1] >= grid[0][0].length - 1) {
                  return null;
                } else {
                  var index = _toConsumableArray(this.index);

                  index[1] = Number(index[1]) + 1;
                  var rightIndex = index.join("-");
                  return rightIndex;
                }
              },
            },
            {
              key: "down",
              value: function down() {
                if (this.index[0] >= grid.length - 1) {
                  return null;
                } else {
                  var index = _toConsumableArray(this.index);

                  index[0] = Number(index[0]) + 1;
                  var downIndex = index.join("-");
                  return downIndex;
                }
              },
            },
            {
              key: "left",
              value: function left() {
                if (this.index[1] <= 0) {
                  return null;
                } else {
                  var index = _toConsumableArray(this.index);

                  index[1] = Number(index[1]) - 1;
                  var leftIndex = index.join("-");
                  return leftIndex;
                }
              },
            },
            {
              key: "getNeighbors",
              value: function getNeighbors() {
                var neighbors = {
                  up: this.up(),
                  right: this.right(),
                  down: this.down(),
                  left: this.left(),
                };
                return neighbors;
              },
            },
          ]);

          return Node;
        })(); //helper method for clearing all DOM element child nodes

        HTMLElement.prototype.empty = function () {
          while (this.firstChild) {
            this.removeChild(this.firstChild);
          }
        };

        function randInt() {
          var min =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : 0;
          var max = arguments.length > 1 ? arguments[1] : undefined;
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function populateGrid(gridSize) {
          for (i = 0; i < gridSize; i++) {
            grid.push([]);

            for (i2 = 0; i2 < gridSize; i2++) {
              grid[i].push(new Node("".concat(i, "-").concat(i2)));
            }
          }
        }

        function populateDOM(wrapper) {
          var wrapperWidth = wrapper.offsetWidth;
          var wrapperHeight = wrapper.offsetHeight;
          var divWidth = wrapperWidth / grid.length;
          var divHeight = wrapperHeight / grid.length;

          for (i = 0, len = grid.length; i < len; i++) {
            for (i2 = 0, len2 = grid[i].length; i2 < len2; i2++) {
              var div = document.createElement("div");
              div.setAttribute("class", "node");
              div.setAttribute("id", i + "-" + i2);
              div.style.width = divWidth + "px";
              div.style.height = divHeight + "px";
              wrapper.append(div);
            }
          }
        }

        function sleep(time) {
          setTimeout(function (_) {
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
          var x = grid.length;
          var y = grid[0].length;
          var totalWallCells = Math.floor((x * y) / 4);

          for (var _i = 0; _i < totalWallCells; _i++) {
            var wallX = randInt(x);
            var wallY = randInt(y);
            console.log("test");

            if (
              grid[wallX][wallY].isWall ||
              grid[wallX][wallY].start ||
              grid[wallX][wallY].end
            ) {
              _i--;
            } else {
              var id = "".concat(wallX, "-").concat(wallY);
              var div = gridWrapper.querySelector('div[id="'.concat(id, '"]'));
              div.classList.add("wall-node");
              grid[wallX][wallY].isWall = true;
            }
          }
        }

        function generateWallsPerimiter() {
          for (var _i2 = 0; _i2 < grid[0].length; _i2++) {
            grid[0][_i2].isWall = true;
            gridWrapper
              .querySelector('div[id="0-'.concat(_i2, '"]'))
              .classList.add("wall-node");
          }

          for (var _i3 = 1; _i3 < grid.length; _i3++) {
            grid[_i3][0].isWall = true;
            grid[_i3][grid[_i3].length - 1].isWall = true;
            gridWrapper
              .querySelector('div[id="'.concat(_i3, '-0"]'))
              .classList.add("wall-node");
            gridWrapper
              .querySelector(
                'div[id="'.concat(_i3, "-").concat(grid[_i3].length - 1, '"]')
              )
              .classList.add("wall-node");
          }

          for (var _i4 = grid[grid.length - 1].length - 1; _i4 > 0; _i4--) {
            grid[grid.length - 1][_i4].isWall = true;
            gridWrapper
              .querySelector(
                'div[id="'
                  .concat(grid[grid.length - 1].length - 1, "-")
                  .concat(_i4, '"]')
              )
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
          var stack = [];
          var visitedNodes = [];
          stack.push(index);

          while (stack.length) {
            var _stack$pop$split = stack.pop().split("-"),
              _stack$pop$split2 = _slicedToArray(_stack$pop$split, 2),
              outerIndex = _stack$pop$split2[0],
              innerIndex = _stack$pop$split2[1];

            var currNode = grid[outerIndex][innerIndex];

            if (visitedNodes.includes(currNode)) {
              continue;
            }

            var neighbors = Object.values(currNode.getNeighbors()).filter(
              Boolean
            );
          }
        }

        function depthFirstSearchTest(index) {
          //queue data structure
          var queue = [];
          var visitedNodes = [];
          queue.push(index);

          while (queue.length) {
            var _queue$shift$split = queue.shift().split("-"),
              _queue$shift$split2 = _slicedToArray(_queue$shift$split, 2),
              outerIndex = _queue$shift$split2[0],
              innerIndex = _queue$shift$split2[1]; //ERROR breaking here values are undefined after second interation

            var currNode = grid[outerIndex][innerIndex];

            if (visitedNodes.includes(currNode)) {
              continue;
            }

            var div = document.querySelector(
              'div[id="'.concat(outerIndex, "-").concat(innerIndex, '"]')
            );
            div.classList.add("wall-node"); //Push current vertex neighbors onto the stack that are within the bounds of the grid filtered by non null results returned by the Node getNeighbors method

            var neighborValues = Object.values(currNode.getNeighbors()).filter(
              Boolean
            );
            queue = queue.concat(neighborValues);
            console.log("Queue: ".concat(queue));
            visitedNodes.push(currNode);
            queue.unshift();
            sleep(500);
          }
        } //---------------
        //
        //EVENT LISTENER DEFS
        //
        //---------------
        //initialise grid

        gridSizeOutput.textContent = gridSizeSlider.value;
        populateGrid(Number(gridSizeSlider.value));
        populateDOM(gridWrapper); //update grid and populte dom with divs as range slider is updated

        gridSizeSlider.addEventListener("input", function () {
          grid = [];
          gridWrapper.empty();
          gridSizeOutput.textContent = gridSizeSlider.value;
          populateGrid(Number(gridSizeSlider.value));
          populateDOM(gridWrapper);
        });
        demoBtn.addEventListener("click", function (e) {
          var outerIndex = Math.floor(Math.random() * grid.length);
          var innerIndex = Math.floor(Math.random() * grid.length); // depthFirstSearchTest(`${outerIndex}-${innerIndex}`);
          // generateRandomWalls();

          generateWallsPerimiter();
          generateWallsRecursiveDivision(
            1,
            1,
            grid[0].length - 1,
            grid.length - 1,
            chooseOrientation(grid[0].length - 1, grid.length - 1)
          );
        });

        function generateWallsRecursiveDivision(
          x,
          y,
          width,
          height,
          orientation
        ) {
          if (width <= 2 || height <= 2) {
            return;
          }

          if (orientation == "horizontal") {
            var yDivideCoord = randInt(y + 1, height - 2);
            var passageCoord = randInt(x + 1, width - 2);

            for (i = x; i < width; i++) {
              if (i === passageCoord) {
                continue;
              }

              grid[yDivideCoord][i].isWall = true;
              gridWrapper
                .querySelector(
                  'div[id="'.concat(grid[yDivideCoord][i].id, '"]')
                )
                .classList.add("wall-node");
            }

            var dir = chooseOrientation(width, yDivideCoord);
            console.log(x, y, width, yDivideCoord, dir);
            generateWallsRecursiveDivision(x, y, width, yDivideCoord, dir);
          } else if (orientation == "vertical") {
            var xDivideCoord = randInt(x + 1, width - 2);

            var _passageCoord = randInt(y + 1, height - 2);

            for (i = y; i < height; i++) {
              if (i === _passageCoord) {
                continue;
              }

              grid[i][xDivideCoord].iswall = true;
              gridWrapper
                .querySelector(
                  'div[id="'.concat(grid[i][xDivideCoord].id, '"]')
                )
                .classList.add("wall-node");

              var _dir = chooseOrientation(xDivideCoord, height);

              console.log(x, y, xDivideCoord, height, _dir);
              generateWallsRecursiveDivision(x, y, xDivideCoord, height, _dir);
            }
          }
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
      },
      {},
    ],
    "../../../.nvm/versions/node/v15.8.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":
      [
        function (require, module, exports) {
          var global = arguments[3];
          var OVERLAY_ID = "__parcel__error__overlay__";
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
              },
            };
            module.bundle.hotData = null;
          }

          module.bundle.Module = Module;
          var checkedAssets, assetsToAccept;
          var parent = module.bundle.parent;

          if (
            (!parent || !parent.isParcelRequire) &&
            typeof WebSocket !== "undefined"
          ) {
            var hostname = "" || location.hostname;
            var protocol = location.protocol === "https:" ? "wss" : "ws";
            var ws = new WebSocket(
              protocol + "://" + hostname + ":" + "41271" + "/"
            );

            ws.onmessage = function (event) {
              checkedAssets = {};
              assetsToAccept = [];
              var data = JSON.parse(event.data);

              if (data.type === "update") {
                var handled = false;
                data.assets.forEach(function (asset) {
                  if (!asset.isNew) {
                    var didAccept = hmrAcceptCheck(
                      global.parcelRequire,
                      asset.id
                    );

                    if (didAccept) {
                      handled = true;
                    }
                  }
                }); // Enable HMR for CSS by default.

                handled =
                  handled ||
                  data.assets.every(function (asset) {
                    return asset.type === "css" && asset.generated.js;
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

              if (data.type === "reload") {
                ws.close();

                ws.onclose = function () {
                  location.reload();
                };
              }

              if (data.type === "error-resolved") {
                console.log("[parcel] ✨ Error resolved");
                removeErrorOverlay();
              }

              if (data.type === "error") {
                console.error(
                  "[parcel] 🚨  " + data.error.message + "\n" + data.error.stack
                );
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
            var overlay = document.createElement("div");
            overlay.id = OVERLAY_ID; // html encode message and stack trace

            var message = document.createElement("div");
            var stackTrace = document.createElement("pre");
            message.innerText = data.error.message;
            stackTrace.innerText = data.error.stack;
            overlay.innerHTML =
              '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
              '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
              '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
              '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' +
              message.innerHTML +
              "</div>" +
              "<pre>" +
              stackTrace.innerHTML +
              "</pre>" +
              "</div>";
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

                if (
                  dep === id ||
                  (Array.isArray(dep) && dep[dep.length - 1] === id)
                ) {
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
              var fn = new Function(
                "require",
                "module",
                "exports",
                asset.generated.js
              );
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
        },
        {},
      ],
  },
  {},
  [
    "../../../.nvm/versions/node/v15.8.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js",
    "index.js",
  ],
  null
);
//# sourceMappingURL=/data-structure-visualiser.e31bb0bc.js.map
