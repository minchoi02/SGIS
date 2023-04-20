/**
 * @FileName  : HadoopFileSystem.java

 * @Project     : ndcera
 * @Date         : 2015. 2. 06. 
 * @작성자      : Kangsan Kim
 * @변경이력 :
 * @프로그램 설명 :
 */
package kostat.lbdms.ServiceAPI.common.web.hdfs;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.FileUtil;
import org.apache.hadoop.fs.FsStatus;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.permission.FsAction;
import org.apache.hadoop.fs.permission.FsPermission;
import org.apache.hadoop.util.Progressable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kostat.lbdms.ServiceAPI.common.web.exception.AlreadyCloseException;
import kostat.lbdms.ServiceAPI.common.web.exception.AlreadyExistFileException;
import kostat.lbdms.ServiceAPI.common.web.exception.NotFoundFileException;
import kostat.lbdms.ServiceAPI.common.web.exception.PermissionException;

public class HadoopFileSystem {
	
	private static final Logger logger = LoggerFactory.getLogger(HadoopFileSystem.class);
	
	public  static final String DEFAULT_USER = "hdfs";
	
	private FileSystem fileSystem;
	private URI uri;
	private String user;
	private Configuration conf;
	
	/**
	 * HadoopFileSystem
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws URISyntaxException
	 */
	public HadoopFileSystem() throws IOException, InterruptedException, URISyntaxException{
		this( DEFAULT_USER ); 
	}
	
	/**
	 * HadoopFileSystem
	 * @param user	파일시스템 사용자
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws URISyntaxException
	 */
	public HadoopFileSystem(String user) throws IOException, InterruptedException, URISyntaxException {
		
		Configuration conf = this.getNewConfiguration();
		this.uri = new URI( conf.get("fs.defaultFS") );
		this.user = user;
		this.conf = conf;
		
		this.fileSystem = this.newFileSystem( this.uri, this.conf, this.user);
	}
	
	/**
	 * HadoopFileSystem
	 * @param uri		파일시스템 uri	
	 * @param user	파일시스템 사용자
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws URISyntaxException
	 */
	public HadoopFileSystem(String uri, String user) throws IOException, InterruptedException, URISyntaxException{
		
		Configuration conf = this.getNewConfiguration( uri, user );
		this.uri = new URI ( uri );
		this.user = user;
		this.conf = conf;
		
		this.fileSystem = this.newFileSystem( this.uri, this.conf, this.user);
	}
	
	/**
	 * 파일시스템 인스턴스 생성
	 * @throws IOException
	 * @throws InterruptedException
	 */
	public void newFileSystem() throws IOException, InterruptedException{
		if ( this.fileSystem != null ){
			this.closeFileSystem();
		}
		this.fileSystem = this.newFileSystem(this.uri, this.conf, this.user);
	}
	
	/**
	 * 파일시스템 인스턴스 생성
	 * @param uri		파일시스템 uri
	 * @param conf	파일시스템 설정정보
	 * @param user	파일시스템 유저
	 * @return	파일시스템 인스턴스
	 * @throws IOException
	 * @throws InterruptedException
	 */
	private FileSystem newFileSystem( URI uri,Configuration conf, String user ) throws IOException, InterruptedException{
		return FileSystem.newInstance( uri, conf, user);
	}
	
	/**
	 * 파일시스템 CLOSE
	 * @throws IOException
	 */
	private void closeFileSystem() throws IOException{		
		if ( this.fileSystem != null ){
			this.fileSystem.close();
			this.fileSystem = null;
		}
	}
	
	/**
	 * 설정정보를 생성한다
	 * @param uri		파일시스템 uri
	 * @param user	파일시스템 사용자
	 * @return	설정정보
	 */
	private Configuration getNewConfiguration(String uri, String user){
		Configuration conf=new Configuration();
		conf.set("fs.defaultFS", uri);
		conf.set("hadoop.job.ugi", user);
		return conf;
	}
	
	/**
	 * 설정정보를 생성한다
	 * @return	설정정보
	 */
	private Configuration getNewConfiguration(){
		Configuration conf=new Configuration();		
		conf.addResource(new Path("/etc/hadoop/conf/core-site.xml"));
		conf.addResource(new Path("/etc/hadoop/conf/hdfs-site.xml"));
		conf.addResource(new Path("/etc/hadoop/conf/mapred-site.xml"));
		return conf;
	}

