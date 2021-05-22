<?php

$link = mysqli_connect("127.0.0.1","root","root","bk2102","3306");

$sql = "SELECT * FROM `banner` WHERE  `webp`='webp'";
$res1 = mysqli_query($link,$sql);
$result = mysqli_fetch_all($res1,MYSQLI_ASSOC);

echo json_encode($result);