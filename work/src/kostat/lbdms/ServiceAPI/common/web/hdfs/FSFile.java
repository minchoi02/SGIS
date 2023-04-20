/**
 * @FileName  : FSFile.java
 * @Project     : ndcera
 * @Date         : 2015. 1. 26. 
 * @작성자      : Jihyun Sim
 * @변경이력 :
 * @프로그램 설명 :
 */
package kostat.lbdms.ServiceAPI.common.web.hdfs;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.util.Progressable;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * @author Jihyun Sim
 * HDFS File 정보
 */
public class FSFile extends FileStatus {

	public enum FileType{FILE,DIRECTORY,SYMLINK}

	FileSystem _fileSystemRef;

	public FSFile(FileSystem fileSystem,FileStatus fs) throws IOException
	{
		super(fs.getLen(),fs.isDirectory(),
				fs.getReplication(),
				fs.getBlockSize(), fs.getModificationTime(), fs.getAccessTime(),
				fs.getPermission(), fs.getOwner(),fs.getGroup(), 
				fs.isSymlink()==true ?fs.getSymlink():null,
						fs.getPath());



		this._fileSystemRef=fileSystem;

	}

	public FSFile(FileSystem fileSystem,Path path) throws IOException
	{

		this(fileSystem,fileSystem.getFileStatus(path));

	}

	public FSFile getParent() throws IOException
	{
		//부모 경로
		Path path=this.getPath().getParent();
		if(path==null)return null;
		FileStatus fs=this._fileSystemRef.getFileStatus(path);
		FSFile fsf=new FSFile(this._fileSystemRef,fs);
		return fsf;
	}

	public FileType getFileType()
	{
		if(this.isDirectory())return FileType.DIRECTORY;
		else if(this.isFile())return FileType.FILE;
		else return FileType.SYMLINK;
	}

	public List<FSFile> getListAll() throws FileNotFoundException, IOException
	{
		List<FSFile> result=new ArrayList<FSFile>();

		FileStatus[] list=this._fileSystemRef.listStatus(this.getPath());

		for(FileStatus fs:list)
		{
			FSFile fsf=new FSFile(this._fileSystemRef,fs);
			result.add(fsf);
		}

		return result;
	}

	public List<String> readTextUTF8(int limit) throws IOException
	{
		List<String> res=new ArrayList<String>();

		if(this.isDirectory())return null;

		BufferedReader br=null;
		try {
			
			br = new BufferedReader(new InputStreamReader(this._fileSystemRef.open(this.getPath()),"UTF-8"));
			String line;
			line=br.readLine();
			res.add(line);
			
			while (line != null){
				
				if(limit>0)
				{
					if(res.size()>=limit)break;
				}
				
				line=br.readLine();
				res.add(line);
			}
			return res;
		} finally {
			br.close();
		}
	}

	public byte[] readByte() throws IOException
	{
		
		if(this.isDirectory())return null;
		
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		FSDataInputStream is=this._fileSystemRef.open(this.getPath());
		
		try {
			int n=0;
			byte[] data=new byte[16384]; 
			while ((n=is.read(data, 0, data.length))!=-1){
				buffer.write(data, 0, n);
			}
			return buffer.toByteArray();
		} finally {
			is.close();
			buffer.close();
		}
	}
	
	public void append(String text) throws IOException
	{
		if(this.isDirectory())return;
		
		FSDataOutputStream os = _fileSystemRef.append(this.getPath(),1024,
				new Progressable() {
			        public void progress() {
			            
			        } });
		
			BufferedWriter br = null;
			try {
				br = new BufferedWriter( new OutputStreamWriter( os, "UTF-8" ) );
				br.write(text);
			} finally {
				br.close();
				os.close();
			}
	}
	
	public void append(byte[] data) throws IOException
	{
		if(this.isDirectory())return;
		
		FSDataOutputStream os = _fileSystemRef.append(this.getPath(),1024,
				new Progressable() {
			
			
			        public void progress() {
			        } });
		
		try {
			os.write(data, 0, data.length);
			os.flush();
		} finally {
			os.close();
		}
	}
	
	
}
