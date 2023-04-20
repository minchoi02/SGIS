/**
 * @FileName  : FSClient.java
 * @Project     : ndcera
 * @Date         : 2015. 1. 26. 
 * @작성자      : Jihyun Sim
 * @변경이력 :
 * @프로그램 설명 :
 */
package kostat.lbdms.ServiceAPI.common.web.hdfs;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.BlockLocation;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.FileUtil;
import org.apache.hadoop.fs.FsStatus;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.permission.FsAction;
import org.apache.hadoop.fs.permission.FsPermission;
import org.apache.hadoop.util.Progressable;
import org.apache.log4j.Logger;


/**
 * @author Jihyun Sim
 *
 */
public class FSClient {
	
	private static Logger logger = Logger.getLogger(FSClient.class);
	public static final String DEFAULT_USER = "hdfs";
	private FileSystem _fileSystem;
	private String _uri;
	private String _user;
	

	public FSClient()
	{
	}

	public FSClient(String uri)
	{
		this._uri=uri;
	}

	public void closeFileSystem() throws IOException
	{
		if(_fileSystem!=null)
		{
			_fileSystem.close();
			_fileSystem=null;
		}
	}
	public FileSystem setFileSystem(Configuration conf,String user) throws IOException
	{

		if(conf!=null)
		{

			if(_fileSystem!=null)_fileSystem.close();

			System.setProperty("HADOOP_USER_NAME", user);
			
			try {
				URI uri=null;

				if(_uri==null)
				{
					String src=conf.get("fs.defaultFS");
					uri=new URI(src);
				}
				else
					uri=new URI(_uri);

				_fileSystem = FileSystem.newInstance(uri, conf, user);
				_user=user;


			} catch (URISyntaxException e) {
				logger.info(e.getMessage());
			} catch (InterruptedException e) {
				logger.info(e.getMessage());
				
			}

		}

		return _fileSystem;
	}

	public FileSystem setFileSystem(String user) throws IOException
	{

		Configuration conf=new Configuration();
		if(_uri!=null)
		{
			conf.set("fs.defaultFS", _uri);
			conf.set("hadoop.job.ugi", user);

		}else
		{
			conf.addResource(new Path("/etc/hadoop/conf/core-site.xml"));
			conf.addResource(new Path("/etc/hadoop/conf/hdfs-site.xml"));
			conf.addResource(new Path("/etc/hadoop/conf/mapred-site.xml"));


		}

		return this.setFileSystem(conf,user);

	}

	public FileSystem getFileSystem() throws IOException
	{
		if(_fileSystem==null)_fileSystem=setFileSystem(DEFAULT_USER);

		return _fileSystem;

	}

	public boolean isExist(Path src) throws IOException
	{
		return this.getFileSystem().exists(src);
	}

	public FSFile getFSFile(Path src) throws IOException
	{

		FileSystem fs=this.getFileSystem();

		if(fs.exists(src)==false)return null;


		FSFile fsf=new FSFile(fs,fs.getFileStatus(src));

		return fsf;
	}

	public boolean mkdir(Path src,FsPermission permission) throws IOException
	{
		FileSystem fs=this.getFileSystem();

		if(fs.exists(src)==false && 
				fs.mkdirs(src, permission))
		{

			return true;
		}



		return false;
	}

	public boolean mkdir(Path src) throws IOException
	{

		return this.mkdir(src, FsPermission.getDirDefault());

	}


	public boolean delete(Path src) throws IOException
	{
		FileSystem fs=this.getFileSystem();

		if(fs.exists(src)==true && 
				fs.delete(src, true))
		{

			return true;
		}


		return false;
	}

	public boolean move(Path src,Path dst) throws IOException
	{
		FileSystem fs=this.getFileSystem();

		if(fs.exists(src)==false || fs.exists(dst)==true)return false;
		if(this.readPermission(src)==false)return false;
		if(this.writePermission(dst)==false)return false;

		fs.rename(src, dst);

		return true;
	}

	public boolean rename(Path src,String name) throws IOException
	{
		Path parent=src.getParent();
		Path dst=new Path(parent.getName()+Path.SEPARATOR+name);

		return this.move(src, dst);
	}

	public boolean copy(Path src,Path dst) throws IOException
	{
		FileSystem fs=this.getFileSystem();

		if(fs.exists(src)==false || fs.exists(dst)==true)return false;
		if(this.readPermission(src)==false)return false;
		if(this.writePermission(dst)==false)return false;

		return FileUtil.copy(this.getFileSystem(), src, this.getFileSystem(), dst,
				false, this.getFileSystem().getConf());

	}

	public boolean readPermission(Path src) throws IOException
	{
		FSFile file= this.getFSFile(src);
		FsAction group=file.getPermission().getGroupAction();
		FsAction user=file.getPermission().getUserAction();
		FsAction other=file.getPermission().getOtherAction();
		String fileUser=file.getOwner();



		if(fileUser.equalsIgnoreCase(_user))
		{
			if((user.equals(FsAction.READ)|| user.equals(FsAction.READ_WRITE)
					|| user.equals(FsAction.READ_EXECUTE)))
			{
				return true;
			}
		}else
		{
			if(		other.equals(FsAction.READ)
					|| other.equals(FsAction.READ_WRITE)
					|| other.equals(FsAction.READ_EXECUTE)
					|| group.equals(FsAction.READ)
					|| group.equals(FsAction.READ_WRITE)
					|| group.equals(FsAction.READ_EXECUTE)

					)
			{
				return true;
			}
		}


		return false;
	}

