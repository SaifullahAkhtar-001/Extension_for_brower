 let myLead = []
 const inputEl = document.getElementById("input-el")
 const inputBtn = document.getElementById("input-btn")
 const ulEl = document.getElementById("ul-el")
 const deleteBtn = document.getElementById("delete-btn")
 const tabBtn = document.getElementById("tab-btn")
 let leadsFromlocalStorage = JSON.parse(localStorage.getItem("myLead"))

 if(leadsFromlocalStorage){
    myLead = leadsFromlocalStorage
    render(myLead)
 }

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        myLead.push(url)
        localStorage.setItem("myLead", JSON.stringify(myLead) )
        render(myLead)
        
    });
 })
 
 inputBtn.addEventListener("click", function(){
    myLead.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLead", JSON.stringify(myLead))
    render(myLead)
 })
 
 deleteBtn.addEventListener("dblclick" ,function(){
    localStorage.clear()
    myLead = []
    render(myLead)
 })

 function render(lead){
    let listItems = ""
    for(let i = 0; i < lead.length; i++){
        listItems += `
        <li>
            <a target = '_blank' href = ${lead[i]}>
                ${lead[i]}
            </a>
        </li>
        `
        }
        ulEl.innerHTML = listItems
    }

