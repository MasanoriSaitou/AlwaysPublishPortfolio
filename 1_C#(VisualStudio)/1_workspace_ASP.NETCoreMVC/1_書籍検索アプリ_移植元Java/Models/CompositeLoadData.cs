using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Models
{
    public class CompositeLoadData : ILoadData {

        private readonly List<BookDataBean> resultBeans;

        public CompositeLoadData(List<ILoadData> loaderList) {
    	
    	    resultBeans = new List<BookDataBean>();
            foreach (ILoadData loader in loaderList) {
        	
                BookDataBean[] data = loader.BookDataBeanGet();
                if (data != null) {
            	
            	    resultBeans.AddRange(data); // ← Java の addAll に相当
                }
            }
        }

        public BookDataBean[] BookDataBeanGet() {
    	
            return resultBeans.ToArray();
        }
    }
}