	/**
	 * 파일시스템 유저변경
	 * @param user	파일시스템 사용자
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws URISyntaxException
	 */
	public void changeUser(String user) throws IOException, InterruptedException  {
		this.user = user;
		if ( this.fileSystem != null ){
			this.closeFileSystem();
		}		
		this.fileSystem = this.newFileSystem( this.uri, this.conf, this.user);
	}
	
	/**
	 * 파일시스템 파일 경로의 존재 여부를 반환한다 
	 * @param path	파일경로
	 * @return 존재여부
	 * @throws AlreadyCloseException
	 * @throws IOException
	 */
	public boolean isExist( String path ) throws AlreadyCloseException, IOException{
		if ( this.fileSystem == null ){
			throw new AlreadyCloseException("파일시스템이 이미 닫혀있는 상태입니다");
		}
		return this.fileSystem.exists( new Path( path ) );
	}
	
	/**
	 * 파일 정보 조회
	 * @param path 파일경로
	 * @return 파일정보
	 * @throws IOException
	 * @throws AlreadyCloseException 
	 * @throws NotFoundFileException 
	 */
	public FSFile getFile(String path) throws IOException, AlreadyCloseException, NotFoundFileException {
		if ( this.fileSystem == null ){
			throw new AlreadyCloseException("파일시스템이 이미 닫혀있는 상태입니다");
		}
		if( this.isExist(path) ) {
			FSFile fsf=new FSFile( this.fileSystem, this.fileSystem.getFileStatus(new Path(path) ));
			return fsf;
		} else {
			throw new NotFoundFileException("해당 경로에 파일이 존재하지 않습니다", path );
		}
	}
	
	/**
	 * 파일 내용 조회
	 * @param path		파일 경로
	 * @param limit		조회 라인 수
	 * @return
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 * @throws IOException
	 */
	public List<String> getFileContent(String path, int line) throws AlreadyCloseException, NotFoundFileException, IOException {
		FSFile file = getFile( path );
		return file.readTextUTF8( line );
	}
	
	/**
	 * 파일 내용 조회
	 * @param path	파일 경로
	 * @return	파일 ByteArrayInputSream
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 * @throws IOException
	 */
	public ByteArrayInputStream getFileContent( String path ) throws AlreadyCloseException, NotFoundFileException, IOException {
		FSFile file = getFile( path );
		return new ByteArrayInputStream(file.readByte());
	}
	
	/**
	 * 파일 목록조회
	 * @param paths	조회경로목록
	 * @return	파일 목록
	 * @throws IOException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
	public List<FSFile> getFileList( String[] paths ) throws IOException, AlreadyCloseException, NotFoundFileException
	{
		List<FSFile> list=new ArrayList<FSFile>();
		
		for(String path : paths){
			FSFile fs = this.getFile(path);
			list.add( fs );
		}
		return list;
	}
	
	/**
	 * 파일 목록 조회
	 * @param path 상위경로
	 * @return 파일 목록
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 * @throws IOException
	 */
	public List<FSFile> getFileList(String path) throws AlreadyCloseException, NotFoundFileException, IOException {
		FSFile file = this.getFile(path);
		return file.getListAll();
	}
	
	/**
	 * 폴더 생성
	 * @param path	생성폴더경로	
	 * @return 생성여부
	 * @throws IOException
	 * @throws AlreadyExistFileException 
	 * @throws AlreadyCloseException 
	 */
	public boolean mkdir( String path ) throws IOException, AlreadyExistFileException, AlreadyCloseException	{

		if ( this.fileSystem == null ){
			throw new AlreadyCloseException("파일시스템이 이미 닫혀있는 상태입니다");
		}
		
		if ( this.isExist(path) ){
			throw new AlreadyExistFileException("해당 경로에 파일이 존재합니다", path );
		}
		
		return this.fileSystem.mkdirs(new Path(path), FsPermission.getDirDefault());
	}
	
	/**
	 * 파일 삭제
	 * @param path	삭제경로
	 * @return	삭제여부
	 * @throws IOException
	 * @throws NotFoundFileException
	 * @throws AlreadyCloseException
	 */
	public boolean delete( String path ) throws IOException, NotFoundFileException, AlreadyCloseException {
		
		if ( this.fileSystem == null ){
			throw new AlreadyCloseException("파일시스템이 이미 닫혀있는 상태입니다");
		}
		
		if (  !this.isExist(path) ){
			throw new NotFoundFileException("해당 경로에 파일이 존재하지 않습니다", path );
		}
		
		return this.fileSystem.delete(new Path(path), true);

	}
	//나우드림 수정분 2016-10-27
	public int deleteFile( String path ) {
		
		if ( this.fileSystem == null ){
			return -1;
//			throw new AlreadyCloseException("파일시스템이 이미 닫혀있는 상태입니다");
		}
		try {
			if (!this.isExist(path) ){
				return -2;
			}
		} catch (AlreadyCloseException | IOException e) {
			return -2;
		}
//		return this.fileSystem.delete(new Path(path), true);
		try {
			this.fileSystem.delete(new Path(path), true);
		} catch (IOException e) {
			return -3;
		}
		return 1;

	}//end
	

