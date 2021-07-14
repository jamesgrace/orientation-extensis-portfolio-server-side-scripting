// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


var VERSION = "9march2020";

var DISPLAY_NAME = "Orientation";

var IGNORE_CATALOGS = ["Archive","Expired","Mobile Uploads","Current"];   //

var FIELD = "Orientation";   //   [ ! ] - Don't forget to create this custom field !

var WIDTH_GREATER_HEIGHT = "Landscape";   //

var HEIGHT_GREATER_WIDTH = "Portait";   //

var WIDTH_EQUAL_HEIGHT = "Square";   //

var SKIP_EXISTING = "Yes";		//		"Yes" or "No"		//


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



function getProperties() {

	return { triggerPoints: ["onCataloged"] };

}



function onCataloged(catalogId, assetId) {


const catalog = catalogId;

const itemId = assetId;

const asset = portfolio.getAssetById(catalogId, assetId);


if ( IGNORE_CATALOGS.indexOf(String(portfolio.getCatalogName(catalog))) > -1 ) {

	portfolio.log('[ ' + DISPLAY_NAME + ' version ' + VERSION + ' ] - \\\\\\\\\\\\\\\\\\\\    END Job    \\\\\\\\\\\\\\\\\\\\');

	} else {


		portfolio.log('[ ' + DISPLAY_NAME + ' version ' + VERSION + ' ] - //////////    START Job    //////////');

		if ( SKIP_EXISTING.toLowerCase() == "yes" ) {

			checkExisting(catalog, asset, itemId);

		} else {

			getDimensions(catalog, asset, itemId);

		} // else

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

		portfolio.log('[ ' + DISPLAY_NAME + ' version ' + VERSION + ' ] - \\\\\\\\\\\\\\\\\\\\    END Job    \\\\\\\\\\\\\\\\\\\\');

} // applyDimensions
