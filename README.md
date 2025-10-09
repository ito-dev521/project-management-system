# 業務管理システム - 完全ガイド

## 📋 プロジェクト概要

このシステムは、業務とタスクを管理するWebアプリケーションです。

### 主な機能
- ✅ 業務の登録・管理
- ✅ タスクの作成と課員への割り振り（ドラッグ&ドロップ）
- ✅ 課員ごとのカレンダー表示
- ✅ 進捗状況の視覚化（色分け表示）

---

## 📁 ファイル構造

```
project-management-system/
├── index.html              # トップ画面（業務一覧）
├── task-management.html    # タスク管理画面（ドラップ&ドロップで割り振り）
├── member-view.html        # カレンダー画面（各課員のスケジュール）
├── css/
│   ├── style.css          # 共通スタイル
│   ├── task-management.css # タスク管理専用スタイル
│   └── member-view.css    # カレンダー専用スタイル
└── js/
    ├── app.js             # トップ画面のロジック
    ├── task-management.js # タスク管理のロジック
    └── member-view.js     # カレンダーのロジック
```

---

## 🚀 セットアップ手順

### 1. フォルダとファイルを作成

```bash
mkdir project-management-system
cd project-management-system
mkdir css js
```

### 2. 各ファイルを作成

以下のファイルを順番に作成してください。

---

## 📄 ファイルの内容

### index.html

トップ画面のHTMLファイルです。

<details>
<summary>📝 index.html の完全なコード（クリックで展開）</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>業務管理システム - トップ画面</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <!-- ヘッダー -->
        <header class="header">
            <h1>業務管理システム</h1>
            <div class="header-buttons">
                <button class="btn btn-primary" id="addProjectBtn">業務の追加</button>
                <button class="btn btn-secondary" id="taskManagementBtn">タスク管理</button>
            </div>
        </header>

        <!-- 業務一覧テーブル -->
        <main class="main-content">
            <h2>業務一覧</h2>
            <div class="table-container">
                <table class="project-table">
                    <thead>
                        <tr>
                            <th>業務番号</th>
                            <th>業務名</th>
                            <th>工期</th>
                            <th>契約金額</th>
                            <th>担当者</th>
                            <th>ステータス</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="projectTableBody">
                        <!-- サンプルデータ -->
                        <tr>
                            <td>R6-001</td>
                            <td>R325線形検討業務</td>
                            <td>2025/10/01 ~ 2025/12/31</td>
                            <td>¥5,000,000</td>
                            <td>福島</td>
                            <td><span class="status-badge status-progress">進行中</span></td>
                            <td>
                                <button class="btn-small btn-edit">編集</button>
                                <button class="btn-small btn-delete">削除</button>
                            </td>
                        </tr>
                        <tr class="warning-row">
                            <td>R6-002</td>
                            <td>舗装維持管理業務</td>
                            <td>2025/09/15 ~ 2025/10/15</td>
                            <td>¥3,500,000</td>
                            <td>大村</td>
                            <td><span class="status-badge status-warning">期限近い</span></td>
                            <td>
                                <button class="btn-small btn-edit">編集</button>
                                <button class="btn-small btn-delete">削除</button>
                            </td>
                        </tr>
                        <tr class="danger-row">
                            <td>R6-003</td>
                            <td>運動公園数量修正業務</td>
                            <td>2025/09/01 ~ 2025/10/05</td>
                            <td>¥2,800,000</td>
                            <td>北里</td>
                            <td><span class="status-badge status-danger">期限過ぎ</span></td>
                            <td>
                                <button class="btn-small btn-edit">編集</button>
                                <button class="btn-small btn-delete">削除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>

        <!-- 業務追加モーダル -->
        <div id="addProjectModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>業務追加</h2>
                    <span class="close">&times;</span>
                </div>
                <form id="addProjectForm">
                    <div class="form-group">
                        <label for="projectNumber">業務番号</label>
                        <input type="text" id="projectNumber" name="projectNumber" required>
                    </div>
                    <div class="form-group">
                        <label for="projectName">業務名</label>
                        <input type="text" id="projectName" name="projectName" required>
                    </div>
                    <div class="form-group">
                        <label for="startDate">開始日</label>
                        <input type="date" id="startDate" name="startDate" required>
                    </div>
                    <div class="form-group">
                        <label for="endDate">終了日</label>
                        <input type="date" id="endDate" name="endDate" required>
                    </div>
                    <div class="form-group">
                        <label for="contractAmount">契約金額（円）</label>
                        <input type="number" id="contractAmount" name="contractAmount" required>
                    </div>
                    <div class="form-group">
                        <label for="manager">担当者</label>
                        <select id="manager" name="manager" required>
                            <option value="">選択してください</option>
                            <option value="福島">福島</option>
                            <option value="大村">大村</option>
                            <option value="北里">北里</option>
                            <option value="牛嶋">牛嶋</option>
                            <option value="松本">松本</option>
                            <option value="安田">安田</option>
                            <option value="河原">河原</option>
                            <option value="時里">時里</option>
                            <option value="パート社員">パート社員</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">追加</button>
                        <button type="button" class="btn btn-secondary" id="cancelBtn">キャンセル</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
