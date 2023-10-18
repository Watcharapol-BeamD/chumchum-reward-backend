
const reportRedeemRewardTemplateV2 = {
    type: "flex",
    altText: "คุณได้ทำการแลกของรางวัลเรียบร้อย",
    contents:  {
      "type": "bubble",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "image",
                "url": "https://xiaomithaishop.com/wp-content/uploads/2020/03/xiaomi_xiaomi_air_purifier_3h.001_1-300x300.jpeg",
                "size": "3xl",
                "aspectMode": "fit",
                "aspectRatio": "150:196",
                "gravity": "center",
                "flex": 1,
                "animated": true
              }
            ]
          }
        ],
        "paddingAll": "0px"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "contents": [],
                    "size": "xl",
                    "wrap": true,
                    "text": "แลกรางวัลเสร็จสมบูรณ์",
                    "color": "#ffffff",
                    "weight": "bold",
                    "margin": "none"
                  }
                ],
                "spacing": "sm",
                "justifyContent": "center"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "contents": [],
                        "size": "sm",
                        "wrap": true,
                        "margin": "lg",
                        "color": "#ffffffde",
                        "text": "ยินดีด้วยคุณได้รับ : ESUN Mi Water Purifier 600G - เครื่องกรองน้ำอัจฉริยะ 600G (รุ่นตั้งพื้น)"
                      }
                    ]
                  }
                ],
                "paddingAll": "13px",
                "backgroundColor": "#ffffff1A",
                "cornerRadius": "lg",
                "margin": "lg",
                "spacing": "none",
                "position": "relative",
                "borderWidth": "none",
                "justifyContent": "center"
              }
            ]
          }
        ],
        "paddingAll": "20px",
        "backgroundColor": "#AF48FF"
      }
    }
  };
  module.exports = {
    reportRedeemRewardTemplateV2
  };