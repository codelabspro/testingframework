var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Transitionable = require('famous/transitions/Transitionable');
var Size = require('famous/components/Size');
var Node = require('famous/core/Node');
function Box(label, bgColor, xpos, ypos, width, height, zIndex) {
  Node.call(this);
  this.setSizeMode('absolute', 'absolute', 'absolute')
          .setAbsoluteSize(width, height);
          //.setPosition(xpos,ypos);
  this.nodeDomElement = new DOMElement(this);
  this.nodeDomElement.setProperty('zIndex', zIndex);
  this.nodeDomElement.setProperty('background-color', bgColor);
  this.nodeDomElement.setProperty('color', 'white');
  this.nodeDomElement.setProperty('font-size', '25px');
  this.nodeDomElement.setContent(label);
}
Box.prototype = Object.create(Node.prototype);
Box.prototype.constructor = Box
module.exports = Box;
