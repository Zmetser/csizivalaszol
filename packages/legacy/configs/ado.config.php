<?php

$db = ADONewConnection("mysql");
$db->debug = false;
$db->Connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$ADODB_FETCH_MODE = ADODB_FETCH_ASSOC; 

?>