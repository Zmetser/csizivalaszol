<?php
/****************************
# Ts - vend�gk�nyv
# verzi�: 0.1.3
# admin file
****************************/

define("INGB", true);

// configur�ci�s f�jl beh�v�sa
include("config.php");
	
	include("../config.php");
    mysql_connect(HOST, USER, PASS) or die(mysql_error());
    mysql_select_db(DB)or die(mysql_error());

// nyelvv�laszt�s
if(file_exists("lang/lang.".$cfg['lang']['lang']))
  include("lang/lang.".$cfg['lang']['lang']);
else
  // az alap nyelv a magyar(hu) ha meg akarod v�ltoztatni �rd �t
  include("lang/lang.hu");
  
//  funkciok beh�v�sa
include("funkciok.php");

if ( !empty($_GET) ) {
  if ( isset($_GET["id"]) )
    $id = $_GET["id"];
}
if ( !empty($_POST) ) {
  if ( isset($_POST["action"]) )
    $action = $_POST["action"];
  if ( isset($_POST["id"]) )
    $id = $_POST["id"];
  if ( isset($_POST["date"]) )
    $date = time();
}
if ( isset($action) )
{
  if (!is_logged_in())// Nincs bejelentkezve az user
		echo "Jelentkezz be!";
  else
  {
    $keres = "SELECT id, csiziadmin, nev FROM user WHERE id = ".$_COOKIE['u_id']."";
    $query = mysql_query($keres) or die(mysql_error());
    $sor = mysql_fetch_object($query);
		if($sor->csiziadmin == "1")// Admin
   		$admin = true;
    else 
			$admin = false; 
			
		$GLOBALS['userNev'] = $_COOKIE['nev'];
    switch($action) {
    
        /**
                    * Hozz�sz�l�s T�rl�se
                    */
        case "delete": 
          if($admin === true)
          {
            // ... persze de ahoz az usernek unigue elemnek k�ne lenni.
            // ... tudom , de majd egyszer ID-k alapj�n fogok azonos�tani.
              $GetWriter = "SELECT nev FROM csizi WHERE id = ".$id." LIMIT 1";
              $Writer = mysql_fetch_object(mysql_query($GetWriter));
              
              $GetWriterProfile = "SELECT `csizi_hsz_db` as hszDb, nev FROM `user` WHERE `nev` = '".$Writer->nev."'";
              $User = mysql_fetch_object(mysql_query($GetWriterProfile));
              $db = $User->hszDb - 1;
              // Rangok biggyeszt�se a hat�r alapj�n
              for ( $i=0; $i<count($CsiziRangHatar); $i++ )
              {
                if ( $db > $CsiziRangHatar[$i] )
                  $rang = $i+1;
              }
              
              $UpdateWriterProfil = "UPDATE `user` SET `csizi_hsz_db` = ".$db.", `csizi_rang` = ".$rang." WHERE `nev` = '".$Writer->nev."'";
              mysql_query($UpdateWriterProfil);
              
              $DelMessage = "DELETE FROM `csizi` WHERE id = ".$id." LIMIT 1";
              mysql_query($DelMessage)or die(mysql_error());	
              
              // Vissza�ll�tja az AUTO_INCREMENT �rt�k�t.
              mysql_query("ALTER TABLE  `csizi` AUTO_INCREMENT =".$id);
              
              echo "<center><h1>T�rl�s</h1></center>";
              echo '<META http-equiv="refresh" content="0; URL='.$cfg['local']['index'].'">';
          }
          else
            echo "<p>Ehhez Csizibaggio �r�sos beleegyez�se sz�ks�ges h�t eredeti �s negyvenk�t m�solt p�ld�nyban.</p>";
            
        break;
          
        /**
                    * Hozz�sz�l�s m�dos�t�sa *FORM*
                    */
        case "modify":
          
          if ( !isset($_POST) ) { echo "HIBA: nem t�rt�nt POST";}
          
          $id = $_POST['id'];
          $keres = "SELECT * FROM csizi WHERE id = $id";
          $query = mysql_query($keres);
          $sor = mysql_fetch_object($query);

          //Leellen�rzi, hogy az user megegyezik-e azzal aki ez �zenetet �rta
          //Ha rendben akkor megn�zi, hogy eltelt-e 1nap az �zenet meg�r�sa �ta
          //Persze csak, ha nem admin az illet�
          if ( $admin === true || ( $sor->nev == $GLOBALS['userNev'] && strtotime("NOW") <= $sor->datum+86400 ) )
          {
            $contents = temaBeolvas("temp_modify.tpl");
            $contents = str_replace("{ID}", $sor->id, $contents);
            $contents = str_replace("{UZENET}", $sor->duma, $contents);
            $contents = temaDatum($contents, $sor->datum);
            $contents = temaSzoveg($contents);

            echo $contents;
          }
          else
            echo "<p>Ehhez Csizibaggio �r�sos beleegyez�se sz�ks�ges h�t eredeti �s negyvenk�t m�solt p�ld�nyban.</p>";
        
        break;

        /**
                    * Hozz�sz�l�s m�dos�t�sa
                    */
        case "update":
      
          extract($_POST);
          
          $keres = "SELECT * FROM csizi WHERE id = $id";
          $query = mysql_query($keres);
          $sor = mysql_fetch_object($query);
          
          $now = strtotime("NOW");
          $date = date("Y-m-d H:i:s", $now);
          
          if ( $admin === true || ( $sor->nev == $GLOBALS['userNev'] && $now <= $sor->datum+86400 ) )
          {
            $keres = "
            UPDATE `csizi` SET `duma` = '".cleanMessage($message)."', `szerkesztette` = '".$GLOBALS['userNev']."',
            `szerkesztve` = '".$date."' WHERE `id` = ".$id." LIMIT 1;";
            mysql_query($keres)or die(mysql_error());
            echo '<META http-equiv="refresh" content="0; URL='.$cfg['local']['index'].'">';
          }

        break;

        /**
                    * WTF?!
                    */
        default: {
          die("Mit is csin�ljak most tulajdonk�ppen?");
        }
      }
    }
  }
else {
  if ( !isset($id) )
    echo "Nincs id";;

	$keres = "SELECT * FROM csizi WHERE id = '".$_GET['id']."' LIMIT 1";
	$query = mysql_query($keres) or die(mysql_error());
	$sor = mysql_fetch_object($query);

  $adminContent = temaBeolvas("temp_admin.tpl");
  $adminContent = str_replace("{ID}", $sor->id, $adminContent);
  $adminContent = str_replace("{NEV}", $sor->nev, $adminContent);
  $adminContent = str_replace("{UZENET}", $sor->duma, $adminContent);
  $adminContent = temaDatum($adminContent, $sor->datum);
  $adminContent = temaSzoveg($adminContent);

  echo $adminContent;
}

?>