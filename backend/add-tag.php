<?php

   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = '';
   $db      = 'rfid_tag_manager';
   $cs      = 'utf8';

   // Set up the PDO parameters
   $dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt 	= array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo 	= new PDO($dsn, $un, $pwd, $opt);
   $data    = array();

   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);


   // Attempt to query database table and retrieve data
   try {
      $tagcode = $obj->tagcode;
      $groupid = $obj->groupid;

      $sql = "INSERT INTO tag (tagcode, groupid) VALUES ";

      foreach($tagcode as $code){
        $sql = $sql . "('" . $code . "', '" . $groupid . "'),";
      }

      $sql = rtrim($sql, ", ");
      $stmt = $pdo->prepare($sql);
      $stmt->bindParam(':tagcode', $tagcode, PDO::PARAM_INT);
      $stmt->execute();

      while($row = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $data[] = $row;
      }

      // Return data as JSON
      echo json_encode($data);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }


?>