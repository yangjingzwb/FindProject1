成功报文：{"code":200,"data":{见每个接口的返回参数},"success":true,"message":"请求成功！"}
失败报文：{"timestamp": 时间戳,"status": 400,"error": "错误码","message": 错误原因,"path": 请求地址}

1、获取OPENID
接口地址：/queryOpenID
请求参数：
code 用户授权码

返回参数:
openID 用户唯一编号

2、获取安全签名
接口地址：/paySign
请求参数：
OpenID 用户认证码
url    主页地址
返回参数：
timeStamp":时间戳
"signature":签名串"
"appId":微信开发者编号
"nonceStr":加密串
"url":主页
 
3、查询banner&查询分类&查询底部tab
接口地址：/conduct/list
请求参数：
type 类型 (TOP：banner CATALOG：分类 MIDDLE：底部tab')
返回参数：
marketingId;     编号
marketingPosition; '位置>TOP：banner CATALOG：首页商品分类 MIDDLE：底部'
marketingIndex; 位置
marketingIcon; 图标地址
marketingTitle; 标题
marketingDesc; 描述
marketingRegion;省份地址
marketEvent; 事件>REDIRECT：重定向 NOTIFY：消息
marketingEventCotent; 跳转地址
marketingStatus;  状态
creatTime;  创建时间
effectiveDate; 生效时间
expirationDate; 失效时间
archiveFlag;  归档标识>0：有效 1：归档 
 
 4、查询用户信息
请求参数：
authId 授权编号 (微信公众号传openID)
返回参数： 
"id": 1,
"createTime" 创建时间
"updateTime": 更新时间
"createBy": 创建人,
"updateBy": 更新人,
"address": 地址,
"birthday": 出生日期,
"deleteStatus": 归档标识>0：有效 1：归档 ,
"description": 描述,
"email": 邮箱地址,
"locked": 锁定状态 0 未锁定 1锁定,    
"nickName": 昵称,
"password": 密码,
"sex": 0 男 ,
"telephone": 手机号,
"userName": 用户名

5、修改个人信息
请求参数：
uId 用户编号(查询个人信息得到的编号id)
"createTime" 创建时间
"updateTime": 更新时间
"createBy": 创建人,
"updateBy": 更新人,
"address": 地址,
"birthday": 出生日期,
"deleteStatus": 归档标识>0：有效 1：归档 ,
"description": 描述,
"email": 邮箱地址,
"locked": 锁定状态 0 未锁定 1锁定,    
"nickName": 昵称,
"password": 密码,
"sex": 0 男 ,
"telephone": 手机号,
"userName": 用户名
返回参数：
无(success=true 则成功)

6、我的课程
请求参数：
uId 用户编号(查询个人信息得到的编号id)
返回参数：(数组)
serverType  '服务类型:购买 gm,收藏 cc,赠送 zc,学习 xx',
deleteStatus '删除标识:0 未删除,1 删除',
description  '描述',
process   进度
pName;"产品名称"
pFileUrl;"产品文件路径"
pCoverUrl;"产品贴片路径"
pPasterUrl;"产品复制路径"
pDetail;"产品描述"
trySeeContext;"产品描述"
isAllowCopy;"是否允许复制"
guid;"分类编号"
pid;"产品编号"
pType;"产品类型"
fixPrice;"价格"
linePrice;"划线价格"
startTime "开始时间"
endTime"结束时间"
showFlag;"是否显示"

7、查询每日精选内容
请求参数：
无
返回参数：(数组)
pName;"产品名称"
pFileUrl;"产品文件路径"
pCoverUrl;"产品贴片路径"
pPasterUrl;"产品复制路径"
pDetail;"产品描述"
trySeeContext;"试看内容或试听内容"
isAllowCopy;"是否允许复制"
guid;"分类编号"
pid;"产品编号"
pType;"产品类型"
fixPrice;"价格"
linePrice;"划线价格"
startTime "开始时间"
endTime"结束时间"
showFlag;"是否显示"

8、查询课程分类
请求参数：
无
返回参数：(数组)
guid;  类别编号
parentGuid;  父类别编号
guName; 类别名称
productName; 产品名称
description; 类别描述

9、根据分类编号查询专栏信息
请求参数：
guId   分类编号
返回参数：(数组)
pName;"产品名称"
pFileUrl;"产品文件路径"
pCoverUrl;"产品贴片路径"
pPasterUrl;"产品复制路径"
pDetail;"产品描述"
trySeeContext;"产品描述"
isAllowCopy;"是否允许复制"
guid;"分类编号"
pid;"产品编号"
pType;"产品类型"
fixPrice;"价格"
linePrice;"划线价格"
startTime "开始时间"
endTime"结束时间"
showFlag;"是否显示"

10、根据专栏编号查询课程信息
请求参数：
pid 专栏编号
返回参数：(数组)
pName;"产品名称"
pFileUrl;"产品文件路径"
pCoverUrl;"产品贴片路径"
pPasterUrl;"产品复制路径"
pDetail;"产品描述"
trySeeContext;"产品描述"
isAllowCopy;"是否允许复制"
guid;"分类编号"
pid;"产品编号"
pType;"产品类型"
fixPrice;"价格"
linePrice;"划线价格"
startTime "开始时间"
endTime"结束时间"
showFlag;"是否显示"

11、意见反馈
请求参数：
uId 用户编号(查询个人信息得到的编号id)
name  '用户姓名',
phone '用户手机号',
msg_title '消息标题',
msg_context '消息内容',
pic_url     '图片地址',
返回参数：
无(success=true 则成功)

12、下单接口
请求参数：
uId 用户编号(查询个人信息得到的编号id)
orderAmt 订单金额
productId 产品编号
merchantId 商户编号
orderDate 请求日期
sign      签名(待定)
返回参数：
appId;唯一开发者编号
timeStamp;时间戳
nonceStr;随机字符串
package;订单详情扩展字符串
signType;签名方式
paySign;签名