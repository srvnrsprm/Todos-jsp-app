package sk;

import java.io.*; 
import java.util.*;
import javax.xml.bind.annotation.*;

@XmlRootElement
public class Invntry implements Serializable {

    @XmlElement(name="rmndr")
    public List<RmndrBean> rmndrs = new ArrayList<RmndrBean>();

    public Invntry() {
    }

    public List<RmndrBean> getRmndrs() {
	return this.rmndrs;
    }
}
