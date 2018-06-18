<?PHP
/****************************
# Ts - vendégkönyv
# verzió: 0.1
# funkciok.php
****************************/

include ("config.php");

// nem teszi elérhetővé, hogy a fájlt kívülről megnyissák
if(!defined("INGB"))
{
  header("LOCATION:".$cfg['local']['index']."");
  die();
}

// Kompatibilitás miatt
function sql_kapcs()
{
	mysql_connect(HOST, USER, PASS) or die(mysql_error());
	mysql_select_db(DB)or die(mysql_error());
}

// temaBeolvas(temafajl.tpl)
function temaBeolvas($temafajl)
{
  global $cfg;
  
  if(file_exists("temak/alap/".$temafajl))
  {
    $tplFajl = "temak/alap/".$temafajl;
  }
  else
  {
    $tplFajl = $cfg['local']['temaPatch']."alap/".$temafajl;
  }

  $fopen = fopen($tplFajl, "r");
  fseek($fopen, 0);
  $tplData = fread($fopen, filesize($tplFajl));
  fclose($fopen);
  
  return $tplData;
}

function temaSzoveg($str)
{
  global $cfg;
  
  $str = str_replace("<!--CIM-->", $cfg['lang']['cim'], $str);
  $str = str_replace("<!--INDEX-->", $cfg['local']['index'], $str);
  $str = str_replace("<!--SITEINDEX-->", $cfg['local']['fooldalUrl'], $str);
  $str = str_replace("<!--INFO-->", $cfg['lang']['info'], $str);
  
  // JavaScript alert ablak uzenetei
  $str = str_replace("<!--nevKell-->", $cfg['lang']['nevMezoHiba'], $str);
  $str = str_replace("<!--emailKell-->", $cfg['lang']['emailMezoHiba'], $str);
  $str = str_replace("<!--emailNemValid-->", $cfg['lang']['emailValid'], $str);
  $str = str_replace("<!--uzenetKell-->", $cfg['lang']['uzenetMezoHiba'], $str);
  
  $str = str_replace("<!--COOKIE_NEV-->", $_COOKIE['nev'], $str);
  $str = str_replace("<!--gomb-->", $cfg['lang']['gomb'], $str);
  
  return $str;
}

function temaDatum($str, $datum) {
  global $cfg;

  // idózóna beállítás
  $GMT = 3600 * $cfg['conf']['idozona'];
  $datum += $GMT;
  
  // átkonvertálja az UNIX TIMESTAMP-ot a config.php -ben megadott formátumú dátumra
  $datum = date($cfg['conf']['datumFormatum'], $datum);
  
  $str = str_replace("{DATUM}", $datum, $str);

  return $str;
}

// kicseréli az e-mail-címben a @-ot és a .-ot
// a config.php-ban megadott strre
function antiSpam($email)
{
  global $cfg;
  
  $email = str_replace("@", $cfg['lang']['kukac'], $email);
  $email = str_replace(".", $cfg['lang']['pont'], $email);
  
  return $email;
}

