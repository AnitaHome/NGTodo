# NGTodo

簡介

NGTodo 是一個以 Angular 21 與 TailwindCSS 建立的簡易待辦事項（Todo）示範應用，提供新增、編輯、刪除及鍵盤操作的使用者介面，並包含一個「版權宣告」頁面。

**功能概覽**
- **新增待辦**：在輸入框輸入內容後按 `Enter` 或按「新增」按鈕，即可建立待辦項目。
- **編輯待辦**：按「編輯」進入內嵌編輯模式，修改後按 `儲存` 或 `Enter`，按 `Escape` 或 `取消` 可放棄編輯。
- **刪除待辦**：按下「刪除」移除該項目。
- **即時回饋**：界面會即時顯示待辦清單狀態（空清單提示）。

**快速開始**
- **系統需求**：Node.js（建議 18+）與 npm（隨 Node.js 安裝）。
- **安裝套件**：
```
npm install
```
- **啟動開發伺服器**：
```
npm start
```
開啟瀏覽器至 http://localhost:4200/。

**程式碼位置**
- 主入口：[src/main.ts](src/main.ts)
- 應用組件：[src/app/app.ts](src/app/app.ts)
- 導覽與佈局：[src/app/app.html](src/app/app.html)
- 路由定義：[src/app/app.routes.ts](src/app/app.routes.ts)
- 待辦邏輯：[src/app/home/home.ts](src/app/home/home.ts)
- 待辦模板：[src/app/home/home.html](src/app/home/home.html)
- 版權頁面：[src/app/privacy/privacy.ts](src/app/privacy/privacy.ts) / [src/app/privacy/privacy.html](src/app/privacy/privacy.html)

**如何使用（UI 指南）**
- 在首頁輸入框輸入待辦文字，按 `Enter` 或點選「新增」建立。
- 欲編輯項目，點選該項目的「編輯」，修改後按 `儲存` 或 `Enter`；按 `Escape` 或「取消」放棄。
- 點選「刪除」移除該項目。

**建置與測試**
- 建置生產版本：
```
npm run build
```
- 執行單元測試（Vitest）：
```
npm test
```

**常見問題與疑難排解**
- 若執行 `npm install` 出現權限或相依性問題，請更新 Node.js 或使用 `npm ci`（若專案有 lockfile）。
- 若開發伺服器無法啟動，確認 `ng` CLI 可執行或直接使用 `npx ng serve`。

**貢獻**
- 歡迎透過 Pull Request 方式貢獻功能或修正。請先建立分支、撰寫描述清楚的 commit，並附上重現步驟或測試。

---

若你要我把 README 調整成英文版本、加入部署說明（例如 GitHub Pages / Vercel），或幫你新增範例資料與截圖，我可以繼續幫你處理。
