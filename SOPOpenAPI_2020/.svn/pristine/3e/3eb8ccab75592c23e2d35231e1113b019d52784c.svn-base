package kostat.sop.OpenAPI3.search.document;

import java.io.IOException;
import java.util.Iterator;
import java.util.TreeSet;

import org.apache.lucene.search.DocIdSet;
import org.apache.lucene.search.DocIdSetIterator;

public class SimpleDocIdSet extends DocIdSet {

private final TreeSet<Integer> sortedDocIdSet = new TreeSet<Integer>(); 

	public void add(int docId) { 
		sortedDocIdSet.add(docId); 
	} 

	@Override
	public DocIdSetIterator iterator() throws IOException {
		return new DocIdSetIterator() { 

			private Iterator<Integer> sortedDocIdSetIterator = 
			sortedDocIdSet.iterator(); 
			private int currentDocId = -1; 

			@Override 
			public int advance(int target) throws IOException { 
				while ((currentDocId = nextDoc()) < target) { 
				} 
				return currentDocId; 
			} 

			@Override 
			public int docID() { 
				if (currentDocId == -1) { 
					return -1; 
				} 
				if (!sortedDocIdSetIterator.hasNext()) { 
					return NO_MORE_DOCS; 
				} 
				return currentDocId; 
			} 

			@Override 
			public int nextDoc() throws IOException { 
				if (!sortedDocIdSetIterator.hasNext()) { 
					return NO_MORE_DOCS; 
				} 
				currentDocId = sortedDocIdSetIterator.next(); 
				return currentDocId; 
			}

			@Override
			public long cost() {
				// TODO Auto-generated method stub
				return 0;
			} 
			 
		} ;
	}

}
