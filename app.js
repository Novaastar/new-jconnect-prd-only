const app = document.querySelector("#app");
const toast = document.querySelector("#toast");

const methods = [
  {
    id: "bifast",
    name: "BI-FAST",
    description: "Transfer real-time, tersedia 24 jam",
    fee: 2500,
    speed: "Real-time",
    limit: "Maks. Rp250 juta",
    condition: "Tersedia 24/7",
  },
  {
    id: "online",
    name: "Online",
    description: "Transfer online melalui jaringan bank",
    fee: 6500,
    speed: "Real-time",
    limit: "Maks. Rp100 juta",
    condition: "Sesuai jam layanan bank",
  },
  {
    id: "rtgs",
    name: "RTGS",
    description: "Untuk transfer bernilai besar",
    fee: 30000,
    speed: "Hari kerja",
    limit: "Mulai Rp100 juta",
    condition: "Diproses pada hari kerja",
  },
];

const banks = [
  "Bank Central Asia (BCA)",
  "Bank Mandiri",
  "Bank Negara Indonesia (BNI)",
  "Bank Rakyat Indonesia (BRI)",
  "Bank Syariah Indonesia (BSI)",
  "CIMB Niaga",
  "Bank Permata",
];

const state = {
  screen: "home",
  step: 1,
  bank: banks[0],
  account: "",
  amount: "",
  recipient: "",
  verified: false,
  method: "bifast",
  scenario: "success",
  warningAcknowledged: false,
  activeTransactionId: null,
  transactions: [
    {
      id: "JC20261120094251",
      recipient: "Dimas Pratama",
      bank: "Bank Mandiri",
      account: "•••• 3142",
      amount: 350000,
      fee: 2500,
      method: "BI-FAST",
      status: "success",
      date: new Date(Date.now() - 86400000),
    },
    {
      id: "JC20261119163208",
      recipient: "Nadia Putri",
      bank: "Bank Central Asia (BCA)",
      account: "•••• 8021",
      amount: 125000,
      fee: 6500,
      method: "Online",
      status: "pending",
      date: new Date(Date.now() - 2 * 86400000),
    },
  ],
};

const bankShort = (bank) => {
  const match = bank.match(/\(([^)]+)\)/);
  if (match) return match[1];
  if (bank.includes("Mandiri")) return "M";
  if (bank.includes("Niaga")) return "CN";
  if (bank.includes("Permata")) return "P";
  return bank.split(" ").map((word) => word[0]).slice(0, 2).join("");
};

const rupiah = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

const activeMethod = () => methods.find((method) => method.id === state.method);
const activeTransaction = () => state.transactions.find((item) => item.id === state.activeTransactionId);
const totalDebit = () => Number(state.amount || 0) + activeMethod().fee;
const maskAccount = (account) => `•••• ${account.slice(-4)}`;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function renderStepper(current) {
  const steps = ["Tujuan", "Metode", "Konfirmasi"];
  return `<div class="stepper" aria-label="Langkah ${current} dari 3">
    ${steps.map((label, index) => {
      const number = index + 1;
      const status = number === current ? "is-current" : number < current ? "is-done" : "";
      return `${index ? '<span class="step-line"></span>' : ""}<div class="step ${status}">
        <span class="step-number">${number < current ? "✓" : number}</span><span>${label}</span>
      </div>`;
    }).join("")}
  </div>`;
}

