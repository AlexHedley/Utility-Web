// HTML Encode/Decode
$('#btnEscape').click(function() {
    var text = $('textarea#escape').val();
    //send to server and process response
    var escapeText = escape(text);
    console.log(escapeText);
});

$('#btnUnescape').click(function() {
    var text = $('textarea#unescape').val();
    //send to server and process response

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