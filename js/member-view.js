// カレンダー画面の処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('カレンダー画面が起動しました');

    // ===== 変数の定義 =====
    let currentYear = 2025;
    let currentMonth = 9; // JavaScriptでは0=1月なので、9=10月
    let draggedTask = null;
    let currentMember = '福島'; // デフォルト値
    let isPlacingTask = false; // 連続配置ガード

    // URLパラメータから課員名を取得
    const urlParams = new URLSearchParams(window.location.search);
    const memberParam = urlParams.get('member');
    if (memberParam) {
        currentMember = memberParam;
        console.log(`URLパラメータから課員を設定: ${currentMember}`);
    }

    // ===== 祝日リスト(2025年) =====
    const holidays = {
        '2025-01-01': '元日',
        '2025-01-13': '成人の日',
        '2025-02-11': '建国記念の日',
        '2025-02-23': '天皇誕生日',
        '2025-02-24': '振替休日',
        '2025-03-20': '春分の日',
        '2025-04-29': '昭和の日',
        '2025-05-03': '憲法記念日',
        '2025-05-04': 'みどりの日',
        '2025-05-05': 'こどもの日',
        '2025-05-06': '振替休日',
        '2025-07-21': '海の日',
        '2025-08-11': '山の日',
        '2025-09-15': '敬老の日',
        '2025-09-23': '秋分の日',
        '2025-10-13': 'スポーツの日',
        '2025-11-03': '文化の日',
        '2025-11-23': '勤労感謝の日',
        '2025-11-24': '振替休日'
    };

    // ===== 祝日判定関数 =====
    function isHoliday(dateString) {
        return holidays.hasOwnProperty(dateString);
    }

    // ===== 土日祝日判定関数 =====
    function isWeekendOrHoliday(dateString, dayOfWeek) {
        return dayOfWeek === 0 || dayOfWeek === 6 || isHoliday(dateString);
    }

    // ===== DOM要素の取得 =====
    const calendarBody = document.getElementById('calendarBody');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const backToTaskBtn = document.getElementById('backToTaskBtn');
    const selectMember = document.getElementById('selectMember');
    const memberNameDisplay = document.getElementById('memberName');

    // ===== ボタンイベント =====
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentYear, currentMonth);
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentYear, currentMonth);
        });
    }

    if (backToTaskBtn) {
        backToTaskBtn.addEventListener('click', function() {
            window.location.href = 'task-management.html';
        });
    }

    if (selectMember) {
        selectMember.addEventListener('change', function() {
            currentMember = this.value;
            memberNameDisplay.textContent = currentMember;
            console.log(`課員を${currentMember}に変更しました`);
        });
    }

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

        // カレンダーを6週間分作成(最大6行必要)
        for (let week = 0; week < 6; week++) {
            const row = document.createElement('tr');

            // 1週間分(7日)のセルを作成
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
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    cell.innerHTML = `<span class="date-number">${date}</span>`;
                    cell.setAttribute('data-date', dateStr);

                    // 祝日かチェック
                    if (isHoliday(dateStr)) {
                        cell.classList.add('holiday');
                        cell.setAttribute('data-holiday', holidays[dateStr]);
                    }

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
            // 既にイベントリスナーが設定されている場合はスキップ
            if (zone.hasAttribute('data-drop-enabled')) {
                return;
            }
            zone.setAttribute('data-drop-enabled', 'true');

            // ドラッグオーバー時
            zone.addEventListener('dragover', function(e) {
                e.preventDefault();
                // 他の月、土日祝日以外のセルのみハイライト
                if (!this.classList.contains('other-month') &&
                    !this.classList.contains('sunday') &&
                    !this.classList.contains('saturday') &&
                    !this.classList.contains('holiday')) {
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

                console.log('========== ドロップイベント発火 ==========');
                console.log('ドロップ先の日付:', this.getAttribute('data-date'));
                console.log('draggedTask:', draggedTask);

                // 他の月のセルにはドロップできない
                if (this.classList.contains('other-month')) {
                    alert('他の月にはタスクを配置できません');
                    return;
                }

                // 土日にはドロップできない
                if (this.classList.contains('sunday') || this.classList.contains('saturday')) {
                    alert('土日にはタスクを配置できません');
                    return;
                }

                // 祝日にはドロップできない
                if (this.classList.contains('holiday')) {
                    const holidayName = this.getAttribute('data-holiday');
                    alert(`祝日(${holidayName})にはタスクを配置できません`);
                    return;
                }

                const startDate = this.getAttribute('data-date');
                if (draggedTask && startDate) {
                    console.log('配置処理開始 - isPlacingTask:', isPlacingTask);
                    if (isPlacingTask) {
                        console.log('多重呼び出し防止: 処理をスキップ');
                        return;
                    }
                    isPlacingTask = true;

                    // タスクを配置する前に、同じタスクの既存バーをすべて削除
                    console.log('removeExistingTaskBars を呼び出し');
                    removeExistingTaskBars(draggedTask);

                    console.log('placeTaskOnCalendar を呼び出し');
                    placeTaskOnCalendar(draggedTask, startDate);
                    // placeTaskOnCalendar 内でも必ず false に戻すが、
                    // 念のためここでも短時間で解除
                    setTimeout(() => {
                        isPlacingTask = false;
                        console.log('isPlacingTask を false に設定');
                    }, 0);
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
            // 既にイベントリスナーが設定されている場合はスキップ
            if (bar.hasAttribute('data-drag-enabled')) {
                return;
            }

            bar.setAttribute('draggable', 'true');
            bar.setAttribute('data-drag-enabled', 'true');

            bar.addEventListener('dragstart', function(e) {
                draggedTask = {
                    id: this.getAttribute('data-task-id'),
                    days: parseInt(this.getAttribute('data-days')),
                    title: this.getAttribute('data-title'),
                    content: this.getAttribute('data-content'),
                    deadline: this.getAttribute('data-deadline') || '',
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

    // ===== 営業日を計算する関数 =====
    function getNextBusinessDay(dateString) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);

        while (true) {
            const dayOfWeek = date.getDay();
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            if (!isWeekendOrHoliday(dateStr, dayOfWeek)) {
                return dateStr;
            }
            date.setDate(date.getDate() + 1);
        }
    }

    // ===== 営業日の数をカウントする関数 =====
    function countBusinessDays(startDate, businessDays) {
        let count = 0;
        let currentDate = new Date(startDate);
        const cells = [];

        while (count < businessDays) {
            const dayOfWeek = currentDate.getDay();
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

            if (!isWeekendOrHoliday(dateStr, dayOfWeek)) {
                const cell = document.querySelector(`[data-date="${dateStr}"]`);
                if (cell) {
                    cells.push(cell);
                    count++;
                }
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return cells;
    }

    // ===== 既存のタスクバーと期限マーカーを削除する関数 =====
    function removeExistingTaskBars(task) {
        if (!task) return;

        console.log(`========== 既存タスクバー・期限マーカーを削除開始 ==========`);
        console.log(`タスク情報:`, task);
        console.log(`  - ID: ${task.id}`);
        console.log(`  - Title: ${task.title}`);
        console.log(`  - Content: ${task.content}`);

        // カレンダー全体から同じタスクIDまたはタイトル+内容が一致するバーを削除
        const allTaskBars = document.querySelectorAll('.task-bar');
        console.log(`カレンダー上のタスクバー総数: ${allTaskBars.length}個`);

        let removedCount = 0;

        // 配列に変換してから処理（削除中にNodeListが変化するのを防ぐ）
        Array.from(allTaskBars).forEach(bar => {
            const barId = bar.getAttribute('data-task-id');
            const barTitle = bar.getAttribute('data-title') || '';
            const barContent = bar.getAttribute('data-content') || '';

            // より厳密な一致判定
            const matchById = task.id && barId && String(barId) === String(task.id);
            const matchByContent = barTitle && barContent &&
                                   barTitle === task.title &&
                                   barContent === task.content;

            if (matchById || matchByContent) {
                console.log(`  ✓ 削除対象: ${barTitle} (ID: ${barId})`);
                bar.remove();
                removedCount++;
            }
        });

        console.log(`タスクバー削除完了: ${removedCount}個`);

        // 期限マーカーからもこのタスクを削除
        const allDeadlineMarkers = document.querySelectorAll('.deadline-marker');
        let removedDeadlineCount = 0;

        allDeadlineMarkers.forEach(marker => {
            const deadlineTasks = marker.querySelectorAll('.deadline-task');
            deadlineTasks.forEach(deadlineTask => {
                const deadlineTitle = deadlineTask.textContent.trim();
                if (deadlineTitle === task.title) {
                    console.log(`  ✓ 期限マーカー削除対象: ${deadlineTitle}`);
                    deadlineTask.remove();
                    removedDeadlineCount++;
                }
            });

            // マーカー内のタスクがすべて削除されたらマーカー自体も削除
            if (marker.querySelectorAll('.deadline-task').length === 0) {
                marker.remove();
            }
        });

        console.log(`期限マーカー削除完了: ${removedDeadlineCount}個`);
        console.log(`========== 削除完了 ==========`);
    }

    // ===== 営業日のセルを連続したグループに分割 =====
    function splitBusinessDaysIntoGroups(businessDayCells) {
        if (businessDayCells.length === 0) return [];

        const groups = [];
        let currentGroup = [businessDayCells[0]];

        for (let i = 1; i < businessDayCells.length; i++) {
            const prevDate = new Date(businessDayCells[i - 1].getAttribute('data-date'));
            const currentDate = new Date(businessDayCells[i].getAttribute('data-date'));

            // 前の日付と現在の日付の差を計算
            const dayDiff = (currentDate - prevDate) / (1000 * 60 * 60 * 24);

            // 1日の差（連続している）ならば同じグループ
            // それ以上の差（土日祝が挟まる）なら新しいグループ
            if (dayDiff === 1) {
                currentGroup.push(businessDayCells[i]);
            } else {
                groups.push(currentGroup);
                currentGroup = [businessDayCells[i]];
            }
        }

        // 最後のグループを追加
        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        return groups;
    }

    // ===== カレンダーにタスクを配置 =====
    function placeTaskOnCalendar(task, startDate) {
        console.log(`タスク「${task.title}」を${startDate}から配置します`);

        // 期限チェック: タスクに期限が設定されている場合
        if (task.deadline) {
            // 期限日を解析 ("期限: 2025/10/20" または "2025/10/20" の形式)
            const deadlineMatch = task.deadline.match(/(\d{4})\/(\d{2})\/(\d{2})/);
            if (deadlineMatch) {
                const deadlineDate = new Date(`${deadlineMatch[1]}-${deadlineMatch[2]}-${deadlineMatch[3]}`);

                // 開始日からタスク完了予定日を計算（営業日ベース）
                const startDateObj = new Date(startDate);
                let currentDate = new Date(startDate);
                let businessDayCount = 0;

                // タスクの日数分の営業日を進める
                while (businessDayCount < task.days) {
                    const dayOfWeek = currentDate.getDay();
                    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

                    if (!isWeekendOrHoliday(dateStr, dayOfWeek)) {
                        businessDayCount++;
                    }

                    if (businessDayCount < task.days) {
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                }

                // タスク完了予定日
                const taskEndDate = currentDate;

                console.log(`期限チェック: タスク完了予定=${taskEndDate.toLocaleDateString('ja-JP')}, 期限=${deadlineDate.toLocaleDateString('ja-JP')}`);

                // タスク完了予定日が期限を超える場合はエラー
                if (taskEndDate > deadlineDate) {
                    isPlacingTask = false;
                    alert(`エラー: このタスクを${new Date(startDate).toLocaleDateString('ja-JP')}から開始すると、完了予定日(${taskEndDate.toLocaleDateString('ja-JP')})が期限(${deadlineDate.toLocaleDateString('ja-JP')})を超えてしまいます。\n\nより早い日付に配置してください。`);
                    return;
                }
            }
        }

        // 開始日のセルを取得
        const startCell = document.querySelector(`[data-date="${startDate}"]`);
        if (!startCell) return;

        // 営業日ベースでタスクが配置されるセルを取得
        const businessDayCells = countBusinessDays(startDate, task.days);

        if (businessDayCells.length === 0) {
            alert('タスクを配置できる営業日が見つかりません');
            return;
        }

        // 営業日のセルを連続したグループに分割（土日祝を挟むと分割される）
        const groups = splitBusinessDaysIntoGroups(businessDayCells);

        // すべてのグループのセルで既存タスクバーの最大数を見つける（全体で統一された位置を使用）
        // 重要: 各セルで、そのセルを「含む」すべてのタスクバーをカウントする必要がある

        // まず、すべての既存タスクバーの日付範囲を計算してキャッシュする
        const allTaskBars = document.querySelectorAll('.task-bar');
        const taskBarRanges = [];

        allTaskBars.forEach(bar => {
            const barParent = bar.parentElement;
            if (!barParent || !barParent.hasAttribute('data-date')) return;

            const barStartDate = barParent.getAttribute('data-date');
            const barDays = parseInt(bar.getAttribute('data-days')) || 1;
            const barTitle = bar.getAttribute('data-title');

            // バーの開始日から営業日数分の日付を計算
            const barDateSet = new Set();
            let currentDate = new Date(barStartDate);
            let count = 0;

            while (count < barDays) {
                const dayOfWeek = currentDate.getDay();
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

                if (!isWeekendOrHoliday(dateStr, dayOfWeek)) {
                    barDateSet.add(dateStr);
                    count++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }

            taskBarRanges.push({
                title: barTitle,
                dates: barDateSet,
                topPosition: bar.style.top
            });
        });

        console.log(`既存タスクバー数: ${taskBarRanges.length}`);
        taskBarRanges.forEach(range => {
            const dateArray = Array.from(range.dates);
            const dateRange = dateArray.length > 3
                ? `${dateArray[0]}...${dateArray[dateArray.length-1]}`
                : dateArray.join(', ');
            console.log(`  - ${range.title}: ${dateRange}, top=${range.topPosition}`);
        });

        // 各セルで重なっているタスクバーをカウント
        let maxTaskCount = 0;

        businessDayCells.forEach((cell, index) => {
            const cellDate = cell.getAttribute('data-date');
            let overlappingTaskCount = 0;

            // このセルの日付を含むタスクバーの数を数える
            taskBarRanges.forEach(taskRange => {
                if (taskRange.dates.has(cellDate)) {
                    overlappingTaskCount++;
                }
            });

            if (overlappingTaskCount > 0) {
                console.log(`  ${cellDate}: ${overlappingTaskCount}個のタスクが重なっている`);
            }
            maxTaskCount = Math.max(maxTaskCount, overlappingTaskCount);
        });

        // 新しいタスクの縦位置を最大数に基づいて決定
        const taskPosition = maxTaskCount;
        const topPosition = 30 + (taskPosition * 35);

        console.log(`========== 位置計算 ==========`);
        console.log(`全体の最大タスク数=${maxTaskCount}, 新規位置=${taskPosition}, top=${topPosition}px`);

        // 各グループごとにタスクバーを作成
        groups.forEach((group, groupIndex) => {
            const groupStartCell = group[0];

            console.log(`グループ${groupIndex}: ${group.length}日間`);

            // タスクバーを作成
            const taskBar = document.createElement('div');
            taskBar.className = task.isUrgent ? 'task-bar urgent' : 'task-bar';
            taskBar.setAttribute('data-task-id', task.id);
            taskBar.setAttribute('data-days', task.days);
            taskBar.setAttribute('data-title', task.title);
            taskBar.setAttribute('data-content', task.content);
            taskBar.setAttribute('data-deadline', task.deadline || '');
            taskBar.setAttribute('data-group-index', groupIndex);

            // 期限を表示用にフォーマット（"期限: 2025/10/20" → "10/20"）
            let deadlineDisplay = '';
            if (task.deadline) {
                const deadlineMatch = task.deadline.match(/(\d{4})\/(\d{2})\/(\d{2})/);
                if (deadlineMatch) {
                    deadlineDisplay = `${deadlineMatch[2]}/${deadlineMatch[3]}`;
                } else {
                    deadlineDisplay = task.deadline.replace('期限: ', '');
                }
            }

            taskBar.innerHTML = `
                <span class="task-bar-title">${task.title}</span>
                <span class="task-bar-content">${task.content}</span>
                ${deadlineDisplay ? `<span class="task-bar-deadline">期限:${deadlineDisplay}</span>` : ''}
            `;

            // グループ内の営業日数に基づいてタスクバーの幅を計算
            const groupDays = group.length;
            taskBar.style.width = `calc(${groupDays * 100}% + ${(groupDays - 1) * 1}px)`;

            // タスクバーの縦位置を設定
            taskBar.style.top = `${topPosition}px`;

            console.log(`グループ${groupIndex}のタスクバーを作成: ${task.title}, top=${topPosition}px, 開始セル=${group[0].getAttribute('data-date')}`);

            // セルに追加
            groupStartCell.appendChild(taskBar);
        });

        // 期限日をカレンダーに表示
        if (task.deadline) {
            const deadlineMatch = task.deadline.match(/(\d{4})\/(\d{2})\/(\d{2})/);
            if (deadlineMatch) {
                const deadlineDate = `${deadlineMatch[1]}-${deadlineMatch[2]}-${deadlineMatch[3]}`;
                const deadlineCell = document.querySelector(`[data-date="${deadlineDate}"]`);
                if (deadlineCell) {
                    // 既存の期限マーカーをチェック
                    let deadlineMarker = deadlineCell.querySelector('.deadline-marker');
                    if (!deadlineMarker) {
                        deadlineMarker = document.createElement('div');
                        deadlineMarker.className = 'deadline-marker';
                        deadlineCell.appendChild(deadlineMarker);
                    }

                    // このタスクの期限マーカーが既に存在するかチェック
                    const existingDeadlineTasks = deadlineMarker.querySelectorAll('.deadline-task');
                    let alreadyExists = false;
                    existingDeadlineTasks.forEach(dt => {
                        if (dt.textContent.trim() === task.title) {
                            alreadyExists = true;
                        }
                    });

                    // 既に存在しない場合のみ追加
                    if (!alreadyExists) {
                        const deadlineTask = document.createElement('div');
                        deadlineTask.className = 'deadline-task';
                        deadlineTask.textContent = `${task.title}`;
                        deadlineMarker.appendChild(deadlineTask);
                        console.log(`期限マーカー追加: ${task.title} (${deadlineDate})`);
                    } else {
                        console.log(`期限マーカー既存: ${task.title} (${deadlineDate}) - スキップ`);
                    }
                }
            }
        }

        // カレンダー上のタスクバーにドラッグ機能を追加
        setupTaskBarDrag();

        // 元のタスクアイテムを「配置済み」にする
        if (!task.isFromCalendar && task.element) {
            task.element.classList.add('placed');
            task.element.setAttribute('draggable', 'false');
        }

        console.log(`タスクを配置しました(営業日: ${businessDayCells.length}日間、${groups.length}個のバーに分割)`);

        // 配置処理終了
        isPlacingTask = false;
    }

    // ===== 初期化 =====
    generateCalendar(currentYear, currentMonth);
    setupTaskDrag();

    // 課員セレクトボックスの初期値を設定
    if (selectMember && currentMember) {
        selectMember.value = currentMember;
        memberNameDisplay.textContent = currentMember;
        console.log(`課員セレクトボックスを「${currentMember}」に設定しました`);
    }

    console.log('カレンダーを生成しました');
    console.log('タスクをドラッグしてカレンダーに配置してください！');
});
