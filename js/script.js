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

// ---

// Guid

// ---

// JSON Pretty

// ---

// XML Pretty

// ---

// SQL Formatter