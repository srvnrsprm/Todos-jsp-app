package sk;

import junit.framework.TestCase;

public class TestSimple extends TestCase {

	public void testMe() {
		Object x = new Integer(2);
		assertEquals( "Arguments dont match", x, x );
	}
}
