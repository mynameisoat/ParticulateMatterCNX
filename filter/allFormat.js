import Vue from "vue";

export default () => {
  Vue.filter("formatDate", function (value) {
    if (!value) return "";
    return Intl.DateTimeFormat("th").format(new Date(value));
  });

  Vue.filter("formatDate2", function (value) {
    if (!value) return "";
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return Intl.DateTimeFormat("th", options).format(new Date(value));
  });

  Vue.filter("formatDateTime", function (value) {
    if (!value) return "";
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return Intl.DateTimeFormat("th", options).format(new Date(value));
  });

  Vue.filter("formatDateEn", function (value) {
    if (!value) return "";
    return Intl.DateTimeFormat("en").format(new Date(value));
  });

  Vue.filter("formatDateDT", function (value) {
    if (!value) return "";
    return Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(value));
  });

  Vue.filter("fullDate", function (value) {
    if (!value) return "";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return Intl.DateTimeFormat("th", options).format(new Date(value));
  });

  Vue.filter("formatDateNO", function (value) {
    if (!value) return "";
    let res = Intl.DateTimeFormat("th", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(value));
    res = res.split("/").reverse();
    res = res.join("");
    return res;
  });

  Vue.filter("formatNum", function (value) {
    if (!value) return "-";
    return Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) !== "NaN"
      ? Intl.NumberFormat("th-TH", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value)
      : "-";
  });

  Vue.filter("formatNumNonDigit", function (value) {
    if (!value) return "-";
    return Intl.NumberFormat("th-TH").format(value) !== "NaN"
      ? Intl.NumberFormat("th-TH").format(value)
      : "-";
  });

  Vue.filter("formatNumToTextvoice", function (value) {
    if (!value) return "-";
    return BAHTTEXT(value);
  });

  function BAHTTEXT(num) {
    const suffix = "บาทถ้วน";
    num = num || 0;
    num = num.toString().replace(/[, ]/g, "");
    if (isNaN(num) || Math.round(parseFloat(num) * 100) / 100 === 0) {
      return "ศูนย์บาทถ้วน";
    } else {
      const t = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
      const n = [
        "",
        "หนึ่ง",
        "สอง",
        "สาม",
        "สี่",
        "ห้า",
        "หก",
        "เจ็ด",
        "แปด",
        "เก้า",
      ];
      let len;
      let digit;
      let text = "";
      let parts;
      let i;
      if (num.includes(".")) {
        parts = num.toString().split(".");
        num = parts[0];
        parts[1] = parseFloat("0." + parts[1]);
        parts[1] = (Math.round(parts[1] * 100) / 100).toString(); // more accurate than toFixed(2)
        parts = parts[1].split(".");
        if (parts.length > 1 && parts[1].length === 1) {
          parts[1] = parts[1].toString() + "0";
        }
        num = parseInt(num, 10) + parseInt(parts[0], 10);
        text = num ? BAHTTEXT(num) : "";
        if (parseInt(parts[1], 10) > 0) {
          text = text.replace("ถ้วน", "") + BAHTTEXT(parts[1], "สตางค์");
        }
        return text;
      } else if (num.length > 7) {
        const overflow = num.substring(0, num.length - 6);
        const remains = num.slice(-6);
        return (
          BAHTTEXT(overflow).replace("บาทถ้วน", "ล้าน") +
          BAHTTEXT(remains).replace("ศูนย์", "")
        );
      } else {
        len = num.length;
        for (i = 0; i < len; i = i + 1) {
          digit = parseInt(num.charAt(i), 10);
          if (digit > 0) {
            if (
              len > 2 &&
              i === len - 1 &&
              digit === 1 &&
              suffix !== "สตางค์"
            ) {
              text += "เอ็ด" + t[len - 1 - i];
            } else {
              text += n[digit] + t[len - 1 - i];
            }
          }
        }
        text = text.replace("หนึ่งสิบ", "สิบ");
        text = text.replace("สองสิบ", "ยี่สิบ");
        text = text.replace("สิบหนึ่ง", "สิบเอ็ด");
        return text + suffix;
      }
    }
  }

  Vue.filter("formatNumZero", function (value) {
    if (!value) return "0.00";
    return Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) !== "NaN"
      ? Intl.NumberFormat("th-TH", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value)
      : "-";
  });
};
