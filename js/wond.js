//------------------------------------------------------------------------------
// Copyright (c) 2015-2016, MedLex BV

//---------------------------------------------------------------------------
// Maak een div zichtbaar of onzichtbaar
//
function setVisibility(id, nVisible)
{
    var test;
    var e;
    
    e = document.getElementById(id);
    if (!e)
        alert ('id \'' + id + '\' not found!');
    test = e.style.display;
    if (nVisible == 2)
    {
        if(e.style.display == 'block')
           e.style.display = 'none';
        else
           e.style.display = 'block';
    }
    else if (nVisible == 0)
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

function door ()
{
	var tekst = document.getElementById ('suggest');
	var debridement    = document.getElementById ('fase01').checked;
	var granulatie     = document.getElementById ('fase02').checked;
	var epitheliasatie = document.getElementById ('fase03').checked;
	var infectie       = document.getElementById ('infect01').checked;
	var vochtig        = document.getElementById ('vocht02').checked;
	var html = '<h2>Ingevoerde gegevens</h2><ul><li>';
	if (!debridement)
		html += 'Geen d';
	else
		html += 'D';
	html += 'ebridement</li><li>';
	if (!granulatie)
		html += 'Geen g';
	else
		html += 'G';
	html += 'ranulatie</li><li>';
	if (!epitheliasatie)
		html += 'Geen e';
	else
		html += 'E';
	html += 'pitheliasatie</li><li>';
	if (!infectie)
		html += 'Geen w';
	else
		html += 'W';
	html += 'ondinfectie</li><li>';
	if (vochtig)
		html += 'Natte/vochtige';
	else
		html += 'Droge';
	html += ' wond</li></ul><h2>Behandeling</h2><p>';
	if (    debridement
	    && !granulatie
		&& !epitheliasatie
	    && !infectie
		&& !vochtig)
		html += 'De wond droog houden, eventueel dun zinkolie opbrengen</p>';
	else if (    debridement
			 && !granulatie
			 && !epitheliasatie
	         &&  infectie
			 &&  vochtig)
	{
		html += 'Necrose/beslag verwijderen:</p><ul><li>Chirurgisch debridement</li>'
		html += '<li>Alginaat</li>';
		html += '<li>Novuxol(r) + siliconengaas + absorberend verband - Eusol + absorberend verband</li>';
		html += '<li>Wondranden beschermen</li></ul>';
	}
	else if (    granulatie
	         && !epitheliasatie
			 && !infectie
			 && !vochtig)
	{
		html += 'Oppervlakkig:</p><ul><li>Schuimverband</li>'
		html += '<li>Eventueel hydrogel</li>';
		html += '</ul>Diep:<ul>';
		html += '<li>Kerlix(tm) AMD(tm)                                                                                                                                                       plus eventueel hydrogel</li><ul>';
	}
	else if (    granulatie
	         && !epitheliasatie
			 &&  infectie
			 &&  vochtig)
	{
		html += 'Oppervlakkig:</p><ul><li>Alginaat + Schuimverband</li>';
		html += '<li>Niet verklevend gaas</li>';
		html += '<li>Hydrofiber</li>';
		html += '<li>Schuimverband</li></ul>';
		html += 'Diep:<ul><li>Kerlix(tm) AMD(tm)</li>';
		html += '<li>Hydrofiber + Schuimverband</li>';
		html += '<li>Alginaat</li>';
		html += '<li>Wondranden beschermen</li></ul>';
	}
	else if (    epitheliasatie
			 && !infectie)
	{
		html += '<ul><li>Schuimverband</li>';
		html += '<li>Niet verklevend gaas</li>';
		html += '<li>Eventueel hydraterende huidcrème op droge nieuwe huid</li></p>';
	}
	else if (    epitheliasatie
			 &&  infectie)
	{
		html += 'Neem contact op met de arts</p>';
	}
	else
	{
		html += 'Dit is een combinatie van factoren die we nog niet hebben voorzien!</p>';
	}
	tekst.innerHTML = html;
	setVisibility ('flow', false);
	setVisibility ('suggest', true);
	setVisibility ('door', false);
}

function accept ()
{
	setVisibility ('selectFunction', true);
	setVisibility ('jaja', false);
	var img = document.createElement ('img');
	img.src = 'img/menu.png';
	img.onclick = function() { onClickMenu(); };
	img.id = 'menuimg';
	document.getElementById ('header').appendChild (img);
//	<img id="menuimg" src='img/menu.png' onclick="onClickMenu();" />
//	setVisibility ('menuimg', true);
}

function verder()
{
	if (!showPage (0))			// we hebben de laatste pagina gehad
	{
		var nPoints = 0;
		nPoints = getContribution (nPoints, 'c042', 1);
		nPoints = getContribution (nPoints, 'c043', 3);
		nPoints = getContribution (nPoints, 'c051', 1);
		nPoints = getContribution (nPoints, 'c052', 1);
		nPoints = getContribution (nPoints, 'c053', 1);
		nPoints = getContribution (nPoints, 'c062', 1);
		nPoints = getContribution (nPoints, 'c064', 1);
		nPoints = getContribution (nPoints, 'c073', 1);
		nPoints = getContribution (nPoints, 'c082', 1);
		nPoints = getContribution (nPoints, 'c083', 1);
		nPoints = getContribution (nPoints, 'c092', 1);
		nPoints = getContribution (nPoints, 'c093', 1);
		nPoints = getContribution (nPoints, 'c102', 1);
//		document.getElementById ('totalScore').innerHTML = nPoints;
		if (nPoints < 3)
			document.getElementById ('voorstel').innerHTML = 'Op grond van de ingevulde gegevens is geen noodzaak tot overleg of insturen';
		else if (nPoints < 6)
			document.getElementById ('voorstel').innerHTML = 'Op grond van de ingevulde gegevens adviseren wij overleg met het Alrijne wondcentrum';
		else
			document.getElementById ('voorstel').innerHTML = 'Op grond van de ingevulde gegevens adviseren wij direct overleg met de (huis)arts';
		setVisibility ('result', true);
		setVisibility ('overnieuw', true);
		setVisibility ('verder', false);
		setVisibility ('terug', false);
	}
}

function overnieuw ()
{
	var page = document.getElementsByClassName ('page');
	var vInput = document.getElementsByTagName ('input');

	for (var i=0; i< page.length; i++)
		page[i].style.display = 'none';
	for (var i=0; i< vInput.length; i++)
		vInput[i].checked = false;

	setVisibility ('result', false);
	setVisibility ('selectFunction', true);
	setVisibility ('overnieuw', false);
	setVisibility ('voetstand', false);
	setVisibility ('flow', true);
}

function reset ()
{
	closeMenu ();
	var page = document.getElementsByClassName ('page');
	var vInput = document.getElementsByTagName ('input');

	for (var i=0; i< page.length; i++)
		page[i].style.display = 'none';
	for (var i=0; i< vInput.length; i++)
		vInput[i].checked = false;

	setVisibility ('result', false);
	setVisibility ('overnieuw', false);
	setVisibility ('voetstand', false);
	setVisibility ('flow', true);
	if (document.getElementById ('behandel').style.display == 'block')
		setVisibility ('door', true);
	else
		showPage (1);
}

function getContribution (subTotal, szElement, value)
{
	var vElement = document.getElementById (szElement);
	
	if (vElement)
	{
		if (vElement.checked)
			subTotal += value;
	}
	
	return subTotal;
}

function terug()
{
	showPage (-1);
}

function beoordeel ()
{
	closeMenu ();
	setVisibility ('selectFunction', false);
	setVisibility ('disclaim', false);
	setVisibility ('verder', true);
	setVisibility ('terug', true);
	setVisibility ("beoordeel", true);
	setVisibility ("behandel", false);
	setVisibility ('middelen', false);
	setVisibility ('decubitus', false);
	setVisibility ('bottom', true);
	showPage (1);
}

function behandel ()
{
	closeMenu ();
	setVisibility ('selectFunction', false);
	setVisibility ('disclaim', false);
	setVisibility ('verder', false);
	setVisibility ('terug', false);
	setVisibility ("beoordeel", false);
	setVisibility ("behandel", true);
	setVisibility ('door', true);
	setVisibility ('flow', true);
	setVisibility ('middelen', false);
	setVisibility ('decubitus', false);
	setVisibility ('bottom', true);
}

function middelen ()
{
	closeMenu ();
	setVisibility ('middelen', true);
	setVisibility ('decubitus', false);
	setVisibility ('door', false);
	setVisibility ('verder', false);
	setVisibility ('terug', false);
	setVisibility ("jaja", false);
	setVisibility ('beoordeel', false);
	setVisibility ('behandel', false);
	setVisibility ('selectFunction', false);
	setVisibility ('bottom', false);
}

function decubitus ()
{
	closeMenu ();
	setVisibility ('middelen', false);
	setVisibility ('decubitus', true);
	setVisibility ('door', false);
	setVisibility ('verder', false);
	setVisibility ('terug', false);
	setVisibility ("jaja", false);
	setVisibility ('beoordeel', false);
	setVisibility ('behandel', false);
	setVisibility ('selectFunction', false);
	setVisibility ('bottom', false);
}

function showPage (number)
{
	var page = document.getElementsByClassName ('oor');		// ik vond "beoordeling" een te lang woord :)
	var n;
	var r = true;
	
	for (var i=0; i < page.length; i++)
	{
		n = parseInt (page[i].id);
		if (number == 0)
		{
		    if (page[i].style.display == 'block')
			{
				if ((i+1) < page.length)
				{
					page[i].style.display = 'none';
					page[i+1].style.display = 'block';
					i += 1;
				}
				else
					r = false;
			}
			else
				page[i].style.display = 'none';
		}
		else if (number == -1)
		{
		    if (   page[i].style.display == 'block'
			    && i > 0)
			{
				page[i-1].style.display = 'block';
				page[i].style.display = 'none';
			}
		}
		else if (n == number)
			page[i].style.display = 'block';
		else
			page[i].style.display = 'none';
	}
	
	return r;
}

function clickVoet ()
{
	var bShow = false;
	
	if (document.getElementById ('c112').checked)
		bShow = true;
	setVisibility ('voetstand', bShow);
}

function onClickFase ()
{
	var fase3 = document.getElementById ('fase03');
	var showVocht = true;
	if (   fase3
	    && fase3.checked)
		showVocht = false;
		
	setVisibility ('wondvocht', showVocht);
}

function onClickMenu ()
{
//	setVisibility ('menu', true);
	var wrap  = document.getElementById ('menuWrap');
	var vLeft = wrap.style.left;
	var vMenuWidth = document.getElementById ('menu').offsetWidth;
	
	wrap.style.width = vMenuWidth;
	if (   vLeft == '100%'
	    || vLeft == '')
	{
		var vNew = document.getElementById ('wrapper').offsetWidth;
		vNew -= vMenuWidth;
		wrap.style.left = vNew + 'px';
		document.getElementById ('menuimg').src = 'img/cancel.png';
	}
	else
		closeMenu ();
}

function closeMenu ()
{
	document.getElementById ('menuWrap').style.left = '100%';
	document.getElementById ('menuimg').src = 'img/menu.png';
//	setVisibility ('menu', false);
}
