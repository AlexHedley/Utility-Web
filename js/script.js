$(function() {
    console.log( "ready!" );
    hideAll();

    $("#section0").show();

    //$("#outputXml").resizable();
    //$('#outputXml').autoResize();
    //autosize($('#outputXml'));
    //hljs.initHighlightingOnLoad();
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    // $(".diff-wrapper").prettyTextDiff({
    //     diffContainer: ".diff1"
    // });

    // Initial diff2
    $(".diff-wrapper").prettyTextDiff({
        originalContent: $('#original').val(),
        changedContent: $('#changed').val(),
        diffContainer: ".diff1"
    });

    // Run diff on textarea change
    $(".diff-textarea").on('change keyup', function() {
        $(".diff-wrapper").prettyTextDiff({
            originalContent: $('#original').val(),
            changedContent: $('#changed').val(),
            diffContainer: ".diff1"
        });

    });
});

function hideAll() {
    $("#section0").hide();
    $("#section1").hide();
    $("#section2").hide();
    $("#section3").hide();
    $("#section4").hide();
    $("#section5").hide();
    $("#section6").hide();
    $("#section7").hide();
    $("#section8").hide();
    $("#section9").hide();
    $("#section10").hide();
    $("#section11").hide();
    $("#section12").hide();
    $("#section13").hide();

    // $('nav li a').forEach(element => {
    //     console.log('element:' + element);
    //     var el = $(this).parent().index();
    //     var id = "#section" + el;
    //     $(id).hide();
    // });
    // var lis = document.getElementsByTagName("nav").getElementsByTagName("li");
    // console.log(lis);
};

$('nav li a').click(function(e) {
    e.preventDefault();
    //alert($(this).text());
    $('li a').removeClass("active");
    $(this).addClass("active");

    var el = $(this).parent().index();
    console.log(el);

    hideAll();
    var id = "#section" + el;
    $(id).show();
});

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


$('#btnJsonPP').click(function() {
    var text = $('textarea#json').val();
    console.log(text);
    
    //$(text).blur();

    //var obj = {a:1, 'b':'foo', c:[false,'false',null, 'null', {d:{e:1.3e5,f:'1.3e5'}}]};
    //var str = JSON.stringify(obj, undefined, 4);
    var str = JSON.stringify(text, undefined, 4);

    output(str);
    output(syntaxHighlight(str));
});

// https://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
// http://jsfiddle.net/KJQ9K/554/

function output(inp) {
    //document.body.appendChild(document.createElement('pre')).innerHTML = inp;
    //$('#output').val(inp);
    document.getElementById('outputJson').innerHTML = inp;
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

// ---

// XML Pretty

$('#btnXmlPP').click(function() {
    var text = $('textarea#xml').val();
    console.log(text);

    var prettyXml = prettifyXml(text);
    document.getElementById('outputXml').value = prettyXml;
    $("#outputXml").height( $("#outputXml")[0].scrollHeight );

    //document.getElementById('outputXmlCode').innerHTML = prettyXml;
    //hljs.highlightBlock(document.getElementById('outputXmlCode'));
});

$('#btnCopyXML').click(function() {
    var text = $('textarea#outputXml');
    console.log(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

// https://stackoverflow.com/a/47317538/2895831
// https://jsfiddle.net/klesun/sgeryvyu/369/

var prettifyXml = function(sourceXml)
{
    var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
    var xsltDoc = new DOMParser().parseFromString([
      // describes how we want to modify the XML - indent everything
        '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
        '  <xsl:strip-space elements="*"/>',
        '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
        '    <xsl:value-of select="normalize-space(.)"/>',
        '  </xsl:template>',
        '  <xsl:template match="node()|@*">',
        '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
        '  </xsl:template>',
        '  <xsl:output indent="yes"/>',
        '</xsl:stylesheet>',
    ].join('\n'), 'application/xml');

    var xsltProcessor = new XSLTProcessor();    
    xsltProcessor.importStylesheet(xsltDoc);
    var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
    var resultXml = new XMLSerializer().serializeToString(resultDoc);
    return resultXml;
};

// ---

// SQL Formatter

$('#btnSqlPP').click(function() {
    var text = $('textarea#sql').val();
    console.log(text);

    var prettySql = vkbeautify.sql(text, 4);
    
    //document.getElementById('outputSql').value = prettySql;
    //$("#outputSql").height( $("#outputSql")[0].scrollHeight );
    
    document.getElementById('outputSqlCode').innerHTML = prettySql;
    hljs.highlightBlock(document.getElementById('outputSqlCode'));
});

$('#btnCopySql').click(function() {
    var text = $('textarea#outputSql');
    console.log(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

/// ---

// Hidden Character Finder

/// ---

// Binary

// https://stackoverflow.com/a/51137655/2895831
function binary(str) {
    return str.split(/\s/g).map((x) => x = String.fromCharCode(parseInt(x, 2))).join("");
}

$('#btnBinary').click(function() {
    var text = $('textarea#binary').val();
    console.log(text);

    var binaryStr = binary(text);
    
    document.getElementById('outputBinary').value = binaryStr;
    $("#outputBinary").height( $("#outputBinary")[0].scrollHeight );
});

$('#btnCopyBinary').click(function() {
    var text = $('textarea#outputBinary');
    console.log(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

/// ---

// MD5

/// ---

// Diff

/// ---

// Time Converter

/// ---

// kb - mb - gb Converter

$('#btnConverter').click(function() {
    var text = $('textarea#converter').val();
    console.log(text);

    var converterStr = humanFileSize(text, true);
    
    document.getElementById('outputConverter').value = converterStr;
    $("#outputConverter").height( $("#outputConverter")[0].scrollHeight );
});

$('#btnCopyConverter').click(function() {
    var text = $('textarea#outputConverter');
    console.log(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

// https://stackoverflow.com/a/14919494/2895831
function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}