	public boolean writePermission(Path src) throws IOException
	{
		FSFile file= this.getFSFile(src);
		FsAction group=file.getPermission().getGroupAction();
		FsAction user=file.getPermission().getUserAction();
		FsAction other=file.getPermission().getOtherAction();
		String fileUser=file.getOwner();



		if(fileUser.equalsIgnoreCase(_user))
		{
			if((user.equals(FsAction.WRITE)|| user.equals(FsAction.READ_WRITE)
					|| user.equals(FsAction.WRITE_EXECUTE)))
			{
				return true;
			}
		}else
		{
			if(		other.equals(FsAction.WRITE)
					|| other.equals(FsAction.READ_WRITE)
					|| other.equals(FsAction.WRITE_EXECUTE)
					|| group.equals(FsAction.WRITE)
					|| group.equals(FsAction.READ_WRITE)
					|| group.equals(FsAction.WRITE_EXECUTE)

					)
			{
				return true;
			}
		}


		return false;
	}

	public boolean executePermission(Path src) throws IOException
	{
		FSFile file= this.getFSFile(src);
		FsAction group=file.getPermission().getGroupAction();
		FsAction user=file.getPermission().getUserAction();
		FsAction other=file.getPermission().getOtherAction();
		String fileUser=file.getOwner();



		if(fileUser.equalsIgnoreCase(_user))
		{
			if((user.equals(FsAction.EXECUTE)|| user.equals(FsAction.READ_EXECUTE)
					|| user.equals(FsAction.WRITE_EXECUTE)))
			{
				return true;
			}
		}else
		{
			if(		other.equals(FsAction.EXECUTE)
					|| other.equals(FsAction.READ_EXECUTE)
					|| other.equals(FsAction.WRITE_EXECUTE)
					|| group.equals(FsAction.EXECUTE)
					|| group.equals(FsAction.READ_EXECUTE)
					|| group.equals(FsAction.WRITE_EXECUTE)

					)
			{
				return true;
			}
		}


		return false;
	}

	public List<FSFile> getFSFiles(Path src) throws IOException
	{
		FSFile file= this.getFSFile(src);

		return file.getListAll();
	}

	@SuppressWarnings("unused")
	public BlockLocation[] getBlockLocations(Path src) throws IOException{


		FSFile file=this.getFSFile(src);

		BlockLocation[] blkLocations = this.getFileSystem().getFileBlockLocations(file, 0, file.getLen());
		int blkCount = blkLocations.length;

		for (int i=0; i < blkCount; i++) {
			String[] hosts = blkLocations[i].getHosts();
		}

		return blkLocations;
	}

	public FSFile create(Path path,InputStream in) throws IOException
	{
		FileSystem fileSystem = this.getFileSystem();
		if (fileSystem.exists(path)) {
			return null;
		}
		
		// Create a new file and write data to it.
		FSDataOutputStream out = fileSystem.create(path,new Progressable() {
			
			@Override
			public void progress() {
				// TODO 자동생성된 함수 작업내용
				
			}
		});
		
		
		if(in!=null)
		{
		
			byte[] b = new byte[1024];
			int numBytes = 0;
			while ((numBytes = in.read(b)) > 0) {
				out.write(b, 0, numBytes);
			}
			out.flush();
			in.close();	
		}
		
		out.close();
		
		return this.getFSFile(path);
	}
	
	public FSFile write(String data, Path path) throws IOException {

		FileSystem fileSystem = this.getFileSystem();
		if (fileSystem.exists(path)) {
			return null;
		}
		
		// Create a new file and write data to it.
		FSDataOutputStream os = fileSystem.create(path,new Progressable() {
			
			@Override
			public void progress() {
				// TODO 자동생성된 함수 작업내용
				
			}
		});
		
		BufferedWriter br = new BufferedWriter( new OutputStreamWriter( os, "UTF-8" ) );
		try {
			br.write(data);
		} finally {
			br.close();
			os.close();
		}
		
		return this.getFSFile(path);
	}

	public FSFile write(byte[] data, Path path) throws IOException {

		FileSystem fileSystem = this.getFileSystem();
		if (fileSystem.exists(path)) {
			return null;
		}
		
		// Create a new file and write data to it.
		FSDataOutputStream os = fileSystem.create(path,new Progressable() {
			
			@Override
			public void progress() {
				// TODO 자동생성된 함수 작업내용
				
			}
		});
		
		os.write(data, 0, data.length);
		os.flush();
		
		os.close();
		return this.getFSFile(path);
	}
	
	public FsStatus getStatus() throws IOException
	{
		FileSystem fs=this.getFileSystem();
		FsStatus status=fs.getStatus();
		return status;
	}
	
	/**
	 * @Method Name  : fileSystemUsed
	 * @작성일   : 2015. 1. 27. 
	 * @작성자   : Jihyun Sim
	 * @변경이력  :
	 * @Method 설명 : 파일시스템 사용량
	 * @return
	 * @throws IOException
	 */
	public long fileSystemUsed() throws IOException
	{
		return this.getStatus().getUsed();
	}

	/**
	 * @Method Name  : fileSystemRemaining
	 * @작성일   : 2015. 1. 27. 
	 * @작성자   : Jihyun Sim
	 * @변경이력  :
	 * @Method 설명 : 파일시스템 남은량
	 * @return
	 * @throws IOException
	 */
	public long fileSystemRemaining() throws IOException
	{
		return this.getStatus().getRemaining();
	}

	public long fileSystemCapacity() throws IOException
	{
		return this.getStatus().getCapacity();
	}

	public List<FSFile> getFSFiles(Path[] files) throws IOException
	{
		List<FSFile> list=new ArrayList<FSFile>();
		
		for(Path path:files)
		{
			FSFile fs=this.getFSFile(path);
			list.add(fs);
		}
		
		return list;
	}
	
	public FSFile getHomeDirectory() throws IOException
	{
		FileSystem fs=this.getFileSystem();
		
		return this.getFSFile(fs.getHomeDirectory());
	}

}
