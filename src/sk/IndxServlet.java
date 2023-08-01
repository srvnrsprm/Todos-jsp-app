package sk;

import javax.servlet.http.*;
import javax.servlet.annotation.*;
import javax.servlet.*;
import java.io.*;
import java.util.*;
import java.util.stream.*;
import java.sql.SQLException;

@WebServlet( urlPatterns={"/api/add", "/api/delete", "/api/update", "/api/get", "/hmPg", "/domPg"})
public class IndxServlet extends HttpServlet {
	Invntry invntry = new Invntry();
	ServletContext applctn;
	int itemId=0;
	RmndrMngr rmndrMngr = new RmndrMngr();

	public void init() {
		try {
			rmndrMngr.initTbls();
		} catch( Exception ex ) {
			ex.printStackTrace();
			//applctn.log( "Error in initialising the reminders list", ex );
			invntry = new Invntry();
		}
	}

	public void doPost( HttpServletRequest rqst, HttpServletResponse rspns ) 
		throws ServletException, IOException {
		String rqstURI = rqst.getRequestURI();

		System.out.format( "rqst.getRequestURI() is %s, rqst.getPathInfo() is %s\n.", rqst.getRequestURI(), rqst.getPathInfo() ); 		
		try {
			if( rqstURI.indexOf( "/api/add" ) >= 0 ) {
				String itmCntnt = rqst.getParameter( "itmCntnt" );
				String dtStrng = rqst.getParameter( "evntDt" );
        String dtPrts[];
        Calendar c;

        if( dtStrng.indexOf( '/' ) != -1 ) {
          //this handles jquery ui date object's format dd/mm/yyyy        
          dtPrts = dtStrng.split( "/" );
          System.out.println( "dtStrng is " + dtStrng );
				  c = new GregorianCalendar( Integer.parseInt(  dtPrts[2] ), Integer.parseInt( dtPrts[1] ) -1, Integer.parseInt(dtPrts[0] ) ); 
        } else {
          dtPrts = dtStrng.split("-");//dtStrng.split( "/" );
          c = new GregorianCalendar( Integer.parseInt( dtPrts[0] ), Integer.parseInt( dtPrts[1] ) -1, Integer.parseInt( dtPrts[2] ) );
        }
				rmndrMngr.add( itmCntnt, c.getTime() );
				rspns.setContentType( "text/plain" );
				rspns.getWriter().println( "OK" );
			} else if( rqstURI.indexOf( "/api/delete" ) >= 0 ) {
				rmndrMngr.delete( Integer.parseInt( rqst.getParameter( "evntId" ) ));
				rspns.setContentType( "text/plain" );
				rspns.getWriter().println( "OK" );
			} else if ( rqstURI.indexOf( "/api/update" ) >= 0 ) {
				rmndrMngr.update( Integer.parseInt( rqst.getParameter( "evntId" )), rqst.getParameter( "itmCntnt" ) );	
				rspns.setContentType( "text/plain" );
				rspns.getWriter().println( "OK" );
			}
		} catch( SQLException sqlEx ) {
			throw new ServletException( sqlEx );
		}
	}

	public void doGet( HttpServletRequest rqst, HttpServletResponse rspns )
		throws ServletException, IOException {
		String rqstURI = rqst.getRequestURI();

		try {
			invntry.rmndrs = rmndrMngr.getAll();
			if( rqstURI.indexOf( "/api/get" ) >= 0 ) {
				rspns.setContentType( "text/xml" );
				rspns.getWriter().println( Utils.marshal( invntry ));
			} else {
				rqst.setAttribute( "invntry", invntry );
        if( rqstURI.indexOf( "domPg" ) >= 0 ) {
          RequestDispatcher rd = getServletContext().getRequestDispatcher( "/dom_index.jsp" );
          rd.forward( rqst, rspns );
        } else {
          RequestDispatcher rd = getServletContext().getRequestDispatcher( "/index.jsp" );
          rd.forward( rqst, rspns );
        }
			}
		} catch( SQLException sqlEx ) {
			throw new ServletException( sqlEx );
		}
	}
}
