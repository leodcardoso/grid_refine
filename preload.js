const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    abrePontoWindow: () => ipcRenderer.send('abrePontoWindow'),
    abreMalhaWindow: () => ipcRenderer.send('abreMalhaWindow'),
    // xp = xpixel
    abreCalibrarWindow: (xp1, xp2, yp1, yp2) => ipcRenderer.send('abreCalibrarWindow', xp1, xp2, yp1, yp2),
    onPixelEixos: (args) => ipcRenderer.on('pixel_eixos', args),
    onTest: (callback) => ipcRenderer.on("111", callback),
    retornaParametros: (xa, xb, ya, yb) => ipcRenderer.send('retornaParametros', xa, xb, ya, yb),
    verPontosWindow: () => ipcRenderer.send('verPontosWindow'),
    onEnviaParametros: (xa, xb, ya, yb) => ipcRenderer.on('enviaParametros', xa, xb, ya, yb),
    enviaPontos: (l1, l2, l3, l4, xa, xb, ya, yb) => ipcRenderer.send('enviaPontos', l1, l2, l3, l4, xa, xb, ya, yb),
    onPontoMalha: (l1, l2, l3, l4) => ipcRenderer.on("pontosMalha", l1, l2, l3, l4),
    iniciaMalha: (malha, imax, jmax) => ipcRenderer.send("inicia_malha", malha, imax, jmax),
    onInfoMalha: (args) => ipcRenderer.on("info_malha", args),
    iniciaQualiade: (imax, jmax, x, y, a, b) => ipcRenderer.send("inicia_qualidade", imax, jmax, x, y, a, b),
    onInfoQualidade: (args) => ipcRenderer.on("info_qualidade", args),
    enviaMalha: (imax, jmax, x, y) => ipcRenderer.send("mesh_data", imax, jmax, x, y),
});