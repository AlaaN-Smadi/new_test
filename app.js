'use strict';

const API = "https://filltext.com/?rows=50&fname={firstName}&lname={lastName}&pretty=true&category=[1,2,3]";
let cards_Container = document.getElementById("cards_Container");

let myData = [];


//  function to get data from the API link
function getData() {
    fetch(API).then(async (response) => {
        // // console.log("test =>",await response.json());
        myData = await response.json();

        createCard(myData);

    })

}


// function to create the cards and show them in the DOM
function createCard(data) {
    // console.log("data =>", data);
    cards_Container.innerHTML = "";
    let ulEle = document.createElement("ul");
    for (let i = 0; i < data.length; i++) {
        // console.log("test =>", data[i]);
        let card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `

        <div class="card_Icon">
            <span>${data[i].fname[0]}${data[i].lname[0]}</span>
        </div>
        <div class="card-header">
            <h2>${data[i].fname} ${data[i].lname}</h2>
        </div>
        <div class="card-body">
            <p>category${data[i].category}</p>
        </div>
    `;
    ulEle.appendChild(card);
    }

    cards_Container.appendChild(ulEle);
}




// filter part
let myCatigoryFilter1 = document.getElementById("category_1")
let myCatigoryFilter2 = document.getElementById("category_2")
let myCatigoryFilter3 = document.getElementById("category_3")
let filterState = null;

let filterBtnArr = [
    {btn:myCatigoryFilter1,cat:"1"}, 
    {btn:myCatigoryFilter2,cat:"2"}, 
    {btn:myCatigoryFilter3,cat:"3"}];

// add event listener to the filter buttons to show our cards filtered
for(let i=0;i<filterBtnArr.length;i++){
    filterBtnArr[i].btn.addEventListener("click",function(){
        
        console.log("clicked", filterState);
        // console.log("test =>",filterBtnArr[i].cat);
        if(filterState == filterBtnArr[i].cat){
            filterState = null;
            console.log("test Double Click =>",filterState);
           document.getElementById("filter_Container").setAttribute("class", `filter_Container`);
            createCard(myData);
        }else{
            filterState = filterBtnArr[i].cat;
           document.getElementById("filter_Container").setAttribute("class", `filter_Container ${filterBtnArr[i].cat}`);
           filterData(filterBtnArr[i].cat);
        }
    })
}

// function to filter the data with respect to the catigory
function filterData(cat){
    // console.log("test =>",cat);
    let filteredData = myData.filter((item)=>{
        return item.category == cat;
    })
    // console.log("filteredData =>",filteredData);
    createCard(filteredData);
}

// calling the getData function to get the data from the API
getData();
