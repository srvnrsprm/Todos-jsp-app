package sk.tagext;

import java.util.*;
import java.io.*; 
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;

public class DrtnTag extends TagSupport {
	private Date dt;

	public Date getDt() {
		return dt;
	}

	public void setDt( Date dt ) {
		this.dt = dt;
	}

	public int doStartTag() throws JspTagException {
		return EVAL_BODY_INCLUDE;
	}

	public int doEndTag() throws JspTagException {
		try {
			pageContext.getOut().write( Utils.clcDrtn( dt ) );
		} catch( IOException ex ) {
			throw new JspTagException( "Fatal error" );
		}
		return EVAL_PAGE;
	}

}
