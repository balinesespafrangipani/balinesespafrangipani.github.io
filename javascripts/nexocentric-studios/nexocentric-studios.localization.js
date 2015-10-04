//══════════════════════════════════════════════════════════════════════════════
// [work]
// Nexocentric Studios Site (defines)
// [copyright]
// (c) 2014 Dodzi Y. Dzakuma (http://www.nexocentric.com)
// See LICENSE file for more information.
// [summary]
// This is the bootstrap file that should be included by every PHP file
// in this site. Without this file, most of the files will not run.
//══════════════════════════════════════════════════════════════════════════════

//you need to comment this and then isolate it
// var viceroy = {
// 	"en" : {
// 		"viceroy-title" : "This is a webpage",
// 		"viceroy-description" : "things",
// 		"viceroy-a" : "goodnight",
// 		"viceroy-b" : "door"
// 	},
// 	"jp" : {
// 		"viceroy-title" : "これはウェブページです",
// 		"viceroy-description" : "物",
// 		"viceroy-a" : "お休み",
// 		"viceroy-b" : "扉"
// 	},
// 	"zh" : {
// 		"viceroy-title" : "这是网页",
// 		"viceroy-description" : "事儿",
// 		"viceroy-a" : "晚安",
// 		"viceroy-b" : "门"
// 	}
// };
// var output = "";
// $(document).ready(function () {
// 	$('[class^="viceroy-"]').each(function () {
// 		var viceroyName = $(this).attr('class');
// 		var viceroyText = viceroy["zh"][viceroyName];
// 		var compressedData = atob(viceroy2["zh"]);
// 		compressedData = compressedData.split('').map(function(e) {
// 		    return e.charCodeAt(0);
// 		});
// 		var decompressed = new Zlib.Gunzip(compressedData);
// 		output = decompressed.decompress();
// 		if ($(this).is('meta[name="description"]')) {
// 			$(this).attr('content', viceroyText);
// 		} else {
// 			$(this).text(viceroyText);
// 		}
// 		console.log(
// 			$.parseJSON(String.fromCharCode.apply(null,output))
// 		);

// 	});
// 	console.log("translation successful");
// });

//──────────────────────────────────────────────────────────────────────────────
// Function Declarations
//──────────────────────────────────────────────────────────────────────────────

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// [parameters]
// [return]
//==========================================================
function decompressLocalization(languageCode)
{
	var compressedData = atob(viceroy2[languageCode]);
	compressedData = compressedData.split('').map(function(e) {
	    return e.charCodeAt(0);
	});
	var decompressed = new Zlib.Gunzip(compressedData);
	output = decompressed.decompress();
	var translation = $.parseJSON(String.fromCharCode.apply(null,output))
	console.log(
		translation
	);
	console.log("translation successful");
	return translation;
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// [parameters]
// [return]
//==========================================================
function localizePage(languageCode)
{
	var localization = decompressLocalization(languageCode);
	renderLocalizationTags(localization);
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// [parameters]
// [return]
//==========================================================
function renderLocalizationTags(localization)
{
	$('[class^="viceroy-"]').each(function () {
		var localizationTag = $(this).attr('class');
		var localizationText = localization[localizationTag];
		if ($(this).is('meta[name="description"]')) {
			$(this).attr('content', localizationText);
		} else {
			$(this).text(localizationText);
		}
	});
}

//──────────────────────────────────────────────────────────────────────────────
// Script Settings
//──────────────────────────────────────────────────────────────────────────────
$(document).ready(function () {
	var detectedLanguage = $("html").attr("lang");
	if (typeof detectedLanguage === 'undefined') {
		detectedLanguage = 'en';
	}
	localizePage(detectedLanguage);
	var $languageSelector = $('input:radio[name=language]');
	if($languageSelector.is(':checked') === false) {
		$languageSelector.filter('[value=' + detectedLanguage + ']').prop('checked', true);
	}
	console.log('language initialized');
});

$("[name='language']").on("click", function() {
	var languageCode = $(this).val();
	localizePage(languageCode);
	console.log("language button clicked");
});