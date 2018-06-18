<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
 <head>
  <title>KVSC - Kérdez Csizitől - Csizi válaszol!</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="styleSheet" href="temak/alap/style.css" type="text/css">
  <script type="text/javascript" src="js/tiny_mce/tiny_mce.js"></script>
<script language="JavaScript">

tinyMCE.init({
    mode : "textareas",
		theme : "advanced",
    auto_focus : "txta",
    plugins : "emotions,fullscreen",
    theme_advanced_toolbar_location : "top",
    theme_advanced_buttons1 : "bold,italic,underline,strikethrough,separator,"
    + "justifyleft,justifycenter,justifyright,justifyfull,"
    + "bullist,numlist,link,unlink,separator,undo,redo,cleanup,charmap",
    theme_advanced_buttons2 : "fullscreen,fontsizeselect,"
    + "forecolorpicker,backcolorpicker",
    theme_advanced_buttons3 : "emotions",
    fullscreen_new_window : true,
    fullscreen_settings : {
      theme_advanced_path_location : "top"
    },
    language : "hu"
	});
</script>

 </head>

<body>
<div id="oldal">
<a name="top"></a>
  <div id="fejlec">
    <div id="logo">
    <a href="index.php"><img src="temak/alap/stock_paste.png"  alt="Hozzászólások"></a>
    <a href="../index.php"><img src="temak/alap/stock_home.png"  alt="Vissza"></a>
    </div>
  </div>
 
  <div id="tartalom">
    <h1 class="csizi-kerdes-cim1">Kérdezz Csizitől!</h1>
    <span class="csizi-kerdes-megjegyzes"></span>
    <form action="index.php" name="form" method="post" class="csizi-kerdes-form">
      <fieldset>
        <input type="hidden" name="form" value="hozzaad">
        <textarea name="message" rows="20" cols="75" id="txta"></textarea>
        <input type="submit" name="hozzaad" class="gomb" value="Csizi válaszolj!" />
      </fieldset>
    </form>
  </div>

  <div id="lablec">
    <p class="sotetszurke kicsi">
      <a href="#top"><img src="../design/icons/bullet_arrow_up.png" alt="fel" title="A lap tetejére" /></a>
      <a href="http://validator.w3.org/check?uri=referer"><img src="../design/icons/xhtml_valid.png" alt="xhtml" title="Az oldal valid xhtml kódot használ." /></a> 
      <a href="http://jigsaw.w3.org/css-validator/check/referer"><img src="../design/icons/css_valid.png" alt="css" title="Az oldal valid css kódot használ" /></a> Š 2006-2008
    </p>
  </div>
</div>
</body>
</html>