function openSocialQrcode(event, imageSrc, imageAlt) {
	var modal = document.getElementById("social-qrcode-modal")
	var image = document.getElementById("social-qrcode-image")

	if (event) {
		event.preventDefault()
	}
	image.src = imageSrc
	image.alt = imageAlt
	modal.classList.add("is-open")
	modal.setAttribute("aria-hidden", "false")
	document.body.classList.add("qrcode-modal-open")
	document.getElementById("social-qrcode-close").focus()
	return false
}

function closeSocialQrcode() {
	var modal = document.getElementById("social-qrcode-modal")

	modal.classList.remove("is-open")
	modal.setAttribute("aria-hidden", "true")
	document.body.classList.remove("qrcode-modal-open")
}

document.writeln("    <div class=\"footer-content\">")
document.writeln("    	<p><a href=\"http://www.neu.edu.cn\">东北大学<a></p>")
document.writeln("    	<p><a href=\"http://www.graduate.neu.edu.cn\">研究生院<a></p>")
document.writeln("    	<p><a href=\"http://www.cse.neu.edu.cn\">计算机科学与工程学院</a></p>")
document.writeln("    </div>")
document.writeln("    <div class=\"footer-content\">")	
document.writeln("    	<p>联系电话：+86-024-83672602</p>")
document.writeln("    	<p>联系地址：辽宁省沈阳市浑南区 东北大学浑南校区 信息馆</p>")
document.writeln("    </div>")
document.writeln("    <div class=\"footer-content social-accounts\">")
document.writeln("    	<p>关注我们</p>")
document.writeln("    	<div class=\"social-links\">")
document.writeln("    		<a href=\"https://x.com/idcneu\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"Twitter / X：@idcneu\">Twitter / X</a>")
document.writeln("    		<a href=\"images/wechat.jpg\" onclick=\"return openSocialQrcode(event, 'images/wechat.jpg', 'iDC-NEU 微信公众号二维码')\">微信公众号</a>")
document.writeln("    		<a href=\"images/rednote.png\" onclick=\"return openSocialQrcode(event, 'images/rednote.png', 'iDC-NEU 小红书二维码')\">小红书</a>")
document.writeln("    </div>")
document.writeln("    </div>")
document.writeln("    <div id=\"social-qrcode-modal\" class=\"social-qrcode-modal\" role=\"dialog\" aria-modal=\"true\" aria-hidden=\"true\" onclick=\"if (event.target === this) closeSocialQrcode()\">")
document.writeln("    	<div class=\"social-qrcode-dialog\">")
document.writeln("    		<button id=\"social-qrcode-close\" class=\"social-qrcode-close\" type=\"button\" aria-label=\"关闭二维码\" onclick=\"closeSocialQrcode()\">&times;</button>")
document.writeln("    		<img id=\"social-qrcode-image\" src=\"\" alt=\"\">")
document.writeln("    	</div>")
document.writeln("    </div>")
document.writeln("    <p style=\"font-size:14px\">Copyright 2022 NEU iDC Group. All rights reserved.</p>")
document.writeln("    </br>")

document.addEventListener("keydown", function(event) {
	if (event.key === "Escape") {
		closeSocialQrcode()
	}
})
