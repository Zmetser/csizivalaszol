<?
/*****************************
# Elk�sz�ti a Csizi v�laszol statisztik�j�t
# 1.1
*****************************/

	$keres = "SELECT * FROM csizi ORDER BY id DESC";
	$query = mysql_query($keres);
	

	$csizi = 0;
	while($sor = mysql_fetch_assoc($query))
		{
			extract($sor);
			//nevek t�mbbe rendezve
			$nevekArray[$id] = $nev;
			// Csizi �zeneteinek sz�ma
			if($nev === "Csizibaggio") { $csizi++; }
		
		}
		
		//echo print_r($napArray);
		
	

  $nevekDarab = count($nevekArray);
  $nevek = array_count_values($nevekArray);
  $kerdesek = $nevekDarab-$csizi;
  $csiziSzazalek = round(($csizi/$nevekDarab)*100, 2);


  arsort($nevek);
  reset($nevek);
  $adatok = NULL;
  for($i=0; (list($key,$val) = each($nevek)) && $i < 4; $i++)
	{
		$adatok .=  $key.".".$val."|";
	}
  $nevESszam = explode("|", $adatok);
  $elso = explode(".", $nevESszam[1]);
  $masodik = explode(".", $nevESszam[2]);
  $harmadik = explode(".", $nevESszam[3]);
  
  $ermesSz1 = round(($elso[1]/$kerdesek)*100, 2);
  $ermesSz2 = round(($masodik[1]/$kerdesek)*100, 2);
  $ermesSz3 = round(($harmadik[1]/$kerdesek)*100, 2);
  $ermesekSz = $ermesSz1+$ermesSz2+$ermesSz3;
  
  $stat = "�sszesen <b>".$nevekDarab."</b> hozz�sz�l�s �rkezett, <b>".count($nevek)."</b> hozz�sz�l�t�l. <br/>";
  $stat.= "<b>Csizi</b> �sszesen <b>".$csizi."</b> v�laszt adott <b>".$kerdesek."</b> k�rd�sre ami az �sszes hozz�sz�l�s <b>".$csiziSzazalek."%</b>-a.<br/>";
  $stat.= "Arany�rmes k�rdez�: <font color=\"red\"><b>".$elso[0]."</font> ".$elso[1]."</b> k�rd�ssel. A k�rd�sek <b>".$ermesSz1."%</b>-�t birtokolja.<br/>
  Ez�st�rmes k�rdez�: <b>".$masodik[0]." ".$masodik[1]."</b> k�rd�ssel. A k�rd�sek <b>".$ermesSz2."%</b>-�t birtokolja.<br/> 
  Bronz�rmes k�rdez�: <b>".$harmadik[0]."".$harmadik[1]."</b> k�rd�ssel. A k�rd�sek <b>".$ermesSz3."%</b>-�t birtokolja.<br/> ";
  $stat.= "A h�rom �rmes �sszesen a k�rd�sek <b>".$ermesekSz."%</b>-�t birtokolja.<br/>";
  $stat.= "<h3>Eddigi �sszes k�rdez�</h3>";
  
  arsort($nevek);
  $stat.= '<table width="100%" border="1px" cellspacing="0" cellpadding="0">
			<tr>
			<td><b>N�v</b></td>
		    <td><b>K�rd�sek sz�ma</b></td>
		    <td><b>Sz�zal�kos ar�ny</b></td>
		    <td><b>Rang</b></td>
			</tr>
	';
	while(list($key,$val) = each($nevek))
		{
			if($key === "Csizibaggio")
				{
					continue;
				}
			else
				{
					/*$query = mysql_query("SELECT id, nev, rang FROM user WHERE `nev` = '".$key."'");
					echo "SELECT id, nev, rang FROM user WHERE `nev` = '".$key."'";
					$f = mysql_fetch_row($query);*/
					$szazalek = round(($val/$kerdesek)*100, 2);
					$stat.= '<tr>
								<td>'.$key.'</td>
							    <td align="center">'.$val.'</td>
							    <td align="center">'.$szazalek.'%</td>
							    <td align="center"></td>
							</tr>';
				}
		}
		
	mysql_free_result($query);
		
	//$alter = mysql_query("ALTER TABLE `csizi` ADD `nap` VARCHAR( 6 ) NOT NULL");
	/*$keres = "SELECT id,datum FROM csizi";
	$query = mysql_query($keres);
		while($f = mysql_fetch_object($query))
			{
				$q = mysql_query("UPDATE `csizi` SET `nap` = '".date("ymd",$f->datum)."' WHERE `id` = ".$f->id." LIMIT 1");
				$datum = $f->datum;
			}
	$count = mysql_query("SELECT nap, COUNT(nap) AS db FROM csizi GROUP BY nap ORDER BY db ASC");
		while($f = mysql_fetch_object($count))
			{
				$napDarab[$f->nap] = $f->db;
			}
	$elso = mktime(0,0,0,7,31,2006);
	$kivon = $datum - $elso;
	$napiatlag = $nevekDarab / date("z", $kivon);
	$stat.= "<br />Eddig �tlag ~".round($napiatlag,2)." hozz�sz�l�s �rkezett naponta. A topik ".date("z", $kivon)." napja �zemel.";
	$hatralevoNapok = 365 - date("z");
	$plusszhozzaszolas = $napiatlag * $hatralevoNapok;
	$evvegere = $plusszhozzaszolas + $nevekDarab;
	$stat.= "<br />Teh�t ha az �tlag nem v�ltozik akkor az �v v�g�re ".round($plusszhozzaszolas)." hozz�sz�l�ssal lesz t�bb, mint a mostani. �gy v�rhat�an az �v v�g�re ".round($evvegere)."db hozz�sz�l�ssal fogunk b�szk�lkedni.";
	$szazalek2 = ($evvegere / $nevekDarab)*100;
	$stat.= "<br /> Ez ".round($szazalek2,2)." %-os n�veked�st jelent."*/

	

?>