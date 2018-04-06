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
  card.querySelector('.card-wrapper').className += site['sub_cat'] ? " card-"+site['cat']+"-"+site['sub_cat'] : "";
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
