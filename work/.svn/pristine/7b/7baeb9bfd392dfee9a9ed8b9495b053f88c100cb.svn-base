package kostat.lbdms.ServiceAPI.common.web.hdfs;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.batik.transcoder.TranscoderException;
import org.apache.hadoop.fs.FSDataInputStream;

import kostat.lbdms.ServiceAPI.common.web.exception.AlreadyCloseException;
import kostat.lbdms.ServiceAPI.common.web.exception.AlreadyExistFileException;
import kostat.lbdms.ServiceAPI.common.web.exception.NotFoundFileException;
import kostat.lbdms.ServiceAPI.common.web.exception.PermissionException;

public interface IFSClient {
	
	/**
	 * 파일시스템 유저를 변경한다
	 * @param user
	 * @throws IOException
	 */
	void changeUser(String user) throws IOException, InterruptedException;

	/**
	 * 파일시스템 파일 존재 여부 반환
	 * @param path	파일경로
	 * @return 존재여부
	 * @throws IOException
	 * @throws InterruptedException 
	 * @throws AlreadyCloseException 
	 */
	boolean isExistFile( String path ) throws IOException, InterruptedException, AlreadyCloseException;

	/**
	 * 파일정보 조회
	 * @param path	파일경로
	 * @return 파일정보
	 * @throws IOException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException 
	 */
	FSFile getFSFile(String path) throws IOException, AlreadyCloseException, NotFoundFileException;

	/**
	 * 디렉토리 생성
	 * @param path	생성경로
	 * @return 생성여부
	 * @throws IOException
	 * @throws AlreadyExistFileException
	 * @throws AlreadyCloseException
	 */
	boolean mkdir(String path) throws IOException, AlreadyExistFileException, AlreadyCloseException;

	/**
	 * 파일 삭제
	 * @param path	삭제경로
	 * @return 삭제여부
	 * @throws IOException
	 * @throws IllegalArgumentException
	 * @throws NotFoundFileException
	 * @throws AlreadyCloseException
	 */
	boolean delete(String path) throws IOException, IllegalArgumentException, NotFoundFileException, AlreadyCloseException;

	//나우드림 수정분 2016-10-27
	int deleteFile(String path);
	//end
	/**
	 * 파일 이동
	 * @param src	원본경로
	 * @param dst 목적경로
	 * @return 이동여부
	 * @throws IOException
	 * @throws AlreadyCloseException 
	 * @throws NotFoundFileException 
	 * @throws AlreadyExistFileException 
	 * @throws IllegalArgumentException 
	 * @throws PermissionException 
	 */
	boolean move(String src, String dst) throws IOException, IllegalArgumentException, AlreadyExistFileException, NotFoundFileException, AlreadyCloseException, PermissionException;

	/**
	 * 파일 이름 변경
	 * @param src	원본경로
	 * @param name	변경이름
	 * @return	변경여부
	 * @throws IOException
	 * @throws AlreadyCloseException 
	 * @throws NotFoundFileException 
	 * @throws AlreadyExistFileException 
	 * @throws IllegalArgumentException 
	 * @throws PermissionException 
	 */
	boolean rename(String src, String name) throws IOException, IllegalArgumentException, AlreadyExistFileException, NotFoundFileException, AlreadyCloseException, PermissionException;

	/**
	 * 파일 복사
	 * @param src 원본경로
	 * @param dst	목적경로
	 * @return
	 * @throws IOException
	 * @throws AlreadyCloseException 
	 * @throws NotFoundFileException 
	 * @throws AlreadyExistFileException 
	 * @throws IllegalArgumentException 
	 * @throws PermissionException 
	 */
	boolean copy(String src, String dst) throws IOException, IllegalArgumentException, AlreadyExistFileException, NotFoundFileException, AlreadyCloseException, PermissionException;

