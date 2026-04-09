/**
 * 
 */
let googleWin = null;
const chkA = document.getElementById('fromFileSearch');
const chkB = document.getElementById('fromDataBaseSearch');
chkA.addEventListener('change', () => enforceAtLeastOne(chkA, chkB));
chkB.addEventListener('change', () => enforceAtLeastOne(chkB, chkA));

function openGoogle() {
	
	const q = document.getElementById("keyWord").value + " 本";
    const url = "https://www.google.com/search?q=" + encodeURIComponent(q);
    if (!googleWin || googleWin.closed) {
        // 初回だけ window.open
        googleWin = window.open(
            "about:blank",
            "googleWindow",
            "width=900,height=700,resizable=yes,scrollbars=yes"
        );
    }
    // 2回目以降は open しない
    googleWin.location.href = url;
    googleWin.focus();
}

function enforceAtLeastOne(own, other) {
  // 自分をOFFにしようとしたとき、
  // もう片方もOFFなら外させない
  if (!own.checked && !other.checked) {
    own.checked = true;
  }
}