(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.MTrie = {}));
}(this, (function (exports) { 'use strict';

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var BaseNode =
  /*#__PURE__*/
  function () {
    function BaseNode(_char) {
      _classCallCheck(this, BaseNode);

      this["char"] = _char;
      this.children = Object.create(null);
    }

    _createClass(BaseNode, [{
      key: "childKeys",
      value: function childKeys() {
        return Object.keys(this.children);
      }
    }, {
      key: "childCount",
      value: function childCount() {
        return this.childKeys().length;
      }
    }, {
      key: "getChild",
      value: function getChild(charKey) {
        return this.children[charKey] || null;
      }
    }, {
      key: "hasChild",
      value: function hasChild(charKey) {
        if (arguments.length === 0) {
          return this.childCount() > 0;
        }

        return this.getChild(charKey) !== null;
      }
    }, {
      key: "canAddChild",
      value: function canAddChild(charKey) {
        return this.getChild(charKey) === null;
      }
    }, {
      key: "matchChildren",
      value: function matchChildren(checkCalback) {
        var keys = this.childKeys();
        var i = keys.length;

        while (i--) {
          var _char2 = keys[i];
          var matchedChild = this.getChild(_char2);
          if (checkCalback(matchedChild, _char2)) return matchedChild;
        }

        return null;
      }
    }, {
      key: "addChild",
      value: function addChild(_char3, node) {
        if (!_char3) return null;

        if (this.canAddChild(_char3)) {
          this.children[_char3] = node;
          return node;
        }

        return this.children[_char3];
      }
    }, {
      key: "isRoot",
      value: function isRoot() {
        return false;
      }
    }, {
      key: "isNode",
      value: function isNode() {
        return false;
      }
    }, {
      key: "isLeaf",
      value: function isLeaf() {
        return false;
      }
    }]);

    return BaseNode;
  }();

  var TreeNode =
  /*#__PURE__*/
  function (_BaseNode2) {
    _inherits(TreeNode, _BaseNode2);

    function TreeNode() {
      _classCallCheck(this, TreeNode);

      return _possibleConstructorReturn(this, _getPrototypeOf(TreeNode).apply(this, arguments));
    }

    _createClass(TreeNode, [{
      key: "isNode",
      value: function isNode() {
        return true;
      }
    }]);

    return TreeNode;
  }(BaseNode);

  var Tree =
  /*#__PURE__*/
  function (_BaseNode3) {
    _inherits(Tree, _BaseNode3);

    function Tree() {
      _classCallCheck(this, Tree);

      return _possibleConstructorReturn(this, _getPrototypeOf(Tree).call(this, null));
    }

    _createClass(Tree, [{
      key: "isRoot",
      value: function isRoot() {
        return true;
      }
    }]);

    return Tree;
  }(BaseNode);

  var INVALID_ARG_ERROR = new Error('invalid argument');

  var assertArgument = function assertArgument(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw INVALID_ARG_ERROR;
    }
  };

  var Trie =
  /*#__PURE__*/
  function () {
    function Trie(arr) {
      _classCallCheck(this, Trie);

      assertArgument(arr);
      this.trieTree = null;
      this.indexMap_ = new Map(); // Readonly property

      Object.defineProperty(this, 'arr', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: arr
      });
    }

    _createClass(Trie, [{
      key: "getTrie",
      value: function getTrie() {
        // Singlton instance
        if (!this.trieTree) {
          this.trieTree = this.parse_();
        }

        return this.trieTree;
      }
      /**
       * Get sub-array by the matched tree node
       *
       * @param {TreeNode} node the matched tree node
       */

    }, {
      key: "getArrayByNode",
      value: function getArrayByNode(node) {
        var _this = this;

        // Has a trie tree
        if (this.trieTree) {
          if (this.trieTree === node) return this.arr;
          var indexArr = this.indexMap_.get(node);

          if (indexArr) {
            return indexArr.map(function (idx) {
              return _this.arr[idx];
            }).reverse();
          }
        }

        return null;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.trieTree = null;
        this.indexMap_ = new Map();
      }
      /**
       * @private
       */

    }, {
      key: "parse_",
      value: function parse_() {
        var arr = this.arr;
        var tree = new Tree();
        var current = arr.length;

        while (current--) {
          // Trim pre/suff spaces
          var str = String(arr[current]).trim();
          var len = str.length;
          var i = -1;
          var node = tree;

          while (++i < len) {
            var _char = str[i];

            if (node) {
              node = node.addChild(_char, new TreeNode(_char));
              this.updateIndexMap_(node, current);
            }
          }
        }

        return tree;
      }
    }, {
      key: "updateIndexMap_",
      value: function updateIndexMap_(node, index) {
        var map = this.indexMap_;

        if (map.has(node)) {
          var prev = map.get(node);
          map.set(node, [].concat(_toConsumableArray(prev), [index]));
        } else {
          map.set(node, [index]);
        }
      }
    }]);

    return Trie;
  }();

  var recurMatch = function recurMatch(node, str) {
    str = String(str).trim();
    var len = str.length;
    if (len === 0) return null;
    var firstChar = str[0];
    var remainStr = str.slice(1);
    var matched = node.matchChildren(function (childNode, _char) {
      return _char === firstChar;
    });

    if (matched && remainStr) {
      return recurMatch(matched, remainStr);
    }

    if (!remainStr) return matched;
    return null;
  };

  var searchTrie = function searchTrie(trie, str) {
    var result = recurMatch(trie.trieTree, str);
    return result ? trie.getArrayByNode(result) : null;
  };

  /*!
   * Get sub set from array which is for auto complete by using `Trie Tree`
   * Author by jzendo, refer http://en.wikipedia.org/wiki/Trie
   */

  var generateTrie = function generateTrie(arr) {
    var trie = new Trie(arr);
    trie.getTrie();
    return trie;
  };

  var matchString = function matchString(trie, matchingString) {
    if (trie instanceof Trie && matchingString) {
      return searchTrie(trie, matchingString);
    } else {
      throw new Error('The "trie" or "matchingString" argument is invalid.');
    }
  };

  exports.generateTrie = generateTrie;
  exports.matchString = matchString;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
