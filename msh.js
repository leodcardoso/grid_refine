let imax = 4;
let jmax = 5;

var arestas_internas = "";
let ponto_atual = 1;
let volume = 1;
for (let i = 0; i < imax; i++){
  for (let j = 0; j < jmax; j++){
    if (i >= 1 && j >= 1 && i < imax - 1 && j < jmax-1){
        if (i !== imax - 2){
            let linha_vertical = ponto_atual.toString(16) + " " + (ponto_atual + jmax-2).toString(16) + " ";
            arestas_internas += linha_vertical + volume + " " + (volume - 1) + "\n";
        }
        if (j !== jmax-2 ){
            let linha_horizontal = ponto_atual.toString(16) + " " + (ponto_atual + 1).toString(16) + " ";
            arestas_internas += linha_horizontal + + volume + " " + (volume - jmax + 1) + "\n";
            
        }
        ponto_atual++;
    }
    volume++;
  }
  volume--;
}
let p1 = ponto_atual;
console.log(p1);

volume = 2;
for (let j = 1; j < jmax - 1; j++){
    let linha = ponto_atual + " " + (ponto_atual-(p1-1)) + " ";
    arestas_internas += linha + volume + " " + (volume - 1) + "\n";
    ponto_atual++;
    volume++;
}


console.log(arestas_internas);
let p2 = ponto_atual-1;
console.log(p2);
let p3 = ponto_atual;
volume = (jmax-1)*(imax-2) + 2;
for (let j = 1; j < jmax - 1; j++){
    let linha = ponto_atual + " " + (ponto_atual-(p1-1)) + " ";
    arestas_internas += linha  + volume + " " + (volume - 1) + "\n";
    ponto_atual++;
    volume++
}
console.log(arestas_internas);
let p4 = ponto_atual-1;
console.log(p4);

let p5 = ponto_atual;
let correspondente = 1;
volume = 1;
for (let i = 1; i < imax - 1; i++){
    let linha = ponto_atual + " " + (correspondente) + " ";
    arestas_internas += linha + volume + " " + (volume +jmax - 1) + "\n";;
    ponto_atual++;
    correspondente += jmax-2;
    volume += jmax-1
}

let p6 = ponto_atual - 1;
let p7 = ponto_atual;
correspondente = jmax - 2;

volume = jmax-1
for (let i = 1; i < imax - 1; i++){
    let linha = ponto_atual + " " + (correspondente) + " ";
    arestas_internas += linha  + volume + " " + (volume +jmax - 1) + "\n";;;
    ponto_atual++;
    correspondente += jmax-2;
    volume += jmax-1
}
let p8 = ponto_atual - 1;

console.log(arestas_internas);

let arestas_esquerda = "";
volume = 1;
let ultimo = p8 + 1;
let atual = p5;
for (let i = 1; i <imax-1; i++){
    let linha = ultimo + " " + (atual) + " " + volume + " 0\n";
    arestas_esquerda += linha;
    ultimo = atual;
    atual ++;
    volume += jmax-1;
}
arestas_esquerda += ultimo + " " + (p8+2) + " " + volume + " 0\n";
console.log(arestas_esquerda);


let arestas_cima = "";
volume = 1;
ultimo = p8 + 1;
atual = p1;
for (let j = 1; j <jmax-1; j++){
    let linha = ultimo + " " + (atual) + " " + volume + " 0\n";
    arestas_cima += linha;
    ultimo = atual;
    atual ++;
    volume ++;
}

arestas_cima += ultimo + " " + (p8+4) + " " + volume + " 0\n";

console.log(arestas_cima);


let arestas_direita = "";
volume = jmax-1;
ultimo = p8 + 4;
atual = p7;
for (let i = 1; i <imax-1; i++){
    let linha = ultimo + " " + (atual) + " " + volume + " 0\n";
    arestas_direita += linha;
    ultimo = atual;
    atual ++;
    volume +=jmax-1;
}

arestas_direita += ultimo + " " + (p8+3) + " " + volume + " 0\n";

console.log(arestas_direita);


let arestas_baixo = "";
volume = (jmax-1)*(imax-2) + 1;
ultimo = p8 + 2;
atual = p3;
for (let j = 1; j <jmax-1; j++){
    let linha = ultimo + " " + (atual) + " " + volume + " 0\n";
    arestas_baixo += linha;
    ultimo = atual;
    atual ++;
    volume ++;
}

arestas_baixo += ultimo + " " + (p8+3) + " " + volume + " 0\n";

console.log(arestas_baixo);