function renderHome() {
  const latest = state.transactions[0];
  const today = new Intl.DateTimeFormat("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).format(new Date());
  return `<section class="page">
    <div class="welcome-row">
      <div><p class="eyebrow">${today}</p><h1>Selamat datang, Raka</h1><p class="subtitle">Apa yang ingin kamu lakukan hari ini?</p></div>
    </div>
    <section class="balance-card" aria-label="Informasi rekening">
      <div><p class="balance-caption">Saldo rekening utama</p><p class="balance-amount">Rp12.450.000</p><p class="account-meta">•••• •••• 2841 &nbsp;·&nbsp; Tabungan</p></div>
      <span class="balance-symbol" aria-hidden="true">↗</span>
    </section>
    <div class="quick-actions" aria-label="Aksi cepat">
      <button class="quick-action" type="button" data-action="start-transfer"><span class="action-icon" aria-hidden="true">⇄</span><span>Transfer</span></button>
      <button class="quick-action" type="button" data-action="history"><span class="action-icon" aria-hidden="true">◷</span><span>Riwayat</span></button>
      <button class="quick-action" type="button" data-action="help"><span class="action-icon" aria-hidden="true">♡</span><span>Bantuan</span></button>
      <button class="quick-action" type="button" data-action="connection"><span class="action-icon" aria-hidden="true">⌁</span><span>Koneksi</span></button>
    </div>
    <div class="home-lower">
      <article class="surface mini-card">
        <div class="card-topline"><h3>Transfer antarbank</h3><span class="eyebrow" style="margin:0">MUDAH & AMAN</span></div>
        <div class="transfer-shortcut"><span class="shortcut-icon" aria-hidden="true">↗</span><p>Periksa penerima dan rincian sebelum transfer.<br><button class="text-button" type="button" data-action="start-transfer">Mulai transfer →</button></p></div>
      </article>
      <article class="surface mini-card">
        <div class="card-topline"><h3>Transaksi terakhir</h3><button class="text-button" type="button" data-action="history">Lihat semua</button></div>
        <p><strong>${escapeHtml(latest.recipient)}</strong><br>${rupiah(latest.amount)} · ${statusLabel(latest.status)}</p>
      </article>
    </div>
    <div class="section-title"><h2>Butuh bantuan?</h2></div>
    <div class="info-banner"><span class="info-icon">i</span><div><strong>Belum yakin status transfer?</strong>Periksa riwayat transaksi terlebih dahulu. Jangan ulangi transfer jika transaksi masih diproses.</div></div>
  </section>`;
}

function renderTransferForm() {
  const recipientCard = state.verified ? `<div class="verified-recipient">
    <span class="bank-monogram">${escapeHtml(bankShort(state.bank))}</span>
    <span class="verified-copy"><strong>${escapeHtml(state.recipient)}</strong><small>${escapeHtml(state.bank)} · ${escapeHtml(maskAccount(state.account))}</small></span>
    <span class="verified-check" aria-label="Terverifikasi">✓</span>
  </div>` : "";
  return `<section class="page page-narrow">
    <button class="back-link" type="button" data-action="home">← Beranda</button>
    <div class="page-heading"><p class="eyebrow">TRANSFER ANTARBANK</p><h1>Ke mana tujuanmu?</h1><p class="subtitle">Masukkan detail penerima. Pastikan nama dan bank sudah benar.</p></div>
    ${renderStepper(1)}
    <form id="recipient-form" class="surface form-card" novalidate>
      <h2>Informasi penerima</h2><p class="form-intro">Periksa kembali nomor rekening sebelum melanjutkan.</p>
      <div class="field"><label for="bank">Bank tujuan</label><select id="bank" name="bank">${banks.map((bank) => `<option ${state.bank === bank ? "selected" : ""} value="${escapeHtml(bank)}">${escapeHtml(bank)}</option>`).join("")}</select></div>
      <div class="field"><label for="account">Nomor rekening</label><div class="input-with-button"><input id="account" name="account" type="text" inputmode="numeric" autocomplete="off" placeholder="Masukkan nomor rekening" value="${escapeHtml(state.account)}" maxlength="20" required><button class="small-button" type="button" data-action="verify-recipient">Cek penerima</button></div><p class="field-hint">Gunakan nomor rekening tujuan yang benar.</p></div>
      ${recipientCard}
      <div class="field"><label for="amount">Nominal transfer</label><input id="amount" name="amount" type="number" min="10000" step="1" inputmode="numeric" placeholder="Contoh: 250000" value="${escapeHtml(state.amount)}" required><p class="field-hint">Minimal Rp10.000. Batas mengikuti metode transfer yang dipilih.</p></div>
      <div class="form-actions"><button class="button button-secondary" type="button" data-action="home">Batal</button><button class="button button-primary" type="submit">Pilih metode <span aria-hidden="true">→</span></button></div>
    </form>
  </section>`;
}

function renderMethods() {
  return `<section class="page page-narrow">
    <button class="back-link" type="button" data-action="back-step">← Kembali ke tujuan</button>
    <div class="page-heading"><p class="eyebrow">TRANSFER ANTARBANK</p><h1>Pilih metode transfer</h1><p class="subtitle">Bandingkan biaya dan waktu sebelum memilih.</p></div>
    ${renderStepper(2)}
    <div class="method-list">
      ${methods.map((method) => `<button class="method-option ${state.method === method.id ? "is-selected" : ""}" type="button" data-method="${method.id}" aria-pressed="${state.method === method.id}">
        <span class="radio-dot" aria-hidden="true"></span>
        <span class="method-main"><strong>${method.name}</strong><small>${method.description}</small><span class="method-tags"><span class="method-tag">${method.speed}</span><span class="method-tag">${method.limit}</span><span class="method-tag">${method.condition}</span></span></span>
        <span class="method-cost"><strong>${method.fee ? rupiah(method.fee) : "Gratis"}</strong><small>biaya</small></span>
      </button>`).join("")}
    </div>
    <p class="fee-note">Biaya dan batas di atas merupakan contoh untuk prototipe, bukan tarif resmi Bank Jatim.</p>
    <div class="form-actions"><button class="button button-secondary" type="button" data-action="back-step">Kembali</button><button class="button button-primary" type="button" data-action="confirm-step">Lanjutkan <span aria-hidden="true">→</span></button></div>
  </section>`;
}

function hasPendingDuplicate() {
  return state.transactions.some((item) =>
    item.status === "pending" &&
    item.account === maskAccount(state.account) &&
    item.amount === Number(state.amount)
  );
}

function renderConfirmation() {
  const duplicateAlert = hasPendingDuplicate() && !state.warningAcknowledged
    ? `<div class="info-banner warning inline-alert"><span class="info-icon">!</span><div><strong>Transfer serupa masih diproses</strong>Periksa riwayat sebelum melanjutkan agar tidak terjadi transfer ganda.<div style="margin-top:8px"><button class="text-button" type="button" data-action="history">Periksa riwayat</button></div></div></div>`
    : "";
  return `<section class="page page-narrow">
    <button class="back-link" type="button" data-action="back-step">← Kembali ke metode</button>
    <div class="page-heading"><p class="eyebrow">LANGKAH TERAKHIR</p><h1>Periksa transfermu</h1><p class="subtitle">Pastikan semua detail benar sebelum menyetujui transaksi.</p></div>
    ${renderStepper(3)}
    ${duplicateAlert}
    <section class="surface summary-card" aria-label="Ringkasan konfirmasi">
      <div class="summary-head"><strong>Rincian transfer</strong><button class="edit-button" type="button" data-action="edit-recipient">Ubah tujuan</button></div>
      <div class="summary-rows">
        <div class="summary-row"><span>Penerima</span><strong>${escapeHtml(state.recipient)}</strong></div>
        <div class="summary-row"><span>Bank tujuan</span><strong>${escapeHtml(state.bank)}</strong></div>
        <div class="summary-row"><span>Nomor rekening</span><strong>${escapeHtml(maskAccount(state.account))}</strong></div>
        <div class="summary-row"><span>Nominal transfer</span><strong>${rupiah(state.amount)}</strong></div>
        <div class="summary-row"><span>Biaya admin</span><strong>${rupiah(activeMethod().fee)}</strong></div>
        <div class="summary-row"><span>Metode</span><strong>${activeMethod().name}</strong></div>
      </div>
      <div class="summary-total"><div class="summary-row"><span>Total debit</span><strong>${rupiah(totalDebit())}</strong></div></div>
    </section>
    <div class="scenario-card"><strong>Hasil transaksi demo</strong><div class="scenario-options">
      <label class="scenario-option"><input type="radio" name="scenario" value="success" ${state.scenario === "success" ? "checked" : ""}> Berhasil</label>
      <label class="scenario-option"><input type="radio" name="scenario" value="pending" ${state.scenario === "pending" ? "checked" : ""}> Diproses</label>
      <label class="scenario-option"><input type="radio" name="scenario" value="failed" ${state.scenario === "failed" ? "checked" : ""}> Gagal</label>
    </div></div>
    <p class="secure-note"><span aria-hidden="true">▣</span> Periksa nama penerima sebelum melanjutkan</p>
    <div style="margin-top:18px">${duplicateAlert && !state.warningAcknowledged
      ? `<button class="button button-primary button-full" type="button" data-action="acknowledge-duplicate">Saya mengerti, lanjutkan</button>`
      : `<button class="button button-primary button-full" type="button" data-action="submit-transfer">Konfirmasi transfer <span aria-hidden="true">→</span></button>`}
    </div>
  </section>`;
}

function statusLabel(status) {
  return { success: "Berhasil", pending: "Sedang diproses", failed: "Gagal" }[status] || "Tidak diketahui";
}

function statusAdvice(status) {
  if (status === "pending") {
    return `<div class="info-banner warning"><span class="info-icon">!</span><div><strong>Tidak perlu mengulang transfer</strong>Dana mungkin sudah didebit. Tunggu pembaruan status dan periksa riwayat transaksi secara berkala.</div></div>`;
  }
  if (status === "failed") {
    return `<div class="info-banner error"><span class="info-icon">!</span><div><strong>Periksa rekening sebelum mencoba lagi</strong>Transfer ini tidak berhasil. Periksa riwayat dan saldo terlebih dahulu. Jika saldo sudah berkurang, jangan ulangi—hubungi Customer Service.</div></div>`;
  }
  return `<div class="info-banner"><span class="info-icon">✓</span><div><strong>Simpan bukti transaksi ini</strong>Nomor referensi dapat digunakan jika kamu perlu menanyakan transaksi ini.</div></div>`;
}

function resultTitle(status) {
  return {
    success: ["✓", "Transfer berhasil", "Dana telah dikirim ke penerima. Simpan nomor referensi sebagai bukti transaksi."],
    pending: ["◷", "Transfer sedang diproses", "Kami sedang memastikan transaksi ini. Kamu tidak perlu mengulang transfer."],
    failed: ["!", "Transfer belum berhasil", "Transaksi ini gagal. Ikuti langkah aman berikut sebelum mencoba kembali."],
  }[status];
}

function renderResult() {
  const transaction = activeTransaction();
  if (!transaction) return renderHistory();
  const [icon, title, description] = resultTitle(transaction.status);
  const statusClass = transaction.status === "success" ? "" : transaction.status;
  return `<section class="result-wrap">
    <span class="eyebrow">HASIL TRANSFER</span>
    <div class="result-icon ${statusClass}" aria-hidden="true">${icon}</div>
    <h1>${title}</h1><p class="subtitle">${description}</p>
    <section class="surface result-panel">
      <div class="result-status"><span class="status-pill ${statusClass}"><span aria-hidden="true">${icon}</span>${statusLabel(transaction.status)}</span><span class="result-date">${formatDate(transaction.date)}</span></div>
      <div class="summary-rows" style="padding: 5px 0 0">
        <div class="summary-row"><span>Penerima</span><strong>${escapeHtml(transaction.recipient)}</strong></div>
        <div class="summary-row"><span>Bank tujuan</span><strong>${escapeHtml(transaction.bank)}</strong></div>
        <div class="summary-row"><span>Nominal</span><strong>${rupiah(transaction.amount)}</strong></div>
        <div class="summary-row"><span>Biaya · ${escapeHtml(transaction.method)}</span><strong>${rupiah(transaction.fee)}</strong></div>
        <div class="summary-row"><span>Total debit</span><strong>${rupiah(transaction.amount + transaction.fee)}</strong></div>
      </div>
      <div class="reference-row"><span>Nomor referensi</span><strong>${escapeHtml(transaction.id)}</strong></div>
    </section>
    <div class="result-advice">${statusAdvice(transaction.status)}</div>
    <div class="result-actions">
      <button class="button button-secondary" type="button" data-action="history">Lihat riwayat</button>
      <button class="button button-primary" type="button" data-action="${transaction.status === "success" ? "start-transfer" : "help"}">${transaction.status === "success" ? "Transfer lagi" : "Hubungi bantuan"}</button>
    </div>
    <p class="result-note">Status mengikuti data transaksi terbaru yang tersedia di prototipe ini. Periksa riwayat untuk melihat rujukan transaksi.</p>
  </section>`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(date);
}

function renderHistory() {
  const transactions = [...state.transactions].sort((a, b) => b.date - a.date);
  return `<section class="page page-narrow">
    <button class="back-link" type="button" data-action="home">← Beranda</button>
    <div class="page-heading"><p class="eyebrow">AKTIVITAS REKENING</p><h1>Riwayat transaksi</h1><p class="subtitle">Periksa status dan nomor referensi transfer antarbank.</p></div>
    ${transactions.length ? `<div class="history-list">${transactions.map((transaction) => {
      const statusClass = transaction.status === "success" ? "success" : transaction.status;
      return `<button class="surface transaction-item" type="button" data-transaction="${escapeHtml(transaction.id)}" aria-label="Lihat transfer ke ${escapeHtml(transaction.recipient)}">
        <span class="transaction-icon" aria-hidden="true">↗</span>
        <span class="transaction-detail"><strong>${escapeHtml(transaction.recipient)}</strong><small>${escapeHtml(transaction.bank)} · ${formatDate(transaction.date)}<br>Ref. ${escapeHtml(transaction.id)}</small></span>
        <span class="transaction-amount"><strong>${rupiah(transaction.amount)}</strong><small class="status-text ${statusClass}">${statusLabel(transaction.status)}</small></span>
      </button>`;
    }).join("")}</div>` : `<div class="surface empty-state">Belum ada transaksi untuk ditampilkan.</div>`}
    <div class="history-help"><div class="info-banner warning"><span class="info-icon">!</span><div><strong>Status masih diproses?</strong>Jangan ulangi transfer. Simpan nomor referensi dan hubungi bantuan jika status belum berubah.</div></div></div>
  </section>`;
}

function renderHelp() {
  return `<section class="page page-narrow">
    <button class="back-link" type="button" data-action="home">← Beranda</button>
    <div class="page-heading"><p class="eyebrow">PUSAT BANTUAN</p><h1>Kami siap membantu</h1><p class="subtitle">Pilih langkah yang sesuai dengan kondisi transaksimu.</p></div>
    <article class="surface help-card"><h3>Status masih diproses</h3><p>Jangan mengulang transfer. Periksa riwayat transaksi untuk melihat pembaruan status dan simpan nomor referensinya.</p><button class="button button-secondary" type="button" data-action="history">Buka riwayat transaksi</button></article>
    <article class="surface help-card"><h3>Saldo berkurang, tetapi transfer belum tercatat</h3><p>Jangan lakukan transfer ulang. Catat nomor referensi jika tersedia dan hubungi Customer Service untuk pemeriksaan.</p><button class="button button-primary" type="button" data-action="contact-support">Hubungi Customer Service</button></article>
    <article class="surface help-card"><h3>Koneksi internet tidak stabil</h3><p>Periksa koneksi internet dan tunggu hingga stabil. Transaksi yang sedang dikirim tidak perlu diulang; cek statusnya melalui riwayat.</p><button class="button button-secondary" type="button" data-action="connection">Periksa koneksi</button></article>
  </section>`;
}

function render() {
  const screens = {
    home: renderHome,
    transfer: renderTransferForm,
    methods: renderMethods,
    confirm: renderConfirmation,
    result: renderResult,
    history: renderHistory,
    help: renderHelp,
  };
  app.innerHTML = (screens[state.screen] || renderHome)();
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle(
      "is-active",
      (state.screen === "home" && item.dataset.action === "home") ||
      (state.screen === "history" && item.dataset.action === "history") ||
      (state.screen === "help" && item.dataset.action === "help")
    );
  });
}

