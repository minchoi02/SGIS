package kostat.sop.OpenAPI3.common.coord;

import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.jhlabs.map.proj.Projection;
//import com.sun.org.apache.xalan.internal.xsltc.runtime.Hashtable;

public class ProjectionFactory
{
	private static final Log logger = LogFactory.getLog( ProjectionFactory.class );

	private Map< String, String > fProj4Codes;

	private Hashtable registry;

	private final Pattern regexSpace = Pattern.compile( "\\s" );

	public void setProj4Codes( Map< String, String > map )
	{
		fProj4Codes = map;
	}

	public Map< String, String > getProj4Codes()
	{
		return fProj4Codes;
	}

	public com.jhlabs.map.proj.Projection getProjection( String name )
	{

		if( registry == null )
		{
			registry = new Hashtable();
			Iterator< String > itr = fProj4Codes.keySet().iterator();
			com.jhlabs.map.proj.Projection proj;
			String [] arrTmp;
			String key;
			String value;
			while( itr.hasNext() )
			{
				key = itr.next();
				value = fProj4Codes.get( key );
				arrTmp = regexSpace.split( value );
				proj = com.jhlabs.map.proj.ProjectionFactory.fromPROJ4Specification( arrTmp );

				if( proj != null )
				{
					registry.put( key, proj );
				}
			}
		}

		return (Projection) registry.get( name );
	}
}
