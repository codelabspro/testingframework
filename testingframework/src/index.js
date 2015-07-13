'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');

// Boilerplate code to make your life easier
FamousEngine.init();

// UI events are sent up to parent nodes
var parent = FamousEngine.createScene().addChild()

// onReceive catches all UI events that we
// added to the node and all child nodes
parent.onReceive = function(event, payload){
  //payload gives access to the node --> payload.node
  if(event==="click"){
  var whoWasClicked = payload.node.id
  this.emit(whoWasClicked)
  this.el.setContent('parent: sent event from my '+whoWasClicked)
  }
}


parent.el = new DOMElement(parent, {
  content:"parent",
  properties:{
    'background':'orange',
    'font-size':'25px'
  }
})


/******  Child Nodes   ******/


var daughter = parent.addChild()
  .setAlign(1, 1)
  .setMountPoint(1, 1)
  .setSizeMode('absolute', 'absolute', 'absolute')
  .setAbsoluteSize(250, 250)
// id for click event and content
daughter.id = 'daughter'


daughter.el = new DOMElement(daughter, {
              content: 'click: '+ daughter.id,
              properties:{
                  'background': 'purple',
                  'color':'white',
                  'font-size': '25px'
              }
           })
// Listen for click on daughter
daughter.addUIEvent('click')

// Listen for custom events from parent
daughter.addComponent({
  onReceive: function(event,payload){
  if(event === 'son'){
    console.log('The daugher was notified that son was clicked');
    daughter.el.setContent('you clicked my brother')
  }
}
})




var son = parent.addChild()
  .setAlign(0, 1)
  .setMountPoint(0, 1)
  .setSizeMode('absolute', 'absolute', 'absolute')
  .setAbsoluteSize(250, 250)
// id for click event and content
son.id = 'son'

son.el = new DOMElement(son, {
              content: 'click: '+son.id,
              properties:{
                  'background': 'turquoise',
                  'color':'white',
                  'font-size': '25px'
              }
 })
// Listen for click on son
son.addUIEvent('click')

// Listen for custom events from parent
son.addComponent({
  onReceive:function(event,payload){
    if(event==='daughter'){
      console.log('The son was notified that daughter was clicked');
      son.el.setContent('you clicked my sister')
    }
  }
})
