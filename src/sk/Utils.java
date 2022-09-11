package sk;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.*;
 

class Utils {
	public static String marshal( Object jaxbObject ) {
		try {
		String otpt = "otpt.xml";
		PrintWriter pw = new PrintWriter(otpt);
		File fl = new File( otpt );
		DataInputStream fis;
		byte[] theData;

		JAXBContext context = JAXBContext.newInstance( jaxbObject.getClass() );
		Marshaller marshaller = context.createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
		marshaller.marshal(jaxbObject, pw );	
		fis = new DataInputStream( new BufferedInputStream( new FileInputStream( fl )));
		theData = new byte[ (int) fl.length() ];
		fis.readFully( theData );
		return new String( theData );	
		} catch( Exception ex ) {
			ex.printStackTrace();
		}
		return "";
	}
}
