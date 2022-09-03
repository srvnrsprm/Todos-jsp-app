package sk;

import javax.servlet.http.*;
import javax.servlet.annotation.*;
import javax.servlet.*;
import java.io.*;
import java.util.*;
 

@WebServlet( urlPatterns={"/api/add", "/api/delete", "/api/get"})
public class IndxServlet extends HttpServlet {
	Invntry invntry;

	public void init() {
		invntry = new Invntry();
		invntry.rmndrs.add( new RmndrBean( "Vijay Deverakonda's liger movie releases.", new GregorianCalendar( 2022, 8,3 
	).getTime() ));
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
			invntry.rmndrs.remove( invntry.rmndrs.get( evntId ) );
			rspns.setContentType( "text/plain" );
			rspns.getWriter().println( "OK" );
		}
	}

	public void doGet( HttpServletRequest rqst, HttpServletResponse rspns )
		throws ServletException, IOException {
		System.out.println( "Number of reminders - " + invntry.rmndrs.size() );
		Collections.sort( invntry.rmndrs, ( RmndrBean r1, RmndrBean r2 ) -> { 
			return r1.getEvntDt().before( r2.getEvntDt() )?-1:1;
		});
		rspns.setContentType( "text/xml"); 
		rspns.getWriter().println( Utils.marshall( invntry ) );
	}

}
