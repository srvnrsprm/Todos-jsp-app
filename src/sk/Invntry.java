package sk;
import java.util.*;
import javax.xml.bind.annotation.*;

@XmlRootElement 
public class Invntry {
	@XmlElement( name="rmndr" )
	public List<RmndrBean> rmndrs = new ArrayList<RmndrBean>();
}
