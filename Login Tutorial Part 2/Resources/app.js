// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');
var tabGroup = Titanium.UI.createTabGroup();

var login = Titanium.UI.createWindow({
	title:'User Authentication Demo',
	url:'main_windows/login.js'
});

var loginTab = Titanium.UI.createTab({
	title:"Login",
	window:login
});	

var account = Titanium.UI.createWindow({
	title:'New Account',
	url:'main_windows/account.js'
});

var accountTab = Titanium.UI.createTab({
	title:'New Account',
	window:account
});

tabGroup.addTab(loginTab);
tabGroup.addTab(accountTab);
tabGroup.open();