// leellnőrzi az e-mail-cím helyességét
function validEmail($email)
{
// Működési elv:
// a@b.hu => a_b@bb.hu{2-3}
// ^ str elején kezd
// [_a-z0-9-]+(\.[_a-z0-9-]+)* minimum1 karakter
// ami kisbetu, szam vagy '_' lehet.
//Ezt ugyanez követheti végtelenszer
// @[a-z0-9-]+(\.[a-z0-9-]+)* jön a kukac és min1
// kisbetu vagy szam
// .(\.[a-z]{2,3})$ jön a pont es min2 max3 kisbetu
  if(eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*.(\.[a-z]{2,3})$", $email))
  {
    return true;
  }
  else
  {
    return false;
  }
}

// leellenőrzi az URL helyességét
function validURL($url)
{
// működési elva a validEmail() funkcióhoz hasonló
  if(eregi("^http://+[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*.(\.[a-z]{2,3})$", $url))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function cleanField($str)
{
  $str = trim($str);
  $str = htmlspecialchars($str);
  $str = str_replace("|", "&brvbar;", $str);

  if ( get_magic_quotes_gpc() )
    $str = stripslashes($str);

  return $str;
}

function cleanMessage($str)
{
  global $cfg;
  
  $str = trim($str);
  // ha engedélyezve vannak a HTML kódok
  if($cfg['conf']['Html'])
  {
    // mind engedélyezve van
    if($cfg['conf']['HtmlTags'] == "all")
      $str = $str;
    // csak bizonyos tagok vannak engedélyezve
    else
      $str = strip_tags($str, $cfg['conf']['HtmlTags']);
  }
  // nincsenek engedélyezve a HTML kódok
  else
    $str = strip_tags($str);

  $str = mysql_real_escape_string($str);
    
  return $str;
}

function badWorldFilter($str)
{
  global $cfg;

  // csak akkor fut le ha a funkció be van kapcsolva
  if($cfg['conf']['badWorldFilter'])
  {
    // meghatározza a szűrendő szavak számát
    $nBadWords = sizeof($gbBadWords);

    for ($i = 0; $i < $nBadWords; $i++) 
    {
      // meghagyja az első betüt
      $banned = substr($gbBadWords[$i], 0, 1);
      // cseréli a betüket csillagokra
      for ($c = 1; $c < strlen($gbBadWords[$i]); $c++) {
        $banned .= "*";
      }
      // meghagyja az utolsó betüt
      $banned .= substr($gbBadWords[$i], -1, 1);

      $str = str_replace($gbBadWords[$i], $banned, $str);
    }
  }
  return $str;
}

function BBkod($sz)
{
  # lista
	$sz = preg_replace("/\[list\](.+?)\[\/list\]/is", '<ul class="listbullet">$1</ul>' ,$sz);
	$sz = preg_replace("/\[list=1\](.+?)\[\/list\]/is", '<ul class="listdecimal">$1</ul>' ,$sz);
	$sz = preg_replace("/\[list=i\](.+?)\[\/list\]/s", '<ul class="listlowerroman">$1</ul>' ,$sz);
	$sz = preg_replace("/\[list=I\](.+?)\[\/list\]/s", '<ul class="listupperroman">$1</ul>' ,$sz);
	$sz = preg_replace("/\[list=a\](.+?)\[\/list\]/s", '<ul class="listloweralpha">$1</ul>' ,$sz);
	$sz = preg_replace("/\[list=A\](.+?)\[\/list\]/s", '<ul class="listupperalpha">$1</ul>' ,$sz);
	$sz = str_replace("[*]", "<li>", $sz);
	$sz = str_replace("[@]", "</li>", $sz);

  #betűformázás
    // félkövér
		$sz = preg_replace("(\[b\](.+?)\[\/b])is",'<b>$1</b>',$sz);

    // dőlt
		$sz = preg_replace("(\[i\](.+?)\[\/i\])is",'<i>$1</i>',$sz);

    // aláhúzott
		$sz = preg_replace("(\[u\](.+?)\[\/u\])is",'<u>$1</u>',$sz);

    // áthúzott
		$sz = preg_replace("(\[s\](.+?)\[\/s\])is",'<s>$1</s>',$sz);

    // föléhúzott
		$sz = preg_replace("(\[o\](.+?)\[\/o\])is",'<o>$1</o>',$sz);

    //színes
		$sz = preg_replace("(\[color=(.+?)\](.+?)\[\/color\])is","<span style=\"color: $1\">$2</span>",$sz);

    // méretezett
		$sz = preg_replace("(\[size=(.+?)\](.+?)\[\/size\])is","<span style=\"font-size: $1px\">$2</span>",$sz);

    // url
    $sz = preg_replace("/(\[url\])(.+?)(\[\/url\])/i", '<a href="\\2" target="_blank">\\2</a>', $sz);
    $sz = preg_replace("/(\[url=\])(.+?)(\[\/url\])/i", '<a href="\\2" target="_blank">\\2</a>', $sz);
    $sz = preg_replace("/(\[url=(.+?)\])(.+?)(\[\/url\])/i", '<a href="\\2" target="_blank">\\3</a>', $sz);

    // kép
    $sz = preg_replace("#\[imgw\](.*?)\[/imgw\]#si", "<a href=\"\\1\" target=\"_blank\"><img src=\"\\1\" border=\"0\" alt=\"\" width=\"483px\"/></a>", $sz);
    
    $sz = preg_replace("#\[img\](.*?)\[/img\]#si", "<a href=\"\\1\" target=\"_blank\"><img src=\"\\1\" border=\"0\" alt=\"\"/></a>", $sz);
		
	return $sz;
}

function smilei($sz)
{
  global $cfg;
  
  // megszámolja mennyi szmajli van a tömbben
  $smileik = count($cfg['conf']['smilei']);
  
  // addig dolgozik, míg minden szmajlit meg nem vizsgált
  for ($i = 0; $i < $smileik; $i++)
  {
    // felosztja a tömböt a szmajli kódjára pl(:D) és a többi adatra majd
    // visszaadja a tömb pillanatnyilag kijelölt elemét és lépteti a belső mutatót
    list($smilei, $info) = each($cfg['conf']['smilei']);
    // <img src="szmileik/szmajli.png" title="nev" />
    $html = "<img src=\"".$cfg['local']['smileiPatch'] . $info[0]."\" alt=\"".$info[1]."\" title=\"".$info[1]."\" />";
    $sz = str_replace($smilei, $html, $sz);    
  }
  // a tömb belső mutatóját az első elemére állítja
  reset($cfg['conf']['smilei']);
  
  return $sz;
 
}

// A function that will create the initial setup
// for the progress bar: You can modify this to
// your liking for visual purposes:
function create_progress() {
  // First create our basic CSS that will control
  // the look of this bar:
  echo "
<style>
#text {
  position: absolute;
  top: 100px;
  left: 50%;
  margin: 0px 0px 0px -150px;
  font-size: 18px;
  text-align: center;
  width: 300px;
}
  #barbox_a {
  position: absolute;
  top: 130px;
  left: 50%;
  margin: 0px 0px 0px -160px;
  width: 304px;
  height: 24px;
  background-color: #5B6D97;
}
.per {
  position: absolute;
  top: 130px;
  font-size: 18px;
  left: 50%;
  margin: 1px 0px 0px 150px;
  background-color: #FFFFFF;
}

.bar {
  position: absolute;
  top: 132px;
  left: 50%;
  margin: 0px 0px 0px -158px;
  width: 0px;
  height: 20px;
  background-color: #CAD0DF;
}

.blank {
  background-color: white;
  width: 300px;
}
</style>
";

  // Now output the basic, initial, XHTML that
  // will be overwritten later:
  echo "
<div id='text'>KÉRLEK VÁRJ!</div>
<div id='barbox_a'></div>
<div class='bar blank'></div>
<div class='per'>0%</div>
";

  // Ensure that this gets to the screen
  // immediately:
  flush();
}

