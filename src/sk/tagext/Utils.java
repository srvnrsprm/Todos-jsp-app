package sk.tagext;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.*;
import java.util.*;

/**
	* This is the utility class that converts a date argument into a duration string.
	* @author Sk
	* @version 1.0
*/
public class Utils {
	/**
		* This method returns the duration string for the passed date argument
		* @param Date The date whose duration from today needs to be calculated
		* @return String date converted to interval string
	*/
	public static String clcDrtn( Date dtVl ) {
		long evntDt = (dtVl.getTime() + new GregorianCalendar( 1970, 0, 1).getTimeZone().getRawOffset()) / (1000 * 60 * 60 * 24);
		long todayDt = (long)Math.floor( new Date().getTime() + new GregorianCalendar( 1970, 0, 1).getTimeZone().getRawOffset() )/ (1000 * 60 * 60 * 24);
  	long drtnInDays = evntDt - todayDt, nmbr=0;
		String sffx="";

		if( drtnInDays >= 365 ) {
			if( drtnInDays == 365 ) sffx = "year";
			else sffx = "years";
    	nmbr = drtnInDays / 365;
		} else if( drtnInDays >= 30 ) {
    	nmbr = drtnInDays / 30;
			if( nmbr == 1 ) sffx = "month";
			else sffx = "months";
		} else {
			if( drtnInDays == 1 ) sffx = "day";
			else sffx = "days";
			nmbr = drtnInDays;
		}

  	if( drtnInDays==0 ) {
    	return "Just now";
  	} else {
    	return nmbr + " " + sffx + " to go";
  	}
	}
}
