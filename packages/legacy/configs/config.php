<?PHP
/****************************
# Ts - vendégkönyv
# verzió: 0.1
# config.php
****************************/

$cfg['local']['index'] = "index.php"; // indexfájl

// nem teszi elérhetővé, hogy a fájlt kívülről megnyissák
if(!defined("INGB"))
{
  header("LOCATION:".$cfg['local']['index']."");
  die();
}

/*******************************
# Lokális változók
******************************/

$cfg['local']['bejegyzesek'] = "db/bejegyzesek.txt";

$cfg['local']['tema'] = "alap"; // A téma amit használni szeretnél

$cfg['local']['temaPatch'] = "temak/";  // A témák könyvtárainak elérési útvonala, fonos, hogy "/" -jelre végződjön.

$cfg['local']['smileiPatch'] = "szmajlik/";  // A témák könyvtárainak elérési útvonala, fonos, hogy "/" -jelre végződjön.

$cfg['local']['fooldalUrl'] = "http://ts0.uw.hu/munka/kvsc/index.php"; // A kezdolap közvetlen elérése. A visszalinkeknél van szerepe.

/*******************************
# Működést befojásoló változók
******************************/

$cfg['conf']['bejegyzeslimit'] = 5; // Bejegyzések száma egy oldalon.

$cfg['conf']['idozona'] = 0; // időzóna GMT +/-
                            // Csak akkor használd, ha a szerver beállítások nem a te időzónádra vannak állítva

$cfg['conf']['datumFormatum'] = "Y.m.d H:i:s"; // Dátum formátuma alapesetben Y.m.d H:i:s
                                        //PHP.net segít : http://hu2.php.net/manual/hu/function.date.php
                                        // time() függvényből lesz átalakítva a dátum

$cfg['conf']['BBkod'] =  true;  // Engedélyezi az üzenetekben a BBkódok használatát

$cfg['conf']['Html'] =  true; // Engedélyezi az üzenetekben a HTML kódokat

$cfg['conf']['HtmlTags']  = "<a><p><strong><em><u><h1><h2><h3><h4><h5><h6><img>"; 
$cfg['conf']['HtmlTags'] .= "<li><ol><ul><span><div><br><ins><del>"; 

$cfg['conf']['smilei'] =  true;

$cfg['conf']['emailKitoltesKotelezo'] = false;

$cfg['conf']['weblapKitoltesKotelezo'] = false;

$cfg['conf']['koszono'] = false; // Ha be van kapcsolva: az üzenet elküldése után kijön egy köszönő lap.
                                // Ha ki van kapcsolva: az üzenet elküldése után ugrik a főoldalra.

$cfg['conf']['antiSpam'] = true; // Az e-mailcímekben cseréli a @-ot és a .-ot.

$cfg['conf']['badWorldFilter'] = true;  // Bekapcsolva kiszűri az üzenetekből a tiltott szavakat.
                                        // Az üzenet kiírásaokr szűr, így az adatbázisban benne lesznek a tiltott szavak.

// Ha a 'badWorldFilter' be van kapcsolva. 
// Itt adhatod meg a szűrendő szavakat. ("szo1', "szo2",)
$cfg['conf']['badWorlds'] = array(
"kurva", 
"hülye", 
"fasz", 
"geci",
"basz",
"koksz"
);

// 'smilei' támogatás be van kapcsolva
// "smilei kód" => array("smilei_fajl.nev", "smilei_nev"),
$cfg['conf']['smilei'] = array(
":)" => array("emoticon_smile.png", ""),
":D" => array("emoticon_happy.png", ""),
":o" => array("emoticon_surprised.png", ""),
":p" => array("emoticon_tongue.png", ""),
":(" => array("emoticon_unhappy.png", ""),
":grin:" => array("emoticon_grin.png", ""),
":evilgrin:" => array("emoticon_evilgrin.png", ""),
":waii:" => array("emoticon_waii.png", ""),
":lol:" => array("emoticon_lol.gif", ""),
":wink:" => array("emoticon_wink.png", "")
);

$cfg['lang']['kukac'] = "[kukac]"; // Erre cseréli a @-ot.

$cfg['lang']['pont'] = "[pont]"; // Erre cseréli a .-ot.

$cfg['lang']['lang'] = "hu"; // A felület nyelve.



/*******************************
# Smarty Variables
******************************/

$cfg['smarty']['IncludePath'] = "../inc/smarty/Smarty.class.php";
$cfg['smarty']['CompileCheck'] = true;
$cfg['smarty']['debugging'] = true;
$cfg['smarty']['TemplateDir'] = "../../csizi/templates";
$cfg['smarty']['CompileDir'] = "../../csizi/templates_c";
$cfg['smarty']['ConfigDir'] = "../../csizi/configs";


/*******************************
# WordPress Variables
******************************/
$cfg['wp']['root'] = "../blog/";



/*******************************
# Csizi-féle Szuper Konstansok
******************************/

// Jópofa-egyedi rangok
$CsiziSuperRang = array(
  "chief" => "Chief",
  "valaszolo" => "Válaszoló",
  "zsir" => "Ms.Zsír",
  "fizikus" => "Mr.Fizikus",
  "senki" => "Senki",
  "mr2" => "Mr.200",
  "mr4" => "Mr.400",
  "mr5" => "Mr.500",
  "mr8" => "Mr.800"
);

// Automatikus rangok
$CsiziRang = array(
  1 => array("ujonc", "Újonc"),
  2 => array("kerdezo", "Kérdező"),
  3 => array("lkerdezo", "Lelkes kérdező"),
  4 => array("fanatikus", "Fanatikus kérdező"),
  5 => array("fuggo", "Csizi függő"),
  6 => array("nemtud", "Semmit se tud"),
);

// Medálok
$CsiziMedal = array(
  1 => "arany.png",
  2 => "ezust.png",
  3 => "bronz.png",
);

$CsiziAvatarPath = "../upload/userpic/avatar/";

// Ranghatár 0-10 | 11-30 | 31 - 60 | 61 - 100 | 150->
$CsiziRangHatar = array( 0, 10, 30, 60, 100, 150 ); 