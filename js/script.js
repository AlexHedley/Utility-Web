// HTML Encode/Decode
$('#btnEscape').click(function() {
    var text = $('textarea#escape').val();
    var escapeText = escape(text);
    console.log(escapeText);
    $('textarea#unescape').val(escapeText);
});

$('#btnUnescape').click(function() {
    var text = $('textarea#unescape').val();
    var unescapeText = unescape(text);
    console.log(unescapeText);
    $('textarea#escape').val(unescapeText);
});

// ---

// URL Encode / Decode

$('#btnEncode').click(function() {
    var text = $('input#urlEncode').val();
    console.log(text);
    $('input#urlDecode').val(encodeURIComponent(text).replace(/'/g,"%27").replace(/"/g,"%22"));
});

$('#btnDecode').click(function() {
    var text = $('input#urlDecode').val();
    console.log(text);
    $('input#urlEncode').val(decodeURIComponent(text.replace(/\+/g,  " ")));
});

// https://meyerweb.com/eric/tools/dencoder/

function encode(text) {
	var obj = document.getElementById('dencoder');
	var unencoded = obj.value;
	obj.value = encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");	
}
function decode() {
	var obj = document.getElementById('dencoder');
	var encoded = obj.value;
	obj.value = decodeURIComponent(encoded.replace(/\+/g,  " "));
}

// ---

// HEX to RGB

$('#btnConvert').click(function() {
    var colour = $('input#colour').val();
    console.log(colour);

    var red = hexToRgb(colour).r;
    console.log(red);
    $('input#rgbRed').val(red);
    var green = hexToRgb(colour).g;
    console.log(green);
    $('input#rgbGreen').val(green);
    var blue = hexToRgb(colour).b;
    console.log(blue);
    $('input#rgbBlue').val(blue);
    
});

// https://stackoverflow.com/a/5624139/2895831
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// ---

// SQL Builder (IN Clause)

$('#btnClearSQLBuilder').click(function() {
    $('textarea#sqlBuilderInput').val('');
});

$('#btnParse').click(function() {
    var text = $('textarea#sqlBuilderInput').val();
    var split = text.trim().split("\n");
    console.log(split);
    split = cleanArray(split);

    var wrapper = $('#wrapper').find(":selected").text();
    console.log(wrapper);

    var output = '';
    output = output + wrapper + split.join(wrapper + "," + wrapper) + wrapper
    console.log(output);
    output = 'IN (' + output + ')';

    $('textarea#sqlBuilderOutput').val(output);
});

function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }

$('#btnCopySQLBuilder').click(function() {
    var text = $('textarea#sqlBuilderOutput');
    console.log(text);
    text.select();
    document.execCommand("copy");
});

// ---

// Guid

$('#btnGuidZeroCopy').click(function() {
    var text = $('input#guidZero');
    console.log(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

$('#btnGuidNewCreate').click(function() {
    //var text = $('input#guidNew').val();
    //console.log(text);
    // then to call it, plus stitch in '4' in the third group
    guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    $('input#guidNew').val(guid);
});

$('#btnGuidNewCopy').click(function() {
    var text = $('input#guidNew');
    console.log(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});



// http://guid.us/GUID/JavaScript
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

// ---

// JSON Pretty

// ---

// XML Pretty

// ---

// SQL Formatter