	/**
	 * 파일 목록 조회
	 * @param paths	조회경로목록
	 * @return	파일 목록
	 * @throws IOException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
	List<FSFile> getFileList(String[] paths) throws IOException, AlreadyCloseException, NotFoundFileException;
	
	/**
	 * 파일 목록 조회
	 * @param path 상위 경로
	 * @return	파일 목록
	 * @throws IOException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
	List<FSFile> getFileList(String path) throws IOException, AlreadyCloseException, NotFoundFileException;

	/**
	 * 파일 생성
	 * @param path	생성경로
	 * @param data	파일 내용
	 * @return 생성 파일 정보
	 * @throws IOException
	 * @throws IllegalArgumentException
	 * @throws AlreadyExistFileException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException 
	 */
	FSFile createFile(String path, String data) throws IOException, IllegalArgumentException, AlreadyExistFileException, AlreadyCloseException, NotFoundFileException;

	/**
	 * 파일 생성
	 * @param path	생성 경로
	 * @param in	InputStream 객체
	 * @return	생성 파일 정보
	 * @throws IOException
	 * @throws AlreadyExistFileException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
	FSFile createFile(String path, InputStream in) throws IOException,
		AlreadyExistFileException, AlreadyCloseException,
			NotFoundFileException;

	/**
	 * 파일 생성
	 * @param path 생성경로
	 * @param data	byte[]
	 * @return	생성 파일 정보
	 * @throws IOException
	 * @throws IllegalArgumentException
	 * @throws AlreadyExistFileException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
	FSFile createFile(String path, byte[] data ) throws IOException, IllegalArgumentException, AlreadyExistFileException, AlreadyCloseException, NotFoundFileException;

	/**
	 * 파일 시스템 사용량 조회
	 * @return	파일 시스템 사용량  bytes
	 * @throws IOException
	 * @throws AlreadyCloseException
	 */
	long getFileSystemUsed() throws IOException, AlreadyCloseException;
	
	/**
	 * 파일 시스템 남은 사용량 조회
	 * @return 남은 사용량  bytes
	 * @throws IOException
	 * @throws AlreadyCloseException 
	 */
	long getFileSystemRemaining() throws IOException, AlreadyCloseException;

	/**
	 * 파일 시스템 총량 조회
	 * @return	총량  bytes
	 * @throws IOException
	 * @throws AlreadyCloseException
	 */
	long getFileSystemCapacity() throws IOException, AlreadyCloseException;

	/**
	 * 홈 디렉토리 조회
	 * @return 홈 디렉토리 파일 정보
	 * @throws IOException
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 */
	FSFile getHomeDirectory() throws IOException, AlreadyCloseException, NotFoundFileException;

	/**
	 * 파일시스템 구분자로 { 경로+이름 } 조합 반환
	 * @param path			경로
	 * @param filename	이름
	 * @return 경로
	 */
	String concatHadoopFilePath(String path, String filename);

	/**
	 * 라인 수 만큼 파일 내용을 조회한다
	 * @param path			경로
	 * @param line			라인 수
	 * @return 파일 내용
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 * @throws IOException
	 */
	List<String> getFileContent(String path, int line)
			throws AlreadyCloseException, NotFoundFileException, IOException;

	/**
	 * 파일 내용을 조회한다
	 * @param path			경로
	 * @return	파일 내용 ( ByteArrayInputStream )
	 * @throws AlreadyCloseException
	 * @throws NotFoundFileException
	 * @throws IOException
	 */
	ByteArrayInputStream getFileStream(String path)
			throws AlreadyCloseException, NotFoundFileException, IOException;
	
	FSFile fileUpload(InputStream fileInputStream, String path, String fileName) throws AlreadyCloseException, AlreadyExistFileException, NotFoundFileException, IOException;

	FSDataInputStream fileDownload(String filePath) throws IllegalArgumentException, IOException;

	String getDefaultFsPath();

	void svgConvertToPngUpload(String fileName, String svg, String path) throws IllegalArgumentException, IOException, TranscoderException;
	/**
	 * @brief 파일 라인수 조회
	 * @param string
	 * @return
	 * @throws IOException 
	 * @throws IllegalArgumentException 
	 * @throws InterruptedException 
	 */
	
	void close();
	//BlockLocation[] getBlockLocations(String src) throws IOException;
}
