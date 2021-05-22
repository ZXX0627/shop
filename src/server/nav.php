<?php

$keyword  = $_GET["nav_name"];
$link = mysqli_connect("127.0.0.1","root","root","bk2102","3306");

$sql = "SELECT * FROM `nav` WHERE `nav_name` = '{$keyword}'";
$res1 = mysqli_query($link,$sql);
$result = mysqli_fetch_all($res1,MYSQLI_ASSOC);
echo json_encode($result);