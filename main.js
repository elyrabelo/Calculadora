import Botao from "./Botao.js";

function criarCalculadora(){
    criarVisor();
    criarBotoes();
    tecladoNum();
}

function criarBotoes(){
    var botoes = ["0","1","2","3","4","5","6","7","8","9"];
    var botoesEspeciais= [new Botao(".","ponto"),
                          new Botao("+","adicao"),
                          new Botao("-","subtracao"),
                          new Botao("x","multiplicacao"),
                          new Botao("÷","divisao"),
                          new Botao("=","igual"),
                          new Botao("MC","apagar")];
    for(let botao of botoes){
        let btn = document.createElement("button");
        btn.setAttribute("value",botao);
        btn.setAttribute("id",`_${botao}`);
        btn.setAttribute("class","btn");
        btn.innerHTML=botao;
        btn.addEventListener("click",function (){adicionarValorVisor(botao)});
        document.getElementById("botoes").appendChild(btn);
    }

    for(let botao of botoesEspeciais){
        let btn = document.createElement("button");
        btn.setAttribute("value",botao.display);
        btn.setAttribute("id",`_${botao.id}`);
        btn.setAttribute("class","btn");
        btn.innerHTML=botao.display;
        if(botao.display=='MC'){
            btn.addEventListener("click",function (){apagar()});
        }else if (botao.display=='='){
            btn.addEventListener("click",function(){calcular()});
        }else{
            btn.addEventListener("click",function (){adicionarValorVisor(botao.display)});
        }
        document.getElementById("botoes").appendChild(btn);
    }
}

function criarVisor(){
    let visor= document.createElement("input");
    visor.setAttribute("type","text");
    visor.setAttribute("value",'0');
    visor.setAttribute("id","tela");
    visor.disabled=true;
    document.getElementById("botoes").appendChild(visor);
}

function adicionarValorVisor(valorVisor){
    var valorTela=document.getElementById("tela");
    if(valorTela.value=='0' && valorTela.value.length==1 && valorVisor!='.'){
        valorTela.value=valorVisor;
    }else{
        valorTela.value=valorTela.value+valorVisor;
    }
}

function apagar(){
    var valorTela=document.getElementById("tela").value;
    document.getElementById("tela").value=valorTela.substring(0,valorTela.length-1);
    if( document.getElementById("tela").value == ""){
        document.getElementById("tela").value='0';
    }
}

function calcular(){
    var valorVisor=document.getElementById("tela").value.replace("x","*").replace("÷","/");
    document.getElementById("tela").value=eval(valorVisor);
}

function tecladoNum (){
    document.addEventListener("keydown", function (event) {
        console.log (event);
        var codigoBotao=event.key;
        if(event.key == "+"){
            codigoBotao="adicao";
        }else if (event.key == "-"){
            codigoBotao="subtracao";
        }else if (event.key == "*"){
            codigoBotao="multiplicacao";
        }else if (event.key == "/"){
            codigoBotao="divisao";
        }else if (event.key == "=" || event.key == "Enter"){
            codigoBotao="igual";
            calcular();
        }else if (event.key == "Backspace" || event.key == "Delete"){
            codigoBotao="apagar";
            apagar();
        }else if (event.key == "," || event.key == "."){
            codigoBotao="ponto";
        }

        var botao=document.getElementById(`_${codigoBotao}`);
        if(codigoBotao!="igual" && codigoBotao !="apagar"){
            console.log(codigoBotao)
            adicionarValorVisor(botao.value);
        }
    })
}
window.onload=criarCalculadora();
