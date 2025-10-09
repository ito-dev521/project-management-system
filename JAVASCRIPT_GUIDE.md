# JavaScriptファイル - 完全なコード

このファイルには、すべてのJavaScriptファイルの完全なコードが含まれています。

---

## 📄 js/app.js

トップ画面のJavaScript（モーダルの開閉など）

```javascript
// ページが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('業務管理システムが起動しました');

    // モーダル関連の要素を取得
    const addProjectBtn = document.getElementById('addProjectBtn');
    const addProjectModal = document.getElementById('addProjectModal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const taskManagementBtn = document.getElementById('taskManagementBtn');

    // 「業務の追加」ボタンをクリック → モーダルを表示
    addProjectBtn.addEventListener('click', function() {
        addProjectModal.style.display = 'block';
        console.log('業務追加モーダルを開きました');
    });

    // ×ボタンをクリック → モーダルを閉じる
    closeBtn.addEventListener('click', function() {
        addProjectModal.style.display = 'none';
        console.log('モーダルを閉じました');
    });

    // キャンセルボタンをクリック → モーダルを閉じる
    cancelBtn.addEventListener('click', function() {
        addProjectModal.style.display = 'none';
        console.log('モーダルを閉じました');
    });

    // モーダルの外側をクリック → モーダルを閉じる
    window.addEventListener('click', function(event) {
        if (event.target === addProjectModal) {
            addProjectModal.style.display = 'none';
            console.log('モーダルを閉じました');
        }
    });

    // 「タスク管理」ボタンをクリック → タスク管理画面へ遷移
    taskManagementBtn.addEventListener('click', function() {
        console.log('タスク管理画面へ移動します');
        window.location.href = 'task-management.html';
    });

    // フォーム送信処理
    const addProjectForm = document.getElementById('addProjectForm');
    addProjectForm.addEventListener('submit', function(event) {
        event.preventDefault(); // ページのリロードを防ぐ

        // フォームの値を取得
        const formData = {
            projectNumber: document.getElementById('projectNumber').value,
            projectName: document.getElementById('projectName').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            contractAmount: document.getElementById('contractAmount').value,
            manager: document.getElementById('manager').value
        };

        console.log('新しい業務を追加:', formData);

        // 後でSupabaseに保存する処理を追加します
        alert(`業務「${formData.projectName}」を追加しました！\n（まだデータベースには保存されていません）`);

        // フォームをリセット
        addProjectForm.reset();

        // モーダルを閉じる
        addProjectModal.style.display = 'none';
    });

    // 編集ボタンと削除ボタンにイベントを追加
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-delete');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 後で実装
            alert('編集機能は後で実装します！');
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const confirmed = confirm('この業務を削除しますか?');
            if (confirmed) {
                // 後で実装
                alert('削除機能は後で実装します！');
            }
        });
    });
});
```

### コードの説明

#### イベントリスナー
```javascript
addProjectBtn.addEventListener('click', function() {
    // ボタンがクリックされたら実行
});
```
- `addEventListener`: イベントが発生したら処理を実行
- `'click'`: クリックイベント
- `function() {...}`: 実行する処理

#### モーダルの表示・非表示
```javascript
addProjectModal.style.display = 'block';  // 表示
addProjectModal.style.display = 'none';   // 非表示
```
- CSSの`display`プロパティを変更

#### フォーム送信の防止
```javascript
event.preventDefault();
```
- ページのリロードを防ぐ（重要！）

---

## 📄 js/task-management.js

タスク管理画面のJavaScript（ドラッグ&ドロップ機能）

