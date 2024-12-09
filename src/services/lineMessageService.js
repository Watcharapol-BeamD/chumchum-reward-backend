const client = require("./lineUtils");

const sendLineMessage = async (customer_id, reward_image, reward_name) => {
  // Push a Line message to the customer
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
              type: "image",
              url: `${process.env.IMAGE_URL}images/${reward_image}`,
              size: "full",
              aspectMode: "cover",
              aspectRatio: "1:1",
            },
          ],
          paddingAll: "20px",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "แลกรางวัลเสร็จสมบูรณ์ 🎉",
              size: "lg",
              weight: "bold",
              color: "#FFFFFF",
              wrap: true,
              align: "center",
              margin: "md",
            },
            {
              type: "text",
              text: `ยินดีด้วย! คุณได้รับ:`,
              size: "sm",
              color: "#FFFFFFCC",
              wrap: true,
              align: "center",
              margin: "md",
            },
            {
              type: "text",
              text: reward_name,
              size: "md",
              weight: "bold",
              color: "#FFC700",
              wrap: true,
              align: "center",
              margin: "sm",
            },
            {
              type: "separator",
              margin: "xl",
              color: "#FFFFFF33",
            },
            {
              type: "text",
              text: "ขอบคุณที่แลกของรางวัลกับเรา 💜",
              size: "sm",
              color: "#FFFFFF99",
              wrap: true,
              align: "center",
              margin: "lg",
            },
          ],
          paddingAll: "20px",
          backgroundColor: "#9333ea",
          // cornerRadius: "lg",
        },
        styles: {
          body: {
            separator: true,
          },
        },
      },
    },
    {
      type: "text",
      text: "ขอบคุณที่แลกของรางวัล",
    },
  ]);
};

const sendCouponLineMessage = async (
  customer_id,
  reward_name,
  reward_image,
  coupon
) => {
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
              text: "🎉 คูปองส่วนลดของคุณ!",
              weight: "bold",
              size: "xl",
              margin: "md",
              align: "center",
            },
            {
              type: "text",
              text: reward_name,
              weight: "bold",
              size: "lg",
              color: "#ff0000",
              margin: "md",
              align: "center",
            },
            {
              type: "text",
              text: "ใช้รหัสคูปองด้านล่าง เพื่อเป็นส่วนลดในการซื้อสินค้า:",
              size: "md",
              color: "#666666",
              wrap: true,
              margin: "md",
              align: "center",
            },
            {
              type: "text",
              text: `${coupon}`,
              weight: "bold",
              size: "lg",
              color: "#FF6F61",
              margin: "md",
              align: "center",
            },
            {
              type: "text",
              text: "กดปุ่มด้านล่างเพื่อรับรหัส!",
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
                type: "clipboard",
                label: "คัดลอกรหัสคูปอง",
                clipboardText: `${coupon}`,
                // data: `action=copy&code=${coupon}`,
                // displayText: `${coupon}`,
              },
            },
            {
              type: "button",
              style: "primary",
              color: "#9333ea",
              action: {
                type: "uri",
                label: "ใช้ตอนนี้",
                uri: "https://www.chumchumonline.com/",
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
