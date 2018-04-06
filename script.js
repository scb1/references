var itemTpl = document.querySelector('script[data-template="card"]').innerHTML;
var wrapper = document.querySelector('.wrapper');

var replaceToken = function(token, value, html){
  var replace = "\\$\\{"+token+"\\}";
  var re = new RegExp(replace,"gi");
  return html.replace(re, value);
};

var cardGenerator = function(site){

  var card = document.createElement('div');
  card.className = 'card';
  var template = itemTpl;
  for(key in site){
    template = replaceToken(key, site[key], template);
  }
  // Remove tokens not replaced
  card.innerHTML = template.replace(/\$\{(.*)\}/gi, '');
  // Add sub_category class if exist
  card.className += site['sub_cat'] ? " card-"+site['cat']+"-"+site['sub_cat'] : "";
  return(card);
};
// Sort list
sites.sort(function(a,b){
  return a['cat'] >= b['cat'] ? (((a['cat'] == b['cat']) && a['sub_cat'] < b['sub_cat']) ? -1 : 1) : -1;
});
var prevSec = "",
    prevSecSub = "";
for(var i = 0, sitesLength = sites.length; i < sitesLength; i++){
  if(prevSec != sites[i]['cat'] || (prevSec == sites[i]['cat'] && prevSecSub != sites[i]['sub_cat'])){
    if(section){
      var clear = document.createElement('div');
      clear.className = 'clear';
      section.appendChild(clear);
      wrapper.appendChild(section);
    }
    var section = document.createElement('section');
    var sectionClass = sites[i]['cat'];
    sectionClass += typeof(sites[i]['sub_cat']) != 'undefined' && prevSecSub != sites[i]['sub_cat'] ? '-'+sites[i]['sub_cat'] : "";
    section.className = 'section '+sectionClass;
    prevSec = sites[i]['cat'];
    prevSecSub = sites[i]['sub_cat'];
  }
  section.appendChild(cardGenerator(sites[i]));
};

/*
* ProgressBar
*/
ScbProgressBar = function(elmt){
  if(elmt == document){
    this.elmt = document.querySelector('body');
  }else{
    this.elmt = document.querySelector(elmt);
  }
  this.elmt.style.position = this.elmt.style.position ? this.elmt.style.position : "relative";
  this.elmtChild = this.elmt.children[0];
  this.elmtHeight;
  this.elmtWidth;
  this.elmtChildHeight;
  this.scrollPercent;
  var self = this;

  /*
  * Create progressBar and add it as element first child
  */
  var pbWrapper = document.createElement("div");
  pbWrapper.classList.add("scb_hrtop");
  var progressBar = document.createElement("div");
  progressBar.classList.add("progress");
  pbWrapper.appendChild(progressBar);
  this.elmt.insertBefore(pbWrapper, this.elmtChild);
  this.progressBar = this.elmt.querySelector(".progress");

  /*
  * Set element height
  */
  this.setElmtHeight = function(){
    // console.log('calcElmtHeight');
    if(elmt == document){
      // var body = document.body,
      var html = document.documentElement;
      //     height = Math.max( body.scrollHeight, body.offsetHeight,
      //       html.clientHeight, html.scrollHeight, html.offsetHeight);
      // self.elmtHeight = height;
      self.elmtHeight = html.clientHeight;
    }else{
      self.elmtHeight = self.elmt.getBoundingClientRect().height;
    }
  };
  /*
  * Set element width
  */
  this.setElmtWidth = function(){
    self.elmtWidth = self.elmt.getBoundingClientRect().width;
    console.log(self.elmt);
    console.log(self.elmt.getBoundingClientRect());
    console.log(self.elmt.offsetWidth);
    console.log("width: "+self.elmtWidth);
  };
  /*
  * Set element child height
  */
  this.setElmtChildHeight = function(){
    self.elmtChildHeight = self.elmtChild.getBoundingClientRect().height;
    console.log(self.elmtChildHeight);
  };

  this.scrollPosition = function(){
    var s = -self.elmtChild.getBoundingClientRect().y,
        d =  self.elmtChildHeight - self.elmtHeight;
        self.scrollPercent = Math.round((s / d)*100);
    var w = Math.round(self.elmtWidth * (self.scrollPercent/100));
    self.progressBar.style.width = w+'px';
  };

  /*
  * Set values
  */
  this.setValues = function(){
    self.setElmtHeight();
    self.setElmtWidth();
    self.setElmtChildHeight();
    self.scrollPosition();
  };

  /* init */
  this.setValues();
  this.elmt.onscroll = this.scrollPosition;
  this.elmt.onresize = this.setValues();
}


document.addEventListener('DOMContentLoaded', init(), false);
function init(){
  var documentProgress = new ScbProgressBar(document);
  var documentProgress2 = new ScbProgressBar('.wrap');
}
