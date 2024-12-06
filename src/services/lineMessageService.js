const client = require("./lineUtils");

const sendLineMessage = async (customer_id, reward_image, reward_name) => {
  //push line message
  //customer_id ต้องเป็นของ line
  await client.pushMessage(customer_id, [
    {
      type: "flex",
      altText: "คุณได้ทำการแลกของรางวัลเรียบร้อย",
      contents: {
        type: "bubble",
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "image",
                  url: `${process.env.IMAGE_URL}images/${reward_image}`,
                  size: "3xl",
                  aspectMode: "fit",
                  aspectRatio: "150:196",
                  gravity: "center",
                  flex: 1,
                  animated: true,
                },
              ],
            },
          ],
          paddingAll: "0px",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      contents: [],
                      size: "xl",
                      wrap: true,
                      text: "แลกรางวัลเสร็จสมบูรณ์",
                      color: "#ffffff",
                      weight: "bold",
                      margin: "none",
                    },
                  ],
                  spacing: "sm",
                  justifyContent: "center",
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [
                        {
                          type: "text",
                          contents: [],
                          size: "sm",
                          wrap: true,
                          margin: "lg",
                          color: "#ffffffde",
                          text: `ยินดีด้วยคุณได้รับ : ${reward_name}`,
                        },
                      ],
                    },
                  ],
                  paddingAll: "13px",
                  backgroundColor: "#ffffff1A",
                  cornerRadius: "lg",
                  margin: "lg",
                  spacing: "none",
                  position: "relative",
                  borderWidth: "none",
                  justifyContent: "center",
                },
              ],
            },
          ],
          paddingAll: "20px",
          backgroundColor: "#AF48FF",
        },
      },
    },
    {
      type: "text",
      text: "ขอบคุณที่แลกของรางวัล",
    },
  ]);
};

const sendCouponLineMessage = async (customer_id, reward_image, coupon) => {
  await client.pushMessage(customer_id, [
    {
      type: "flex",
      altText: "Redeem Code Message",
      contents: {
        type: "bubble",
        hero: {
          type: "image",
          url: `${process.env.IMAGE_URL}images/${reward_image}`,
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "🎉 Redeem Your Code!",
              weight: "bold",
              size: "xl",
              margin: "md",
              align: "center",
            },
            {
              type: "text",
              text: "Use the code below to unlock your rewards:",
              size: "md",
              color: "#666666",
              wrap: true,
              margin: "md",
              align: "center",
            },
            {
              type: "text",
              text: "REDEEM2024",
              weight: "bold",
              size: "lg",
              color: "#FF6F61",
              margin: "md",
              align: "center",
            },
            {
              type: "text",
              text: "Click the button below to redeem now!",
              size: "sm",
              color: "#666666",
              wrap: true,
              margin: "sm",
              align: "center",
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
              style: "primary",
              color: "#1DB446",
              action: {
                type: "uri",
                label: "Redeem Now",
                uri: "https://example.com/redeem",
              },
            },
          ],
        },
      },
    },
  ]);
};

module.exports = {
  sendLineMessage,
  sendCouponLineMessage,
};
