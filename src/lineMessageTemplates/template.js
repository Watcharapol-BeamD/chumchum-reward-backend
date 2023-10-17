const replyRedeemReward = {
  type: "flex",
  altText: "คุณได้ทำการแลกของรางวัลเรียบร้อย",
  contents: {
    type: "bubble",
    hero: {
      type: "image",
      url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
      size: "full",
      aspectRatio: "20:13",
      aspectMode: "cover",
      action: {
        type: "uri",
        uri: "http://linecorp.com/",
      },
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "Brown Cafe",
          weight: "bold",
          size: "xl",
        },
        {
          type: "box",
          layout: "baseline",
          margin: "md",
          contents: [
            {
              type: "icon",
              size: "sm",
              url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
            },
            {
              type: "icon",
              size: "sm",
              url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
            },
            {
              type: "icon",
              size: "sm",
              url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
            },
            {
              type: "icon",
              size: "sm",
              url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
            },
            {
              type: "icon",
              size: "sm",
              url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
            },
            {
              type: "text",
              text: "4.0",
              size: "sm",
              color: "#999999",
              margin: "md",
              flex: 0,
            },
          ],
        },
        {
          type: "box",
          layout: "vertical",
          margin: "lg",
          spacing: "sm",
          contents: [
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "Place",
                  color: "#aaaaaa",
                  size: "sm",
                  flex: 1,
                },
                {
                  type: "text",
                  text: "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                  wrap: true,
                  color: "#666666",
                  size: "sm",
                  flex: 5,
                },
              ],
            },
            {
              type: "box",
              layout: "baseline",
              spacing: "sm",
              contents: [
                {
                  type: "text",
                  text: "Time",
                  color: "#aaaaaa",
                  size: "sm",
                  flex: 1,
                },
                {
                  type: "text",
                  text: "10:00 - 23:00",
                  wrap: true,
                  color: "#666666",
                  size: "sm",
                  flex: 5,
                },
              ],
            },
          ],
        },
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      spacing: "sm",
      contents: [
        {
          type: "button",
          style: "link",
          height: "sm",
          action: {
            type: "uri",
            label: "CALL",
            uri: "https://linecorp.com",
          },
        },
        {
          type: "button",
          style: "link",
          height: "sm",
          action: {
            type: "uri",
            label: "WEBSITE",
            uri: "https://linecorp.com",
          },
        },
        {
          type: "box",
          layout: "vertical",
          contents: [],
          margin: "sm",
        },
      ],
      flex: 0,
    },
  },
};
const replyRedeemRewardV2 = {
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

const replyRedeemRewardTEM = {
  type: "flex",
  altText: "สวัสดี",
  contents:  {}
};
module.exports = {
  replyRedeemReward,
  replyRedeemRewardV2,
};
