document.addEventListener('DOMContentLoaded', function () {
	var docks = new L.LayerGroup();


	/* this marker isn't visible! Because the Google layer sits atop everything. See comments in https://gist.github.com/crofty/2197701.
	"leaflet-googlemap.js" is old and buggy, it doesn't even use the latest version of leaflet,and isn't compatibel wth markers, let's not use it.
	 I would suggest using this instead https://github.com/shramov/leaflet-plugins (which is offically linked to on the leaflet plugins page)
	 See his google examples https://github.com/shramov/leaflet-plugins/blob/master/examples/google.html*/

	var aDock = L.marker([51.52916347,-0.109970527]).bindPopup('This is a dock. In River St.').addTo(docks);
	var googleLayer = new L.Google('ROADMAP');
	    var baseMaps = {
	    	"London": googleLayer
	    };

	    var overlayMaps = {
	    	"TFL Cycle Docks": docks
	    };
	var map = new L.Map('map',
	{
		center: new L.LatLng(51.52916347,-0.109970527),
		zoom: 15,
		layers: [googleLayer, docks]
	});

	L.control.layers(baseMaps, overlayMaps).addTo(map);

  });