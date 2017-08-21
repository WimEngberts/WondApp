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

function accept ()
{
	setVisibility ('selectFunction', true);
	setVisibility ('jaja', false);
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
		document.getElementById ('totalScore').innerHTML = nPoints;
		if (nPoints < 3)
			document.getElementById ('voorstel').innerHTML = 'Op grond hiervan is geen noodzaak tot overleg of insturen';
		else if (nPoints < 6)
			document.getElementById ('voorstel').innerHTML = 'Op grond hiervan adviseren wij overleg met het Alrijne wondcentrum';
		else
			document.getElementById ('voorstel').innerHTML = 'Op grond hiervan adviseren wij direct overleg met de (huis)arts';
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

function behandel ()
{
	setVisibility ('selectFunction', false);
	setVisibility ('disclaim', true);
	setVisibility ('jaja', true);
	document.getElementById ('jaja').innerHTML = 'Ik begrijp het';
}

function beoordeel ()
{
	setVisibility ('selectFunction', false);
	setVisibility ('disclaim', false);
	setVisibility ('verder', true);
	setVisibility ('terug', true);
	showPage (1);
}

function showPage (number)
{
	var page = document.getElementsByClassName ('page');
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
