# CSSファイル - 完全なコード

このファイルには、すべてのCSSファイルの完全なコードが含まれています。

---

## 📄 css/style.css

共通スタイルシート（すべてのページで使用）

```css
/* 基本設定 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

/* ヘッダー */
.header {
    background-color: #2c3e50;
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header h1 {
    font-size: 28px;
    font-weight: 600;
}

.header-buttons {
    display: flex;
    gap: 15px;
}

/* ボタンスタイル */
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.btn-secondary {
    background-color: #95a5a6;
    color: white;
}

.btn-secondary:hover {
    background-color: #7f8c8d;
}

.btn-small {
    padding: 6px 12px;
    font-size: 14px;
    margin: 0 5px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-edit {
    background-color: #f39c12;
    color: white;
}

.btn-edit:hover {
    background-color: #e67e22;
}

.btn-delete {
    background-color: #e74c3c;
    color: white;
}

.btn-delete:hover {
    background-color: #c0392b;
}

/* メインコンテンツ */
.main-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.main-content h2 {
    margin-bottom: 20px;
    color: #2c3e50;
    font-size: 24px;
}

/* テーブル */
.table-container {
    overflow-x: auto;
}

.project-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
}

.project-table thead {
    background-color: #34495e;
    color: white;
}

.project-table th {
    padding: 15px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
}

.project-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ecf0f1;
}

.project-table tbody tr {
    transition: background-color 0.2s ease;
}

.project-table tbody tr:hover {
    background-color: #f8f9fa;
}

/* 警告行のスタイル */
.warning-row {
    background-color: #fff3cd;
}

.warning-row:hover {
    background-color: #ffe8a1;
}

.danger-row {
    background-color: #f8d7da;
}

.danger-row:hover {
    background-color: #f1b8bc;
}

/* ステータスバッジ */
.status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    display: inline-block;
}

.status-progress {
    background-color: #d4edda;
    color: #155724;
}

.status-warning {
    background-color: #fff3cd;
    color: #856404;
}

.status-danger {
    background-color: #f8d7da;
    color: #721c24;
}

/* モーダル（ポップアップ） */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-content {
    background-color: white;
    margin: 5% auto;
    padding: 0;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid #ecf0f1;
}

.modal-header h2 {
    color: #2c3e50;
    margin: 0;
    font-size: 22px;
}

.close {
    font-size: 32px;
    font-weight: bold;
    color: #95a5a6;
    cursor: pointer;
    transition: color 0.2s ease;
}

.close:hover {
    color: #e74c3c;
}

/* フォーム */
form {
    padding: 30px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
    font-weight: 500;
    font-size: 14px;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 30px;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .header {
        flex-direction: column;
        text-align: center;
    }

    .header-buttons {
        margin-top: 15px;
        width: 100%;
        justify-content: center;
    }

    .project-table {
        font-size: 14px;
    }

    .project-table th,
    .project-table td {
        padding: 8px;
    }
}
```

---

## 📄 css/task-management.css

タスク管理画面専用のスタイルシート

```css
/* タスク管理画面専用スタイル */

/* 未割り当てタスクエリア */
.unassigned-section {
    background-color: #ecf0f1;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
}

.unassigned-section h2 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 20px;
}

.task-pool {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    min-height: 150px;
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    border: 2px dashed #bdc3c7;
}

/* タスクカード */
.task-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px;
    border-radius: 8px;
    width: 200px;
    cursor: move;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    user-select: none;
}

.task-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.task-card.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
}

.task-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.task-content {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 500;
}

.task-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
}

.task-deadline {
    opacity: 0.9;
}

.task-badge {
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    background-color: rgba(255, 255, 255, 0.3);
}

.task-badge.urgent {
    background-color: #e74c3c;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

/* 緊急タスクの背景色 */
.task-card.task-urgent {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* 課員割り振りエリア */
.assignment-section {
    margin-top: 30px;
}

.assignment-section h2 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 20px;
}

.members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

/* 課員ボックス */
.member-box {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
}

.member-box:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.member-box.has-urgent {
    border: 3px solid #e74c3c;
}

.member-box.no-tasks {
    border: 3px solid #f39c12;
}

.member-header {
    background-color: #34495e;
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.member-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
}

.task-count {
    background-color: #3498db;
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
}

.member-tasks {
    min-height: 150px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #f8f9fa;
}

.member-tasks.drag-over {
    background-color: #d4edda;
    border: 2px dashed #28a745;
}

/* 課員ボックス内のタスクカードは少し小さめ */
.member-tasks .task-card {
    width: 100%;
    cursor: grab;
}

.member-tasks .task-card:active {
    cursor: grabbing;
}

/* 空の状態 */
.member-tasks:empty::after {
    content: 'タスクをドロップしてください';
    display: block;
    text-align: center;
    color: #95a5a6;
    padding: 40px 20px;
    font-size: 14px;
}

/* モーダル内のテキストエリア */
textarea {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.3s ease;
}

textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .members-grid {
        grid-template-columns: 1fr;
    }

    .task-pool {
        flex-direction: column;
    }

    .task-card {
        width: 100%;
    }
}
```

---

## 📄 css/member-view.css

カレンダー画面専用のスタイルシート