	/**
	 * 파일이동 
	 * @param src	원본경로
	 * @param dst	목적경로
	 * @return	이동여부
	 * @throws IOException
	 * @throws AlreadyExistFileException
	 * @throws NotFoundFileException
	 * @throws AlreadyCloseException
	 * @throws PermissionException 
	 */
	public boolean move(String src, String dst) throws IOException, AlreadyExistFileException, NotFoundFileException, AlreadyCloseException, PermissionException {
		
		if ( this.fileSystem == null ){
			throw new AlreadyCloseException("파일시스템이 이미 닫혀있는 상태입니다");
		}
		
		// 원본파일 존재하지 않을 시
		if( !this.isExist( src ) ){
			throw new NotFoundFileException("해당 경로에 파일이 존재하지 않습니다", src );
		}
		
		// 목적경로에 파일이 이미 존재할 시
		if( this.isExist( dst ) ){
			throw new AlreadyExistFileException("이동 경로에 파일이 존재합니다", dst );
		}
		
		// 권한 오류 체크
		if ( !this.hasReadPermission(src) ){
			throw new PermissionException("읽기 조회 권한이 없습니다", src);
		}
		
		/*if ( !this.hasWritePermission( new  ) ){
			throw new PermissionException("쓰기 조회 권한이 없습니다", src);
		}*/

		return this.fileSystem.rename(new Path( src ), new Path( dst ));
	}

	/**
	 * 파일이름 변경
	 * @param path	원본경로
	 * @param name	변경이름
	 * @return	변경여부
	 * @throws AlreadyExistFileException
	 * @throws NotFoundFileException
	 * @throws AlreadyCloseException
	 * @throws IOException
	 * @throws PermissionException 
	 */
	public boolean rename(String path, String name) throws AlreadyExistFileException, NotFoundFileException, AlreadyCloseException, IOException, PermissionException {
		
		String dst= new Path(path).getParent()+Path.SEPARATOR+name;
		logger.debug("[파일이름변경] "+ path +"경로를 "+dst + "로 이동합니다" );
		return this.move(path, dst);
	}

	/**
	 * 파일 복사
	 * @param src	원본경로
	 * @param dst	복사경로
	 * @return 복사여부
	 * @throws IOException
	 * @throws AlreadyExistFileException
	 * @throws NotFoundFileException
	 * @throws AlreadyCloseException
	 * @throws PermissionException 
	 */
	public boolean copy(String src, String dst) throws IOException, AlreadyExistFileException, NotFoundFileException, AlreadyCloseException, PermissionException {
		
		if ( this.fileSystem == null ){
			throw new AlreadyCloseException("파일시스템이 이미 닫혀있는 상태입니다");
		}
		
		// 원본파일 존재하지 않을 시
		if( !this.isExist( src ) ){
			throw new NotFoundFileException("해당 경로에 파일이 존재하지 않습니다", src );
		}
		
		// 목적경로에 파일이 이미 존재할 시
		if( this.isExist( dst ) ){
			throw new AlreadyExistFileException("복사 경로에 파일이 존재합니다", dst );
		}
		
		// 권한 오류 체크
		if ( !this.hasReadPermission(src) ){
			throw new PermissionException("읽기 조회 권한이 없습니다", src);
		}
		
		/*if ( !this.hasWritePermission( new  ) ){
			throw new PermissionException("쓰기 조회 권한이 없습니다", src);
		}*/

		return FileUtil.copy( this.fileSystem, new Path(src), this.fileSystem, new Path(dst),false, this.fileSystem.getConf() );
	}
	
