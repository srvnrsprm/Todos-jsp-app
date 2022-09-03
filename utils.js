var clcltDrtn = function( dtVl ) {
	var dtPrts = dtVl.split( "-" ), slctdDt = new Date( parseInt( dtPrts[0] ), parseInt( dtPrts[1] )-1, parseInt( dtPrts[2] )
);
	var drtn = (slctdDt.getTime() - new Date().getTime()) / 1000;
	var drtnInDays = drtn / (60 * 60 * 24 ), sffx="";

	if( Math.round( drtnInDays ) == 1 ) {
		sffx = "day";
	} else if( drtnInDays > 1 ) {
		if( Math.round( drtnInDays/30) ==  1 ) {
			sffx = "month";
		} else if( drtnInDays/30 > 1 ) {
			if( Math.round(drtnInDays/360) == 1 ) {
				sffx = "year";
			} else if( drtnInDays/360 > 1 ) {
				sffx = "years";
			}	else {
			sffx = "months";
			}
		} else {
			sffx = "days";
		}
	}
	if( sffx.indexOf( "day" ) >= 0 ) {
		nmbr = drtnInDays;
	} else if( sffx.indexOf( "month" ) >= 0 ) {
		nmbr = drtnInDays / 30;
	} else if( sffx.indexOf( "year" ) >= 0 ) {
		nmbr = drtnInDays / 365;
	}

	if( Math.floor( drtnInDays ) == -1 ) {
		return "Just now";
	} else {
		return Math.ceil(nmbr) + " " + sffx + " to go";
	}
}