```css
/* カレンダー画面専用スタイル */

/* 課員選択 */
.member-selector {
    background-color: #ecf0f1;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
}

.member-selector label {
    font-weight: 600;
    color: #2c3e50;
    font-size: 16px;
}

.member-select {
    padding: 10px 20px;
    border: 2px solid #3498db;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    background-color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.member-select:hover {
    border-color: #2980b9;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}

.member-select:focus {
    outline: none;
    border-color: #2980b9;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

/* カレンダーセクション */
.calendar-section {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.calendar-header {
    text-align: center;
    margin-bottom: 20px;
}

.calendar-header h2 {
    color: #2c3e50;
    font-size: 24px;
    margin: 0;
}

/* カレンダーテーブル */
.calendar-container {
    overflow-x: auto;
}

.calendar-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background-color: white;
}

.day-header {
    background-color: #34495e;
    color: white;
    padding: 12px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    border: 1px solid #2c3e50;
}

.day-header.sunday {
    background-color: #e74c3c;
}

.day-header.saturday {
    background-color: #3498db;
}

.calendar-table td {
    border: 1px solid #ddd;
    padding: 0;
    height: 100px;
    width: 14.28%;
    vertical-align: top;
    position: relative;
    background-color: white;
    transition: background-color 0.2s ease;
}

.calendar-table td:hover {
    background-color: #f8f9fa;
}

.calendar-table td.sunday {
    background-color: #ffe8e8;
}

.calendar-table td.saturday {
    background-color: #e8f4ff;
}

.calendar-table td.other-month {
    background-color: #f5f5f5;
    opacity: 0.5;
}

.calendar-table td.today {
    background-color: #fff9e6;
    border: 2px solid #f39c12;
}

.calendar-table td.drag-over {
    background-color: #d4edda;
    border: 2px dashed #28a745;
}

/* 日付表示 */
.date-number {
    display: inline-block;
    padding: 5px 8px;
    font-weight: 600;
    font-size: 14px;
    color: #2c3e50;
}

.calendar-table td.sunday .date-number {
    color: #e74c3c;
}

.calendar-table td.saturday .date-number {
    color: #3498db;
}

.calendar-table td.today .date-number {
    background-color: #f39c12;
    color: white;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* カレンダー上のタスクバー */
.task-bar {
    position: absolute;
    top: 30px;
    left: 2px;
    right: 2px;
    height: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 12px;
    padding: 5px 8px;
    border-radius: 4px;
    cursor: move;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 10;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.2s ease;
}

.task-bar:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 20;
}

.task-bar.dragging {
    opacity: 0.5;
}

.task-bar.urgent {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.task-bar-title {
    font-weight: 600;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
}

.task-bar-content {
    font-size: 11px;
    margin-left: 5px;
    opacity: 0.9;
}

/* 複数タスクが重なった場合 */
.task-bar:nth-of-type(2) {
    top: 65px;
}

.task-bar:nth-of-type(3) {
    top: 100px;
}

/* タスク一覧エリア */
.assigned-tasks-section {
    background-color: #ecf0f1;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.assigned-tasks-section h2 {
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 20px;
}

.info-text {
    color: #7f8c8d;
    font-size: 14px;
    margin-bottom: 15px;
}

.task-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
}

/* タスクアイテム（カレンダーに配置前） */
.task-item {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px;
    border-radius: 8px;
    cursor: move;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.task-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.task-item.dragging {
    opacity: 0.5;
}

.task-item.urgent {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.task-item.placed {
    opacity: 0.5;
    cursor: not-allowed;
}

.task-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.task-item-title {
    font-size: 16px;
    font-weight: 700;
}

.task-item-days {
    background-color: rgba(255, 255, 255, 0.3);
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.task-item-content {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 500;
}

.task-item-deadline {
    font-size: 12px;
    opacity: 0.9;
}

/* 使い方説明 */
.instructions {
    background-color: #e8f4f8;
    padding: 20px;
    border-radius: 10px;
    border-left: 4px solid #3498db;
}

.instructions h3 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 18px;
}

.instructions ul {
    margin-left: 20px;
    color: #34495e;
    line-height: 1.8;
}

.instructions li {
    margin-bottom: 8px;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .calendar-table td {
        height: 80px;
        font-size: 12px;
    }

    .task-bar {
        font-size: 10px;
        height: 25px;
        padding: 3px 5px;
    }

    .task-list {
        grid-template-columns: 1fr;
    }

    .member-selector {
        flex-direction: column;
        align-items: flex-start;
    }
}

/* ヘッダーのボタン配置調整 */
.header-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

@media (max-width: 768px) {
    .header {
        flex-direction: column;
    }

    .header h1 {
        font-size: 20px;
        margin-bottom: 10px;
    }
}
```

---

## 📝 使い方

### ファイルの配置

1. `css` フォルダを作成
2. 上記3つのCSSファイルを作成
3. HTMLファイルから正しくリンク

### CSSの役割

- **style.css**: すべての画面で使う共通デザイン
- **task-management.css**: タスク管理画面専用のデザイン
- **member-view.css**: カレンダー画面専用のデザイン

### 重要なポイント

#### グラデーション
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
- 紫のグラデーションできれいに表示

#### ホバー効果
```css
.task-card:hover {
    transform: translateY(-5px);
}
```
- マウスを乗せると少し浮く

#### ドラッグ中のスタイル
```css
.task-card.dragging {
    opacity: 0.5;
}
```
- ドラッグ中は半透明になる

