package kostat.sop.OpenAPI3.search.query;

import org.apache.lucene.index.Term;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.TermQuery;

import com.neighborsystem.lucene.searcher.AbsQueryInfo;

public class PnuQueryInfo extends AbsQueryInfo
{

	private String pnu;
	
	public PnuQueryInfo( String sName, String pnu )
	{
		super( sName );
		this.pnu = pnu;
	}

	@Override
	public Query createQuery()
	{
		TermQuery query = new TermQuery(new Term("pnu", pnu));
		return query;
	}

}
