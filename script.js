document.addEventListener('DOMContentLoaded', function() {
  const goalForm = document.getElementById('goal-form');
  const activitiesList = document.getElementById('activities-list');
  const bandSelect = document.getElementById('band');
  const bandTabs = document.getElementById('band-tabs');
  const activityDetails = document.getElementById('activity-details');
  const diaryEntries = document.getElementById('diary-entries');
  const diaryForm = document.getElementById('diary-form');
  const feedbackForm = document.getElementById('feedback-form');

  let activities = JSON.parse(localStorage.getItem('activities')) || [
    { id: 1, user: '田中さん', goal: '毎日30分運動する', deadline: '2024-08-01', band: 'バンド1', completed: false, details: '', date: '2024-05-01', diary: [] },
    { id: 2, user: '佐藤さん', goal: '新しい言語を学ぶ', deadline: '2024-09-15', band: 'バンド2', completed: true, details: '毎日30分フランス語の勉強をしました。', date: '2024-05-05', diary: [] },
    { id: 3, user: '鈴木さん', goal: '読書習慣を身につける', deadline: '2024-07-31', band: 'バンド3', completed: false, details: '', date: '2024-05-10', diary: [] },
  ];

  // バンドの選択肢を1から20まで追加
  for (let i = 1; i <= 20; i++) {
    const option = document.createElement('option');
    option.value = `バンド${i}`;
    option.textContent = `バンド${i}`;
    if (bandSelect) bandSelect.appendChild(option);
  }

  function renderActivities(band = null) {
    if (!activitiesList) return;
    
    activitiesList.innerHTML = '';
    const filteredActivities = band ? activities.filter(a => a.band === band) : activities;
    
    filteredActivities.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(activity => {
      const activityElement = document.createElement('div');
      activityElement.className = 'activity-card';
      activityElement.innerHTML = `
        <h3>${activity.user}の目標</h3>
        <p>${activity.goal}</p>
        <p>期限: ${activity.deadline}</p>
        <p>バンド: ${activity.band}</p>
        <p>状態: ${activity.completed ? '<span class="text-green-600">達成済み</span>' : '<span class="text-blue-600">進行中</span>'}</p>
        <p>開始日: ${activity.date}</p>
        ${activity.completed 
          ? `<button onclick="undoComplete(${activity.id})" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-2">取り消し</button>`
          : `<button onclick="completeActivity(${activity.id})" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2">達成報告</button>`
        }
        <a href="details.html?id=${activity.id}" class="inline-block bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 ml-2 mt-2">詳細</a>
        <button onclick="cancelGoal(${activity.id})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2 mt-2">目標取り消し</button>
        <div class="progress-bar mt-2">
          <div class="progress" style="width: ${calculateProgress(activity.date, activity.deadline)}%;"></div>
        </div>
      `;
      activitiesList.appendChild(activityElement);
    });
  }

  function calculateProgress(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const totalDuration = end - start;
    const completedDuration = today - start;
    return Math.min((completedDuration / totalDuration) * 100, 100);
  }

  function renderBandTabs() {
    if (!bandTabs) return;
    
    const bands = [...new Set(activities.map(a => a.band))];
    bands.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
    
    bandTabs.innerHTML = `
      <button class="band-tab active" data-band="all">全て</button>
      ${bands.map(band => `<button class="band-tab" data-band="${band}">${band}</button>`).join('')}
    `;

    bandTabs.addEventListener('click', function(e) {
      if (e.target.classList.contains('band-tab')) {
        document.querySelectorAll('.band-tab').forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        const selectedBand = e.target.dataset.band;
        renderActivities(selectedBand === 'all' ? null : selectedBand);
      }
    });
  }

  window.completeActivity = function(id) {
    activities = activities.map(activity => 
      activity.id === id ? { ...activity, completed: true } : activity
    );
    saveActivities();
    renderActivities();
    notifyUser('目標が達成されました！');
  }

  window.undoComplete = function(id) {
    activities = activities.map(activity => 
      activity.id === id ? { ...activity, completed: false } : activity
    );
    saveActivities();
    renderActivities();
  }

  window.cancelGoal = function(id) {
    if (confirm('本当にこの目標を取り消しますか？')) {
      activities = activities.filter(activity => activity.id !== id);
      saveActivities();
      renderActivities();
    }
  }

  function saveActivities() {
    localStorage.setItem('activities', JSON.stringify(activities));
  }

  function renderActivityDetails(id) {
    const activity = activities.find(a => a.id === parseInt(id));
    if (!activity || !activityDetails) return;

    activityDetails.innerHTML = `
      <h2 class="text-3xl font-bold mb-4 text-indigo-800">${activity.user}の目標詳細</h2>
      <p class="mb-2"><strong>目標:</strong> ${activity.goal}</p>
      <p class="mb-2"><strong>期限:</strong> ${activity.deadline}</p>
      <p class="mb-2"><strong>バンド:</strong> ${activity.band}</p>
      <p class="mb-2"><strong>状態:</strong> ${activity.completed ? '<span class="text-green-600">達成済み</span>' : '<span class="text-blue-600">進行中</span>'}</p>
      <p class="mb-2"><strong>開始日:</strong> ${activity.date}</p>
      <p class="mb-2"><strong>取り組み詳細:</strong> ${activity.details || '詳細はまだ記録されていません。'}</p>
    `;
  }

  function renderDiaryEntries(id) {
    const activity = activities.find(a => a.id === parseInt(id));
    if (!activity || !diaryEntries) return;

    diaryEntries.innerHTML = activity.diary.map(entry => `
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-sm text-gray-600">${entry.date}</p>
        <p class="mt-2">${entry.content}</p>
      </div>
    `).join('');
  }

  if (goalForm) {
    goalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const goal = document.getElementById('goal').value;
      const deadline = document.getElementById('deadline').value;
      const band = document.getElementById('band').value;

      const newActivity = {
        id: Date.now(),
        user: 'ユーザー' + (activities.length + 1),
        goal: goal,
        deadline: deadline,
        band: band,
        completed: false,
        details: '',
        date: new Date().toISOString().split('T')[0],
        diary: []
      };

      activities.push(newActivity);
      saveActivities();
      
      // 取り組み一覧ページに遷移
      window.location.href = 'activities.html';
    });
  }

  if (diaryForm) {
    diaryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const content = document.getElementById('diary-entry').value;

      if (id && content) {
        activities = activities.map(activity => {
          if (activity.id === parseInt(id)) {
            return {
              ...activity,
              diary: [
                ...activity.diary,
                { date: new Date().toISOString().split('T')[0], content }
              ]
            };
          }
          return activity;
        });

        saveActivities();
        renderDiaryEntries(id);
        document.getElementById('diary-entry').value = '';
      }
    });
  }

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const feedback = document.getElementById('feedback').value;
      if (feedback) {
        // ここでフィードバックを送信するロジックを追加
        alert('フィードバックを送信しました。');
        document.getElementById('feedback').value = '';
      }
    });
  }

  function notifyUser(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // 初期化
  if (window.location.pathname.includes('activities.html')) {
    renderBandTabs();
    renderActivities();
  } else if (window.location.pathname.includes('details.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      renderActivityDetails(id);
      renderDiaryEntries(id);
    }
  } else {
    renderActivities();
  }
});
