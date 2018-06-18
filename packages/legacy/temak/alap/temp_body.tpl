<html>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
 <title><!--CIM--></title>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <link rel="styleSheet" href="temak/alap/style.css" type="text/css">
 <script type="text/javascript" src="js/makeitbetter.js"></script>
<script type="text/javascript" src="http://kvsc.extra.hu/statisztika/clickheat/js/clickheat.js"></script>
<script type="text/javascript"><!--
clickHeatSite = 'kvsc';
clickHeatGroup = encodeURIComponent(document.title);
clickHeatServer = 'http://kvsc.extra.hu/statisztika/clickheat/click.php';
initClickHeat(); //-->
</script>
</head>

<body>

<div id="oldal">
  
  <div id="fejlec">
    <h1 style="display:none">Kaposvári Vízügyi Sport Club</h1>
    <h2 style="display:none">Csizi válaszol Topik</h2>
  </div>
  
  <div class="allapotsor">
    <p class="welcome">{UDVOZLES}</p>
    <p class="actions">
      <a href="index.php?actn=sign" accesskey="s">
        <img src="temak/alap/icons/comment_add.png" width="16" height="16" alt="Hozzászólás írása" />
      </a>
      <a href="../index.php?go=profil" accesskey="p">
        <img src="temak/alap/icons/user.png" width="16" height="16" alt="Profil" />
      </a>
      <a href="../index.php" accesskey="h">
        <img src="temak/alap/icons/house.png" width="16" height="16" alt="Főoldal" />
      </a>
      <a href="../logout.php" accesskey="l">
        <img src="temak/alap/icons/user_go.png" width="16" height="16" alt="Kijelentkezés" />
      </a>
    </p>
    <p class="info-bar">{MINISTAT}</p>
    <p class="csizi-bar" style="display:{CSIZINEKVISIBLE};">{CSIZINEK}</p>
  </div>
  
  <div id="tartalom">
    <div id="navigacio">
      <div class="navigacio-elore">
        <a href="index.php?page=1">
          <img src="temak/alap/icons/arrow_last.png" width="26" height="26" alt="Utolsó oldal" />
        </a>
        <a href="index.php?page={NEXT_PAGE}">
          <img src="temak/alap/icons/arrow_left.png" width="26" height="26" alt="Következő oldal" />
        </a>
      </div>
      <div class="navigacio-form">
        <form action="index.php" method="GET">
          <input type="text" name="page" id="page" value="Oldalra ugrás" onclick="del()"/>
        </form>
      </div>
      <div class="navigacio-hatra">
        <a href="index.php?page={PREV_PAGE}">
          <img src="temak/alap/icons/arrow_right.png" width="26" height="26" alt="Előző oldal" />
        </a>
        <a href="index.php?page={FIRST_PAGE}">
          <img src="temak/alap/icons/arrow_first.png" width="26" height="26" alt="Első oldal" />
        </a>
      </div>
      <div class="clear"></div>
    </div>
    <a href="index.php?actn=sign" class="csizi-kerlek-valaszolj" style="background-color:#{SZIN};">{CSIZI_KERDES}</a>
    <!--BEJEGYZESEK-->
      <!--<div class="tl"><div class="tr"><div class="br"><div class="bl">
    <div class="online">
        <p class="cim">Nemrég itt járt</p>
        <p class="nevek"><!--JELEN-></p>
    </div>
      </div></div></div></div>-->
  </div>
  
</div>

</body>
</html>
