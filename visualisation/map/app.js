document.addEventListener('DOMContentLoaded', function () {
	var bikeData = BIKEINFO;
	var bikeIcon = L.icon({
	    iconUrl: 'barclaysbikes.png'
	});
	var docks = new L.LayerGroup();
	 var arrayLength = bikeData.length;
	 for (var i = 0; i < arrayLength; i++) {
	 	var dock = bikeData[i];
	 	L.marker([dock["latitude"], dock["longitude"]], {icon: bikeIcon}).bindPopup(dock["name"] + "<br>" +
	 		                                                                        "Cycles available: " + dock["bikesAvailable"] + "<br>" +
	 		                                                                        "Empty docks: " +dock["emptySlots"]).addTo(docks);
	}

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