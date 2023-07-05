package sk.tagext;

import junit.framework.TestCase;
import java.util.Date;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class TestUtils extends TestCase {
	private static Calendar today;

	public void setUp() {
		today = new GregorianCalendar();
	}

	/* Testing past date */
	public void testDrtnForPast() {
		Date d = new GregorianCalendar( today.get( Calendar.YEAR ), today.get( Calendar.MONTH ), today.get( Calendar.DATE )-1 ).getTime();
		assertEquals( "Past duration calculation is wrong", "-1 days to go", Utils.clcDrtn(d) );
	}

	/* Testing today's date */
	public void testDrtnForToday() {
		Date d = new GregorianCalendar( today.get( Calendar.YEAR ), today.get( Calendar.MONTH ), today.get( Calendar.DATE ) ).getTime();
		assertEquals( "Todays' duration calculation is wrong", "Just now", Utils.clcDrtn(d) );
	}

	/* Testing future date */
	public void testDrtnForFuture() {
		Date d = new GregorianCalendar( today.get( Calendar.YEAR ), today.get( Calendar.MONTH ), today.get( Calendar.DATE )+1 ).getTime();
		assertEquals( "Future duration calculation is wrong", "1 day to go", Utils.clcDrtn(d) );
	}
}