function startTransfer() {
  state.screen = "transfer";
  state.step = 1;
  state.account = "";
  state.amount = "";
  state.recipient = "";
  state.verified = false;
  state.warningAcknowledged = false;
  render();
}

function verifyRecipient() {
  const accountInput = document.querySelector("#account");
  const account = accountInput?.value.trim() || "";
  if (!/^\d{8,20}$/.test(account)) {
    showToast("Masukkan nomor rekening 8–20 digit.");
    accountInput?.focus();
    return false;
  }
  state.account = account;
  state.bank = document.querySelector("#bank").value;
  state.recipient = "Penerima Demo";
  state.verified = true;
  render();
  showToast("Nama dan bank penerima berhasil diperiksa.");
  return true;
}

function validateRecipientForm() {
  const accountInput = document.querySelector("#account");
  const amountInput = document.querySelector("#amount");
  const account = accountInput.value.trim();
  const amount = Number(amountInput.value);
  if (!state.verified || state.account !== account || state.bank !== document.querySelector("#bank").value) {
    showToast("Cek penerima terlebih dahulu untuk memastikan tujuan transfer.");
    accountInput.focus();
    return false;
  }
  if (!/^\d{8,20}$/.test(account)) {
    showToast("Nomor rekening harus terdiri dari 8–20 digit.");
    accountInput.focus();
    return false;
  }
  if (!Number.isInteger(amount) || amount < 10000) {
    showToast("Nominal minimum transfer adalah Rp10.000.");
    amountInput.focus();
    return false;
  }
  state.account = account;
  state.amount = String(amount);
  return true;
}