```

</details>

---

### task-management.html

タスク管理画面のHTMLファイルです。

<details>
<summary>📝 task-management.html の完全なコード（クリックで展開）</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>タスク管理 - 業務管理システム</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/task-management.css">
</head>
<body>
    <div class="container">
        <!-- ヘッダー -->
        <header class="header">
            <h1>タスク管理</h1>
            <div class="header-buttons">
                <button class="btn btn-secondary" id="backToTopBtn">トップに戻る</button>
                <button class="btn btn-primary" id="addTaskBtn">タスク追加</button>
            </div>
        </header>

        <!-- メインコンテンツ -->
        <main class="main-content">
            <!-- 未割り当てタスクエリア -->
            <div class="unassigned-section">
                <h2>未割り当てのタスク</h2>
                <div id="unassignedTasks" class="task-pool">
                    <!-- サンプルタスク -->
                    <div class="task-card" data-task-id="1" draggable="true">
                        <div class="task-title">R325</div>
                        <div class="task-content">線形検討</div>
                        <div class="task-info">
                            <span class="task-deadline">期限: 2025/10/20</span>
                        </div>
                    </div>

                    <div class="task-card" data-task-id="2" draggable="true">
                        <div class="task-title">運動公園</div>
                        <div class="task-content">数量修正</div>
                        <div class="task-info">
                            <span class="task-deadline">期限: 2025/10/15</span>
                        </div>
                    </div>

                    <div class="task-card" data-task-id="3" draggable="true">
                        <div class="task-title">舗装維持</div>
                        <div class="task-content">業務計画書作成</div>
                        <div class="task-info">
                            <span class="task-deadline">期限: 2025/10/18</span>
                        </div>
                    </div>

                    <div class="task-card task-urgent" data-task-id="4" draggable="true">
                        <div class="task-title">大津植木</div>
                        <div class="task-content">設計書作成</div>
                        <div class="task-info">
                            <span class="task-deadline">期限: 2025/10/12</span>
                            <span class="task-badge urgent">緊急</span>
                        </div>
                    </div>

                    <div class="task-card" data-task-id="5" draggable="true">
                        <div class="task-title">短期対策</div>
                        <div class="task-content">報告書作成</div>
                        <div class="task-info">
                            <span class="task-deadline">期限: 2025/10/25</span>
                        </div>
                    </div>

                    <div class="task-card" data-task-id="6" draggable="true">
                        <div class="task-title">短期対策</div>
                        <div class="task-content">概要版作成</div>
                        <div class="task-info">
                            <span class="task-deadline">期限: 2025/10/22</span>
                        </div>
                    </div>

                    <div class="task-card" data-task-id="7" draggable="true">
                        <div class="task-title">民間開発</div>
                        <div class="task-content">交差点協議資料</div>
                        <div class="task-info">
                            <span class="task-deadline">期限: 2025/10/30</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 課員割り振りエリア -->
            <div class="assignment-section">
                <h2>課員別タスク割り振り</h2>
                <div class="members-grid">
                    <!-- 各課員のボックス -->
                    <div class="member-box" data-member-id="福島">
                        <div class="member-header">
                            <h3>福島</h3>
                            <span class="task-count">0</span>
                        </div>
                        <div class="member-tasks" data-member="福島">
                        </div>
                    </div>

                    <div class="member-box" data-member-id="大村">
                        <div class="member-header">
                            <h3>大村</h3>
                            <span class="task-count">0</span>
                        </div>
                        <div class="member-tasks" data-member="大村">
                        </div>
                    </div>

                    <div class="member-box" data-member-id="北里">
                        <div class="member-header">
                            <h3>北里</h3>
                            <span class="task-count">0</span>
                        </div>
                        <div class="member-tasks" data-member="北里">
                        </div>
                    </div>

                    <div class="member-box" data-member-id="牛嶋">
                        <div class="member-header">
                            <h3>牛嶋</h3>
                            <span class="task-count">0</span>
                        </div>
                        <div class="member-tasks" data-member="牛嶋">
                        </div>
                    </div>

                    <div class="member-box" data-member-id="松本">
                        <div class="member-header">
                            <h3>松本</h3>
                            <span class="task-count">0</span>
                        </div>
                        <div class="member-tasks" data-member="松本">
                        </div>
                    </div>

                    <div class="member-box" data-member-id="安田">
                        <div class="member-header">
                            <h3>安田</h3>
                            <span class="task-count">0</span>
                        </div>
                        <div class="member-tasks" data-member="安田">
                        </div>
                    </div>

                    <div class="member-box" data-member-id="河原">
                        <div class="member-header">
                            <h3>河原</h3>
                            <span class="task-count">0</span>
                        </div>
                        <div class="member-tasks" data-member="河原">
                        </div>
                    </div>

                    <div class="member-box" data-member-id="時里">
                        <div class="member-header">
                            <h3>時里</h3>
                            <span class="task-count">0</span>
                        </div>
                        <div class="member-tasks" data-member="時里">
                        </div>
                    </div>

                    <div class="member-box" data-member-id="パート社員">
                        <div class="member-header">
                            <h3>パート社員</h3>
                            <span class="task-count">0</span>
                        </div>
                        <div class="member-tasks" data-member="パート社員">
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- タスク追加モーダル -->
        <div id="addTaskModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>タスク追加</h2>
                    <span class="close">&times;</span>
                </div>
                <form id="addTaskForm">
                    <div class="form-group">
                        <label for="taskProject">業務名（タイトル）</label>
                        <input type="text" id="taskProject" name="taskProject" placeholder="例: R325" required>
                    </div>
                    <div class="form-group">
                        <label for="taskContent">作業内容</label>
                        <input type="text" id="taskContent" name="taskContent" placeholder="例: 線形検討" required>
                    </div>
                    <div class="form-group">
                        <label for="taskDeadline">期限</label>
                        <input type="date" id="taskDeadline" name="taskDeadline" required>
                    </div>
                    <div class="form-group">
                        <label for="estimatedDays">想定日数</label>
                        <input type="number" id="estimatedDays" name="estimatedDays" min="1" placeholder="例: 5" required>
                    </div>
                    <div class="form-group">
                        <label for="taskDescription">具体的な作業内容</label>
                        <textarea id="taskDescription" name="taskDescription" rows="4" placeholder="詳細な作業内容を入力"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">追加</button>
                        <button type="button" class="btn btn-secondary" id="cancelTaskBtn">キャンセル</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="js/app.js"></script>
    <script src="js/task-management.js"></script>
</body>
</html>
```

