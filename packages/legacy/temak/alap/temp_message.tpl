<a name="{ID}" />

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

  <tfoot>
    <tr>
      <td colspan="2">
        <a href="#oldal">fel</a>
      </td>
    </tr>
  </tfoot>
  
  <tbody>
    <tr>
      <td>
        <img src="{AVATAR}" width="100" height="100" class="avatar"/>
        <p class="rang {RANG_NAME}">{RANG}</p>
        <ul class="info-area">
          <li>Hozzászólások: {HOZZASZOLAS_DB}</li>
          <li>H.id: #{ID}</li>
          <li><img src="temak/alap/{MEDAL}" alt="Medál" width="30" height="47" class="{MEDAL}" /></li>
        </ul>
      </td>
      <td class="text-area">
        {UZENET}
      </td>
    </tr>
  </tbody>
</table>