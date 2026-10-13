"use strict";
(() => {
  const topics = window.HEALTH_DODO_TOPICS;
  const common = window.HEALTH_DODO_COMMON;
  const $ = (id) => document.getElementById(id);

  if (!Array.isArray(topics) || topics.length !== 7 || !common) {
    const area = $("preview");
    if (area) area.value = "示範資料載入失敗，請重新整理或聯絡網站管理者。";
    return;
  }

  let selected = topics[0];
  let mode = "school";
  let currentText = "";

  const pct = ([n, d]) => (100 * n / d).toFixed(1);
  const fraction = ([n, d]) => n + "/" + d + "（" + pct([n, d]) + "%）";
  const amount = (n) => new Intl.NumberFormat("zh-TW").format(n);
  const diff = (a, b) => {
    const v = 100 * (a[0] / a[1] - b[0] / b[1]);
    return (v > 0 ? "+" : "") + v.toFixed(1) + " 個百分點";
  };
  const achieved = (item) => {
    const r = 100 * item.after[0] / item.after[1];
    return item.direction === "down" ? r <= item.target : r >= item.target;
  };
  const goalText = (item) => (item.direction === "down" ? "不高於 " : "至少 ") + item.target + "%";

  function schoolText(t) {
    const indicatorLines = t.indicators.map((x, i) =>
      "  " + (i + 1) + ". " + x.label + "：" + fraction(x.before) + "；資料來源：" + x.source + "。"
    ).join("\n");
    return [
      "【健促 AI 健多多｜實作區示範案例】",
      "議題：" + t.name,
      "學校：示範國中（完全虛構）",
      "資料性質：教學模擬，所有統計及人物情境均非真實資料。",
      "",
      "一、學校基本概況",
      "1. 學年度：" + common.year + "。",
      "2. 學校規模：普通班 " + common.classes + " 班，學生 " + common.students + " 人，教師 " + common.teachers + " 人；七至九年級各10班、各280人。",
      "3. 區域背景：位於虛構的城郊生活圈，學生家庭背景多元，家長參與程度不一。",
      "4. 校園資源：設有健康中心、輔導室、運動場地；可利用健康教育課、導師時間及學校既有宣導管道。",
      "5. 調查方式：" + common.sampling,
      "",
      "二、" + t.name + "之校情與健康需求",
      "（一）學生需求",
      t.student,
      "學年度初主要指標：",
      indicatorLines,
      "",
      "（二）教師觀察（共回收45份教師回饋）",
      t.teacher,
      "",
      "（三）家長意見（共回收160份家長問卷）",
      t.parent,
      "",
      "（四）行政與校內制度",
      t.admin,
      "",
      "（五）社區及外部資源",
      t.community,
      "",
      "三、初步關注問題",
      t.priority,
      "",
      "四、可運用資源",
      t.resources,
      "",
      "五、執行限制及倫理注意事項",
      t.constraints,
      common.confidentiality,
      "",
      "六、希望與 AI 健多多討論的任務",
      "請將上述資料視為「示範國中」虛構校情，依健多多實作區既有流程，協助整理需求、進行 SWOT 分析、辨認優先議題並發展可操作的健康促進策略。需區分資料支持的事實、假設與待補資訊；請不要將案例數據視為真實研究證據。",
      "",
      "【重要提醒】這是一份預設示範資料，不應作為真實學校方案或對外成效宣稱的根據。"
    ].join("\n");
  }

  function outcomeText(t) {
    const indicators = t.indicators.map((x, i) =>
      "  " + (i + 1) + ". " + x.label + "\n" +
      "     前測：" + fraction(x.before) + "\n" +
      "     後測：" + fraction(x.after) + "；變化：" + diff(x.after, x.before) + "\n" +
      "     原定目標：" + goalText(x) + "；判定：" + (achieved(x) ? "達標" : "未達標") + "\n" +
      "     資料來源：" + x.source
    ).join("\n");
    const activities = t.activities.map((x, i) =>
      "  " + (i + 1) + ". " + x.title + "（" + x.when + "）\n" +
      "     執行內容：" + x.detail + "\n" +
      "     觸及對象：" + x.reach + "\n" +
      "     留存證據：" + x.evidence
    ).join("\n");
    return [
      "【健促 AI 健多多｜精進區示範成果】",
      "議題：" + t.name,
      "學校：示範國中（完全虛構）",
      "資料性質：114學年度健康促進成果的教學模擬，不是真實執行紀錄。",
      "",
      "一、學校與計畫背景",
      "示範國中共有 " + common.classes + " 班、" + common.students + " 名學生、" + common.teachers + " 名教師。",
      "計畫期間：" + common.activityPeriod + "。",
      "起始需求：" + t.priority,
      "調查設計：" + common.sampling,
      "解讀限制：兩次學生問卷不是同一批學生的個人配對結果，百分比差異僅代表不同時間點樣本的觀察差異；沒有設置對照組，不能單憑變化宣稱活動造成效果。追蹤型行政指標另依相同對象紀錄計算。",
      "",
      "二、主要實施活動及紀錄",
      activities,
      "",
      "三、成果指標與達標情形",
      indicators,
      "",
      "四、經費執行情形",
      "原規劃經費：新臺幣 " + amount(t.budget[0]) + " 元；模擬實支：新臺幣 " + amount(t.budget[1]) + " 元；餘額：新臺幣 " + amount(t.budget[0] - t.budget[1]) + " 元。",
      "經費統計為模擬值，尚未經正式核銷查核；不得推論為真實行政支出。",
      "",
      "五、多方回饋紀錄（模擬摘要）",
      ...t.feedback.map((f, i) => "  " + (i + 1) + ". " + f),
      "",
      "六、尚待精進或未解決問題",
      t.friction,
      "資料品質注意：問卷屬匿名自陳／情境作答，可能有回答偏差；如需評估執行忠實度、長期維持或不同族群差異，應補充適當資料與倫理審查。",
      "",
      "七、下一階段初步方向",
      t.next,
      "",
      "八、希望與 AI 健多多討論的任務",
      "請將上述資料視為「示範國中」的虛構成果，依健多多精進區既有流程評讀目標達成度、證據強弱、執行優勢、落差與限制，提出優先改善項目及可檢核的後續方案。請嚴格區分觀察變化與因果效果，不要虛構未提供的追蹤數字。",
      "",
      "【重要提醒】全部成果均為教學模擬，不能作為真實學校績效或研究結論。"
    ].join("\n");
  }

  function renderTopics() {
    const list = $("topic-list");
    list.replaceChildren();
    topics.forEach((topic) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "topic-button" + (topic.id === selected.id ? " selected" : "");
      button.setAttribute("aria-pressed", String(topic.id === selected.id));
      button.setAttribute("aria-label", "選擇議題：" + topic.name);
      const icon = document.createElement("span");
      icon.className = "emoji";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = topic.emoji;
      const name = document.createElement("span");
      name.textContent = topic.name;
      button.append(icon, name);
      button.addEventListener("click", () => {
        selected = topic;
        render();
      });
      list.append(button);
    });
  }

  function render() {
    currentText = mode === "school" ? schoolText(selected) : outcomeText(selected);
    renderTopics();
    document.querySelectorAll("[data-mode]").forEach((button) => {
      const isSelected = button.dataset.mode === mode;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
    $("result-icon").textContent = selected.emoji;
    $("result-overline").textContent = mode === "school" ? "實作區 · 虛擬校情" : "精進區 · 虛擬成果";
    $("result-name").textContent = selected.name;
    $("result-description").textContent = selected.tagline + (mode === "school" ? "｜114學年度校情與需求模擬" : "｜114學年度實施成果與精進模擬");
    $("preview").value = currentText;
    $("preview").scrollTop = 0;
    $("char-count").textContent = amount(currentText.length) + " 字元";
    $("gpt-link").href = selected.link;
    $("gpt-link").setAttribute("aria-label", "另開分頁：健多多" + selected.name + "機器人");
    $("copy-status").textContent = "";
    $("copy-status").classList.remove("error");
    const url = new URL(location.href);
    url.searchParams.set("topic", selected.id);
    url.searchParams.set("mode", mode);
    history.replaceState(null, "", url);
  }

  async function copyText() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentText);
      } else {
        const field = $("preview");
        field.focus();
        field.select();
        field.setSelectionRange(0, field.value.length);
        if (!document.execCommand("copy")) throw new Error("copy rejected");
        field.setSelectionRange(0, 0);
      }
      $("copy-status").textContent = "✓ 已複製完整資料。現在可以開啟健多多，貼入對話。";
      $("copy-status").classList.remove("error");
    } catch (error) {
      $("copy-status").textContent = "無法自動複製，請點選上方資料內容，使用全選與複製。";
      $("copy-status").classList.add("error");
    }
  }

  function downloadText() {
    const blob = new Blob(["\uFEFF" + currentText], {type:"text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "健多多_示範國中_" + selected.name + "_" + (mode === "school" ? "虛擬校情" : "虛擬成果") + ".txt";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("copy-status").textContent = "已啟動 TXT 檔案下載。";
    $("copy-status").classList.remove("error");
  }

  const params = new URLSearchParams(location.search);
  const initialTopic = topics.find((t) => t.id === params.get("topic"));
  if (initialTopic) selected = initialTopic;
  if (params.get("mode") === "outcome") mode = "outcome";

  document.querySelectorAll("[data-mode]").forEach((button) =>
    button.addEventListener("click", () => { mode = button.dataset.mode; render(); })
  );
  $("copy-button").addEventListener("click", copyText);
  $("download-button").addEventListener("click", downloadText);
  render();
})();