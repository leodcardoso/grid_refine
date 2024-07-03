
const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const path = require('path');
const fs = require('fs');
let mainWindow;
let malhaWindow;
let pontoWindow;
let calibrarWindow;
let qualidadeWindow;
function createMainWindow(){
    mainWindow = new BrowserWindow({
        height: 900,
        width: 1600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    
    //mainWindow.webContents.openDevTools();
    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
}
function createPontoWindow(){
    pontoWindow = new BrowserWindow({
        height: 900,
        width: 1600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    pontoWindow.webContents.openDevTools();
    pontoWindow.loadFile(path.join(__dirname, 'renderer/ponto.html'));
}
/*
const template = [
    {label: 'arquivo',
    submenu: [{
        label: 'abrir',
        click: () => console.log("a")
    }
    ]
    }

]
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
*/
function createMalhaWindow(){
    malhaWindow = new BrowserWindow({
        height: 900,
        width: 1600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    
    malhaWindow.loadFile(path.join(__dirname, 'renderer/malha.html'));
    malhaWindow.webContents.openDevTools();
}
function createCalibrarWindow(){
    calibrarWindow = new BrowserWindow({
        height: 300,
        width: 300,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    //calibrarWindow.webContents.openDevTools();
    calibrarWindow.loadFile(path.join(__dirname, 'renderer/calibrar.html'));
}
function createVerPontosWindow(){
    let verPontosWindow = new BrowserWindow({
        height: 600,
        width: 300,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    verPontosWindow.webContents.openDevTools();
    verPontosWindow.loadFile(path.join(__dirname, 'renderer/lista_pontos.html'));
}
function createQualidadeWindow(){
    qualidadeWindow = new BrowserWindow({
        height: 900,
        width: 1600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    
    qualidadeWindow.loadFile(path.join(__dirname, 'renderer/qualidade.html'));
    qualidadeWindow.webContents.openDevTools();
}
ipcMain.on('abrePontoWindow', () => {
    createPontoWindow();
    mainWindow.close();
});
ipcMain.on('abreMalhaWindow', () => {malhaWindow.show()});
ipcMain.on('abreCalibrarWindow', (event, xp1, xp2, yp1, yp2) =>{
    calibrarWindow.show();
    var args = [xp1, xp2, yp1, yp2]
    calibrarWindow.webContents.send('pixel_eixos', args);
    calibrarWindow.webContents.send("111", 4321);
});
ipcMain.on('retornaParametros', (event, xa, xb, ya, yb) =>{
    pontoWindow.webContents.send('enviaParametros', xa, xb, ya, yb);
    calibrarWindow.close();
})

ipcMain.on('verPontosWindow', createVerPontosWindow);
ipcMain.on('enviaPontos', (event, l1, l2, l3, l4, xa, xb, ya, yb) =>{
    fs.writeFile("lado1.txt", l1, (err) => {
        if (!err){
            console.log("arquivo escrito");
        }else{
            console.log(err);
        }
    });
    fs.writeFile("lado2.txt", l2, (err) => {
        if (!err){
            console.log("arquivo escrito");
        }else{
            console.log(err);
        }
    });
    fs.writeFile("lado3.txt", l3, (err) => {
        if (!err){
            console.log("arquivo escrito");
        }else{
            console.log(err);
        }
    });
    fs.writeFile("lado4.txt", l4, (err) => {
        if (!err){
            console.log("arquivo escrito");
        }else{
            console.log(err);
        }
    });
    let s = xa + " " + xb + " " + ya + " " + yb;
    fs.writeFile("parametros.txt", s, (err) => {
        if (!err){
            console.log("arquivo escrito");
        }else{
            console.log(err);
        }
    });
    malhaWindow.show();
    console.log("ALSKD");
    malhaWindow.webContents.send("pontosMalha", l1, l2, l3, l4);
    console.log("KLJASDLÇJ");
});
app.on('ready', () => {
    createMainWindow();
    //createPontoWindow();
    createCalibrarWindow();
    calibrarWindow.hide();
    createMalhaWindow();
    malhaWindow.hide();
    createQualidadeWindow();
    qualidadeWindow.hide();
    //createVerPontosWindow();
});


app.on('window-all-closed', () => {
    app.quit();
});
  
  // Open a window if none are open (macOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
ipcMain.on('inicia_malha', (event, malha, imax,  jmax) =>{
    malhaWindow.show();
    var args = [malha, imax, jmax];

    malhaWindow.webContents.send('info_malha', args);
});

ipcMain.on('inicia_qualidade', (event, imax, jmax, x, y, a, b)=>{
    qualidadeWindow.show();
    var args = [imax, jmax, x, y, a, b];
    qualidadeWindow.webContents.send("info_qualidade", args);
})



ipcMain.on("mesh_data", (event, imax, jmax, x, y) =>{
var texto = "";
var arestas_internas = "";
let ponto_atual = 1;
let volume = 1;
let qtd_internas = 0;
for (let i = 0; i < imax; i++){
  for (let j = 0; j < jmax; j++){
    if (i >= 1 && j >= 1 && i < imax - 1 && j < jmax-1){
        if (i !== imax - 2){
            let linha_vertical = ponto_atual.toString(16) + " " + (ponto_atual + jmax-2).toString(16) + " ";
            arestas_internas += linha_vertical + volume.toString(16) + " " + (volume - 1).toString(16) + "\n";
            qtd_internas++;
        }
        if (j !== jmax-2 ){
            let linha_horizontal = ponto_atual.toString(16) + " " + (ponto_atual + 1).toString(16) + " ";
            arestas_internas += linha_horizontal + (volume-jmax+1).toString(16) + " " + (volume).toString(16) + "\n";
            qtd_internas++;
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
    let linha = ponto_atual.toString(16) + " " + (ponto_atual-(p1-1)).toString(16) + " ";
    arestas_internas += linha + volume.toString(16) + " " + (volume - 1).toString(16) + "\n";
    qtd_internas++;
    ponto_atual++;
    volume++;
}

/*
console.log(arestas_internas);
let p2 = ponto_atual-1;
console.log(p2);
let p3 = ponto_atual;
volume = (jmax-1)*(imax-2) + 2;
for (let j = 1; j < jmax - 1; j++){
    let linha = ponto_atual.toString(16) + " " + (ponto_atual-(p1-1)).toString(16) + " ";
    arestas_internas += linha  + volume.toString(16) + " " + (volume - 1).toString(16) + "\n";
    qtd_internas++;
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
    let linha = ponto_atual.toString(16) + " " + (correspondente).toString(16) + " ";
    arestas_internas += linha + volume.toString(16) + " " + (volume +jmax - 1).toString(16) + "\n";;
    qtd_internas++;
    ponto_atual++;
    correspondente += jmax-2;
    volume += jmax-1
}
*/
console.log(arestas_internas);
let p2 = ponto_atual-1;
console.log(p2);
let p3 = ponto_atual;
volume = (jmax-1)*(imax-2) + 2;
let correspondente = (imax-2)*(jmax-2)-jmax+3;
for (let j = 1; j < jmax - 1; j++){
    let linha = ponto_atual.toString(16) + " " + (correspondente).toString(16) + " ";
    arestas_internas += linha  + (volume-1).toString(16) + " " + (volume).toString(16) + "\n";
    qtd_internas++;
    ponto_atual++;
    correspondente++;
    volume++
}
console.log(arestas_internas);
let p4 = ponto_atual-1;
console.log(p4);

let p5 = ponto_atual;
correspondente = 1;
volume = 1;
for (let i = 1; i < imax - 1; i++){
    let linha = ponto_atual.toString(16) + " " + (correspondente).toString(16) + " ";
    arestas_internas += linha + volume.toString(16) + " " + (volume +jmax - 1).toString(16) + "\n";;
    qtd_internas++;
    ponto_atual++;
    correspondente += jmax-2;
    volume += jmax-1;
    
}
let p6 = ponto_atual - 1;
let p7 = ponto_atual;
correspondente = jmax - 2;

volume = jmax-1
for (let i = 1; i < imax - 1; i++){
    let linha = ponto_atual.toString(16) + " " + (correspondente).toString(16) + " ";
    arestas_internas += linha  + (volume+jmax-1).toString(16) + " " + volume.toString(16) + "\n";
    qtd_internas++;
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
    let linha = ultimo.toString(16) + " " + (atual).toString(16) + " " + volume.toString(16) + " 0\n";
    arestas_esquerda += linha;
    ultimo = atual;
    atual ++;
    volume += jmax-1;
}
arestas_esquerda += ultimo.toString(16) + " " + (p8+2).toString(16) + " " + volume.toString(16) + " 0\n";
console.log(arestas_esquerda);


let arestas_cima = "";
volume = 1;
ultimo = p8 + 1;
atual = p1;
for (let j = 1; j <jmax-1; j++){
    let linha = atual.toString(16) + " " + (ultimo).toString(16) + " " + volume.toString(16) + " 0\n";
    arestas_cima += linha;
    ultimo = atual;
    atual ++;
    volume ++;
}

arestas_cima += (p8+4).toString(16) + " " + (ultimo).toString(16) + " " + volume.toString(16) + " 0\n";

console.log(arestas_cima);


let arestas_direita = "";
volume = jmax-1;
ultimo = p8 + 4;
atual = p7;
for (let i = 1; i <imax-1; i++){
    let linha = atual.toString(16) + " " + (ultimo).toString(16) + " " + volume.toString(16) + " 0\n";
    arestas_direita += linha;
    ultimo = atual;
    atual ++;
    volume +=jmax-1;
}

arestas_direita += (p8+3).toString(16) + " " + (ultimo).toString(16) + " " + volume.toString(16) + " 0\n";

console.log(arestas_direita);


let arestas_baixo = "";
volume = (jmax-1)*(imax-2) + 1;
ultimo = p8 + 2;
atual = p3;
for (let j = 1; j <jmax-1; j++){
    let linha = ultimo.toString(16) + " " + (atual).toString(16) + " " + volume.toString(16) + " 0\n";
    arestas_baixo += linha;
    ultimo = atual;
    atual ++;
    volume ++;
}

arestas_baixo += ultimo.toString(16) + " " + (p8+3).toString(16) + " " + volume.toString(16) + " 0\n";

console.log(arestas_baixo);

texto += `(0 grid written by ANSYS Meshing
   nodes:       (10 (id start end type) (x y z ...))
              faces:       (13 (id start end type elemType)
                (v-0 v-1 .. v-n right-cell left-cell ...))
   cells:       (12 (id start end type elemtype))
   parent-face: (59 (start end parent child) (nchilds child0 child1 ...))
   
)
(2 2)`

let qtd_pontos = (imax*jmax).toString(16);
let qtd_arestas = (jmax-1)*imax + jmax*(imax-1); qtd_arestas = qtd_arestas.toString(16);
let qtd_volumes = ((imax-1)*(jmax-1)).toString(16);
let qtd_internos = ((imax-2)*(jmax-2)).toString(16);
texto += `(10 (0 1 ${qtd_pontos} 0))`;
texto += `(13 (0 1 ${qtd_arestas} 0))`;
texto += `(12 (0 1 ${qtd_volumes} 0))`;
texto += `(10 (3 1 ${qtd_internos} 1 2)(`;
for (let i = 1; i < imax - 1; i++){
    for (let j = 1; j < jmax-1; j++){
        var linha = x[i][j] + " " + y[i][j] +"\n";
        texto += linha;
    }
}
let comeco = ((imax-2)*(jmax-2) + 1).toString(16);
let final = (imax*jmax).toString(16);
texto += `))(10 (4 ${comeco} ${final} 2 2)(`;
for (let j = 1; j < jmax-1; j++){
    var linha = x[0][j] + " " + y[0][j] +"\n";
    texto += linha;
}


for (let j = 1; j < jmax-1; j++){
    var linha = x[imax-1][j] + " " + y[imax-1][j] +"\n";
    texto += linha;
}

for (let i = 1; i < imax-1; i++){
    var linha = x[i][0] + " " + y[i][0] +"\n";
    texto += linha;
}
for (let i = 1; i < imax-1; i++){
    var linha = x[i][jmax-1] + " " + y[i][jmax-1] +"\n";
    texto += linha;
}

var linha = x[0][0] + " " + y[0][0] +"\n";
texto += linha;
linha = x[imax-1][0] + " " + y[imax-1][0] +"\n";
texto += linha;

linha = x[imax-1][jmax-1] + " " + y[imax-1][jmax-1] +"\n";
texto += linha;

linha = x[0][jmax-1] + " " + y[0][jmax-1] +"\n";
texto += linha;
texto += "))";
let qtd_internas_txt = qtd_internas.toString(16);
texto += `(13 (1 1 ${qtd_internas_txt} 2 2)(`;
texto += arestas_internas;
texto += "))";
let zona_5_inicio = qtd_internas + 1;
let zona_5_final = qtd_internas +imax-1;
texto += `(13 (5 ${zona_5_inicio.toString(16)} ${zona_5_final.toString(16)} 3 2)(`;
texto += arestas_esquerda;
texto += "))";

let zona_6_inicio = zona_5_final + 1;
let zona_6_final = zona_6_inicio + jmax-2;
texto += `(13 (6 ${zona_6_inicio.toString(16)} ${zona_6_final.toString(16)} 3 2)(`;
texto += arestas_baixo;
texto += "))";

let zona_7_inicio = zona_6_final + 1;
let zona_7_final = zona_7_inicio +imax-2;
texto += `(13 (7 ${zona_7_inicio.toString(16)} ${zona_7_final.toString(16)} 3 2)(`;
texto += arestas_direita;
texto += "))";

let zona_8_inicio = zona_7_final + 1;
let zona_8_final = zona_8_inicio +jmax-2;
texto += `(13 (8 ${zona_8_inicio.toString(16)} ${zona_8_final.toString(16)} 3 2)(`;
texto += arestas_cima;
texto += "))\n";
texto += `(12	(2	1	${qtd_volumes}	1	3))\n`;
texto += `(45	(1	interior	interior-surface_body)())\n
(45	(2	fluid	surface_body)())\n
(45	(5	wall	aresta1)())\n
(45	(6	wall	aresta2)())\n
(45	(7	wall	aresta3)())\n
(45	(8	wall	aresta4)())\n`;


fs.writeFile("dados.msh", texto, (err)=>{
    if (err){
        console.log(err);
    }
    
});


});