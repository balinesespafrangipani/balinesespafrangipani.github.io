//══════════════════════════════════════════════════════════════════════════════
// [work]
// Nexocentric Studios .js
// [copyright]
// (c) 2014 Dodzi Y. Dzakuma (http://www.nexocentric.com)
// See LICENSE file for more information.
// [summary]
// This contains defines and common functions used by all Nexocentric Studios
// sites. When a new site is created, the majority of settings can be changed
// here.
//══════════════════════════════════════════════════════════════════════════════

//──────────────────────────────────────────────────────────────────────────────
// Environment Variables
//──────────────────────────────────────────────────────────────────────────────
if (typeof localNetworkDevice === 'undefined') {
	var localNetworkDevice = false;
}
if (localNetworkDevice) {
	// you want it to always be this, but because your ISP blocks port 80
	// you have to do things one way at home
	var ajaxHandlerPath = 'http://' + localNetworkDevice + '/libraries/nexocentric-studios/AjaxHandler.php';
} else {
	// and a different way when you're outside of the house
	var ajaxHandlerPath = 'http://studio.nexocentric.com:400/libraries/nexocentric-studios/AjaxHandler.php';
}
var ajaxRequest = null;
var ajaxTimeout = 300000;

//──────────────────────────────────────────────────────────────────────────────
// Function Declarations
//──────────────────────────────────────────────────────────────────────────────

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// Decodes a string used for digital transmission then
// decompresses it.
// [parameters]
// 1) a base64 encoded gzencoded string (see PHP manual)
// [return]
// 1) a decompressed string
//==========================================================
function decompress(compressedData)
{
	//----------------------------------
	// base64_decode the data string
	//----------------------------------
	var compressedData = atob(compressedData);

	//----------------------------------
	// prepare the data string for zlib
	// decompression
	//----------------------------------
	compressedData = compressedData.split('').map(function(e) {
	    return e.charCodeAt(0);
	});

	//----------------------------------
	// decompress the data
	//----------------------------------
	var decompressedData = new Zlib.Gunzip(compressedData);
	decompressedData = decompressedData.decompress();

	//----------------------------------
	// return a decompressed string
	//----------------------------------
	return String.fromCharCode.apply(null, decompressedData);
}
//══════════════════════════════════════════════════════════════════════════════
// End .js
//══════════════════════════════════════════════════════════════════════════════