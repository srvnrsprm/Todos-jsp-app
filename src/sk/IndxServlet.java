package sk;

import javax.servlet.http.*;
import javax.servlet.annotation.*;
import javax.servlet.*;
import java.io.*;
import java.util.*;
import java.util.stream.*;

@WebServlet( urlPatterns={"/api/add", "/api/delete", "/api/get", "/hmPg"})
public class IndxServlet extends HttpServlet {
	Invntry invntry;

	public void init() {
		invntry = new Invntry();
		invntry.rmndrs.add( new RmndrBean( "Athanur amman temple statue unveiling ceremony scheduled.", new GregorianCalendar( 2022, 8,
						11 ).getTime() ));
		invntry.rmndrs.add( new RmndrBean( "Equitas bank's depositors annual conference is scheduled", new GregorianCalendar( 2022, 8, 9
).getTime() ));
	}

	public void doPost( HttpServletRequest rqst, HttpServletResponse rspns ) 
		throws ServletException, IOException {
		String rqstURI = rqst.getRequestURI();

		if( rqstURI.indexOf( "/api/add" ) >= 0 ) {
			String itmCntnt = rqst.getParameter( "itmCntnt" );
			String dtStrng = rqst.getParameter( "evntDt" );
			String dtPrts[] = dtStrng.split( "-" );
			Calendar c = new GregorianCalendar( Integer.parseInt(  dtPrts[0] ), Integer.parseInt( dtPrts[1] ) -1, Integer.parseInt(
dtPrts[2] ) ); 
			invntry.rmndrs.add( new RmndrBean( itmCntnt, c.getTime() ));
			rspns.setContentType( "text/plain" );
			rspns.getWriter().println( "OK" );			
		} else if( rqstURI.indexOf( "/api/delete" ) >= 0 ) {
			int evntId = Integer.parseInt( rqst.getParameter( "evntId" ) );
			invntry.rmndrs.remove( invntry.rmndrs.get( evntId-1 ) );
			rspns.setContentType( "text/plain" );
			rspns.getWriter().println( "OK" );
		}
	}

	public void doGet( HttpServletRequest rqst, HttpServletResponse rspns )
		throws ServletException, IOException {
		String rqstURI = rqst.getRequestURI();

		Collections.sort( invntry.rmndrs, ( RmndrBean r1, RmndrBean r2 ) -> { 
			return r1.getEvntDt().before( r2.getEvntDt() )?-1:1;
		});
		invntry.rmndrs = invntry.rmndrs.stream().filter( rmndr -> rmndr.getEvntDt().getTime() > new Date().getTime() ||
rmndr.getEvntDt().toString().substring(0,10).equals( new Date().toString().substring( 0,10 )) ).collect( Collectors.toList());
		System.out.println( "Number of reminders - " + invntry.rmndrs.size() );

		if( rqstURI.indexOf( "/api/get" ) >= 0 ) {
			rspns.setContentType( "text/xml" );
			rspns.getWriter().println( Utils.marshal( invntry ));
		} else {
			rqst.setAttribute( "invntry", invntry );
			RequestDispatcher rd = getServletContext().getRequestDispatcher( "/index.jsp" );
			rd.forward( rqst, rspns );
		}
	}
}
