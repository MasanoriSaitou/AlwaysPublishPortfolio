//仕様④パッケージ化をする
package todo.model.beans;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

//仕様①クラスを「public」指定する
//仕様③「java.io.Serializable」インターフェースを実装(implements)する
public class BookDataBean implements Serializable{
	
	private static final long serialVersionUID = 1L;

	//仕様⑥メンバ変数は全てprivateにする
	private	String    fictitiousISBN;      //架空ISBNコード
	private String    bookName;            //本のタイトル
	private String    author;              //著者
	private LocalDate publicationDate;     //発刊日
	private String    issuer;			   //発行者
	private String    publisher;		   //発行所
	private String    printingShop;		   //印刷所
	
	//仕様⑤各プロパティに対するアクセサーが定義されている
	//※eclipseには自動的にアクセサーを作ってくれる機能がある
	//「右クリック」⇒「ソース」⇒「getterおよびsetterの生成」
	public String getFictitiousISBN() {
		return fictitiousISBN;
	}
	public void setFictitiousISBN(String fictitiousISBN) {
		this.fictitiousISBN = fictitiousISBN;
	}
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public LocalDate getPublicationDate() {
		return publicationDate;
	}
	public void setPublicationDate(LocalDate publicationDate) {
		this.publicationDate = publicationDate;
	}
	public String getIssuer() {
		return issuer;
	}
	public void setIssuer(String issuer) {
		this.issuer = issuer;
	}
	public String getPublisher() {
		return publisher;
	}
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	public String getPrintingShop() {
		return printingShop;
	}
	public void setPrintingShop(String printingShop) {
		this.printingShop = printingShop;
	}
	
	//仕様②引数なし「コンストラクタ」を定義する
	public BookDataBean() {
		
		initializeField();
	}
	
	public BookDataBean(String[] strs) {
		
		initializeField(strs);
	}
	
	private void initializeField() {
		
		fictitiousISBN = "";
		bookName = "";
		author = "";
		publicationDate = LocalDate.of(0000,01,01);
		issuer = "";
		publisher = "";
		printingShop = "";
	}
	
	private void initializeField(String[] strs) {
		
		fictitiousISBN  = strs[0];
		bookName 	    = strs[1];
		author 		    = strs[2];
		publicationDate = LocalDate.parse(strs[3], DateTimeFormatter.ofPattern("uuuu/MM/dd"));  
		issuer 			= strs[4];
		publisher 		= strs[5];
		printingShop 	= strs[6];
	}
	
	@Override
	public BookDataBean clone() {
		
		try {
			
			var newIns = (BookDataBean)super.clone();
			newIns.publicationDate = publicationDate;
			return newIns;
		}catch(CloneNotSupportedException ex) {
			
			return new BookDataBean();			
		}
	}
}
