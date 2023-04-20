package kostat.sop.OpenAPI3.search.handler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.lucene.document.Document;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;

import com.neighborsystem.lucene.searcher.ISearchHandler;

//public class SearchingHandler implements ISearchHandler< Document>
public class SearchingHandler implements ISearchHandler< Map<String, Object> >
{
	private static final Log logger = LogFactory.getLog( SearchingHandler.class );
	
	@Override
	public Map<String, Object> handleTopDocs( IndexSearcher searcher, TopDocs topDocs, int idxStart, int idxEnd ) throws IOException
	{
		
		int i,len, doclength;
		ScoreDoc [] hits = topDocs.scoreDocs;
		List<Document> doc = new ArrayList();
		Map<String, Object> resultObj = new HashMap();
		
		if(idxEnd > topDocs.totalHits) idxEnd = topDocs.totalHits;
		
		for( i = idxStart, len = idxEnd; i < len; i++ )
		{
			doc.add(searcher.doc(hits[i].doc));
		}
		
		resultObj.put("TotalCount", topDocs.totalHits);
		resultObj.put("Document", doc);
		
		return resultObj;
	}
	

}
