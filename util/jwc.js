const request = require('request');
const cheerio = require('cheerio');
const Entities = require('html-entities').XmlEntities;

function loginAuth(username, password, name, cookie) {
  return new Promise(
    (reslove, reject) => {
      if (!username || !password) {
        // 账号或密码为空，直接报错
        return reject('账号密码不能为空');
      }
      const postLogin = (c) => {
        const loginOption = {
          url: 'http://zhjw.scu.edu.cn/j_spring_security_check',
          form: {
            'j_username' : username,
            'j_password': password,
            'j_captcha1': "error"
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': c,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3534.4 Safari/537.36',
          }
        };
        request.post(loginOption, function(loginError, loginRes, loginBody) {
          if (loginError) {
            // 登录出错
            return reject('登录验证请求失败');
          } else {
            // 登录成功
            if (!name) {
              // 传进来的name为空，说明需要再进入教务处主页获取用户用户名
              // 现在手动302到index.jsp拿用户信息
              const indexOption = {
                url: 'http://zhjw.scu.edu.cn/index.jsp?',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cookie': c,
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3534.4 Safari/537.36',
                }
              };
              request.get(indexOption, function(error, res, body) {
                if (error) {
                  return reject('访问index.jsp失败');
                }
                const result = analysis(body);
                if (!result) {
                  return reject('从index.jsp解析name失败');
                }
                return reslove(result);
              });
            } else {
              return reslove(name);
            }
          }
        });
      };
      if (!cookie) {
        // cookie不存在，需要先获取cooie
        request({
          url: 'http://zhjw.scu.edu.cn/login',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3534.4 Safari/537.36',
          }
        }, function(err, res, body) {
          if (err) {
            return reject();
          } else {
            const headers = res.headers;
            const str = headers['set-cookie'][0];
            const newCookie = str.split(';')[0];
            postLogin(newCookie);
          }
        });
      } else {
        postLogin(cookie);
      }
    }
  );
}

function analysis(htmlStr) {
  // console.log(htmlStr);
  // if (htmlStr.indexOf('验证码')) {
  //   // 检索到 验证码 字符串，说明登录太频繁，教务处登录后台自动添加了验证码功能，需等待一段时间再尝试登录
  //   return null;
  // }
  const $ = cheerio.load(htmlStr); // 根据html字符串生成一个类jQ的全局对象
  const domStr = $('.user-info').html();
  const nameCode = domStr.split('</small>')[1].trim();
  const entities = new Entities();
  const name  = entities.decode(nameCode);
  return name;
}

module.exports = loginAuth;