	/**
	 * 읽기권한 조회
	 * @param path	경로
	 * @return	권한여부
	 * @throws IOException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
	private boolean hasReadPermission( String path ) throws IOException, AlreadyCloseException, NotFoundFileException	{

		FSFile file = this.getFile(path);
		FsPermission permission = file.getPermission();
		
		FsAction groupAction = permission.getGroupAction();
		FsAction userAction = permission.getUserAction();
		FsAction otherAction = permission.getOtherAction();
		
		// 소유자가 자신인 경우
		if ( this.user.equalsIgnoreCase( file.getOwner() ) ){
			
			 return (
					    userAction.equals( FsAction.READ )  
					 || userAction.equals( FsAction.READ_WRITE )
					 || userAction.equals( FsAction.READ_EXECUTE ) );
		} else {
			// 소유자가 다른 경우
			return (		
					   otherAction.equals( FsAction.READ )
					|| otherAction.equals( FsAction.READ_WRITE )
					|| otherAction.equals( FsAction.READ_EXECUTE )
					|| groupAction.equals( FsAction.READ )
					|| groupAction.equals( FsAction.READ_WRITE )
					|| groupAction.equals( FsAction.READ_EXECUTE ) );
		}

	}
	
	/**
	 * 쓰기 권한 조회
	 * @param path	경로
	 * @return	권한여부
	 * @throws IOException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
//	private boolean hasWritePermission( String path ) throws IOException, AlreadyCloseException, NotFoundFileException {
//		
//		FSFile file = this.getFile(path);
//		FsPermission permission = file.getPermission();
//		
//		FsAction groupAction = permission.getGroupAction();
//		FsAction userAction = permission.getUserAction();
//		FsAction otherAction = permission.getOtherAction();
//
//		// 소유자가 자신인 경우
//		if ( this.user.equalsIgnoreCase( file.getOwner() ) ){
//			
//			 return (
//					       userAction.equals( FsAction.WRITE )
//					 	|| userAction.equals( FsAction.READ_WRITE )
//						|| userAction.equals( FsAction.WRITE_EXECUTE ) );
//
//		} else {
//			// 소유자가 다른 경우
//			return (	   
//					           otherAction.equals( FsAction.WRITE )
//							|| otherAction.equals( FsAction.READ_WRITE )
//							|| otherAction.equals( FsAction.WRITE_EXECUTE )
//							|| groupAction.equals( FsAction.WRITE )
//							|| groupAction.equals( FsAction.READ_WRITE )
//							|| groupAction.equals( FsAction.WRITE_EXECUTE ) );
//		}
//	}
//	
	/**
	 * 실행 권한 조회
	 * @param path	경로
	 * @return	권한여부
	 * @throws IOException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
//	private boolean hasExecPermission(String path) throws IOException, AlreadyCloseException, NotFoundFileException
//	{
//		FSFile file = this.getFile(path);
//		FsPermission permission = file.getPermission();
//		
//		FsAction groupAction = permission.getGroupAction();
//		FsAction userAction = permission.getUserAction();
//		FsAction otherAction = permission.getOtherAction();
//
//		// 소유자가 자신인 경우
//		if ( this.user.equalsIgnoreCase( file.getOwner() ) ){
//			
//			 return (
//					 userAction.equals( FsAction.EXECUTE )
//					    || userAction.equals( FsAction.READ_EXECUTE )
//						|| userAction.equals( FsAction.WRITE_EXECUTE ) );
//
//		} else {
//			// 소유자가 다른 경우
//			return (	   
//					   otherAction.equals( FsAction.EXECUTE )
//					|| otherAction.equals( FsAction.READ_EXECUTE )
//					|| otherAction.equals( FsAction.WRITE_EXECUTE )
//					|| groupAction.equals( FsAction.EXECUTE )
//					|| groupAction.equals( FsAction.READ_EXECUTE )
//					|| groupAction.equals( FsAction.WRITE_EXECUTE ) );
//		}
//	}

	/**
	 * 하둡 파일 시스템 설정정보로 경로와 파일이름을 조합한 경로를 반환한다
	 * @param path			경로
	 * @param filename	파일이름
	 * @return 경로+파일이름
	 */
	public String concatHadoopFilePath(String path, String filename) {
		return new Path( new Path(path) +Path.SEPARATOR + filename ).getName();
	}
	