function validateMethodSelection() {
  const amount = Number(state.amount);
  if (state.method === "bifast" && amount > 250000000) {
    showToast("Batas BI-FAST pada demo ini adalah Rp250 juta.");
    return false;
  }
  if (state.method === "online" && amount > 100000000) {
    showToast("Batas Online pada demo ini adalah Rp100 juta. Pilih metode lain.");
    return false;
  }
  if (state.method === "rtgs" && amount < 100000000) {
    showToast("RTGS pada demo ini untuk transfer mulai Rp100 juta.");
    return false;
  }
  return true;
}

function makeReference() {
  return `JC${new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()).replaceAll("-", "")}${Date.now().toString().slice(-8)}`;
}

function submitTransfer(button) {
  button.disabled = true;
  button.innerHTML = '<span class="spinner" aria-hidden="true"></span> Memproses transfer…';
  const transaction = {
    id: makeReference(),
    recipient: state.recipient,
    bank: state.bank,
    account: maskAccount(state.account),
    amount: Number(state.amount),
    fee: activeMethod().fee,
    method: activeMethod().name,
    status: state.scenario,
    date: new Date(),
  };
  state.transactions.unshift(transaction);
  state.activeTransactionId = transaction.id;
  window.setTimeout(() => {
    state.screen = "result";
    render();
  }, 650);
}

