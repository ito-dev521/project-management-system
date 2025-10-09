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
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            addProjectModal.style.display = 'block';
            console.log('業務追加モーダルを開きました');
        });
    }

    // ×ボタンをクリック → モーダルを閉じる
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            addProjectModal.style.display = 'none';
            console.log('モーダルを閉じました');
        });
    }

    // キャンセルボタンをクリック → モーダルを閉じる
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            addProjectModal.style.display = 'none';
            console.log('モーダルを閉じました');
        });
    }

    // モーダルの外側をクリック → モーダルを閉じる
    window.addEventListener('click', function(event) {
        if (event.target === addProjectModal) {
            addProjectModal.style.display = 'none';
            console.log('モーダルを閉じました');
        }
    });

    // 「タスク管理」ボタンをクリック → タスク管理画面へ遷移
    if (taskManagementBtn) {
        taskManagementBtn.addEventListener('click', function() {
            console.log('タスク管理画面へ移動します');
            window.location.href = 'task-management.html';
        });
    }

    // フォーム送信処理
    const addProjectForm = document.getElementById('addProjectForm');
    if (addProjectForm) {
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
            alert(`業務「${formData.projectName}」を追加しました！\n(まだデータベースには保存されていません)`);

            // フォームをリセット
            addProjectForm.reset();

            // モーダルを閉じる
            addProjectModal.style.display = 'none';
        });
    }

    // 編集ボタンと削除ボタンにイベントを追加
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-delete');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 後で実装
            alert('編集機能は後で実装します!');
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const confirmed = confirm('この業務を削除しますか?');
            if (confirmed) {
                // 後で実装
                alert('削除機能は後で実装します!');
            }
        });
    });
});
