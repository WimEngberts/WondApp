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
	showPage (0);
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
