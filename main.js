
document.addEventListener('DOMContentLoaded', function() {
  initTabSwitching();
  initQuickAddModal();
  initNumberCounters();
  initCalendar();
});

function initTabSwitching() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');
      tabButtons.forEach(btn => btn.classList.remove('text-primary', 'border-primary', 'active'));
      tabContents.forEach(content => content.style.display = 'none');
      button.classList.add('text-primary', 'border-primary', 'active');
      document.getElementById(target).style.display = 'block';
    });
  });
  // 默认激活第一个标签页
  if (tabContents.length > 0) {
    tabContents.forEach((c, i) => c.style.display = i === 0 ? 'block' : 'none');
  }
}

function initQuickAddModal() {
  const modal = document.getElementById('quickAddModal');
  const openBtn = document.getElementById('quickAddBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');
  const prevStepBtn = document.getElementById('prevStepBtn');
  const saveBtn = document.getElementById('saveTransactionBtn');
  const steps = document.querySelectorAll('.form-step');
  let currentStep = 0;

  openBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  nextStepBtn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active');
    currentStep = 1;
    steps[currentStep].classList.add('active');
  });
  prevStepBtn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active');
    currentStep = 0;
    steps[currentStep].classList.add('active');
  });
  saveBtn.addEventListener('click', () => {
    alert('记账保存成功！（仅前端演示）');
    modal.classList.remove('active');
    steps[currentStep].classList.remove('active');
    currentStep = 0;
    steps[currentStep].classList.add('active');
  });

  // 分类选择
  document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // 数字输入
  const amountDisplay = document.getElementById('amountDisplay');
  let currentValue = '0.00';
  document.querySelectorAll('.number-key').forEach(key => {
    key.addEventListener('click', () => {
      const val = key.getAttribute('data-number');
      if (val === 'del') {
        currentValue = currentValue.slice(0, -1);
      } else {
        currentValue += val;
      }
      const num = parseFloat(currentValue.replace(/[^\d]/g, '') || '0') / 100;
      currentValue = num.toFixed(2);
      amountDisplay.innerText = '¥' + currentValue;
    });
  });
}

function initNumberCounters() {
  document.querySelectorAll('.number-counter').forEach(el => {
    const target = parseFloat(el.innerText.replace(/[^\d.]/g, ''));
    let count = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      count += step;
      if (count >= target) {
        el.innerText = '¥' + target.toFixed(2);
        clearInterval(interval);
      } else {
        el.innerText = '¥' + count.toFixed(2);
      }
    }, 16);
  });
}

function initCalendar() {
  const calendarDays = document.getElementById('calendarDays');
  const monthDisplay = document.getElementById('currentMonth');
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  monthDisplay.innerText = `${year}年${month + 1}月`;
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  const startDay = start.getDay();
  const totalDays = end.getDate();
  calendarDays.innerHTML = '';
  for (let i = 0; i < startDay; i++) {
    calendarDays.innerHTML += '<div></div>';
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.innerHTML += `<div class="calendar-day">
      <div class="calendar-day-number">${i}</div>
    </div>`;
  }
}
