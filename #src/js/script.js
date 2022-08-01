window.addEventListener("load", function(){
  const archs = document.querySelectorAll(".arch"),
      main = document.querySelector(".main__content"),
      content = document.querySelector(".border_second"),
      map = document.querySelector(".map"),
      menu_items = [...document.querySelectorAll(".menu__item a"), document.querySelector(".home")],
      menu = document.querySelector(".menu"),
      archHidden = document.querySelectorAll(".arch__hidden"),
      empty = document.querySelector(".middle-dark");
  

  document.querySelector(".empty").style.height = `${main.scrollHeight}px`;
  


window.addEventListener("resize", function() {
  archs[0].scrollTop = content.scrollTop;
  archs[1].scrollTop = content.scrollTop;
  archs[2].scrollTop = content.scrollTop;
  
})

let menuClick = false

content.addEventListener("scroll", function() {
  archs[0].scrollTop = content.scrollTop;
  archs[1].scrollTop = content.scrollTop;
  archs[2].scrollTop = content.scrollTop;
  ////////////для map//////////////
  const posTop = map.getBoundingClientRect().top;
  if((posTop + (map.clientHeight / 2) <= window.innerHeight && posTop >= 0) || (posTop <= 0 && posTop >= -(map.clientHeight / 2))) {
    console.log(posTop)
    document.querySelector(".noise").style.zIndex = "0";
    
  }else{
    document.querySelector(".noise").style.zIndex = "5";
    document.querySelector(".arch__hidden").classList.remove("arch__visible")
  }
  ////////////для art//////////////
  const art = document.querySelector(".art")
  const artTop = art.getBoundingClientRect().top;
  if(artTop + (art.clientHeight - 140) <= window.innerHeight && artTop >= 0) {
    document.querySelectorAll(".art-img")[0].classList.add("art-img-visible")
    document.querySelectorAll(".art-img")[1].classList.add("art-img-visible")
  }else{
    document.querySelectorAll(".art-img")[0].classList.remove("art-img-visible")
    document.querySelectorAll(".art-img")[1].classList.remove("art-img-visible")
  }
  //////////////menu////////////
  const sections = [
    document.getElementById("project"), 
    document.getElementById("medusa"), 
    document.getElementById("expect"),
    document.getElementById("roadmap"),
    document.getElementById("team"),
    document.querySelector(".dark-wrap")
  ]
  
  sections.forEach(section => {
    if(! menuClick){
      scrollSection(section)
    }
  })
  

});

function scrollSection(section){
  let sectionsTop = section.getBoundingClientRect().top;
  if(sectionsTop + (section.clientHeight/2) <= window.innerHeight && sectionsTop >= 0) {
    menu_items.forEach(item => {  
      if(item.hash.substring(1) == section.id && item.hash.substring(1) != "home"){
        item.parentNode.classList.add("menu__active")
      }
      if(item.hash.substring(1) != section.id){
        item.parentNode.classList.remove("menu__active")
      }
    })
  }
}
let artists = document.querySelector(".artists"),
    cards = document.querySelector(".cards"),
    expect = document.querySelector(".expect__text"),
    top2 = document.querySelector(".top"),
    close = document.querySelector(".artists__close");

artists.style.display = "none";

content.addEventListener("click", function(event) {
  let arr = new Array(...cards.childNodes)
 
  if(event.target == cards ||arr.includes(event.target)){
    try {
      top2.scrollIntoViewIfNeeded(false);
      archs[1].scrollTop -= 30;
    } catch (error) {
      top2.scrollIntoView({block: "center"});
      archs[1].scrollTop += (archs[1].clientHeight/2) - 70;
    }
  }
});

cards.addEventListener("click", function() {
  

  archs[1].classList.toggle("arch__middle_anim");
  cards.classList.toggle("cards__hidden")
  cards.classList.toggle("cards__visible")
  
  expect.classList.toggle("expect__hidden")
  expect.classList.toggle("expect__visible")

  artists.style.display = "block";
  artists.classList.toggle("artists__visible");
  artists.classList.toggle("artists__hidden")

  setTimeout(() => expect.style.display = "none", 900)
  setTimeout(() => cards.style.display = "none", 900)
  
});

close.addEventListener("click", function() {
  archs[1].classList.toggle("arch__middle_anim")

  cards.classList.toggle("cards__hidden")
  cards.classList.toggle("cards__visible")
  cards.style.display = "flex";

  artists.classList.toggle("artists__visible")
  artists.classList.toggle("artists__hidden")

  expect.classList.toggle("expect__hidden")
  expect.classList.toggle("expect__visible")
  expect.style.display = "block";

  setTimeout(() => artists.style.display = "none", 800)
});







let href;
if(window.location.href.search("#") > 0){
  href = window.location.href.substring(window.location.href.search("#")+1)
  const scrollTarget = document.getElementById(href);
  const topOffset = menu.offsetHeight;
  const elementPosition = scrollTarget.getBoundingClientRect().top;
  const offsetPosition = elementPosition - topOffset;
  menu_items.forEach(item => {
        
    if (item.parentNode.classList[1] == "menu__active"){
      item.parentNode.classList.remove("menu__active")
    }
    if(item.hash.substring(1) == href){
      item.parentNode.classList.add("menu__active")
    }
    
  })
  setTimeout(() => content.scrollTop = offsetPosition, 500)
}








menu_items.forEach(item => item.addEventListener("click", function (e) {
      if(this.getAttribute('href')[0] == "#"){
          e.preventDefault();
          href = this.getAttribute('href').substring(1);
      }else{
        return 0;
      }
      menu_items.forEach(item => {
       
        if (item.parentNode.classList[1] == "menu__active"){
          item.parentNode.classList.remove("menu__active")
        }
      })
      if(item.hash.substring(1) != "home"){
        this.parentNode.classList.add("menu__active")
      }
      
      const scrollTarget = document.getElementById(href);
      const topOffset = menu.offsetHeight;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;
      menuClick = true
      content.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
      });
      setTimeout(() => menuClick = false, 600)
}))



})






