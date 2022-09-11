package sk.tagext;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.*;
import java.util.*;
 
class Utils {
	public static String clcDrtn( Date dtVl ) {
  	float drtn = (dtVl.getTime() - new Date().getTime()) / 1000, nmbr=0;
 	 	float drtnInDays = drtn / (60 * 60 * 24 );
		String sffx="";

		if( Math.ceil( drtnInDays ) == 1 ) {
			sffx = "day";
		} else if( drtnInDays > 1 ) {
			if( Math.ceil( drtnInDays/30) ==  1 ) {
				sffx = "month";
			} else if( drtnInDays/30 > 1 ) {
				if( Math.ceil(drtnInDays/360) == 1 ) {
					sffx = "year";
				} else if( drtnInDays/360 > 1 ) {
					sffx = "years";
				} else {
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
    	return (int)Math.ceil(nmbr) + " " + sffx + " to go";
  	}
	}
}
