var win = Titanium.UI.currentWindow;
 //map




Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Ti.Geolocation.purpose = "";
Titanium.Geolocation.distanceFilter = 10;
 
//
// GET CURRENT POSITION - THIS FIRES ONCE
//
Titanium.Geolocation.getCurrentPosition(function(e)
{
    if (e.error)
    {
        alert('HFL cannot get your current location');
        return;
    }
 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
    
    Titanium.Geolocation.addEventListener('location',function(e)
	
	{
		if (e.error)
		{
               
		return;
		}
         
		 longitude = e.coords.longitude;
		 latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
 
             
      });
    
 
var mapview = Titanium.Map.createView({
  	  
       mapType: Titanium.Map.STANDARD_TYPE,
           region: {latitude:latitude, longitude:longitude, 
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true,
    top:140,
    
});

win.add(mapview);
// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {

    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        evt.clicksource == 'leftView') {
        Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
    
});
	   
var username = Titanium.UI.createTextField({
	color:'#336699',
	top:10,
	left:10,
	width:300,
	height:40,
	hintText:'Username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(username);

var password = Titanium.UI.createTextField({
	color:'#336699',
	top:60,
	left:10,
	width:300,
	height:40,
	hintText:'Password',
	passwordMask:true,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(password);

var loginBtn = Titanium.UI.createButton({
	title:'Login',
	top:110,
	width:90,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
win.add(loginBtn);

/*
* Login Event Handling
*/
var loginReq = Titanium.Network.createHTTPClient();
loginReq.onload = function()
{
	var json = this.responseText;
	var response = JSON.parse(json);
	if (response.logged == true)
	{
	   //map
	    alert('test');
	 
	   
	   
	   
	   
	   	alert("Welcome " + response.name + ". Your email is: " + response.email);
	}
	else
	{
		alert(response.message);
	}
};

loginReq.onerror = function()
{
	alert("Network error");
};

/*
* Login Button Click Event
*/

loginBtn.addEventListener('click',function(e)
{
	if (username.value != '' && password.value != '')
	{
		loginReq.open("POST","http://192.168.1.72/post_auth.php");
		var params = {
			username: username.value,
			password: Ti.Utils.md5HexDigest(password.value)
		};
		loginReq.send(params);
	}
	else
	{
		alert("Username/Password are required");
	}
});

});
