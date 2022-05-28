
let submit_num = document.querySelector("#sub")
let max2 = document.querySelector("#max2")
let num = document.querySelectorAll(".nu");
let counter_remain_correct = document.querySelector("#counter_remain_correct");
let counter_change_correct = document.querySelector("#counter_change_correct");
let probability_remain = document.querySelector("#probability_remain")
let probability_change = document.querySelector("#probability_change");
let time_span = document.querySelector("#time");
let error_msg = document.querySelector("#error")
let number, right_choice, first_choice, rand_remove, win_count_r = 0, loss_count_r = 0, win_count_s = 0, loss_count_s = 0;
let array = [1,2,3];
let win_r = [];
let win_s = [];
let start,end,time;
let counter = 1

submit_num.addEventListener("click", ()=>{
    if(max2.value>=10 && max2.value<=4000){
    localStorage.setItem("number", max2.value);
    }else{
        error_msg.innerText = "Seleziona un numero valido"
    }
})
if(localStorage.getItem("number")){
    number = localStorage.getItem("number");
}

for(let i = 0; i<num.length; i++){
    num[i].innerText = number
}

let mount_hallr = (n, array) => {
    let copy_arr = [...array]
    first_choice = array[Math.floor(Math.random() * array.length)];
    array.splice(array.indexOf(first_choice), 1)
    if(first_choice === n){
        rand_remove = array[Math.floor(Math.random() * array.length)];
        copy_arr.splice(copy_arr.indexOf(rand_remove), 1);
        win_count_r++
        counter_remain_correct.innerText = win_count_r;
        probability_remain.innerText = ((win_count_r/number)*100).toFixed(4);
        win_r.push(win_count_r)
   f(win_s,win_r)
    }else{
        array.splice(array.indexOf(n), 1)
        copy_arr.splice(copy_arr.indexOf(array[0]), 1);
        loss_count_r++
        win_r.push(win_count_r)
        f(win_s,win_r)
    }
}
let mount_halls = (n, array) => {
    let copy_arr = [...array]
    first_choice = array[Math.floor(Math.random() * array.length)];
    array.splice(array.indexOf(first_choice), 1)
    if(first_choice === n){
        rand_remove = array[Math.floor(Math.random() * array.length)];
        copy_arr.splice(copy_arr.indexOf(rand_remove), 1);
        loss_count_s++
        win_s.push(win_count_s)
        f(win_s,win_r)
    }else{
        array.splice(array.indexOf(n), 1)
        copy_arr.splice(copy_arr.indexOf(array[0]), 1);
        win_count_s++
        counter_change_correct.innerText = win_count_s
        probability_change.innerText = ((win_count_s/number)*100).toFixed(4);
        win_s.push(win_count_s)
        f(win_s,win_r)
    }
}

let intervallo = setInterval(() => {
    if(time_span.innerText == ""){
        time_span.innerText = "loading..."
    }
    if(counter == 1){
        start = performance.now();
    }
    right_choice = Math.floor((Math.random() * 3) + 1);
    mount_hallr(right_choice, [1,2,3])
    mount_halls(right_choice, [1,2,3])
    f(win_s,win_r)
    if (counter >= number) {
        end = performance.now();
        time = end - start;
        time_span.innerText = `${(time/1000).toFixed(2)} secondi` ;
        clearInterval(intervallo);
      }
      counter++;
}, 10)
