// ページが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('業務管理システムが起動しました');

    // モーダル関連の要素を取得
    const addProjectBtn = document.getElementById('addProjectBtn');
    const addProjectModal = document.getElementById('addProjectModal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const taskManagementBtn = document.getElementById('taskManagementBtn');

    // 契約金額フィールドの3桁区切り処理
    const contractAmountInput = document.getElementById('contractAmount');
    if (contractAmountInput) {
        // inputイベントで3桁区切りを追加
        contractAmountInput.addEventListener('input', function(e) {
            // カーソル位置を保存
            let cursorPosition = e.target.selectionStart;
            let oldLength = e.target.value.length;

            // 数字以外を削除
            let value = e.target.value.replace(/[^\d]/g, '');

            // 3桁区切りのカンマを追加
            if (value) {
                value = parseInt(value, 10).toLocaleString('ja-JP');
            }

            // 値を設定
            e.target.value = value;

            // カーソル位置を調整
            let newLength = value.length;
            let lengthDiff = newLength - oldLength;
            e.target.setSelectionRange(cursorPosition + lengthDiff, cursorPosition + lengthDiff);
        });

        // フォーカス時に既存の値もフォーマット
        contractAmountInput.addEventListener('focus', function(e) {
            let value = e.target.value.replace(/[^\d]/g, '');
            if (value) {
                e.target.value = parseInt(value, 10).toLocaleString('ja-JP');
            }
        });
    }

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

    // フォーム送信処理(API連携)
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
                contractAmount: document.getElementById('contractAmount').value.replace(/,/g, ''), // カンマを削除
                manager: document.getElementById('manager').value
            };

            console.log('新しい業務を追加(送信):', formData);

            fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(async (res) => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then((data) => {
                alert(`業務「${formData.projectName}」を追加しました！ (ID: ${data.id})`);
                addProjectForm.reset();
                addProjectModal.style.display = 'none';
            })
            .catch((err) => {
                console.error(err);
                alert('業務の保存に失敗しました。サーバー状態・DB接続を確認してください。');
            });
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
