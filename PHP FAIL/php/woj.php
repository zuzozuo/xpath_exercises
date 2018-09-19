<?php

if(isset($_POST['data'])){
 $xmlFile = simplexml_load_file('../data/TERC.xml');
 $res = $xmlFile -> xpath("/teryt/catalog/row/NAZWA_DOD");
 echo json_encode($res[0]);  
}

?>
