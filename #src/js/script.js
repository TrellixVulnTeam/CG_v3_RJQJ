
let archs = document.querySelectorAll(".arch"),
    main = document.querySelector(".main2"),
    content = document.querySelector(".border_second"),
    map = document.querySelector(".map");

main.style.marginTop = `${archs[1].scrollHeight - document.querySelector(".middle-dark").scrollHeight - document.querySelector(".dark-wrap").scrollHeight}px`;
document.querySelectorAll(".arch__hidden").forEach(arch => {
  arch.style.marginTop = `${archs[1].scrollHeight - document.querySelector(".middle-dark").scrollHeight - document.querySelector(".dark-wrap").scrollHeight}px`;
})
console.log(document.querySelector(".arch__hidden"))
window.addEventListener("resize", function() {
  main.style.marginTop = `${archs[1].scrollHeight - document.querySelector(".middle-dark").scrollHeight - document.querySelector(".dark-wrap").scrollHeight}px`;
  document.querySelectorAll(".arch__hidden").forEach(arch => {
    arch.style.marginTop = `${archs[1].scrollHeight - document.querySelector(".middle-dark").scrollHeight - document.querySelector(".dark-wrap").scrollHeight}px`;
  })
})

content.addEventListener("scroll", function() {
  archs[0].scrollTop = content.scrollTop;
  archs[1].scrollTop = content.scrollTop;
  archs[2].scrollTop = content.scrollTop;
  ////////////для map//////////////
  const posTop = map.getBoundingClientRect().top;
  if((posTop + (map.clientHeight - 140) <= window.innerHeight && posTop >= 0) || posTop <= 0) {
    document.querySelector(".noise").style.zIndex = "0";
    
  }else{
    document.querySelector(".noise").style.zIndex = "5";
    document.querySelector(".arch__hidden").classList.remove("arch__visible")
  }
});


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





const menu_items = document.querySelectorAll(".menu__item a");
const menu = document.querySelector(".menu")

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



let balls = document.querySelectorAll(".map__circle");

map.addEventListener("mousemove", function(e) {
   balls.forEach(ball => {
      let x = ball.getBoundingClientRect().x
      let y = ball.getBoundingClientRect().y
      ball.style.left = e.pageX  - ball.offsetWidth / 2 -  x + 'px';
      ball.style.top = e.pageY - ball.offsetHeight /2 - y + 'px';
   })
})


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
      this.parentNode.classList.add("menu__active")
      const scrollTarget = document.getElementById(href);
      const topOffset = menu.offsetHeight;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;
      content.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
      });
}))


