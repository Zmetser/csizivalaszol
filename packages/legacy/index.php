<?PHP
/****************************
# Ts - vendégkönyv
# verzió: 0.1
# main file
****************************/

error_reporting  (E_ERROR | E_WARNING | E_PARSE);
define("INGB", true);

// configurációs fájlok behívása
include("configs/config.php");
include($cfg['wp']['root'] . "wp-config.php");

include("include/adodb/adodb.inc.php");
include("configs/ado.config.php");

/** Minek tettem bele multi lang támogatást két éve? */
// nyelvválasztás
if(file_exists("lang/lang.".$cfg['lang']['lang']))
  include("lang/lang.".$cfg['lang']['lang']);
else
  // az alap nyelv a magyar(hu) ha meg akarod változtatni írd át
  include("lang/lang.hu");
  
//  funkciok behívása
include("funkciok.php");

// oldal változók beállítása
if ( !empty($_GET) ) {
  if ( isset($_GET["actn"]) )
    $action = $_GET["actn"];
  if ( isset($_GET["page"]) )
    $oldal = $_GET["page"];
}
if ( isset($_POST["form"]) )
  $action = $_POST["form"];
  
/***************
 # Set current user 
 # Do useres_online
***************/
if (is_logged_in())
  {
    $_CURUSER = mysql_fetch_assoc(mysql_query("SELECT id, nev, szuletesnap, csiziadmin as admin, csizi_rang as rang, csizi_s_rang as srang, csizi_hsz_db as hsz_db, csizi_avatar as avatar FROM user WHERE id = ".$_COOKIE['u_id'].""));
    $_CURUSER['logged_in'] = true;
    // Regisztrálja a felhasználói aktivitást.
    register_user($_CURUSER['id'],$_CURUSER['nev']);
    // Ideiglenes adatgyűjtő funkció.
    log_user_ip($_CURUSER['nev']);
  }
else
  {
    $_CURUSER['logged_in'] = false;
    // Regisztrálja a felhasználói aktivitást.
    register_visitor();
  }
  // Törli az 1 órája inaktív felhasználókat.
  clear_user_activity(3600);
  
  // $activeUsers = get_active_users(3600);
  

// hozzászólás hozzáadása form
if($action == "sign")
{ 
  if (!$_CURUSER['logged_in'])
  {
    $koszonoTemplate = temaBeolvas("temp_thx.tpl");
    $koszonoTemplate = temaSzoveg($koszonoTemplate);
    $koszonoTemplate = str_replace("<!--THX-->", $cfg['lang']['loggin'], $koszonoTemplate);
    
    echo $koszonoTemplate;    
  }
  else
  {
    $action = $_POST["action"];
    $signTemplate = temaBeolvas("temp_sign.tpl");

    echo $signTemplate;
  }
}

