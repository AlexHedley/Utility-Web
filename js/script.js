$(function() {
    // console.debug( "ready!" );
    hideAll();

    //$("#section0").show();

    var currentTab = localStorage.getItem('CurrentTab');
    // console.debug('CurrentTab', currentTab);
    var id = "#section" + currentTab;
    $(id).show();

    updateColourLabel();
    
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

    // Testing
    $('#binary').val("01101111 01101110 01100101 00100000 01101100 01101001 01101110 01100101");
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
    $("#section14").hide();
    $("#section15").hide();
    $("#section16").hide();
    $("#section17").hide();
    $("#section18").hide();
    $("#section19").hide();

    // $('nav li a').forEach(element => {
    //     console.debug('element:' + element);
    //     var el = $(this).parent().index();
    //     var id = "#section" + el;
    //     $(id).hide();
    // });
    // var lis = document.getElementsByTagName("nav").getElementsByTagName("li");
    // console.debug(lis);
};

$('nav li a').click(function(e) {
    e.preventDefault();
    //alert($(this).text());
    $('li a').removeClass("active");
    $(this).addClass("active");

    var el = $(this).parent().index();
    console.debug(el);

    hideAll();
    var id = "#section" + el;
    $(id).show();

    // get the text
    var text = $(this).text().trim();
    // set the item in localStorage
    localStorage.setItem('CurrentTab', el);
});

// ---

// HTML Encode/Decode

$('#btnEscape').click(function() {
    var text = $('textarea#escape').val();
    var escapeText = escape(text);
    console.debug(escapeText);
    $('textarea#unescape').val(escapeText);
});

$('#btnUnescape').click(function() {
    var text = $('textarea#unescape').val();
    var unescapeText = unescape(text);
    console.debug(unescapeText);
    $('textarea#escape').val(unescapeText);
});

// ---

// URL Encode / Decode

$('#btnEncode').click(function() {
    var text = $('input#urlEncode').val();
    console.debug(text);
    $('input#urlDecode').val(encodeURIComponent(text).replace(/'/g,"%27").replace(/"/g,"%22"));
});

$('#btnDecode').click(function() {
    var text = $('input#urlDecode').val();
    console.debug(text);
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

// URL

//element.txtName.value.lenght;
$("#url").change(function() {
    alert($(this).val().length);
    console.debug($(this).val().length);
    $("#urlCount").text($(this).val().length);
    $("#urlCount").html($(this).val().length);
})

$('#btnUrlSplit').click(function() {
    var urlStr = $("#url").val();
    console.debug(urlStr);

    $("#urlCount").text(urlStr.length);

    var url = new URL(urlStr);

    // https://developer.mozilla.org/en-US/docs/Web/API/URL#Properties
    var hostname = url.hostname;
    console.debug(hostname); // "www.example.com"
    $('#hostname').val(hostname);
    
    var pathname = url.pathname
    console.debug(pathname); // "/cats"
    $('#pathname').val(pathname);

    console.debug(url.href); // "http://www.example.com/cats#tabby"
    console.debug(url.search);
    //console.debug(url.searchParams.get("id")); // "123"

    // https://davidwalsh.name/query-string-javascript
    var urlParams = new URLSearchParams(url.search);

    var keys = urlParams.keys();
    for (key of keys) { 
        console.debug(key); 
    }

    $("#urlParams > tbody").empty();

    var entries = urlParams.entries();
    for (pair of entries) { 
        console.debug(pair[0], pair[1]); 

        var markup = "<tr><td>" + pair[0] + "</td><td>" + pair[1] + "</td></tr>";
        console.debug(markup);
        $("#urlParams tbody").append(markup);
    }

});

// ---

// HEX to RGB

$('#btnConvert').click(function() {
    var colour = $('input#colour').val();
    console.debug(colour);

    var red = hexToRgb(colour).r;
    console.debug(red);
    $('input#rgbRed').val(red);
    var green = hexToRgb(colour).g;
    console.debug(green);
    $('input#rgbGreen').val(green);
    var blue = hexToRgb(colour).b;
    console.debug(blue);
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

//$("#colour").change(function() {
//    $("#colourId").text($(this).val());
//})

function updateColourLabel() {
    var colour = $('#colour').val();
    $("#colourId").text(colour);
}

// ---

// SQL Builder (IN Clause)

$('#btnClearSQLBuilder').click(function() {
    $('textarea#sqlBuilderInput').val('');
});

$('#btnParse').click(function() {
    var text = $('textarea#sqlBuilderInput').val();
    var split = text.trim().split("\n");
    split = cleanArray(split);

    if ($("#chkRemoveDuplicates").is(':checked')) {
        split = [...new Set(split)];
    }

    var wrapper = $('#wrapper').find(":selected").text();

    var output = '';
    output = output + wrapper + split.join(wrapper + "," + wrapper) + wrapper
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
    console.debug(text);
    text.select();
    document.execCommand("copy");
});

// ---

// Guid

$('#btnGuidZeroCopy').click(function() {
    var text = $('input#guidZero');
    console.debug(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

$('#btnGuidNewCreate').click(function() {
    //var text = $('input#guidNew').val();
    //console.debug(text);
    // then to call it, plus stitch in '4' in the third group
    var guid = createGuid();
    if ($("#chkRemoveDashes").is(':checked')) {
        guid = guid.replace(/-/g, "");
    }
    $('input#guidNew').val(guid);
    $('input#guidNewHidden').val(guid);
});

$('#btnGuidNewCopy').click(function() {
    var text = $('input#guidNew');
    console.debug(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

$('#btnGuidNewCreateMultiple').click(function() {
    var guidCount = $('input#guidCount').val();
    var guids = '';
    for (index = 0; index < guidCount; ++index) {
        guid = createGuid();
        if ($("#chkRemoveDashesMultiple").is(':checked')) {
            guid = guid.replace(/-/g, "");
        }
        //console.debug(guid);
        //$('#guids').append(guid+'\n');
        guids += guid+'\n'
    }
    $('#guids').val(guids);
    $("#guids").height( $("#guids")[0].scrollHeight );
});

$('#btnGuidMultipleCopy').click(function() {
    var text = $('textarea#guids');
    console.debug(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

$('#btnGuidMultipleClear').click(function() {
    $('textarea#guids').val('');
});


// http://guid.us/GUID/JavaScript
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

function createGuid() {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

$("#chkRemoveDashesZero").on('click', function() {
    if ($("#chkRemoveDashesZero").is(':checked')) {
        var guid = $("#guidZero").val();
        var guidStripped = guid.replace(/-/g, "");
        $("#guidZero").val(guidStripped);
    } else {
        $("#guidZero").val('00000000-0000-0000-0000-000000000000');
    }
});

$("#chkRemoveDashes").on('click', function() {
    if ($("#chkRemoveDashes").is(':checked')) {
        var guid = $("#guidNew").val();
        var guidStripped = guid.replace(/-/g, "");
        $("#guidNew").val(guidStripped);
    } else {
        var guid = $("#guidNewHidden").val();
        $("#guidNew").val(guid);
    }
});

// ---

// JSON Pretty

$('#btnJsonPP').click(function() {
    var text = $('textarea#json').val();
    console.debug(text);
    
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
    console.debug(text);

    var prettyXml = prettifyXml(text);
    document.getElementById('outputXml').value = prettyXml;
    $("#outputXml").height( $("#outputXml")[0].scrollHeight );

    //document.getElementById('outputXmlCode').innerHTML = prettyXml;
    //hljs.highlightBlock(document.getElementById('outputXmlCode'));
});

$('#btnCopyXML').click(function() {
    var text = $('textarea#outputXml');
    console.debug(text);
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
    console.debug(text);

    var prettySql = vkbeautify.sql(text, 4);
    
    //document.getElementById('outputSql').value = prettySql;
    //$("#outputSql").height( $("#outputSql")[0].scrollHeight );
    
    document.getElementById('outputSqlCode').innerHTML = prettySql;
    hljs.highlightBlock(document.getElementById('outputSqlCode'));
});

$('#btnCopySql').click(function() {
    var text = $('textarea#outputSql');
    console.debug(text);
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
    //console.debug(text);

    var binaryStr = binary(text);
    //console.debug(binaryStr);
    
    document.getElementById('outputBinary').value = binaryStr;
    $("#outputBinary").height( $("#outputBinary")[0].scrollHeight );
});

$('#btnCopyBinary').click(function() {
    var text = $('textarea#outputBinary');
    //console.debug(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

$('#btnBinaryClear').click(function() {
    $('textarea#binary').val('');
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
    console.debug(text);

    var converterStr = humanFileSize(text, true);
    
    document.getElementById('outputConverter').value = converterStr;
    $("#outputConverter").height( $("#outputConverter")[0].scrollHeight );
});

$('#btnCopyConverter').click(function() {
    var text = $('textarea#outputConverter');
    console.debug(text);
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

/// ---

// Luhn Checker

$('#btnLuhnCheck').click(function() {
    var text = $('input#luhnCheck').val();
    console.debug(text);

    var valid = valid_credit_card(text);
    console.debug(valid);

    $("#luhnCheckLabel").text(valid);
    $("#luhnCheckLabel").removeClass();
    $("#luhnCheckLabel").addClass('label-control');
    $("#luhnCheckLabel").addClass(valid.toString());
});

$('#btnLuhnCheckClear').click(function() {
    $('input#luhnCheck').val('');
});

$('#btnLuhnChecks').click(function() {
    var validItems = [];
    // $("textarea#luhnChecks").each(function(){
    //     console.debug('i', this.value);
    //     //var valid = valid_credit_card(this.value);
    //     //console.debug(valid);
    //     //if (valid)
    //     //    validItems.push(this.value);
    // });

    var lines = $('textarea#luhnChecks').val().split('\n');
    for(var i = 0;i < lines.length;i++){
        var valid = valid_credit_card(lines[i]);
        if (valid && lines[i] !== "")
        {
            validItems.push(lines[i]);
        }
        
    }
    $('textarea#luhnChecks').val(validItems.join("\n"));
    $("#luhnChecks").height( $("#luhnChecks")[0].scrollHeight );
});

$('#btnLuhnChecksClear').click(function() {
    $('textarea#luhnChecks').val('');
});

// https://gist.github.com/DiegoSalazar/4075533#file-validate_credit_card-js
// https://gist.githubusercontent.com/DiegoSalazar/4075533/raw/71fbd7a50025b067a61aca0ccc48bde15c399d52/validate_credit_card.js

// takes the form field value and returns true on valid number
function valid_credit_card(value) {
    // accept only digits, dashes or spaces
      if (/[^0-9-\s]+/.test(value)) return false;
  
      // The Luhn Algorithm. It's so pretty.
      var nCheck = 0, nDigit = 0, bEven = false;
      value = value.replace(/\D/g, "");
  
      for (var n = value.length - 1; n >= 0; n--) {
          var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);
  
          if (bEven) {
              if ((nDigit *= 2) > 9) nDigit -= 9;
          }
  
          nCheck += nDigit;
          bEven = !bEven;
      }
  
      return (nCheck % 10) == 0;
  }

// String Convert

$('#btnStringConverter').click(function() {
    var text = $('textarea#stringconverter').val();
    console.debug(text);

    var converterStr = text;

    var radVal = document.optionsForm.rads.value;
    switch(radVal) {
        case "Sentence case":
            converterStr = sentenceCase(text);
          break;
        case "lower case":
          converterStr = text.toLowerCase();
          break;
        case "UPPER CASE":
            converterStr = text.toUpperCase()
          break;
        case "Capitalized Case":
          // code block
          break;
        case "aLtErNaTiNg cAsE":
            converterStr = caseAlter(text);
          break;
        case "Title Case":
            converterStr = titleCase(text);
          break;
        case "InVeRsE CaSe":
          // code block
          converterStr = caseAlter(text);
          break;
        case "Remove Whitespace":
            converterStr = text.trim().replace(/ /g,'');
            break;
        default:
          // code block
      }
    
    document.getElementById('outputStringConverter').value = converterStr;
    $("#outputStringConverter").height( $("#outputStringConverter")[0].scrollHeight );
});

$('#btnClearStringConverter').click(function() {
    $('textarea#stringconverter').val('');
});

$('#btnCopyStringConverter').click(function() {
    var text = $('textarea#outputStringConverter');
    console.debug(text);
    text.select();
    document.execCommand("copy");
    //$(text).blur();
});

// https://stackoverflow.com/a/4171093/2895831
// /**
//  * @param String str The text to be converted to titleCase.
//  * @param Array glue the words to leave in lowercase. 
//  */
// var titleCase = function(str, glue){
//     glue = (glue) ? glue : ['of', 'for', 'and'];
//     return str.replace(/(\w)(\w*)/g, function(_, i, r){
//         var j = i.toUpperCase() + (r != null ? r : "");
//         return (glue.indexOf(j.toLowerCase())<0)?j:j.toLowerCase();
//     });
// };

//https://love2dev.com/blog/javascript-touppercase-tolowercase/
function titleCase(str) {
    return str.replace(/\w\S/g, function(t) { return t.toUpperCase() });
}

function sentenceCase(str) {
    return str.replace(/[a-z]/i, function (letter) {
    return letter.toUpperCase();
  }).trim();
}

function caseAlter(str){
    var output = "";
    for(var i = 0; i < str.length; i++){
        var ch = str[i];

        if(ch === ch.toUpperCase()) {
            output += ch.toLowerCase();
        } else {
            output += ch.toUpperCase();
        }           
    }
    return output;
}

/// ---

// Notepad

// Ascii

$('#btnAscii').click(function() {
    var text = $('input#ascii').val();
    console.debug(text);
    
    $("#asciiItems > tbody").empty();
    var charArray = text.split('');
    
    var markup = "";
    for (i in charArray) {
        var dec = "N/A";
        var hex = toHex(charArray[i]);
        var oct = "N/A";
        var markup = "<tr><td>" + charArray[i] + "</td><td>" + dec + "</td><td>" + hex + "</td><td>" + oct + "</td></tr>";

        $("#asciiItems tbody").append(markup);
    }
});

// function toBin(str) {
//     return str.split("").reduce(function (a, b) { return a + b.charCodeAt(0).toString(2)}, "");
// }

function toHex(str) {
    return str.split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"");

    // hexStr='7F';
    // num = parseInt(hexStr,16);   // num now holds 127
}

// function toOct(str) {
//     var num = parseInt(str);
//     return num.toString(8);

//     // octalStr='377';
//     // num = parseInt(octalStr,8);  // num now holds 255
// }

// ---

// Picker Wheel


var padding = {top:20, right:40, bottom:0, left:0},
    w = 500 - padding.left - padding.right,
    h = 500 - padding.top  - padding.bottom,
    r = Math.min(w, h)/2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale.category20();//category20c()
    //randomNumbers = getRandomNumbers();

function getData() {
    // var choices = [];
    // var table = document.getElementById("choices");
    // for (var i = 0, row; row = table.rows[i]; i++) {
    //     for (var j = 0, col; col = row.cells[j]; j++) {
    //         var name = col.innerText
    //         choices.push({"label":name, "value":1,  "name":name})
    //     }
    // }
    // // choices.shift(); // Remove the header
    // // choices.pop(); // Remove the footer
    // return choices.slice(1, -1);

    // Filter by value = 1
    var items = JSON.parse(window.localStorage.getItem('names'));
    // TODO: Check for empty
    var filteredItems = items.filter(i => i.value === true);

    return filteredItems;
}

// Create Spinner
function createSpinner() {

    // Clear existing spinner - if one exists.
    document.getElementById('chart').innerHTML = "";

    var data = getData();

    var svg = d3.select('#chart')
        .append("svg")
        // .data([data])
        .data([getData()])
        .attr("width",  w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom);

    var container = svg.append("g")
        .attr("class", "chartholder")
        .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

    var vis = container
        .append("g");
        
    var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

    // declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r);

    // select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "slice");
        

    arcs.append("path")
        .attr("fill", function(d, i){ return color(i); })
        .attr("d", function (d) { return arc(d); });

    // add the text
    arcs.append("text").attr("transform", function(d){
            d.innerRadius = 0;
            d.outerRadius = r;
            d.angle = (d.startAngle + d.endAngle)/2;
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
        })
        .attr("text-anchor", "end")
        .text( function(d, i) {
            return data[i].label;
        });

    container.on("click", spin);

    function spin(d){
        container.on("click", null);

        //all slices have been seen, all done
        console.debug("OldPick: " + oldpick.length, "Data length: " + data.length);
        if(oldpick.length == data.length){
            console.debug("done");
            container.on("click", null);
            return;
        }

        var  ps          = 360/data.length,
                pieslice = Math.round(1440/data.length),
                rng      = Math.floor((Math.random() * 1440) + 360);
            
        rotation = (Math.round(rng / ps) * ps);
        
        picked = Math.round(data.length - (rotation % 360)/ps);
        picked = picked >= data.length ? (picked % data.length) : picked;


        if(oldpick.indexOf(picked) !== -1){
            d3.select(this).call(spin);
            return;
        } else {
            oldpick.push(picked);
        }

        rotation += 90 - Math.round(ps/2);

        vis.transition()
            .duration(3000)
            .attrTween("transform", rotTween)
            .each("end", function(){

                //mark name as seen
                d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                    .attr("fill", "#111")
                    .attr("opacity", "0.8");

                //populate name
                d3.select("#name h1")
                    .text(data[picked].name);

                oldrotation = rotation;
            
                container.on("click", spin);
            });
    }

    //make arrow
    svg.append("g")
        .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
        .append("path")
        .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
        .style({"fill":"black"});

    //draw spin circle
    container.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 60)
        .style({"fill":"white","cursor":"pointer"});

    //spin text
    container.append("text")
        .attr("x", 0)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("SPIN")
        .style({"font-weight":"bold", "font-size":"30px"});
}

function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function(t) {
    return "rotate(" + i(t) + ")";
    };
}

function getRandomNumbers(){
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);

    if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
        window.crypto.getRandomValues(array);
    } else {
        //no support for crypto, get crappy random numbers
        for(var i=0; i < 1000; i++){
            array[i] = Math.floor(Math.random() * 100000) + 1;
        }
    }

    return array;
}

// Reset Wheel
function resetWheel() {
    createSpinner();
}

// Add User
function addUser() {
    var name = document.getElementById("NewUser").value;

    var item = {
        "label": name,
        "value": true,
        "name": name
    }

    addUserWithName(item, true);
    document.getElementById("NewUser").value = "";
}

// Add User With Name
function addUserWithName(item, add = false) {
    console.log(item.name);
    var tbodyRef = document.getElementById('choices').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();

    var nameCell = newRow.insertCell();
    var nameText = document.createTextNode(item.name);
    nameCell.appendChild(nameText);

    var checked = item.value ? '✔' : '';

    var checkCell = newRow.insertCell();
    var checkText = document.createTextNode(checked);
    checkCell.appendChild(checkText);

    checkCell.addEventListener("click", function() {
        var on = true;
        if (checkCell.innerHTML === "") {
            checkCell.innerHTML = '✔';
        } else {
            checkCell.innerHTML = '';
            on = false;
        }
        updateLocalStorageRow(checkCell.previousElementSibling.innerHTML, on);
        populateTableFromLocalStorage();
    });

    var crossCell = newRow.insertCell();
    var crossText = document.createTextNode('✘');
    crossCell.appendChild(crossText);

    crossCell.addEventListener("click", function() {
        var row = crossCell.parentNode.rowIndex-1;
        crossCell.parentNode.parentNode.deleteRow(row);
        deleteLocalStorageRow(row);
        populateTableFromLocalStorage();
    });

    if (add) {
        addLocalStorageItem(item);
        populateTableFromLocalStorage();
    }
}

function populateTableFromLocalStorage() {
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()});
    document.getElementById('choices').querySelectorAll("table tbody tr").forEach(function(e){e.remove()});
    var items = JSON.parse(window.localStorage.getItem('names'));

    if (!items) return;

    for (var i = 0; i < items.length; i++) {
        addUserWithName(items[i]);
    }

    createSpinner();
}

function addLocalStorageItem(item) {
    var names = JSON.parse(window.localStorage.getItem('names'));
    if (!names) names = [];
    names.push(item);
    localStorage.removeItem("names");
    localStorage.setItem("names", JSON.stringify(names));
}

function deleteLocalStorageRow(row) {
    var names = JSON.parse(window.localStorage.getItem('names'));
    localStorage.removeItem("names");
    names.splice(row, 1);
    localStorage.setItem("names", JSON.stringify(names));
}

function updateLocalStorageRow(name, on = true) {
    var names = JSON.parse(window.localStorage.getItem('names'));
    
    const index = names.findIndex(item => item.name === name);
    names.splice(index, 1);

    var item = {
        "label": name,
        "value": on,
        "name": name
    }
    names.push(item);
    localStorage.removeItem("names");
    localStorage.setItem("names", JSON.stringify(names));
}

document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage
        populateTableFromLocalStorage();
    } else {
        // No web storage Support.
        alert('no local storage support');
    }
    
});
