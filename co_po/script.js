let coCount = 5;

function getActionWord(sentence){
    return sentence.trim().split(" ")[0].toLowerCase();
}

function updateTotal() {
    const sections = document.querySelectorAll("table");

    sections.forEach((table, index) => {
        let yesCount = 0;
        const radios = table.querySelectorAll("input[type='radio']:checked");

        radios.forEach(radio => {
            if (radio.value === "yes") {
                yesCount++;
            }
        });

        const totalCell = table.querySelector(".suggested-value");

        if (totalCell) {
            totalCell.innerText = yesCount;
        }
    });
}

function checkword(){

    let remembering=["define","list","recall","identify","name"];
    let understanding=["describe","explain","interpret","illustrate","discuss"];
    let applying=["use","solve","implement"];
    let analyzing=["compare","examine","distinguish"];
    let creating=["design","construct","plan","produce","invent"];

    let table=document.getElementById("mappingTable");
    if(!table) return;

    let headerRow = table.rows[1];

    for(let i=1;i<=coCount;i++){

        let input=document.getElementById("course"+i);
        if(!input) continue;

        let sentence=input.value;

        if(sentence.trim()==="") continue;

        let word=getActionWord(sentence);
        let level=0;

        if(remembering.includes(word)) level=1;
        else if(understanding.includes(word)) level=2;
        else if(applying.includes(word)) level=3;
        else if(analyzing.includes(word)) level=4;
        else if(creating.includes(word)) level=5;

        document.getElementById("KC"+i).innerHTML=level?"K"+level:"Unknown";
        document.getElementById("KL"+i).innerHTML=level?"K"+level:"Unknown";

        localStorage.setItem("course"+i, sentence);
        localStorage.setItem("Klevel"+i, level);

        for(let j=1;j<=5;j++){
            let cell=document.getElementById("R"+i+"C"+j);
            if(!cell) continue;
            if(cell.classList.contains("manual-edit")) continue;

            let poK=parseInt(headerRow.cells[j].innerText.substring(1));
            let diff=Math.abs(level-poK);

            if(!level) cell.innerHTML="-";
            else if(diff===0) cell.innerHTML="3";
            else if(diff===1) cell.innerHTML="2";
            else if(diff===2) cell.innerHTML="1";
            else cell.innerHTML="-";
        }
    }
}

window.addEventListener("load", function(){

    for(let i=1;i<=5;i++){
        let stored = localStorage.getItem("course"+i);
        let k = localStorage.getItem("Klevel"+i);

        if(stored && document.getElementById("KL"+i)){
            document.getElementById("KL"+i).innerText = "K"+k;
        }
    }

});

document.addEventListener("click",function(e){

    if(
        e.target.tagName==="TD" &&
        (e.target.id.startsWith("R") || e.target.id.startsWith("cc"))
    ){

        let cell=e.target;
        if(cell.querySelector("input")) return;

        let oldValue=cell.innerText;

        let input=document.createElement("input");
        cell.innerHTML="";
        input.type="text";
        input.value=oldValue;
        input.style.width="50px";

        cell.appendChild(input);
        input.focus();

        input.onblur=function(){
            let newVal=input.value;
            cell.innerHTML=newVal;

            if(newVal!==oldValue){
                cell.classList.add("manual-edit");
            }
        };
    }
});

window.toggleDark = function () {
    document.body.classList.toggle("dark");
};