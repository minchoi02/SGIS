package kostat.sop.OpenAPI3.search.indexing;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.catalina.mapper.Mapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.lucene.index.IndexWriter;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import com.neighborsystem.lucene.index.AbsFilesystemIndexing;
import com.neighborsystem.lucene.index.AbsIndexing;
import com.neighborsystem.lucene.index.IIndexingHandler;

public class IndexingFromDB extends AbsFilesystemIndexing 
{
	private final Log logger = LogFactory.getLog( IndexingFromDB.class );
	
	private Map<String, String> sqlParameter;
	
	private SqlSessionFactory sqlSessionFactory;
	
	private AbsResultHandler DBResultHandler;
	
	private String strQueryName = "";
	//private String strSql
	
	public IndexingFromDB(String indexPath, SqlSessionFactory sqlFactory, Map <String,String> parameter, AbsResultHandler DBResultHandler, String strQueryName)
	{
		super( indexPath );
		this.sqlSessionFactory = sqlFactory;
		this.sqlParameter = parameter;
		this.DBResultHandler = DBResultHandler;
		this.strQueryName = strQueryName;
	}
	
	public Map< String, String > getSqlParameter()
	{
		return sqlParameter;
	}

	public void setSqlParameter( Map< String, String > sqlParameter )
	{
		this.sqlParameter = sqlParameter;
	}

	public SqlSessionFactory getSqlSessionFactory()
	{
		return sqlSessionFactory;
	}

	public void setSqlSessionFactory( SqlSessionFactory sqlSessionFactory )
	{
		this.sqlSessionFactory = sqlSessionFactory;
	}
	
	public String getQueryName(){
		return this.strQueryName;
	}
	
	@Override
	protected void execute( IndexWriter writer, IIndexingHandler handler ) throws IOException
	{
		if( logger.isDebugEnabled() )
		{
			logger.debug( "------- " + getClass() + "execute start." );
		}
		SqlSession session = sqlSessionFactory.openSession();
		Iterator< Map<String,Object> > itr = null;
		Map<String, Object> mapTmp;
		logger.info( "--------------------- selectList Start --------------------" );
		logger.info( "sqlParam : " + sqlParameter );
		
		RowBounds rouwBounds = new RowBounds(0, 100000000);
		//GeoResultHandler resultHandler;
		//List<Map<String,Object>> liIndexingSource = session.selectList( "geocoding.index", sqlParameter );
		//List<Map<String,Object>> liIndexingSource = session.selectList("geocoding.index", sqlParameter, rouwBounds);//.select( "geocoding.index", sqlParameter, arg2, arg3);
		//session.select("geocoding.index", sqlParameter, rouwBounds,  new GeoResultHandler(writer, handler));
		DBResultHandler.setHandler(handler);
		DBResultHandler.setWriter(writer);
		session.select(getQueryName(), sqlParameter, rouwBounds,  DBResultHandler);
		
		logger.info( "--------------------- selectList End --------------------" );
	}
	
	
	/**
	 * args index.sh [-p path][-c writerConfig]
	 * 
	 * @param args
	 * @throws IOException
	 *//*
	public static void main( String ... args ) throws IOException
	{
		// config 설정, 저장 path
		// -p path -c config
		
		if( args.length < 4 )
		{
//			System.out.println("index.sh [-p path] [-c writerConfig] [-L language] [-h handler]");
			System.out.println("index.sh [OPTION]... [URL]... ");
			System.exit(1);
		}
		
		Resource [] arrResource = new Resource[settings.length];
		Resource tmp = null;
		for( int i = 0, len = settings.length; i < len; i++  )
		{
			tmp = new FileSystemResource( new File( settings[i] ) );
			arrResource[i] = tmp;
		}

		AbstractApplicationContext ctx = new GenericXmlApplicationContext( arrResource );
		AbsIndexing index = (AbsIndexing) ctx.getBean( "koLotteIndexingFromOracle" );
		
		index.startIndexing();
		index = (AbsIndexing) ctx.getBean( "cnLotteIndexingFromOracle" );
		index.startIndexing();
		index = (AbsIndexing) ctx.getBean( "jpLotteIndexingFromOracle" );
		index.startIndexing();
	}*/
}

