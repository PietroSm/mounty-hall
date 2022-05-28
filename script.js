let first = document.querySelector("#first .s");
let second = document.querySelector("#second .s");
let third = document.querySelector("#third .s");
let choice = document.querySelector(".choice");
let door_li = document.querySelectorAll(".door");
let door = document.querySelectorAll(".choose");
let submit = document.querySelector(".submit");
let s = document.querySelectorAll(".s");
let first_choice = document.getElementById("first_choice");
let second_choice = document.getElementById("second_choice");
let change = document.getElementById("change");
let remain = document.getElementById("remain");
let answer = document.querySelector(".answer");
let img = document.querySelectorAll("img");
let error = document.querySelector(".error")
let chosen_door_item;
let n;
let deleted;
items = [first, second, third];
let newArr = [...items];
let arr = [];
var item_right = items[Math.floor(Math.random() * items.length)];
let correct_number = +item_right.textContent;
item_right.classList.add("success");

for (let num of door) {
  let door_chosen = num.textContent;
  if (num.textContent == 1) {
    door[0].addEventListener("click", () => {
      choice.innerText = +door_chosen;
      n = 1;
      s[0].classList.add("chosen");
      return;
    });
  } else if (num.textContent == 2) {
    door[1].addEventListener("click", () => {
      choice.innerText = +door_chosen;
      n = 2;
      s[1].classList.add("chosen");
      return;
    });
  } else if (num.textContent == 3) {
    door[2].addEventListener("click", () => {
      choice.innerText = +door_chosen;
      s[2].classList.add("chosen");
      n = 3;
      return;
    });
  }
}
submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (choice.innerText == "nothing") {
    error.innerText = "Please select at least one door"
  } else {
    choice.innerText = n;
    error.innerText = ""
    for (let i of s) {
      if (i.classList.contains("chosen")) {
        chosen_door_item = i;
        //console.log("Chosen " + +chosen_door_item.textContent);
      }
    }
    //remove wrong door
    for (let i of s) {
      if (i.classList.contains("chosen") || i.classList.contains("success")) {
        let index1 = items.indexOf(i);
        items.splice(index1, 1);
        newArr.splice(index1, 1);
        arr.push(i);
        //console.log(arr);
      }
    }
    if (items.length === 2) {
      let rand = Math.floor(Math.random() * items.length);
      items[
        rand
      ].parentElement.style.animation = `removing 0.7s ease forwards 0s`;
      let index2 = newArr.indexOf(items[rand]);
      newArr.splice(index2, 1);
      arr.push(newArr[0]);
      $(items[rand].parentElement).one(
        "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
        function () {
          items[rand].parentElement.remove();
          deleted = +items[rand].textContent;
        }
      );
    } else {
      for (let i of items) {
        i.style.animation = `removing 0.7s ease-in forwards 0s`;
        $(i).one(
          "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function () {
            i.parentElement.remove();
            deleted = +i.textContent;
          }
        );
      }
    }
    first_choice.remove();
    second_choice.setAttribute("style", "display: block;");

    door[0].disabled = true;
    door[1].disabled = true;
    door[2].disabled = true;
   
  }
});
/*
console.log(+correct_number);
console.log(items);

console.log("Correct number is " + correct_number);*/

change.addEventListener("click", (e) => {
  e.preventDefault();
  //console.log("Array with current doors", arr);

  for (let i of arr) {
    let children = i.parentElement.children;
    if (i.classList.contains("success")) {
      children[1].src = "img/car.png";
    } else {
      children[1].src = "img/goat.png";
    }

    i.style.animation = `open 5.3s ease-in forwards 0s`;
    $(i).one(
      "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function () {
        if (+choice.textContent != correct_number) {
          answer.innerText = "Correct";
          answer.classList.add("guessed")
        } else {
          answer.innerText = `Wrong, the correct door was the ${correct_number}°`;
          answer.classList.add("wrong")
        }
      }
    );
  }

  change.disabled = true;
  remain.disabled = true;
});
remain.addEventListener("click", () => {
  for (let i of arr) {
    let children = i.parentElement.children;
    if (i.classList.contains("success")) {
      children[1].src = "img/car.png";
    } else {
      children[1].src = "img/goat.png";
    }
  
  for (let i of arr) {
    i.style.animation = `open 4.3s ease-in forwards 0s`;
    $(i).one(
      "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function () {
        if (+choice.textContent == correct_number) {
          answer.innerText = "Correct";
          answer.classList.add("guessed")
        } else {
          answer.innerText = `Wrong, the correct door was the ${correct_number}°`;
          answer.classList.add("wrong")
        }
      }
    );
  }
}

  remain.disabled = true;
  change.disabled = true;
});
/*var favicon = require('serve-favicon')
const app = express();
const PORT = process.env.PORT || 3001
app.use(favicon(path.join(__dirname, 'img', 'favicon.ico'))) 
app.use(urlencoded({ extended: false })) ;
app.use(express.json())
app.get('/favicon.ico', function(req, res) {
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.status(204);
  res.end();
  console.log("error araha hia")
});

          app.listen(PORT, () => {
              console.log("Running")
          });
*/