/**
 * @FileName  : HdfsClient.java

 * @Project     : ndcera
 * @Date         : 2015. 2. 06. 
 * @작성자      : Kangsan Kim
 * @변경이력 :
 * @프로그램 설명 :
 */
package kostat.lbdms.ServiceAPI.common.web.hdfs;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.apache.batik.transcoder.TranscoderException;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.log4j.Logger;

import kostat.lbdms.ServiceAPI.common.web.exception.AlreadyCloseException;
import kostat.lbdms.ServiceAPI.common.web.exception.AlreadyExistFileException;
import kostat.lbdms.ServiceAPI.common.web.exception.FileSystemException;
import kostat.lbdms.ServiceAPI.common.web.exception.NotFoundFileException;
import kostat.lbdms.ServiceAPI.common.web.exception.PermissionException;

public class HdfsClient implements IFSClient {

	private static Logger logger=Logger.getLogger(HdfsClient.class);
	private HadoopFileSystem fileSystem;
	public List<InputStream> arr;
	

	/**
	 * HdfsClient
	 * @throws FileSystemException
	 */
	public HdfsClient() throws FileSystemException	{
		try {
			arr = new ArrayList<InputStream>();
			System.setProperty("hadoop.home.dir", "/usr/lib/hadoop");
			this.fileSystem = new HadoopFileSystem();
		} catch (IOException | InterruptedException | URISyntaxException e) {
			FileSystemException fse = new FileSystemException();
			fse.setStackTrace( e.getStackTrace() );
			throw fse;
		} 
	}
	
	@Override
	public void finalize() {
		logger.info("fileSystem");
		int count = 0;
		
		InputStream str = null;
		while(true) {
			try {
				Thread.sleep(100);
				count++;
				
				if(count == 43200) {
					break;
				}
				
				boolean flag = false;
				for (int ii = 0; ii < arr.size(); ii++)
				{
					str = arr.get(ii);
					try {
						if (str.available() != -1) flag = true;
					} catch (IOException e) {
						
					}
					
				}
				if (flag == false) break;
			} catch (InterruptedException e) {
				logger.info(e);
			}
		}
		logger.info("fileSystem-종료");
		this.close();
		
	}

	/**
	 * HdfsClient
	 * @param uri	파일시스템 uri
	 * @throws FileSystemException
	 */
	public HdfsClient(String uri) throws FileSystemException 	{
		try {
			this.fileSystem = new HadoopFileSystem( uri, HadoopFileSystem.DEFAULT_USER );
		} catch (IOException | InterruptedException | URISyntaxException e) {
			FileSystemException fse = new FileSystemException();
			fse.setStackTrace( e.getStackTrace() );
			throw fse;
		}
	}
	
	/**
	 * HadoopFileSystem 객체 반환
	 * @return
	 */
	private HadoopFileSystem getFileSystem(){
		return this.fileSystem;
	}

	 /** {@inheritDoc} */
	@Override
	public void changeUser(String user) throws IOException, InterruptedException {
		getFileSystem().changeUser(user);
	}

	/** {@inheritDoc} */
	@Override
	public boolean isExistFile( String path ) throws IOException, InterruptedException, AlreadyCloseException {
		return getFileSystem().isExist( path );
	}

	/** {@inheritDoc} */ 
	@Override
	public FSFile getFSFile(String path) throws IOException, AlreadyCloseException, NotFoundFileException {
		return getFileSystem().getFile(path);
	}

	/** {@inheritDoc} */
	@Override
	public boolean mkdir(String path) throws IOException, AlreadyExistFileException, AlreadyCloseException {
		return getFileSystem().mkdir(path);
	}
	
	/** {@inheritDoc} */
	@Override
	public boolean delete(String path) throws IOException, IllegalArgumentException, NotFoundFileException, AlreadyCloseException {
		return getFileSystem().delete(path);
	}
	
	//나우드림 수정분 2016-10-27
	/** {@inheritDoc} */
	@Override
	public int deleteFile(String path) {
		return getFileSystem().deleteFile(path);
	}
	// end
	/** {@inheritDoc} */
	@Override
	public boolean move(String src, String dst) throws IOException, IllegalArgumentException, AlreadyExistFileException, NotFoundFileException, AlreadyCloseException, PermissionException {
		return getFileSystem().move( src, dst );
	}

