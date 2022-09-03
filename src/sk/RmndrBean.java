package sk;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.*;

@XmlRootElement( name="rmndr" )
public class RmndrBean {
	private String itmCntnt;
	private Date evntDt;
	
	public RmndrBean() {
	}

	public RmndrBean( String itmCntnt, Date evntDt ) {
		this.itmCntnt = itmCntnt;
		this.evntDt = evntDt;
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
  }
}

