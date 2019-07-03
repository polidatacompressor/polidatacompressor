//--------------------------------------------------
//    THIS IS JUST TO HELP YOU START YOUR APP
//-------------------------------------------------//
function just_number(p1) {
    //just_number("+55 (11) 1111-1111")
    //"551111111111"
    var ret = "";
    for (var x = 0; x < p1.length; x++) {
        if (p1[x] == "0" ||
            p1[x] == "1" ||
            p1[x] == "2" ||
            p1[x] == "3" ||
            p1[x] == "4" ||
            p1[x] == "5" ||
            p1[x] == "6" ||
            p1[x] == "7" ||
            p1[x] == "8" ||
            p1[x] == "9") {
            ret = ret + p1[x];
        }
    }
    return ret;
}
function masking_numbers_left(p1, p2) {
    //masking_numbers_left("551111111111","+00 (00) 0000-0000")
    // +55 (11) 1111-1111
    var ret = "";
    var pos_p1 = 0;
    if (p1.length > 0 && p1 != undefined) {
        for (var x = 0; x < p2.length; x++) {
            if (p2[x] == "0") {
                if (pos_p1 == p1.length) {
                    x = p2.length; // exit for
                }
                else {
                    ret = ret + p1[pos_p1].toString();
                    pos_p1++;
                }
            }
            else {
                ret = ret + p2[x];
            }
        }
    }
    return ret;
}
function masking_numbers_right(p1, p2) {
    //masking_numbers_right("2","0.009,99")
    // 0,02
    var ret = "";
    var pos_p1 = p1.length - 1;
    for (var x = p2.length - 1; x > 0; x--) {
        if (pos_p1 >= 0) {
            if (p2[x] == "0" || p2[x] == "9") {
                ret = p1[pos_p1] + ret;
                pos_p1--;
            }
            else {
                ret = p2[x] + ret;
            }
        }
        else {
            if (p2[x] == "9") {
                ret = "0" + ret;
            }
            else if (p2[x] != "0") {
                ret = p2[x] + ret;
            }
            else {
                x = -1;
            }
        }
    }
    return ret;
}
function pad(p1, p2) {
    var resp = "";
    for (var x = 0; x < p2; x++) {
        if (p1.length - 1 >= x) {
            resp = resp + p1[x];
        }
        else {
            resp = "0" + resp;
        }
    }
    return resp;
}
function date_to_number1(p1) {
    //format date considering month, day and year with four digits.
    var myDate = new Date();
    myDate = p1;
    var ret = "";
    ret = (myDate.getMonth() + 1).toString() + pad(myDate.getDate().toString(), 2) + myDate.getFullYear().toString();
    return ret;
}
function month_to_number1(p1) {
    //format date considering month and year with four digits.
    var myDate = new Date();
    myDate = p1;
    var ret = "";
    ret = (myDate.getMonth() + 1).toString() + myDate.getFullYear().toString();
    return ret;
}
function datetime_to_number1(p1) {
    //format date time considering unixtimestamp pattern.
    //caution: use only when there are fields with a year greater than 1970
    var myDate = new Date();
    myDate = p1;
    var ret = "";
    if (myDate.getTime() / 1000 > 0) {
        ret = Math.round(myDate.getTime() / 1000);
    }
    return ret.toString();
}
function datetime_to_number2(p1) {
    //format date time considering dates lower than January 1970.
    var myDate = new Date();
    myDate = p1;
    var ret = "";
    ret = (myDate.getMonth() + 1).toString() + pad(myDate.getDate().toString(), 2) + pad(myDate.getFullYear().toString(), 4) + pad(myDate.getHours().toString(), 2) + pad(myDate.getMinutes().toString(), 2);
    return ret;
}
function time_to_number1(p1) {
    //format time considering hour and minutes with two digits.
    var myDate = new Date();
    myDate = p1;
    var ret = "";
    ret = myDate.getHours().toString() + pad(myDate.getMinutes().toString(), 2);
    return ret;
}
function time_to_number2(p1) {
    //format time with seconds.
    var myDate = new Date();
    myDate = p1;
    var calc = 0;
    calc = myDate.getHours() * 60 * 60;
    calc = calc + (myDate.getMinutes() * 60);
    calc = calc + myDate.getSeconds();
    var ret = calc.toString();
    return ret;
}
function just_allowed(p1, p2) {
    //just_allowed
    //just_allowed("polidatacompressor @ gmail.com#","abcdefghijklmnopqrstuvwxyz012345679@.-_")
    var ret = "";
    for (var x = 0; x < p1.length; x++) {
        for (var y = 0; y < p2.length; y++) {
            if (p1[x] == p2[y]) {
                ret = ret + p1[x].toString();
            }
        }
    }
    return ret;
}
function big_numbers(p1_in) {
    //you must inform on p1_in big_number and others parameters return sequences you must to save in different fields bytes(8)
    //var p1_in = '123456789012345678901234567890123456789000';
    // var p_out = big_numbers(p1_in);
    // console.log(p_out[0] + "-" + p_out[1] + "-" p_out[2]);
    var p_out = new Uint8Array(8);
    var p1_out = { one: p_out, two: p_out, trhee: p_out };
    var v_lim = 1;
    var v_tmp = '';
    var v_out_aval = 1;
    for (var x = 0; x < p1_in.length; x++) {
        if (v_lim == 16) {
            if (v_out_aval == 1) {
                p1_out.one = Ncomp(v_tmp);
                console.log("p1_out=" + p1_out.one);
            }
            else if (v_out_aval == 2) {
                p1_out.two = Ncomp(v_tmp);
                console.log("p2_out=" + p1_out.two);
            }
            else if (v_out_aval == 3) {
                p1_out.trhee = Ncomp(v_tmp);
                console.log("p3_out=" + p1_out.trhee);
            }
            else {
                alert("Sorry. You just create three bytes to stock this big number");
                return false;
            }
            v_out_aval++;
            v_tmp = '';
            v_lim = 1;
        }
        v_tmp = v_tmp + p1_in.substr(x, 1);
        v_lim++;
    }
    if (v_tmp.length > 0) {
        if (v_out_aval == 1) {
            p1_out.one = Ncomp(v_tmp);
            console.log("p1_out=" + p1_out.one);
        }
        else if (v_out_aval == 2) {
            p1_out.two = Ncomp(v_tmp);
            console.log("p2_out=" + p1_out.two);
        }
        else if (v_out_aval == 3) {
            p1_out.trhee = Ncomp(v_tmp);
            console.log("p3_out=" + p1_out.trhee);
        }
        else {
            alert("Sorry. You just create three bytes to stock this big number");
            return false;
        }
    }
    return p1_out;
}
function IsUint8ArrayClear(p1) {
    if (p1 == undefined) {
        return true;
    }
    for (var x = 0; x < p1.length; x++) {
        if (p1[x] != 0) {
            return false;
        }
    }
    return true;
}
function bytearray_to_string(p_bytearray) {
    var resp = '';
    for (var x = 0; x < p_bytearray.length; x++) {
        resp = resp + String.fromCharCode(p_bytearray[x]);
    }
    return resp;
}

function string_to_bytearray(p_string) {
    var resp = new Uint8Array(p_string.length);
    for (var x = 0; x < p_string.length; x++) {
        resp[x] = p_string.charCodeAt(x);
    }
    return resp;
}

function remove_chrzero(p_str1) {
    var resp = '';
    for (var x = 0; x < p_str1.length; x++) {
        if (p_str1.substr(x, 1).charCodeAt(0) != 0) {
            resp = resp + p_str1.substr(x, 1);
        }
    }
    return resp;
}