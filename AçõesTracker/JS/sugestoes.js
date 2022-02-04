
const searchWrapper = document.querySelector('.search-input');
const inputBox = searchWrapper.querySelector('input');
const suggBox = searchWrapper.querySelector('.autocom-box');


inputBox.onkeyup = (e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){

        let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userData}&apikey=2I0KI7D1F64W9531`;
        axios.get(url).then(response=>{

            (response.data.bestMatches).forEach(element => {
                emptyArray.unshift(`<li> ${element['1. symbol']} </li>`);
            });
            
            searchWrapper.classList.add('active');
            showSuggestions(emptyArray);

            let allList = suggBox.querySelectorAll("li");
            for (let i = 0; i < allList.length; i++) {
                allList[i].setAttribute("onclick",'select(this)')
            }
        })
    }else{
        searchWrapper.classList.remove('active')
    }
}


function select(element){
    let selectUserData = element.textContent;
    inputBox.value = selectUserData;
    console.log(inputBox.value)
    searchWrapper.classList.remove('active')
}


function showSuggestions(list){
    let listData;

    if(!list.length){
        listData = `<li> Não encontrado <li>`
    }else{
        listData = list.join('');
    }

    suggBox.innerHTML = listData
}


