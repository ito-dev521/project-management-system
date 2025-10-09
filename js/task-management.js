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
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            addTaskModal.style.display = 'block';
        });
    }

    // モーダルを閉じる
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            addTaskModal.style.display = 'none';
        });
    }

    if (cancelTaskBtn) {
        cancelTaskBtn.addEventListener('click', function() {
            addTaskModal.style.display = 'none';
        });
    }

    // モーダルの外側をクリックしたら閉じる
    window.addEventListener('click', function(event) {
        if (event.target === addTaskModal) {
            addTaskModal.style.display = 'none';
        }
    });

    // トップに戻るボタン
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // ===== タスク追加フォーム =====
    const addTaskForm = document.getElementById('addTaskForm');
    if (addTaskForm) {
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
    }

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

    // 課員ボックスの状態を更新(色分け)
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

        // 緊急かどうか判定(3日以内)
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
