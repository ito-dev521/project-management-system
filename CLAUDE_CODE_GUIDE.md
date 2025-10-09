# Claude Codeでの開発ガイド

このガイドでは、Claude Codeを使ってプロジェクトを作成する方法と、Supabaseとの連携方法を説明します。

---

## 📋 目次

1. [Claude Codeでのプロジェクト作成](#claude-codeでのプロジェクト作成)
2. [ファイル構成の確認](#ファイル構成の確認)
3. [動作確認](#動作確認)
4. [Supabase連携](#supabase連携)

---

## 🚀 Claude Codeでのプロジェクト作成

### ステップ1: プロジェクトフォルダの作成

```bash
mkdir project-management-system
cd project-management-system
```

### ステップ2: Claude Codeに指示

Claude Codeで以下のように指示します:

```
以下のファイル構造で業務管理システムを作成してください:

project-management-system/
├── index.html
├── task-management.html
├── member-view.html
├── css/
│   ├── style.css
│   ├── task-management.css
│   └── member-view.css
└── js/
    ├── app.js
    ├── task-management.js
    └── member-view.js

各ファイルの内容は、提供されたREADME.md、CSS_GUIDE.md、JAVASCRIPT_GUIDE.mdを参照してください。
```

### ステップ3: ファイルの確認

作成されたファイルを確認:

```bash
ls -R
```

---

## 📁 ファイル構成の確認

### 必要なファイル

- ✅ `index.html` - トップ画面
- ✅ `task-management.html` - タスク管理画面
- ✅ `member-view.html` - カレンダー画面
- ✅ `css/style.css` - 共通スタイル
- ✅ `css/task-management.css` - タスク管理スタイル
- ✅ `css/member-view.css` - カレンダースタイル
- ✅ `js/app.js` - トップ画面ロジック
- ✅ `js/task-management.js` - タスク管理ロジック
- ✅ `js/member-view.js` - カレンダーロジック

---

## 🧪 動作確認

### 方法1: ブラウザで直接開く

```bash
# macOSの場合
open index.html

# Linuxの場合
xdg-open index.html

# Windowsの場合
start index.html
```

### 方法2: ローカルサーバーを起動

Pythonが入っている場合:

```bash
# Python 3の場合
python -m http.server 8000

# Python 2の場合
python -m SimpleHTTPServer 8000
```

ブラウザで `http://localhost:8000` を開く

### 確認項目

- [ ] トップ画面が表示される
- [ ] 「業務の追加」ボタンでモーダルが開く
- [ ] 「タスク管理」ボタンで画面遷移できる
- [ ] タスクをドラッグ&ドロップできる
- [ ] カレンダーが表示される
- [ ] タスクをカレンダーに配置できる

---

## 🗄️ Supabase連携

### ステップ1: Supabaseプロジェクトを作成

1. [Supabase](https://supabase.com)にアクセス
2. 「New Project」をクリック
3. プロジェクト名を入力（例: `project-management`）
4. データベースパスワードを設定
5. リージョンを選択（日本なら`Northeast Asia (Tokyo)`）

### ステップ2: テーブルを作成

#### 1. `projects` テーブル（業務）

```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_number TEXT NOT NULL,
  project_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  contract_amount INTEGER NOT NULL,
  manager TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. `members` テーブル（課員）

```sql
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  email TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

課員データを挿入:

```sql
INSERT INTO members (name) VALUES
  ('福島'),
  ('大村'),
  ('北里'),
  ('牛嶋'),
  ('松本'),
  ('安田'),
  ('河原'),
  ('時里'),
  ('パート社員');
```

#### 3. `tasks` テーブル（タスク）

```sql
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  deadline DATE NOT NULL,
  estimated_days INTEGER NOT NULL,
  assigned_to TEXT REFERENCES members(name),
  start_date DATE,
  status TEXT DEFAULT '未着手',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### ステップ3: JavaScriptでSupabaseに接続

#### Supabase JSライブラリを追加

`index.html`の`<head>`に追加:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

#### 設定ファイルを作成

`js/config.js`を作成:

```javascript
// Supabaseの設定
const SUPABASE_URL = 'あなたのプロジェクトURL';
const SUPABASE_ANON_KEY = 'あなたのanon key';

// Supabaseクライアントを初期化
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

**URLとキーの取得方法:**
1. Supabaseダッシュボードで「Settings」→「API」
2. 「Project URL」をコピー
3. 「anon public」キーをコピー

### ステップ4: データの保存と取得

#### 業務を追加する

`js/app.js`に追加:

```javascript
// フォーム送信処理を更新
addProjectForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        project_number: document.getElementById('projectNumber').value,
        project_name: document.getElementById('projectName').value,
        start_date: document.getElementById('startDate').value,
        end_date: document.getElementById('endDate').value,
        contract_amount: parseInt(document.getElementById('contractAmount').value),
        manager: document.getElementById('manager').value
    };

    // Supabaseに保存
    const { data, error } = await supabase
        .from('projects')
        .insert([formData]);

    if (error) {
        console.error('エラー:', error);
        alert('保存に失敗しました');
    } else {
        console.log('保存成功:', data);
        alert(`業務「${formData.project_name}」を追加しました！`);
        
        // テーブルを再読み込み
        loadProjects();
    }

    addProjectForm.reset();
    addProjectModal.style.display = 'none';
});
```

#### 業務一覧を取得する

```javascript
// 業務一覧を取得して表示
async function loadProjects() {
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('エラー:', error);
        return;
    }

    // テーブルをクリア
    const tbody = document.getElementById('projectTableBody');
    tbody.innerHTML = '';

    // 各業務を表示
    projects.forEach(project => {
        const row = tbody.insertRow();
        
        // ステータスを判定
        const today = new Date();
        const endDate = new Date(project.end_date);
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        
        let statusClass = '';
        let statusText = '';
        
        if (daysLeft < 0) {
            statusClass = 'danger-row';
            statusText = '<span class="status-badge status-danger">期限過ぎ</span>';
        } else if (daysLeft <= 7) {
            statusClass = 'warning-row';
            statusText = '<span class="status-badge status-warning">期限近い</span>';
        } else {
            statusText = '<span class="status-badge status-progress">進行中</span>';
        }
        
        row.className = statusClass;
        row.innerHTML = `
            <td>${project.project_number}</td>
            <td>${project.project_name}</td>
            <td>${project.start_date} ~ ${project.end_date}</td>
            <td>¥${project.contract_amount.toLocaleString()}</td>
            <td>${project.manager}</td>
            <td>${statusText}</td>
            <td>
                <button class="btn-small btn-edit" data-id="${project.id}">編集</button>
                <button class="btn-small btn-delete" data-id="${project.id}">削除</button>
            </td>
        `;
    });
}

// ページ読み込み時に業務一覧を取得
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    // ... 他の初期化処理
});
```

#### タスクを追加する

`js/task-management.js`に追加:

```javascript
// タスク追加フォームを更新
addTaskForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const taskData = {
        title: document.getElementById('taskProject').value,
        content: document.getElementById('taskContent').value,
        deadline: document.getElementById('taskDeadline').value,
        estimated_days: parseInt(document.getElementById('estimatedDays').value),
        description: document.getElementById('taskDescription').value,
        status: '未着手'
    };

    // Supabaseに保存
    const { data, error } = await supabase
        .from('tasks')
        .insert([taskData]);

    if (error) {
        console.error('エラー:', error);
        alert('保存に失敗しました');
    } else {
        console.log('保存成功:', data);
        alert(`タスク「${taskData.title}」を追加しました！`);
        
        // タスク一覧を再読み込み
        loadTasks();
    }

    addTaskForm.reset();
    addTaskModal.style.display = 'none';
});
```

#### タスクを課員に割り当てる

```javascript
// ドロップ時に課員を割り当て
area.addEventListener('drop', async function(e) {
    e.preventDefault();
    this.classList.remove('drag-over');

    if (draggedElement) {
        const taskId = draggedElement.getAttribute('data-task-id');
        const memberName = this.getAttribute('data-member');
        
        // Supabaseで更新
        const { error } = await supabase
            .from('tasks')
            .update({ assigned_to: memberName })
            .eq('id', taskId);

        if (error) {
            console.error('エラー:', error);
            alert('割り当てに失敗しました');
            return;
        }

        // UIを更新
        this.appendChild(draggedElement);
        console.log(`タスクを${memberName}に割り当てました`);
        
        updateTaskCounts();
        updateMemberBoxStatus();
    }
});
```

### ステップ5: リアルタイム更新

Supabaseのリアルタイム機能を使って、他のユーザーの変更を即座に反映:

```javascript
// リアルタイム更新を購読
supabase
    .channel('projects-channel')
    .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' }, 
        (payload) => {
            console.log('変更を検知:', payload);
            loadProjects(); // 業務一覧を再読み込み
        }
    )
    .subscribe();

supabase
    .channel('tasks-channel')
    .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks' }, 
        (payload) => {
            console.log('変更を検知:', payload);
            loadTasks(); // タスク一覧を再読み込み
        }
    )
    .subscribe();
```

---

## 🔒 セキュリティ設定（RLS）

Supabaseの Row Level Security を設定して、データを保護します。

### プロジェクトテーブル

```sql
-- プロジェクトの読み取りを全員に許可
CREATE POLICY "Enable read access for all users" ON "public"."projects"
FOR SELECT USING (true);

-- プロジェクトの挿入を全員に許可
CREATE POLICY "Enable insert for all users" ON "public"."projects"
FOR INSERT WITH CHECK (true);

-- プロジェクトの更新を全員に許可
CREATE POLICY "Enable update for all users" ON "public"."projects"
FOR UPDATE USING (true);

-- プロジェクトの削除を全員に許可
CREATE POLICY "Enable delete for all users" ON "public"."projects"
FOR DELETE USING (true);
```

※ 本番環境では、認証を追加してユーザーごとに権限を設定してください

### タスクテーブル

```sql
-- タスクの読み取りを全員に許可
CREATE POLICY "Enable read access for all users" ON "public"."tasks"
FOR SELECT USING (true);

-- タスクの挿入を全員に許可
CREATE POLICY "Enable insert for all users" ON "public"."tasks"
FOR INSERT WITH CHECK (true);

-- タスクの更新を全員に許可
CREATE POLICY "Enable update for all users" ON "public"."tasks"
FOR UPDATE USING (true);

-- タスクの削除を全員に許可
CREATE POLICY "Enable delete for all users" ON "public"."tasks"
FOR DELETE USING (true);
```

---

## 📝 チェックリスト

### 基本機能
- [ ] プロジェクトフォルダの作成
- [ ] すべてのファイルの作成
- [ ] ブラウザで動作確認

### Supabase連携
- [ ] Supabaseプロジェクトの作成
- [ ] テーブルの作成
- [ ] JavaScriptでの接続
- [ ] データの保存機能
- [ ] データの取得機能
- [ ] リアルタイム更新

### テスト
- [ ] 業務の追加
- [ ] タスクの追加
- [ ] タスクの割り振り
- [ ] カレンダーへの配置
- [ ] 複数ブラウザでの同期確認

---

## 🐛 トラブルシューティング

### エラー: CORS policy

**問題**: ローカルファイルからSupabaseにアクセスできない

**解決策**: ローカルサーバーを起動する
```bash
python -m http.server 8000
```

### エラー: Row Level Security policy

**問題**: データが取得できない

**解決策**: Supabaseダッシュボードで RLS を有効化し、ポリシーを設定

### エラー: Failed to fetch

**問題**: Supabase URLまたはキーが間違っている

**解決策**: `js/config.js`の設定を確認

---

## 🚀 次のステップ

1. **認証機能を追加**
   - Supabase Authでログイン機能を実装
   - ユーザーごとにデータを分離

2. **検索・フィルター機能**
   - 業務やタスクを検索
   - 期限でフィルタリング

3. **通知機能**
   - 期限が近いタスクを通知
   - メール通知

4. **レポート機能**
   - 進捗状況をグラフ化
   - PDF出力

---

## 💡 Claude Codeでの効率的な開発

### 便利なプロンプト例

**ファイル作成**
```
「README.mdの内容を元に、index.htmlを作成してください」
```

**機能追加**
```
「タスクの編集機能を追加してください。モーダルで既存データを表示し、更新できるようにしてください」
```

**デバッグ**
```
「ドラッグ&ドロップが動作しません。console.logを追加してデバッグしてください」
```

**リファクタリング**
```
「重複しているコードを関数にまとめて、可読性を向上させてください」
```

---

これで業務管理システムの完全な開発ガイドが完成しました！🎉