	/** {@inheritDoc} */
	@Override
	public boolean rename(String path, String name) throws IOException, IllegalArgumentException, AlreadyExistFileException, NotFoundFileException, AlreadyCloseException, PermissionException {
		return getFileSystem().rename( path, name );
	}

	/** {@inheritDoc} */
	@Override
	public boolean copy(String src, String dst) throws IOException, IllegalArgumentException, AlreadyExistFileException, NotFoundFileException, AlreadyCloseException, PermissionException {
		return getFileSystem().copy( src, dst );
	}

	/** {@inheritDoc} */
	@Override
	public List<FSFile> getFileList(String[] paths) throws IOException, AlreadyCloseException, NotFoundFileException {		
		return getFileSystem().getFileList( paths );
	}
	
	/** {@inheritDoc} */
	@Override
	public List<FSFile> getFileList( String path ) throws IOException, AlreadyCloseException, NotFoundFileException {
		return getFileSystem().getFileList( path );
	}
	
	/** {@inheritDoc} */
	@Override
	public List<String> getFileContent( String path, int line ) throws AlreadyCloseException, NotFoundFileException, IOException{
		return getFileSystem().getFileContent( path, line );
	}
	
	/** {@inheritDoc} */
	@Override
	public  ByteArrayInputStream getFileStream( String path ) throws AlreadyCloseException, NotFoundFileException, IOException{
		return getFileSystem().getFileContent( path );
	}
	
	/** {@inheritDoc} */
	@Override
	public FSFile createFile(String path, InputStream in) throws IOException, AlreadyExistFileException, AlreadyCloseException, NotFoundFileException {
		return getFileSystem().createFile( path, in  );
	}

	/** {@inheritDoc} */
	@Override
	public FSFile createFile( String path, String data ) throws IOException, IllegalArgumentException, AlreadyExistFileException, AlreadyCloseException, NotFoundFileException {
		return getFileSystem().createFile( path, data );
	}

	/** {@inheritDoc} */
	@Override
	public FSFile createFile( String path, byte[] data ) throws IOException, IllegalArgumentException, AlreadyExistFileException, AlreadyCloseException, NotFoundFileException {
		return getFileSystem().createFile(path, data);
	}

	/** {@inheritDoc} */
	@Override
	public long getFileSystemUsed() throws IOException, AlreadyCloseException {
		return getFileSystem().getFileSystemUsed();
	}

	/** {@inheritDoc} */
	@Override
	public long getFileSystemRemaining() throws IOException, AlreadyCloseException {
		return getFileSystem().getFileSystemRemaining();
	}

	/** {@inheritDoc} */
	@Override
	public long getFileSystemCapacity() throws IOException, AlreadyCloseException {
		return getFileSystem().getFileSystemCapacity();
	}

	/** {@inheritDoc} */
	@Override
	public FSFile getHomeDirectory() throws IOException, AlreadyCloseException, NotFoundFileException {
		return getFileSystem().getHomeDirectory();
	}

	/** {@inheritDoc} */
	@Override
	public String concatHadoopFilePath(String path, String filename) {
		return getFileSystem().concatHadoopFilePath(path, filename);
	}

	@Override
	public FSFile fileUpload(InputStream fileInputStream, String path,
			String fileName) throws AlreadyCloseException, AlreadyExistFileException, NotFoundFileException, IOException {
		return getFileSystem().fileUpload(fileInputStream, path, fileName);
	}

	@Override
	public FSDataInputStream fileDownload(String filePath) throws IllegalArgumentException, IOException {
		return getFileSystem().fileDownload(filePath);
	}
	
	@Override
	public String getDefaultFsPath(){
		return getFileSystem().getConfiguration().get("fs.defaultFS").toString();
	}

	@Override
	public void svgConvertToPngUpload(String fileName, String svg, String path) throws IllegalArgumentException, IOException, TranscoderException {
		getFileSystem().svgConvertToPngUpload(fileName, svg, path);
	}


	@Override
	public void close() {
		getFileSystem().close();
		
	}

}
