package kostat.sop.OpenAPI3.search;

import java.io.File;
import java.io.IOException;

import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.store.FSDirectory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.lucene.searcher.AbsSearchingInMultipleIndexSearcher;

@SuppressWarnings( "serial" )
public class GeocodeSearching extends AbsSearchingInMultipleIndexSearcher
{
	//private static String strIndexPath = "D:/project/kostate_dev/test/index";
	private static String strIndexPath;
//	@Override
//	public void execute() throws IOException
//	{

//	}

	public GeocodeSearching(String path) {
		strIndexPath = path;
		/*try
		{
			initIndexSearcherMap();
		}
		catch( IOException e )
		{
			System.out.println( "-------------------- Ignore exception in local pc -------------------" );
			e.printStackTrace();
			System.out.println( "----------------------------------------------------------------------");
		}*/
		
	}

//	public void setIndexPath(String searching){
//		strIndexPath = searching;
//	};
	
	@Override
	public void initIndexSearcherMap() throws AbsException,IOException
	{
		// IndexSearcher 를 생성 해서 맵에 등록 시킨다.
		// path는 프로퍼티에서 가져오게 수정되어야 한다.
		//String path = "D:/project/kostate_dev/test/index";
		//FSDirectory directory = FSDirectory.open( new File( path ) );
//		System.out.println("strIndexPath"+strIndexPath);
		FSDirectory directory = FSDirectory.open( new File( strIndexPath ) );
//		RAMDirectory ramDir = new RAMDirectory(directory,IOContext.READ);          // 1
		IndexReader reader = DirectoryReader.open(directory);
		IndexSearcher searcher = new IndexSearcher( reader );
		put( KEY.KOREA.name(), searcher );
//		addSearcher( "korea", searcher );
		
		
		
       
		
	}
	
	public enum KEY
	{
		KOREA
	}

}
