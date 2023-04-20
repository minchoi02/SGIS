package kostat.sop.OpenAPI3.search.query;

import org.apache.lucene.index.Term;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.TermQuery;

import com.neighborsystem.lucene.searcher.AbsQueryInfo;

public class BdMgtSnQueryInfo extends AbsQueryInfo
{

	private String bdMgtSn;
	
	public BdMgtSnQueryInfo( String sName, String bdMgtSn )
	{
		super( sName );
		this.bdMgtSn = bdMgtSn;
	}

	@Override
	public Query createQuery()
	{
		TermQuery query = new TermQuery(new Term("bd_mgt_sn", bdMgtSn));
		return query;
	}

}
