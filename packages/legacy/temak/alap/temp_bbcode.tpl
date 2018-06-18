<html>
<head>
<title><!--CIM--> - ADMINFELÜLET</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link rel="styleSheet" href="temak/alap/style.css" type="text/css">
</head>

<body bgColor="#ffffff">
<table class="hozzaszolas" cellSpacing="3" cellPadding="3">
  <thead>
    <tr>
      <th class="name-bar">{NEV}</th>
      <th class="info-bar">
        <div class="date">{DATUM}</div>
        <div class="admin">
          <a href="admin.php?id={ID}" title="Admin: szerkesztés/törlés">
            <img src="temak/alap/gbdelmsg.gif" border="0" alt="Bejegyzés törlése" />
          </a>
        </div>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
      </td>
      <td class="text-area">
        {UZENET}
      </td>
    </tr>
  </tbody>
</table>
<br>
<center>
  <table cellSpacin="0" cellPadding="0" width="50%" border="0">
  <tr>
    <td>
      <br>
    </td>
  </tr>
  <tr>
    <td align="middle" bgColor="#306090" height="30">
      <big style="color:white"><b>V&aacute;lassz</b></big>
    </td>
  </tr>
  <tr>
    <td align="middle" bgColor="#e2e2e2">
      <form name="deleteMessage" action="admin.php" method="post">
      <input type="hidden" name="id" value="{ID}">
      <br>
      <table cellPadding="7" border="0">
        <tr>
          <td colspan="3" align="middle">
            <input type="radio" name="action" value="modify" checked>Szerkeszt <br>
            <input type="radio" name="action" value="delete">Töröl <br>
          </td>
        </tr>
        <tr>
          <td>
            <input style="font-size:8pt" type="submit">
          </td>
        </tr>
      </table>
      <br><a href="<!--INDEX-->"><b>[Vissza]</b></a>
    </td>
  </tr>
</table>
<br><br>
<!--INFO-->
</center>

</body>
</html>