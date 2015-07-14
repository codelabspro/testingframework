'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Box = require('./Box');

// Boilerplate code to make your life easier
FamousEngine.init();

// UI events are sent up to parent nodes
var scene = FamousEngine.createScene('body');
var rootNode = scene.addChild();
var parent = rootNode.addChild(new Box('parent', 'orange', 0, 0, 900, 500, '0'));

// onReceive catches all UI events that we
// added to the node and all child nodes
parent.onReceive = function(event, payload){
  //payload gives access to the node --> payload.node
  console.log('onReceive event ' + event + ' payload ' + payload);
  if(event==="click"){
  var whoWasClicked = payload.node.id;
  this.emit(whoWasClicked);
  console.log('Click was registered' + whoWasClicked);
  this.nodeDomElement.setContent('parent: sent event from my '+whoWasClicked);
  this.emit('custom_event', whoWasClicked);
  }
}

/******  Child Nodes   ******/


/* var daughter = rootNode.addChild(new Box('daughter', 'purple', 0, 0, 250, 250, '3'));
daughter.setAlign(0.5, 0.5)
.setMountPoint(1, 1);
daughter.id = 'daughter';
*/
var daughter = parent.addChild()
  .setAlign(1, 1)
  .setMountPoint(1, 1)
  .setSizeMode('absolute', 'absolute', 'absolute')
  .setAbsoluteSize(250, 250);
// id for click event and content
daughter.id = 'daughter';


daughter.el = new DOMElement(daughter, {
              content: 'click: '+ daughter.id,
              properties:{
                  'background': 'purple',
                  'color':'white',
                  'font-size': '25px'
              }
           });
// Listen for click on daughter
daughter.addUIEvent('click');

daughter.onReceive = function(event, payload){
    if(event==='click'){
      console.log('A click happened on the daughter');
      daughter.el.setContent('A click happened on the daughter');
    } else {
      console.log('Daughter heard ' + event);
      daughter.el.setContent('Daughter  heard ' + event);
    }
}

// Listen for custom events from parent
/*
daughter.addComponent({
  onReceive: function(event,payload){
    console.log('onReceive from daughter' + event + " " + payload);
  if(event === 'son'){
    console.log('The daugher was notified that son was clicked');
    daughter.el.setContent('you clicked my brother');
  }
}
});
*/


var son = parent.addChild()
  .setAlign(0, 1)
  .setMountPoint(0, 1)
  .setSizeMode('absolute', 'absolute', 'absolute')
  .setAbsoluteSize(250, 250);
// id for click event and content
son.id = 'son';

son.el = new DOMElement(son, {
              content: 'click: '+son.id,
              properties:{
                  'background': 'turquoise',
                  'color':'white',
                  'font-size': '25px'
              }
 });
// Listen for click on son
son.addUIEvent('click');

// Listen for custom events from parent
son.addComponent({
  onReceive:function(event,payload){
    console.log('The son was notified of event');
    if(event==='daughter'){
      console.log('The son was notified that daughter was clicked');
      son.el.setContent('you clicked my sister');
    } else {
      console.log('Son heard ' + event);
      son.el.setContent('Son heard ' + event);
    }
  }
});