// A function that you can pass a percentage as
// a whole number and it will generate the
// appropriate new div's to overlay the
// current ones:

function update_progress($percent) {
  // First let's recreate the percent with
  // the new one:
  echo "<div class='per'>{$percent}
    %</div>\n";

  // Now, output a new 'bar', forcing its width
  // to 3 times the percent, since we have
  // defined the percent bar to be at
  // 300 pixels wide.
  echo "<div class='bar' style='width: ",
    $percent * 3, "px'></div>\n";
	
  // Now, again, force this to be
  // immediately displayed:
  flush();
}

// kifutott funkció, már nincs használatban.
function pagination($total_pages,$page){
    global $webpage;
      
    $max_links = 20;
    $max = 10;
    
    $shift = 5;
    $h=1;  
    
    if($total_pages>=$max_links){
    
        if(($page>=$max_links-$shift)&&($page<=$total_pages-$shift)){  
            $max_links = $page+$shift;
            $h=$max_links-$max;
        }
        if($page>=$total_pages-$shift+1){
            $max_links = $total_pages+1;
            $h=$max_links-$max;
        }
    }
    else{
        $h=1;
        $max_links = $total_pages+1;
    }
    
    $return = '<div class="page_numbers"><ul>';
    if($page>"1"){
        $return .= '<li class="current"><a href="'.$webpage.'?page=1">Utolsó</a></li>
              <li class="current"><a href="'.$webpage.'?page='.($page-1).'">Következő</a></li>
        ';
    }
    
    if($total_pages!=1){
        for ($i=$h;$i<$max_links;$i++){
            if($i==$page){
                $return .= '<li><a class="current">'.$i.'</a></li>
                ';
            }
            else{
                $return .= '<li><a href="'.$webpage.'?page='.$i.'">'.$i.'</a></li>
                ';
            }
        }
    }
    if(($page >="1")&&($page!=$total_pages)){
        $return .= '<li class="current"><a href="'.$webpage.'?page='.($page+1).'">Előző</a></li>
              <li class="current"><a href="'.$webpage.'?page='.$total_pages.'">Első</a></li>
        ';
    }
    
    $return .= '</ul>
        </div>';
        
        return $return;
}

