const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  AppId: '1253626956',
  SecretId: 'AKIDkJekbEeniOp20jrSSDj02pNglbGhrpWx',
  SecretKey: 'NUMyKQGqAE4f192g5F9oEPL2UhgQwDG4',
});

const params = {
  Bucket: 'video-1253626956',    /* 必须 */
  Region: 'ap-chengdu',    /* 必须 */
};

const baseUrl = `https://${params.Bucket}.cos.${params.Region}.myqcloud.com/`;

// cos.getBucket(params, function(err, data) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
// cos.headObject({
//   Bucket: 'video-1253626956',    /* 必须 */
//   Region: 'ap-chengdu',    /* 必须 */
//   Key: 'YqJuIojn_3126719941.mp4'
// }, function(err, data) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
