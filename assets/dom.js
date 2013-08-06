(function(root) {
  "use strict";
  
  root.DOMElement = function(element) {
    console.log('domelement', element);
    if (! this) {
      return new root.DOMElement(element);
    }

    this.element = element;

    return this;
  };

  root.DOMElement.prototype.text = function(newText) {

    var newElm = document.createTextNode(newText);
    this.empty().append(newElm);

    return this;
  };

  root.DOMElement.prototype.append = function(newNode) {
    if (newNode) {
      var node = (newNode && newNode.element) || newNode;
      console.log(node, newNode);
      this.element.appendChild(node);  
    }
    return this;
  };

  root.DOMElement.prototype.html = function(newHtml) {
    this.empty();

    this.element.innerHTML = newHtml;

    return this;
  };

  root.DOMElement.prototype.empty = function() {
    this.element.textContent = '';
    return this;
  };

  root.DOMElement.prototype.clone = function() {

    console.log(this.element.cloneNode(true));
    return new DOMElement(this.element.cloneNode(true));
  };

  root.DOMElement.prototype.show = function() {
    this.element.style.style = 'block';
  }


  root.DOM = function(selector) {

    // returns instance if not actually instantiated
    if (! this) {
      return new DOM(selector);
    }

    this.elements = [];


    var characterEncoding, selectors, selectorType, elements;
   
    characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+";
    selectors = {
      'id' : new RegExp( "^#(" + characterEncoding + ")" ),
      'class' : new RegExp( "^\\.(" + characterEncoding + ")" )
    };
   
    // get selector type
    for (var type in selectors) {
      if (selectors[type].test(selector)) {
        selectorType = type;
        break;
      }
    }

    if (!selectorType) {
      throw new Error("Could not determine DOM selector type");
    }
    
    // get elements and instantiate them as DOMElements
    switch (selectorType) {
      case "id" :
        elements = [new root.DOMElement(
          document.getElementById(selector.substr(1))
        )];
        break;

      case "class" : 
        elements = document.getElementsByClassName(selector.substr(1))
          .toArray()
          .map(function(elm) {
            return new root.DOMElement(elm);
          });
        break;

      default:
        throw new Error('selector type not supported');
    }

    this.elements = elements || [];

    return this;
  };


  // collection methods
  root.DOM.prototype.each = function(callback) {
    for (var key in this.elements) {
      callback(this.elements[key], key);
    }
  };

  root.DOM.prototype.first = function() {
    return this.elements[0];
  };
})(window);