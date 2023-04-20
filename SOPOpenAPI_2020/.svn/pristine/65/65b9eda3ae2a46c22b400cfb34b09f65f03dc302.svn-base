package kostat.sop.OpenAPI3.search.handler;



import java.io.IOException;
import java.util.Map;

import kostat.sop.OpenAPI3.search.address.AddressDivision;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.queryparser.classic.QueryParser;

import com.neighborsystem.lucene.index.IIndexingHandler;


public class AbsResultHandler implements ResultHandler{
	private static final Log logger = LogFactory.getLog(AbsResultHandler.class);

	//private SqlSession session;
	protected IndexWriter writer;
	protected IIndexingHandler handler;
	
	/**
	 * Init method
	 * @param writer
	 * @param handler
	 */
	/*
	public AbsResultHandler(IndexWriter writer, IIndexingHandler handler){
		//session = sqlSessionFactory.openSession();
		this.writer = writer;
		this.handler = handler;
	}
*/
	@Override
	public void handleResult(ResultContext arg0) {
		// TODO Auto-generated method stub
		
	}
	
	public void setWriter(IndexWriter writer){
		this.writer = writer;
	}

	
	public void setHandler(IIndexingHandler handler){
		this.handler = handler;
	}
	
	/*
	IndexWriter writer, IIndexingHandler handler
	public void 
	*/
	
}