app.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  const methodTarget = event.target.closest("[data-method]");
  const transactionTarget = event.target.closest("[data-transaction]");

  if (methodTarget) {
    state.method = methodTarget.dataset.method;
    render();
    return;
  }
  if (transactionTarget) {
    state.activeTransactionId = transactionTarget.dataset.transaction;
    state.screen = "result";
    render();
    return;
  }
  if (!actionTarget) return;

  switch (actionTarget.dataset.action) {
    case "home":
      state.screen = "home";
      render();
      break;
    case "start-transfer":
      startTransfer();
      break;
    case "history":
      state.screen = "history";
      render();
      break;
    case "help":
      state.screen = "help";
      render();
      break;
    case "connection":
      showToast(navigator.onLine ? "Koneksi internet tersedia." : "Koneksi terputus. Periksa jaringan internetmu.");
      break;
    case "verify-recipient":
      verifyRecipient();
      break;
    case "back-step":
      state.screen = state.screen === "confirm" ? "methods" : "transfer";
      render();
      break;
    case "confirm-step":
      if (!validateMethodSelection()) break;
      state.screen = "confirm";
      state.warningAcknowledged = false;
      render();
      break;
    case "edit-recipient":
      state.screen = "transfer";
      render();
      break;
    case "acknowledge-duplicate":
      state.warningAcknowledged = true;
      render();
      break;
    case "submit-transfer":
      submitTransfer(actionTarget);
      break;
    case "contact-support":
      showToast("Customer Service demo: hubungi kanal resmi Bank Jatim.");
      break;
  }
});

app.addEventListener("submit", (event) => {
  if (event.target.id !== "recipient-form") return;
  event.preventDefault();
  if (validateRecipientForm()) {
    state.screen = "methods";
    render();
  }
});

app.addEventListener("change", (event) => {
  if (event.target.name === "scenario") state.scenario = event.target.value;
  if (event.target.id === "bank") {
    state.bank = event.target.value;
    state.verified = false;
  }
});

app.addEventListener("input", (event) => {
  if (event.target.id === "account" && event.target.value.trim() !== state.account) state.verified = false;
});

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    const action = item.dataset.action;
    if (action === "home") state.screen = "home";
    if (action === "history") state.screen = "history";
    if (action === "help") state.screen = "help";
    render();
  });
});

document.querySelector(".brand").addEventListener("click", () => {
  state.screen = "home";
  render();
});

window.addEventListener("offline", () => {
  if (state.screen === "transfer" || state.screen === "methods" || state.screen === "confirm") {
    showToast("Koneksi terputus. Periksa jaringan dan jangan ulangi transaksi yang sedang dikirim.");
  }
});

render();
