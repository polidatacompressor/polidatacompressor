//--------------------------------------------------
//        POLIDATACOMPRESSOR TECHNOLOGY
//-------------------------------------------------//

function Ncomp(P1) {
    //Used to compress numbers
    if (P1 == 0) { // used to considere zero like a numeric natural
        var VR = new Uint8Array(1);
        VR[0] = 0;
        return VR;
    }
    var VC = Math.ceil(Math.log(P1) / Math.log(256));
    if (VC == 0) {
        VC = 1;
    }
    else if (Math.log(P1) / Math.log(256) == Math.ceil(Math.log(P1) / Math.log(256))) {
        VC = VC + 1;  
    }
    var VR = new Uint8Array(VC);
    VR[0] = (P1 % 256);
    var AUX;
    AUX = P1;
    for (var x = 1; x < VC; x++) {
        AUX = Math.floor(AUX / 256);
        VR[x] = (AUX % 256);
    }
    return VR;
}
function Ndecomp(P1) {
    // Used to decompress numbers
    var VC = P1.length;
    var VR;
    VR = P1[VC - 1];
    for (var x = VC - 1; x > 0; x--) {
        VR = (VR * 256) + P1[x - 1];
    }
    return VR;
}
function Tcomp(P1, LIST) {
    // Used to compress Alphanumerics limited by a LIST
    if (LIST.length < 3) {
        alert("Error: List must be greater than 2. If you have a list with two variables, like Yes or No, use Boolean Compressor (Bcomp) algorithm.");
    }
    var VC = Math.ceil(Math.log(LIST.length) / Math.log(2));
    if (VC == 0) {
        VC = 1;
    }
    var VR = new Uint8Array(P1.length * 8);
    var z = 0;
    for (var x = 0; x < P1.length; x++) {
        var aux = LIST.indexOf(P1.substr(x, 1), 0) + 1;
        for (var y = 0; y < VC; y++) {
            VR[z] = (Math.floor(aux / (Math.pow(2, y))) % 2);
            z++;
        }
    }
    var VRDEC = new Uint8Array(P1.length);
    z = 0;
    aux = 0;
    for (var x = 0; x < VR.length; x++) {
        if (x % 8 == 0 && x > 0) {
            VRDEC[z] = aux;
            z++;
            aux = 0;
        }
        aux = aux + (VR[x] * (Math.pow(2, (x % 8))));
    }
    if (aux > 0) {
        VRDEC[z] = aux;
    }
    z = 0;
    for (var x = VRDEC.length - 1; x > 0; x--) {
        if (VRDEC[x] != 0) {
            break;
        }
        else {
            z++;
        }
    }
    var VRFIN = new Uint8Array(VRDEC.length - z);
    for (var x = 0; x <= VRFIN.length; x++) {
        VRFIN[x] = VRDEC[x];
    }
    return VRFIN;
}
function Tdecomp(P1, LIST) {
    // Used to descompress Alphanumerics limited by a LIST
    var VC = Math.ceil(Math.log(LIST.length) / Math.log(2));
    var VR = new Uint8Array(P1.length * 8);
    var z = -1;
    for (var x = 0; x < P1.length; x++) {
        for (var y = 0; y < 8; y++) {
            z++;
            VR[z] = Math.floor((P1[x] / (Math.pow(2, y))) % 2);
        }
    }
    z = -1;
    var v_dec = 0;
    var VRDEC = '';
    for (var x = 0; x < VR.length; x++) {
        if ((x % VC) == 0 && x > 0 && v_dec > 0) {
            z = -1;
            VRDEC = VRDEC + LIST.substr(v_dec - 1, 1);
            v_dec = 0;
        }
        z++;
        v_dec = v_dec + (VR[x] * (Math.pow(2, z)));
    }
    if (v_dec > 0) {
        VRDEC = VRDEC + LIST.substr((v_dec - 1), 1);
    }
    return VRDEC;
}
function Bcomp(P1) {
    //Used to compress boolean sequences
    var dest = P1.length;
    var aux = 0;
    for (var x = 0; x < dest; x++) {
        aux = aux + (P1[x] * Math.pow(2, x));
    }
    return Ncomp(aux);
}
function Bdecomp(P1) {
    //Used to decompress boolean sequences
    if (P1 == 0) { // used to considere zero like a numeric natural
        return [0];
    }
    var V1 = Ndecomp(P1);
    var VC = Math.ceil(Math.log(V1) / Math.log(2));
    if (Math.ceil(Math.log(V1) / Math.log(2)) == Math.log(V1) / Math.log(2)) {
        VC = VC + 1;
    }
    var VR = new Uint8Array(VC);
    var aux = V1;
    for (var x = 0; x < VC; x++) {
        VR[x] = aux % 2;
        aux = Math.floor(aux / 2);
    }
    return VR;
}