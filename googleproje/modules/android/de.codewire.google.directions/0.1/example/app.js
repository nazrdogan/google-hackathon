var win = Ti.UI.createWindow();
var map = Ti.Map.createView({
	top : 0,
	height : Ti.Platform.displayCaps.platformHeight
});

var btnSingle = Ti.UI.createButton({
	bottom : 0,
	width : 140,
	height : 50,
	left : 20,
	title : 'Single'
});
var btnWaypoint = Ti.UI.createButton({
	bottom : 0,
	width : 140,
	height : 50,
	left : 170,
	title : 'Waypoint'
});

var btnAlternatives = Ti.UI.createButton({
	bottom : 0,
	width : 140,
	height : 50,
	left : 320,
	title : 'Alternatives'
});
win.add(map);
win.add(btnSingle);
win.add(btnWaypoint);
win.add(btnAlternatives);
win.open();

// load module
var gd = require('de.codewire.google.directions');

// retrieve location
var origin = "Frankfurt, Germany";
var destination = "Berlin, Germany";
var waypoints = ['Munich, Germany'];
var activeRoutes = [];

var removeAllRoutes = function() {
	for(var idx in activeRoutes) {
		var route = activeRoutes[idx];
		map.removeRoute(route);
	}
	activeRoutes = [];
};

/**
 * Simple route.
 */
btnSingle.addEventListener('click', function() {
	removeAllRoutes();

	gd.getRoute({
		origin : origin, // required
		destination : destination, // required
		color : 'black', // defaults to '#FF0000'
		mode : gd.travelModes.walking, // defaults to driving
		name : 'single',
		callback : function(response) {
			if(response.status == 'OK') {
				map.setRegion({
					latitude : response.route.points[0].latitude,
					longitude : response.route.points[0].longitude,
					longitudeDelta : 1,
					latitudeDelta : 1
				});

				map.addRoute(response.route);
				activeRoutes.push(response.route);
				
				// loop each point to get distance, duration & instruction
				for(var idx in response.route.points) {
					var point = response.route.points[idx]; 
					if(point.isMaster) {
						var distance = point.distance;
						var duration = point.duration;
						var instruction = point.instruction;
					}
				}
				
			} else {
				/**
				 * Error handling.
				 * The Error object contains "status" & msg properties.
				 */
				alert(response.msg);
			}
		}
	});
});

/**
 * Route with custom way points.
 */
btnWaypoint.addEventListener('click', function() {
	removeAllRoutes();

	gd.getRoute({
		origin : origin, // required
		destination : destination, // required
		color : 'red', // defaults to '#FF0000',
		waypoints : waypoints,
		callback : function(response) {
			if(response.status == 'OK') {
				// map.setRegion({
					// latitude : response.route.points[0].latitude,
					// longitude : response.route.points[0].longitude,
					// longitudeDelta : 5,
					// latitudeDelta : 5
				// });
				map.addRoute(response.route);
				activeRoutes.push(response.route);
			} else {
				/**
				 * Error handling.
				 * The Error object contains "status" & msg properties.
				 */
				alert(response.msg);
			}
		}
	});
});

/**
 * Route with alternatives.
 */
btnAlternatives.addEventListener('click', function() {
	removeAllRoutes();

	gd.getRoutes({
		origin : origin,
		destination : destination,
		colors : ['black', 'green', 'blue'], // if there are not enough colors, 'red' will be the default
		callback : function(response) {
			if(response.status == 'OK') {
				// map.setRegion({
					// latitude : response.routes[0].points[0].latitude,
					// longitude : response.routes[0].points[0].longitude,
					// longitudeDelta : 5,
					// latitudeDelta : 5
				// });

				for(var idx in response.routes) {
					map.addRoute(response.routes[idx]);
					activeRoutes.push(response.routes[idx]);
				}

			} else {
				alert(response.msg);
			}
		}
	});
});