```javascript
// タスク管理画面の処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('タスク管理画面が起動しました');

    // ===== モーダル関連 =====
    const addTaskBtn = document.getElementById('addTaskBtn');
    const addTaskModal = document.getElementById('addTaskModal');
    const closeBtn = document.querySelector('.close');
    const cancelTaskBtn = document.getElementById('cancelTaskBtn');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // タスク追加ボタン
    addTaskBtn.addEventListener('click', function() {
        addTaskModal.style.display = 'block';
    });

    // モーダルを閉じる
    closeBtn.addEventListener('click', function() {
        addTaskModal.style.display = 'none';
    });

    cancelTaskBtn.addEventListener('click', function() {
        addTaskModal.style.display = 'none';
    });

    // モーダルの外側をクリックしたら閉じる
    window.addEventListener('click', function(event) {
        if (event.target === addTaskModal) {
            addTaskModal.style.display = 'none';
        }
    });

    // トップに戻るボタン
    backToTopBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // ===== タスク追加フォーム =====
    const addTaskForm = document.getElementById('addTaskForm');
    addTaskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // フォームの値を取得
        const taskData = {
            project: document.getElementById('taskProject').value,
            content: document.getElementById('taskContent').value,
            deadline: document.getElementById('taskDeadline').value,
            estimatedDays: document.getElementById('estimatedDays').value,
            description: document.getElementById('taskDescription').value
        };

        console.log('新しいタスクを追加:', taskData);

        // 新しいタスクカードを作成
        createTaskCard(taskData);

        // フォームをリセット
        addTaskForm.reset();

        // モーダルを閉じる
        addTaskModal.style.display = 'none';

        alert(`タスク「${taskData.project}」を追加しました！`);
    });

    // ===== ドラッグ&ドロップ機能 =====
    
    let draggedElement = null; // ドラッグ中の要素を保存

    // すべてのタスクカードにドラッグイベントを設定
    function setupDragAndDrop() {
        const taskCards = document.querySelectorAll('.task-card');
        const memberTasks = document.querySelectorAll('.member-tasks');
        const unassignedTasks = document.getElementById('unassignedTasks');

        // タスクカードのドラッグ開始
        taskCards.forEach(card => {
            card.addEventListener('dragstart', function(e) {
                draggedElement = this; // ドラッグ中の要素を保存
                this.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                console.log('ドラッグ開始:', this.querySelector('.task-title').textContent);
            });

            // ドラッグ終了
            card.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                console.log('ドラッグ終了');
            });
        });

        // 課員エリアのドロップ設定
        memberTasks.forEach(area => {
            // ドラッグ要素がエリアに入った時
            area.addEventListener('dragenter', function(e) {
                e.preventDefault();
                this.classList.add('drag-over');
            });

            // ドラッグ要素がエリア上にある時
            area.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            // ドラッグ要素がエリアから出た時
            area.addEventListener('dragleave', function(e) {
                if (e.target === this) {
                    this.classList.remove('drag-over');
                }
            });

            // ドロップされた時
            area.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');

                if (draggedElement) {
                    // タスクカードをこのエリアに追加
                    this.appendChild(draggedElement);
                    
                    const memberName = this.getAttribute('data-member');
                    console.log(`タスクを${memberName}に割り当てました`);

                    // タスク数を更新
                    updateTaskCounts();
                    
                    // 課員ボックスの状態を更新
                    updateMemberBoxStatus();
                }
            });
        });

        // 未割り当てエリアのドロップ設定
        if (unassignedTasks) {
            unassignedTasks.addEventListener('dragenter', function(e) {
                e.preventDefault();
                this.classList.add('drag-over');
            });

            unassignedTasks.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            unassignedTasks.addEventListener('dragleave', function(e) {
                if (e.target === this) {
                    this.classList.remove('drag-over');
                }
            });

            unassignedTasks.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');

                if (draggedElement) {
                    // タスクカードを未割り当てエリアに戻す
                    this.appendChild(draggedElement);
                    console.log('タスクを未割り当てに戻しました');

                    // タスク数を更新
                    updateTaskCounts();
                    
                    // 課員ボックスの状態を更新
                    updateMemberBoxStatus();
                }
            });
        }
    }

    // タスク数を更新する関数
    function updateTaskCounts() {
        const memberBoxes = document.querySelectorAll('.member-box');
        
        memberBoxes.forEach(box => {
            const memberTasks = box.querySelector('.member-tasks');
            const taskCount = memberTasks.querySelectorAll('.task-card').length;
            const countBadge = box.querySelector('.task-count');
            
            countBadge.textContent = taskCount;
            
            // タスク数に応じて色を変える
            if (taskCount === 0) {
                countBadge.style.backgroundColor = '#95a5a6';
            } else if (taskCount >= 3) {
                countBadge.style.backgroundColor = '#e74c3c';
            } else {
                countBadge.style.backgroundColor = '#3498db';
            }
        });
    }

    // 課員ボックスの状態を更新（色分け）
    function updateMemberBoxStatus() {
        const memberBoxes = document.querySelectorAll('.member-box');
        
        memberBoxes.forEach(box => {
            const memberTasks = box.querySelector('.member-tasks');
            const tasks = memberTasks.querySelectorAll('.task-card');
            
            // リセット
            box.classList.remove('has-urgent', 'no-tasks');
            
            // タスクがない場合
            if (tasks.length === 0) {
                box.classList.add('no-tasks');
            } else {
                // 緊急タスクがあるか確認
                const hasUrgent = Array.from(tasks).some(task => 
                    task.classList.contains('task-urgent')
                );
                
                if (hasUrgent) {
                    box.classList.add('has-urgent');
                }
            }
        });
    }

    // 新しいタスクカードを作成する関数
    function createTaskCard(taskData) {
        const unassignedTasks = document.getElementById('unassignedTasks');
        
        // 今日の日付を取得
        const today = new Date();
        const deadline = new Date(taskData.deadline);
        const daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        
        // 緊急かどうか判定（3日以内）
        const isUrgent = daysUntilDeadline <= 3;
        
        // タスクカードのHTML作成
        const taskCard = document.createElement('div');
        taskCard.className = isUrgent ? 'task-card task-urgent' : 'task-card';
        taskCard.setAttribute('draggable', 'true');
        taskCard.setAttribute('data-task-id', Date.now()); // 一時的なID
        
        taskCard.innerHTML = `
            <div class="task-title">${taskData.project}</div>
            <div class="task-content">${taskData.content}</div>
            <div class="task-info">
                <span class="task-deadline">期限: ${taskData.deadline}</span>
                ${isUrgent ? '<span class="task-badge urgent">緊急</span>' : ''}
            </div>
        `;
        
        // 未割り当てエリアに追加
        unassignedTasks.appendChild(taskCard);
        
        // 新しいタスクにもドラッグイベントを設定
        setupDragAndDrop();
    }

    // 初期化: ドラッグ&ドロップ機能を有効化
    setupDragAndDrop();
    
    // 初期化: タスク数を更新
    updateTaskCounts();
    
    // 初期化: 課員ボックスの状態を更新
    updateMemberBoxStatus();

    console.log('ドラッグ&ドロップ機能を有効にしました');
    console.log('タスクをドラッグして課員に割り振ってください！');
});
```