// hozzászólás hozzáadása $_POST -ról jön
elseif($action == "hozzaad")
{
  // változók dekralálása
  $message = $_POST['message'];
  $datum = time();
  $valid = true;
  
 /*************
   # Hibaellenőrzés
   **************/
  if(!isset($message) or empty($message)){
    echo "<b>".$cfg['lang']['hiba'].":</b> ".$cfg['lang']['uzenetMezoHiba']."";
    $valid = false; }
    
 /*******************************
   # Hozzáadjuk a fájlhoz az értékeket
   ********************************/
  
  // megnézzük valid-e a form
  if($valid && $_CURUSER['logged_in'])
  {
    $message = cleanMessage($message);
  
    // megformázzuk a bejegyzést
    $bejegyzes = $nev."|".$datum."|".$message."|[EOM]";
    
    // hozáadjuk a bejegyzést a fájlhoz --> BIZTONSÁGI MENTÉS
    $fp = fopen($cfg['local']['bejegyzesek'], "a");
    fwrite($fp, $bejegyzes."\n");
    fclose($fp);
	
    $keres = "INSERT INTO `csizi` (`id`, `nev`, `datum`, `duma`) VALUES ('', '".$_CURUSER['nev']."', '$datum', '$message')";
    $query = mysql_query($keres) or die(mysql_error());
    
    /* Felhasználói profil frissítése. */
    $db = $_CURUSER['hsz_db'] + 1;
    // Rangok biggyesztése a határ alapján
    for ( $i=0; $i<count($CsiziRangHatar); $i++ )
    {
      if ( $db > $CsiziRangHatar[$i] )
        $rang = $i+1;
    }
  
    // Hozzászólások számának növeléseés rang beállítása.
    $keres = "UPDATE `user` SET `csizi_hsz_db` = `csizi_hsz_db`+1, `csizi_rang` = ".$rang." WHERE `id` = '".$_CURUSER['id']."'";
    mysql_query($keres) or die(mysql_error());
  
	
    // ha a megköszönés be van kapcsolva akkor megköszönjük a POST-ot
    if($cfg['conf']['koszono'])
    {
      $koszonoTemplate = temaBeolvas("temp_thx.tpl");
      $koszonoTemplate = temaSzoveg($koszonoTemplate);
      $koszonoTemplate = str_replace("<!--THX-->", $cfg['lang']['thx'], $koszonoTemplate);
      
      echo $koszonoTemplate;
    }
    // ha nincs akkor tovább a főoldalra
    else
      echo "<center><h1>Üzenet hozzáadása</h1>";
	  create_progress();
	  update_progress(100);
	  echo "</center>";
	  echo '<META http-equiv="refresh" content="0; URL='.$cfg['local']['index'].'">';
  }
}
/*****************************
# Kiírja az üzeneteket a főoldalon
*****************************/
else
{
	$numrows = mysql_fetch_row(mysql_query("SELECT COUNT(*) FROM csizi"));
  // Kiválasztja a három legtöbbet kérdezőt. 52-es ID-vel Csizi rendelkezik. Ő nyilván nem lehet a legtöbbet kérdezők közt, ezért azt nem számítjuk bele.
  $query = mysql_query("SELECT id 
  FROM `user` WHERE id != 52 ORDER BY csizi_hsz_db DESC LIMIT 3");
  while ( $f = mysql_fetch_array($query) ){
    $ErmesKerdezok[] = $f[0];
  }
	
  if ( (isset($_GET['page']) && $_GET['page'] > 0) ? $page = $_GET['page'] : $page = 1 );

	$FirstPage = ceil($numrows[0]/$cfg['conf']['bejegyzeslimit']);

  if ($_GET['page'] == "utolsó" || $page > $FirstPage) 
    $page = $FirstPage;

	$offset = (($page * $cfg['conf']['bejegyzeslimit']) - $cfg['conf']['bejegyzeslimit']);
  
  $NextPage = ($page == 1) ? 1 : $page - 1;
  $PrevPage = ($page == $FirstPage) ? $FirstPage : $page + 1;
	$sablonM = temaBeolvas("temp_message.tpl");

	$keres = "SELECT * FROM csizi ORDER BY id DESC LIMIT {$offset},{$cfg['conf']['bejegyzeslimit']}";
  $query = mysql_query($keres);
		
		while($sor = mysql_fetch_assoc($query))
			{
				extract($sor);
				
				$sql = "SELECT id, nev, csizi_rang, csizi_s_rang, csizi_hsz_db as db, csizi_avatar as avatar 
        FROM user WHERE nev = '".$nev."'";
				$query2 = mysql_query($sql) or die(mysql_error());
				$sor = mysql_fetch_object($query2);
        
        // Medál illesztése
        $Medal = 0;        
        foreach ($ErmesKerdezok as $key => $val)
        {
          if ( $val == $sor->id )
            $Medal = $key +1;
        }        
        if ( $Medal == 0 )
          $Medal = "none";
        else
          $Medal = $CsiziMedal[$Medal];
				
			  // cenzúrázza az adatokat, ha a funkció be van kapcsolva
			  // MEGJEGYZÉS: a funkció ki és bekapcsolás irányítása a functions.php-ban van
			  $message = badWorldFilter($duma);
 
			  $kov = $id + 1;
			  $elo = $id - 1;
			  
			  // BBkód kezelés
        # 2008.11.25-től már csak a régi bejegyzésekkel való kompatibilitás miatt kell
			  if ( $cfg['conf']['BBkod'] )
			    $message = BBkod($message);
			    
			  // Smilei kezelés
        # 2008.11.25-től már csak a régi bejegyzésekkel való kompatibilitás miatt kell
			  if ( $cfg['conf']['smilei'] )
			    $message = smilei($message);

        // Hozzászólás szerkesztésének utolsó dátumát biggyeszti.
        // MEGJEGYZÉS: Az adminok ellenőrzése nem a legfejlettebb, de a jelenlegi két adminnál megteszi.
        if ( $szerkesztve != 0 && $nev != "Olibaggio" && $nev != "Csizibaggio" )
          $message .= "<div class=\"modify-warning\">Utoljára szerkesztette: <strong>".$szerkesztette."</strong> ".$szerkesztve."-kor.</div>";
        
			  $sablon .= $sablonM;
        
        // Egyedi rangok illesztése
        if ( $sor->csizi_s_rang != "none" ) 
        {
          $Rang = $sor->csizi_s_rang;
          $RangSzoveg = $CsiziSuperRang[$Rang];
          $NormalRang = $CsiziRang[$sor->csizi_rang][0];;
          $NormalRangSzoveg = $CsiziRang[$sor->csizi_rang][1];;
        }
        // Automatikus rangok illesztése:
        else
        {
          $Rang = $CsiziRang[$sor->csizi_rang][0];
          $RangSzoveg = $CsiziRang[$sor->csizi_rang][1];
        }
        
        // Avatar illesztése
			  if ( $sor->avatar != "none" && file_exists($CsiziAvatarPath . $sor->avatar) )
          $Avatar = $CsiziAvatarPath . $sor->avatar;
        else
          $Avatar = $CsiziAvatarPath . "no-avatar.jpg";
        
			  // kicseréli a sablonban az üzenet tagokat
			  $sablon = str_replace("{ID}", $id, $sablon);
        $sablon = str_replace("{NEV}", $nev, $sablon);
        $sablon = str_replace("{UZENET}", $message, $sablon);
        $sablon = str_replace("{RANG_NAME}", $Rang, $sablon);
        $sablon = str_replace("{HOZZASZOLAS_DB}", $sor->db, $sablon);
        $sablon = str_replace("{RANG}", $RangSzoveg, $sablon);
        $sablon = str_replace("{MEDAL}", $Medal, $sablon);
        $sablon = str_replace("{AVATAR}", $Avatar, $sablon);
        $sablon = temaDatum($sablon, $datum);
      }
  $csizie = "none";
  if ( $_CURUSER['logged_in'] )
  {
    if ( $_CURUSER['id'] == 52 || $_CURUSER['id'] == 51 )
    {
      $csizie = "block";
      $UdvDuma = "Szervusz <strong>".$_CURUSER['nev']."</strong>!";
      $FigyeljCsizi = "Nincsen számodra titkos üzenetem.";
    }
  }
  else
  {
    $UdvDuma = "Üdv <strong>Vendég</strong>!";
    $MiniStat = "<a href=\"../index.php?go=reg\">Regisztráció</a> | Bejelentkezés";
  }
  
  $szinek = array("F93","003","033","036","303","603","300","600","900","060","030","F39","5B6D97");
  $rand = rand(0,count($szinek)-1);
  $CsiziKerdes = array("Felteszek egy fontos kérdést","Kikérem Csizi véleményét","megkérdem csizit","hogy is van ez csizi?","?","kérdezek","segíts csizi","mutass nekem utat ó nagy bölcs","Dr. csizit kérdezném");
  $rand2 = rand(0,count($CsiziKerdes)-1);
  
  // Online felhasználók
  // users_online table not exported
  /*$activeUsers_str = '';
  foreach ($activeUsers as $azon => $user){
    if ( $user['nev'] == "visitor" )
      $activeUsers_str .= $user['db'] . " vendég, ";
    else
      $activeUsers_str .= $user['nev'] . ", ";    
  }*/

  // betölti a sablont
  $ct = temaBeolvas("temp_body.tpl");
  $ct = temaSzoveg($ct);
  // beírja a hozzászólásokat
  $ct = str_replace("<!--BEJEGYZESEK-->", $sablon, $ct);
  //$ct = str_replace("<!--JELEN-->", $activeUsers_str, $ct);
  $ct = str_replace("<!--STAT_LINK-->", $stat_link, $ct);
  $ct = str_replace("<!--STAT-->", $stat, $ct);
  $ct = str_replace("<!--display-->", $_GET['stat'], $ct);
  $ct = str_replace("{NEXT_PAGE}", $NextPage, $ct);
  $ct = str_replace("{PREV_PAGE}", $PrevPage, $ct);
  $ct = str_replace("{FIRST_PAGE}", $FirstPage, $ct);
  $ct = str_replace("{UDVOZLES}", $UdvDuma, $ct);
  $ct = str_replace("{MINISTAT}", $MiniStat, $ct);
  $ct = str_replace("{CSIZINEK}", $FigyeljCsizi, $ct);
  $ct = str_replace("{CSIZINEKVISIBLE}", $csizie, $ct);
  $ct = str_replace("{SZIN}", $szinek[$rand], $ct);
  $ct = str_replace("{CSIZI_KERDES}", $CsiziKerdes[$rand2], $ct);
  // mindentkiír :)
  echo $ct;
}

/** Rendbehozza az adatbázist */
  
  // Felhasználók hozzászólásainak száma: 
/*
  $query = "SELECT nev, COUNT(nev) as db FROM csizi GROUP BY nev";
  $q = mysql_query($query);
  while ( $f = mysql_fetch_object($q) )
  {
    mysql_query("UPDATE `user` SET `csizi_hsz_db` = {$f->db} WHERE `nev` = '{$f->nev}'");
    echo $f->nev . " Rendbehozva <br />";
  }
*/
?>