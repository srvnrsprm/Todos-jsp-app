package sk;

import java.util.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import javax.sql.DataSource;
import javax.naming.InitialContext;
import javax.naming.NamingException;

class RmndrMngr {
  InitialContext initial; 
  DataSource ds; 
  Connection connection;
  PreparedStatement crtTblSttmnt,  addRmndrSttmnt, updtRmndrSttmnt,   dltRmndrSttmnt,  getRmndrsSttmnt; 

	public void initTbls() throws SQLException, NamingException {
		initial = new InitialContext();
		System.out.println( "Gonna lookup for the resource java:comp/env/jdbc/postgres" );
		ds = (DataSource) initial.lookup( "java:comp/env/jdbc/postgres" );
		connection = ds.getConnection();
		crtTblSttmnt = connection.prepareStatement( "CREATE TABLE IF NOT EXISTS RMNDR ( id serial PRIMARY KEY, itmcntnt varchar(100), evntdt date )" );
		addRmndrSttmnt = connection.prepareStatement( "INSERT INTO RMNDR ( itmcntnt, evntdt ) values( ?, ? )" );
		updtRmndrSttmnt = connection.prepareStatement( "UPDATE RMNDR SET itmcntnt = ? WHERE id = ?" );
		dltRmndrSttmnt = connection.prepareStatement( "DELETE FROM RMNDR WHERE ID = ?" );
		getRmndrsSttmnt = connection.prepareStatement( "select * from rmndr where evntdt >= CURRENT_DATE order by evntdt" );
		crtTblSttmnt.executeUpdate();	
	}

	public ArrayList<RmndrBean> getAll() throws SQLException {
		System.out.println( "1sk1, getRmndrsSttmnt is " + getRmndrsSttmnt );
		ResultSet rs = getRmndrsSttmnt.executeQuery();
		ArrayList<RmndrBean> rmndrs = new ArrayList<RmndrBean>();
		while( rs.next() ) {
			int id = rs.getInt(1);
			String itmCntnt = rs.getString( 2 );
			Date evntDt = rs.getDate( 3 );
			rmndrs.add( new RmndrBean( itmCntnt, evntDt, id ) );
		}
		return rmndrs;
	}

	public void add( String itmCntnt, java.util.Date dt ) throws SQLException {
		addRmndrSttmnt.setString( 1, itmCntnt );
		addRmndrSttmnt.setDate( 2, new java.sql.Date( dt.getTime() ) );
		addRmndrSttmnt.executeUpdate();
	}

	public void update( int id, String itmCntnt ) throws SQLException {
		updtRmndrSttmnt.setInt( 2, id );
		updtRmndrSttmnt.setString( 1, itmCntnt );
		updtRmndrSttmnt.executeUpdate();
	} 

	public void delete( int id ) throws SQLException {
		dltRmndrSttmnt.setInt( 1, id );
		dltRmndrSttmnt.executeUpdate();
	}
}