### コードの説明

#### ドラッグ&ドロップの仕組み

**1. ドラッグ開始**
```javascript
card.addEventListener('dragstart', function(e) {
    draggedElement = this; // 要素を保存
});
```

**2. ドロップエリアに入る**
```javascript
area.addEventListener('dragenter', function(e) {
    e.preventDefault(); // デフォルトの動作をキャンセル
});
```

**3. ドロップ**
```javascript
area.addEventListener('drop', function(e) {
    this.appendChild(draggedElement); // 要素を移動
});
```

#### 重要なポイント
- `e.preventDefault()`: ドロップを許可するために必須
- `appendChild()`: 要素を別の親要素に移動
- `classList.add/remove()`: CSSクラスの追加・削除

---

## 📄 js/member-view.js

カレンダー画面のJavaScript（カレンダー生成とタスク配置）

```javascript
// カレンダー画面の処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('カレンダー画面が起動しました');

    // ===== 変数の定義 =====
    let currentYear = 2025;
    let currentMonth = 9; // JavaScriptでは0=1月なので、9=10月
    let draggedTask = null;
    let currentMember = '福島';

    // ===== DOM要素の取得 =====
    const calendarBody = document.getElementById('calendarBody');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const backToTaskBtn = document.getElementById('backToTaskBtn');
    const selectMember = document.getElementById('selectMember');
    const memberNameDisplay = document.getElementById('memberName');

    // ===== ボタンイベント =====
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentYear, currentMonth);
    });

    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    });

    backToTaskBtn.addEventListener('click', function() {
        window.location.href = 'task-management.html';
    });

    selectMember.addEventListener('change', function() {
        currentMember = this.value;
        memberNameDisplay.textContent = currentMember;
        console.log(`課員を${currentMember}に変更しました`);
    });

    // ===== カレンダー生成関数 =====
    function generateCalendar(year, month) {
        // カレンダーをクリア
        calendarBody.innerHTML = '';

        // 月の表示を更新
        currentMonthDisplay.textContent = `${year}年${month + 1}月`;

        // 月の最初の日と最後の日を取得
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // 月の最初の日の曜日 (0=日曜日)
        const firstDayOfWeek = firstDay.getDay();
        
        // 月の日数
        const daysInMonth = lastDay.getDate();

        // 前月の日数
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        // 今日の日付
        const today = new Date();
        const isCurrentMonth = (today.getFullYear() === year && today.getMonth() === month);
        const todayDate = today.getDate();

        let date = 1;
        let nextMonthDate = 1;

        // カレンダーを6週間分作成（最大6行必要）
        for (let week = 0; week < 6; week++) {
            const row = document.createElement('tr');

            // 1週間分（7日）のセルを作成
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                const cell = document.createElement('td');
                cell.setAttribute('data-drop-zone', 'true');

                // 曜日のクラスを追加
                if (dayOfWeek === 0) {
                    cell.classList.add('sunday');
                } else if (dayOfWeek === 6) {
                    cell.classList.add('saturday');
                }

                // セルに日付を表示
                if (week === 0 && dayOfWeek < firstDayOfWeek) {
                    // 前月の日付
                    const prevDate = prevMonthLastDay - (firstDayOfWeek - dayOfWeek - 1);
                    cell.innerHTML = `<span class="date-number">${prevDate}</span>`;
                    cell.classList.add('other-month');
                } else if (date > daysInMonth) {
                    // 次月の日付
                    cell.innerHTML = `<span class="date-number">${nextMonthDate}</span>`;
                    cell.classList.add('other-month');
                    nextMonthDate++;
                } else {
                    // 今月の日付
                    cell.innerHTML = `<span class="date-number">${date}</span>`;
                    cell.setAttribute('data-date', `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`);

                    // 今日の日付にクラスを追加
                    if (isCurrentMonth && date === todayDate) {
                        cell.classList.add('today');
                    }

                    date++;
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);

            // すべての日付を表示し終えたらループを終了
            if (date > daysInMonth && nextMonthDate > 7) {
                break;
            }
        }

        // ドロップゾーンを設定
        setupDropZones();
    }

    // ===== ドロップゾーンの設定 =====
    function setupDropZones() {
        const dropZones = document.querySelectorAll('[data-drop-zone="true"]');

        dropZones.forEach(zone => {
            // ドラッグオーバー時
            zone.addEventListener('dragover', function(e) {
                e.preventDefault();
                if (!this.classList.contains('other-month')) {
                    this.classList.add('drag-over');
                }
            });

            // ドラッグリーブ時
            zone.addEventListener('dragleave', function(e) {
                this.classList.remove('drag-over');
            });

            // ドロップ時
            zone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');

                // 他の月のセルにはドロップできない
                if (this.classList.contains('other-month')) {
                    alert('他の月にはタスクを配置できません');
                    return;
                }

                const startDate = this.getAttribute('data-date');
                if (draggedTask && startDate) {
                    placeTaskOnCalendar(draggedTask, startDate);
                }
            });
        });
    }

    // ===== タスクアイテムのドラッグ設定 =====
    function setupTaskDrag() {
        const taskItems = document.querySelectorAll('.task-item');

        taskItems.forEach(item => {
            item.addEventListener('dragstart', function(e) {
                if (this.classList.contains('placed')) {
                    e.preventDefault();
                    return;
                }
                draggedTask = {
                    id: this.getAttribute('data-task-id'),
                    days: parseInt(this.getAttribute('data-days')),
                    title: this.querySelector('.task-item-title').textContent,
                    content: this.querySelector('.task-item-content').textContent,
                    deadline: this.querySelector('.task-item-deadline').textContent,
                    isUrgent: this.classList.contains('task-urgent'),
                    element: this
                };
                this.classList.add('dragging');
                console.log('タスクをドラッグ開始:', draggedTask.title);
            });

            item.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
        });

        // カレンダー上のタスクバーのドラッグも設定
        setupTaskBarDrag();
    }

    // ===== カレンダー上のタスクバーのドラッグ設定 =====
    function setupTaskBarDrag() {
        const taskBars = document.querySelectorAll('.task-bar');

        taskBars.forEach(bar => {
            bar.setAttribute('draggable', 'true');

            bar.addEventListener('dragstart', function(e) {
                draggedTask = {
                    id: this.getAttribute('data-task-id'),
                    days: parseInt(this.getAttribute('data-days')),
                    title: this.getAttribute('data-title'),
                    content: this.getAttribute('data-content'),
                    isUrgent: this.classList.contains('urgent'),
                    isFromCalendar: true,
                    element: this
                };
                this.classList.add('dragging');
                console.log('カレンダー上のタスクを移動:', draggedTask.title);
            });

            bar.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
        });
    }

    // ===== カレンダーにタスクを配置 =====
    function placeTaskOnCalendar(task, startDate) {
        console.log(`タスク「${task.title}」を${startDate}から配置します`);

        // 開始日のセルを取得
        const startCell = document.querySelector(`[data-date="${startDate}"]`);
        if (!startCell) return;

        // タスクバーを作成
        const taskBar = document.createElement('div');
        taskBar.className = task.isUrgent ? 'task-bar urgent' : 'task-bar';
        taskBar.setAttribute('data-task-id', task.id);
        taskBar.setAttribute('data-days', task.days);
        taskBar.setAttribute('data-title', task.title);
        taskBar.setAttribute('data-content', task.content);
        taskBar.innerHTML = `
            <span class="task-bar-title">${task.title}</span>
            <span class="task-bar-content">${task.content}</span>
        `;

        // タスクバーの幅を計算（日数分のセルにまたがる）
        const taskDays = task.days;
        taskBar.style.width = `calc(${taskDays * 100}% + ${(taskDays - 1) * 1}px)`;

        // セルに追加
        startCell.appendChild(taskBar);

        // カレンダー上のタスクバーにドラッグ機能を追加
        setupTaskBarDrag();

        // 元のタスクアイテムを「配置済み」にする
        if (!task.isFromCalendar && task.element) {
            task.element.classList.add('placed');
            task.element.setAttribute('draggable', 'false');
        }

        // カレンダーから移動した場合は元のバーを削除
        if (task.isFromCalendar && task.element) {
            task.element.remove();
        }

        console.log('タスクを配置しました');
    }

    // ===== 初期化 =====
    generateCalendar(currentYear, currentMonth);
    setupTaskDrag();

    console.log('カレンダーを生成しました');
    console.log('タスクをドラッグしてカレンダーに配置してください！');
});
```

