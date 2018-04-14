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


   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   $key     =  strip_tags($obj->key);


   // Determine which mode is being requested
   switch($key)
   {

      // Add a new record to the technologies table
      case "create":

         // Sanitise URL supplied values
         $name = filter_var($obj->name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

         // Attempt to run PDO prepared statement
         try {
            $sql  = "INSERT INTO taggroup(groupname) VALUES(:name)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode(array('message' => 'O grupo ' . $name . ' foi adicionado ao banco de dados'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
   }

?>