function sql_query($q){
	
  //change these columns to the columns you would like to search
  
$cols_search = array("duma");
$count_search = count($cols_search);

  //$st is the type of search use radio buttons to select the search type
  //an example search form is at the end of the page
  //1 = and
  //2 = or
  //3 = phrase

$st = (isset($_POST['st'])?$_POST['st']:2);      

  //

$q = addslashes(trim($q));
$query = NULL;
//phrase search - search for the entire phrase  

  if($st==3){
  
    $query.="WHERE ";

    //if one column to search

    if($count_search==1){
    
      $query .="$cols_search[0] LIKE\"%$q%\"";
      return($query);
    }
    else{
      //build search for each column
      for($i=0;$i<$count_search;$i++){
        if($i!=$count_search-1){
          $query .="$cols_search[$i] LIKE \"%$q%\" or ";
        }
          //if the last column, don't add 'or' to the query
        else{
          $query .="$cols_search[$i] LIKE \"%$q%\"";
        }
      }
      return($query);
    }
  }

  //if and or search

  else{ 

    $query .="WHERE ";
    
    //create an array of individual words
    
    $separate_words = explode(" ",$q);
    
    //number of words changes the end value of the loop
    
    $word_count = count($separate_words);
    
    //if just one word to search don't need and/or ability
  
    if($word_count==1){
    
    //and just one column
    
      if($count_search==1){ 
        $query .="$cols_search[0] LIKE\"%$q%\"";
        return($query);
      }
      
        //or multiple columns
      else{
        for($i=0;$i<$count_search;$i++){
          if($i<=$count_search-2){
            $query .="($cols_search[$i] LIKE \"%$q%\") or ";
          }
          else{ 
            $last_col = $count_search-1;
            $column = $cols_search[$last_col];
            $query .="($column LIKE \"%$q%\")";
          }
        }
        return($query);
      }
    }
    //more than one word
    else{
    for($h=0;$h<$count_search;$h++){
      $query .="("; 
      for($i=0;$i<$word_count;$i++){
        //loop the sql statement
        //as it loops, the last result does not have and or at the 
        //end
        
        for ($j=$word_count;$j>$i;$j--){
          //keep adding 'and' 'or' to the query
          
          if ($j<=$word_count-1){
            if($st=="2"){
              $add=" or ";
            }
            elseif($st=="1"){
              $add=" and ";
            }
          }
          else{
            $add="";
          }
        }
    //the complete query string
        $query .= "$cols_search[$h] 
                    like\"%$separate_words[$i]%\"$add ";
      }
      if($h<=$count_search-2){
        $query .=") or ";
      }
      else{
        $query .=")";
      }
    }
    return($query);
    }
  }
}
function keresett_kiemeles($str)
	{
		$string = str_replace($_POST['q'], "<b>".$_POST['q']."</b>", $str);
			
		return $string;
	}
  
function is_logged_in()
{
  if ( isset($_COOKIE['VLCS']) && isset($_COOKIE['u_id']) )
  {
    $result = mysql_query("SELECT id, login_check_string, nev FROM user WHERE
      id = ".$_COOKIE['u_id']." AND login_check_string = '".$_COOKIE['VLCS']."'");
    $db = mysql_num_rows($result);
    if ( $db == 1 )
      return true;
  }
  
  return false;
}

/**
 * void register_user(int $userID)
 * Adatbázisba írja, vagy módosítja a bejelentkezett felhasználó utolsó aktivitását.
 * Version: 1.0.090102
 */
function register_user($userID, $userName)
  {
    global $db;
    
    $online = $db->GetOne("SELECT * FROM `users_online` WHERE user_id = {$userID}");
    
    if ( empty($online) )
      $db->Execute("INSERT INTO `users_online` (time, user_id, user_name) VALUES(".time().", {$userID}, '{$userName}')");
    else
      $db->Execute("UPDATE `users_online` SET `time` = ".time()." WHERE user_id = {$userID}");
  }

/**
 * void register_visitor()
 * Adatbázisba írja, vagy módosítja a vendég utolsó aktivitását.
 * IP alapján azonosít
 * Version: 1.0.090102
 */
function register_visitor()
  {
    global $db;
    $ip = $_SERVER['REMOTE_ADDR']; 
    
    $online = $db->GetOne("SELECT * FROM `users_online` WHERE user_id = '{$ip}'");
      
    if ( empty($online) )
      $db->Execute("INSERT INTO `users_online` (time, user_id, user_name) VALUES(".time().", '{$ip}', 'visitor')");
    else
      $db->Execute("UPDATE `users_online` SET `time` = ".time()." WHERE user_id = '{$ip}'");
  }

/**
 * void clear_user_activity(int $range)
 * Törli az adatbázisból a $rang-nél régebb óta inaktív usereket. 
 */
function clear_user_activity($range)
  {
    global $db;
    
    $db->Execute("DELETE FROM `users_online` WHERE time < ".(time()-$range)."");
  }
  
function get_active_users($range)
  {
    global $db;
    
    $users = $db->GetAll("SELECT count(user_id) as db, user_id as id, user_name as nev FROM users_online WHERE time >= ".(time()-$range)." GROUP BY user_name ORDER BY db DESC");
    
    return $users;
  }

/**
 * void log_user_ip()
 * Logolja a bejelentkezett felhasználók IP-jét, az így kapott adatokat
 * később felhasználhatom az felhasználók azonosítására bejelentkezésük nélkül.
 * Version: 1.0.090102
 */
function log_user_ip()
  {
    return null;
  }
  
?>