### コードの説明

#### カレンダーの生成

**日付の計算**
```javascript
const firstDay = new Date(year, month, 1);  // 月の最初の日
const daysInMonth = lastDay.getDate();      // 月の日数
```

**セルの作成**
```javascript
for (let week = 0; week < 6; week++) {
    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        // セルを作成
    }
}
```
- 外側のループ: 週（最大6週）
- 内側のループ: 曜日（7日）

#### タスクバーの幅計算

```javascript
taskBar.style.width = `calc(${taskDays * 100}% + ${(taskDays - 1) * 1}px)`;
```

**例: 5日間のタスク**
- `5 * 100% = 500%` (5セル分)
- `+ (5-1) * 1px = 4px` (セル間の境界線)

#### 重要なポイント

- **JavaScriptの月は0始まり**: 1月=0、10月=9
- **padStart()**: 日付を2桁にする（例: "5" → "05"）
- **data属性**: HTMLに情報を保存（`data-date="2025-10-15"`）

---

## 📝 デバッグのヒント

### console.log()の使い方

```javascript
console.log('変数の値:', variable);
```
- ブラウザの開発者ツールで確認できる

### よくあるエラー

1. **要素が取得できない**
```javascript
// 間違い
const btn = document.getElementById('myBtn');
btn.addEventListener(...); // btnがnullでエラー

// 正しい
const btn = document.getElementById('myBtn');
if (btn) {
    btn.addEventListener(...);
}
```

2. **イベントが二重に登録される**
```javascript
// setupDragAndDrop()を何度も呼ぶと重複
// 既存のイベントを削除してから登録し直す
```

---

## 🚀 次のステップ

これらのJavaScriptファイルができたら、Supabaseと接続してデータベースに保存できるようにします！

