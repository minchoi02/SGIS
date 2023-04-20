package kostat.sop.OpenAPI3.search.indexing;

import java.io.IOException;
import java.io.Reader;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.neighborsystem.lucene.index.AbsIndexing;
import com.neighborsystem.lucene.index.FileLineIndexing;
import com.neighborsystem.lucene.index.ICreateIndexWriterConfig;
import com.neighborsystem.lucene.index.IIndexingHandler;
import com.neighborsystem.lucene.index.cfg.KoreaIndexWriterConfig;

/**
 * 
 * @author neighbor21
 *
 */
public class Indexing {
	
	private static String strIndexPath = ""; 
	
	public Indexing(String strindexpath){
		this.strIndexPath = strindexpath;
	}
	
	private static String getIndexFolder(){
		return strIndexPath;
	}
	
	public static void IndexingFromTextFile(){
		//String Indexfolders = 
		//String Docfiles = "D:/project/kostate_dev/test/doc/geocodingaddress.txt";
		String Docfiles = "D:/project/kostate_dev/test/doc/mng_dt_addrrefine_0806154056.txt";
		
		ICreateIndexWriterConfig writerConfigs = new KoreaIndexWriterConfig();
		TEXTFileHandler handler = new TEXTFileHandler();
		//IndexingFromDBHandler handler = new IndexingFromDBHandler();
		
		//AbsIndexing
		//현재는 파일 하나만 인덱싱 한다.
		AbsIndexing indexer = new FileLineIndexing(getIndexFolder(), Docfiles);
		indexer.setIndexingHandler( handler );
		indexer.setIndexWriterConfig( writerConfigs );
		
		try {
			indexer.startIndexing();
		} catch (IOException e) {
			//e.printStackTrace();
			throw new RuntimeException( "IOException" );
		}		
	}
	
	public static void POIIndexingFromDB(String strQueryName){
		try{
			
			SqlSessionFactory sqlSession;
			
			Reader reader;
			reader = Resources.getResourceAsReader("lucenenindexconf/mybatis-config.xml");
						
			sqlSession = new SqlSessionFactoryBuilder().build( reader );
			
			ICreateIndexWriterConfig writerConfigs = new KoreaIndexWriterConfig();
			IIndexingHandler< Map<String,Object> > handler = new POIIndexingFromDBHandler();
			Map<String, String> sqlParam = new HashMap< String, String >();
			
			AbsIndexing indexer = new IndexingFromDB(getIndexFolder(), sqlSession, sqlParam, new POIResultHandler(), strQueryName);
			indexer.setIndexingHandler( handler );
			indexer.setIndexWriterConfig( writerConfigs );
			indexer.startIndexing();
			
		}catch(Exception e){
//			e.printStackTrace();
			throw new RuntimeException( "IOException" );
		}
			

	}	

/*
	public static void GeocodeIndexingFromDB(String strQueryName){
		try{
			Properties properties = createProperties();
			DataSource dbSource = BasicDataSourceFactory.createDataSource( properties );
			//BasicDataSourceFactory.createDataSource( properties );

			//DataSource dbSource = new DataSource(properties);// BasicDataSourceFactory.createDataSource( properties );
			
			
			SqlSessionFactoryBean sqlFactory = new SqlSessionFactoryBean();
			//SqlSessionFactory sqlFactory;
			sqlFactory.setDataSource( dbSource );
			//sqlFactory.setMapperLocations(new Resource [] { new ClassPathResource("com/neighborsystem/lotte/index/xsql/index.xsql") } );
			sqlFactory.setMapperLocations(new Resource [] { new ClassPathResource("kostat/sop/OpenAPI3/search/indexing/xsql/index.xsql") } );
			
			sqlFactory.setConfigLocation( new FileSystemResource( new File("lucenenindexconf/mybatis-config.xml")));
			
			ICreateIndexWriterConfig writerConfigs = new KoreaIndexWriterConfig();
			IIndexingHandler< Map<String,Object> > handler = new GeoIndexingFromDBHandler();
			Map<String, String> sqlParam = new HashMap< String, String >();
			
			//AbsIndexing indexer = new IndexingFromDB(getIndexFolder(), sqlFactory.getObject(), sqlParam, new GeoResultHandler(), strQueryName);
			AbsIndexing indexer = new IndexingFromDB(getIndexFolder(), sqlFactory, sqlParam, new GeoResultHandler(), strQueryName);
			indexer.setIndexingHandler( handler );
			indexer.setIndexWriterConfig( writerConfigs );
			indexer.startIndexing();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
	*/
	

	public static void GeocodeIndexingFromDB(String strQueryName){
		try{
			SqlSessionFactory sqlSession;
			
			Reader reader;
			reader = Resources.getResourceAsReader("lucenenindexconf/mybatis-config.xml");
						
			sqlSession = new SqlSessionFactoryBuilder().build( reader );
			
			ICreateIndexWriterConfig writerConfigs = new KoreaIndexWriterConfig();
			IIndexingHandler< Map<String,Object> > handler = new GeoIndexingFromDBHandler();
			Map<String, String> sqlParam = new HashMap< String, String >();
			
			AbsIndexing indexer = new IndexingFromDB(getIndexFolder(), sqlSession, sqlParam, new GeoResultHandler(), strQueryName);
			indexer.setIndexingHandler( handler );
			indexer.setIndexWriterConfig( writerConfigs );
			indexer.startIndexing();
		}catch(Exception e){
//			e.printStackTrace();
			throw new RuntimeException( "IOException" );
		}
	}	
}
