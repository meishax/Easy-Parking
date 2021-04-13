/**
 * Created by Chation on 2017/1/5.
 */

/* change btn style */
function checkusername()
{
    var pattern=/^[0-9a-zA-Z]*$/;
    var username = $("#user_name").val();
   
    if(!username || username == "")
    {
      //  alert("请输入用户名");
        s1.innerHTML=" *请输入用户名";
        s1.style.color='red';
        //$("accountName").focus();
        //return false;
    }
    else if(username!=""&&!pattern.test(username))
    {
         
    s1.innerHTML=" *只能输入是字母或者数字!";
    s1.style.color='red';
    
    }
    else
    {
        s1.innerHTML="  ";
        s1.style.color='green';
    }
}
function checkpassword()
    {
        var pattern=/^\w{4,8}$/;
        var password = $("#password").val();
        if(!password || password == ""){
              s2.innerHTML="  *请输入密码";
              s2.style.color='red';
              }
        else if(password!=""&&!pattern.test(password))
          {
               
          s2.innerHTML="  *密码要在4-8位!";
          s2.style.color='red';
          }
        else
          {
              s2.innerHTML="  ";
              s2.style.color='green';
          }
    }
function checkemail()
{
    var pattern=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var email = $("#email_address").val();
        if(!email || email == ""){
              s3.innerHTML=" *请输入邮箱";
              s3.style.color='red';
              }
        else if(email!=""&&!pattern.test(email))
          {
               
          s3.innerHTML="邮箱格式错误!";
          s3.style.color='red';
          }
        else
          {
              s3.innerHTML="  ";
              s3.style.color='green';
          }
}
function checksamepassword()
{
    var password = $("#password").val();
    var password1=$("#password-again").val();
    if(password!=password1)
    {
        s4.innerHTML=" * 保持两次输入的密码一致";
        s4.style.color='red'; 
    }
    else
    {
            s4.innerHTML="  ";
            s4.style.color='green';
    }
}
  
function loginStyle(nameInput, idInput, passInput, passAgain, loginBtn) {
    var classes = "",oldClasses = "";
    var userName = document.getElementById(nameInput);
    var userId = document.getElementById(idInput);
    var userPass = document.getElementById(passInput);
    var userAgain = document.getElementById(passAgain);
    var login = document.getElementById(loginBtn);
    login.addEventListener("click", function (event) {
        if (userId.value != "" && userPass.value != "" && userName.value != "" && userAgain.value != "" && userPass.value==userAgain.value) {
            oldClasses = this.getAttribute("class");
            classes = oldClasses + " disabled";
            this.setAttribute("class", classes);
            this.innerHTML = "<i class='icon-refresh icon-spin'></i> 正在注册...";
            alert("注册成功！");
            var nameU = userName.value;
            var idU = userId.value;
            var passU = userPass.value;

            event.preventDefault();
            ajaxLogin(nameU,idU,passU,oldClasses);
        
        } else {
            if (userId.value == "") {
                classes = userId.parentNode.getAttribute("class");
                userId.parentNode.setAttribute("class", classes + " has-error");
            }
            if (userPass.value == "") {
                classes = userPass.parentNode.getAttribute("class");
                userPass.parentNode.setAttribute("class", classes + " has-error");
            }
            if (userAgain.value == "") {
                classes = userAgain.parentNode.getAttribute("class");
                userAgain.parentNode.setAttribute("class", classes + " has-error");
            }
            if (userName.value == "") {
                classes = userName.parentNode.getAttribute("class");
                userName.parentNode.setAttribute("class", classes + " has-error");
            }
        }
    }, false);
    var focus = function () {
        this.parentNode.setAttribute("class", "input-group");
    };
    userName.addEventListener("focus", focus, false);
    userId.addEventListener("focus", focus, false);
    userPass.addEventListener("focus", focus, false);
    userAgain.addEventListener("focus", focus, false);

}

/* Ajax注册 */
function ajaxLogin(name,id,pass,classes){
    var xmlhttp;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "regAcc.php?user_name=" + name + "&email_address=" + id + "&password=" + pass, false);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "1") {
                removeElem("form1");
                document.getElementById("form-reg").innerHTML = "<h3>欢迎你，" + name + "</h3><img class='img-responsive img-circle' src='../pic/default.jpg'><div id='backTo'><a href='../index.html'>去登录!</a></div>";
            }else{
                var login = document.getElementById("login_to");
                login.setAttribute("class",classes);
                login.innerHTML = "<i class='glyphicon glyphicon-log-in'></i> 注 册";
                removeElem("warningTip");
                var tips = "发生错误,注册失败！";
                var form = document.getElementById("form-reg");
                form.insertBefore(alertBox(tips,"warning"),form.childNodes[0]);
            }
        }
    };
    xmlhttp.send();
}

/* Ajax验证用户名是否存在 */
function hasUserName(){
    var xmlhttp;
    var tips = document.getElementById("sameUsername");
    var name = document.getElementById("email_address").value;
    var patrn = /^.{6,16}$/;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "hasUserName.php?name="+name, false);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "1" && patrn.exec(name)) {
                tips.style.visibility = "";
                tips.style.color = "green";
                tips.innerHTML = "* 恭喜你,帐号可以使用!";
            }else {
                tips.style.visibility = "";
                tips.style.color = "red";
                tips.innerHTML = "* 账号已被占用或帐号不符合规范"
            }
        }
    };
    xmlhttp.send();
}

/* 删除指定id的元素 */
function removeElem(elemId) {
    if (document.getElementById(elemId)) {
        var elem = document.getElementById(elemId);
        elem.parentNode.removeChild(elem);
    }
}

/* 新建提示框innerHTML */
function alertBox (tip,color){
    var box = document.createElement("div");
    box.setAttribute("id","warningTip");
    box.setAttribute("class","alert alert-"+color+" alert-dismissible");
    box.setAttribute("role","alert");
    box.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><spanaria-hidden='true'>&times;</span></button>"+tip;
    return box;
}

/**
 * main()
 */

//绑定注册框样式事件
loginStyle("user_name","email_address","password","password-again","login_to");

//Ajax检查用户名是否重复
var user_id = document.getElementById("email_address");
user_id.addEventListener("blur",hasUserName,false);