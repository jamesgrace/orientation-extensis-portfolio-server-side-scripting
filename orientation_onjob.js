// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
//	Copyright (c) 2021, James Grace
//	All rights reserved.
//
//	This source code is licensed under the BSD-style license found in the
//	LICENSE file in the root directory of this source tree.
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


var VERSION = "14july2021";

var DISPLAY_NAME = "Orientation";

var FIELD = "Orientation";   //   [ ! ] - Don't forget to create this custom field !	//

var WIDTH_GREATER_HEIGHT = "Landscape";   //

var HEIGHT_GREATER_WIDTH = "Portait";   //

var WIDTH_EQUAL_HEIGHT = "Square";   //

var SKIP_EXISTING = "Yes";		//		"Yes" or "No"		//


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



function getProperties() {

	return {

		triggerPoints: [ 'onJobEachAsset', 'onJobFinalize' ],

		displayName: DISPLAY_NAME, // NWC "Run Script" Pull-down seems to be currently provisioned for 19 Characters or less in length...

	};

} // getProperties



function onJobEachAsset(eachResult, catalogId, assetId) {

const catalog = eachResult.catalogId;

const itemId = eachResult.itemState.assetId;

const asset = portfolio.getAssetById(catalog, itemId);

	portfolio.log('[ ' + DISPLAY_NAME + ' version ' + VERSION + ' ] - //////////    START Job    //////////');

	if ( SKIP_EXISTING.toLowerCase() == "yes" ) {

		checkExisting(catalog, asset, itemId);

	} else {

		getDimensions(catalog, asset, itemId);

	} // else

} // onCataloged



function checkExisting (catalog, asset, itemId) {

	if ( portfolio.getFieldDefinitions(catalog, [FIELD], false).length === 1 ) {

		portfolio.log('[ checkExisting ] = [ "' + FIELD + '" ] exists !');
	
		if ( [WIDTH_GREATER_HEIGHT,HEIGHT_GREATER_WIDTH,WIDTH_EQUAL_HEIGHT].indexOf(asset.getSingleValueForName(FIELD)) >=0 ) {
		
			portfolio.log('[ checkExisting ] = [ Value for "' + FIELD + '" ] exists !');
			
			} else {

				getDimensions(catalog, asset, itemId);

			} // else

	} else {
	
		portfolio.log('[ ERROR ! ] : Please ensure that the "' + FIELD + '" Custom Field has been created !');
	
	} // else
	
} // checkExisting



function getDimensions (catalog, asset, itemId) {

	let WIDTH = asset.getSingleValueForName("Width");
	
	let HEIGHT = asset.getSingleValueForName("Height");
	
		if ( WIDTH == null || HEIGHT == null ) {
	
			portfolio.log('[ ' + DISPLAY_NAME + ' version ' + VERSION + ' ] : Item ID [ ' + itemId + ' ] - The "Width" and / or "Height" fields are empty !');
						
		} else { 

			WIDTH = parseInt(WIDTH);
		
			HEIGHT = parseInt(HEIGHT);
			
			var ORIENTATION;
		
		if ( WIDTH > HEIGHT ) {
		
			ORIENTATION = WIDTH_GREATER_HEIGHT;

			portfolio.log( '[ WIDTH_GREATER_HEIGHT ] : [ Item ID ] = [ ' + itemId + ' ] ; [ WIDTH ] = [ ' + WIDTH + ' ] ; [ HEIGHT ] = [ ' + HEIGHT + ' ] ; [ ORIENTATION ] = [ ' + ORIENTATION + ' ]');	

		} else if ( WIDTH < HEIGHT ) {

			ORIENTATION = HEIGHT_GREATER_WIDTH;
				
			portfolio.log( '[ HEIGHT_GREATER_WIDTH ] : [ Item ID ] = [ ' + itemId + ' ] ; [ WIDTH ] = [ ' + WIDTH + ' ] ; [ HEIGHT ] = [ ' + HEIGHT + ' ] ; [ ORIENTATION ] = [ ' + ORIENTATION + ' ]');

		} else {

			ORIENTATION = WIDTH_EQUAL_HEIGHT;
				
			portfolio.log( '[ WIDTH_EQUAL_HEIGHT ] : [ Item ID ] = [ ' + itemId + ' ] ; [ WIDTH ] = [ ' + WIDTH + ' ] ; [ HEIGHT ] = [ ' + HEIGHT + ' ] ; [ ORIENTATION ] = [ ' + ORIENTATION + ' ]');

			} // else
		
			applyDimensions (catalog, itemId, ORIENTATION);
			
		} // else

} // getDimensions



function applyDimensions(catalog, itemId, ORIENTATION){

if ( portfolio.getFieldDefinitions(catalog, [FIELD], false).length === 1 ) {

		portfolio.log('[ updateAsset ] = [ ' + ORIENTATION + ' ]');

		var updateJSON = {};

		updateJSON[FIELD] = ORIENTATION;

		portfolio.updateAsset(catalog, itemId, updateJSON);

	} else {
	
		portfolio.log('[ ERROR ! ] : Please ensure that the "' + FIELD + '" Custom Field has been created !');
	
		} // else

} // applyDimensions

	

function onJobFinalize(finalResult) {

	portfolio.log('[ ' + DISPLAY_NAME + ' version ' + VERSION + ' ] - onJobFinalize called for Catalog Name - [ ' + portfolio.getCatalogName(finalResult.catalogId) + ' ] ; Catalog ID - [ '+ finalResult.catalogId +' ]...');
	
	portfolio.log('[ ' + DISPLAY_NAME + ' version ' + VERSION + ' ] - \\\\\\\\\\\\\\\\\\\\     END Job     \\\\\\\\\\\\\\\\\\\\ - ID : [ ' + finalResult.jobProcessor.jobId + ' ]');

	// Remember that JavaScript requires that backslashes must be "escaped" !
}
