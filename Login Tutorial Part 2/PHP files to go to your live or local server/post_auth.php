<?php
// Select your MySQL host, username and password
$con = mysql_connect('localhost','root','root');
if (!$con)
{
	echo "Failed to make connection.";
	exit;
}
// Select the database. Enter the name of your database (not the same as the table name)
$db = mysql_select_db('test');
if (!$db)
{
	echo "Failed to select db.";
	exit;
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = '" . $username . "' AND password = '" . $password . "'";
$query = mysql_query($sql);
if (mysql_num_rows($query) > 0)
{
	$row = mysql_fetch_array($query);
	$response = array(
		'logged' => true,
		'name' => $row['name'],
		'email' => $row['email']
	);
	echo json_encode($response);
}
else
{
	$response = array(
		'logged' => false,
		'message' => 'Invalid Username and/or Password'
	);
	echo json_encode($response);
}
?>