</details>

---

### member-view.html

カレンダー画面のHTMLファイルです。

<details>
<summary>📝 member-view.html の完全なコード（クリックで展開）</summary>

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>カレンダー - 業務管理システム</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/member-view.css">
</head>
<body>
    <div class="container">
        <!-- ヘッダー -->
        <header class="header">
            <h1>📅 <span id="memberName">福島</span> さんのカレンダー</h1>
            <div class="header-buttons">
                <button class="btn btn-secondary" id="backToTaskBtn">タスク管理に戻る</button>
                <button class="btn btn-primary" id="prevMonth">← 前月</button>
                <button class="btn btn-primary" id="nextMonth">次月 →</button>
            </div>
        </header>

        <!-- メインコンテンツ -->
        <main class="main-content">
            <!-- 課員選択 -->
            <div class="member-selector">
                <label for="selectMember">課員を選択:</label>
                <select id="selectMember" class="member-select">
                    <option value="福島">福島</option>
                    <option value="大村">大村</option>
                    <option value="北里">北里</option>
                    <option value="牛嶋">牛嶋</option>
                    <option value="松本">松本</option>
                    <option value="安田">安田</option>
                    <option value="河原">河原</option>
                    <option value="時里">時里</option>
                    <option value="パート社員">パート社員</option>
                </select>
            </div>

            <!-- カレンダー表示エリア -->
            <div class="calendar-section">
                <div class="calendar-header">
                    <h2 id="currentMonth">2025年10月</h2>
                </div>

                <!-- カレンダー本体 -->
                <div class="calendar-container">
                    <table class="calendar-table">
                        <thead>
                            <tr>
                                <th class="day-header sunday">日</th>
                                <th class="day-header">月</th>
                                <th class="day-header">火</th>
                                <th class="day-header">水</th>
                                <th class="day-header">木</th>
                                <th class="day-header">金</th>
                                <th class="day-header saturday">土</th>
                            </tr>
                        </thead>
                        <tbody id="calendarBody">
                            <!-- JavaScriptで動的に生成 -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 割り当てられたタスク一覧 -->
            <div class="assigned-tasks-section">
                <h2>割り当てられたタスク</h2>
                <div class="info-text">
                    タスクをドラッグしてカレンダーに配置してください
                </div>
                <div id="assignedTaskList" class="task-list">
                    <!-- サンプルタスク -->
                    <div class="task-item" data-task-id="1" data-days="5" draggable="true">
                        <div class="task-item-header">
                            <span class="task-item-title">R325</span>
                            <span class="task-item-days">5日間</span>
                        </div>
                        <div class="task-item-content">線形検討</div>
                        <div class="task-item-deadline">期限: 2025/10/20</div>
                    </div>

                    <div class="task-item" data-task-id="2" data-days="3" draggable="true">
                        <div class="task-item-header">
                            <span class="task-item-title">舗装維持</span>
                            <span class="task-item-days">3日間</span>
                        </div>
                        <div class="task-item-content">業務計画書作成</div>
                        <div class="task-item-deadline">期限: 2025/10/18</div>
                    </div>

                    <div class="task-item task-urgent" data-task-id="3" data-days="2" draggable="true">
                        <div class="task-item-header">
                            <span class="task-item-title">大津植木</span>
                            <span class="task-item-days">2日間</span>
                        </div>
                        <div class="task-item-content">設計書作成</div>
                        <div class="task-item-deadline">期限: 2025/10/15</div>
                    </div>

                    <div class="task-item" data-task-id="4" data-days="4" draggable="true">
                        <div class="task-item-header">
                            <span class="task-item-title">短期対策</span>
                            <span class="task-item-days">4日間</span>
                        </div>
                        <div class="task-item-content">報告書作成</div>
                        <div class="task-item-deadline">期限: 2025/10/25</div>
                    </div>
                </div>
            </div>

            <!-- 使い方の説明 -->
            <div class="instructions">
                <h3>📌 使い方</h3>
                <ul>
                    <li>左側のタスクをカレンダーにドラッグ&ドロップして開始日を設定</li>
                    <li>タスクの長さは自動的に想定日数分表示されます</li>
                    <li>配置済みのタスクもドラッグして移動できます</li>
                    <li>カレンダー上で誰が何をしているか一目で確認できます</li>
                </ul>
            </div>
        </main>
    </div>

    <script src="js/app.js"></script>
    <script src="js/member-view.js"></script>
</body>
</html>
```

</details>

---

## 🎨 CSSファイル

続いてCSSファイルを作成します。

### css/style.css

共通のスタイルシートです。

[コードは次のセクションに続きます...]

---

## 💻 使い方

### ブラウザで開く

1. `index.html` をブラウザで開く
2. 「タスク管理」ボタンで `task-management.html` へ移動
3. `member-view.html` は直接開いてカレンダー表示

### 機能の確認

- ✅ 業務追加: モーダルが開いてフォーム入力
- ✅ タスクのドラッグ&ドロップ: 課員に割り振り
- ✅ カレンダー: タスクを日付に配置

---

## 🔄 次のステップ: Supabase連携

データベースに接続して、データを永続化します。

### 必要な作業
1. Supabaseプロジェクト作成
2. テーブル設計
3. JavaScript SDKで接続
4. CRUD操作の実装

詳細は別途ガイドを作成します。

---

## 📝 メモ

### 現状の制限
- データはブラウザをリロードすると消える（メモリ上のみ）
- 複数人での同時利用不可
- 認証機能なし

### これから実装する機能
- Supabaseでデータ永続化
- リアルタイム更新
- ユーザー認証
- 編集・削除機能の強化

