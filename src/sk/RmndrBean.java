package sk;

import java.util.*;
import java.io.*;
import java.text.*;
import javax.xml.bind.annotation.XmlRootElement;
//import sk.tagext.Utils;
//import tagext.Utils;

@XmlRootElement( name="rmndr" )
public class RmndrBean implements Serializable {
    private String itmCntnt;
    private Date evntDt;
    private String dtTxt;
    private String drtn;
    private int id;
    //private int idd;
	
    public RmndrBean() {
    }

    public RmndrBean( String itmCntnt, Date evntDt, int id ) {
	this.itmCntnt = itmCntnt;
	this.evntDt = evntDt;
	this.dtTxt = new SimpleDateFormat( "dd MMM yyyy" ).format( evntDt );
	this.drtn = sk.tagext.Utils.clcDrtn( evntDt );
	this.id = id;
	//this.idd = Integer.parseInt( id );
    }
	
    /* public int getIdd() {
       return this.idd;
       }

       public void setIdd( int idd ) {
       this.idd = idd;
       } */

    public int getId() {
	return this.id;
    }

    public void setId( int id ) {
	this.id = id ;
    }

    public String getItmCntnt() {
	return this.itmCntnt;
    }

    public void setItmCntnt( String itmCntnt ) {
	this.itmCntnt = itmCntnt;
    }

    public Date getEvntDt() {
	return this.evntDt;
    }

    public void setEvntDt( Date evntDt ) {
	this.evntDt = evntDt;
	setDrtn( sk.tagext.Utils.clcDrtn( evntDt ) );
	setDtTxt( new SimpleDateFormat( "dd MMM yyyy" ).format( evntDt ) );
    }

    public String getDtTxt() {
	return this.dtTxt;
    }

    public void setDtTxt( String dtTxt ) {
	this.dtTxt = dtTxt;
    }

    public String getDrtn() {
	return this.drtn;
    }

    public void setDrtn( String drtn ) {
	this.drtn = drtn;
    }

}

