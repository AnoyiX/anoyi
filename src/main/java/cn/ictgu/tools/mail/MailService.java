package cn.ictgu.tools.mail;

import cn.ictgu.serv.model.User;
import com.alibaba.fastjson.JSONObject;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * 邮件服务
 * Created by Silence on 2017/3/11.
 */
@Service
@Log4j2
public class MailService {
    private static final String TITLE_SIGN_UP = "欢迎加入沧海云视频";
    private static final String CONTENT = "<style type=\"text/css\">@media screen and (max-width:525px){table[class=responsive-table]{width:100%%!important;}td[class=padding]{padding:30px 8%% 35px 8%%!important;}td[class=padding2]{padding:30px 4%% 10px 4%%!important;text-align:left;}}@media all and (-webkit-min-device-pixel-ratio:1.5){body[yahoo] .zhwd-high-res-img-wrap{background-size:contain;background-position:center;background-repeat:no-repeat;}body[yahoo] .zhwd-high-res-img-wrap img{display:none!important;}body[yahoo] .zhwd-high-res-img-wrap.zhwd-hoho-logo{width:71px;height:54px;}}</style><div><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%%\"><tbody><tr><td bgcolor=\"#f7f9fa\" align=\"center\" style=\"padding:22px 0 20px 0\" class=\"responsive-table\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:f7f9fa;border-radius:3px;border:1px solid #dedede;margin:0 auto;background-color:#fff\" width=\"552\" class=\"responsive-table\"><tbody><tr><td bgcolor=\"#D9534F\" height=\"54\" align=\"center\" style=\"border-top-left-radius:3px;border-top-right-radius:3px\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%%\"><tbody><tr><td align=\"center\" class=\"zhwd-high-res-img-wrap zhwd-hoho-logo\"><p width=\"71\" height=\"54\" style=\"outline:0;display:block;font-size:22px;color:#fff\">V++</p></td></tr></tbody></table></td></tr><tr><td bgcolor=\"#ffffff\" align=\"center\" style=\"padding:0 15px 0 15px\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"480\" class=\"responsive-table\"><tbody><tr><td><table width=\"100%%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"left\" class=\"responsive-table\"><tbody><tr><td width=\"550\" align=\"left\" valign=\"top\"><table width=\"100%%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td bgcolor=\"#ffffff\" align=\"left\" style=\"font-size:17px;color:#7b7b7b;padding:28px 0 0;line-height:25px\"><br><b>%s，您好!</b></td></tr><tr><td align=\"left\" valign=\"top\" style=\"font-size:15px;color:#7b7b7b;font-size:14px;line-height:25px;font-family:Hiragino Sans GB;padding:20px 0 20px 0\">欢迎加入沧海云，离注册成功只差一步啦，请点击以下链接完成注册！</td></tr><tr><td style=\"border-bottom:1px #D9534F solid;padding:10px 0 35px 0\" align=\"center\" class=\"padding\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"responsive-table\"><tbody><tr><td><span style=\"font-family:Hiragino Sans GB;font-size:17px\"><a style=\"text-decoration:none;color:#fff\" target=\"_blank\" href=\"%s\"><div style=\"padding:10px 25px;border-radius:3px;text-align:center;background-color:#339DEC;margin:0;white-space:nowrap;color:#fff\"><b>确认注册</b></div></a></span></td></tr></tbody></table></td></tr><tr><td align=\"left\" valign=\"top\" style=\"font-size:15px;color:#7b7b7b;font-size:14px;line-height:25px;font-family:Hiragino Sans GB;padding:20px 0 35px 0\">如果以上链接无法访问，请将以下网址复制并粘贴至新的浏览器窗口中。<br>%s<br><br><p align=\"right\">沧海云团队</p><br></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div><div><div><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%%\"><tbody><tr><td bgcolor=\"#f7f9fa\" align=\"center\"><table width=\"552\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"responsive-table\"><tbody><tr><td align=\"center\" valign=\"top\" bgcolor=\"#f7f9fa\" style=\"font-family:Hiragino Sans GB;font-size:12px;color:#b6c2cc;line-height:17px;padding:0 0 25px 0\">这封邮件的收件地址是 %s<br></td></tr></tbody></table></td></tr></tbody></table></div></div>";

    @Value("${spring.mail.username}")
    private String from;

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void userValidate(User user, String token) {
        MimeMessage mailMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mailMessage, true, "GBK");
            helper.setFrom(from);
            helper.setTo(user.getEmail());
            helper.setSubject(TITLE_SIGN_UP);
            String link = "http://www.ictgu.cn/validate/" + token;
            String message = String.format(CONTENT, user.getNickname(), link, link, user.getEmail());
            helper.setText(message, true);
            mailSender.send(mailMessage);
        } catch (MessagingException e) {
            log.error("发送邮件失败：User:" + JSONObject.toJSONString(user) + ", Token: " + token);
        }
    }

}