	/**
	 * 파일 생성
	 * @param path	생성경로
	 * @param in	InputSteram 객체
	 * @return 생성된 파일정보
	 * @throws AlreadyExistFileException
	 * @throws AlreadyCloseException
	 * @throws IOException
	 * @throws NotFoundFileException
	 */
	public FSFile createFile(String path, InputStream in) throws AlreadyExistFileException, AlreadyCloseException, IOException, NotFoundFileException  {
		
		if ( this.isExist(path) ){
			throw new AlreadyExistFileException("해당 경로에 파일이 존재합니다", path );
		}
		
		// 파일 생성
		FSDataOutputStream out = this.fileSystem.create( new Path( path ) ,new Progressable() {
			
			@Override
			public void progress() {
				// 생성 진행 callback
				
			}
		});
		try{
			if( in!=null ) {
				try {
					byte[] b = new byte[1024];
					int numBytes = 0;
					while ((numBytes = in.read(b)) > 0) {
						out.write(b, 0, numBytes);
					}
					out.flush();
				} catch( IOException ee ){
					throw ee;
				} finally {
					in.close();
				}
			}
		}catch( IOException ioe ){
			throw ioe;
		} finally {
			out.close();
		}
		// 생성된 파일 반환
		return this.getFile(path);
	}

	/**
	 * 파일 생성
	 * @param path	생성 경로
	 * @param data	파일 내용
	 * @return 생성된 파일정보
	 * @throws IOException
	 * @throws AlreadyExistFileException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException 
	 */
	public FSFile createFile(String path, String data) throws IOException, AlreadyExistFileException, AlreadyCloseException, NotFoundFileException {
		
		if ( this.isExist(path) ){
			throw new AlreadyExistFileException("해당 경로에 파일이 존재합니다", path );
		}
		
		// 파일 생성
		FSDataOutputStream out = this.fileSystem.create( new Path( path ) ,new Progressable() {
			
			@Override
			public void progress() {
				// 생성 진행 callback
				
			}
		});
		
		BufferedWriter br = null;
		try {		
			br =new BufferedWriter( new OutputStreamWriter( out, "UTF-8" ) );
			br.write(data);
		}catch( IOException ioe ){
			throw ioe;
		} finally {
			br.close();
			out.close();
		}
		// 생성된 파일 반환
		return this.getFile(path);
	}
	
	/**
	 * 파일 생성
	 * @param path	생셩 경로
	 * @param data  byte[] 
	 * @return 생성된 파일정보
	 * @throws IOException
	 * @throws AlreadyExistFileException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
	public FSFile createFile(String path, byte[] data) throws IOException, AlreadyExistFileException, AlreadyCloseException, NotFoundFileException {
		
		if ( this.isExist(path) ){
			throw new AlreadyExistFileException("해당 경로에 파일이 존재합니다", path );
		}
		
		// 파일 생성
		FSDataOutputStream out = this.fileSystem.create( new Path( path ) ,new Progressable() {
			
			@Override
			public void progress() {
				// 생성 진행 callback
				
			}
		});
		
		try {
			out.write(data, 0, data.length);
			out.flush();
			out.close();
		}catch( IOException ioe ){
			throw ioe;
		} finally {
			out.close();
		}
		// 생성된 파일 반환
		return this.getFile(path);
	}

	/**
	 * 파일시스템 상태 조회
	 * @return	파일시스템 상태
	 * @throws IOException
	 * @throws AlreadyCloseException 
	 */
	private FsStatus getStatus() throws IOException, AlreadyCloseException {
		if ( this.fileSystem == null ){
			throw new AlreadyCloseException("파일시스템이 이미 닫혀있는 상태입니다");
		}
		return this.fileSystem.getStatus();
	}

	/**
	 * 파일 시스템 사용량 조회
	 * @return 사용량 bytes
	 * @throws IOException
	 * @throws AlreadyCloseException
	 */
	public long getFileSystemUsed() throws IOException, AlreadyCloseException {
		return this.getStatus().getUsed();
	}

	/**
	 * 파일 시스템 남은 사용량 조회
	 * @return 남은 사용량 bytes
	 * @throws IOException 
	 * @throws AlreadyCloseException 
	 */
	public long getFileSystemRemaining() throws AlreadyCloseException, IOException {
		return this.getStatus().getRemaining();
	}

	/**
	 * 파일 시스템 총량 조회
	 * @return	총량 bytes
	 * @throws IOException 
	 * @throws AlreadyCloseException 
	 */
	public long getFileSystemCapacity() throws AlreadyCloseException, IOException {
		return this.getStatus().getCapacity();
	}

	/**
	 * Home 디렉토리 조회
	 * @return	Home 디렉토리
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 * @throws IOException
	 */
	public FSFile getHomeDirectory() throws AlreadyCloseException, NotFoundFileException, IOException {
		if ( this.fileSystem == null ){
			throw new AlreadyCloseException("파일시스템이 이미 닫혀있는 상태입니다");
		}
		
		return this.getFile( this.fileSystem.getHomeDirectory().toString() );
	}

