package sk;

import junit.framework.TestCase;
import java.util.ArrayList;

public class TestRmndrMngr extends TestCase {

	public void testGetAll() {
		try {
		RmndrMngr rmndrMngr = new RmndrMngr();
		rmndrMngr.initTbls();
		ArrayList<RmndrBean> lst = rmndrMngr.getAll();
		System.out.println( lst.size() );
		} catch( Exception e ) {
			fail( e.toString() );
		}	
	}
}