	public FSFile fileUpload(InputStream fileInputStream, String path,
			String fileName) throws AlreadyCloseException, AlreadyExistFileException, IOException, NotFoundFileException {
		String fileCheck ="";
		System.out.println("업로드 시작 path : " + path);
		if(!this.isExist(path)){
			this.fileSystem.mkdirs(new Path(path));
		}
			fileCheck = path+fileName;
			if ( this.isExist(fileCheck) ){
				throw new AlreadyExistFileException("해당 경로에 파일이 존재합니다" );
			}
			
			// 파일 생성
			FSDataOutputStream out = this.fileSystem.create( new Path( fileCheck ) ,new Progressable() {
				
			
				@Override
				public void progress() {
					// 생성 진행 callback
				}
			});
			try{
				
				if( fileInputStream!=null ) {
					try {
						byte[] b = new byte[1024];
						int numBytes = 0;
						while ((numBytes = fileInputStream.read(b)) > 0) {
							out.write(b, 0, numBytes);
						}
//						out.flush();
					} catch( IOException ee ){
						throw ee;
					} finally {
						fileInputStream.close();
					}
				}
			}catch( IOException ioe ){
				throw ioe;
			} finally {
				out.close();
			}
			
		return this.getFile(fileCheck);
	}

	public FSDataInputStream fileDownload(String filePath) throws IllegalArgumentException, IOException {
		
		FileStatus[] fsStatus = fileSystem.listStatus(new Path("/"));
		for(int i = 0; i < fsStatus.length; i++){
		   System.out.println(fsStatus[i].getPath().toString());
		}
		
		
		FSDataInputStream input = this.fileSystem.open(new Path(filePath));
		
		
		return input;
	}

	/*public BlockLocation[] getBlockLocations(Path src) throws IOException{


		FSFile file=this.getFSFile(src);

		BlockLocation[] blkLocations = this.getFileSystem().getFileBlockLocations(file, 0, file.getLen());
		int blkCount = blkLocations.length;

		for (int i=0; i < blkCount; i++) {
			String[] hosts = blkLocations[i].getHosts();
		}

		return blkLocations;
	}*/
	
	/**
	 * @brief Configuration 정보 가져오기
	 * @return
	 */
	public Configuration getConfiguration(){
		return this.fileSystem.getConf();
	}
	
	/**
	 * @brief pdf 파일 생성
	 * @return
	 * @throws IOException 
	 * @throws IllegalArgumentException 
	 * @throws URISyntaxException 
	 * @throws InterruptedException 
	 */
	public String makePdf() throws IllegalArgumentException, IOException, InterruptedException, URISyntaxException {
		
		return null;
	}
	
	/**
	 * @brief svg 데이터 png로 변환해서 업로드
	 * @param fileName
	 * @param svg
	 * @param path
	 * @throws IOException 
	 * @throws IllegalArgumentException 
	 * @throws TranscoderException 
	 */
	public void svgConvertToPngUpload(String fileName, String svg, String path) throws IllegalArgumentException, IOException, TranscoderException {
		if(!this.fileSystem.isDirectory(new Path (path))){
			this.fileSystem.mkdirs(new Path(path));
		}
		String filePath = path + fileName;
		StringReader reader = new StringReader(svg);
        TranscoderInput inputSvg = new TranscoderInput(reader); 
        FSDataOutputStream outputStream = null;
        try{
        	outputStream = this.fileSystem.create( new Path( filePath));  
        	TranscoderOutput outputPng = new TranscoderOutput(outputStream);              
        	PNGTranscoder my_converter = new PNGTranscoder();
        	my_converter.transcode(inputSvg, outputPng);
        	outputStream.flush();
        }finally{
        	if(outputStream != null) outputStream.close();
        }
	}
	
	public String executeCommand(String command) throws InterruptedException, IOException{
		Process p = Runtime.getRuntime().exec(command);
		p.waitFor();
		BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream(), "UTF-8"));
		try {
			String line = null;
			while (null != (line = reader.readLine())) {
				logger.info(line);
			}
			logger.info("END");
			return line;
		} finally {
			reader.close();
		}
	}

	public void close()  {
		try {
			if(this.fileSystem!=null)
			this.fileSystem.close();
		} catch (IOException e) {
			logger.info(e.getMessage());
		}
		
	}
}